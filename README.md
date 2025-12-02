# Veliora TechWorks Portfolio

A premium, modern portfolio website built with Next.js 14, featuring a sleek design inspired by the Veliora TechWorks brand identity.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Premium Design**: Metallic gradients, glassmorphism, neon accents
- **Fully Responsive**: Desktop, tablet, and mobile optimized
- **Admin Dashboard**: Content management system for projects and contacts
- **Contact Form**: Functional contact form with API integration
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## 🎨 Design System

### Colors
- **Primary**: #000000 (Black background)
- **Secondary**: #FFFFFF (White text)
- **Accent**: #C0C0C0 (Silver metallic)
- **Neon**: #00E0FF (Futuristic blue)
- **Purple**: #8A8AFF (Accent purple)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd veliora-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   ├── ui/                # UI components
│   ├── Footer.tsx         # Footer component
│   └── Navigation.tsx     # Navigation component
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@veliora.tech"
ADMIN_PASSWORD="your-admin-password"
```

## 📱 Pages

- **Home**: Hero section with animated logo and call-to-action
- **About**: Company mission, skills matrix, and timeline
- **Services**: Detailed service offerings with pricing
- **Projects**: Portfolio showcase with filtering
- **Contact**: Contact form with company information
- **Admin**: Dashboard for content management

## 🎯 Key Components

### Navigation
- Glassmorphism design
- Responsive mobile menu
- Animated Veliora logo

### Hero Section
- 3D animated logo
- Floating particles
- Smooth scroll indicators

### Contact Form
- Form validation
- API integration
- Success/error handling

### Admin Dashboard
- Project management
- Contact message handling
- Site configuration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🛠️ Development

### Adding New Components

1. Create component in `components/` directory
2. Export from appropriate index file
3. Import and use in pages

### Styling Guidelines

- Use Tailwind utility classes
- Follow the established color palette
- Maintain consistent spacing and typography
- Use Framer Motion for animations

### API Routes

- Located in `app/api/` directory
- Follow RESTful conventions
- Include proper error handling
- Validate input data

## 📄 License

This project is proprietary and confidential. All rights reserved by Veliora TechWorks.

## 🤝 Support

For support and inquiries, contact us at hello@veliora.tech

---

Built with ❤️ by Veliora TechWorks