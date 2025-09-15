#!/usr/bin/env python3
"""
批量更新所有MD文件的topics字段为英文标识符
"""

import os
import re
import json
from pathlib import Path

# 读取topics映射
with open('femres-app/src/i18n/topicsMapping.json', 'r', encoding='utf-8') as f:
    topics_mapping = json.load(f)

# 创建中文到英文的映射
zh_to_en = {}
for en_key, mapping in topics_mapping.items():
    zh_to_en[mapping['zh-CN']] = en_key

def update_topics_in_file(file_path):
    """更新单个文件的topics字段"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 找到frontmatter中的topics字段
    topics_pattern = r'topics:\s*\[(.*?)\]'
    match = re.search(topics_pattern, content, re.DOTALL)

    if match:
        topics_str = match.group(1)
        # 提取所有的topic项
        topics = re.findall(r'"([^"]+)"', topics_str)

        # 转换为英文标识符
        english_topics = []
        changes_made = False

        for topic in topics:
            if topic in zh_to_en:
                # 如果是中文，转换为英文
                english_topics.append(zh_to_en[topic])
                changes_made = True
            elif topic in topics_mapping:
                # 如果已经是英文标识符，保持不变
                english_topics.append(topic)
            else:
                # 未知的topic，保持原样并报告
                english_topics.append(topic)
                print(f"Warning: Unknown topic '{topic}' in {file_path}")

        if changes_made:
            # 重新构建topics字段
            new_topics_str = '[' + ', '.join(f'"{topic}"' for topic in english_topics) + ']'
            new_content = re.sub(topics_pattern, f'topics: {new_topics_str}', content, flags=re.DOTALL)

            # 写回文件
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"Updated: {file_path}")
            print(f"  Old: {topics}")
            print(f"  New: {english_topics}")
        else:
            print(f"No changes needed: {file_path}")

def main():
    """扫描所有MD文件并更新topics"""
    content_dir = Path('femres-app/src/content')

    # 遍历所有内容目录
    for content_type in ['books', 'articles', 'films', 'videos', 'podcasts', 'papers']:
        type_dir = content_dir / content_type
        if type_dir.exists():
            print(f"\n处理 {content_type} 目录...")
            for md_file in type_dir.glob('*.md'):
                update_topics_in_file(md_file)

if __name__ == "__main__":
    main()