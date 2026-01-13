# Göztepe Veteriner Kliniği - Backend

Django REST API backend for Göztepe Veteriner Kliniği website.

## Features

- 🌍 Bilingual support (Turkish/English) with automatic translation via LibreTranslate
- 📝 Complete CMS with Django Admin
- 🖼️ Image upload and optimization with django-imagekit
- 📧 Email notifications for contact forms and testimonials
- 🔒 Rate limiting on public endpoints
- 🎨 RESTful API with Django REST Framework

## Prerequisites

- Python 3.9 or higher
- Docker Desktop (for LibreTranslate)

## Installation

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Start LibreTranslate (Docker)

From the project root directory:

```bash
docker-compose up -d
```

This will start LibreTranslate on http://localhost:5000

To check if it's running:
```bash
curl http://localhost:5000/languages
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite for development)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# Email Configuration
EMAIL_HOST=localhost
EMAIL_PORT=1025
EMAIL_USE_TLS=False
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
DEFAULT_FROM_EMAIL=Göstepe Veteriner Kliniği <info@gostepeveteriner.com>
ADMIN_EMAIL=admin@gostepeveteriner.com

# LibreTranslate
LIBRETRANSLATE_URL=http://localhost:5000
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

### 7. Initialize Site Settings

```bash
python manage.py init_settings
```

### 8. Run Development Server

```bash
python manage.py runserver
```

The API will be available at http://localhost:8000/
Admin panel: http://localhost:8000/admin/

## API Endpoints

### Services
- `GET /api/services/` - List all active services
- `GET /api/services/{id}/` - Service detail with gallery

### Team
- `GET /api/team/` - List all active team members

### Blog
- `GET /api/blog/categories/` - List blog categories
- `GET /api/blog/posts/` - List published posts (paginated)
- `GET /api/blog/posts/{slug}/` - Post detail

### Testimonials
- `GET /api/testimonials/` - List approved testimonials
- `POST /api/testimonials/submit/` - Submit new testimonial

### Gallery
- `GET /api/gallery/` - List clinic gallery images

### Contact
- `POST /api/contact/` - Submit contact form

### Settings
- `GET /api/settings/` - Get public site settings

## Project Structure

```
backend/
├── apps/
│   ├── services/      # Services module
│   ├── team/          # Team members module
│   ├── blog/          # Blog system
│   ├── testimonials/  # Customer testimonials
│   ├── gallery/       # Clinic gallery
│   ├── contact/       # Contact form
│   └── core/          # Site settings
├── config/            # Django settings
├── media/             # Uploaded files
├── utils/             # Utilities (translator, validators)
├── manage.py
└── requirements.txt
```

## Translation System

The system automatically translates Turkish content to English using LibreTranslate when saving:

1. Admin enters content in Turkish
2. System automatically generates English translation
3. Admin can manually edit the English translation
4. Use "Regenerate English translations" action in admin to re-translate

## Email Testing (Development)

For development, you can use Python's SMTP debugging server:

```bash
python -m smtpd -n -c DebuggingServer localhost:1025
```

This will print all outgoing emails to the console.

## Docker Commands

```bash
# Start LibreTranslate
docker-compose up -d

# Stop LibreTranslate
docker-compose down

# View logs
docker-compose logs -f libretranslate

# Restart LibreTranslate
docker-compose restart libretranslate
```

## Production Deployment

See `DEPLOYMENT.md` for production deployment instructions.

## License

© 2024 Göztepe Veteriner Kliniği. All rights reserved.


