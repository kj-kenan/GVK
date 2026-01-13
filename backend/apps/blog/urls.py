from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogCategoryViewSet, BlogPostViewSet

router = DefaultRouter()
router.register(r'blog/categories', BlogCategoryViewSet, basename='blog-category')
router.register(r'blog/posts', BlogPostViewSet, basename='blog-post')

urlpatterns = [
    path('', include(router.urls)),
]




