import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../../src/components/Header'; // Import the shared Header

interface PostData {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    description:string;
    author: string;
    image?: string; // Optional image
    // Add other frontmatter fields you expect, e.g., tags
  };
}

interface BlogIndexProps {
  allPosts: PostData[];
}

// Define the path to the blog posts directory
const postsDirectory = path.join(process.cwd(), 'content', 'blog');
// Define site URL for generating absolute image URLs if needed
const siteUrl = 'https://dhavalmakwana.com'; // Replace with actual site URL

export default function BlogIndexPage({ allPosts }: BlogIndexProps) {
  return (
    <div className="min-h-screen bg-background text-text">
      <Head>
        <title>Blog | Dhaval Makwana</title>
        <meta name="description" content="Latest articles and insights on AI, project management, and technology by Dhaval Makwana." />
        <meta property="og:title" content="Blog | Dhaval Makwana" />
        <meta property="og:description" content="Latest articles and insights on AI, project management, and technology." />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <link rel="canonical" href={`${siteUrl}/blog`} />
      </Head>

      <Header />

      <main className="pt-24 md:pt-28">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-accent">Blog</h1>
            <p className="text-lg text-textSecondary mt-2">
              Explore the latest articles and insights.
            </p>
          </header>

          {allPosts.length === 0 ? (
            <p className="text-center text-textSecondary">No blog posts found. Check back soon!</p>
          ) : (
            <div className="grid gap-8 md:gap-12">
              {allPosts.map(({ slug, frontMatter }) => (
                <article key={slug} className="p-6 bg-secondary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {frontMatter.image && (
                    <Link href={`/blog/${slug}`} legacyBehavior>
                      <a>
                        <img
                          src={frontMatter.image.startsWith('http') ? frontMatter.image : `${siteUrl}${frontMatter.image}`}
                          alt={frontMatter.title}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      </a>
                    </Link>
                  )}
                  <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-2">
                    <Link href={`/blog/${slug}`} legacyBehavior>
                      <a className="hover:underline">{frontMatter.title}</a>
                    </Link>
                  </h2>
                  <p className="text-sm text-textSecondary mb-3">
                    {new Date(frontMatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {frontMatter.author && ` by ${frontMatter.author}`}
                  </p>
                  <p className="text-textSecondary mb-4 line-clamp-3">
                    {frontMatter.description}
                  </p>
                  <Link href={`/blog/${slug}`} legacyBehavior>
                    <a className="text-accent hover:underline font-medium">Read more &rarr;</a>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary border-t border-accent mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-textSecondary">&copy; {new Date().getFullYear()} Dhaval Makwana. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (err) {
    console.error("Error reading blog posts directory for index page:", err);
    fileNames = []; // Initialize to empty array if directory doesn't exist
  }

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName): PostData | null => {
      const slug = fileName.replace(/\.mdx$/, '');
      const filePath = path.join(postsDirectory, fileName);
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent); // Only need frontmatter here

        // Basic validation for essential frontmatter
        if (!data.title || !data.date || !data.description) {
          console.warn(`Skipping ${fileName} due to missing essential frontmatter (title, date, or description).`);
          return null;
        }

        return {
          slug,
          frontMatter: {
            title: data.title,
            date: new Date(data.date).toISOString(), // Ensure date is serializable and consistent
            description: data.description,
            author: data.author || "Dhaval Makwana", // Default author
            image: data.image || null, // Optional image
          },
        };
      } catch (readError) {
        console.error(`Error reading or parsing frontmatter for ${fileName}:`, readError);
        return null; // Skip this post if there's an error
      }
    })
    .filter((post): post is PostData => post !== null); // Filter out nulls from map

  // Sort posts by date in descending order (newest first)
  const sortedPosts = allPostsData.sort((a, b) => {
    return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
  });

  return {
    props: {
      allPosts: sortedPosts,
    },
  };
};