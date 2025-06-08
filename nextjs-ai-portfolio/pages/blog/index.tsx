// Make sure to install 'gray-matter' and 'react-icons/fa' for this page to work:
// npm install gray-matter react-icons
import Head from 'next/head';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from 'react-icons/fa';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { IconType } from 'react-icons';

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDir);
  const posts: BlogPostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      author: data.author || '',
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
  return { props: { posts } };
}

export default function BlogIndex({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>Blog | Dhaval Makwana</title>
        <meta name="description" content="Insights, tutorials, and thought leadership on AI, technology, and innovation." />
        <meta name="keywords" content="AI, blog, technology, innovation, Dhaval Makwana" />
        <meta property="og:title" content="Blog | Dhaval Makwana" />
        <meta property="og:description" content="Insights, tutorials, and thought leadership on AI, technology, and innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dhavalmakwana.com/blog" />
        <meta property="og:image" content="https://dhavalmakwana.com/images/7d.jpg" />
      </Head>
      <header className="fixed top-0 w-full bg-primary bg-opacity-90 border-b border-accent z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-mono text-accent">DM<span className="text-text">.</span></Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/#about" className="text-text hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/#experience" className="text-text hover:text-accent transition-colors">Experience</Link></li>
              <li><Link href="/#projects" className="text-text hover:text-accent transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="text-text hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="btn-primary">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="pt-20 pb-16">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-accent mb-4">Blog</h1>
          <p className="text-textSecondary mb-10">Insights, tutorials, and thought leadership on AI, technology, and innovation.</p>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-secondary rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-accent">
                <h2 className="text-2xl font-bold text-accent mb-2">{post.title}</h2>
                <p className="text-textSecondary text-sm mb-2">{post.date} • {post.author}</p>
                <p className="text-text mb-4">{post.description}</p>
                <span className="text-accent font-semibold">Read more →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary border-t border-accent">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-textSecondary">&copy; 2024 Dhaval Makwana. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
} 