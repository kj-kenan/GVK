from django.db import models
from utils.translator import auto_translate_model_fields


class SiteSettings(models.Model):
    """
    Singleton model for site settings
    Only one instance is allowed
    """
    # Contact Information
    address_tr = models.TextField('Adres (TR)')
    address_en = models.TextField('Adres (EN)', blank=True)
    phone = models.CharField('Telefon', max_length=20)
    mobile = models.CharField('Cep Telefonu', max_length=20, blank=True)
    email = models.EmailField('E-posta')
    
    # Working Hours
    working_hours_weekday_tr = models.CharField(
        'Hafta İçi Çalışma Saatleri (TR)',
        max_length=200,
        help_text='Örn: Pazartesi-Cuma 09:00-18:00'
    )
    working_hours_weekday_en = models.CharField(
        'Hafta İçi Çalışma Saatleri (EN)',
        max_length=200,
        blank=True
    )
    working_hours_weekend_tr = models.CharField(
        'Hafta Sonu Çalışma Saatleri (TR)',
        max_length=200,
        help_text='Örn: Cumartesi-Pazar 10:00-16:00'
    )
    working_hours_weekend_en = models.CharField(
        'Hafta Sonu Çalışma Saatleri (EN)',
        max_length=200,
        blank=True
    )
    
    # Map and Social Media
    google_maps_embed_url = models.URLField(
        'Google Maps Embed URL',
        help_text='Google Maps\'ten iframe embed URL\'sini yapıştırın',
        blank=True
    )
    facebook_url = models.URLField('Facebook URL', blank=True)
    instagram_url = models.URLField('Instagram URL', blank=True)
    twitter_url = models.URLField('Twitter URL', blank=True)
    
    # Email Settings
    admin_email = models.EmailField(
        'Admin E-posta',
        help_text='İletişim formu ve bildirimler için e-posta adresi'
    )
    
    class Meta:
        verbose_name = 'Site Ayarları'
        verbose_name_plural = 'Site Ayarları'
    
    def __str__(self):
        return 'Site Ayarları'
    
    def save(self, *args, **kwargs):
        # Singleton pattern - only allow one instance
        self.pk = 1
        
        # Auto-translate
        auto_translate_model_fields(self, [
            ('address_tr', 'address_en'),
            ('working_hours_weekday_tr', 'working_hours_weekday_en'),
            ('working_hours_weekend_tr', 'working_hours_weekend_en'),
        ])
        
        super().save(*args, **kwargs)
    
    @classmethod
    def load(cls):
        """Load the singleton instance"""
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
    
    def delete(self, *args, **kwargs):
        """Prevent deletion of the singleton instance"""
        pass




