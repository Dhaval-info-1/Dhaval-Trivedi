import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'; // Keep Link for potential internal links in MDX or header
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Assuming Header component is correctly imported if used in the actual layout
// For this task, we focus on getStaticPaths and getStaticProps
// import Header from '../../src/components/Header'; // This would be typical

// Import social icons if they are used in the MDX content or footer, otherwise can be removed if not.
// For now, keeping them as they were in the original file.
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from 'react-icons/fa';
import Header from '../../src/components/Header'; // Added Header import

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    author: string;
    image?: string; // Optional image property in frontmatter
    // Add any other frontmatter properties you expect, e.g., tags
  };
  slug: string; // To construct canonical URL
}

// Define the path to the blog posts directory
const postsDirectory = path.join(process.cwd(), 'nextjs-ai-portfolio', 'content', 'blog');

export default function BlogPost({ mdxSource, frontMatter, slug }: BlogPostProps) {
  // Construct canonical URL (assuming a base URL, replace with actual domain)
  const siteUrl = 'https://dhavalmakwana.com'; // Replace with actual site URL
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  return (
    <div className="min-h-screen bg-background text-text"> {/* Ensure bg and text colors are set */}
      <Head>
        <title>{frontMatter.title} | Dhaval Makwana</title>
        <meta name="description" content={frontMatter.description} />
        <meta name="author" content={frontMatter.author} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {frontMatter.image && <meta property="og:image" content={frontMatter.image.startsWith('http') ? frontMatter.image : `${siteUrl}${frontMatter.image}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
        {frontMatter.image && <meta name="twitter:image" content={frontMatter.image.startsWith('http') ? frontMatter.image : `${siteUrl}${frontMatter.image}`} />}
      </Head>

      <Header /> {/* Using the refactored Header */}

      <main className="pt-24 md:pt-28"> {/* Added more padding top due to fixed header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-accent mb-3 md:mb-4">{frontMatter.title}</h1>
            <p className="text-sm md:text-base text-textSecondary">
              Published on {new Date(frontMatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} by {frontMatter.author}
            </p>
          </header>
          {/* Apply Tailwind typography styles if not already global */}
          <div className="prose prose-lg prose-invert max-w-none mx-auto">
            <MDXRemote {...mdxSource} />
          </div>
        </article>
      </main>

      {/* Footer can be refactored into a component as well */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary border-t border-accent mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-textSecondary">&copy; {new Date().getFullYear()} Dhaval Makwana. All Rights Reserved.</p>
          {/* Social links could be added here if desired */}
        </div>
      </footer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (err) {
    console.error("Error reading blog posts directory:", err);
    // Return empty paths if directory doesn't exist or is unreadable
    return { paths: [], fallback: false };
  }

  const paths = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading blog post file: ${filePath}`, err);
    return { notFound: true }; // Return 404 if file not found or unreadable
  }

  const { data, content } = matter(fileContent);

  let mdxSource;
  try {
    mdxSource = await serialize(content, {
      // Optionally pass MDX options here, like mdxOptions: { remarkPlugins: [], rehypePlugins: [] }
      // and scope for custom components if needed
    });
  } catch (err) {
    console.error(`Error serializing MDX for slug ${slug}:`, err);
    // Decide how to handle serialization errors, maybe return a specific error prop or 404/500
    return { notFound: true }; // Or handle differently
  }

  return {
    props: {
      mdxSource,
      frontMatter: {
        ...data, // Spread all frontmatter data
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(), // Ensure date is serializable
      },
      slug,
    },
  };
};