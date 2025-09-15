#!/usr/bin/env python3
"""
Script to fix remaining titleEn fields that contain Chinese text.
"""

import re
from pathlib import Path

# Manual translations for specific titles
TITLE_TRANSLATIONS = {
    # Films (using their English titles)
    "芭比": "Barbie",
    "九to五": "9 to 5",
    "异形": "Alien",
    "我要做模特": "Bend It Like Beckham",
    "柯莱特": "Colette",
    "永不妥协": "Erin Brockovich",
    "瞬息全宇宙": "Everything Everywhere All at Once",
    "隐藏人物": "Hidden Figures",
    "伯德小姐": "Lady Bird",
    "律政俏佳人": "Legally Blonde",
    "小妇人": "Little Women",
    "疯狂的麦克斯：狂暴之路": "Mad Max: Fury Road",
    "海洋奇缘": "Moana",
    "花木兰": "Mulan",
    "无依之地": "Nomadland",
    "我在伊朗长大": "Persepolis",
    "燃烧女子的肖像": "Portrait of a Lady on Fire",
    "前程似锦的女孩": "Promising Young Woman",
    "复仇": "Revenge",
    "女子监狱大暴动": "Set It Off",
    "第一夫人俱乐部": "The First Wives Club",
    "使女的故事": "The Handmaid's Tale",
    "喜福会": "The Joy Luck Club",
    "末路狂花": "Thelma & Louise",
    "涉足荒野": "Wild",

    # Articles
    "反对'温顺暴政'：我们为何需要棘手的女性": "Against the 'Tyranny of Niceness': Why We Need Difficult Women",
    "后女性主义时代的终结：女性主义的新兴起": "How Feminism Ends: The Rise of New Feminism",
    "韩国的性别差距：职场不平等的持续现状": "South Korea's Gender Gap: The Persistent Reality of Workplace Inequality",

    # Papers
    "女性主义基础观点概述": "A Very Basic View of Feminism",
    "社会工作中的非殖民化女性主义": "Unsettling Feminism in Social Work",

    # Videos
    "女性主义辩论：凯莉 vs 彼得森": "Feminism Debate: Kelly vs Peterson",
    "女性主义入门（中文）": "Introduction to Feminism (Chinese)",
    "女性主义女性 vs 非女性主义女性": "Feminist Women vs Non-Feminist Women",
    "给所有男性的邀请": "An Invitation to All Men",
    "《会见敌人》：一场跨越性别的对话与反思": "Meeting the Enemy: A Cross-Gender Dialogue and Reflection",
    "露丝·巴德·金斯伯格纪录片": "RBG: Ruth Bader Ginsburg Documentary",
    "女性纪录片": "Woman Documentary",
}

def contains_chinese(text: str) -> bool:
    """Check if text contains Chinese characters."""
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]')
    return bool(chinese_pattern.search(text))

def get_english_title(chinese_title: str, file_path: str) -> str:
    """Get English translation for Chinese title."""
    if chinese_title in TITLE_TRANSLATIONS:
        return TITLE_TRANSLATIONS[chinese_title]

    # Generate fallback titles
    return chinese_title  # Keep original for manual review

def fix_title(file_path):
    """Fix titleEn field in a file."""
    try:
        content = file_path.read_text(encoding='utf-8')

        # Check if titleEn contains Chinese characters
        titleEn_match = re.search(r'titleEn:\s*"([^"]*)"', content)
        if not titleEn_match:
            print(f"No titleEn found in {file_path}")
            return False

        current_titleEn = titleEn_match.group(1)

        # Check if current titleEn contains Chinese characters
        if contains_chinese(current_titleEn):
            # Get English translation
            new_title = get_english_title(current_titleEn, str(file_path))

            if new_title != current_titleEn:
                # Replace titleEn
                new_content = re.sub(
                    r'titleEn:\s*"[^"]*"',
                    f'titleEn: "{new_title}"',
                    content
                )

                file_path.write_text(new_content, encoding='utf-8')
                print(f"Fixed {file_path}: titleEn updated to '{new_title}'")
                return True
            else:
                print(f"No translation available for {file_path}: '{current_titleEn}'")
                return False
        else:
            print(f"No fix needed for {file_path}: titleEn already in English")
            return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Fix remaining titleEn fields."""
    content_dir = Path("femres-app/src/content")

    if not content_dir.exists():
        print(f"Content directory not found: {content_dir}")
        return

    fixed_count = 0

    # Process all markdown files in content directory
    for md_file in content_dir.rglob("*.md"):
        if fix_title(md_file):
            fixed_count += 1

    print(f"\nFixed {fixed_count} title fields")

if __name__ == "__main__":
    main()