#!/usr/bin/env python3
import os
from pathlib import Path

content_dir = Path("femres-app/src/content")

for content_type in ["books", "articles", "films", "videos", "podcasts", "papers"]:
    type_dir = content_dir / content_type
    if not type_dir.exists():
        continue

    print(f"\n=== {content_type.upper()} ===")

    # Find all Chinese files (without -en suffix)
    chinese_files = []
    english_files = []

    for file in type_dir.glob("*.md"):
        if file.stem.endswith("-en"):
            english_files.append(file.stem[:-3])  # Remove -en suffix
        else:
            chinese_files.append(file.stem)

    print(f"中文文件数量: {len(chinese_files)}")
    print(f"英文文件数量: {len(english_files)}")

    # Find missing English versions
    missing_english = []
    for chinese_file in chinese_files:
        if chinese_file not in english_files:
            missing_english.append(chinese_file)

    if missing_english:
        print(f"缺少英文版本的文件 ({len(missing_english)} 个):")
        for file in sorted(missing_english):
            print(f"  {file}")
    else:
        print("所有文件都有英文版本")