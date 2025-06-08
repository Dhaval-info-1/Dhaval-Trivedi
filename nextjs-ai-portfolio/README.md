# Next.js AI Portfolio

A modern, SEO-optimized portfolio and blog built with Next.js, featuring advanced AI integrations, analytics, and marketing tools.

## Features

- **Next.js**: Static site generation (SSG) and server-side rendering (SSR) for optimal SEO and performance.
- **TypeScript**: Type-safe code for better maintainability.
- **Blog**: Markdown/MDX-based blog with frontmatter for SEO and metadata.
- **SEO**: Advanced SEO with meta tags, Open Graph, Twitter Cards, JSON-LD, canonical tags, and structured data.
- **PWA**: Progressive Web App support with manifest, icons, and service worker.
- **Analytics**: Google Analytics or Plausible integration.
- **Newsletter**: Mailchimp or Buttondown integration for newsletter signups.
- **AI Features**: AI-powered blog post suggestions, chatbot, or search (optional).
- **Social Sharing**: Easy sharing on Twitter, LinkedIn, and Facebook.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-ai-portfolio.git
   cd nextjs-ai-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-ai-portfolio/
├── components/       # Reusable UI components
├── pages/            # Next.js pages
├── public/           # Static assets (images, icons, etc.)
├── styles/           # Global styles and CSS modules
├── lib/              # Utility functions and configurations
├── content/          # Blog posts (Markdown/MDX)
└── README.md         # Project documentation
```

## Deployment

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Vercel will automatically deploy your site.

## Adding Blog Posts

1. Create a new Markdown/MDX file in `content/blog/`.
2. Add frontmatter for SEO and metadata:
   ```markdown
   ---
   title: "Your Blog Post Title"
   date: "2024-07-17"
   description: "A brief description of your post."
   author: "Your Name"
   ---
   ```

3. Write your content in Markdown/MDX.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (if used)
- [MDX](https://mdxjs.com/) (if used)
