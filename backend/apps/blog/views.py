from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import BlogCategory, BlogPost
from .serializers import BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer


class BlogPostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for blog categories"""
    permission_classes = [AllowAny]
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    pagination_class = None  # No pagination for categories


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for blog posts
    - List: Returns published posts with pagination
    - Detail: Returns complete post data by slug
    """
    permission_classes = [AllowAny]
    queryset = BlogPost.objects.filter(is_published=True).select_related('category', 'author')
    pagination_class = BlogPostPagination
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category if provided
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        return queryset




