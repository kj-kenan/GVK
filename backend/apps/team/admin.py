from django.contrib import admin
from django.utils.html import format_html
from .models import TeamMember
from utils.translator import translate_to_english


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['photo_preview', 'name', 'title_tr', 'specialty_tr', 'is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['name', 'title_tr', 'title_en', 'specialty_tr', 'specialty_en']
    ordering = ['order', 'name']
    list_editable = ['is_active', 'order']
    
    fieldsets = (
        ('Genel Bilgiler', {
            'fields': ('name', 'photo')
        }),
        ('Türkçe İçerik', {
            'fields': ('title_tr', 'specialty_tr', 'bio_tr')
        }),
        ('İngilizce İçerik (Otomatik Çevrildi)', {
            'fields': ('title_en', 'specialty_en', 'bio_en'),
            'classes': ('collapse',)
        }),
        ('Ayarlar', {
            'fields': ('is_active', 'order')
        }),
    )
    
    actions = ['regenerate_translations', 'activate_members', 'deactivate_members']
    
    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.photo.url)
        return "-"
    
    photo_preview.short_description = 'Fotoğraf'
    
    def regenerate_translations(self, request, queryset):
        """Regenerate English translations for selected team members"""
        count = 0
        for member in queryset:
            if member.title_tr:
                member.title_en = translate_to_english(member.title_tr)
            if member.specialty_tr:
                member.specialty_en = translate_to_english(member.specialty_tr)
            if member.bio_tr:
                member.bio_en = translate_to_english(member.bio_tr)
            member.save()
            count += 1
        
        self.message_user(request, f"{count} ekip üyesi için İngilizce çeviriler yeniden oluşturuldu.")
    
    regenerate_translations.short_description = "İngilizce çevirileri yeniden oluştur"
    
    def activate_members(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} ekip üyesi aktif edildi.")
    
    activate_members.short_description = "Seçili üyeleri aktif et"
    
    def deactivate_members(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} ekip üyesi pasif edildi.")
    
    deactivate_members.short_description = "Seçili üyeleri pasif et"




