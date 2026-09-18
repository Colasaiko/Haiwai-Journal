'use client';

import { useEffect } from 'react';

export default function Redirector({ url, name }: { url: string, name: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 3000);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">正在前往 {name}</h1>
        <p className="text-slate-500 mb-6">我们正在为您安全地跳转至品牌官方网站...</p>
        <p className="text-xs text-slate-400">如果没有自动跳转，<a href={url} className="text-blue-600 hover:underline">请点击这里</a></p>
      </div>
    </div>
  );
}
