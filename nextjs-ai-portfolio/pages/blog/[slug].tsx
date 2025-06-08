import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from 'react-icons/fa';

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    author: string;
  };
}

export default function BlogPost({ mdxSource, frontMatter }: BlogPostProps) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{frontMatter.title} | Dhaval Makwana</title>
        <meta name="description" content={frontMatter.description} />
        <meta name="author" content={frontMatter.author} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://dhavalmakwana.com/blog/${frontMatter.title.toLowerCase().replace(/\s+/g, '-')}`} />
        <meta property="og:image" content="https://dhavalmakwana.com/images/7d.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
        <meta name="twitter:image" content="https://dhavalmakwana.com/images/7d.jpg" />
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

      <main className="pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-accent mb-4">{frontMatter.title}</h1>
          <p className="text-textSecondary mb-8">{frontMatter.date} • {frontMatter.author}</p>
          <div className="prose prose-invert max-w-none">
            <MDXRemote {...mdxSource} />
          </div>
        </article>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary border-t border-accent">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-textSecondary">&copy; 2024 Dhaval Makwana. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all blog post slugs from your content directory or CMS
  const posts = ['genai-foundations', 'ai-ethics', 'ai-applications'];
  const paths = posts.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  // Fetch the blog post content and frontmatter from your content directory or CMS
  const post = {
    content: '# Your MDX content here',
    frontMatter: {
      title: 'Understanding Transformer Architecture: A Deep Dive',
      date: '2024-07-17',
      description: 'A comprehensive technical analysis of transformer architecture, exploring attention mechanisms, positional encoding, and model parallelism.',
      author: 'Dhaval Makwana',
    },
  };
  const mdxSource = await serialize(post.content);
  return { props: { mdxSource, frontMatter: post.frontMatter } };
}; 