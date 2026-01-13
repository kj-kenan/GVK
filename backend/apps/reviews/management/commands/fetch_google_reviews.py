"""
Management command to fetch Google Reviews from Google Places API
Usage: python manage.py fetch_google_reviews
"""
import os
import requests
from datetime import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.reviews.models import GoogleReview, ReviewsCache


class Command(BaseCommand):
    help = 'Fetch Google Reviews from Google Places API'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force refresh even if cache is recent',
        )

    def handle(self, *args, **options):
        # Get environment variables
        api_key = os.getenv('GOOGLE_PLACES_API_KEY')
        place_id = os.getenv('GOOGLE_PLACE_ID')

        if not api_key:
            self.stdout.write(
                self.style.ERROR('GOOGLE_PLACES_API_KEY not found in environment variables')
            )
            return

        if not place_id:
            self.stdout.write(
                self.style.ERROR('GOOGLE_PLACE_ID not found in environment variables')
            )
            return

        # Check cache
        cache, created = ReviewsCache.objects.get_or_create(place_id=place_id)
        
        if not options['force'] and not created and not cache.should_refresh():
            self.stdout.write(
                self.style.WARNING(
                    f'Reviews were fetched recently ({cache.last_fetched}). '
                    'Use --force to refresh anyway.'
                )
            )
            return

        self.stdout.write('Fetching reviews from Google Places API...')

        # Fetch place details with reviews
        url = 'https://maps.googleapis.com/maps/api/place/details/json'
        params = {
            'place_id': place_id,
            'fields': 'name,rating,user_ratings_total,reviews',
            'key': api_key,
            'language': 'tr',  # Turkish
        }

        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

            if data.get('status') != 'OK':
                self.stdout.write(
                    self.style.ERROR(f"API Error: {data.get('status')} - {data.get('error_message', 'Unknown error')}")
                )
                return

            result = data.get('result', {})
            reviews = result.get('reviews', [])
            
            if not reviews:
                self.stdout.write(self.style.WARNING('No reviews found'))
                return

            # Update cache metadata
            cache.average_rating = result.get('rating', 0)
            cache.total_reviews = result.get('user_ratings_total', 0)
            cache.last_fetched = timezone.now()
            cache.save()

            # Process and save reviews
            new_count = 0
            updated_count = 0

            for review_data in reviews:
                # Create unique review_id from author_name and time
                review_id = f"{review_data.get('author_name', '')}_{review_data.get('time', '')}"
                
                # Convert Unix timestamp to datetime
                review_time = timezone.make_aware(
                    datetime.fromtimestamp(review_data.get('time', 0))
                )

                review, created = GoogleReview.objects.update_or_create(
                    review_id=review_id,
                    defaults={
                        'author_name': review_data.get('author_name', 'Anonymous'),
                        'author_url': review_data.get('author_url', ''),
                        'profile_photo_url': review_data.get('profile_photo_url', ''),
                        'rating': review_data.get('rating', 0),
                        'text': review_data.get('text', ''),
                        'time': review_time,
                        'relative_time_description': review_data.get('relative_time_description', ''),
                        'language': review_data.get('language', 'tr'),
                        'is_active': True,
                    }
                )

                if created:
                    new_count += 1
                else:
                    updated_count += 1

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully fetched {len(reviews)} reviews\n'
                    f'New: {new_count}, Updated: {updated_count}\n'
                    f'Average Rating: {cache.average_rating}⭐ ({cache.total_reviews} total reviews)'
                )
            )

        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f'Network error: {str(e)}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))


