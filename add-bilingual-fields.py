#!/usr/bin/env python3
"""
Script to add bilingual fields to content files.
"""
import os
import re
import sys

def add_bilingual_fields(file_path):
    """Add titleEn and descriptionEn fields to a markdown file."""

    # Translation mappings (examples - would expand this)
    title_translations = {
        "必要劳动：作为社会变革的母职": "Essential Labor: Mothering as Social Change",
        "网络女性主义指南": "The Cyberfeminism Index",
        "难道我不是女人吗": "Ain't I a Woman? Black Women and Feminism",
        "一个自己的房间": "A Room of One's Own",
        "第二性": "The Second Sex",
        "觉醒": "The Awakening",
        "使女的故事": "The Handmaid's Tale",
        # Add more translations as needed
    }

    description_translations = {
        "第一代菲律宾裔美国作家加尔贝斯结合回忆录与文化分析，深刻审视母职期待与假设，揭示美国社会如何依赖却常忽视母亲和家庭照护者的核心贡献。": "First-generation Filipino American writer Angela Garbes combines memoir with cultural analysis to deeply examine societal expectations and assumptions about motherhood, revealing how American society depends on yet often ignores the essential contributions of mothers and caregivers.",
        # Add more translations as needed
    }

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already has bilingual fields
        if 'titleEn:' in content:
            print(f"Skipping {file_path} - already has bilingual fields")
            return False

        lines = content.split('\n')
        new_lines = []
        in_frontmatter = False

        for i, line in enumerate(lines):
            new_lines.append(line)

            if line.strip() == '---':
                in_frontmatter = not in_frontmatter
                continue

            if not in_frontmatter:
                continue

            # Add titleEn after title
            if line.startswith('title: '):
                title_match = re.search(r'title: "(.*?)"', line)
                if title_match:
                    chinese_title = title_match.group(1)
                    if chinese_title in title_translations:
                        english_title = title_translations[chinese_title]
                        new_lines.append(f'titleEn: "{english_title}"')
                    else:
                        # For now, use original title as fallback
                        new_lines.append(f'titleEn: "{chinese_title}"')

            # Add descriptionEn after description
            if line.startswith('description: '):
                desc_match = re.search(r'description: "(.*?)"', line)
                if desc_match:
                    chinese_desc = desc_match.group(1)
                    if chinese_desc in description_translations:
                        english_desc = description_translations[chinese_desc]
                        new_lines.append(f'descriptionEn: "{english_desc}"')
                    else:
                        # Generate a basic English version
                        new_lines.append(f'descriptionEn: "{chinese_desc}"')

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))

        print(f"Updated {file_path}")
        return True

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    content_dir = "G:/femres/femres-app/src/content"

    # Find all markdown files
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md') and not file.endswith('.bak'):
                file_path = os.path.join(root, file)
                add_bilingual_fields(file_path)

if __name__ == "__main__":
    main()