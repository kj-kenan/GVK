from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from utils.validators import validate_image_size, validate_image_type
from utils.translator import auto_translate_model_fields
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class BlogCategory(models.Model):
    """Blog category with bilingual support"""
    name_tr = models.CharField('Kategori Adı (TR)', max_length=100)
    name_en = models.CharField('Kategori Adı (EN)', max_length=100, blank=True)
    slug = models.SlugField('URL', unique=True, max_length=120)
    
    class Meta:
        verbose_name = 'Blog Kategorisi'
        verbose_name_plural = 'Blog Kategorileri'
        ordering = ['name_tr']
    
    def __str__(self):
        return self.name_tr
    
    def save(self, *args, **kwargs):
        # Auto-generate slug from Turkish name
        if not self.slug:
            self.slug = slugify(self.name_tr, allow_unicode=True)
        
        # Auto-translate
        auto_translate_model_fields(self, [
            ('name_tr', 'name_en'),
        ])
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    """Blog post with bilingual support"""
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts',
        verbose_name='Kategori'
    )
    title_tr = models.CharField('Başlık (TR)', max_length=200)
    title_en = models.CharField('Başlık (EN)', max_length=200, blank=True)
    content_tr = models.TextField('İçerik (TR)')
    content_en = models.TextField('İçerik (EN)', blank=True)
    cover_image = models.ImageField(
        'Kapak Resmi',
        upload_to='blog/',
        validators=[validate_image_size, validate_image_type]
    )
    cover_thumbnail = ImageSpecField(
        source='cover_image',
        processors=[ResizeToFill(400, 300)],
        format='WEBP',
        options={'quality': 85}
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Yazar'
    )
    slug = models.SlugField('URL', unique=True, max_length=220)
    meta_description_tr = models.CharField(
        'Meta Açıklama (TR)',
        max_length=160,
        blank=True,
        help_text='SEO için kısa açıklama (maks. 160 karakter)'
    )
    meta_description_en = models.CharField(
        'Meta Açıklama (EN)',
        max_length=160,
        blank=True
    )
    is_published = models.BooleanField('Yayında', default=False)
    publish_date = models.DateTimeField('Yayın Tarihi', null=True, blank=True)
    created_at = models.DateTimeField('Oluşturulma', auto_now_add=True)
    updated_at = models.DateTimeField('Güncellenme', auto_now=True)
    
    class Meta:
        ordering = ['-publish_date', '-created_at']
        verbose_name = 'Blog Yazısı'
        verbose_name_plural = 'Blog Yazıları'
        indexes = [
            models.Index(fields=['is_published', '-publish_date']),
            models.Index(fields=['slug']),
        ]
    
    def __str__(self):
        return self.title_tr
    
    def save(self, *args, **kwargs):
        # Auto-generate slug from Turkish title
        if not self.slug:
            self.slug = slugify(self.title_tr, allow_unicode=True)
        
        # Auto-translate
        auto_translate_model_fields(self, [
            ('title_tr', 'title_en'),
            ('content_tr', 'content_en'),
            ('meta_description_tr', 'meta_description_en'),
        ])
        
        # Set publish date if being published for the first time
        if self.is_published and not self.publish_date:
            from django.utils import timezone
            self.publish_date = timezone.now()
        
        super().save(*args, **kwargs)
    
    def get_excerpt(self, length=120):
        """Return short excerpt from content"""
        content = self.content_tr
        if len(content) > length:
            return content[:length] + '...'
        return content




