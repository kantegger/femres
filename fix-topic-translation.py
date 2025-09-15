#!/usr/bin/env python3
"""
批量修复组件中的topic翻译逻辑
"""

import os
import re
from pathlib import Path

def fix_topic_translation_in_file(file_path):
    """修复单个文件中的topic翻译逻辑"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 查找需要修复的模式
    pattern = r'(\s*)(\w+\.(?:slice\([^)]+\)|filter[^}]*)?\.map\(topic => \{\s*)(.*?const topicInfo = findTopicByName\(topic\);\s*const translatedTopic = topicInfo\s*\? getTopicTranslation\(topic, currentLocale as [^)]+\)\s*: topic;)(.*?)\}\)'

    def replacement(match):
        indent = match.group(1)
        map_start = match.group(2)
        old_logic = match.group(3)
        rest = match.group(4)

        # 新的简化逻辑
        new_logic = f"{indent}{map_start}{old_logic}const translatedTopic = getTopicTranslation(topic, currentLocale as 'zh-CN' | 'en');{rest}})"
        return new_logic

    # 执行替换
    original_content = content
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    # 如果内容有变化，写回文件
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {file_path}")
        return True
    else:
        print(f"No changes needed: {file_path}")
        return False

def main():
    """修复所有组件文件"""
    components_dir = Path('femres-app/src/components')

    # 需要修复的文件列表
    files_to_fix = [
        'ContentCard.astro',
        'PaperCard.astro',
        'BookCard2.astro',
        'ArticleCard2.astro',
        'FilmCard.astro',
        'VideoCard.astro',
        'PodcastCard.astro'
    ]

    for filename in files_to_fix:
        file_path = components_dir / filename
        if file_path.exists():
            try:
                fix_topic_translation_in_file(file_path)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
        else:
            print(f"File not found: {file_path}")

if __name__ == "__main__":
    main()