from django.contrib import admin
from .models import SiteSettings
from utils.translator import translate_to_english


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('İletişim Bilgileri', {
            'fields': ('phone', 'email', 'admin_email')
        }),
        ('Adres (Türkçe)', {
            'fields': ('address_tr',)
        }),
        ('Adres (İngilizce - Otomatik Çevrildi)', {
            'fields': ('address_en',),
            'classes': ('collapse',)
        }),
        ('Çalışma Saatleri (Türkçe)', {
            'fields': ('working_hours_weekday_tr', 'working_hours_weekend_tr')
        }),
        ('Çalışma Saatleri (İngilizce - Otomatik Çevrildi)', {
            'fields': ('working_hours_weekday_en', 'working_hours_weekend_en'),
            'classes': ('collapse',)
        }),
        ('Harita ve Sosyal Medya', {
            'fields': ('google_maps_embed_url', 'facebook_url', 'instagram_url', 'twitter_url')
        }),
    )
    
    actions = ['regenerate_translations']
    
    def has_add_permission(self, request):
        # Only allow one instance (singleton)
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion
        return False
    
    def regenerate_translations(self, request, queryset):
        settings = SiteSettings.load()
        
        if settings.address_tr:
            settings.address_en = translate_to_english(settings.address_tr)
        if settings.working_hours_weekday_tr:
            settings.working_hours_weekday_en = translate_to_english(settings.working_hours_weekday_tr)
        if settings.working_hours_weekend_tr:
            settings.working_hours_weekend_en = translate_to_english(settings.working_hours_weekend_tr)
        
        settings.save()
        self.message_user(request, "İngilizce çeviriler yeniden oluşturuldu.")
    
    regenerate_translations.short_description = "İngilizce çevirileri yeniden oluştur"




