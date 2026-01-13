from django.db import models
from django.core.mail import send_mail
from django.conf import settings
from utils.validators import validate_image_size, validate_image_type
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class Testimonial(models.Model):
    """Customer testimonial with pet photo"""
    pet_photo = models.ImageField(
        'Evcil Hayvan Fotoğrafı',
        upload_to='testimonials/',
        validators=[validate_image_size, validate_image_type]
    )
    pet_photo_thumbnail = ImageSpecField(
        source='pet_photo',
        processors=[ResizeToFill(400, 400)],
        format='WEBP',
        options={'quality': 90}
    )
    owner_name = models.CharField('Sahip Adı', max_length=200, blank=True)
    pet_name = models.CharField('Evcil Hayvan Adı', max_length=200, blank=True)
    description = models.TextField('Açıklama', max_length=500, blank=True)
    email = models.EmailField('E-posta')
    is_approved = models.BooleanField('Onaylandı', default=False)
    submitted_at = models.DateTimeField('Gönderim Tarihi', auto_now_add=True)
    approved_at = models.DateTimeField('Onay Tarihi', null=True, blank=True)
    
    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Fotoğraf Paylaşımı'
        verbose_name_plural = 'Fotoğraf Paylaşımları'
        indexes = [
            models.Index(fields=['is_approved', '-submitted_at']),
        ]
    
    def __str__(self):
        if self.pet_name:
            return f"{self.pet_name}"
        return f"Paylaşım #{self.id}"
    
    def send_notification_email(self):
        """Send email notification to admin about new testimonial"""
        try:
            subject = "Yeni Fotoğraf Paylaşımı - Onay Bekliyor"
            
            message = f"""
Merhaba,

"Sizden Gelenler" bölümüne yeni bir fotoğraf paylaşıldı.

Evcil Hayvan Sahibi: {self.owner_name if self.owner_name else 'Belirtilmemiş'}
Evcil Hayvan Adı: {self.pet_name if self.pet_name else 'Belirtilmemiş'}
Gönderen E-posta: {self.email}
Açıklama: {self.description if self.description else 'Yok'}

Fotoğrafı görüntülemek ve onaylamak için admin paneline gidin:
{settings.ALLOWED_HOSTS[0] if settings.ALLOWED_HOSTS else 'localhost'}/admin/testimonials/testimonial/{self.id}/change/

--
Gönderim Zamanı: {self.submitted_at.strftime('%d.%m.%Y %H:%M')}
Göztepe Veteriner Kliniği
"""
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Email gönderme hatası: {e}")
    
    def send_approval_email(self):
        """Send email to user when testimonial is approved (optional)"""
        try:
            subject = "Fotoğrafınız Yayınlandı! 🐾"
            
            message = f"""
Merhaba,

Paylaştığınız fotoğraf sitemizde yayınlandı! "Sizden Gelenler" bölümünden görebilirsiniz.

Katkınız için teşekkür ederiz!

--
Göstepe Veteriner Kliniği
www.gostepeveteriner.com
"""
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[self.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Email gönderme hatası: {e}")


