const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'content', 'posts');
const catDir = path.join(__dirname, 'content', 'categories');

const existingPosts = fs.readdirSync(postsDir).map(f => f.replace('.mdx', ''));

const topics = [
  // A. 新手
  {
    slug: 'what-is-airport-meaning',
    title: '机场是什么意思？为什么网络服务会被叫做“机场”',
    primary: '机场是什么意思',
    secondary: ['机场是什么', '网络机场', '机场节点', '机场订阅', '科学上网机场'],
    category: 'airport-observation',
    coverImage: '/images/airport-1.jpg',
    content: `
机场是什么意思？在网络冲浪的语境中，“机场”通常指的是提供代理节点（如 Shadowsocks、V2Ray、Trojan 等协议）服务的提供商。因为早期的 Shadowsocks 客户端图标是一个纸飞机，所以提供此类节点服务的平台就被网友戏称为“机场”。

## 为什么叫“机场”？
最早的代理工具以小飞机为 Logo，随着行业发展，打包售卖这些节点的服务商越来越多。为了隐晦地交流，大家开始用“机场”来代指这些商家，用“买机票”代指购买套餐，用“航班”代指线路。这个称呼逐渐固化，成为了目前的通用术语。

## 机场的核心作用
1. **网络加速与访问**：通过在海外部署服务器，帮助用户绕过网络拥堵或限制。
2. **保护隐私**：数据经过加密传输，在不安全的公共网络下保护用户数据。
3. **流媒体解锁**：提供原生 IP 或特定地区的节点，帮助用户观看 Netflix、Disney+ 等受地域限制的内容。

## 普通用户应该怎么看？
对于绝大多数人来说，选择一个稳定、靠谱的服务商，比钻研底层协议更重要。这就是为什么我们需要关注**机场节点**的速度、稳定性以及**机场订阅**的便捷性。

## 总结
“网络机场”只是一个通俗的代称，其本质是加密代理服务。了解这个概念，是开启更广阔网络世界的第一步。
`
  },
  {
    slug: 'what-is-airport-subscription',
    title: '机场订阅是什么？订阅链接有什么作用',
    primary: '机场订阅',
    secondary: ['订阅链接', '机场订阅链接', 'Clash订阅', '订阅地址', '机场怎么导入'],
    category: 'clash',
    coverImage: '/images/clash-1.jpg',
    content: `
机场订阅本质上是一个包含了多个代理节点配置信息的动态链接。通过将这个链接输入到客户端（如 Clash、Surge 等），客户端就能自动拉取并配置所有可用的节点。

## 为什么需要订阅链接？
过去，用户需要手动一个一个添加节点配置，非常繁琐且容易出错。而**机场订阅链接**将所有信息打包。当服务商更新了节点 IP 或密码时，用户只需在客户端点击“更新订阅”，就能同步最新配置。

## 如何使用订阅？
1. 在服务商后台复制**订阅地址**。
2. 打开客户端（例如 Clash），找到“配置”或“Profiles”。
3. 粘贴链接并下载。
4. 切换到代理页面，选择你需要的节点。

## 常见误区
- **订阅链接不能随意分享**：链接包含了你的账户认证信息（如 Token）。一旦泄露，别人就可以使用你的流量，导致你的账号被封禁。
- **更新失败**：有时候因为网络原因，或者服务商的订阅服务器被屏蔽，会导致更新失败。这时候需要检查当前网络环境。

## 总结
掌握如何导入和管理**Clash订阅**是现代网络冲浪的基础技能。它极大地简化了配置流程，让无缝切换节点成为可能。
`
  },
  {
    slug: 'what-is-proxy-node',
    title: '机场节点是什么？节点、服务器和线路有什么区别',
    primary: '机场节点',
    secondary: ['节点是什么意思', '机场服务器', '代理节点', '机场线路', '节点服务器'],
    category: 'network',
    coverImage: '/images/network-1.jpg',
    content: `
机场节点，简单来说就是服务商部署在世界各地的服务器。当你连接到某个节点时，你的网络请求会先发送到这台服务器，再由它转发给目标网站。

## 节点、服务器和线路的区别
- **机场服务器（Server）**：物理存在的机器，负责处理和转发数据。
- **代理节点（Node）**：逻辑上的概念，一台服务器可以配置成多个节点供用户选择。
- **机场线路（Route）**：数据从你的设备到达海外服务器所经过的物理或逻辑路径（如直连、中转、专线）。

## 节点的作用
1. **改变 IP 地址**：连接日本节点，你的对外 IP 就是日本的。
2. **优化路由**：有时候直连美国很慢，但通过香港节点中转到美国可能会快很多。

## 如何选择节点？
并不是延迟越低越好。对于看网页，延迟很重要；但对于看视频，带宽（速度）更重要。了解**节点是什么意思**，能帮助你根据实际需求（如游戏、流媒体、下载）选择最合适的节点。

## 总结
**节点服务器**是你连接世界的跳板。理解节点和线路的基础概念，能让你在众多服务中做出更明智的选择。
`
  },
  {
    slug: 'how-to-calculate-bandwidth',
    title: '机场流量怎么算？100GB 到底能用多久',
    primary: '机场流量',
    secondary: ['机场100GB够用吗', '机场流量怎么算', '机场流量消耗', '节点流量', '机场套餐流量'],
    category: 'airport-observation',
    coverImage: '/images/airport-2.jpg',
    content: `
机场流量的计算方式通常是：你通过代理节点消耗的下载和上传数据总量。那么，100GB 的**机场套餐流量**到底够不够用呢？这完全取决于你的使用习惯。

## 不同场景下的流量消耗
- **文字与网页浏览**：非常省流量。每天刷网页、看新闻，一个月连 5GB 都用不到。
- **社交媒体与图片**：如 Instagram、Twitter，图片较多。每天高强度使用，一个月大约消耗 10-20GB。
- **视频流媒体（Netflix/YouTube）**：真正的“流量杀手”。看 1080P 视频，每小时大约消耗 1.5GB 到 3GB；如果是 4K 视频，每小时可能高达 7GB。

## 流量怎么算与节点倍率
需要特别注意的是，很多服务商有“节点倍率”的设定。如果你使用了 2.0 倍率的节点，那么你实际下载了 1GB 的文件，系统会扣除你 2GB 的**节点流量**。

## 100GB 够用吗？
- 如果你只是偶尔查资料、用 Google，100GB 绰绰有余。
- 如果你每天看几集 1080P 的 Netflix 剧集，100GB 可能撑不到月底。

## 总结
了解**机场流量消耗**的规律，根据自己的实际需求选择套餐，才能避免流量焦虑或资源浪费。
`
  },
  // B. 线路
  {
    slug: 'what-is-iplc-line',
    title: 'IPLC 是什么？为什么 IPLC 线路通常更贵',
    primary: 'IPLC',
    secondary: ['IPLC是什么', 'IPLC专线', 'IPLC机场', 'IPLC线路', 'IPLC和普通节点区别'],
    category: 'network',
    coverImage: '/images/network-2.jpg',
    content: `
IPLC 是 International Private Leased Circuit（国际局域网专线）的缩写。本质上，它是跨国企业为了保证两地之间通信质量，向电信运营商租用的点对点专用物理线路。

## IPLC 的核心优势
1. **不过墙**：由于是点对点专线，流量不需要经过常规的国际出口防火墙审查，因此极低概率受到封锁或干扰。
2. **超低延迟与极高稳定性**：数据传输路径固定，没有常规公网的拥堵问题。例如深港 IPLC，延迟可以稳定在几毫秒。

## 为什么 IPLC 线路更贵？
成本极高。真正的 **IPLC专线** 价格非常昂贵，服务商需要支付高昂的带宽租赁费用。因此，**IPLC机场** 的套餐价格通常远高于普通中转机场，且流量单价更贵。

## IPLC 和普通节点区别
普通节点走的是拥挤的公网，受晚高峰影响大。而 IPLC 就像是高速公路上的 VIP 专用车道，不受大塞车影响。

## 总结
如果你是硬核游戏玩家、量化交易员，或者对网络稳定性有极高要求且预算充足，IPLC 是不二之选。
`
  },
  {
    slug: 'what-is-iepl-line',
    title: 'IEPL 是什么？IEPL 和 IPLC 有什么区别',
    primary: 'IEPL',
    secondary: ['IEPL是什么', 'IEPL专线', 'IEPL和IPLC', 'IEPL机场'],
    category: 'network',
    coverImage: '/images/network-3.jpg',
    content: `
IEPL 是 International Ethernet Private Line（国际以太网专线）的缩写。它与 IPLC 非常相似，但它是建立在二层以太网技术上的端到端专线服务。

## IEPL 的特点
- **高灵活性**：基于以太网技术，带宽扩展更容易。
- **纯净的二层网络**：相比 IPLC，IEPL 在路由和配置上更为简单，适合构建大带宽的跨国网络。

## IEPL 和 IPLC 有什么区别？
对于普通**IEPL机场**用户来说，这两者的实际体验差异微乎其微。它们都具有不经过防火墙、延迟低、稳定性极高的特点。主要的区别在于底层的网络封装协议（SDH vs Ethernet），这是服务商和运营商需要考虑的技术细节。

## 应该选择哪一个？
在消费级市场，很多服务商会将 IEPL 和 IPLC 混用或统称为专线。你不需要过于纠结**IEPL是什么**，只要确认它是真正的物理/逻辑专线即可。

## 总结
无论是 **IEPL专线** 还是 IPLC，它们代表的都是当前最高质量的国际互联方案，为你提供晚高峰毫不妥协的网络体验。
`
  },
  {
    slug: 'direct-vs-transit-vs-dedicated',
    title: '机场直连、中转和专线到底有什么区别',
    primary: '机场直连和中转区别',
    secondary: ['直连节点', '中转节点', '专线机场', '机场线路', '直连机场'],
    category: 'network',
    coverImage: '/images/network-4.jpg',
    content: `
在选择机场线路时，我们经常看到直连、中转和专线这三个词。理解它们之间的区别，是挑选合适服务的基础。

## 直连节点
**直连**意味着你的设备直接连接到位于海外的服务器。
- **优点**：成本低，带宽通常较大。
- **缺点**：受国内出口拥堵影响极大，晚高峰丢包严重，且 IP 容易被封锁。

## 中转节点
**中转**是指你的设备先连接到国内的一台服务器（入口），这台服务器再通过公网将数据转发到海外服务器（落地）。
- **优点**：国内入口通常优化了路由（如使用 BGP 线路），连通性更好，抗封锁能力较强。
- **缺点**：如果国内到国外的公网依然拥堵，速度依然会受影响。

## 专线机场
**专线**（如 IPLC/IEPL）也是一种中转，但入口到出口之间走的是租赁的专用线路，不过墙。
- **优点**：极致稳定，延迟低，不受晚高峰影响。
- **缺点**：价格昂贵。

## 总结
对于大部分用户，优秀的**中转节点**是性价比最高的选择；对稳定性要求极高的用户，应考虑**专线机场**。了解**机场直连和中转区别**，能帮你避开很多廉价但不稳定的坑。
`
  },
  {
    slug: 'what-is-bgp-routing',
    title: 'BGP 线路是什么？机场常说的 BGP 有什么作用',
    primary: 'BGP线路',
    secondary: ['BGP是什么', 'BGP机场', '网络BGP', 'BGP节点', '多线BGP'],
    category: 'network',
    coverImage: '/images/hero-1.jpg',
    content: `
BGP 是 Border Gateway Protocol（边界网关协议）的缩写。在机场术语中，当我们谈论 BGP 时，通常是指服务商使用了国内的多线 BGP 接入作为节点的中转入口。

## BGP 是什么？
简单来说，不同的网络运营商（如电信、联通、移动）之间互访有时会比较慢。**多线BGP** 技术允许一台服务器同时接入多个运营商的网络。BGP 协议会自动为你寻找一条到达该服务器最快、最优的路径。

## BGP 在机场中的作用
当你使用**BGP节点**作为中转入口时：
- 如果你是电信用户，数据会自动走电信线路到入口。
- 如果你是联通用户，数据走联通线路。
这解决了跨网访问变慢的问题，极大地提升了国内段的连接质量和速度。

## BGP 就是最好的吗？
BGP 只是优化了你到国内入口的这一段网络。如果该入口到海外服务器的国际出口很拥堵，你依然会觉得慢。因此，**BGP机场**通常需要搭配优质的公网路由（如 CN2 GIA）或专线，才能发挥最大威力。

## 总结
**网络BGP** 是一项优化路由的技术，看到 BGP 入口，通常意味着该服务商在基础设施上投入了成本，是对网络质量的一种保障。
`
  },
  // C. 测速
  {
    slug: 'how-to-test-airport-speed',
    title: '机场测速怎么看？延迟、速度、丢包应该看哪个',
    primary: '机场测速',
    secondary: ['节点测速', '机场速度测试', '机场延迟', '节点延迟', '丢包率'],
    category: 'airport-observation',
    coverImage: '/images/nav-airport.jpg',
    content: `
我们在挑选服务时，经常会看到各种眼花缭乱的测速图（如 Speedtest 截图或批量测速工具的结果）。面对这些数据，**机场测速**到底应该怎么看？

## 核心指标解析
1. **速度（Bandwidth/Speed）**：决定了你下载文件的快慢和看视频的清晰度。如果你经常看 4K 流媒体，速度是最关键的指标。
2. **节点延迟（Latency/Ping）**：决定了网页点开的响应时间。延迟越低，网页“秒开”的感觉越明显。
3. **丢包率（Packet Loss）**：决定了连接的稳定性。丢包高会导致视频卡顿、游戏掉线。

## 测速的常见误区
- **不要盲目迷信极限速度**：有些**节点测速**能跑满千兆，但日常使用中 100Mbps 已经足够应付所有 4K 视频。
- **晚高峰测速才真实**：白天测速图再漂亮，不如晚上 9 点的真实体验。

## 总结
一份优秀的**机场速度测试**报告，不仅要有较好的极限速度，更要求在晚高峰时保持极低的**丢包率**和稳定的延迟。综合考量，才能找到真正好用的服务。
`
  },
  {
    slug: 'what-is-packet-loss',
    title: '什么是丢包率？机场节点丢包会造成什么影响',
    primary: '丢包率',
    secondary: ['节点丢包', '机场丢包', '网络丢包', '丢包率多少正常'],
    category: 'network',
    coverImage: '/images/nav-network.jpg',
    content: `
在网络传输中，数据被分割成一个个小的数据包进行发送。如果在传输过程中，某些数据包未能成功到达目的地，这就产生了丢包。**丢包率**就是丢失的数据包占发送总数的百分比。

## 节点丢包的影响
- **网页浏览**：图片加载残缺，或者页面需要很久才能完全显示，因为浏览器需要重新请求丢失的数据包。
- **流媒体**：视频缓冲、分辨率突然下降。
- **语音与游戏**：通话断断续续，游戏出现瞬移、技能放不出来，这是**网络丢包**最致命的场景。

## 丢包率多少正常？
- 优秀的专线节点，丢包率应长期保持在 0% 或极偶尔的 1% 以下。
- 对于普通的公网中转节点，晚高峰出现 1%-5% 的**机场丢包**是可以接受的。
- 如果丢包率超过 10%，网络体验将严重下降。

## 如何解决？
如果是物理线路拥堵导致的丢包，用户端无法解决，只能更换质量更好的节点或服务商。

## 总结
比起单纯的速度，**丢包率**更是衡量一个网络是否“稳定”的黄金标准。
`
  },
  // D. Clash
  {
    slug: 'what-is-clash',
    title: 'Clash 是什么？新手第一次使用 Clash 完整解释',
    primary: 'Clash是什么',
    secondary: ['Clash教程', 'Clash怎么用', 'Clash代理', 'Clash新手', 'Clash节点'],
    category: 'clash',
    coverImage: '/images/clash-2.jpg',
    content: `
Clash 是目前最流行、功能最强大的开源跨平台代理客户端内核之一。对于刚接触科学网络的用户来说，了解**Clash是什么**是第一门必修课。

## Clash 的核心机制
传统的代理软件（如早期的 Shadowsocks 客户端）往往只能全局代理，或者使用简单的 PAC 列表。而 Clash 引入了强大的“分流规则”系统。
它能够根据你要访问的域名或 IP，自动决定走哪个**Clash节点**，或者直接直连不经过代理。

## 新手为什么觉得难？
Clash 的配置是基于 YAML 格式的文本文件。虽然非常灵活，但对**Clash新手**来说不够直观。好在现在的各大服务商都提供了一键导入的订阅链接，你几乎不需要自己编写配置文件。

## 如何开始使用？
1. 下载适合你操作系统的图形化客户端（如 Clash for Windows, ClashX 等，或现在的衍生版如 Clash Verge）。
2. 将服务商提供的订阅链接导入软件。
3. 选择一个节点，开启系统代理。

## 总结
掌握了**Clash怎么用**，你就拥有了精细化管理网络流量的能力。这不仅能提升访问速度，还能极大地节省代理流量。
`
  },
  {
    slug: 'how-to-import-clash-subscription',
    title: 'Clash 怎么导入订阅？订阅链接使用方法',
    primary: 'Clash导入订阅',
    secondary: ['Clash订阅', 'Clash订阅链接', 'Clash怎么添加节点', '机场订阅'],
    category: 'clash',
    coverImage: '/images/clash-3.jpg',
    content: `
当你购买了服务后，最重要的第一步就是将节点导入到客户端中。**Clash导入订阅**的过程其实非常简单，以下是标准流程。

## 获取订阅链接
登录你的服务商后台，通常在仪表盘（Dashboard）页面会有一个明显的按钮，比如“一键导入 Clash”或者“复制 Clash 订阅链接”。我们推荐使用“复制**Clash订阅链接**”的方式，这样更不容易出错。

## 在客户端中导入
以常见的 Windows 客户端为例：
1. 打开软件，点击左侧菜单的 \`Profiles\`（配置）。
2. 在顶部的输入框中粘贴你刚刚复制的**机场订阅**链接。
3. 点击 \`Download\`（下载）按钮。
4. 看到列表中出现了一个新的配置项后，**一定要点击它**，使其前面出现绿色的选中状态。

## 常见问题
如果你想知道**Clash怎么添加节点**，请记住：现代客户端不建议手动单个添加节点，使用订阅链接可以一次性导入所有节点并保持更新。

## 总结
正确导入**Clash订阅**是使用代理软件的基础，定期点击更新按钮，可以确保你始终拥有最新的节点配置。
`
  },
  {
    slug: 'clash-routing-modes-explained',
    title: 'Clash 全局模式、规则模式和直连模式有什么区别',
    primary: 'Clash规则模式',
    secondary: ['Clash全局模式', 'Clash直连模式', 'Rule模式', 'Global模式', 'DIRECT'],
    category: 'clash',
    coverImage: '/images/clash-4.jpg',
    content: `
在使用 Clash 时，最常让人困惑的就是软件界面上的三种工作模式：全局、规则和直连。选错了模式，会导致打不开网页或者大量浪费流量。

## 直连模式 (DIRECT)
在**Clash直连模式**下，所有的网络请求都会绕过代理节点，直接通过你本地的宽带或流量发送。相当于暂时关闭了代理功能，适合在不需要科学上网时使用。

## 全局模式 (Global)
在**Clash全局模式**下，你电脑发出的**所有**网络请求，全部强制通过你选定的代理节点发送。
- **缺点**：访问国内网站会非常慢，而且会严重消耗你的代理流量。
- **适用场景**：当规则模式无法正常工作，或者你需要某些特定软件强行走代理时使用。

## 规则模式 (Rule)
这是 Clash 的灵魂，也是默认和最推荐的模式。
在**Clash规则模式**下，软件会读取配置文件中的规则列表。如果是国内网站（如百度、淘宝），就直连；如果是海外受限网站（如 Google），就走代理。它能做到智能分流，既保证了速度，又节省了流量。

## 总结
绝大多数情况下，请将 Clash 保持在**规则模式 (Rule)**，这是体验最好、最省心的方式。
`
  },
  {
    slug: 'clash-subscription-update-failed',
    title: 'Clash 订阅更新失败怎么办？常见原因与排查方法',
    primary: 'Clash订阅更新失败',
    secondary: ['Clash更新失败', '订阅链接失效', 'Clash无法更新订阅', 'Clash订阅错误'],
    category: 'clash',
    coverImage: '/images/nav-clash.jpg',
    content: `
“无法下载配置文件”或“更新失败”是使用过程中最常遇到的报错。遇到**Clash订阅更新失败**，不要慌张，按照以下步骤排查。

## 常见原因与解决办法

### 1. 订阅域名被屏蔽
这是最常见的原因。服务商的订阅服务器域名可能被当地网络封锁了。
**解决办法**：如果你本地还有能用的节点，先连上能用的节点，让 Clash 在有代理的状态下再去更新订阅。

### 2. 订阅链接已失效
如果你重置了密码，或者在后台点击了“重置订阅链接”，那么旧的**订阅链接失效**了。
**解决办法**：去服务商官网重新复制一份最新的链接，在 Clash 中替换原有的链接并重新下载。

### 3. 套餐过期或流量耗尽
有些服务商在套餐过期后，会停止解析你的订阅链接，导致**Clash无法更新订阅**。
**解决办法**：检查账号状态是否正常。

### 4. 软件缓存或系统网络问题
有时候是系统 DNS 污染或软件卡死。
**解决办法**：彻底退出 Clash 并重启，或清理 DNS 缓存。

## 总结
遇到**Clash更新失败**，大概率是网络连通性问题或链接本身的问题，顺藤摸瓜排查，很容易就能解决。
`
  },
  // E. 流媒体 / AI
  {
    slug: 'why-netflix-is-blocked-on-airports',
    title: '为什么机场节点看不了 Netflix？流媒体解锁原理解释',
    primary: 'Netflix机场',
    secondary: ['Netflix节点', 'Netflix解锁', '流媒体解锁', 'Netflix地区限制', '机场Netflix'],
    category: 'network',
    coverImage: '/images/nav-network.jpg',
    content: `
很多新手买完服务后，兴冲冲地打开 Netflix，却发现提示“您似乎正在使用解块程序或代理”。为什么普通的节点看不了，必须要有专门的**Netflix节点**？

## 为什么会有封锁？
Netflix 购买了大量影视剧的版权，而这些版权往往是按国家/地区授权的。为了防止用户跨区观看未授权的内容，Netflix 部署了极其严格的 **Netflix地区限制** 和反代理机制。

## Netflix 是如何识别代理的？
Netflix 会收集各大云计算数据中心（如 AWS, DigitalOcean, 阿里云等）的 IP 段。因为绝大多数代理服务器都搭建在这些商用机房，所以一旦 Netflix 发现你的请求来自这些已知的数据中心 IP，就会直接阻断。

## 流媒体解锁的原理
为了实现**流媒体解锁**，**Netflix机场**的服务商通常采用两种技术：
1. **原生 IP**：直接采购当地家庭宽带或未被 Netflix 标记的冷门 IP 资源。
2. **DNS 解锁 / 内部中转**：当用户请求 Netflix 时，机房服务器将请求转发给另一台拥有解锁能力的服务器去代为获取数据。

## 总结
要顺畅观看流媒体，一定要在购买前向服务商确认其是否提供稳定的**Netflix解锁**服务，并在客户端中选择标有专门解锁字样的节点。
`
  },
  {
    slug: 'netflix-vs-youtube-nodes',
    title: '为什么有些节点能用 YouTube，却不能看 Netflix',
    primary: 'Netflix节点不能用',
    secondary: ['YouTube节点', '流媒体节点', 'Netflix解锁失败', 'IP地区'],
    category: 'network',
    coverImage: '/images/nav-airport.jpg',
    content: `
这是一个非常经典的疑问：我明明能极其流畅地看 4K 的 YouTube，网络完全没问题，为什么偏偏**Netflix节点不能用**？

## 审查机制的差异
核心原因在于不同平台对 **IP地区** 和代理的容忍度完全不同。
- **YouTube**：作为以 UGC（用户生成内容）为主的平台，Google 对版权的区域限制要求相对宽松。只要你的 IP 能连上海外网络，YouTube 一般不会特意去封杀商用机房的 IP。因此，几乎任何代理节点都可以当作**YouTube节点**。
- **Netflix**：如前文所述，面临巨大的版权压力，采取了极其严厉的“一刀切”策略。凡是商用机房 IP，默认屏蔽。

## 流媒体节点的特殊性
这就导致了专门的**流媒体节点**成本更高，维护更难。当服务商的解锁 IP 被 Netflix 发现并封禁时，就会出现**Netflix解锁失败**，而此时节点本身的带宽和速度并未受影响，所以 YouTube 依然流畅。

## 总结
能否访问 YouTube 测试的是节点的“连通性和速度”，而能否访问 Netflix 测试的是节点的“IP 纯净度和解锁能力”。两者不能混为一谈。
`
  },
  {
    slug: 'why-chatgpt-says-not-available-in-your-country',
    title: '为什么 ChatGPT 会显示地区不可用？IP 与地区识别原理',
    primary: 'ChatGPT地区不可用',
    secondary: ['ChatGPT节点', 'ChatGPT打不开', 'ChatGPT地区限制', 'AI节点', 'IP地区'],
    category: 'guides',
    coverImage: '/images/guides-1.jpg',
    content: `
在使用先进的 AI 服务时，许多用户经常遇到“Access denied”或者“ChatGPT not available in your country”的提示。遇到**ChatGPT地区不可用**，通常是 IP 惹的祸。

## 地区识别原理
互联网上的每一个 IP 都有其注册归属地。当访问 OpenAI 时，服务器会通过专业的 IP 数据库查询你的来源地区。如果检测到你的 **IP地区** 位于未开放服务的国家（如中国大陆、俄罗斯等），就会直接触发**ChatGPT地区限制**。

## 为什么明明用了海外节点还是不行？
1. **IP 库不准确**：有些**AI节点**的 IP 实际上广播自别的国家，虽然地理位置在海外，但在某些数据库中仍被标记为受限地区。
2. **风控封杀**：OpenAI 对代理 IP 的风控极严。如果某个商用机房 IP 每天有成千上万个账号同时访问，系统会认定这是机器刷单或滥用，直接拉黑该 IP。这就是为什么很多普通节点导致**ChatGPT打不开**。

## 总结
为了顺畅使用 AI 服务，你需要寻找提供高纯净度**ChatGPT节点**的服务，或者支持本地 DNS 解锁的高级方案，确保避开平台的风控拦截。
`
  },
  {
    slug: 'native-ip-vs-broadcast-ip',
    title: '原生 IP、广播 IP 和机房 IP 有什么区别',
    primary: '原生IP',
    secondary: ['广播IP', '机房IP', '住宅IP', '原生IP机场', 'IP类型'],
    category: 'network',
    coverImage: '/images/feature-1.jpg',
    content: `
在追求流媒体解锁和海外服务正常使用时，我们经常听到“原生 IP”这个词。理解不同的 **IP类型**，有助于你筛选出优质的网络服务。

## 什么是原生 IP？
**原生IP (Native IP)** 是指该 IP 的注册归属地与服务器实际物理机房所在地完全一致。这种 IP 通常受到当地流媒体和服务商的信任，非常适合用来解锁有严格地区限制的服务。拥有大量此类资源的通常被称为**原生IP机场**。

## 什么是广播 IP？
**广播IP (Broadcast IP)** 是指服务器物理位置在一个国家，但服务商通过技术手段将另一个国家的 IP 地址“广播”到这台服务器上。比如物理机房在日本，但 IP 显示是美国的。这种 IP 很容易被流媒体平台的数据库识别并封锁。

## 机房 IP 与 住宅 IP
- **机房IP**：由大型云计算公司拥有，是绝大多数机场节点使用的类型。容易被风控。
- **住宅IP (ISP IP)**：由当地电信运营商分配给家庭宽带用户的真实 IP。信任度最高，几乎不会被任何风控系统拦截。

## 总结
在解锁 Netflix 或使用 ChatGPT 时，优质的**原生IP**甚至**住宅IP**是核心保障。虽然价格较高，但体验无可替代。
`
  },
  // F. 避坑
  {
    slug: 'how-to-choose-airport',
    title: '新手怎么选择机场？购买前应该先看这几个方面',
    primary: '怎么选择机场',
    secondary: ['机场怎么选', '机场推荐', '机场选择', '机场购买', '机场线路选择'],
    category: 'airport-observation',
    coverImage: '/images/hero-1.jpg',
    content: `
面对市面上成百上千的服务商，新手往往不知所措。到底**怎么选择机场**，才能避免花冤枉钱？购买前请重点考察以下几个维度。

## 1. 核心需求匹配
首先问自己：你买来做什么？
- 只是查查资料、写论文：便宜的大流量直连或普通中转即可。
- 看 4K 流媒体：重点考察是否有解锁节点、速度是否够快。
- 玩海外游戏、量化交易：毫不犹豫地选择 IPLC/IEPL 专线。
需求决定了你的**机场线路选择**。

## 2. 线路质量与稳定性
不要只看官网宣传的“测速图”。最真实的办法是买一个月的月付套餐，在晚上 9 点到 11 点的晚高峰期间亲自测试。晚高峰不丢包、延迟稳定的，才是好服务。

## 3. 运营时间与口碑
在进行**机场购买**时，尽量选择运营时间超过两年、在圈内有一定口碑的老牌服务商。新开的低价机场跑路风险极高。

## 总结
不要轻信网上泛滥的“最强**机场推荐**”。了解自己的需求，坚持“先月付试水，好用再长续”的原则，这就是最好的**机场怎么选**的方法。
`
  },
  {
    slug: 'is-expensive-airport-better',
    title: '机场价格越贵就一定越好吗？',
    primary: '机场价格',
    secondary: ['便宜机场', '机场多少钱', '机场价格区别', '机场套餐', '机场性价比'],
    category: 'airport-observation',
    coverImage: '/images/about-1.jpg',
    content: `
在浏览不同服务商的官网时，你会发现**机场价格**天差地别：有的 9.9 元包月 500GB，有的却要 50 元只能用 100GB。价格越贵就一定越好吗？

## 成本决定价格
**机场价格区别**的本质在于基础设施的成本：
- **便宜机场**：通常大量使用低成本的海外直连机器，超售严重。白天可能速度很快，一到晚上就拥堵不堪，频繁掉线。
- **昂贵机场**：采用国内多线 BGP 接入，辅以昂贵的 IPLC/IEPL 专线，甚至花重金购买高质量的原生 IP 进行流媒体解锁。成本高昂，售价自然高。

## 稳定性是奢侈品
在网络服务中，速度相对容易实现，但“在任何时候都保持稳定”是非常昂贵的。高价**机场套餐**买的就是晚高峰不卡顿、特殊时期不断网的安全感。

## 总结
价格贵不一定绝对好（也有服务商弄虚作假），但过分便宜的一定有猫腻。追求**机场性价比**时，请在自己能接受的预算内，寻找稳定性最好的一款。
`
  },
  {
    slug: 'what-does-airport-run-away-mean',
    title: '机场跑路是什么意思？购买长期套餐前应该注意什么',
    primary: '机场跑路',
    secondary: ['机场跑路怎么办', '机场年付', '机场长期套餐', '机场风险', '机场购买注意事项'],
    category: 'airport-observation',
    coverImage: '/images/tools-1.jpg',
    content: `
在相关社区里，你可能经常听到别人抱怨“又被坑了”。**机场跑路**指的是服务商突然关闭网站、卷走用户预存的套餐费用并消失不见的现象。

## 为什么会发生跑路？
1. **资金链断裂**：部分服务商为了吸引客户，采用低于成本价的策略恶性竞争。当新用户增长停滞，无法支付高昂的服务器账单时，只能选择跑路。
2. **不可抗力**：因遭受严重的网络攻击（DDoS）或面临法律合规问题而被迫关停。

## 如何降低机场风险？
购买**机场长期套餐**（如年付）虽然通常有折扣，但风险极高。
- **机场购买注意事项**之一：永远不要在不了解服务商底细的情况下直接买**机场年付**。
- 选择那些运营时间长、有稳定交流群、价格符合市场规律的老牌商家。

## 总结
如果不幸遇到**机场跑路怎么办**？大部分情况下费用是无法追回的。因此，控制风险的最佳方式就是分摊成本：坚持月付或季付。
`
  },
  {
    slug: 'how-to-choose-payment-cycle',
    title: '机场月付、季付和年付应该怎么选',
    primary: '机场年付',
    secondary: ['机场月付', '机场季付', '机场套餐', '机场订阅周期', '机场购买'],
    category: 'airport-observation',
    coverImage: '/images/nav-guides.jpg',
    content: `
当你决定购买某款服务时，通常会面临**机场订阅周期**的选择。到底该选**机场月付**、**机场季付**还是**机场年付**？这背后是一场关于折扣与风险的博弈。

## 为什么商家喜欢推年付？
很多**机场套餐**会对年付提供巨大的折扣，甚至“买十个月送两个月”。这是因为年付能迅速回笼资金，将未来的风险转移给用户。

## 各种周期的优劣势
- **机场月付**：最推荐的方式。虽然单价最高，但风险最小。如果遇到速度下降、线路变差或者商家跑路，你随时可以低成本抽身，更换其他服务。
- **机场季付**：折中选择。适合你已经使用过该服务商一两个月，感觉非常稳定，想稍微省点钱的情况。
- **机场年付**：风险最高。在长达一年的时间里，国际网络环境、商家的经营状况都可能发生巨大变化。

## 总结
在进行**机场购买**时，除非是非常有信誉且你已经用了好几年的顶级老牌服务商，否则请将“尽量月付或季付”作为铁律，拒绝高折扣的年付诱惑。
`
  }
];

let generatedCount = 0;

topics.forEach(topic => {
  // Check if exists
  if (!existingPosts.includes(topic.slug)) {
    const mdContent = `---
title: "${topic.title}"
description: "${topic.content.substring(1, 120).replace(/\n/g, ' ')}..."
date: "2026-09-17"
category: "${topic.category}"
coverImage: "${topic.coverImage}"
author: "海外志编辑部"
primary_keyword: "${topic.primary}"
---

# ${topic.title}

${topic.content.trim()}
`;
    fs.writeFileSync(path.join(postsDir, `${topic.slug}.mdx`), mdContent);
    generatedCount++;
  }
});

console.log(`Generated ${generatedCount} new posts.`);

// Update Category page for subtopic hubs
const catPageContent = `import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const cat = getAllCategories().find(c => c.slug === params.category);
  if (!cat) return {};
  return {
    title: \`\${cat.title}｜海外志\`,
    description: cat.description,
    alternates: {
      canonical: \`https://haiwaijichang.online/\${params.category}\`,
    }
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getAllCategories().find(c => c.slug === params.category);
  if (!cat) notFound();
  const posts = getPostsByCategory(params.category);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-bold mb-4">{cat.title}</h1>
        <div className="prose prose-slate text-lg text-slate-600 max-w-3xl">
          <p>{cat.description}</p>
          <p>在这里，我们对相关知识进行了系统的整理与归类。你可以浏览下方按主题组织的深度文章，从基础概念到进阶技巧，构建属于你的网络知识图谱。</p>
        </div>
      </div>
      
      <div className="space-y-16">
        <div className="space-y-12">
          {posts.map(post => (
            <article key={post.slug} className="flex flex-col md:flex-row gap-8 group bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <Link href={\`/\${post.category}/\${post.slug}\`} className="md:w-1/3 relative h-56 md:h-auto overflow-hidden shrink-0 block rounded-lg">
                 <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
               </Link>
               <div className="md:w-2/3 flex flex-col justify-center py-2 pr-4">
                 <span className="text-xs text-slate-400 mb-2 font-medium tracking-wide">{post.date}</span>
                 <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug"><Link href={\`/\${post.category}/\${post.slug}\`}>{post.title}</Link></h2>
                 <p className="text-slate-600 mb-5 leading-relaxed line-clamp-3">{post.description}</p>
                 <Link href={\`/\${post.category}/\${post.slug}\`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center uppercase tracking-wider mt-auto">
                    阅读全文 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
               </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'app', '[category]', 'page.tsx'), catPageContent);
console.log('Category page updated to Hub format.');
