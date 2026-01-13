from django.db import models
from django.core.mail import send_mail
from django.conf import settings


class ContactMessage(models.Model):
    """Contact form messages"""
    full_name = models.CharField('Ad Soyad', max_length=200)
    email = models.EmailField('E-posta')
    phone = models.CharField('Telefon', max_length=20)
    message = models.TextField('Mesaj')
    is_read = models.BooleanField('Okundu', default=False)
    created_at = models.DateTimeField('Gönderim Tarihi', auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'İletişim Mesajı'
        verbose_name_plural = 'İletişim Mesajları'
        indexes = [
            models.Index(fields=['is_read', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.full_name} - {self.created_at.strftime('%d.%m.%Y')}"
    
    def send_notification_email(self):
        """Send email notification to admin about new contact message"""
        try:
            subject = f"Yeni İletişim Mesajı - {self.full_name}"
            
            message = f"""
Merhaba,

Sitenizden yeni bir iletişim mesajı aldınız.

Gönderen: {self.full_name}
E-posta: {self.email}
Telefon: {self.phone}

Mesaj:
{self.message}

--
Gönderim Zamanı: {self.created_at.strftime('%d.%m.%Y %H:%M')}
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


