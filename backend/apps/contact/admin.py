from django.contrib import admin
from django.utils.html import format_html
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'phone', 'is_read', 'created_at', 'read_status']
    list_filter = ['is_read', 'created_at']
    search_fields = ['full_name', 'email', 'phone', 'message']
    ordering = ['-created_at']
    list_editable = ['is_read']
    readonly_fields = ['full_name', 'email', 'phone', 'message', 'created_at']
    
    fieldsets = (
        ('Gönderen Bilgileri', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Mesaj', {
            'fields': ('message',)
        }),
        ('Durum', {
            'fields': ('is_read', 'created_at')
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def read_status(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="color: green;">✓ Okundu</span>'
            )
        return format_html(
            '<span style="color: orange;">● Okunmadı</span>'
        )
    
    read_status.short_description = 'Durum'
    
    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f"{updated} mesaj okundu olarak işaretlendi.")
    
    mark_as_read.short_description = "Okundu olarak işaretle"
    
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f"{updated} mesaj okunmadı olarak işaretlendi.")
    
    mark_as_unread.short_description = "Okunmadı olarak işaretle"
    
    def has_add_permission(self, request):
        # Disable manual creation of contact messages
        return False




