from django.db import models
from django.utils import timezone
from datetime import timedelta


class GoogleReview(models.Model):
    """
    Store Google Business Reviews
    """
    author_name = models.CharField(max_length=200)
    author_url = models.URLField(blank=True, null=True)
    profile_photo_url = models.URLField(blank=True, null=True)
    rating = models.IntegerField()  # 1-5 stars
    text = models.TextField()
    time = models.DateTimeField()  # When the review was posted
    relative_time_description = models.CharField(max_length=100)  # "1 yıl önce"
    language = models.CharField(max_length=10, default='tr')
    
    # Google's unique identifier for this review
    review_id = models.CharField(max_length=200, unique=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-time']
        verbose_name = 'Google Review'
        verbose_name_plural = 'Google Reviews'
    
    def __str__(self):
        return f"{self.author_name} - {self.rating}★"
    
    @property
    def stars_display(self):
        """Return stars as emoji string"""
        return '⭐' * self.rating


class ReviewsCache(models.Model):
    """
    Store metadata about review fetching to avoid API rate limits
    """
    place_id = models.CharField(max_length=200, unique=True)
    last_fetched = models.DateTimeField(default=timezone.now)
    average_rating = models.DecimalField(max_digits=2, decimal_places=1, null=True)
    total_reviews = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = 'Reviews Cache'
        verbose_name_plural = 'Reviews Cache'
    
    def __str__(self):
        return f"Cache for {self.place_id}"
    
    def should_refresh(self):
        """Check if we should refresh reviews (every 24 hours)"""
        return timezone.now() - self.last_fetched > timedelta(hours=24)


