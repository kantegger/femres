#!/usr/bin/env python3
"""
Script to fix titleEn fields for books that have originalTitle.
"""

import re
from pathlib import Path

def fix_book_title(file_path):
    """Fix titleEn field in a book file using originalTitle."""
    try:
        content = file_path.read_text(encoding='utf-8')

        # Extract originalTitle
        original_title_match = re.search(r'originalTitle:\s*"([^"]*)"', content)
        if not original_title_match:
            print(f"No originalTitle found in {file_path}")
            return False

        original_title = original_title_match.group(1)

        # Check if titleEn contains Chinese characters
        titleEn_match = re.search(r'titleEn:\s*"([^"]*)"', content)
        if not titleEn_match:
            print(f"No titleEn found in {file_path}")
            return False

        current_titleEn = titleEn_match.group(1)

        # Check if current titleEn contains Chinese characters
        if re.search(r'[\u4e00-\u9fff]', current_titleEn):
            # Replace titleEn with originalTitle
            new_content = re.sub(
                r'titleEn:\s*"[^"]*"',
                f'titleEn: "{original_title}"',
                content
            )

            file_path.write_text(new_content, encoding='utf-8')
            print(f"Fixed {file_path}: titleEn updated to '{original_title}'")
            return True
        else:
            print(f"No fix needed for {file_path}: titleEn already in English")
            return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Fix all books with originalTitle."""
    books_dir = Path("femres-app/src/content/books")

    if not books_dir.exists():
        print(f"Books directory not found: {books_dir}")
        return

    fixed_count = 0

    for md_file in books_dir.glob("*.md"):
        if fix_book_title(md_file):
            fixed_count += 1

    print(f"\nFixed {fixed_count} book files")

if __name__ == "__main__":
    main()