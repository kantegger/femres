#!/usr/bin/env python3
"""
Systematic bilingual field processor for content files.
"""
import os
import re
import sys
from pathlib import Path

def process_file(file_path):
    """Add bilingual fields to a content file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if already has bilingual fields
        if 'titleEn:' in content or 'descriptionEn:' in content:
            return f"SKIP: {file_path} already has bilingual fields"

        lines = content.split('\n')
        new_lines = []
        in_frontmatter = False
        found_title = False
        found_description = False

        for line in lines:
            new_lines.append(line)

            if line.strip() == '---':
                if not in_frontmatter:
                    in_frontmatter = True
                else:
                    in_frontmatter = False
                continue

            if not in_frontmatter:
                continue

            # Add titleEn after title
            if line.startswith('title: ') and not found_title:
                title_match = re.search(r'title: "(.*?)"', line)
                if title_match:
                    chinese_title = title_match.group(1)
                    # Simple mapping for common titles
                    english_title = get_english_title(chinese_title)
                    new_lines.append(f'titleEn: "{english_title}"')
                    found_title = True

            # Add descriptionEn after description
            if line.startswith('description: ') and not found_description:
                desc_match = re.search(r'description: "(.*?)"', line)
                if desc_match:
                    chinese_desc = desc_match.group(1)
                    english_desc = get_english_description(chinese_desc)
                    new_lines.append(f'descriptionEn: "{english_desc}"')
                    found_description = True

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))

        return f"SUCCESS: {file_path}"

    except Exception as e:
        return f"ERROR: {file_path} - {str(e)}"

def get_english_title(chinese_title):
    """Get English translation of Chinese title."""
    title_map = {
        "反对'温顺暴政'：我们为何需要棘手的女性": "Against the Tyranny of Niceness: Why We Need Difficult Women",
        "女性主义如何结束": "How Feminism Ends",
        "韩国性别差距：从全球最差到进步的长路": "South Korea's Gender Gap: The Long Road from Global Worst to Progress",
        "一间自己的房间": "A Room of One's Own",
        "觉醒": "The Awakening",
        "使女的故事": "The Handmaid's Tale",
        "第二性": "The Second Sex",
        "必要劳动：作为社会变革的母职": "Essential Labor: Mothering as Social Change",
        "网络女性主义指南": "The Cyberfeminism Index",
        "难道我不是女人吗": "Ain't I a Woman: Black Women and Feminism",
        # Add more as needed
    }
    return title_map.get(chinese_title, chinese_title)

def get_english_description(chinese_desc):
    """Get English translation of Chinese description."""
    desc_map = {
        "本文批判了当代女性主义中对'完美'与'可爱'的期待，呼吁正视女性主义内部的复杂性与矛盾，接纳那些不合群、难以归类但推动变革的'棘手女性'。": "This article critiques contemporary feminism's expectations of 'perfection' and 'likability', calling for acknowledging the complexity and contradictions within feminism and embracing those difficult women who don't fit in but drive meaningful change.",
        "探讨当代女性主义面临的新挑战和可能的终结，分析数字时代对女性主义运动的影响。": "Explores the new challenges facing contemporary feminism and its potential endings, analyzing the impact of the digital age on the feminist movement.",
        "分析韩国在性别平等方面的严峻挑战，从职场歧视到生育率下降，探讨传统父权制与现代化冲突的深层原因。": "Analyzes South Korea's severe challenges in gender equality, from workplace discrimination to declining birth rates, exploring the deep-rooted causes of conflict between traditional patriarchy and modernization.",
        # Add more as needed
    }
    return desc_map.get(chinese_desc, chinese_desc)

def process_directory(directory):
    """Process all markdown files in a directory."""
    results = []
    for file_path in Path(directory).rglob('*.md'):
        if '.bak' not in str(file_path):
            result = process_file(str(file_path))
            results.append(result)
            print(result)
    return results

def main():
    content_dir = Path("G:/femres/femres-app/src/content")

    # Process articles first (smallest)
    print("=== Processing Articles ===")
    articles_results = process_directory(content_dir / "articles")

    print("\n=== Processing Videos ===")
    videos_results = process_directory(content_dir / "videos")

    print("\n=== Processing Papers ===")
    papers_results = process_directory(content_dir / "papers")

    # Summary
    all_results = articles_results + videos_results + papers_results
    success_count = len([r for r in all_results if r.startswith("SUCCESS")])
    skip_count = len([r for r in all_results if r.startswith("SKIP")])
    error_count = len([r for r in all_results if r.startswith("ERROR")])

    print(f"\n=== SUMMARY ===")
    print(f"SUCCESS: {success_count}")
    print(f"SKIPPED: {skip_count}")
    print(f"ERRORS: {error_count}")

if __name__ == "__main__":
    main()