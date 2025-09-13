import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, locals }) => {
  try {
    const contentId = url.searchParams.get('contentId');

    if (!contentId) {
      return new Response(JSON.stringify({ error: 'contentId is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 获取D1数据库实例 - 使用正确的方式
    const DB = locals.runtime?.env?.DB;

    if (!DB) {
      // 开发环境返回模拟数据
      const mockCount = Math.floor(Math.random() * 50) + 5; // 5-55之间的随机数
      return new Response(JSON.stringify({
        contentId,
        count: mockCount,
        environment: 'development'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300' // 缓存5分钟
        }
      });
    }

    // 生产环境：查询实际点赞数
    const result = await DB.prepare(
      'SELECT COUNT(*) as count FROM user_interactions WHERE content_id = ? AND interaction_type = ?'
    ).bind(contentId, 'like').first();

    const count = result?.count || 0;

    return new Response(JSON.stringify({
      contentId,
      count,
      environment: 'production'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // 缓存5分钟
      }
    });

  } catch (error) {
    console.error('Error fetching likes count:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      contentId: url.searchParams.get('contentId'),
      count: 0
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};