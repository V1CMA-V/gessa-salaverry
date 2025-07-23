# Gessa Salaverry - Movie Dashboard 🎬

A modern, responsive movie management dashboard built with Next.js 15, Supabase, and cutting-edge UI libraries. This application provides a comprehensive interface for managing and visualizing movie data with an elegant, user-friendly design.

## ✨ Features

- **📊 Interactive Dashboard** - Comprehensive overview with data visualization
- **🎥 Movie Management** - Full CRUD operations for movie records
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI** - Built with Radix UI components and Tailwind CSS
- **⚡ Real-time Data** - Powered by Supabase for instant updates
- **🌙 Theme Support** - Dark/light mode toggle
- **📈 Data Visualization** - Charts and analytics with MUI X Charts
- **🔍 Advanced Filtering** - Sortable and searchable data tables

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) with App Router
- **Database:** [Supabase](https://supabase.com) (PostgreSQL)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [Radix UI](https://radix-ui.com) + [Material-UI](https://mui.com)
- **Charts:** [MUI X Charts](https://mui.com/x/react-charts/)
- **Forms:** [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Animations:** [Framer Motion](https://framer.com/motion)
- **Icons:** [Lucide React](https://lucide.dev) + [Tabler Icons](https://tabler.io/icons)
- **TypeScript:** Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gessa-salaverry.git
   cd gessa-salaverry
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Generate database types**
   ```bash
   npm run gen:types
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/       # Dashboard pages and layouts
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions and Supabase client
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
└── lib/               # Shared libraries and configurations
```

## 🎯 Key Features

### Dashboard Overview
- Real-time movie statistics and metrics
- Interactive charts and data visualizations
- Quick access to recent movies and activities

### Movie Management
- Add, edit, and delete movie records
- Advanced search and filtering capabilities
- Sortable data tables with pagination
- Drag-and-drop functionality for reordering

### User Experience
- Responsive design that works on all devices
- Smooth animations and transitions
- Intuitive navigation with sidebar layout
- Accessible components following WCAG guidelines

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run gen:types` - Generate TypeScript types from Supabase

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every push to main

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js:
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [DigitalOcean App Platform](https://digitalocean.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Supabase](https://supabase.com) for the backend infrastructure
- [Vercel](https://vercel.com) for hosting and deployment
- [Radix UI](https://radix-ui.com) for accessible component primitives

---

**Built with ❤️ using Next.js and modern web technologies**
