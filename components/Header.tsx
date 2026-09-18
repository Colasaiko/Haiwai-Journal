'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '机场观察', href: '/airport-observation' },
    { name: '网络知识', href: '/network' },
    { name: 'Clash 教程', href: '/clash' },
    { name: '软件工具', href: '/tools' },
    { name: '海外指南', href: '/guides' },
    { name: '品牌对比', href: '/compare' },
    { name: 'FAQ常见问题', href: '/faq' },
    { name: '关于', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex flex-col" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl font-bold tracking-tight text-slate-900">海外志</span>
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold leading-none">Haiwai Journal</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <p className="hidden xl:block text-xs text-slate-400 italic mr-4">探索更大的世界，<br/>从更好的网络开始。</p>
          
          <button className="hidden sm:block text-slate-500 hover:text-slate-900 focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-900 focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-xl border-b border-slate-200">
          <nav className="px-4 pt-2 pb-6 flex flex-col space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t border-slate-100">
               <div className="relative">
                  <input type="text" placeholder="搜索内容..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
               </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}