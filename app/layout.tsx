import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingOverlay from "@/components/LoadingOverlay";

export const metadata: Metadata = {
  metadataBase: new URL('https://haiwaijichang.online'),
  title: "海外志｜海外机场、网络知识与 Clash 使用指南",
  description: "海外志是一个围绕海外机场、网络知识、Clash 教程、软件工具与海外数字生活展开的中文内容 Blog，提供实用教程、概念解释、选择建议与使用经验。",
  alternates: {
    canonical: 'https://haiwaijichang.online',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-[#FAF9F6] text-slate-900 font-sans min-h-screen flex flex-col">
        <LoadingOverlay />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}