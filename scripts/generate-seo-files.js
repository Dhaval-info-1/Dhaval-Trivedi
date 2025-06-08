// Sitemap generator
const fs = require('fs');
const path = require('path');

// Load blog configuration
const blogConfig = require('./config/blog-config.json');

// Base URL
const baseUrl = blogConfig.seoConfig.siteUrl;

// Generate XML sitemap
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/blog.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>`;

    // Add all blog posts
    Object.entries(blogConfig.posts).forEach(([slug, post]) => {
        sitemap += `
    <url>
        <loc>${baseUrl}/blog/${slug}.html</loc>
        <lastmod>${post.date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
    });

    sitemap += '\n</urlset>';

    // Write sitemap file
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
}

// Generate RSS feed
function generateRSS() {
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>${blogConfig.blogMetadata.title}</title>
        <link>${baseUrl}</link>
        <description>${blogConfig.blogMetadata.description}</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

    // Add all blog posts
    Object.entries(blogConfig.posts).forEach(([slug, post]) => {
        feed += `
        <item>
            <title>${post.title}</title>
            <link>${baseUrl}/blog/${slug}.html</link>
            <description>${post.description}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <guid>${baseUrl}/blog/${slug}.html</guid>
            <category>${post.category}</category>
        </item>`;
    });

    feed += `
    </channel>
</rss>`;

    // Write RSS file
    fs.writeFileSync(path.join(__dirname, 'feed.xml'), feed);
    console.log('RSS feed generated successfully!');
}

// Run generators
generateSitemap();
generateRSS();
