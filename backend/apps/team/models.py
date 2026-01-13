from django.db import models
from utils.validators import validate_image_size, validate_image_type
from utils.translator import auto_translate_model_fields
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class TeamMember(models.Model):
    """Team member model with bilingual support"""
    name = models.CharField('Ad Soyad', max_length=200)
    title_tr = models.CharField('Ünvan (TR)', max_length=200)
    title_en = models.CharField('Ünvan (EN)', max_length=200, blank=True)
    specialty_tr = models.CharField('Uzmanlık (TR)', max_length=200)
    specialty_en = models.CharField('Uzmanlık (EN)', max_length=200, blank=True)
    bio_tr = models.TextField('Biyografi (TR)')
    bio_en = models.TextField('Biyografi (EN)', blank=True)
    photo = models.ImageField(
        'Fotoğraf',
        upload_to='team/',
        validators=[validate_image_size, validate_image_type]
    )
    photo_thumbnail = ImageSpecField(
        source='photo',
        processors=[ResizeToFill(200, 200)],
        format='WEBP',
        options={'quality': 90}
    )
    is_active = models.BooleanField('Aktif', default=True)
    order = models.IntegerField('Sıra', default=0)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Ekip Üyesi'
        verbose_name_plural = 'Ekip Üyeleri'
        indexes = [
            models.Index(fields=['is_active', 'order']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.title_tr}"
    
    def save(self, *args, **kwargs):
        # Auto-translate if English fields are empty
        auto_translate_model_fields(self, [
            ('title_tr', 'title_en'),
            ('specialty_tr', 'specialty_en'),
            ('bio_tr', 'bio_en'),
        ])
        super().save(*args, **kwargs)




