#!/usr/bin/env python3
"""
Script to fix descriptionEn fields that contain Chinese text.
This script provides English translations for common descriptions.
"""

import re
from pathlib import Path

# Manual translations for common descriptions
DESCRIPTION_TRANSLATIONS = {
    # Books
    "女性主义思想史上的开创性作品，最早系统地为女性的权利和教育平等进行辩护的著作之一。":
    "A groundbreaking work in the history of feminist thought, one of the earliest works to systematically advocate for women's rights and educational equality.",

    "当代回忆录与理论融合的女王玛吉·尼尔森将镜头对准身份、欲望和家庭话题，这部即时经典讲述了尼尔森与她的伴侣、艺术家哈里·道奇的关系。通过细致入微地记录她的家庭生活和怀孕经历，尼尔森呈现了一幅复杂的、模糊边界的现代酷儿母性肖像。":
    "The contemporary queen of memoir-theory fusion, Maggie Nelson turns her lens on identity, desire, and family in this instant classic about her relationship with her partner, artist Harry Dodge. Through intimate documentation of their domestic life and her pregnancy, Nelson presents a complex, boundary-blurring portrait of modern queer maternity.",

    "没有这部1899年的短篇小说，任何女性主义阅读清单都是不完整的。这部早期的、准现代主义故事讲述了新奥尔良的富裕家庭主妇埃德娜·庞特利尔开始思考，在她作为妻子和母亲的狭隘角色之外，生活可能还有什么可以提供。":
    "No feminist reading list would be complete without this 1899 novella. This early, proto-modernist story follows Edna Pontellier, a wealthy New Orleans housewife who begins to question what life might offer beyond her narrow roles as wife and mother.",

    "从女性主义视角重新审视资本主义原始积累，揭示了对女性身体的暴力控制如何成为资本主义发展的基础。":
    "Re-examines capitalist primitive accumulation from a feminist perspective, revealing how violent control over women's bodies became the foundation of capitalist development.",

    "20世纪女性主义文学经典，通过半自传体叙述揭示1950年代女性面临的心理困境与社会压迫，深刻探讨精神疾病与性别束缚的关系。":
    "A 20th-century feminist literary classic that reveals the psychological struggles and social oppression faced by women in the 1950s through semi-autobiographical narration, deeply exploring the relationship between mental illness and gender constraints.",

    "女性主义童话重构的开山之作，通过颠覆经典童话创造全新的女性叙事，探索性别权力、欲望与女性主体性的复杂关系。":
    "A pioneering work in feminist fairy tale reconstruction, creating new feminine narratives by subverting classic fairy tales and exploring the complex relationships between gender power, desire, and female subjectivity.",

    "女性主义文学批评的奠基之作，以诗意而犀利的笔触探讨女性创作的物质与心理条件，提出影响深远的女性写作理论。":
    "A foundational work of feminist literary criticism that explores the material and psychological conditions of women's creativity with poetic yet sharp prose, proposing influential theories of women's writing.",

    # Films
    "在看似完美的芭比乐园中，芭比开始质疑自己的存在意义，踏上了一场充满哲思的真实世界之旅。这部粉色包装的大片以娱乐化的方式探讨了父权制、美丽标准和女性身份认同等深刻议题。":
    "In the seemingly perfect world of Barbieland, Barbie begins to question the meaning of her existence and embarks on a philosophical journey to the real world. This pink-packaged blockbuster explores profound issues of patriarchy, beauty standards, and female identity in an entertaining format.",

    # Articles
    "本文批判了当代女性主义中对'完美'与'可爱'的期待，呼吁正视女性主义内部的复杂性与矛盾，接纳那些不合群、难以归类但推动变革的'棘手女性'。":
    "This article critiques contemporary feminism's expectations of 'perfection' and 'likability', calling for recognition of the complexity and contradictions within feminism and embracing those 'difficult women' who are unconventional, hard to categorize, but drive change.",
}

def contains_chinese(text: str) -> bool:
    """Check if text contains Chinese characters."""
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]')
    return bool(chinese_pattern.search(text))

def get_english_description(chinese_desc: str, file_path: str) -> str:
    """Get English translation for Chinese description."""
    if chinese_desc in DESCRIPTION_TRANSLATIONS:
        return DESCRIPTION_TRANSLATIONS[chinese_desc]

    # Generate fallback translations based on content type and patterns
    if "books/" in str(file_path):
        if "女性主义" in chinese_desc:
            return f"A feminist work exploring themes of gender, equality, and women's rights. [Translation needed for: {chinese_desc[:50]}...]"
        else:
            return f"A significant literary work in feminist studies. [Translation needed for: {chinese_desc[:50]}...]"
    elif "films/" in str(file_path):
        return f"A film exploring feminist themes and women's experiences. [Translation needed for: {chinese_desc[:50]}...]"
    elif "articles/" in str(file_path):
        return f"An article examining feminist issues and contemporary gender topics. [Translation needed for: {chinese_desc[:50]}...]"
    elif "videos/" in str(file_path):
        return f"A video discussing feminist topics and women's issues. [Translation needed for: {chinese_desc[:50]}...]"
    elif "podcasts/" in str(file_path):
        return f"A podcast exploring feminist perspectives and women's experiences. [Translation needed for: {chinese_desc[:50]}...]"
    else:
        return f"Content exploring feminist themes and gender issues. [Translation needed for: {chinese_desc[:50]}...]"

def fix_description(file_path):
    """Fix descriptionEn field in a file."""
    try:
        content = file_path.read_text(encoding='utf-8')

        # Check if descriptionEn contains Chinese characters
        descriptionEn_match = re.search(r'descriptionEn:\s*"([^"]*)"', content, re.DOTALL)
        if not descriptionEn_match:
            print(f"No descriptionEn found in {file_path}")
            return False

        current_descriptionEn = descriptionEn_match.group(1)

        # Check if current descriptionEn contains Chinese characters
        if contains_chinese(current_descriptionEn):
            # Get English translation
            new_description = get_english_description(current_descriptionEn, str(file_path))

            # Replace descriptionEn
            new_content = re.sub(
                r'descriptionEn:\s*"[^"]*"',
                f'descriptionEn: "{new_description}"',
                content,
                flags=re.DOTALL
            )

            file_path.write_text(new_content, encoding='utf-8')
            print(f"Fixed {file_path}: descriptionEn updated")
            return True
        else:
            print(f"No fix needed for {file_path}: descriptionEn already in English")
            return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Fix all content files with Chinese descriptionEn."""
    content_dir = Path("femres-app/src/content")

    if not content_dir.exists():
        print(f"Content directory not found: {content_dir}")
        return

    fixed_count = 0

    # Process all markdown files in content directory
    for md_file in content_dir.rglob("*.md"):
        if fix_description(md_file):
            fixed_count += 1

    print(f"\nFixed {fixed_count} description fields")

if __name__ == "__main__":
    main()