import type { TranslationKeys, Locale } from './types';
import { setTranslations } from './index';

// 导入翻译文件
import zhCN from './locales/zh-CN.json';
import en from './locales/en.json';

// 翻译数据
const translations: Record<Locale, TranslationKeys> = {
  'zh-CN': zhCN as TranslationKeys,
  'en': en as TranslationKeys
};

// 初始化翻译
setTranslations(translations);

export { translations };
export default translations;