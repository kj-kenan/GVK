from django.contrib import admin
from django.utils.html import format_html
from .models import ClinicGallery
from utils.translator import translate_to_english


@admin.register(ClinicGallery)
class ClinicGalleryAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'title_tr', 'category_tr', 'order']
    list_filter = ['category_tr']
    search_fields = ['title_tr', 'title_en', 'category_tr', 'category_en']
    ordering = ['order', 'category_tr']
    list_editable = ['order']
    
    fieldsets = (
        ('Resim', {
            'fields': ('image',)
        }),
        ('Türkçe İçerik', {
            'fields': ('title_tr', 'category_tr')
        }),
        ('İngilizce İçerik (Otomatik Çevrildi)', {
            'fields': ('title_en', 'category_en'),
            'classes': ('collapse',)
        }),
        ('Ayarlar', {
            'fields': ('order',)
        }),
    )
    
    actions = ['regenerate_translations']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="80" height="60" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return "-"
    
    image_preview.short_description = 'Önizleme'
    
    def regenerate_translations(self, request, queryset):
        count = 0
        for item in queryset:
            if item.title_tr:
                item.title_en = translate_to_english(item.title_tr)
            if item.category_tr:
                item.category_en = translate_to_english(item.category_tr)
            item.save()
            count += 1
        
        self.message_user(request, f"{count} galeri öğesi için İngilizce çeviriler yeniden oluşturuldu.")
    
    regenerate_translations.short_description = "İngilizce çevirileri yeniden oluştur"




