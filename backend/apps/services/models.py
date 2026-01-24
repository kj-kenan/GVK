from django.db import models
from utils.validators import validate_image_size, validate_image_type
from utils.translator import auto_translate_model_fields
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class Service(models.Model):
    """Service model with bilingual support"""
    title_tr = models.CharField('Başlık (TR)', max_length=200)
    title_en = models.CharField('Başlık (EN)', max_length=200, blank=True)
    description_tr = models.TextField('Açıklama (TR)')
    description_en = models.TextField('Açıklama (EN)', blank=True)
    cover_image = models.ImageField(
        'Kapak Resmi',
        upload_to='services/covers/',
        validators=[validate_image_size, validate_image_type]
    )
    cover_thumbnail = ImageSpecField(
        source='cover_image',
        processors=[ResizeToFill(400, 300)],
        format='WEBP',
        options={'quality': 85}
    )
    cover_thumbnail_avif = ImageSpecField(
        source='cover_image',
        processors=[ResizeToFill(400, 300)],
        format='AVIF',
        options={'quality': 75}
    )
    is_active = models.BooleanField('Aktif', default=True)
    order = models.IntegerField('Sıra', default=0)
    created_at = models.DateTimeField('Oluşturulma', auto_now_add=True)
    updated_at = models.DateTimeField('Güncellenme', auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Hizmet'
        verbose_name_plural = 'Hizmetler'
        indexes = [
            models.Index(fields=['is_active', 'order']),
        ]
    
    def __str__(self):
        return self.title_tr
    
    def save(self, *args, **kwargs):
        # Auto-translate if English fields are empty
        auto_translate_model_fields(self, [
            ('title_tr', 'title_en'),
            ('description_tr', 'description_en'),
        ])
        super().save(*args, **kwargs)


class ServiceImage(models.Model):
    """Gallery images for services"""
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name='Hizmet'
    )
    image = models.ImageField(
        'Resim',
        upload_to='services/gallery/',
        validators=[validate_image_size, validate_image_type]
    )
    image_thumbnail = ImageSpecField(
        source='image',
        processors=[ResizeToFill(400, 300)],
        format='WEBP',
        options={'quality': 85}
    )
    image_thumbnail_avif = ImageSpecField(
        source='image',
        processors=[ResizeToFill(400, 300)],
        format='AVIF',
        options={'quality': 75}
    )
    order = models.IntegerField('Sıra', default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Hizmet Resmi'
        verbose_name_plural = 'Hizmet Resimleri'
    
    def __str__(self):
        return f"{self.service.title_tr} - Resim {self.order}"




