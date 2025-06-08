// Metadata and SEO management
class BlogMetadataManager {
    constructor() {
        this.config = null;
        this.posts = new Map();
        this.categories = new Map();
    }

    async initialize() {
        try {
            const response = await fetch('/config/blog-config.json');
            this.config = await response.json();
            this.setupMetadata();
        } catch (error) {
            console.error('Failed to load blog configuration:', error);
        }
    }

    setupMetadata() {
        // Set up posts metadata
        Object.entries(this.config.posts).forEach(([slug, post]) => {
            this.posts.set(slug, {
                ...post,
                url: `/blog/${slug}.html`,
                categoryData: this.config.categories.find(c => c.id === post.category)
            });
        });

        // Set up categories metadata
        this.config.categories.forEach(category => {
            this.categories.set(category.id, {
                ...category,
                posts: category.posts.map(slug => this.posts.get(slug)).filter(Boolean)
            });
        });
    }

    generateStructuredData(post) {
        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "author": {
                "@type": "Person",
                "name": this.config.blogMetadata.author.name,
                "jobTitle": this.config.blogMetadata.author.title
            },
            "datePublished": post.date,
            "image": this.config.blogMetadata.author.image,
            "publisher": {
                "@type": "Organization",
                "name": this.config.blogMetadata.title,
                "logo": {
                    "@type": "ImageObject",
                    "url": "/images/download.jpeg"
                }
            }
        };
    }

    generateMetaTags(post) {
        const tags = [
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.description },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `${this.config.seoConfig.siteUrl}${post.url}` },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: post.title },
            { name: "twitter:description", content: post.description },
            { name: "keywords", content: post.tags.join(", ") }
        ];

        return tags;
    }

    getRelatedPosts(postSlug) {
        const post = this.posts.get(postSlug);
        if (!post) return [];

        return post.relatedPosts
            .map(slug => this.posts.get(slug))
            .filter(Boolean)
            .map(related => ({
                title: related.title,
                url: related.url,
                category: related.categoryData.name
            }));
    }
}

// Initialize metadata manager
const metadataManager = new BlogMetadataManager();
metadataManager.initialize();
