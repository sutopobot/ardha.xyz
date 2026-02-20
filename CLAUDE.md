# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio/blog starter using the App Router architecture. It's a personal portfolio site with MDX-based blog posts, optimized for SEO with dynamic OG images, sitemap, RSS feed, and JSON-LD schema.

**Stack:**
- Next.js (canary channel) with App Router
- React 18
- TypeScript (strict mode disabled, strictNullChecks enabled)
- Tailwind CSS v4 (alpha)
- MDX via `next-mdx-remote`
- Geist font family
- Vercel Analytics & Speed Insights

## Common Commands

```bash
# Development
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

Note: This project uses pnpm as the package manager.

## Architecture

### App Router Structure (`app/`)

```
app/
├── blog/
│   ├── [slug]/page.tsx     # Dynamic blog post pages
│   ├── page.tsx            # Blog index page
│   ├── posts/              # MDX blog posts directory
│   └── utils.ts            # Blog utilities (frontmatter parser, post getter)
├── components/             # Shared React components
├── og/route.tsx            # Dynamic OG image generation
├── rss/route.ts            # RSS feed endpoint
├── sitemap.ts              # Sitemap generation
├── robots.ts               # Robots.txt configuration
├── layout.tsx              # Root layout with fonts
├── page.tsx                # Homepage
└── global.css              # Tailwind imports
```

### Blog System

Blog posts are stored as MDX files in `app/blog/posts/` with YAML frontmatter:

```yaml
---
title: 'Post Title'
publishedAt: '2025-10-01'
summary: 'Post summary'
image: '/optional-image.png'  # Optional
tags: ['tag1', 'tag2']          # Optional
---
```

**Key utilities in `app/blog/utils.ts`:**
- `getBlogPosts()` - Reads and parses all MDX files from the posts directory
- `parseFrontmatter()` - Custom YAML frontmatter parser (regex-based)
- `formatDate()` - Formats dates with optional relative time

**Blog rendering (`app/blog/[slug]/page.tsx`):**
- Uses `generateStaticParams()` for static generation at build time
- Generates OpenGraph and Twitter card metadata per post
- Includes JSON-LD schema for SEO
- Renders MDX content through `CustomMDX` component

### MDX Components (`app/components/mdx.tsx`)

Custom MDX components using `next-mdx-remote/rsc`:
- Headings (h1-h6) with auto-generated anchor links
- Custom link handling (internal vs external)
- Image component with rounded corners
- Code syntax highlighting via `sugar-high`
- Table component

**Important:** Links starting with `/` use Next.js `<Link>`, internal anchors use `<a>`, and external links get `target="_blank"` with `rel="noopener noreferrer"`.

### SEO Features

- **Dynamic OG images** (`app/og/route.tsx`): Generates social share images using `next/og` with Tailwind classes (`tw` prop)
- **Sitemap** (`app/sitemap.ts`): Auto-generated from blog posts
- **RSS feed** (`app/rss/route.ts`): XML feed sorted by publication date
- **JSON-LD schema**: Embedded in blog post pages for structured data

### Configuration Files

- **`baseUrl` in `app/sitemap.ts`**: Update this to match your deployment domain
- **Metadata** in `app/layout.tsx`: Update title, description, and OpenGraph defaults
- **Tailwind CSS v4**: Uses `@tailwindcss/postcss` (alpha) - configuration in `postcss.config.js`

### Adding New Blog Posts

1. Create a new `.mdx` file in `app/blog/posts/`
2. Add YAML frontmatter with `title`, `publishedAt`, `summary`, and optional fields:
   - `image` - cover image path
   - `tags` - array of tags for categorization
3. The post will be automatically picked up by `getBlogPosts()` and included in:
   - Blog index page
   - Sitemap
   - RSS feed
   - Static generation at build time
