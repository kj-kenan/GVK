# Göztepe Veteriner Kliniği - Frontend

Modern React frontend for Göztepe Veteriner Kliniği website.

## Features

- ⚡ Vite for fast development
- 🎨 Tailwind CSS for styling
- 🌍 Bilingual support (Turkish/English)
- ✨ Framer Motion animations
- 📱 Fully responsive design
- 🖼️ Lazy loading images
- 🎯 SEO optimized

## Prerequisites

- Node.js 18+ or higher
- npm or yarn

## Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Copy Logo

Make sure `logo.png` is in the `frontend/public/` directory.

### 3. Configure Environment (Optional)

Create `.env.local` if you need custom configuration:

```env
VITE_API_URL=http://localhost:8000
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173/

## Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## Project Structure

```
frontend/
├── public/
│   └── logo.png              # Clinic logo
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── TeamMemberCard.jsx
│   │   ├── BlogCard.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── ContactForm.jsx
│   │   ├── TestimonialUploadModal.jsx
│   │   ├── ServiceModal.jsx
│   │   └── Loading.jsx
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Team.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Gallery.jsx
│   │   ├── Testimonials.jsx
│   │   └── Contact.jsx
│   ├── contexts/             # React contexts
│   │   └── LanguageContext.jsx
│   ├── hooks/                # Custom hooks
│   │   └── useApi.js
│   ├── utils/                # Utility functions
│   │   └── api.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Overview

### Pages

- **Home**: Hero section, services preview, team, blog, testimonials
- **Services**: All services with modal details
- **Team**: Team members grid with bio on hover
- **Blog**: Blog posts with category filtering and pagination
- **Blog Detail**: Individual blog post view
- **Gallery**: Clinic gallery with category filters and lightbox
- **Testimonials**: Customer photos with upload functionality
- **Contact**: Contact form, info, and Google Maps

### Components

- **Navbar**: Sticky navbar with language switcher and mobile menu
- **Footer**: Three-column footer with links and contact info
- **Cards**: Service, Team, Blog, Testimonial cards with animations
- **Forms**: Contact form and testimonial upload with validation
- **Modals**: Service detail modal and testimonial upload modal
- **Loading**: Loading spinner component

### Language Support

The website supports Turkish (primary) and English languages:
- Language switcher in navbar
- Persists selection in localStorage
- Uses `LanguageContext` for state management
- `getField()` helper for bilingual content

### Animations

Powered by Framer Motion:
- Page entrance animations
- Scroll-triggered animations
- Hover effects
- Modal transitions
- Smooth page transitions

## API Integration

The frontend connects to the Django backend API:
- Services: GET /api/services/
- Team: GET /api/team/
- Blog: GET /api/blog/posts/
- Testimonials: GET /api/testimonials/, POST /api/testimonials/submit/
- Gallery: GET /api/gallery/
- Contact: POST /api/contact/
- Settings: GET /api/settings/

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: '#4A5F7F',
  secondary: '#7B93B0',
  accent: '#A8C5DA',
  // ...
}
```

### Fonts

Google Fonts are loaded in `index.html`:
- Montserrat (headings)
- Inter (body text)

## Performance

- Code splitting with React.lazy
- Image lazy loading
- Optimized bundle with Vite
- WebP image format support
- Responsive images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Development Tips

- Use React DevTools for debugging
- Check console for API errors
- Test on different screen sizes
- Verify language switching works correctly

## Deployment

For production deployment:

1. Build the project: `npm run build`
2. Deploy `dist/` folder to your hosting (Vercel, Netlify, etc.)
3. Configure API URL if different from development
4. Ensure logo.png is in public folder before building

## License

© 2024 Göztepe Veteriner Kliniği. All rights reserved.


