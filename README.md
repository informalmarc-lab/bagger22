# Bagco Website

A modern, professional website for Bagco - a paper bag manufacturing business.

## Features

- **Home Page**: Hero section with call-to-action buttons and feature highlights
- **About Page**: Company information and mission
- **Catalog Page**: Product listings with descriptions and sizes
- **Gallery Page**: Visual showcase of paper bag designs
- **Contact Page**: Contact form and business information

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-friendly across all devices

## Getting Started

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\MarcC\bagco
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Adding Images

1. Create a `public/images/` folder
2. Add your images (logo, gallery photos, etc.)
3. Update image paths in the components

### Updating Content

- Edit page files in `app/` directory
- Modify navigation in `components/Navbar.tsx`
- Update footer in `components/Footer.tsx`
- Change colors in `tailwind.config.js`

### Contact Form

The contact form currently logs to console. To make it functional:
1. Set up a backend API endpoint
2. Update the form submission handler in `app/contact/page.tsx`
3. Add form validation and error handling

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── catalog/        # Catalog page
│   ├── gallery/        # Gallery page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
└── public/             # Static assets
```

## Deployment

This site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any hosting service** that supports Node.js

For Vercel:
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

## License

All rights reserved - Bagco
