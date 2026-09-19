'use client';

import { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      aria-label="复制当前页面链接"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1.5 text-green-600" />
          <span className="text-green-600">已复制链接</span>
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4 mr-1.5" />
          复制链接
        </>
      )}
    </button>
  );
}
