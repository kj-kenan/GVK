# 🐾 Göztepe Veteriner Kliniği Website

Modern, full-stack veterinary clinic website with bilingual support (Turkish/English) and automatic translation.

## 📍 Clinic Information
- **Address**: Merdivenköy, Fahrettin Kerim Gökay Cd 259/4, 34732 Kadıköy/İstanbul
- **Phone**: 0216 411 65 20
- **Email**: goztepevet@gmail.com
- **Location**: [Google Maps](https://maps.app.goo.gl/4HTpEoY2Cvhkbk2AA)

## 🌟 Features

- 🌍 **Bilingual Support**: Turkish (primary) and English with automatic translation via LibreTranslate
- 📝 **Content Management**: Complete Django Admin CMS
- 🎨 **Modern Design**: Beautiful UI with Tailwind CSS and Framer Motion animations
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🖼️ **Media Management**: Image upload with automatic optimization
- 📧 **Email Notifications**: Automatic emails for forms and submissions
- 🔒 **Rate Limiting**: Protection against spam
- ⚡ **Fast Performance**: Optimized with Vite and lazy loading

## 🛠️ Technology Stack

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL / SQLite
- LibreTranslate (Docker)
- django-imagekit

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## 📦 Installation

### Prerequisites

- Python 3.9+
- Node.js 18+
- Docker Desktop

### 1. Clone Repository

```bash
git clone <repository-url>
cd GVK
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Copy .env.example and update values

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Initialize site settings
python manage.py init_settings

# Run server
python manage.py runserver
```

Backend will be available at http://localhost:8000/

### 3. Start LibreTranslate (Docker)

From the project root:

```bash
docker-compose up -d
```

LibreTranslate will be available at http://localhost:5000/

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy logo to public folder (already done)
# cp ../logo.png public/

# Start development server
npm run dev
```

Frontend will be available at http://localhost:5173/

## 📁 Project Structure

```
GVK/
├── backend/                    # Django backend
│   ├── apps/                   # Django apps
│   │   ├── services/
│   │   ├── team/
│   │   ├── blog/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   ├── contact/
│   │   └── core/
│   ├── config/                 # Django settings
│   ├── utils/                  # Utilities
│   └── manage.py
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── utils/
│   └── public/
├── docker-compose.yml
├── logo.png
└── README.md
```

## 🚀 Usage

### Admin Panel

1. Access at http://localhost:8000/admin/
2. Login with superuser credentials
3. Manage all content (services, team, blog, gallery, etc.)
4. Content is automatically translated to English

### API Endpoints

- **Services**: `/api/services/`
- **Team**: `/api/team/`
- **Blog**: `/api/blog/posts/`
- **Testimonials**: `/api/testimonials/`
- **Gallery**: `/api/gallery/`
- **Contact**: `/api/contact/`
- **Settings**: `/api/settings/`

See full API documentation in `backend/README.md`

## 🎨 Customization

### Colors

Edit `frontend/tailwind.config.js`:

```js
colors: {
  primary: '#4A5F7F',      // Main brand color
  secondary: '#7B93B0',    // Secondary color
  accent: '#A8C5DA',       // Accent color
  // ...
}
```

### Logo

Replace `logo.png` in the root directory and `frontend/public/`

### Site Settings

Configure via Django Admin → Site Settings:
- Address, phone, email
- Working hours
- Social media links
- Google Maps URL

## 📧 Email Configuration

For production, configure email settings in `backend/.env`:

```env
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=info@gostepeveteriner.com
EMAIL_HOST_PASSWORD=your-password
```

## 🐳 Docker Commands

```bash
# Start LibreTranslate
docker-compose up -d

# Stop LibreTranslate
docker-compose down

# View logs
docker-compose logs -f libretranslate

# Restart
docker-compose restart libretranslate
```

## 📝 Content Management

### Adding Services

1. Go to Admin → Services
2. Click "Add Service"
3. Enter Turkish content (English is auto-translated)
4. Upload cover image and gallery images
5. Save

### Publishing Blog Posts

1. Go to Admin → Blog → Posts
2. Create new post with Turkish content
3. Upload cover image
4. Select category
5. Check "Published" and save

### Managing Testimonials

1. Users submit photos via website
2. Admin receives email notification
3. Review in Admin → Testimonials
4. Approve or reject

## 🔒 Security

- CSRF protection enabled
- Rate limiting on forms
- Image upload validation
- XSS protection
- Secure password hashing

## ⚡ Performance

- Image optimization with django-imagekit
- Lazy loading images
- Code splitting
- CDN-ready
- Optimized database queries

## 🌐 Deployment

### Backend (Django)

- Use Gunicorn + Nginx
- Set DEBUG=False
- Configure PostgreSQL
- Set up static/media file serving
- Use environment variables for secrets

### Frontend (React)

- Build: `npm run build`
- Deploy `dist/` folder to Vercel/Netlify
- Configure API URL

See deployment guides in respective README files.

## 📄 License

© 2024 Göztepe Veteriner Kliniği. All rights reserved.

## 🤝 Support

For issues or questions, please contact the development team.

## 📚 Additional Documentation

- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
- [Requirements Specification](veterinary_clinic_requirements.md)


