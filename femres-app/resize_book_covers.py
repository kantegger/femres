#!/usr/bin/env python3
"""
批量调整书籍封面图片尺寸为 400x600 像素
"""

from PIL import Image
import os
import sys

def resize_book_cover(input_path, output_path, size=(400, 600)):
    """
    调整图片尺寸为指定大小，保持比例并居中裁剪
    """
    try:
        # 打开图片
        img = Image.open(input_path)
        
        # 转换为RGB模式（处理PNG透明通道）
        if img.mode in ('RGBA', 'LA', 'P'):
            # 创建白色背景
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # 计算缩放比例，使图片能够覆盖目标尺寸
        img_ratio = img.width / img.height
        target_ratio = size[0] / size[1]
        
        if img_ratio > target_ratio:
            # 图片更宽，按高度缩放
            new_height = size[1]
            new_width = int(new_height * img_ratio)
        else:
            # 图片更高，按宽度缩放
            new_width = size[0]
            new_height = int(new_width / img_ratio)
        
        # 缩放图片
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # 居中裁剪到目标尺寸
        left = (new_width - size[0]) // 2
        top = (new_height - size[1]) // 2
        right = left + size[0]
        bottom = top + size[1]
        
        img = img.crop((left, top, right, bottom))
        
        # 保存图片，优化质量
        img.save(output_path, 'JPEG', quality=85, optimize=True)
        
        # 获取文件大小
        original_size = os.path.getsize(input_path) / 1024  # KB
        new_size = os.path.getsize(output_path) / 1024  # KB
        
        print(f"[OK] {os.path.basename(input_path)}")
        print(f"  Original: {original_size:.1f} KB")
        print(f"  New: {new_size:.1f} KB")
        print(f"  Compressed: {(1 - new_size/original_size) * 100:.1f}%")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] Failed to process {os.path.basename(input_path)}: {e}")
        return False

def main():
    # 设置路径
    input_dir = "G:/femres/femres-app/public/images/books"
    output_dir = "G:/femres/femres-app/public/images/books_resized"
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 获取所有jpg文件
    jpg_files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    if not jpg_files:
        print("没有找到图片文件")
        return
    
    print(f"Found {len(jpg_files)} image files")
    print(f"Target size: 400x600 pixels")
    print("-" * 40)
    
    success_count = 0
    
    for filename in jpg_files:
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)
        
        if resize_book_cover(input_path, output_path):
            success_count += 1
        print()
    
    print("-" * 40)
    print(f"Completed: {success_count}/{len(jpg_files)} successful")
    
    if success_count == len(jpg_files):
        print("\nReplace original images with resized ones? (y/n): ", end="")
        answer = input().strip().lower()
        
        if answer == 'y':
            import shutil
            for filename in jpg_files:
                src = os.path.join(output_dir, filename)
                dst = os.path.join(input_dir, filename)
                shutil.move(src, dst)
            os.rmdir(output_dir)
            print("[OK] Original images replaced")
        else:
            print(f"Resized images saved in: {output_dir}")

if __name__ == "__main__":
    main()