#!/usr/bin/env python3
"""
Enhanced bilingual field processor with better translations.
"""
import os
import re
import sys
from pathlib import Path

def process_file_with_translations(file_path):
    """Add properly translated bilingual fields to a content file."""
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
                    english_title = translate_title(chinese_title, str(file_path))
                    new_lines.append(f'titleEn: "{english_title}"')
                    found_title = True

            # Add descriptionEn after description
            if line.startswith('description: ') and not found_description:
                desc_match = re.search(r'description: "(.*?)"', line)
                if desc_match:
                    chinese_desc = desc_match.group(1)
                    english_desc = translate_description(chinese_desc, str(file_path))
                    new_lines.append(f'descriptionEn: "{english_desc}"')
                    found_description = True

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))

        return f"SUCCESS: {file_path}"

    except Exception as e:
        return f"ERROR: {file_path} - {str(e)}"

def translate_title(chinese_title, file_path):
    """Get English translation of Chinese title based on file context."""

    # Books
    if 'books/' in file_path:
        book_titles = {
            "一间自己的房间": "A Room of One's Own",
            "觉醒": "The Awakening",
            "使女的故事": "The Handmaid's Tale",
            "第二性": "The Second Sex",
            "必要劳动：作为社会变革的母职": "Essential Labor: Mothering as Social Change",
            "网络女性主义指南": "The Cyberfeminism Index",
            "难道我不是女人吗": "Ain't I a Woman: Black Women and Feminism",
            "钟形罩": "The Bell Jar",
            "血腥的房间": "The Bloody Chamber",
            "卡利班与女巫": "Caliban and the Witch",
            "公民：美国抒情诗": "Citizen: An American Lyric",
            "潜水诗": "Diving into the Wreck",
            "黄金笔记": "The Golden Notebook",
            "女儿国": "Herland",
            "我知道笼中鸟为何歌唱": "I Know Why the Caged Bird Sings",
            "我的身体": "My Body",
            "撒种比喻": "Parable of the Sower",
            "阴道独白": "The Vagina Monologues",
            "素食者": "The Vegetarian",
            "广阔的马尾藻海": "Wide Sargasso Sea",
            "零点的女人": "Woman at Point Zero",
            "与狼共舞的女人": "Women Who Run with the Wolves",
            "玛丽·沃斯通克拉夫特：女权辩护": "A Vindication of the Rights of Woman",
            "奥德丽·洛德文集": "Sister Outsider",
            "女性的奥秘": "The Feminine Mystique",
            "性别问题": "Gender Trouble",
            "男人向我解释事情": "Men Explain Things to Me",
            "美丽神话": "The Beauty Myth",
            "女性太监": "The Female Eunuch",
            "现实的政治": "The Politics of Reality",
            "我们都应该是女性主义者": "We Should All Be Feminists",
            "鞭打女孩": "Whipping Girl"
        }
        return book_titles.get(chinese_title, chinese_title)

    # Articles
    elif 'articles/' in file_path:
        article_titles = {
            "反对'温顺暴政'：我们为何需要棘手的女性": "Against the Tyranny of Niceness: Why We Need Difficult Women",
            "女性主义如何结束": "How Feminism Ends",
            "韩国性别差距：从全球最差到进步的长路": "South Korea's Gender Gap: The Long Road from Global Worst to Progress"
        }
        return article_titles.get(chinese_title, chinese_title)

    # Videos
    elif 'videos/' in file_path:
        video_titles = {
            "《会见敌人》：一场跨越性别的对话与反思": "Meeting the Enemy: A Dialogue and Reflection Across Gender",
            "女性主义辩论：凯利 vs 彼得森": "Feminism Debate: Kelly vs Peterson",
            "女性主义入门：B站视频": "Introduction to Feminism: Bilibili Video",
            "女性主义女性 vs 非女性主义女性": "Feminist Women vs Non-Feminist Women",
            "给所有男性的邀请": "An Invitation to All Men",
            "鲁思·巴德·金斯伯格纪录片": "Ruth Bader Ginsburg Documentary",
            "《女性》纪录片": "Woman Documentary"
        }
        return video_titles.get(chinese_title, chinese_title)

    # Films
    elif 'films/' in file_path:
        film_titles = {
            "芭比": "Barbie",
            "妙女郎": "Promising Young Woman",
            "小妇人": "Little Women",
            "霸道总裁爱上我": "Fifty Shades of Grey",
            "黑寡妇": "Black Widow"
        }
        return film_titles.get(chinese_title, chinese_title)

    return chinese_title

def translate_description(chinese_desc, file_path):
    """Get English translation of Chinese description."""

    # Common translations for descriptions
    desc_translations = {
        "本文批判了当代女性主义中对'完美'与'可爱'的期待，呼吁正视女性主义内部的复杂性与矛盾，接纳那些不合群、难以归类但推动变革的'棘手女性'。": "This article critiques contemporary feminism's expectations of 'perfection' and 'likability', calling for acknowledging the complexity and contradictions within feminism and embracing those difficult women who don't fit in but drive meaningful change.",

        "探讨当代女性主义面临的新挑战和可能的终结，分析数字时代对女性主义运动的影响。": "Explores the new challenges facing contemporary feminism and its potential endings, analyzing the impact of the digital age on the feminist movement.",

        "分析韩国在性别平等方面的严峻挑战，从职场歧视到生育率下降，探讨传统父权制与现代化冲突的深层原因。": "Analyzes South Korea's severe challenges in gender equality, from workplace discrimination to declining birth rates, exploring the deep-rooted causes of conflict between traditional patriarchy and modernization.",

        "通过纪录片《会见敌人》的镜头，本文探讨了电影制作人卡西·杰伊与男性权利运动的对话之旅，以及她如何从偏见到理解，最终反思性别平等运动的本质。": "Through the lens of the documentary 'Meeting the Enemy', this article explores filmmaker Cassie Jaye's dialogue journey with the men's rights movement, and how she moved from prejudice to understanding, ultimately reflecting on the nature of gender equality movements."
    }

    # Use specific translation if available, otherwise provide a generic English description
    if chinese_desc in desc_translations:
        return desc_translations[chinese_desc]

    # Generate contextual descriptions for books, films, etc.
    if 'books/' in file_path:
        if "女性主义" in chinese_desc and "理论" in chinese_desc:
            return "A foundational work in feminist theory exploring key concepts and perspectives in women's liberation movements."
        elif "小说" in chinese_desc or "文学" in chinese_desc:
            return "A significant literary work examining women's experiences and gender relations through narrative fiction."
        elif "母职" in chinese_desc or "照护" in chinese_desc:
            return "An exploration of motherhood, caregiving, and the social dimensions of reproductive labor in contemporary society."

    # Default: provide the original text for now
    return chinese_desc

def main():
    content_dir = Path("G:/femres/femres-app/src/content")

    # Process books directory
    print("=== Processing Books ===")
    books_results = []
    for file_path in (content_dir / "books").rglob('*.md'):
        if '.bak' not in str(file_path):
            result = process_file_with_translations(str(file_path))
            books_results.append(result)
            print(result)

    # Process films directory
    print("\n=== Processing Films ===")
    films_results = []
    for file_path in (content_dir / "films").rglob('*.md'):
        if '.bak' not in str(file_path):
            result = process_file_with_translations(str(file_path))
            films_results.append(result)
            print(result)

    # Process podcasts directory
    print("\n=== Processing Podcasts ===")
    podcasts_results = []
    for file_path in (content_dir / "podcasts").rglob('*.md'):
        if '.bak' not in str(file_path):
            result = process_file_with_translations(str(file_path))
            podcasts_results.append(result)
            print(result)

    # Summary
    all_results = books_results + films_results + podcasts_results
    success_count = len([r for r in all_results if r.startswith("SUCCESS")])
    skip_count = len([r for r in all_results if r.startswith("SKIP")])
    error_count = len([r for r in all_results if r.startswith("ERROR")])

    print(f"\n=== FINAL SUMMARY ===")
    print(f"SUCCESS: {success_count}")
    print(f"SKIPPED: {skip_count}")
    print(f"ERRORS: {error_count}")

if __name__ == "__main__":
    main()