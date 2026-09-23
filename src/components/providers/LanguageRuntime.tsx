'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { getPhraseMap } from '@/utils/translations';

export default function LanguageRuntime() {
  const language = useStore((state) => state.language);

  useEffect(() => {
    const root = document.body;
    const phraseMap = getPhraseMap(language);
    const reverseMap = new Map(Object.entries(phraseMap).map(([english, translated]) => [translated, english]));
    const originals = new WeakMap<Text, string>();
    let translating = false;
    const translate = () => {
      if (translating) return;
      translating = true;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'OPTION'].includes(parent.tagName)) continue;
        const current = textNode.textContent || '';
        const source = originals.get(textNode) || reverseMap.get(current.trim()) || current;
        originals.set(textNode, source);
        const translated = phraseMap[source.trim()];
        if (translated && current.trim() !== translated) textNode.textContent = current.replace(current.trim(), translated);
      }
      translating = false;
    };
    translate();
    const observer = new MutationObserver(translate);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  return null;
}