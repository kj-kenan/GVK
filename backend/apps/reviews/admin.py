from django.contrib import admin
from .models import GoogleReview, ReviewsCache


@admin.register(GoogleReview)
class GoogleReviewAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'rating', 'time', 'is_active', 'created_at']
    list_filter = ['rating', 'is_active', 'language', 'time']
    search_fields = ['author_name', 'text']
    readonly_fields = ['review_id', 'created_at', 'updated_at']
    date_hierarchy = 'time'
    
    fieldsets = (
        ('Review Information', {
            'fields': ('author_name', 'author_url', 'profile_photo_url', 'rating', 'text')
        }),
        ('Timing', {
            'fields': ('time', 'relative_time_description')
        }),
        ('Metadata', {
            'fields': ('review_id', 'language', 'is_active', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ReviewsCache)
class ReviewsCacheAdmin(admin.ModelAdmin):
    list_display = ['place_id', 'average_rating', 'total_reviews', 'last_fetched']
    readonly_fields = ['last_fetched']


