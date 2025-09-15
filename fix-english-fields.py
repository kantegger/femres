#!/usr/bin/env python3
"""
Script to fix Chinese text in titleEn and descriptionEn fields across all content files.
"""

import os
import re
from pathlib import Path
import yaml
from typing import Dict, List, Optional

# Translation mappings for common titles and descriptions
TITLE_TRANSLATIONS = {
    # Books with originalTitle should use that
    # Articles and other content
    "反对'温顺暴政'：我们为何需要棘手的女性": "Against the 'Tyranny of Niceness': Why We Need Difficult Women",
    "后女性主义时代的终结：女性主义的新兴起": "How Feminism Ends: The Rise of New Feminism",
    "韩国的性别差距：职场不平等的持续现状": "South Korea's Gender Gap: The Persistent Reality of Workplace Inequality",
    "女性主义基础观点概述": "A Very Basic View of Feminism",
    "社会工作中的非殖民化女性主义": "Unsettling Feminism in Social Work",
    "女性主义辩论：凯莉 vs 彼得森": "Feminism Debate: Kelly vs Peterson",
    "女性主义入门（中文）": "Introduction to Feminism (Chinese)",
    "女性主义女性 vs 非女性主义女性": "Feminist Women vs Non-Feminist Women",
    "给所有男性的邀请": "An Invitation to All Men",
    "与敌人相遇": "Meeting the Enemy",
    "露丝·巴德·金斯伯格纪录片": "Ruth Bader Ginsburg Documentary",
    "女性纪录片": "Woman Documentary",
}

DESCRIPTION_TRANSLATIONS = {
    # Common Chinese descriptions that need English translations
    "本文批判了当代女性主义中对'完美'与'可爱'的期待，呼吁正视女性主义内部的复杂性与矛盾，接纳那些不合群、难以归类但推动变革的'棘手女性'。":
    "This article critiques contemporary feminism's expectations of 'perfection' and 'likability', calling for recognition of the complexity and contradictions within feminism and embracing those 'difficult women' who are unconventional, hard to categorize, but drive change.",

    "从女性主义视角重新审视资本主义原始积累，揭示了对女性身体的暴力控制如何成为资本主义发展的基础。":
    "Re-examines capitalist primitive accumulation from a feminist perspective, revealing how violent control over women's bodies became the foundation of capitalist development.",

    # Add more common translations as needed
}

def contains_chinese(text: str) -> bool:
    """Check if text contains Chinese characters."""
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]')
    return bool(chinese_pattern.search(text))

def extract_yaml_frontmatter(content: str) -> tuple[Dict, str]:
    """Extract YAML frontmatter and body content."""
    if not content.startswith('---\n'):
        return {}, content

    try:
        # Find the end of frontmatter
        end_marker = content.find('\n---\n', 4)
        if end_marker == -1:
            return {}, content

        yaml_str = content[4:end_marker]  # Skip first ---\n
        body = content[end_marker + 5:]   # Skip \n---\n

        metadata = yaml.safe_load(yaml_str)
        return metadata or {}, body
    except yaml.YAMLError:
        return {}, content

def reconstruct_file_content(metadata: Dict, body: str) -> str:
    """Reconstruct file content with updated metadata."""
    yaml_str = yaml.dump(metadata, default_flow_style=False, allow_unicode=True, sort_keys=False)
    return f"---\n{yaml_str}---\n{body}"

def translate_title(chinese_title: str, original_title: Optional[str] = None) -> str:
    """Translate Chinese title to English."""
    if original_title:
        return original_title

    if chinese_title in TITLE_TRANSLATIONS:
        return TITLE_TRANSLATIONS[chinese_title]

    # Provide basic translations for common patterns
    if "女性主义" in chinese_title:
        # Try to provide reasonable feminist-related translations
        if "辩论" in chinese_title:
            return f"Feminism Debate: {chinese_title}"
        elif "入门" in chinese_title or "介绍" in chinese_title:
            return "Introduction to Feminism"
        else:
            return f"Feminist Topic: {chinese_title}"

    # Default fallback - keep original for manual review
    return chinese_title

def translate_description(chinese_desc: str) -> str:
    """Translate Chinese description to English."""
    if chinese_desc in DESCRIPTION_TRANSLATIONS:
        return DESCRIPTION_TRANSLATIONS[chinese_desc]

    # For descriptions, we should provide manual translations
    # This is a placeholder - in practice, each description needs careful translation
    return f"[NEEDS TRANSLATION] {chinese_desc}"

def process_file(file_path: Path) -> bool:
    """Process a single markdown file to fix English fields."""
    try:
        content = file_path.read_text(encoding='utf-8')
        metadata, body = extract_yaml_frontmatter(content)

        if not metadata:
            return False

        updated = False

        # Fix titleEn if it contains Chinese
        if 'titleEn' in metadata and contains_chinese(metadata['titleEn']):
            original_title = metadata.get('originalTitle')
            title = metadata.get('title', '')

            new_title = translate_title(metadata['titleEn'], original_title)
            if new_title != metadata['titleEn']:
                metadata['titleEn'] = new_title
                updated = True
                print(f"Updated titleEn in {file_path}: {metadata['titleEn']} -> {new_title}")

        # Fix descriptionEn if it contains Chinese
        if 'descriptionEn' in metadata and contains_chinese(metadata['descriptionEn']):
            new_desc = translate_description(metadata['descriptionEn'])
            if new_desc != metadata['descriptionEn']:
                metadata['descriptionEn'] = new_desc
                updated = True
                print(f"Updated descriptionEn in {file_path}")

        # Write back if updated
        if updated:
            new_content = reconstruct_file_content(metadata, body)
            file_path.write_text(new_content, encoding='utf-8')
            return True

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

    return False

def main():
    """Main function to process all content files."""
    content_dir = Path("femres-app/src/content")

    if not content_dir.exists():
        print(f"Content directory not found: {content_dir}")
        return

    processed_count = 0
    error_count = 0

    # Process all markdown files in content directory
    for md_file in content_dir.rglob("*.md"):
        try:
            if process_file(md_file):
                processed_count += 1
        except Exception as e:
            print(f"Error with {md_file}: {e}")
            error_count += 1

    print(f"\nProcessing complete:")
    print(f"Files updated: {processed_count}")
    print(f"Errors encountered: {error_count}")

if __name__ == "__main__":
    main()