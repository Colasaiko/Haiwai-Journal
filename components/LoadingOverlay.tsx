"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("正在启航...");
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    const hasSeen = sessionStorage.getItem('hasSeenLoading');
    
    if (hasSeen) {
      // Skip or do a very fast version
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500); // give time for a quick fade out if needed, or just don't render
      return;
    }

    // Simulate loading progress
    let currentProgress = 0;
    const totalDuration = 2000; // minimum 2 seconds for the aesthetic
    const intervalTime = 30;
    const increment = (100 / (totalDuration / intervalTime));

    const timer = setInterval(() => {
      currentProgress += increment + (Math.random() * 2); // add some randomness
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setProgress(100);
        setStatusText("航线已就绪，欢迎来到海外志");
        
        // Wait a bit before fading out
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('hasSeenLoading', 'true');
          // Wait for fade out animation to finish before unmounting
          setTimeout(() => setShouldRender(false), 1000);
        }, 800);
      } else {
        setProgress(Math.floor(currentProgress));
        if (currentProgress > 40 && currentProgress < 80) {
          setStatusText("正在加载海外旅程...");
        } else if (currentProgress >= 80) {
          setStatusText("Preparing your voyage...");
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Image with subtle Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src="/images/loading_bg.jpg" 
          alt="Loading Background" 
          fill
          priority
          className="object-cover opacity-60 mix-blend-screen scale-110 animate-[kenburns_10s_ease-out_forwards]"
        />
        {/* Animated cloud/fog overlay layer for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center h-full justify-between py-24">
        
        {/* Top: Brand */}
        <div className="text-center animate-[fadein_1s_ease-out_forwards]">
          <div className="text-5xl md:text-6xl font-bold text-white tracking-widest mb-4 drop-shadow-lg">海外志</div>
          <p className="text-sm md:text-base text-slate-300 tracking-[0.2em] uppercase font-light drop-shadow-md">
            启航，去看更远的世界
          </p>
        </div>

        {/* Bottom: Progress */}
        <div className="w-full flex flex-col items-center animate-[fadeinup_1s_ease-out_0.5s_both]">
          <div className="w-full h-1 bg-white/20 rounded-full relative overflow-visible mb-6">
            
            {/* Wave Progress Line */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Boat Icon on top of the progress line */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-[80%] translate-x-1/2 w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg transition-transform animate-pulse"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M2.5 13.5L3 17.5C3 18.3 3.7 19 4.5 19H19.5C20.3 19 21 18.3 21 17.5L21.5 13.5C18.8 14.5 16.2 15 13.5 15C10.8 15 8.2 14.5 5.5 13.5H2.5ZM21.5 12.5C21.3 12.5 21 12.6 20.8 12.7C18.6 13.5 16.1 14 13.5 14C10.9 14 8.4 13.5 6.2 12.7C6 12.6 5.7 12.5 5.5 12.5H2.5L7.5 4H16.5L21.5 12.5ZM12 5V12H13V5H12Z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between w-full text-slate-300 text-xs md:text-sm tracking-wider font-light">
            <span className="transition-all duration-300">{statusText}</span>
            <span className="font-mono">{progress}%</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes kenburns {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeinup {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
