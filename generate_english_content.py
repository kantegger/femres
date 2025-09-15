#!/usr/bin/env python3
import os
import json
from pathlib import Path
import re

# Load topics mapping
with open('femres-app/src/i18n/topicsMapping.json', 'r', encoding='utf-8') as f:
    topics_mapping = json.load(f)

def translate_topics_to_english(chinese_topics):
    """Convert Chinese topic names to English using the mapping"""
    english_topics = []
    for topic in chinese_topics:
        if topic in topics_mapping:
            english_topics.append(topics_mapping[topic]['en'])
        else:
            # If not found in mapping, keep as is and print warning
            print(f"Warning: Topic '{topic}' not found in mapping")
            english_topics.append(topic)
    return english_topics

def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown content"""
    if not content.startswith('---'):
        return {}, content

    try:
        parts = content.split('---', 2)
        if len(parts) < 3:
            return {}, content

        frontmatter = parts[1].strip()
        body = parts[2].strip()

        # Simple YAML parsing for our use case
        data = {}
        current_key = None
        current_value = ""
        in_array = False

        for line in frontmatter.split('\n'):
            line = line.strip()
            if not line:
                continue

            if line.startswith('- ') and in_array:
                # Array item
                if current_key == 'topics':
                    item = line[2:].strip().strip('"').strip("'")
                    if current_key not in data:
                        data[current_key] = []
                    data[current_key].append(item)
                continue

            if ':' in line and not in_array:
                if current_key and current_value:
                    data[current_key] = current_value.strip().strip('"').strip("'")

                parts = line.split(':', 1)
                current_key = parts[0].strip()
                current_value = parts[1].strip()

                # Check if this is an array
                if current_value.startswith('[') and current_value.endswith(']'):
                    # Inline array
                    array_content = current_value[1:-1]
                    items = [item.strip().strip('"').strip("'") for item in array_content.split(',')]
                    data[current_key] = [item for item in items if item]
                    current_key = None
                    current_value = ""
                    in_array = False
                elif current_value == '' or current_value == '[]':
                    in_array = True
                    data[current_key] = []
                else:
                    in_array = False
            else:
                if current_key and not in_array:
                    current_value += ' ' + line

        # Don't forget the last key-value pair
        if current_key and current_value and not in_array:
            data[current_key] = current_value.strip().strip('"').strip("'")

        return data, body

    except Exception as e:
        print(f"Error parsing frontmatter: {e}")
        return {}, content

def create_english_content(chinese_file_path, english_file_path):
    """Generate English version of a Chinese content file"""

    try:
        with open(chinese_file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = parse_frontmatter(content)

        if not frontmatter:
            print(f"No frontmatter found in {chinese_file_path}")
            return False

        # Translate topics to English
        if 'topics' in frontmatter:
            english_topics = translate_topics_to_english(frontmatter['topics'])
            frontmatter['topics'] = english_topics

        # Add English versions of key fields
        if 'title' in frontmatter:
            frontmatter['titleEn'] = frontmatter['title']  # Will be manually updated
        if 'description' in frontmatter:
            frontmatter['descriptionEn'] = frontmatter['description']  # Will be manually updated
        if 'abstract' in frontmatter:
            frontmatter['abstractEn'] = frontmatter['abstract']  # Will be manually updated
        if 'keywords' in frontmatter:
            frontmatter['keywordsEn'] = frontmatter['keywords']  # Will be manually updated

        # Generate English frontmatter
        english_frontmatter = "---\n"
        for key, value in frontmatter.items():
            if isinstance(value, list):
                english_frontmatter += f'{key}: [{", ".join([f\'"{item}"\' for item in value])}]\n'
            elif isinstance(value, str):
                english_frontmatter += f'{key}: "{value}"\n'
            else:
                english_frontmatter += f'{key}: {value}\n'
        english_frontmatter += "---\n\n"

        # Generate basic English body content
        english_body = f"[English translation of {os.path.basename(chinese_file_path)} - Content to be translated]\n\n"
        english_body += body  # Keep original for now - will be translated manually

        # Write English file
        with open(english_file_path, 'w', encoding='utf-8') as f:
            f.write(english_frontmatter + english_body)

        print(f"Created: {english_file_path}")
        return True

    except Exception as e:
        print(f"Error processing {chinese_file_path}: {e}")
        return False

def main():
    content_dir = Path("femres-app/src/content")

    content_types = ["books", "articles", "films", "videos", "podcasts", "papers"]

    for content_type in content_types:
        type_dir = content_dir / content_type
        if not type_dir.exists():
            continue

        print(f"\\n=== Processing {content_type.upper()} ===")

        # Find Chinese files without English versions
        chinese_files = []
        english_files = set()

        for file in type_dir.glob("*.md"):
            if file.stem.endswith("-en"):
                english_files.add(file.stem[:-3])
            else:
                chinese_files.append(file.stem)

        missing_english = [f for f in chinese_files if f not in english_files]

        print(f"Found {len(missing_english)} files needing English versions")

        for filename in missing_english[:5]:  # Process first 5 files only for now
            chinese_path = type_dir / f"{filename}.md"
            english_path = type_dir / f"{filename}-en.md"

            if create_english_content(chinese_path, english_path):
                print(f"✓ Created English version for {filename}")
            else:
                print(f"✗ Failed to create English version for {filename}")

if __name__ == "__main__":
    main()