from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.management import call_command
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import GoogleReview, ReviewsCache
from .serializers import GoogleReviewSerializer, ReviewsSummarySerializer


class GoogleReviewViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing Google Reviews
    """
    queryset = GoogleReview.objects.filter(is_active=True)
    serializer_class = GoogleReviewSerializer
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Get reviews summary with statistics
        """
        try:
            cache = ReviewsCache.objects.first()
            if not cache:
                return Response({
                    'message': 'No reviews data available. Please run fetch_google_reviews command.',
                    'average_rating': 0,
                    'total_reviews': 0,
                    'reviews': []
                }, status=status.HTTP_200_OK)
            
            reviews = GoogleReview.objects.filter(is_active=True)[:10]  # Top 10 reviews
            
            return Response({
                'average_rating': float(cache.average_rating) if cache.average_rating else 0,
                'total_reviews': cache.total_reviews,
                'last_fetched': cache.last_fetched,
                'reviews': GoogleReviewSerializer(reviews, many=True).data
            })
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @method_decorator(ratelimit(key='ip', rate='5/h', method='POST'))
    @action(detail=False, methods=['post'])
    def refresh(self, request):
        """
        Manually trigger review refresh (rate limited)
        Admin only endpoint
        """
        if not request.user.is_staff:
            return Response({
                'error': 'Permission denied'
            }, status=status.HTTP_403_FORBIDDEN)
        
        try:
            call_command('fetch_google_reviews', '--force')
            return Response({
                'message': 'Reviews refreshed successfully'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


