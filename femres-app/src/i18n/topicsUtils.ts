import topicsMapping from './topicsMapping.json';

export type Locale = 'zh-CN' | 'en';

// 获取主题的翻译名称
export function getTopicTranslation(topic: string, locale: Locale): string {
  const mapping = topicsMapping[topic as keyof typeof topicsMapping];
  if (mapping) {
    return mapping[locale] || topic;
  }
  return topic;
}

// 获取主题的图标
export function getTopicIcon(topic: string): string {
  const mapping = topicsMapping[topic as keyof typeof topicsMapping];
  return mapping?.icon || '📋';
}

// 通过任一语言版本的名称查找主题的完整信息
export function findTopicByName(name: string): {
  zhName: string;
  enName: string;
  icon: string;
} | null {
  // 先尝试作为英文标识符查找
  if (topicsMapping[name as keyof typeof topicsMapping]) {
    const mapping = topicsMapping[name as keyof typeof topicsMapping];
    return {
      zhName: mapping['zh-CN'],
      enName: mapping.en,
      icon: mapping.icon
    };
  }

  // 如果不是英文标识符，尝试从中文名称反向查找
  for (const [enKey, mapping] of Object.entries(topicsMapping)) {
    if (mapping['zh-CN'] === name) {
      return {
        zhName: mapping['zh-CN'],
        enName: mapping.en,
        icon: mapping.icon
      };
    }
  }

  return null;
}

// 获取所有主题列表（指定语言版本）
export function getAllTopics(locale: Locale): Array<{
  key: string;
  name: string;
  icon: string;
}> {
  return Object.entries(topicsMapping).map(([key, mapping]) => ({
    key,
    name: mapping[locale],
    icon: mapping.icon
  }));
}

// URL安全编码主题名称
export function encodeTopicForUrl(topicName: string): string {
  return encodeURIComponent(topicName);
}

// 从URL解码主题名称
export function decodeTopicFromUrl(encodedName: string): string {
  return decodeURIComponent(encodedName);
}