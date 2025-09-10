import { defineCollection, z } from 'astro:content';

// 定义内容集合的schema
const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    originalTitle: z.string().optional(),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
    isbn: z.string().optional(),
    language: z.enum(['zh-CN', 'en', 'zh-TW']).default('zh-CN'),
    topics: z.array(z.string()),
    sourceUrl: z.string().url().optional(),
    coverImage: z.string().optional(),
    status: z.enum(['published', 'draft']).default('published')
  })
});

const articles = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
    language: z.enum(['zh-CN', 'en', 'zh-TW']).default('zh-CN'),
    topics: z.array(z.string()),
    sourceUrl: z.string().url(),
    readingTime: z.number().optional(),
    featuredImage: z.string().optional(),
    status: z.enum(['published', 'draft']).default('published')
  })
});

const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
    language: z.enum(['zh-CN', 'en', 'zh-TW']).default('zh-CN'),
    topics: z.array(z.string()),
    sourceUrl: z.string().url(),
    embedUrl: z.string().url().optional(),
    duration: z.number().optional(), // in minutes
    thumbnail: z.string().optional(),
    status: z.enum(['published', 'draft']).default('published')
  })
});

const podcasts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
    language: z.enum(['zh-CN', 'en', 'zh-TW']).default('zh-CN'),
    topics: z.array(z.string()),
    sourceUrl: z.string().url(),
    audioUrl: z.string().url().optional(),
    embedUrl: z.string().url().optional(),
    duration: z.number().optional(), // in minutes
    transcript: z.string().optional(),
    thumbnail: z.string().optional(),
    episodeNumber: z.number().optional(),
    status: z.enum(['published', 'draft']).default('published')
  })
});

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    originalTitle: z.string().optional(),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
    language: z.enum(['zh-CN', 'en', 'zh-TW']).default('zh-CN'),
    topics: z.array(z.string()),
    sourceUrl: z.string().url(),
    doi: z.string().optional(),
    journal: z.string().optional(),
    abstract: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    citationCount: z.number().optional(),
    paperType: z.enum(['research', 'review', 'case-study', 'theoretical']).optional(),
    status: z.enum(['published', 'draft']).default('published')
  })
});

// 导出内容集合
export const collections = {
  books,
  articles,
  videos,
  podcasts,
  papers
};