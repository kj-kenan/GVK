from django.contrib import admin
from django.utils.html import format_html
from .models import BlogCategory, BlogPost
from utils.translator import translate_to_english


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_tr', 'name_en', 'slug', 'post_count']
    search_fields = ['name_tr', 'name_en']
    prepopulated_fields = {'slug': ('name_tr',)}
    
    fieldsets = (
        ('Türkçe', {
            'fields': ('name_tr',)
        }),
        ('İngilizce (Otomatik Çevrildi)', {
            'fields': ('name_en',),
            'classes': ('collapse',)
        }),
        ('URL', {
            'fields': ('slug',)
        }),
    )
    
    actions = ['regenerate_translations']
    
    def post_count(self, obj):
        return obj.posts.count()
    
    post_count.short_description = 'Yazı Sayısı'
    
    def regenerate_translations(self, request, queryset):
        count = 0
        for category in queryset:
            if category.name_tr:
                category.name_en = translate_to_english(category.name_tr)
                category.save()
                count += 1
        
        self.message_user(request, f"{count} kategori için İngilizce çeviriler yeniden oluşturuldu.")
    
    regenerate_translations.short_description = "İngilizce çevirileri yeniden oluştur"


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = [
        'cover_preview', 'title_tr', 'category', 'author', 
        'is_published', 'publish_date', 'created_at'
    ]
    list_filter = ['is_published', 'category', 'author', 'publish_date']
    search_fields = ['title_tr', 'title_en', 'content_tr', 'content_en']
    prepopulated_fields = {'slug': ('title_tr',)}
    ordering = ['-created_at']
    list_editable = ['is_published']
    date_hierarchy = 'publish_date'
    
    fieldsets = (
        ('Genel', {
            'fields': ('category', 'author', 'cover_image')
        }),
        ('Türkçe İçerik', {
            'fields': ('title_tr', 'content_tr', 'meta_description_tr')
        }),
        ('İngilizce İçerik (Otomatik Çevrildi)', {
            'fields': ('title_en', 'content_en', 'meta_description_en'),
            'classes': ('collapse',)
        }),
        ('Yayın Ayarları', {
            'fields': ('slug', 'is_published', 'publish_date')
        }),
    )
    
    actions = ['regenerate_translations', 'publish_posts', 'unpublish_posts']
    
    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" width="80" height="60" style="object-fit: cover; border-radius: 4px;" />',
                obj.cover_image.url
            )
        return "-"
    
    cover_preview.short_description = 'Kapak'
    
    def save_model(self, request, obj, form, change):
        # Set author automatically if creating new post
        if not change:
            obj.author = request.user
        super().save_model(request, obj, form, change)
    
    def regenerate_translations(self, request, queryset):
        count = 0
        for post in queryset:
            if post.title_tr:
                post.title_en = translate_to_english(post.title_tr)
            if post.content_tr:
                post.content_en = translate_to_english(post.content_tr)
            if post.meta_description_tr:
                post.meta_description_en = translate_to_english(post.meta_description_tr)
            post.save()
            count += 1
        
        self.message_user(request, f"{count} blog yazısı için İngilizce çeviriler yeniden oluşturuldu.")
    
    regenerate_translations.short_description = "İngilizce çevirileri yeniden oluştur"
    
    def publish_posts(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated} yazı yayınlandı.")
    
    publish_posts.short_description = "Seçili yazıları yayınla"
    
    def unpublish_posts(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated} yazı yayından kaldırıldı.")
    
    unpublish_posts.short_description = "Seçili yazıları yayından kaldır"




