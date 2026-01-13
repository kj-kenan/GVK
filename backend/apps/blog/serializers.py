from rest_framework import serializers
from .models import BlogCategory, BlogPost


class BlogCategorySerializer(serializers.ModelSerializer):
    """Serializer for blog categories"""
    
    class Meta:
        model = BlogCategory
        fields = ['id', 'name_tr', 'name_en', 'slug']


class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer for blog post list view"""
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    excerpt_tr = serializers.SerializerMethodField()
    excerpt_en = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title_tr', 'title_en', 'excerpt_tr', 'excerpt_en',
            'cover_image', 'category', 'author_name', 'publish_date', 'slug'
        ]
    
    def get_excerpt_tr(self, obj):
        return obj.get_excerpt(120)
    
    def get_excerpt_en(self, obj):
        content = obj.content_en if obj.content_en else obj.content_tr
        if len(content) > 120:
            return content[:120] + '...'
        return content


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer for blog post detail view"""
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title_tr', 'title_en', 'content_tr', 'content_en',
            'cover_image', 'category', 'author_name', 'publish_date',
            'meta_description_tr', 'meta_description_en', 'slug'
        ]




