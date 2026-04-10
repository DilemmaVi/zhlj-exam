const questions = [
  {
    id: 1,
    type: 'judge',
    category: '通用类',
    question: '中辉绿建已服务超过160个国家和地区的客户。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '资料明确写到客户遍布全球160多个国家。'
  },
  {
    id: 2,
    type: 'single',
    category: '通用类',
    question: '以下哪一项不属于中辉绿建常被强调的三大核心优势？',
    options: ['A. 工贸一体', 'B. 近20年全球化老品牌', 'C. 重大项目经验', 'D. 价格绝对全行业最低'],
    answer: [3],
    explanation: '官方优势强调产业链、品牌和项目经验，不强调“绝对最低价”。'
  },
  {
    id: 3,
    type: 'multiple',
    category: '通用类',
    question: '以下哪些地点属于资料中提到的国内外工厂或仓储布局？',
    options: ['A. 广东佛山', 'B. 安徽淮南', 'C. 苏州', 'D. 沙特利雅得'],
    answer: [0, 1, 2, 3],
    explanation: '资料列出了佛山、淮南、苏州以及沙特利雅得等布局。'
  },
  {
    id: 4,
    type: 'single',
    category: '通用类',
    question: '广东工厂出口时常对应的港口组合是？',
    options: ['A. 上海港 / 宁波港', 'B. 南沙港 / 蛇口港', 'C. 天津港 / 青岛港', 'D. 连云港 / 上海港'],
    answer: [1],
    explanation: '广东佛山常对应南沙港或蛇口港。'
  },
  {
    id: 5,
    type: 'judge',
    category: '通用类',
    question: '电线平方数口诀“6421.5”中，6平方对应入户线。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '口诀是入户6、空调4、插座2.5、照明1.5。'
  },
  {
    id: 6,
    type: 'single',
    category: '通用类',
    question: '电线平方数口诀“6421.5”中，4平方通常对应什么用途？',
    options: ['A. 照明线路', 'B. 普通插座', 'C. 空调插座', 'D. 网线'],
    answer: [2],
    explanation: '4平方对应空调插座。'
  },
  {
    id: 7,
    type: 'multiple',
    category: '通用类',
    question: '以下哪些夹芯板材料可以达到国内A1级防火？',
    options: ['A. PU板', 'B. EPS夹心板', 'C. 岩棉夹心板', 'D. 玻璃棉夹心板'],
    answer: [0, 2, 3],
    explanation: 'PU、岩棉、玻璃棉可达到A1级，EPS通常为B1级。'
  },
  {
    id: 8,
    type: 'judge',
    category: '通用类',
    question: 'EPS夹心板可以达到国内A1级防火标准。',
    options: ['正确', '错误'],
    answer: [1],
    explanation: 'EPS通常是B1级，不能算A1级。'
  },
  {
    id: 9,
    type: 'single',
    category: '通用类',
    question: '同等50mm厚度下，隔热效果从好到差的正确顺序是？',
    options: ['A. PU > 岩棉 > 玻璃棉 > EPS', 'B. 岩棉 > PU > EPS > 玻璃棉', 'C. EPS > 玻璃棉 > 岩棉 > PU', 'D. PU > EPS > 岩棉 > 玻璃棉'],
    answer: [0],
    explanation: '资料给出的顺序是 PU > 岩棉 > 玻璃棉 > EPS。'
  },
  {
    id: 10,
    type: 'single',
    category: '通用类',
    question: '以下哪种产品安装最快，熟练工人最少只需2人约10分钟？',
    options: ['A. 快拼箱', 'B. Z型折叠箱', 'C. X型折叠箱', 'D. 拓展箱'],
    answer: [2],
    explanation: 'X型折叠箱以2人10分钟见长。'
  },
  {
    id: 11,
    type: 'single',
    category: '通用类',
    question: '快拼箱在有库存情况下的典型备货周期是？',
    options: ['A. 1-2天', 'B. 3-7个工作日', 'C. 10-15个工作日', 'D. 20-25个工作日'],
    answer: [1],
    explanation: '快拼箱备货周期通常为3-7个工作日。'
  },
  {
    id: 12,
    type: 'single',
    category: '通用类',
    question: '下列哪组尺寸对应40尺高柜（40HQ）？',
    options: ['A. 2438 × 6055 × 2590 mm', 'B. 2438 × 12198 × 2896 mm', 'C. 4000 × 12198 × 2896 mm', 'D. 2500 × 12000 × 2600 mm'],
    answer: [1],
    explanation: '40HQ尺寸为2438 × 12198 × 2896 mm。'
  },
  {
    id: 13,
    type: 'single',
    category: '通用类',
    question: '标准3×6×2.8m快拼箱，一个40尺高柜常见装载量是多少？',
    options: ['A. 8套', 'B. 10套', 'C. 17套', 'D. 24套'],
    answer: [2],
    explanation: '资料给出17套，约306平方米。'
  },
  {
    id: 14,
    type: 'judge',
    category: '通用类',
    question: 'Z型折叠箱、打包箱和快拼箱常规最多可堆叠3层。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '这三类产品资料中均提到最多堆叠3层。'
  },
  {
    id: 15,
    type: 'single',
    category: '通用类',
    question: '拓展箱常规最多可堆叠多少层？',
    options: ['A. 1层', 'B. 2层', 'C. 3层', 'D. 4层'],
    answer: [1],
    explanation: '普通拓展箱常规最多2层。'
  },
  {
    id: 16,
    type: 'single',
    category: '通用类',
    question: '内排水款快拼箱的地面承重通常是多少？',
    options: ['A. 120 kg/㎡', 'B. 150 kg/㎡', 'C. 200 kg/㎡', 'D. 300 kg/㎡'],
    answer: [2],
    explanation: '资料写明地面承重约200 kg/㎡。'
  },
  {
    id: 17,
    type: 'single',
    category: '通用类',
    question: '内排水款快拼箱的屋顶承重通常是多少？',
    options: ['A. 40 kg/㎡', 'B. 50 kg/㎡', 'C. 60 kg/㎡', 'D. 100 kg/㎡'],
    answer: [2],
    explanation: '屋顶承重通常是60 kg/㎡。'
  },
  {
    id: 18,
    type: 'multiple',
    category: '通用类',
    question: '以下哪些属于资料中提到的出厂测试项目？',
    options: ['A. 喷淋测试', 'B. 压力测试', 'C. 地面荷载测试', 'D. 防腐测试'],
    answer: [0, 1, 2, 3],
    explanation: '资料列出了贯穿、喷淋、压力、地面荷载、防腐等测试。'
  },
  {
    id: 19,
    type: 'single',
    category: '通用类',
    question: '订单金额达到什么规模时，公司可出资帮助完成当地证书认证？',
    options: ['A. 50万', 'B. 100万', 'C. 300万', 'D. 500万'],
    answer: [3],
    explanation: '资料中的门槛是订单金额达到500万。'
  },
  {
    id: 20,
    type: 'multiple',
    category: '通用类',
    question: '以下哪些属于资料中提到的集装箱常见组合方式？',
    options: ['A. 单箱落地', 'B. 拼装连通', 'C. 堆叠式组合', 'D. 混合结构式'],
    answer: [0, 1, 2, 3],
    explanation: '资料列出了单箱、拼装、堆叠、混合结构四类。'
  },
  {
    id: 21,
    type: 'single',
    category: '通用类',
    question: '楼梯扶手或护栏常推荐使用哪类玻璃？',
    options: ['A. 单层透明玻璃', 'B. 夹胶钢化双玻', 'C. 普通有机玻璃', 'D. 磨砂单玻'],
    answer: [1],
    explanation: '护栏、楼梯扶手常用夹胶钢化双玻。'
  },
  {
    id: 22,
    type: 'single',
    category: '通用类',
    question: '资料中认为最适合应急场景的产品通常是？',
    options: ['A. 快拼箱', 'B. Z型折叠箱', 'C. 拓展箱', 'D. 太空舱'],
    answer: [0],
    explanation: '快拼箱因运输灵活、安装便利、产能高而适合应急。'
  },
  {
    id: 23,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱安装拆卸的核心方式更接近哪种描述？',
    options: ['A. 全部现场焊接', 'B. 模块卡接与高强度螺丝连接', 'C. 整体吊装不可拆', 'D. 仅靠胶粘固定'],
    answer: [1],
    explanation: '快拼箱强调预设连接点、高强度螺丝和专利卡扣。'
  },
  {
    id: 24,
    type: 'multiple',
    category: '快拼箱',
    question: '以下哪些属于标准出口快拼箱材料清单中的项目？',
    options: ['A. 1150mm墙板15个', 'B. 1门2窗', 'C. 8个角件', 'D. 底次梁9根'],
    answer: [0, 1, 2, 3],
    explanation: '这些都在标准出口快拼箱材料清单内。'
  },
  {
    id: 25,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱的极限尺寸通常描述为？',
    options: ['A. 宽≤4.8m，长≤9m，高≤3.5m', 'B. 宽≤6.2m，长≤12m，高≤4m', 'C. 宽≤5m，长≤15m，高≤3m', 'D. 宽≤3m，长≤6m，高≤2.8m'],
    answer: [0],
    explanation: '资料给出的极限尺寸是宽不超过4.8m、长不超过9m、高不超过3.5m。'
  },
  {
    id: 26,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱标准地板材料一般是？',
    options: ['A. 纯实木地板', 'B. 水泥纤维板或玻镁板', 'C. 竹木地板', 'D. 仅能使用钢板'],
    answer: [1],
    explanation: '标准地板常用水泥纤维板或玻镁板。'
  },
  {
    id: 27,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱标准屋顶材料的典型三层结构是？',
    options: ['A. 彩钢板 + 木龙骨 + 石膏板', 'B. 盖顶板 + 50mm玻璃棉 + 980吊顶', 'C. 混凝土板 + 岩棉 + 铝板', 'D. 单层波纹钢板'],
    answer: [1],
    explanation: '资料给出了盖顶、防水保温层和980吊顶的三层组合。'
  },
  {
    id: 28,
    type: 'judge',
    category: '快拼箱',
    question: '快拼箱资料中常见指标为抗12级风、抗9级地震。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '快拼箱在资料中可达12级风、9级地震。'
  },
  {
    id: 29,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱排水方式通常有哪两种？',
    options: ['A. 喷淋排水和渗水排水', 'B. 自然排水和内排水', 'C. 外接泵排水和蓄水排水', 'D. 仅自然排水'],
    answer: [1],
    explanation: '资料明确提到自然排水和内排水两种方式。'
  },
  {
    id: 30,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱在外贸领域通常不把单箱长度做到超过12m，主要原因是？',
    options: ['A. 工厂设备限制', 'B. 需要适配40HQ海运货柜长度', 'C. 高度超限', 'D. 无法喷漆'],
    answer: [1],
    explanation: '主要是为了适应常见40HQ海运柜的运输经济性。'
  },
  {
    id: 31,
    type: 'single',
    category: '快拼箱',
    question: '哪类市场场景通常更适合推广快拼箱？',
    options: ['A. 人力成本高且预算充足的成熟市场', 'B. 预算有限、人力较低或设备难以进入的场景', 'C. 只做高端豪华民宿', 'D. 只能在寒带国家推广'],
    answer: [1],
    explanation: '快拼箱适合预算有限、人力较低、道路运输受限等场景。'
  },
  {
    id: 32,
    type: 'multiple',
    category: '快拼箱',
    question: '为减少孔洞缝隙进入小动物，资料中建议的做法包括哪些？',
    options: ['A. 使用塑料孔盖', 'B. 聚氨酯发泡填补', 'C. 外部做同色喷漆修饰', 'D. 直接拆掉角件'],
    answer: [0, 1, 2],
    explanation: '资料推荐孔盖、发泡填补和外部修饰，不会建议拆角件。'
  },
  {
    id: 33,
    type: 'single',
    category: '折叠箱',
    question: '腰部折叠箱常见地面和屋顶最大荷载分别是？',
    options: ['A. 地面150 kg/㎡，屋顶50 kg/㎡', 'B. 地面200 kg/㎡，屋顶60 kg/㎡', 'C. 地面300 kg/㎡，屋顶120 kg/㎡', 'D. 地面100 kg/㎡，屋顶30 kg/㎡'],
    answer: [0],
    explanation: '资料中腰部折叠箱地面150、屋顶50。'
  },
  {
    id: 34,
    type: 'single',
    category: '折叠箱',
    question: '以下哪组尺寸对应资料中的Z型与X型标准尺寸？',
    options: ['A. Z型5900×2500×2470，X型5900×2480×2530', 'B. Z型6000×3000×2800，X型5900×2500×2500', 'C. Z型5800×2400×2400，X型5800×2400×2500', 'D. Z型5900×2500×2530，X型5900×2480×2470'],
    answer: [0],
    explanation: '资料给出的标准尺寸正是这一组。'
  },
  {
    id: 35,
    type: 'single',
    category: '折叠箱',
    question: 'X型折叠箱的常见重量区间通常是？',
    options: ['A. 800-1000kg', 'B. 1100-1700kg', 'C. 1800-2500kg', 'D. 3000kg以上'],
    answer: [1],
    explanation: 'X型箱因配置不同，常在1100-1700kg之间。'
  },
  {
    id: 36,
    type: 'judge',
    category: '折叠箱',
    question: 'Z型折叠箱的长边和短边都可以做玻璃幕墙，但玻璃幕墙需与箱体分开打包运输。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '资料明确说明可做幕墙，但不建议和箱体一起折叠打包。'
  },
  {
    id: 37,
    type: 'single',
    category: '折叠箱',
    question: '一个40尺高柜，在Z型墙板75mm时常见装载量是多少？',
    options: ['A. 6套', 'B. 8套', 'C. 10套', 'D. 12套'],
    answer: [1],
    explanation: '75mm墙板的Z型箱通常为8套。'
  },
  {
    id: 38,
    type: 'multiple',
    category: '折叠箱',
    question: '以下哪些是Z型箱相对X型箱的典型优势？',
    options: ['A. 有内排水结构', 'B. 四周立柱主体框架更强', 'C. 气密性更好', 'D. 电路多为暗装'],
    answer: [0, 1, 2, 3],
    explanation: '资料从排水、框架、气密性和电路暗装多个角度强调了Z型优势。'
  },
  {
    id: 39,
    type: 'single',
    category: '折叠箱',
    question: '资料中通常将X型箱成本描述为约为Z型箱的多少？',
    options: ['A. 50%', 'B. 65%', 'C. 80%', 'D. 95%'],
    answer: [2],
    explanation: '资料中常用“X型约为Z型80%左右”来表达成本差异。'
  },
  {
    id: 40,
    type: 'single',
    category: '折叠箱',
    question: '如果客户所在地较寒冷，Z型折叠箱墙板优化建议更接近哪项？',
    options: ['A. 保持50mm EPS不变', 'B. 改用75mm或更厚PU，或改50mm岩棉/PU板', 'C. 只换更厚玻璃', 'D. 拆掉保温层减轻重量'],
    answer: [1],
    explanation: '资料建议加厚墙板，或更换为隔热更好的材料。'
  },
  {
    id: 41,
    type: 'single',
    category: '拓展箱',
    question: '关于拓展箱海运装柜，哪项说法正确？',
    options: ['A. 1个20GP可装1套40尺拓展箱', 'B. 1个40HQ可装1套40尺拓展箱或2套20尺拓展箱', 'C. 1个20GP可装2套20尺拓展箱', 'D. 拓展箱无法海运'],
    answer: [1],
    explanation: '资料写明40HQ可装1套40尺拓展或2套20尺拓展。'
  },
  {
    id: 42,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱主体框架与水电系统的常见质保范围分别是？',
    options: ['A. 主体5年，水电1年', 'B. 主体10年，水电3年', 'C. 主体15-25年，水电1-5年', 'D. 主体30年，水电10年'],
    answer: [2],
    explanation: '拓展箱主体一般15-25年，水电1-5年。'
  },
  {
    id: 43,
    type: 'judge',
    category: '拓展箱',
    question: '拓展箱侧面连接位置通常必须大量外露打胶，否则无法防水。',
    options: ['正确', '错误'],
    answer: [1],
    explanation: '资料中说明侧面不需要打胶，顶接缝处才需要打胶。'
  },
  {
    id: 44,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱放置安装时，对基础条件的描述更接近哪项？',
    options: ['A. 完全不需要垫高和基础', 'B. 至少四角垫高，地面承载力需约300kg/㎡', 'C. 必须全浇筑整板基础且不可误差', 'D. 只要地面是土就可以'],
    answer: [1],
    explanation: '资料强调四角垫高和地面承载力约300kg/㎡。'
  },
  {
    id: 45,
    type: 'single',
    category: '拓展箱',
    question: '资料中拓展箱和打包箱的抗风、抗震能力通常是？',
    options: ['A. 抗风8级，抗震6级', 'B. 抗风10级，抗震8级', 'C. 抗风12级，抗震9级', 'D. 抗风14级，抗震10级'],
    answer: [2],
    explanation: '资料中两者通常都可达抗风12级、抗震9级。'
  },
  {
    id: 46,
    type: 'multiple',
    category: '拓展箱',
    question: '拓展箱的拓展方式主要包括哪些？',
    options: ['A. 单侧拓展', 'B. 双侧拓展', 'C. 顶部拓展', 'D. 地下拓展'],
    answer: [0, 1, 2],
    explanation: '资料只提到单侧、双侧和顶部三种。'
  },
  {
    id: 47,
    type: 'single',
    category: '拓展箱',
    question: '关于拓展箱自产与外采的描述，哪项更准确？',
    options: ['A. 所有材料全部自产', 'B. 钢材为品牌国企外采，地板墙板主要由淮南工厂生产', 'C. 所有地板墙板都外采', 'D. 门窗和电器全部现场采购'],
    answer: [1],
    explanation: '钢材等原料外采，地板墙板等由自有工厂生产。'
  },
  {
    id: 48,
    type: 'judge',
    category: '拓展箱',
    question: '资料中认为拓展箱内墙板插销位置不会因为结构设计而轻易漏水。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '资料强调设计阶段已考虑合缝和试装质检。'
  },
  {
    id: 49,
    type: 'single',
    category: '拓展箱',
    question: '对拓展箱阳台做斜屋顶的建议通常是？',
    options: ['A. 不建议，必然增加漏水', 'B. 建议做，有利于排水、隔音和美观', 'C. 只能在室内做', 'D. 只允许在沙漠地区做'],
    answer: [1],
    explanation: '资料明确推荐做斜屋顶，强调排水、隔音和美观。'
  },
  {
    id: 50,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱顶部和墙板的常见厚度范围通常是？',
    options: ['A. 20-40mm', 'B. 30-60mm', 'C. 50-100mm', 'D. 100-150mm'],
    answer: [2],
    explanation: '资料给出的常见厚度范围为50-100mm。'
  },
  {
    id: 51,
    type: 'single',
    category: '拓展箱',
    question: '资料中常见的三种拓展箱规格对应的展开面积通常是？',
    options: ['A. 18㎡ / 28㎡ / 56㎡', 'B. 25㎡ / 36㎡ / 72㎡', 'C. 20㎡ / 40㎡ / 80㎡', 'D. 24㎡ / 32㎡ / 64㎡'],
    answer: [1],
    explanation: '资料中提到小双翼约25㎡、20尺约36㎡、40尺约72㎡。'
  },
  {
    id: 52,
    type: 'multiple',
    category: '拓展箱',
    question: '以下哪些属于资料中提到的拓展箱核心优势？',
    options: ['A. 折叠运输便于海运', 'B. 个性化定制空间大', 'C. 使用场景多样功能全', 'D. 只能做单一宿舍用途'],
    answer: [0, 1, 2],
    explanation: '资料强调运输、定制和多场景功能。'
  },
  {
    id: 53,
    type: 'single',
    category: '拓展箱',
    question: '标准海运情况下，拓展箱从下单到客户收到货的整体周期通常约为？',
    options: ['A. 7天内', 'B. 20天内', 'C. 2-3个月', 'D. 6个月以上'],
    answer: [2],
    explanation: '生产15-25个工作日加上海运30-40天，整体常约2-3个月。'
  },
  {
    id: 54,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱支撑腿常用材料与抗压强度的典型描述是？',
    options: ['A. 普通铝材，300kN', 'B. Q235钢，200kN', 'C. Q345B热镀锌钢材，600kN', 'D. 不锈钢板，1000kN'],
    answer: [2],
    explanation: '资料中给出Q345B高品质热镀锌钢材，抗压强度600kN。'
  },
  {
    id: 55,
    type: 'single',
    category: '太空舱',
    question: '关于太空舱用电数据，哪项更符合资料描述？',
    options: ['A. 最大功率2-4kW，日耗电5-8kWh', 'B. 最大功率7-12kW，按10小时计算综合用电约15-25kWh', 'C. 最大功率20kW以上，日耗电60kWh', 'D. 无法估算'],
    answer: [1],
    explanation: '资料给出最大功率7-12kW，按10小时计算约15-25kWh。'
  },
  {
    id: 56,
    type: 'single',
    category: '太空舱',
    question: '太空舱外观主体材料更接近哪项？',
    options: ['A. 普通彩钢板', 'B. 喷涂氟碳漆的建筑铝材', 'C. 木结构外墙', 'D. 裸露混凝土'],
    answer: [1],
    explanation: '资料明确写到外观为喷涂氟碳漆的建筑铝材。'
  },
  {
    id: 57,
    type: 'single',
    category: '太空舱',
    question: '太空舱主体框架和铝板厚度的典型范围通常是？',
    options: ['A. 主体1-2mm，铝板1mm', 'B. 主体2-3mm，铝板0.5-1mm', 'C. 主体4-6mm，铝板2-3mm', 'D. 主体10mm，铝板6mm'],
    answer: [2],
    explanation: '资料中框架4-6mm，铝板2-3mm。'
  },
  {
    id: 58,
    type: 'judge',
    category: '太空舱',
    question: '太空舱铝板和框架主体质保30年，玻璃及电器开关插座通常质保1-3年。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '这是资料中对太空舱质保的典型说法。'
  },
  {
    id: 59,
    type: 'single',
    category: '太空舱',
    question: '如果项目地区较冷，太空舱玻璃隔温升级建议通常是？',
    options: ['A. 继续使用单层玻璃', 'B. 使用一腔两玻即可', 'C. 升级为两腔三玻钢化玻璃', 'D. 去掉玻璃改彩钢'],
    answer: [2],
    explanation: '温差大地区资料建议升级两腔三玻。'
  },
  {
    id: 60,
    type: 'multiple',
    category: '太空舱',
    question: '以下哪些属于资料中提到的太空舱核心优势？',
    options: ['A. 工厂预制，最快24小时营业', 'B. 外形新颖，自带传播属性', 'C. 投资回收周期有机会控制在18-24个月', 'D. 可结合光伏与离网设计'],
    answer: [0, 1, 2, 3],
    explanation: '资料从交付速度、营销属性、回报率和离网能力多方面强调太空舱优势。'
  },
  {
    id: 61,
    type: 'multiple',
    category: '通用类',
    question: '在寒冷地区为减少箱体内墙面冷凝水，资料中建议可采取哪些措施？',
    options: ['A. 增加除湿或通风', 'B. 加厚墙板保温', 'C. 顶底和水管保温', 'D. 直接取消暖气使用'],
    answer: [0, 1, 2],
    explanation: '资料强调除湿通风和保温优化，不会建议取消正常取暖。'
  },
  {
    id: 62,
    type: 'single',
    category: '通用类',
    question: '资料中提到的箱体隔音能力可以做到相当于哪类酒店的隔音要求？',
    options: ['A. 经济型酒店', 'B. 三星级酒店', 'C. 四星或五星级酒店', 'D. 青旅宿舍'],
    answer: [2],
    explanation: '资料中将其类比为四星级或五星级酒店的隔音要求。'
  },
  {
    id: 63,
    type: 'multiple',
    category: '通用类',
    question: '如果判断客户项目真实、且客户条件合适，资料中提到可免费或酌情提供效果图的条件包括哪些？',
    options: ['A. 客户为核心决策人', 'B. 项目地址和开工计划清晰', 'C. 大型上市公司或央企等高质量客户', 'D. 任何陌生客户都默认免费'],
    answer: [0, 1, 2],
    explanation: '资料强调先确认项目真实性和客户质量，不是对所有客户默认免费。'
  },
  {
    id: 64,
    type: 'single',
    category: '通用类',
    question: '资料中常用来进行箱体稳定性结构计算的软件包括？',
    options: ['A. AutoCAD 和 SketchUp', 'B. PKPM 或 3D3S', 'C. Photoshop 和 Illustrator', 'D. SAP 仅一种'],
    answer: [1],
    explanation: '资料明确提到结构工程师会使用 PKPM 或 3D3S。'
  },
  {
    id: 65,
    type: 'judge',
    category: '通用类',
    question: '资料中提到产品在运输方面做过急刹车、颠簸、急转弯、撞击等极限检验。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '这是资料中关于运输稳定性保障的组成部分。'
  },
  {
    id: 66,
    type: 'multiple',
    category: '通用类',
    question: '针对重点客户来华面谈，资料中建议准备哪些销售工具包？',
    options: ['A. 最终图纸和报价书', 'B. 资质认证和检测报告', 'C. 项目推进计划表', 'D. 客户个人喜好和谈资备忘录'],
    answer: [0, 1, 2, 3],
    explanation: '资料把文件、进度、接待材料和客户偏好准备都列入工具包。'
  },
  {
    id: 67,
    type: 'multiple',
    category: '通用类',
    question: '资料中提到客户在谈判推进中最在意的动因包括哪些？',
    options: ['A. 信任', 'B. 态度和价值回馈', 'C. 职业化形象与细节', 'D. 只看最低报价'],
    answer: [0, 1, 2],
    explanation: '资料强调信任、态度和细节，不是简单只看最低价。'
  },
  {
    id: 68,
    type: 'multiple',
    category: '通用类',
    question: '要判断联系人是否为关键决策人，资料中建议关注哪些线索？',
    options: ['A. 回复是否快而明确', 'B. 是否有请示性动作', 'C. 公司背调看其与股权关系', 'D. 是否总是在深夜回消息'],
    answer: [0, 1, 2],
    explanation: '资料建议从沟通表现和公司背调中识别决策权。'
  },
  {
    id: 69,
    type: 'single',
    category: '通用类',
    question: '资料中提到，安装工人和监理可派到现场的项目量级大致是？',
    options: ['A. 50万级', 'B. 100万级以上', 'C. 300万级以上', 'D. 1000万级以上'],
    answer: [1],
    explanation: '资料中写到 100 万级别以上项目可派安装工人和监理到现场。'
  },
  {
    id: 70,
    type: 'single',
    category: '通用类',
    question: '普通插座对应的电线平方数通常是？',
    options: ['A. 1.5平方', 'B. 2.5平方', 'C. 4平方', 'D. 6平方'],
    answer: [1],
    explanation: '口诀“6421.5”里普通插座对应 2.5 平方。'
  },
  {
    id: 71,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱常被强调的一个优势是？',
    options: ['A. 必须使用大型吊装设备', 'B. 可免机械安装', 'C. 只能整体焊接运输', 'D. 只能做固定尺寸'],
    answer: [1],
    explanation: '资料中把“免机械安装”列为快拼箱优势之一。'
  },
  {
    id: 72,
    type: 'judge',
    category: '快拼箱',
    question: '快拼箱因采用散件发货，所以在大型设备无法通过的地方更容易运输到位。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '这是其适合应急和复杂道路场景的重要原因。'
  },
  {
    id: 73,
    type: 'single',
    category: '快拼箱',
    question: '快拼箱吊顶厚度如果想比 0.45 更厚，资料建议优先更换为哪类吊顶？',
    options: ['A. 980 吊顶继续加厚', 'B. 831 吊顶或 193 吊顶', 'C. 木吊顶', 'D. 石膏吊顶'],
    answer: [1],
    explanation: '资料建议更换为 831 或 193 吊顶。'
  },
  {
    id: 74,
    type: 'single',
    category: '折叠箱',
    question: '标准 Z 型箱常见门窗配置是？',
    options: ['A. 2门2窗', 'B. 1门1窗', 'C. 1门2窗', 'D. 2门4窗'],
    answer: [2],
    explanation: '资料写到标准 Z 型箱配置通常为 1 门 2 窗。'
  },
  {
    id: 75,
    type: 'judge',
    category: '折叠箱',
    question: 'Z 型箱门窗位置可以按项目需要进行调整、增减。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '资料明确说明门窗位置可以调整，也可以增加或减少。'
  },
  {
    id: 76,
    type: 'single',
    category: '折叠箱',
    question: '当 Z 型箱墙板做到 50mm 厚时，一个 40 尺高柜常见装载量是？',
    options: ['A. 8 套', 'B. 9 套', 'C. 10 套', 'D. 12 套'],
    answer: [2],
    explanation: '50mm 墙板的 Z 型箱通常可装 10 套。'
  },
  {
    id: 77,
    type: 'multiple',
    category: '折叠箱',
    question: 'Z 型箱在物流周转中的优势包括哪些？',
    options: ['A. 预制程度高', 'B. 整体框架门窗电路已预装', 'C. 运输中更稳定不易压垮侧翻', 'D. 上下货时间更短'],
    answer: [0, 1, 2, 3],
    explanation: '资料从预制程度和运输稳定性两方面强调 Z 型箱周转优势。'
  },
  {
    id: 78,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱墙板可选择的夹芯材质中，以下哪项在资料中被明确提到？',
    options: ['A. EPS 净化板', 'B. 石膏岩芯板', 'C. 纯铝蜂窝板', 'D. 木丝吸音板'],
    answer: [0],
    explanation: '资料中明确提到 EPS、岩棉、玻璃棉、硅岩、真金、聚氨酯、玻镁等材质。'
  },
  {
    id: 79,
    type: 'multiple',
    category: '拓展箱',
    question: '拓展箱外墙板常规可选颜色和纹理包括哪些？',
    options: ['A. 灰白/灰色', 'B. 平面木纹', 'C. 金属立体雕花板', 'D. 可按客户色卡定制'],
    answer: [0, 1, 2, 3],
    explanation: '资料中既列了常规色，也说明支持按色卡或样板定制。'
  },
  {
    id: 80,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱横向展开后，在资料中被描述为最宽大致可达到？',
    options: ['A. 4m', 'B. 5m', 'C. 6m', 'D. 8m'],
    answer: [2],
    explanation: '资料中将其描述为横向展开后可达到约 6m。'
  },
  {
    id: 81,
    type: 'judge',
    category: '拓展箱',
    question: '拓展箱防水设计强调胶条外露越多越好，便于后期观察。',
    options: ['正确', '错误'],
    answer: [1],
    explanation: '资料恰好相反，强调胶条隐藏在榫卯暗处以降低老化脱胶风险。'
  },
  {
    id: 82,
    type: 'single',
    category: '拓展箱',
    question: '标准卫浴内空尺寸在资料中的常见表述是？',
    options: ['A. 长 2150mm，宽 1360mm', 'B. 长 2000mm，宽 1000mm', 'C. 长 2400mm，宽 1500mm', 'D. 长 1800mm，宽 900mm'],
    answer: [0],
    explanation: '资料中常规标准卫浴内空尺寸为长 2150mm、宽 1360mm。'
  },
  {
    id: 83,
    type: 'multiple',
    category: '拓展箱',
    question: '资料中提到的拓展箱卫浴配置包括哪些？',
    options: ['A. 陶瓷坐式马桶', 'B. PVC 镜柜和洗手柜', 'C. 干湿分离铝合金+钢化玻璃推拉门', 'D. 石英石淋浴底座'],
    answer: [0, 1, 2, 3],
    explanation: '这些都属于资料中列出的卫浴配置。'
  },
  {
    id: 84,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱中间区域地板的典型材料和承重是？',
    options: ['A. 18mm 实木模板，150kg/㎡', 'B. 15mm 无石棉水泥纤维地板，200kg/㎡', 'C. 12mm 钢板，300kg/㎡', 'D. 15mm SPC 地板，100kg/㎡'],
    answer: [1],
    explanation: '资料中间区域地板是 15mm 无石棉水泥纤维地板，承重约 200kg/㎡。'
  },
  {
    id: 85,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱两侧拓展区域常用的地板材料是？',
    options: ['A. 18mm 实木清水建筑模板', 'B. 15mm 水泥纤维地板', 'C. 纯铝板', 'D. 陶瓷地砖'],
    answer: [0],
    explanation: '资料中两侧区域为了柔韧性，常用 18mm 实木清水建筑模板。'
  },
  {
    id: 86,
    type: 'multiple',
    category: '拓展箱',
    question: '在极端气候国家，资料中建议通过哪些方式提升拓展箱保温性能？',
    options: ['A. 增加人字斜顶遮阳保温', 'B. 增加地暖和更高功率冷暖设备', 'C. 墙板升级到 75mm 或 100mm 聚氨酯', 'D. 升级断桥门窗和三玻两腔 LOW-E 玻璃'],
    answer: [0, 1, 2, 3],
    explanation: '资料从顶部、墙板、地暖和门窗玻璃多个维度给出升级方案。'
  },
  {
    id: 87,
    type: 'single',
    category: '拓展箱',
    question: '针对强台风区域，资料中建议的顶部升级方案之一是？',
    options: ['A. 改成木屋顶', 'B. 升级为 1.2mm 盲波板', 'C. 去掉顶部减轻重量', 'D. 只增加窗帘'],
    answer: [1],
    explanation: '资料中明确建议顶部升级为 1.2mm 盲波板。'
  },
  {
    id: 88,
    type: 'single',
    category: '拓展箱',
    question: '20 尺拓展箱加装 15KW 光伏储能系统时，资料中的参考总价约为？',
    options: ['A. 29000 元', 'B. 49000 元', 'C. 69000 元', 'D. 99000 元'],
    answer: [2],
    explanation: '资料中给出的整体 15KW 光伏储能系统参考价约 69000 元。'
  },
  {
    id: 89,
    type: 'single',
    category: '拓展箱',
    question: '拓展箱长度和展开宽度的上限描述中，资料给出的典型值更接近哪项？',
    options: ['A. 长 9800mm，宽 5200mm', 'B. 长 11800mm，宽 6240mm', 'C. 长 12800mm，宽 7000mm', 'D. 长 6000mm，宽 3000mm'],
    answer: [1],
    explanation: '资料中给出的最大长度约 11800mm，宽度约 6240mm。'
  },
  {
    id: 90,
    type: 'judge',
    category: '拓展箱',
    question: '拓展箱支撑腿后续完全不需要检查和维护。',
    options: ['正确', '错误'],
    answer: [1],
    explanation: '资料中建议至少每年检查一次完整性，并做清洁和润滑保养。'
  },
  {
    id: 91,
    type: 'single',
    category: '太空舱',
    question: '资料中 9.5×3.3m 系列太空舱常配的空调是？',
    options: ['A. 一台 1 匹', 'B. 一台 1.5 匹', 'C. 一台 2 匹', 'D. 两台 3 匹'],
    answer: [2],
    explanation: '资料中 9.5×3.3m 系列通常配一台 2 匹空调。'
  },
  {
    id: 92,
    type: 'single',
    category: '太空舱',
    question: '资料中 11.5×3.3m 系列太空舱的常见空调组合是？',
    options: ['A. 一台 2 匹', 'B. 一台 1.5 匹', 'C. 一台 1.5 匹 + 一台 2 匹', 'D. 两台 3 匹'],
    answer: [2],
    explanation: '资料中写的是一台 1.5 匹加一台 2 匹。'
  },
  {
    id: 93,
    type: 'multiple',
    category: '太空舱',
    question: '关于太空舱外观维护，资料中提到的做法包括哪些？',
    options: ['A. 定期擦拭灰尘', 'B. 玻璃泛黄时用专业室外玻璃清洁剂', 'C. 清理灯带缝隙异物', 'D. 用四个底墩托起便于排水和检修'],
    answer: [0, 1, 2, 3],
    explanation: '这些都在资料的维护建议中出现。'
  },
  {
    id: 94,
    type: 'judge',
    category: '太空舱',
    question: '太空舱吊头工艺采用满焊，并通过结构计算保障长期多次吊装不易形变。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '资料中明确写到满焊工艺、加强钢板和力学计算。'
  },
  {
    id: 95,
    type: 'single',
    category: '太空舱',
    question: '当卸货地到舱体放置位置距离在 10-20 米时，资料中常建议使用的吊机吨位是？',
    options: ['A. 10 吨', 'B. 25 吨', 'C. 50 吨', 'D. 80 吨'],
    answer: [2],
    explanation: '资料中提到 10 米以内多用 25 吨，10-20 米则建议 50 吨。'
  },
  {
    id: 96,
    type: 'single',
    category: '太空舱',
    question: '太空舱如需改尺寸重新开模，资料中提到的小批量客户大致需承担多少开模成本？',
    options: ['A. 1-2 万', 'B. 3-4 万', 'C. 6-8 万', 'D. 10-12 万'],
    answer: [2],
    explanation: '资料中给出的重新开模成本参考约为 6-8 万。'
  },
  {
    id: 97,
    type: 'multiple',
    category: '太空舱',
    question: '在沙漠项目场景下，资料中提出的抗风沙与环境适应升级包括哪些？',
    options: ['A. 三层钢化并镀防刮膜的玻璃', 'B. 可拆卸地锚和加强立柱', 'C. 混凝土基座加耐旱固沙植物', 'D. 中空隔热层并使用耐 120℃ 板材'],
    answer: [0, 1, 2, 3],
    explanation: '这些都是资料中对沙漠场景给出的升级建议。'
  },
  {
    id: 98,
    type: 'single',
    category: '太空舱',
    question: '如果客户坚持在沙漠做双层结构，资料中提到的大致强化费用是？',
    options: ['A. 额外 5%', 'B. 额外 10%', 'C. 额外 20%', 'D. 额外 35%'],
    answer: [2],
    explanation: '资料中提到若坚持双层，需额外收取约 20% 强化费用。'
  },
  {
    id: 99,
    type: 'judge',
    category: '太空舱',
    question: '资料中更推荐沙漠项目采用单层联排组合，而不是勉强做双层。',
    options: ['正确', '错误'],
    answer: [0],
    explanation: '资料里把单层联排组合作为“更稳、成本更低”的推荐方案。'
  },
  {
    id: 100,
    type: 'single',
    category: '太空舱',
    question: '资料中提到太空舱最快可在吊装放置和水电对接后多快达到营业状态？',
    options: ['A. 8 小时', 'B. 24 小时', 'C. 3 天', 'D. 7 天'],
    answer: [1],
    explanation: '资料中强调最快 24 小时内即可达到营业状态。'
  },
  {
    id: 101,
    type: 'multiple',
    category: '通用类',
    question: '在破冰阶段，资料中建议优先了解客户哪些信息？',
    options: ['A. 项目所在地和应用场景', 'B. 采购数量和时间节点', 'C. 是否为决策人', 'D. 预算与竞争情况'],
    answer: [0, 1, 2, 3],
    explanation: '原文的销售方法部分强调项目、时间、决策权、预算等基础信息摸排。'
  },
  {
    id: 102,
    type: 'multiple',
    category: '通用类',
    question: '资料中常见的集装箱通用原材料维度包括哪些？',
    options: ['A. 彩钢板/夹芯板', 'B. 方管或型钢骨架', 'C. 地板材料', 'D. 门窗与玻璃系统'],
    answer: [0, 1, 2, 3],
    explanation: '原文在通用材料介绍里围绕板材、钢构、地板、门窗等核心部件展开。'
  },
  {
    id: 103,
    type: 'single',
    category: '通用类',
    question: '当客户想要免费效果图时，资料中的优先判断通常是什么？',
    options: ['A. 先确认客户是否是核心决策人及项目真实性', 'B. 直接发送全部图纸', 'C. 先让客户交全款', 'D. 先承诺永久免费修改'],
    answer: [0],
    explanation: '原文强调先判断决策权和项目真实性，再决定是否免费支持。'
  },
  {
    id: 104,
    type: 'multiple',
    category: '通用类',
    question: '资料中认为打造顾问式销售、建立专家形象的方法包括哪些？',
    options: ['A. 对产品参数和案例非常熟', 'B. 能做场景化方案推荐', 'C. 用专业资料和数据说话', 'D. 只反复压低价格'],
    answer: [0, 1, 2],
    explanation: '原文强调专业度、方案能力和证据链，而不是只打价格战。'
  },
  {
    id: 105,
    type: 'multiple',
    category: '通用类',
    question: '当客户被列为重点客户后，资料中建议最先推进的动作包括哪些？',
    options: ['A. 深挖项目真实信息', 'B. 提前准备定制方案和报价', 'C. 推进与关键决策人的连接', 'D. 完全停止跟进等待客户回复'],
    answer: [0, 1, 2],
    explanation: '原文的重点客户推进逻辑强调信息、方案和关键决策人。'
  },
  {
    id: 106,
    type: 'single',
    category: '通用类',
    question: '如果首次邀约后客户已读不回或总说没空，资料中的方向更接近哪项？',
    options: ['A. 立即放弃', 'B. 换时间点、换信息价值点持续推进', 'C. 公开指责客户不专业', 'D. 只发空白问候'],
    answer: [1],
    explanation: '原文建议调整节奏和内容，用价值信息重新打开沟通。'
  },
  {
    id: 107,
    type: 'single',
    category: '通用类',
    question: '资料中提到，20 尺拓展箱整套 15KW 光伏储能系统参考价约为多少？',
    options: ['A. 29000 元', 'B. 49000 元', 'C. 69000 元', 'D. 99000 元'],
    answer: [2],
    explanation: '原文给出的整套参考价约 69000 元。'
  },
  {
    id: 108,
    type: 'multiple',
    category: '通用类',
    question: '资料中概括的集装箱产品应用场景包括哪些？',
    options: ['A. 住宅和宿舍', 'B. 商铺与展厅', 'C. 办公与营地', 'D. 民宿酒店'],
    answer: [0, 1, 2, 3],
    explanation: '原文多处把住宅、商业、办公、营地、民宿等场景作为主应用方向。'
  },
  {
    id: 109,
    type: 'multiple',
    category: '通用类',
    question: '资料中提到的极端气候适应措施通常包括哪些？',
    options: ['A. 顶底保温和地暖保温', 'B. 水管保温与伴热带', 'C. 融雪装置', 'D. 高温地区搭配 T3/T4 空调'],
    answer: [0, 1, 2, 3],
    explanation: '原文明确列出寒冷和酷热地区的整套适应方案。'
  },
  {
    id: 110,
    type: 'multiple',
    category: '通用类',
    question: '关于售后处理流程，资料强调的方向包括哪些？',
    options: ['A. 先判断人为还是非人为因素', 'B. 提供图纸、视频或远程指导', 'C. 必要时安排配件和现场支持', 'D. 一律拒绝处理海外问题'],
    answer: [0, 1, 2],
    explanation: '原文售后逻辑是判断原因、远程支持、配件和必要现场协同。'
  },
  {
    id: 111,
    type: 'multiple',
    category: '通用类',
    question: '资料中提到帮助客户节省整体项目成本的方式包括哪些？',
    options: ['A. 提高装柜率与运输效率', 'B. 根据场景推荐更合适产品', 'C. 降低后期维护返修风险', 'D. 通过标准化减少施工时间'],
    answer: [0, 1, 2, 3],
    explanation: '原文成本节省并不只是降采购价，而是运输、施工、维护全链路优化。'
  },
  {
    id: 112,
    type: 'multiple',
    category: '通用类',
    question: '相比传统建筑，资料中认为模块化房屋长期投资回报率更高的原因包括哪些？',
    options: ['A. 建设周期更短', 'B. 资金回笼更快', 'C. 可重复利用或转运', 'D. 维护和改造更灵活'],
    answer: [0, 1, 2, 3],
    explanation: '原文从交付速度、回款、灵活性和重复利用角度解释 ROI。'
  },
  {
    id: 113,
    type: 'single',
    category: '通用类',
    question: '关于模块化房屋未来趋势，资料中的主方向更接近哪项？',
    options: ['A. 越来越标准化、智能化和绿色化', 'B. 完全退出旅游场景', 'C. 只剩低端临建市场', 'D. 彻底放弃定制能力'],
    answer: [0],
    explanation: '原文趋势判断围绕绿色、智能、标准化和多场景应用展开。'
  },
  {
    id: 114,
    type: 'multiple',
    category: '通用类',
    question: '二次运输吊装时，资料中对不同箱体的处理逻辑更接近哪项？',
    options: ['A. 有些产品可整体吊运', 'B. 有些需要恢复折叠或拆散状态', 'C. 需要结合箱体结构判断', 'D. 所有产品都一律不能再次运输'],
    answer: [0, 1, 2],
    explanation: '原文对此题的重点是不同产品结构不同，运输前处理方式也不同。'
  },
  {
    id: 115,
    type: 'multiple',
    category: '通用类',
    question: '如果客户第一次接触快拼箱且毫无行业知识，资料建议回复思路包括哪些？',
    options: ['A. 先讲清产品是什么', 'B. 先问应用场景和需求', 'C. 再给匹配案例和基础参数', 'D. 直接只报一个最低价'],
    answer: [0, 1, 2],
    explanation: '原文强调教育客户、需求确认和案例引导，而不是只报价格。'
  },
  {
    id: 116,
    type: 'single',
    category: '通用类',
    question: '关于代理合作，资料中的方向更接近哪项？',
    options: ['A. 可谈区域、产品线和折扣，但要看合作条件', 'B. 所有代理固定统一折扣且无条件', 'C. 只能销售单一产品', 'D. 代理不能获得任何支持'],
    answer: [0],
    explanation: '原文强调代理政策需结合区域、产品和合作深度具体沟通。'
  },
  {
    id: 117,
    type: 'multiple',
    category: '通用类',
    question: '资料中提到出口国家或地区需要特别注意的内容通常包括哪些？',
    options: ['A. 当地认证或准入要求', 'B. 气候和使用环境', 'C. 运输与清关限制', 'D. 文化习惯和政策风险'],
    answer: [0, 1, 2, 3],
    explanation: '原文对出口地区注意事项是合规、环境、物流和市场习惯的综合判断。'
  },
  {
    id: 118,
    type: 'single',
    category: '通用类',
    question: '彩涂板按国家最低标准时，资料中提到的最低镀锌克数是？',
    options: ['A. 40g/㎡', 'B. 60g/㎡', 'C. 80g/㎡', 'D. 120g/㎡'],
    answer: [2],
    explanation: '原文明确写到最低标准要达到 80g/㎡。'
  },
  {
    id: 119,
    type: 'single',
    category: '通用类',
    question: '建筑领域常用彩涂板镀锌克数区间，资料中更接近哪项？',
    options: ['A. 80-120g/㎡', 'B. 120-180g/㎡', 'C. 275-500g/㎡', 'D. 500-800g/㎡'],
    answer: [2],
    explanation: '原文写到建筑领域一般需要 275-500g/㎡。'
  },
  {
    id: 120,
    type: 'multiple',
    category: '通用类',
    question: '资料中列出的四大核心市场包括哪些？',
    options: ['A. 东南亚市场', 'B. 中亚五国及俄罗斯市场', 'C. 中东市场', 'D. 南美市场'],
    answer: [0, 1, 2, 3],
    explanation: '原文在市场分析题中明确列了这四大市场。'
  },
  {
    id: 121,
    type: 'multiple',
    category: '通用类',
    question: '资料中举例的同行企业包括哪些？',
    options: ['A. 河北锦乾', 'B. 安之捷', 'C. 河北金华', 'D. 中建八局'],
    answer: [0, 1, 2],
    explanation: '原文列举的同行对比是河北锦乾、安之捷、河北金华。'
  },
  {
    id: 122,
    type: 'single',
    category: '通用类',
    question: '如果客户希望给箱体地面加装饰，资料中更推荐的普通 PVC 方案是？',
    options: ['A. PVC 地板革', 'B. 普通纸面地胶', 'C. 木纹墙纸', 'D. 纯瓷砖'],
    answer: [0],
    explanation: '原文在 PVC 地板胶与地板革之间更推荐 PVC 地板革。'
  },
  {
    id: 123,
    type: 'single',
    category: '通用类',
    question: '若追求 0 甲醛和更环保，资料中更推荐哪类地面材料？',
    options: ['A. PVC 地板胶', 'B. PVC 地板革', 'C. 拼接式 SPC 地板', 'D. 普通地毯'],
    answer: [2],
    explanation: '原文中拼接式 SPC 地板被描述为可完全实现 0 甲醛。'
  },
  {
    id: 124,
    type: 'single',
    category: '通用类',
    question: '如果客户想给箱体或拓展箱加装太阳能，资料中的整套 15KW 光伏储能系统参考价约为多少？',
    options: ['A. 39000 元', 'B. 49000 元', 'C. 69000 元', 'D. 89000 元'],
    answer: [2],
    explanation: '原文在太阳能配置说明中给出的整体 15KW 光伏储能系统参考价约为 69000 元。'
  },
  {
    id: 125,
    type: 'multiple',
    category: '通用类',
    question: '关于玻镁板，资料中关注的核心成分维度包括哪些？',
    options: ['A. 氧化镁含量', 'B. 氯化镁含量', 'C. 无纺布层数与密度', 'D. 板材基础组成比例'],
    answer: [0, 1, 2, 3],
    explanation: '原文专门就玻镁板的氧化镁、氯化镁、无纺布层数和密度等参数进行提问。'
  }
];

globalThis.questions = questions;
