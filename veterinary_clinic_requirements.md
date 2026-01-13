# 🐾 Modern Veterinary Clinic Website - Full Stack Development Guide

## 🎯 Project Overview

**IMPORTANT: This is a TURKISH veterinary clinic website. All user-facing content must be in Turkish (TR) as the primary language, with automatic English (EN) translation support.**

### Technology Stack
- **Backend**: Django 4.x + Django REST Framework
- **Frontend**: React 18+ with Vite
- **Database**: PostgreSQL (production) / SQLite (development)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: LibreTranslate (TR → EN automatic translation)
- **File Storage**: Local server storage

---

## 📋 Functional Requirements

### 1. Multi-Language Support (TR/EN)

**Primary Language**: Turkish (TR)
**Secondary Language**: English (EN) - Auto-translated via LibreTranslate

**Implementation:**
- Django i18n framework
- URL structure: `/tr/` and `/en/` prefixes
- All content stored in both `field_tr` and `field_en`
- Admin panel shows "Regenerate Translation" button
- Manual editing allowed after auto-translation

**Translation Flow:**
1. Admin enters content in Turkish
2. System automatically translates to English using LibreTranslate
3. Admin can manually edit English translation
4. Both versions saved to database

---

### 2. Services Module (Hizmetler)

**Features:**
- Dynamic service creation/editing via Django Admin
- Each service includes:
  - Title (TR/EN)
  - Description (Rich text editor, TR/EN)
  - Cover image (main photo)
  - Multiple detail images (gallery)
  - Active/Inactive status
  - Order/Sort position
  - Created/Updated timestamps

**Frontend Display:**
- Card grid layout on services page
- Each card shows: cover image, title, short excerpt
- Click → Modal or detail page with full description + image gallery
- Responsive: 3 columns desktop, 2 tablet, 1 mobile

**Admin Requirements:**
- Rich text editor (CKEditor or TinyMCE)
- Drag-and-drop image upload
- Reorderable list (django-admin-sortable2)

---

### 3. Team Module (Ekibimiz)

**Features:**
- Dynamic team member management
- Each member includes:
  - Full name
  - Title/Position (TR/EN)
  - Specialty/Expertise (TR/EN)
  - Short bio (2-3 sentences, TR/EN)
  - Profile photo
  - Active/Inactive status
  - Order position

**Frontend Display:**
- Grid layout: 4 columns desktop, 2 tablet, 1 mobile
- Card design: Photo + Name + Title + Specialty
- Hover effect reveals short bio
- Professional, clean aesthetic

---

### 4. Blog System

**Features:**
- Dynamic blog categories
- Each post includes:
  - Title (TR/EN)
  - Content (Rich text, TR/EN)
  - Cover image
  - Category (ForeignKey)
  - Tags (optional)
  - Author (ForeignKey to User)
  - Publication date
  - SEO meta description (TR/EN)
  - Slug (auto-generated from title)
  - Published/Draft status

**Frontend Display:**
- Blog list page: Grid of post cards (3 columns)
- Each card: Cover image, title, excerpt, date, category
- Detail page: Full content with formatted text and images
- Category filtering
- Pagination (10 posts per page)

**Categories Examples:**
- Bakım İpuçları (Pet Care Tips)
- Hastalıklar (Diseases)
- Beslenme (Nutrition)
- Genel Bilgiler (General Info)

---

### 5. "Sizden Gelenler" (Customer Testimonials with Photos)

**User Submission Flow:**
1. User fills form on website (frontend)
2. Form fields:
   - Pet photo (required, max 5MB)
   - Owner name (optional)
   - Pet name (optional)
   - Short description (optional, max 500 chars)
   - Email (required, for notification)
3. Submission sends email to admin
4. Submission saved to database with `is_approved = False`
5. Admin reviews in Django Admin panel
6. Admin approves or rejects
7. Only approved submissions appear on website

**Email Notification:**
- To: Admin email (from site settings)
- Subject: "Yeni Fotoğraf Paylaşımı - Onay Bekliyor"
- Body: Include owner name, pet name, email, and link to admin panel

**Frontend Display:**
- Masonry grid layout (Pinterest-style) or regular grid
- Lightbox on click (to view full-size photo)
- Show pet name + owner name (if provided)
- "Fotoğrafını Paylaş" CTA button prominent on page

**Admin Panel:**
- List view shows thumbnail, names, submission date, approval status
- Bulk approve/reject actions
- Filter by approved/pending

---

### 6. Clinic Gallery (Klinik Galerisi)

**Features:**
- Admin-managed clinic photos
- Each photo includes:
  - Image
  - Title/Caption (TR/EN)
  - Category (e.g., "Muayene Odası", "Cerrahi", "Bekleme Alanı")
  - Order position

**Frontend Display:**
- Grid layout with categories as filters
- Lightbox for full-size viewing
- Smooth animations on load

---

### 7. Contact Module (İletişim)

**Contact Form:**
- Fields:
  - Full Name (required)
  - Email (required, validated)
  - Phone (required)
  - Message (required, textarea)
- On submission:
  - Save to ContactMessage model
  - Send email to admin
  - Show success message to user
- No page reload (AJAX submission)

**Dynamic Site Information:**
- All managed via Django Admin (SiteSettings model)
- Working hours (weekday/weekend)
- Address
- Phone number
- Email
- Google Maps embed URL
- Social media links (Facebook, Instagram, Twitter)

**Google Maps Integration:**
- Free Google Maps embed (iframe)
- Admin provides embed URL in settings
- Display in contact section

**Email Notification (Contact Form):**
- To: Admin email
- Subject: "Yeni İletişim Mesajı"
- Body: Include name, email, phone, message, timestamp

---

## 🗄️ Database Models

### Service Model
```python
class Service(models.Model):
    title_tr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    description_tr = models.TextField()
    description_en = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='services/covers/')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
```

### ServiceImage Model
```python
class ServiceImage(models.Model):
    service = models.ForeignKey(Service, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='services/gallery/')
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
```

### TeamMember Model
```python
class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    title_tr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    specialty_tr = models.CharField(max_length=200)
    specialty_en = models.CharField(max_length=200, blank=True)
    bio_tr = models.TextField()
    bio_en = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team/')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
```

### BlogCategory Model
```python
class BlogCategory(models.Model):
    name_tr = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = "Blog Categories"
```

### BlogPost Model
```python
class BlogPost(models.Model):
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True)
    title_tr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    content_tr = models.TextField()
    content_en = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='blog/')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True)
    meta_description_tr = models.CharField(max_length=160, blank=True)
    meta_description_en = models.CharField(max_length=160, blank=True)
    is_published = models.BooleanField(default=False)
    publish_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-publish_date']
```

### Testimonial Model
```python
class Testimonial(models.Model):
    pet_photo = models.ImageField(upload_to='testimonials/')
    owner_name = models.CharField(max_length=200, blank=True)
    pet_name = models.CharField(max_length=200, blank=True)
    description = models.TextField(max_length=500, blank=True)
    email = models.EmailField()
    is_approved = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-submitted_at']
```

### ClinicGallery Model
```python
class ClinicGallery(models.Model):
    title_tr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='clinic/')
    category_tr = models.CharField(max_length=100)
    category_en = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Clinic Gallery"
```

### ContactMessage Model
```python
class ContactMessage(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
```

### SiteSettings Model (Singleton Pattern)
```python
class SiteSettings(models.Model):
    # Contact Information
    address_tr = models.TextField()
    address_en = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    
    # Working Hours
    working_hours_weekday_tr = models.CharField(max_length=200)
    working_hours_weekday_en = models.CharField(max_length=200, blank=True)
    working_hours_weekend_tr = models.CharField(max_length=200)
    working_hours_weekend_en = models.CharField(max_length=200, blank=True)
    
    # Map and Social Media
    google_maps_embed_url = models.URLField()
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    # Email Settings
    admin_email = models.EmailField(help_text="Email for receiving contact form and testimonial notifications")
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def save(self, *args, **kwargs):
        self.pk = 1  # Singleton pattern
        super().save(*args, **kwargs)
    
    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
```

---

## 🔌 API Endpoints (Django REST Framework)

### Services
```
GET  /api/services/           # List all active services (with cover_image only)
GET  /api/services/{id}/      # Detail with all images
```

### Team
```
GET  /api/team/               # List all active team members
```

### Blog
```
GET  /api/blog/categories/    # List all categories
GET  /api/blog/posts/         # List published posts (paginated, 10 per page)
GET  /api/blog/posts/{slug}/  # Post detail
```

### Testimonials
```
GET  /api/testimonials/       # List approved testimonials
POST /api/testimonials/submit/ # Submit new testimonial (public endpoint)
```

### Gallery
```
GET  /api/gallery/            # List clinic gallery images
```

### Contact
```
POST /api/contact/            # Submit contact form
GET  /api/settings/           # Get site settings (public info only)
```

---

## 🎨 Design Requirements

### Color Palette (Pastel Navy Tones)
```css
:root {
  --primary: #4A5F7F;      /* Soft Navy */
  --secondary: #7B93B0;    /* Dusty Blue */
  --accent: #A8C5DA;       /* Powder Blue */
  --light: #E8F0F7;        /* Ice Blue */
  --dark: #2C3E50;         /* Dark Slate */
  --success: #6EBA8C;      /* Soft Green */
  --warning: #F5A962;      /* Soft Orange */
  --white: #FFFFFF;
  --gray-light: #F5F7FA;
  --gray: #D1D9E0;
  --gray-dark: #8B95A5;
}
```

### Typography
```css
/* Install from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

/* Usage */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

body, p, span, a, button {
  font-family: 'Inter', sans-serif;
}
```

### Layout Structure

#### Navbar (Sticky)
- **Logo**: Left side, links to homepage
- **Menu Items**: 
  - Hizmetler (Services)
  - Ekibimiz (Our Team)
  - Blog
  - Galeri (Gallery)
  - Sizden Gelenler (From You)
  - İletişim (Contact)
- **Language Switcher**: TR/EN flags (right side)
- **Mobile**: Hamburger menu (< 768px)
- **Behavior**: Transparent on hero, solid white + shadow on scroll
- **Height**: 80px desktop, 60px mobile

#### Homepage Layout

**1. Hero Section**
- Full viewport height (100vh)
- Background: High-quality clinic photo with dark overlay (opacity: 0.4)
- Content (centered):
  - Main heading: "Evcil Dostlarınızın Sağlığı İçin Yanınızdayız" (48px, bold)
  - Subheading: "Modern veteriner hizmetleri ile hayvanlarınıza en iyi bakımı sunuyoruz" (20px)
  - CTA Buttons:
    - Primary: "Hizmetlerimiz" → scrolls to services section
    - Secondary: "İletişim" → goes to contact page
- Scroll down indicator (animated arrow)

**2. Services Preview Section**
- Title: "Hizmetlerimiz" (36px, centered)
- Subtitle: short intro text
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Show first 6 services
- Each card:
  - Cover image (aspect ratio 16:9)
  - Service title
  - Short excerpt (max 100 chars)
  - "Detaylar" button
- "Tüm Hizmetlerimiz" button at bottom → goes to full services page

**3. Team Section**
- Title: "Uzman Ekibimiz"
- Grid: 4 columns desktop, 2 tablet, 1 mobile
- Show all active team members
- Each card:
  - Profile photo (circular, 200x200px)
  - Name (18px, bold)
  - Title + Specialty (14px, gray)
  - On hover: Bio appears in overlay with smooth transition

**4. Blog Preview Section**
- Title: "Blog Yazılarımız"
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Show latest 3 published posts
- Each card:
  - Cover image
  - Category badge
  - Title (max 2 lines, ellipsis)
  - Excerpt (max 120 chars)
  - Publish date
  - "Devamını Oku" link
- "Tüm Blog Yazıları" button

**5. Testimonials Showcase**
- Title: "Sizden Gelenler"
- Subtitle: "Evcil dostlarınızın mutlu anlarını bizimle paylaşın"
- Masonry grid (Pinterest-style) or regular grid
- Show latest 9 approved testimonials
- Lightbox on image click
- Prominent CTA: "Fotoğrafını Paylaş" button → opens modal form

**6. Contact Information**
- Background: var(--light)
- Two columns (1 column on mobile)
- Left: Google Maps embed (iframe)
- Right:
  - Address (with icon)
  - Phone (clickable tel: link)
  - Email (clickable mailto: link)
  - Working hours (weekday + weekend)
  - Social media icons (if URLs provided)

#### Footer
- Background: var(--dark)
- Text color: white
- Three columns (stack on mobile):
  - Column 1: Quick Links (Hizmetler, Ekibimiz, Blog, İletişim)
  - Column 2: Contact info summary
  - Column 3: Social media icons (larger)
- Bottom bar: Copyright text "© 2024 [Klinik Adı]. Tüm hakları saklıdır."

---

## ✨ Animations (Framer Motion)

### General Animations
```javascript
// Scroll-triggered fade in
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" }
}

// Card hover
const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 30px rgba(74, 95, 127, 0.15)",
  transition: { duration: 0.3 }
}

// Button hover
const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
}
```

### Specific Implementations
- **Hero Section**: Text slides up with fade in on page load
- **Service Cards**: Fade in one by one (stagger 0.1s)
- **Team Cards**: Scale on hover + bio overlay slide up
- **Blog Cards**: Slight lift on hover with shadow
- **Images**: Lazy load with blur-up effect
- **Navbar**: Smooth background color change on scroll
- **Testimonial Modal**: Smooth fade + scale in/out

---

## 📧 Email Configuration

### Django Settings
```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.yourdomain.com'  # Provided by hosting provider
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'info@veterinerklinik.com'
EMAIL_HOST_PASSWORD = 'your-secure-password'
DEFAULT_FROM_EMAIL = 'Veteriner Kliniği <info@veterinerklinik.com>'
ADMIN_EMAIL = 'admin@veterinerklinik.com'  # Or get from SiteSettings
```

### Email Templates

**1. Contact Form Notification (to admin)**
```
Subject: Yeni İletişim Mesajı - [Full Name]

Merhaba,

Sitenizden yeni bir iletişim mesajı aldınız.

Gönderen: [Full Name]
Email: [Email]
Telefon: [Phone]

Mesaj:
[Message]

--
Gönderim Zamanı: [Timestamp]
```

**2. Testimonial Submission Notification (to admin)**
```
Subject: Yeni Fotoğraf Paylaşımı - Onay Bekliyor

Merhaba,

"Sizden Gelenler" bölümüne yeni bir fotoğraf paylaşıldı.

Evcil Hayvan Sahibi: [Owner Name or "Belirtilmemiş"]
Evcil Hayvan Adı: [Pet Name or "Belirtilmemiş"]
Gönderen Email: [Email]
Açıklama: [Description or "Yok"]

Fotoğrafı görüntülemek ve onaylamak için admin paneline gidin:
[Link to Django Admin Testimonials]

--
Gönderim Zamanı: [Timestamp]
```

**3. Testimonial Approval Confirmation (to user, optional)**
```
Subject: Fotoğrafınız Yayınlandı! 🐾

Merhaba,

Paylaştığınız fotoğraf sitemizde yayınlandı! "Sizden Gelenler" bölümünden görebilirsiniz.

Katkınız için teşekkür ederiz!

[Link to testimonials page]

--
[Klinik Adı]
```

---

## 🌍 LibreTranslate Integration

### Installation & Setup

**Option 1: Python Package (Recommended)**
```bash
pip install libretranslate
```

**Option 2: Docker (Alternative)**
```bash
docker run -d -p 5000:5000 libretranslate/libretranslate
```

### Django Implementation

**1. Create Translation Utility**
```python
# utils/translator.py
from libretranslate import Translator

def translate_to_english(text_tr):
    """
    Translates Turkish text to English using LibreTranslate
    """
    try:
        translator = Translator()
        translated = translator.translate(
            text=text_tr,
            source="tr",
            target="en"
        )
        return translated
    except Exception as e:
        print(f"Translation error: {e}")
        return ""  # Return empty string if translation fails
```

**2. Auto-translate on Model Save**
```python
# models.py (example for Service model)
from utils.translator import translate_to_english

class Service(models.Model):
    # ... fields ...
    
    def save(self, *args, **kwargs):
        # Auto-translate if English fields are empty
        if self.title_tr and not self.title_en:
            self.title_en = translate_to_english(self.title_tr)
        
        if self.description_tr and not self.description_en:
            self.description_en = translate_to_english(self.description_tr)
        
        super().save(*args, **kwargs)
```

**3. Admin Panel Custom Action**
```python
# admin.py
from django.contrib import admin

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title_tr', 'title_en', 'is_active', 'order']
    
    actions = ['regenerate_translations']
    
    def regenerate_translations(self, request, queryset):
        for obj in queryset:
            obj.title_en = translate_to_english(obj.title_tr)
            obj.description_en = translate_to_english(obj.description_tr)
            obj.save()
        
        self.message_user(request, f"{queryset.count()} translations regenerated.")
    
    regenerate_translations.short_description = "Regenerate English translations"
```

**Important Notes:**
- Admin can ALWAYS manually edit `*_en` fields
- Translation happens automatically but is NOT forced on save if `*_en` already has content
- LibreTranslate may have rate limits (check documentation)
- For production, consider caching translations or using a paid service for better quality

---

## 🔒 Security & Performance

### Security Measures

**1. File Upload Validation**
```python
# settings.py
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

# validators.py
from django.core.exceptions import ValidationError

def validate_image_size(image):
    max_size = 5 * 1024 * 1024  # 5MB
    if image.size > max_size:
        raise ValidationError("Image size cannot exceed 5MB")

def validate_image_type(image):
    allowed_types = ['image/jpeg', 'image/png', 'image/webp']
    if image.content_type not in allowed_types:
        raise ValidationError("Only JPEG, PNG, and WebP images are allowed")
```

**2. Rate Limiting (Django Ratelimit)**
```python
# Install: pip install django-ratelimit

# views.py
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST')
def contact_form_view(request):
    # Contact form logic
    pass

@ratelimit(key='ip', rate='3/h', method='POST')
def testimonial_submit_view(request):
    # Testimonial submission logic
    pass
```

**3. CSRF & XSS Protection**
- Django's CSRF middleware (enabled by default)
- React escapes content by default
- Use Django's `safe` filter only when necessary
- Sanitize user input in rich text fields

**4. Environment Variables**
```python
# settings.py
import os
from dotenv import load_env

load_env()

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

### Performance Optimization

**1. Image Optimization**
```python
# Install: pip install pillow django-imagekit

# models.py
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill, ResizeToFit

class Service(models.Model):
    cover_image = models.ImageField(upload_to='services/covers/')
    cover_thumbnail = ImageSpecField(
        source='cover_image',
        processors=[ResizeToFill(400, 300)],
        format='WEBP',
        options={'quality': 85}
    )
```

**2. Database Optimization**
```python
# Use select_related and prefetch_related
services = Service.objects.filter(is_active=True).prefetch_related('images')
posts = BlogPost.objects.select_related('category', 'author')

# Add indexes
class Service(models.Model):
    # ...
    class Meta:
        indexes = [
            models.Index(fields=['is_active', 'order']),
        ]
```

**3. Caching (Optional for Future)**
```python
# Install: pip install django-redis

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# views.py
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)  # Cache for 15 minutes
def services_list_view(request):
    # ...
```

**4. Frontend Optimization**
- Lazy load images (React Lazy Load Image Component)
- Code splitting (React.lazy + Suspense)
- Minimize bundle size (Vite automatically does tree-shaking)
- Use WebP format for images
- Implement pagination for blog posts

---

## 📦 Project Structure

```
veterinary-clinic/
│
├── backend/                      # Django project
│   ├── config/                   # Project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── apps/
│   │   ├── services/             # Services app
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── admin.py
│   │   │   └── urls.py
│   │   │
│   │   ├── team/                 # Team app
│   │   ├── blog/                 # Blog app
│   │   ├── testimonials/         # Testimonials app
│   │   ├── gallery/              # Gallery app
│   │   ├── contact/              # Contact app
│   │   └── core/                 # Core app (SiteSettings, etc.)
│   │
│   ├── media/                    # Uploaded files
│   │   ├── services/
│   │   ├── team/
│   │   ├── blog/
│   │   ├── testimonials/
│   │   └── clinic/
│   │
│   ├── static/                   # Static files
│   ├── utils/                    # Utility functions (translator, etc.)
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                     # React project
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── TeamMemberCard.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── contexts/
│   │   │   └── LanguageContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useApi.js
│   │   │
│   │   ├── utils/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Development Workflow

### Phase 1: Backend Setup (Django)

**Step 1: Initialize Django Project**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Django and dependencies
pip install django djangorestframework django-cors-headers pillow django-imagekit libretranslate python-dotenv django-ratelimit

# Create project
django-admin startproject config .

# Create apps
python manage.py startapp services
python manage.py startapp team
python manage.py startapp blog
python manage.py startapp testimonials
python manage.py startapp gallery
python manage.py startapp contact
python manage.py startapp core
```

**Step 2: Configure Settings**
```python
# config/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party
    'rest_framework',
    'corsheaders',
    'imagekit',
    
    # Local apps
    'apps.services',
    'apps.team',
    'apps.blog',
    'apps.testimonials',
    'apps.gallery',
    'apps.contact',
    'apps.core',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings (for development)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

**Step 3: Create Models**
- Define all models as specified in the Database Models section
- Add validators for image uploads
- Implement auto-translation in save() methods

**Step 4: Create Admin Interface**
```python
# Example: apps/services/admin.py
from django.contrib import admin
from .models import Service, ServiceImage

class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 1

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title_tr', 'is_active', 'order', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title_tr', 'title_en', 'description_tr']
    ordering = ['order', '-created_at']
    inlines = [ServiceImageInline]
    
    fieldsets = (
        ('Turkish Content', {
            'fields': ('title_tr', 'description_tr')
        }),
        ('English Content (Auto-translated)', {
            'fields': ('title_en', 'description_en'),
            'classes': ('collapse',)
        }),
        ('Media', {
            'fields': ('cover_image',)
        }),
        ('Settings', {
            'fields': ('is_active', 'order')
        }),
    )
    
    actions = ['regenerate_translations']
    
    def regenerate_translations(self, request, queryset):
        # Translation logic here
        pass
```

**Step 5: Create API Serializers & Views**
```python
# apps/services/serializers.py
from rest_framework import serializers
from .models import Service, ServiceImage

class ServiceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImage
        fields = ['id', 'image', 'order']

class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title_tr', 'title_en', 'cover_image', 'order']

class ServiceDetailSerializer(serializers.ModelSerializer):
    images = ServiceImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = ['id', 'title_tr', 'title_en', 'description_tr', 
                  'description_en', 'cover_image', 'images', 'order']
```

```python
# apps/services/views.py
from rest_framework import viewsets
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True).prefetch_related('images')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceDetailSerializer
```

**Step 6: Configure URLs**
```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.services.urls')),
    path('api/', include('apps.team.urls')),
    path('api/', include('apps.blog.urls')),
    path('api/', include('apps.testimonials.urls')),
    path('api/', include('apps.gallery.urls')),
    path('api/', include('apps.contact.urls')),
    path('api/', include('apps.core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

**Step 7: Run Migrations & Create Superuser**
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

### Phase 2: Frontend Setup (React + Vite)

**Step 1: Initialize React Project**
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

**Step 2: Install Dependencies**
```bash
npm install react-router-dom axios framer-motion tailwindcss postcss autoprefixer
npm install react-icons react-lazy-load-image-component
npx tailwindcss init -p
```

**Step 3: Configure Tailwind**
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A5F7F',
        secondary: '#7B93B0',
        accent: '#A8C5DA',
        light: '#E8F0F7',
        dark: '#2C3E50',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 4: Create API Utility**
```javascript
// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getServices = () => api.get('/services/');
export const getServiceDetail = (id) => api.get(`/services/${id}/`);
export const getTeam = () => api.get('/team/');
export const getBlogPosts = (page = 1) => api.get(`/blog/posts/?page=${page}`);
export const getBlogPostDetail = (slug) => api.get(`/blog/posts/${slug}/`);
export const getTestimonials = () => api.get('/testimonials/');
export const submitTestimonial = (formData) => api.post('/testimonials/submit/', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getGallery = () => api.get('/gallery/');
export const submitContact = (data) => api.post('/contact/', data);
export const getSiteSettings = () => api.get('/settings/');

export default api;
```

**Step 5: Create Language Context**
```javascript
// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('tr');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };
  
  const t = (trText, enText) => {
    return language === 'tr' ? trText : enText;
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

**Step 6: Create Components**

Example: Navbar Component
```javascript
// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-bold text-primary">
          VetKlinik
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li><Link to="/services">{t('Hizmetler', 'Services')}</Link></li>
          <li><Link to="/team">{t('Ekibimiz', 'Our Team')}</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/gallery">{t('Galeri', 'Gallery')}</Link></li>
          <li><Link to="/testimonials">{t('Sizden Gelenler', 'From You')}</Link></li>
          <li><Link to="/contact">{t('İletişim', 'Contact')}</Link></li>
        </ul>
        
        {/* Language Switcher */}
        <button onClick={toggleLanguage} className="btn-secondary">
          {language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
        </button>
        
        {/* Mobile Hamburger */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          {/* Mobile menu items */}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
```

**Step 7: Create Pages**

Example: Home Page
```javascript
// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getServices, getTeam, getBlogPosts, getTestimonials } from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import TeamMemberCard from '../components/TeamMemberCard';
// ... other imports

const Home = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  // ... other states
  
  useEffect(() => {
    // Fetch data
    getServices().then(res => setServices(res.data.slice(0, 6)));
    getTeam().then(res => setTeam(res.data));
    // ... other fetches
  }, []);
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero h-screen relative">
        <div className="overlay absolute inset-0 bg-black opacity-40"></div>
        <div className="content relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <motion.h1
            className="text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('Evcil Dostlarınızın Sağlığı İçin Yanınızdayız', 'We Are Here for Your Pets\' Health')}
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t('Modern veteriner hizmetleri ile hayvanlarınıza en iyi bakımı sunuyoruz', 
                'We provide the best care for your animals with modern veterinary services')}
          </motion.p>
          <div className="flex space-x-4">
            <button className="btn-primary">{t('Hizmetlerimiz', 'Our Services')}</button>
            <button className="btn-secondary">{t('İletişim', 'Contact')}</button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="services py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-12">
            {t('Hizmetlerimiz', 'Our Services')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Other sections... */}
    </div>
  );
};

export default Home;
```

**Step 8: Configure Routing**
```javascript
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;
```

---

## 🎯 Cursor Prompts (Step-by-Step Implementation)

Use these prompts in Cursor to build the project incrementally:

### Prompt 1: Backend Project Setup
```
Create a Django 4.x project for a Turkish veterinary clinic website with the following requirements:

1. Project name: "veterinary_clinic"
2. Install these packages: djangorestframework, django-cors-headers, pillow, django-imagekit, libretranslate, python-dotenv, django-ratelimit
3. Create these apps: services, team, blog, testimonials, gallery, contact, core
4. Configure settings.py with:
   - All apps registered in INSTALLED_APPS
   - CORS middleware configured for React frontend (localhost:5173)
   - Media files configuration (MEDIA_URL, MEDIA_ROOT)
   - Static files configuration
   - PostgreSQL database configuration using environment variables
5. Create a .env.example file with all required environment variables
6. Create requirements.txt

The website will be bilingual (Turkish primary, English secondary) with auto-translation via LibreTranslate.
```

### Prompt 2: Services App Models & Admin
```
Create the Services app with these specifications:

1. Models:
   - Service model with fields: title_tr, title_en, description_tr, description_en (TextField), cover_image, is_active, order, created_at, updated_at
   - ServiceImage model (many-to-one with Service): image, order
   - Implement auto-translation in Service.save() method using LibreTranslate
   
2. Admin interface:
   - ServiceAdmin with inline for ServiceImage
   - List display: title_tr, is_active, order, created_at
   - Filters: is_active
   - Search: title_tr, title_en, description_tr
   - Custom action: "Regenerate English translations"
   - Fieldsets: group Turkish content, English content (collapsible), Media, Settings
   
3. Add image validators: max 5MB size, only JPEG/PNG/WebP formats

4. Use django-imagekit to create thumbnail versions of cover_image

Follow Django best practices. Use Turkish field names for the primary language.
```

### Prompt 3: Services API (DRF)
```
Create REST API for Services app:

1. Serializers:
   - ServiceImageSerializer: id, image, order
   - ServiceListSerializer: id, title_tr, title_en, cover_image, order
   - ServiceDetailSerializer: all fields + nested images
   
2. ViewSet:
   - ServiceViewSet (ReadOnlyModelViewSet)
   - Filter by is_active=True
   - Use prefetch_related for images
   - Different serializers for list vs detail actions
   
3. URLs:
   - Register viewset with router
   - Endpoints: /api/services/ and /api/services/{id}/
   
4. Apply ordering: ['order', '-created_at']

Use Django REST Framework best practices.
```

### Prompt 4: Repeat for Other Apps
```
Create the Team app with the same structure (models, admin, API) based on these specifications:

Model fields:
- name (CharField)
- title_tr, title_en (CharField)
- specialty_tr, specialty_en (CharField)
- bio_tr, bio_en (TextField)
- photo (ImageField)
- is_active (BooleanField)
- order (IntegerField)

API should return all active team members ordered by 'order' field.
Admin should have similar features to Services admin.

[Repeat similar prompts for Blog, Testimonials, Gallery, Contact, and Core apps]
```

### Prompt 5: Testimonials with Email Notification
```
Create the Testimonials app with special requirements:

1. Model:
   - pet_photo (required), owner_name (optional), pet_name (optional), description (optional, max 500 chars), email (required)
   - is_approved (default False), submitted_at, approved_at
   
2. API:
   - Public POST endpoint for submission (with rate limiting: 3 per hour per IP)
   - GET endpoint returns only approved testimonials
   - On POST, send email notification to admin (get admin email from SiteSettings)
   
3. Email template should include: owner name, pet name, email, description, link to admin panel

4. Admin:
   - Show thumbnail in list view
   - Filter by is_approved
   - Bulk approve/reject actions
   - Clicking approve should set approved_at timestamp

Use django-ratelimit for rate limiting. Configure email in settings.py using environment variables.
```

### Prompt 6: Contact Form with Email
```
Create the Contact app:

1. Model: full_name, email, phone, message, is_read, created_at

2. API:
   - POST endpoint for form submission (rate limit: 5 per minute per IP)
   - Send email to admin on each submission
   - Return success message
   
3. Email template format:
   Subject: "Yeni İletişim Mesajı - [Full Name]"
   Body: Include all form fields + timestamp
   
4. Admin:
   - Mark as read/unread
   - Filter by is_read
   - Search by name, email

Implement proper error handling and validation.
```

### Prompt 7: Core App (SiteSettings Singleton)
```
Create the Core app with SiteSettings model:

1. Model fields (all with TR/EN versions where applicable):
   - address_tr, address_en
   - phone, email
   - working_hours_weekday_tr/en, working_hours_weekend_tr/en
   - google_maps_embed_url
   - facebook_url, instagram_url, twitter_url (optional)
   - admin_email (for notifications)
   
2. Implement Singleton pattern (only 1 instance allowed)

3. Admin:
   - Custom admin form
   - Clear fieldsets for each section
   
4. API:
   - GET endpoint returns public information (exclude sensitive data)
   - No POST/PUT/DELETE endpoints

Create a management command to initialize default settings.
```

### Prompt 8: LibreTranslate Utility
```
Create a translation utility in utils/translator.py:

1. Function: translate_to_english(text_tr) → text_en
2. Use LibreTranslate Python package
3. Handle errors gracefully (return empty string on failure)
4. Add optional caching to avoid redundant translations
5. Create a Django management command to bulk translate all existing content

Add this utility to all model save() methods for auto-translation.
```

### Prompt 9: Frontend React Setup
```
Initialize a React project with Vite:

1. Install dependencies:
   - react-router-dom, axios, framer-motion
   - tailwindcss, postcss, autoprefixer
   - react-icons, react-lazy-load-image-component
   
2. Configure Tailwind with custom colors:
   - primary: #4A5F7F
   - secondary: #7B93B0
   - accent: #A8C5DA
   - light: #E8F0F7
   - dark: #2C3E50
   
3. Add Google Fonts: Montserrat (headings), Inter (body)

4. Create basic project structure:
   - /components: Navbar, Footer, ServiceCard, TeamMemberCard, etc.
   - /pages: Home, Services, Team, Blog, BlogDetail, Gallery, Testimonials, Contact
   - /contexts: LanguageContext
   - /utils: api.js
   - /hooks: useApi.js (optional)
   
5. Set up proxy to Django backend in vite.config.js
```

### Prompt 10: Language Context & API Utility
```
Create language management system:

1. LanguageContext.jsx:
   - State: current language (default: 'tr')
   - Methods: toggleLanguage(), t(trText, enText)
   - Use React Context API
   
2. api.js utility:
   - Axios instance with base URL
   - Export functions for all API endpoints:
     * getServices(), getServiceDetail(id)
     * getTeam()
     * getBlogPosts(page), getBlogPostDetail(slug)
     * getTestimonials(), submitTestimonial(formData)
     * getGallery()
     * submitContact(data)
     * getSiteSettings()
   - Handle errors consistently
   - Set proper headers for multipart/form-data

Use async/await syntax. Add request interceptors if needed.
```

### Prompt 11: Navbar Component
```
Create a sticky Navbar component with these features:

1. Layout:
   - Logo on left (links to home)
   - Menu items: Hizmetler, Ekibimiz, Blog, Galeri, Sizden Gelenler, İletişim
   - Language switcher on right (TR/EN with flag icons)
   - Mobile: hamburger menu
   
2. Behavior:
   - Transparent on hero section
   - White background + shadow when scrolled
   - Smooth transition (Framer Motion)
   
3. Responsive:
   - Desktop: horizontal menu
   - Mobile: slide-in menu from right
   
4. Use useLanguage hook for translations
5. Apply Tailwind classes for styling

Implement smooth animations using Framer Motion.
```

### Prompt 12: Home Page - Hero Section
```
Create the Hero section for the Home page:

1. Full viewport height (100vh)
2. Background: high-quality image with dark overlay (opacity 0.4)
3. Centered content:
   - Main heading (Turkish): "Evcil Dostlarınızın Sağlığı İçin Yanınızdayız"
   - Subheading: "Modern veteriner hizmetleri ile hayvanlarınıza en iyi bakımı sunuyoruz"
   - Two CTA buttons: "Hizmetlerimiz" (primary) and "İletişim" (secondary)
4. Animated scroll indicator at bottom
5. Use Framer Motion for entrance animations:
   - Heading: fade in + slide up
   - Subheading: fade in (delayed)
   - Buttons: fade in (delayed)

Use useLanguage hook for bilingual text. Apply custom Tailwind classes.
```

### Prompt 13: Home Page - Services Preview
```
Create the Services Preview section:

1. Fetch first 6 services from API on component mount
2. Display in grid: 3 columns desktop, 2 tablet, 1 mobile
3. Each service card:
   - Cover image (aspect ratio 16:9)
   - Title (use t() for TR/EN)
   - Short excerpt (truncate description_tr/en to 100 chars)
   - "Detaylar" button
4. Framer Motion animations:
   - Cards fade in with stagger effect (0.1s delay between each)
   - Hover: scale 1.02 + shadow
5. "Tüm Hizmetlerimiz" button at bottom → links to /services page

Use LazyLoadImage for images. Handle loading and error states.
```

### Prompt 14: Service Card Component
```
Create a reusable ServiceCard component:

Props: service object, index (for stagger animation)

Features:
1. Image with lazy loading
2. Title and excerpt display
3. Hover effects:
   - Card lifts (scale 1.02)
   - Shadow increases
   - "Detaylar" button becomes visible
4. Click opens modal or navigates to detail page (your choice)
5. Framer Motion for entrance and hover animations

Use Tailwind for styling. Responsive design. Use useLanguage for translations.
```

### Prompt 15: Testimonials Page with Upload Form
```
Create the Testimonials page:

1. Display grid of approved testimonial photos (masonry or regular grid)
2. Lightbox on click to view full-size image
3. Show pet name + owner name if provided
4. Prominent "Fotoğrafını Paylaş" button opens modal

Modal form:
- File upload (drag & drop + click to browse)
- Optional fields: owner name, pet name, description
- Required: email
- Submit button with loading state
- On success: close modal + show success message
- On error: show error message

Use react-dropzone for file upload. Validate file size/type on frontend. Send as FormData to API.
```

### Prompt 16: Blog List & Detail Pages
```
Create Blog pages:

1. Blog List Page:
   - Fetch posts with pagination (10 per page)
   - Grid: 3 columns desktop, 2 tablet, 1 mobile
   - Each card: cover image, category badge, title, excerpt, date, "Devamını Oku" link
   - Category filter (optional)
   - Load more button or pagination controls
   
2. Blog Detail Page:
   - Fetch post by slug
   - Display: cover image, title, category, date, author, full content
   - Format content (dangerouslySetInnerHTML or use a markdown renderer)
   - "Back to Blog" button
   - Related posts section (optional)

Use Framer Motion for page transitions. Handle 404 for invalid slugs.
```

### Prompt 17: Contact Page
```
Create the Contact page with two-column layout:

Left Column:
- Google Maps embed (get URL from site settings)

Right Column:
- Contact form:
  * Fields: full name, email, phone, message
  * Validation (required, email format, phone format)
  * Submit button with loading state
  * Success/error messages
- Display site info below form:
  * Address, phone (clickable), email (clickable), working hours
  * Social media icons (if URLs provided)

Use Formik or React Hook Form for form handling. Send via axios to API.
Fetch site settings on mount. Use useLanguage for translations.
```

### Prompt 18: Footer Component
```
Create a responsive Footer:

1. Three-column layout (stack on mobile):
   - Column 1: Quick links (all pages)
   - Column 2: Contact info summary
   - Column 3: Social media icons (larger, from site settings)
   
2. Bottom bar: copyright text "© 2024 [Klinik Adı]. Tüm hakları saklıdır."

3. Styling:
   - Background: var(--dark)
   - Text: white
   - Links have hover effects
   
4. Use react-icons for icons

Fetch site settings for contact info and social links. Use useLanguage.
```

### Prompt 19: Team & Gallery Pages
```
Create Team and Gallery pages:

1. Team Page:
   - Grid: 4 columns desktop, 2 tablet, 1 mobile
   - Each card: photo (circular), name, title, specialty
   - Hover: bio overlay slides up
   - Framer Motion animations
   
2. Gallery Page:
   - Category filter tabs
   - Masonry or grid layout
   - Lightbox on click
   - Lazy loading

Fetch data from API. Use useLanguage. Apply consistent styling.
```

### Prompt 20: Optimization & Deployment Prep
```
Optimize the full stack application:

1. Backend:
   - Add database indexes to frequently queried fields
   - Implement select_related/prefetch_related
   - Configure django-imagekit for automatic image optimization
   - Set up ALLOWED_HOSTS for production
   - Create production settings file
   
2. Frontend:
   - Implement code splitting (React.lazy + Suspense)
   - Optimize images (WebP format, lazy loading)
   - Minify CSS/JS (Vite handles this)
   - Add meta tags for SEO in index.html
   - Create .env.production file
   
3. Create deployment guides:
   - Backend: Gunicorn + Nginx configuration
   - Frontend: Build process and static file serving
   - Environment variables documentation

Test the entire application. Fix any bugs. Ensure mobile responsiveness.
```

---

## ✅ Final Checklist

Before launching:

- [ ] All models created with auto-translation
- [ ] Admin panels configured and tested
- [ ] All API endpoints working
- [ ] Email notifications functioning
- [ ] Frontend responsive on all devices
- [ ] All animations smooth
- [ ] Image uploads and validation working
- [ ] Form validations in place
- [ ] Rate limiting applied
- [ ] SEO meta tags added
- [ ] Google Maps embedded
- [ ] Language switching works everywhere
- [ ] 404 and error pages created
- [ ] Production settings configured
- [ ] Security checklist reviewed
- [ ] Performance optimizations applied

---

## 📚 Additional Resources

- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- React Documentation: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- LibreTranslate: https://github.com/LibreTranslate/LibreTranslate

---

## 🎉 Success Metrics

Your veterinary clinic website will be successful when:

1. ✅ Admins can easily manage all content via Django Admin
2. ✅ Users can browse services, team, blog in both Turkish and English
3. ✅ Pet owners can submit photos with easy approval workflow
4. ✅ Contact forms are received and processed quickly
5. ✅ Website loads fast and looks professional
6. ✅ Mobile experience is seamless
7. ✅ Content is automatically translated but editable

---

**REMEMBER**: This website is for a TURKISH veterinary clinic. All default content, forms, and UI should be in TURKISH with English as a secondary option.

Good luck with your project! 🐕🐈🚀
