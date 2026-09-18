const fs = require('fs');
const path = require('path');
const https = require('https');

const postsDir = path.join(__dirname, 'content', 'posts');
const categoriesDir = path.join(__dirname, 'content', 'categories');
const imagesDir = path.join(__dirname, 'public', 'images');

// Create directories if they don't exist
[postsDir, categoriesDir, imagesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Categories
const categories = [
    { slug: 'airport-observation', name: '机场观察', desc: '了解机场服务、线路类型与使用经验' },
    { slug: 'network', name: '网络知识', desc: '网络基础知识、线路原理与常见问题' },
    { slug: 'clash', name: 'Clash 教程', desc: '从入门到进阶的完整教程' },
    { slug: 'tools', name: '软件工具', desc: '实用的海外工具与软件推荐' },
    { slug: 'guides', name: '海外指南', desc: '海外服务、账号、支付与数字生活指南' }
];

categories.forEach(cat => {
    const content = `---
title: "${cat.name}"
description: "${cat.desc}"
---

${cat.desc}
`;
    fs.writeFileSync(path.join(categoriesDir, `${cat.slug}.mdx`), content);
});

// Posts
const posts = [
    {
        title: "机场是什么？新手第一次接触机场应该知道什么",
        slug: "what-is-airport-service",
        category: "airport-observation",
        date: "2026-09-17",
        desc: "全面解析“机场”服务的基本概念、运作原理以及新手入门的注意事项。",
        image: "/images/airport-1.jpg"
    },
    {
        title: "购买机场之前应该检查哪些东西？",
        slug: "what-to-check-before-buying-airport",
        category: "airport-observation",
        date: "2026-09-16",
        desc: "从节点覆盖、线路类型到流媒体解锁，教你如何在购买前进行有效避坑。",
        image: "/images/airport-2.jpg"
    },
    {
        title: "为什么机场晚上会变慢？",
        slug: "why-airport-slows-down-at-night",
        category: "airport-observation",
        date: "2026-09-15",
        desc: "深入探讨晚高峰网络拥堵的原因，包括国际出口带宽限制与负载均衡策略。",
        image: "/images/airport-3.jpg"
    },
    {
        title: "节点倍率是什么意思？",
        slug: "understanding-node-multiplier",
        category: "airport-observation",
        date: "2026-09-14",
        desc: "详细解释机场套餐中常见的节点倍率计费方式，帮你精打细算。",
        image: "/images/airport-4.jpg"
    },
    {
        title: "节点延迟越低就一定越好吗？",
        slug: "is-lower-latency-always-better",
        category: "airport-observation",
        date: "2026-09-13",
        desc: "破解延迟迷思，分析真实速度、稳定性和测速延迟之间的复杂关系。",
        image: "/images/airport-5.jpg"
    },
    {
        title: "IPLC、IEPL、BGP、直连和中转有什么区别？",
        slug: "iplc-iepl-bgp-direct-transit-differences",
        category: "network",
        date: "2026-09-12",
        desc: "硬核科普常见国际线路类型，助你理解不同线路的优缺点与适用场景。",
        image: "/images/network-1.jpg"
    },
    {
        title: "机场测速应该看延迟、速度还是丢包？",
        slug: "how-to-read-speed-test-results",
        category: "network",
        date: "2026-09-11",
        desc: "教你看懂节点测速图表，抓准关键指标，告别测速焦虑。",
        image: "/images/network-2.jpg"
    },
    {
        title: "为什么有些节点能打开网页却无法观看流媒体？",
        slug: "why-some-nodes-fail-streaming",
        category: "network",
        date: "2026-09-10",
        desc: "解析流媒体平台（如 Netflix、Disney+）的 IP 封锁机制及解锁原理。",
        image: "/images/network-3.jpg"
    },
    {
        title: "Netflix、YouTube 与 AI 服务为什么会判断你的地区？",
        slug: "how-geo-blocking-works",
        category: "network",
        date: "2026-09-09",
        desc: "揭秘互联网服务的地理围栏技术，以及它们如何识别你的真实物理位置。",
        image: "/images/network-4.jpg"
    },
    {
        title: "Clash 是什么？新手完整入门",
        slug: "clash-beginner-guide",
        category: "clash",
        date: "2026-09-08",
        desc: "从零开始认识强大的代理工具 Clash，掌握其基本运作逻辑与核心概念。",
        image: "/images/clash-1.jpg"
    },
    {
        title: "Clash 的规则模式、全局模式和直连模式有什么区别？",
        slug: "clash-modes-explained",
        category: "clash",
        date: "2026-09-07",
        desc: "图文详解 Clash 的三大工作模式，让你知道什么时候该用哪种模式。",
        image: "/images/clash-2.jpg"
    },
    {
        title: "Clash 订阅更新失败的常见原因",
        slug: "clash-subscription-update-failed",
        category: "clash",
        date: "2026-09-06",
        desc: "排查并解决 Clash 无法更新订阅链接的各种疑难杂症。",
        image: "/images/clash-3.jpg"
    },
    {
        title: "Windows 使用 Clash 类客户端时常见问题",
        slug: "windows-clash-common-issues",
        category: "clash",
        date: "2026-09-05",
        desc: "汇总 Windows 环境下运行 Clash 遇到的系统代理失效、端口冲突等问题。",
        image: "/images/clash-4.jpg"
    },
    {
        title: "好用的海外网络工具推荐（持续更新）",
        slug: "useful-overseas-network-tools",
        category: "tools",
        date: "2026-09-04",
        desc: "精选一批能提升你海外冲浪体验的实用小工具与浏览器插件。",
        image: "/images/tools-1.jpg"
    },
    {
        title: "海外网络工具新手词汇表",
        slug: "overseas-network-glossary",
        category: "guides",
        date: "2026-09-03",
        desc: "汇总并通俗解释常见的海外网络专业词汇，让你不再一头雾水。",
        image: "/images/guides-1.jpg"
    }
];

posts.forEach(post => {
    const content = `---
title: "${post.title}"
description: "${post.desc}"
date: "${post.date}"
category: "${post.category}"
coverImage: "${post.image}"
author: "海外志编辑部"
---

# ${post.title}

${post.desc}

## 引言

这是关于“${post.title}”的详细探讨。在这个信息爆炸的时代，了解这些知识对我们的海外数字生活至关重要。

## 核心概念

通过对基础设施和网络协议的理解，我们可以更好地选择适合自己的服务。这不仅仅是技术名词的堆砌，更是实际体验的保障。

### 细节分析

许多人在日常使用中会遇到各种问题，比如连接不稳定、速度慢或者某些服务无法访问。大部分情况下，这些问题可以通过基础的排查和正确的配置来解决。

* 关键点一：了解你的真实需求
* 关键点二：选择合适的基础设施
* 关键点三：掌握基本的排障技巧

> [!TIP]
> 更好的网络，是通往世界的另一种方式。

## 总结与建议

希望这篇文章能帮助你更好地理解背后的逻辑，避免常见的坑。我们将持续更新更多相关内容，敬请关注。
`;
    fs.writeFileSync(path.join(postsDir, `${post.slug}.mdx`), content);
});

// Download placeholder images to prevent build errors
const dummyImages = [
    'airport-1.jpg', 'airport-2.jpg', 'airport-3.jpg', 'airport-4.jpg', 'airport-5.jpg',
    'network-1.jpg', 'network-2.jpg', 'network-3.jpg', 'network-4.jpg',
    'clash-1.jpg', 'clash-2.jpg', 'clash-3.jpg', 'clash-4.jpg',
    'tools-1.jpg', 'guides-1.jpg',
    'hero-1.jpg', 'feature-1.jpg', 'about-1.jpg',
    'nav-airport.jpg', 'nav-network.jpg', 'nav-clash.jpg', 'nav-tools.jpg', 'nav-guides.jpg'
];

async function downloadImages() {
    for (const img of dummyImages) {
        const dest = path.join(imagesDir, img);
        if (!fs.existsSync(dest)) {
            // Write a tiny 1x1 base64 encoded JPG
            const base64Jpg = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
            fs.writeFileSync(dest, Buffer.from(base64Jpg, 'base64'));
        }
    }
}

downloadImages().then(() => {
    console.log("Content generated successfully.");
});
