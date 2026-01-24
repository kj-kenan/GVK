from django.db import models
from utils.validators import validate_image_size, validate_image_type
from utils.translator import auto_translate_model_fields
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class ClinicGallery(models.Model):
    """Clinic gallery images with categories"""
    title_tr = models.CharField('Başlık (TR)', max_length=200)
    title_en = models.CharField('Başlık (EN)', max_length=200, blank=True)
    image = models.ImageField(
        'Resim',
        upload_to='clinic/',
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
    category_tr = models.CharField(
        'Kategori (TR)',
        max_length=100,
        help_text='Örn: Muayene Odası, Cerrahi, Bekleme Alanı'
    )
    category_en = models.CharField('Kategori (EN)', max_length=100, blank=True)
    order = models.IntegerField('Sıra', default=0)
    
    class Meta:
        ordering = ['order', 'category_tr']
        verbose_name = 'Klinik Resmi'
        verbose_name_plural = 'Klinik Galerisi'
        indexes = [
            models.Index(fields=['category_tr', 'order']),
        ]
    
    def __str__(self):
        return f"{self.title_tr} - {self.category_tr}"
    
    def save(self, *args, **kwargs):
        # Auto-translate
        auto_translate_model_fields(self, [
            ('title_tr', 'title_en'),
            ('category_tr', 'category_en'),
        ])
        super().save(*args, **kwargs)




