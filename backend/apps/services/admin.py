from django.contrib import admin
from .models import Service, ServiceImage
from utils.translator import translate_to_english


class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 1
    fields = ['image', 'order']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title_tr', 'title_en', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title_tr', 'title_en', 'description_tr', 'description_en']
    ordering = ['order', '-created_at']
    list_editable = ['is_active', 'order']
    inlines = [ServiceImageInline]
    
    fieldsets = (
        ('Türkçe İçerik', {
            'fields': ('title_tr', 'description_tr')
        }),
        ('İngilizce İçerik (Otomatik Çevrildi)', {
            'fields': ('title_en', 'description_en'),
            'classes': ('collapse',)
        }),
        ('Medya', {
            'fields': ('cover_image',)
        }),
        ('Ayarlar', {
            'fields': ('is_active', 'order')
        }),
    )
    
    actions = ['regenerate_translations', 'activate_services', 'deactivate_services']
    
    def regenerate_translations(self, request, queryset):
        """Regenerate English translations for selected services"""
        count = 0
        for service in queryset:
            if service.title_tr:
                service.title_en = translate_to_english(service.title_tr)
            if service.description_tr:
                service.description_en = translate_to_english(service.description_tr)
            service.save()
            count += 1
        
        self.message_user(request, f"{count} hizmet için İngilizce çeviriler yeniden oluşturuldu.")
    
    regenerate_translations.short_description = "İngilizce çevirileri yeniden oluştur"
    
    def activate_services(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} hizmet aktif edildi.")
    
    activate_services.short_description = "Seçili hizmetleri aktif et"
    
    def deactivate_services(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} hizmet pasif edildi.")
    
    deactivate_services.short_description = "Seçili hizmetleri pasif et"




