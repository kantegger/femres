import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface ContentItem {
  id: string;
  title: string;
  author: string;
  description: string;
  type: 'book' | 'article' | 'video' | 'podcast' | 'paper';
  slug: string;
  coverImage?: string;
  publishDate: string;
}

interface UserContentListProps {
  type: 'likes' | 'bookmarks';
}

export default function UserContentList({ type }: UserContentListProps) {
  const { interactions, isAuthenticated } = useAuthStore();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      const contentIds = type === 'likes' ? interactions.likes : interactions.bookmarks;
      
      // For now, we'll simulate fetching real content based on the actual IDs
      // In a real app, this would make API calls to get the content details
      const contentPromises = contentIds.map(async (id) => {
        const [contentType, ...slugParts] = id.split('-');
        const slug = slugParts.join('-');
        
        // Simulate fetching content from different collections
        try {
          if (contentType === 'book' && slug) {
            // Map known book slugs to their actual titles
            const bookTitles: Record<string, {title: string, author: string, description: string}> = {
              'the-second-sex': {
                title: '《第二性》',
                author: '西蒙娜·德·波伏娃',
                description: '存在主义女性主义的经典之作，深入分析女性在社会中的地位和处境。'
              },
              'feminine-mystique': {
                title: '《女性迷思》',
                author: '贝蒂·弗里丹',
                description: '第二波女性主义运动的重要著作，揭示了家庭主妇角色对女性的束缚。'
              },
              'we-should-all-be-feminists': {
                title: '《我们都应该是女性主义者》',
                author: '奇马曼达·恩戈兹·阿迪契埃',
                description: '当代女性主义的入门读物，用简洁有力的语言阐述女性主义的重要性。'
              }
            };
            
            const bookInfo = bookTitles[slug] || {
              title: `《${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}》`,
              author: '作者信息',
              description: '这本书的详细介绍...'
            };
            
            return {
              id,
              title: bookInfo.title,
              author: bookInfo.author,
              description: bookInfo.description,
              type: 'book' as const,
              slug,
              publishDate: new Date().toISOString()
            };
          } else if (contentType === 'article' && slug) {
            const articleInfo = {
              title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              author: '文章作者',
              description: '这篇文章探讨了女性主义相关的重要议题...'
            };
            
            return {
              id,
              title: articleInfo.title,
              author: articleInfo.author,
              description: articleInfo.description,
              type: 'article' as const,
              slug,
              publishDate: new Date().toISOString()
            };
          } else if (contentType === 'video' && slug) {
            const videoInfo = {
              title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              author: '视频创作者',
              description: '这个视频分享了关于女性主义的见解和思考...'
            };
            
            return {
              id,
              title: videoInfo.title,
              author: videoInfo.author,
              description: videoInfo.description,
              type: 'video' as const,
              slug,
              publishDate: new Date().toISOString()
            };
          } else if (contentType === 'podcast' && slug) {
            const podcastInfo = {
              title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              author: '播客主持人',
              description: '这期播客深入讨论了女性主义相关话题...'
            };
            
            return {
              id,
              title: podcastInfo.title,
              author: podcastInfo.author,
              description: podcastInfo.description,
              type: 'podcast' as const,
              slug,
              publishDate: new Date().toISOString()
            };
          } else if (contentType === 'paper' && slug) {
            const paperInfo = {
              title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              author: '研究作者',
              description: '这篇学术论文研究了女性主义理论的重要方面...'
            };
            
            return {
              id,
              title: paperInfo.title,
              author: paperInfo.author,
              description: paperInfo.description,
              type: 'paper' as const,
              slug,
              publishDate: new Date().toISOString()
            };
          }
        } catch (error) {
          console.warn(`Failed to load content for ${id}:`, error);
        }
        
        // Fallback for unknown or invalid IDs
        return {
          id,
          title: '内容已删除或不存在',
          author: '未知',
          description: '此内容可能已被删除或移动。',
          type: 'book' as const,
          slug: 'unknown',
          publishDate: new Date().toISOString()
        };
      });

      const loadedContent = await Promise.all(contentPromises);
      setContentItems(loadedContent.filter(Boolean) as ContentItem[]);
      setLoading(false);
    };

    loadContent();
  }, [interactions, isAuthenticated, type]);

  const getContentIcon = (contentType: ContentItem['type']) => {
    switch (contentType) {
      case 'book': return '📚';
      case 'article': return '📰';
      case 'video': return '🎥';
      case 'podcast': return '🎧';
      case 'paper': return '📄';
      default: return '📝';
    }
  };

  const getContentTypeLabel = (contentType: ContentItem['type']) => {
    switch (contentType) {
      case 'book': return '书籍';
      case 'article': return '文章';
      case 'video': return '视频';
      case 'podcast': return '播客';
      case 'paper': return '论文';
      default: return '内容';
    }
  };

  const getContentUrl = (item: ContentItem) => {
    switch (item.type) {
      case 'book': return `/books/${item.slug}`;
      case 'article': return `/articles/${item.slug}`;
      case 'video': return `/videos/${item.slug}`;
      case 'podcast': return `/podcasts/${item.slug}`;
      case 'paper': return `/papers/${item.slug}`;
      default: return '#';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">{type === 'likes' ? '❤️' : '⭐'}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          请先登录
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          登录后即可查看您的{type === 'likes' ? '点赞' : '收藏'}内容
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-pulse">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (contentItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">{type === 'likes' ? '💔' : '📭'}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          暂无{type === 'likes' ? '点赞' : '收藏'}内容
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          浏览内容并{type === 'likes' ? '点赞' : '收藏'}您喜欢的作品
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contentItems.map((item) => (
        <a
          key={item.id}
          href={getContentUrl(item)}
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{getContentIcon(item.type)}</span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                {getContentTypeLabel(item.type)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              作者：{item.author}
            </p>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {item.description}
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(item.publishDate).toLocaleDateString('zh-CN')}
              </span>
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:underline">
                查看详情 →
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}