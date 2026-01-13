from rest_framework import serializers
from .models import GoogleReview, ReviewsCache


class GoogleReviewSerializer(serializers.ModelSerializer):
    stars_display = serializers.ReadOnlyField()
    
    class Meta:
        model = GoogleReview
        fields = [
            'id',
            'author_name',
            'author_url',
            'profile_photo_url',
            'rating',
            'stars_display',
            'text',
            'time',
            'relative_time_description',
            'language',
        ]


class ReviewsSummarySerializer(serializers.ModelSerializer):
    """Serializer for reviews summary statistics"""
    reviews = GoogleReviewSerializer(many=True, read_only=True, source='googlereview_set')
    
    class Meta:
        model = ReviewsCache
        fields = [
            'average_rating',
            'total_reviews',
            'last_fetched',
            'reviews',
        ]


