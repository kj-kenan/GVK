from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = [
        'photo_preview', 'pet_name', 'owner_name', 'email',
        'is_approved', 'submitted_at', 'approved_at'
    ]
    list_filter = ['is_approved', 'submitted_at']
    search_fields = ['pet_name', 'owner_name', 'email', 'description']
    ordering = ['-submitted_at']
    list_editable = ['is_approved']
    readonly_fields = ['submitted_at', 'photo_preview_large']
    
    fieldsets = (
        ('Fotoğraf', {
            'fields': ('photo_preview_large', 'pet_photo')
        }),
        ('Bilgiler', {
            'fields': ('owner_name', 'pet_name', 'email', 'description')
        }),
        ('Onay', {
            'fields': ('is_approved', 'approved_at', 'submitted_at')
        }),
    )
    
    actions = ['approve_testimonials', 'reject_testimonials']
    
    def photo_preview(self, obj):
        if obj.pet_photo:
            return format_html(
                '<img src="{}" width="60" height="60" style="object-fit: cover; border-radius: 4px;" />',
                obj.pet_photo.url
            )
        return "-"
    
    photo_preview.short_description = 'Fotoğraf'
    
    def photo_preview_large(self, obj):
        if obj.pet_photo:
            return format_html(
                '<img src="{}" style="max-width: 400px; max-height: 400px; border-radius: 8px;" />',
                obj.pet_photo.url
            )
        return "-"
    
    photo_preview_large.short_description = 'Fotoğraf Önizleme'
    
    def approve_testimonials(self, request, queryset):
        """Approve selected testimonials and send notification emails"""
        count = 0
        for testimonial in queryset.filter(is_approved=False):
            testimonial.is_approved = True
            testimonial.approved_at = timezone.now()
            testimonial.save()
            
            # Send approval email to user
            testimonial.send_approval_email()
            count += 1
        
        self.message_user(request, f"{count} paylaşım onaylandı ve kullanıcılara e-posta gönderildi.")
    
    approve_testimonials.short_description = "Seçili paylaşımları onayla"
    
    def reject_testimonials(self, request, queryset):
        """Reject/unapprove selected testimonials"""
        updated = queryset.update(is_approved=False, approved_at=None)
        self.message_user(request, f"{updated} paylaşım reddedildi.")
    
    reject_testimonials.short_description = "Seçili paylaşımları reddet"




