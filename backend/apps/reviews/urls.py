from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GoogleReviewViewSet

router = DefaultRouter()
router.register(r'reviews', GoogleReviewViewSet, basename='google-reviews')

urlpatterns = [
    path('', include(router.urls)),
]


