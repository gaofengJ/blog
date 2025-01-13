---
title: 简历知识点梳理
description: 简历知识点梳理
---

## 八股文
<!-- ---
title: 简历知识点梳理
description: 简历知识点梳理
---

## 一、自我介绍

面试官你好！我叫靳高枫，17年本科毕业，至今已有7年前端开发经验。

我之前任职于B站，主要负责 HR 相关业务的开发，其中主导了B站考勤系统、OKR系统 从 0 到 1 的上线工作。个人对前端开发规范、项目工程化有自己的一些理解，同时也开发了一些效率提升工具，帮助团队提升整体开发效率与开发一致性。

面试咱们公司的前端开发工程师一职，主要是个人/对##行业也比较感兴趣，希望能获得此次机会，谢谢。

## 项目难点 / 项目亮点 / 印象深刻的点

**swagger-to-ts**。

### 一、项目背景和目标

在前后端协作中，我们经常需要基于后端提供的 Swagger 文档手动编写 TypeScript 接口定义，这不仅繁琐耗时，还容易出错。而 `swagger-to-ts` 的目标是通过自动化工具，将 Swagger/OpenAPI JSON 文件直接转换为 TypeScript 类型文件，提升开发效率并保证类型定义的准确性。

### 二、核心功能描述

`swagger-to-ts` 的核心功能分为以下几个步骤：

1. 参数解析与配置生成

调用 `run` 方法时，首先解析用户传入的参数，包括 `Swagger` 文档路径、API 基础路径、自定义模板路径和输出路径等。解析后的参数会生成一个完整的配置对象，为后续流程提供依据。

2. 获取 Swagger 文档

实例化 `Swagger` 类，通过 fetch 请求获取 `Swagger JSON` 文档。过程中需要处理接口超时、格式异常等情况，确保文档数据的完整性。

3. 生成接口与类型定义文件

使用解析好的 `config` 和文档数据，实例化 `Generator` 类并调用其 `init` 方法。`init` 包含以下三个关键步骤：

* **parse**

  提取 Swagger 文档中的接口路径，生成两个复杂的描述对象：

  * 一个用于生成接口定义文件。

  * 一个用于生成类型定义文件。

  * 描述对象包括接口的核心信息，例如 namespace（命名空间）、summary（描述）、tags（分类）、name（方法名）、params（参数）、body（请求体）和 res（响应结果）等，确保每个接口信息完整且规范。

* **writeServices**

  根据接口描述对象和 Mustache 模板生成接口定义文件，并通过 Prettier 格式化后输出到指定路径，确保代码清晰规范。

* **writeTypes**

  基于类型描述对象和 Mustache 模板生成类型定义文件，同样经过 Prettier 格式化后输出。

### 三、成果

* 团队效率提升：每个接口平均节省了 5 分钟的手工定义时间，整体效率提升显著

* 接口一致性保障：前端和后端接口定义完全一致，减少了因接口变更导致的沟通和调试成本。

## **开发规范**做了哪些事情

和其他同学一起制定了前端开发规范，包括语法规范、命名规范、分支规范等，提供脚手架工具，集成 Husky、eslint、stylelint 等工具，从根本上推动项目规范的形成与落地。

## **流程规范**做了哪些事情

* 整理生产发布 checklist，规范发布流程，提高发布效率，降低上线风险
* 推动验收小组机制，几个业务线之间相互验收提测项目，减少测试环境问题，同时提高大家对其他业务线产品熟悉程度

## 效率工具产出

* **swagger-to-ts**

  重点项目已讲过

* **脚手架**

  [前端脚手架](../../summary-middle/engineering/cli.md)
  
* **组件库代码统计、目录生成脚本**

  组件库代码统计是一个 vscode 插件，可以统计

## van-swipe 与 calendar 具体实现

在项目中，我们通过 `van-swipe` 和自定义 `calendar` 组件结合，实现了一个可以左右滑动切换月份的交互功能。`van-swipe` 用于处理滑动手势，`calendar` 用于动态渲染对应月份的日历。

**核心实现：**

* 滑动切换逻辑：

  利用 `van-swipe` 的 index 变化监听用户滑动动作：

  * `index = 0`：切换到上一个月。
  * `index = 1`：保持当前月，不做额外操作。
  * `index = 2`：切换到下一个月。

* 月份更新与日历渲染：

  * 调用 `calendar` 组件的 `init` 方法，以目标月份的第一天作为基准重新渲染日历。
  * 使用辅助函数 `getPrevMonth` 和 `getNextMonth` 计算目标月份的前后两个月，获取这两个月的数据并渲染上下两屏。

* 滑动复位：

  * 每次完成滑动操作后，通过 `van-swipe` 的 `swipeTo` 方法将索引重置为中间屏（index = 1），确保交互的连续性。
  * 设置 immediate: true 取消动画效果，提升复位响应速度。

**难点与亮点：**

* **交互体验优化**

  * 滑动完成后复位索引，避免用户需要反复滑动校准位置。
  * 动态渲染日历，确保日历内容与滑动同步更新。

* **组件解耦**

  * `van-swipe` 负责滑动逻辑，自定义 `calendar` 专注于日历渲染，逻辑清晰，易于扩展。

```js
const handleSwipeChange = (index: number) => {
  if (index === 1) {
    // 当月
    return;
  }
  if (index === 0) {
    // 上一个月
    const [year, month] = getPrevMonth(params.value.startDate).split('-');
    calendarRef.value.init(`${year}-${month}-01`);
  }
  if (index === 2) {
    // 下一个月
    const [year, month] = getNextMonth(params.value.startDate).split('-');
    calendarRef.value.init(`${year}-${month}-01`);
  }
  renderCalendar();
  nextTick(() => {
    swipeRef.value.swipeTo(1, {
      // 让swipe回到中间屏 index置为1
      immediate: true, // 取消动画
    });
  });
};

/**
 * 渲染日历页
 * renderType：空代表重新渲染，prev代表上月，next代表下月
 */
const renderCalendar = async (): Promise<any> => {
  if (!calendarRef.value) return;
  arrangeItemLoading.value = true;
  // 获取当月第一天和最后一天
  params.value.startDate = getFirstDayOfMonth(
    calendarRef.value.year,
    calendarRef.value.month + 1,
  );
  params.value.endDate = getLastDayOfMonth(calendarRef.value.year, calendarRef.value.month + 1);
  // 初始化前后两个月
  const [prevMonthYear, prevMonthMonth] = getPrevMonth(params.value.startDate).split('-');
  calendarPrevRef.value.init(`${prevMonthYear}-${prevMonthMonth}-01`);
  const [nextMonthYear, nextMonthMonth] = getNextMonth(params.value.startDate).split('-');
  calendarNextRef.value.init(`${nextMonthYear}-${nextMonthMonth}-01`);
  await onLoad();
  arrangeItemLoading.value = false;
  onLoadPrev();
  onLoadNext();
};
```

## vxe-table

在管理端排班模块中，需要实现一个支持多员工排班的表格功能，由于数据量较大（可能包含上千条排班记录），传统表格组件在渲染时会导致页面卡顿，影响用户体验。为了解决这一问题，我引入了 Vxe-Table，并进行了针对性的配置优化。

**解决方案**

* 引入 Vxe-Table：

  * Vxe-Table 是一个高性能的表格组件，支持虚拟滚动、复杂表格布局、异步数据加载等功能，非常适合处理大数据量场景。

  * 表格的核心配置通过 gridOptions 实现，涵盖了显示、布局、样式和性能优化。

* 性能优化措施：

  * 虚拟滚动：

    * 使用 scrollX 和 scrollY 配置虚拟滚动，仅渲染当前可见区域的表格内容，避免一次性渲染所有数据。

    * 配置 gt: 0，启用横向和纵向滚动，提升大数据量的表格渲染性能。

  * 按需渲染：

    * 设置 showOverflow、showHeaderOverflow 和 showFooterOverflow 为 true，仅渲染当前需要显示的内容，防止 DOM 过载。
  
  * 异步加载：
  
    * 配合 loading 和 loadingConfig 实现数据加载时的状态提示，增强用户体验。
  
  * 分页控制：

    * 结合 paginationConfig，将数据分批加载（如每页 10 条），减少一次性渲染的数据量。
  
  * 功能扩展：

    * 动态样式：

      使用 cellClassName、headerCellClassName 和 footerCellClassName 实现样式的灵活定制，例如为不同列添加不同样式。

    * 表尾统计：

      配置 footerMethod 动态计算排班统计数据（如每个员工的总工时），增强模块功能性。

    * 空状态提示：

      设置 empty 提示信息，优化无数据情况下的用户体验。

  * 自定义行配置：

    * 通过 rowConfig 定义表格行的唯一标识字段（keyField）和高度（height），确保大数据渲染时行的样式一致且滚动流畅。

```js
const gridOptions = reactive({
  showOverflow: true, // 当内容过长时显示为省略号
  showHeaderOverflow: true,
  showFooterOverflow: true,
  showFooter: true,
  height: 'auto',
  border: 'inner',
  cellClassName: 'arrange-table-cell',
  headerCellClassName: 'arrange-table-header-cell',
  footerCellClassName: ({ columnIndex }) => `arrange-table-footer-cell arrange-table-footer-cell${columnIndex}`,
  loading: true,
  scrollX: {
    gt: 0,
  },
  scrollY: {
    gt: 0,
  },
  loadingConfig: {
    text: '加载中...',
  },
  empty: 'empty',
  rowConfig: {
    keyField: 'id',
    height: 64,
  },
  footerMethod() {
    return footerData.value;
  },
} as VxeGridProps);

const paginationConfig = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
```

## 自动保存方案的实现

在用户输入表单时，为了避免频繁触发保存操作和接口调用，采用 防抖机制，在用户停止输入一定时间后再触发保存事件。保存成功后，通过接口获取最新的 `version code` 并与前端保存的版本进行比对，如果发现版本不一致，提示用户数据已更新，用户点击确认后自动刷新页面以加载最新数据。

## vite 模板做了哪些改造

* **base**：基路径
* **resolve.alias**：别名
* **resolve.extensions**：要省略的扩展名
* **server.proxyt**：反向代理
* **assetsInlineLimit: 4096**： 图片转 base64 编码的阈值
* **Vue Components AutoImport**：自动导入 Vue 组件和生成 TypeScript 类型声明文件
* **AutoImport**：AutoImport 是一个用于自动导入模块和生成 TypeScript 类型声明文件的工具

## Nest项目中做了哪些事情

* 引入 ClsModule上下文
* env 变量的获取
* swagger 文档配置
* 返回结果 model 封装
* 装饰器 idParam 获取

  ```js
  import {
  HttpStatus,
  NotAcceptableException,
  Param,
  ParseIntPipe,
  } from '@nestjs/common';

  /**
  * @description 定义自定义装饰器函数 IdParam
  * @returns
  */
  export function IdParam() {
    return Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        exceptionFactory: () => {
          throw new NotAcceptableException('id 格式不正确');
        },
      }),
    );
  }
  ```

* 公共 entity 封装
* 公共 dto 封装
* 分页封装
* 自定义拦截器

## charles代理实现

[企微 JS-SDK 验证、验证](../../summary-middle/library/wx-js-sdk-local-debugging.md)

## 对前端发展的看法

* 前端技术边界的不断扩展

* 前端工程化的统一

* 性能优化和用户体验的不断提升

* AI+，开发辅助，智能交互，低代码

## 了解哪些前端的新技术

* 反 TypeScript
* Rust

  * Rust 是开发 WebAssembly 的理想语言之一，适用于需要高性能的前端场景。`WebAssembly`（简称 Wasm）是一种紧凑的二进制指令格式，可以在浏览器中运行接近原生性能的代码。它是由 W3C 提出的开放标准，旨在提升 Web 应用的性能，同时与 JavaScript 无缝协作。

  * 前端工具链开发

* Nestjs
* Rspack

  * Rspack 是一款由字节跳动开发的 高性能 Web 打包工具，由 rust 编写

* 低代码 / 无代码

  * 低代码  面向开发
  * 无代码  面向业务

* AI 大模型

## HR面问题

## **自我介绍**

面试官你好！我叫靳高枫，17年本科毕业，至今已有7年前端开发经验。

我之前任职于B站，主要负责 HR 相关业务的开发，其中主导了B站考勤系统、OKR系统 从 0 到 1 的上线工作。个人对前端开发规范、前端工程化有自己的一些理解，同时也开发了一些效率提升工具，帮助团队提升整体开发效率与开发一致性。

参加此次面试，主要是对字节的技术氛围和商业化广告业务很感兴趣，所以还是想再努力尝试一下。希望能获得此次机会，谢谢。

## **离职原因**

我之前是在B站的企业效率部，24年之前部门的重点方向是HR相关业务，今年组织架构调整之后，部门重心由HR业务转向了采购业务，我所在的 HR 业务线出现了裁员情况。同时，我也希望能够接触新的技术和业务方向，进一步拓展自己的能力，因此选择了离职。

## **介绍之前做的项目**

考勤系统。

22年之前，B站的假勤管理依赖于外采的“劳勤系统”与Flow审批系统，这套方案存在诸多痛点：比如公司假勤政策无法及时响应，员工缺少统一的入口进行假勤查看。基于以上原因，在22年初启动了考勤系统的自研工作。

考勤系统分为管理端和C端。

管理端分为假勤管理和劳勤管理。

假勤管理分为班次管理、考勤组管理、批量排班、假勤统计四部分。管理员可以设置班次，并通过设置考勤组的方式定位到每位员工。不定时工时制的部门负责人可以通过批量排班对每位同学进行排班管理。假勤统计则是方便leader统一查看。

考勤系统分为假期设置和假期统计。公司涉及的假期政策在这里统一配置，可以通过假期统计查看每位同学的假期情况。

C端分为假勤统计和假勤申请两部分。

B站同学可以在假勤统计中查看自己每天的打卡情况以及假勤统计情况，在假勤申请中进行各类假勤的申请。

该项目我从一开始就在跟进，基本上涉及到了各个业务模块的开发，还对管理端的批量排班和C端首页进行了多次优化，提高性能与体验。

考勤系统上线后，完美替代了外采系统，可以及时响应公司假勤政策变更，方便员工进行查看。先后覆盖员工8000+，日PV达2000+。

## **主导项目做了哪些事情**

* 对接产品、设计、后端同学，协调解决业务痛点与技术难点
* 统筹组内人员分配，把控关键时间节点，保障项目交付率
* 功能开发，开发了##模块
* 技术难点攻关

## **遇到压力最大的事情**

OKR项目

开发 OKR 项目时，我们面临了诸多挑战，OKR是我们新团队对业务方第一个交付的系统，交付时间紧张的同时对项目质量要求还很高。

面对这些问题，我首先梳理了所有模块，编写技术方案，对各个功能点进行拆分，设置单独的ddl。

正式开发之后，每天进行5分钟的站立会议，check 项目进度。

开发过程中定期进行CR，提测前对整个流程进行测试，确保提测质量。

最终圆满完成了此次交付任务，在此过程中也提升了自己的团队管理和沟通能力。

## **最失败的一次经历**

刚进公司时参与了绩效系统的开发，对业务理解不够深，在排期时过于自信设置了比较短的时间，最后虽然按时提测但是质量很差，bug数量很多。后来通过深入理解业务和开发流程规避了这一问题。

## **和之前几位面试官沟通感觉怎么样**

之前几位面试官都很专业，面试过程中也提出了一些发散性的问题，我从中也学到了不少东西。

## **觉得 B站/得物怎么样？为什么想加入字节？**

在我看来两者都是上海非常优秀的头部互联网公司，只是风格上存在差异。

B站整体节奏会慢一点，团队成员年轻化。
得物是非常务实的一家公司，干劲很足。

字节技术氛围和创新性强一些，引领整个行业的发展方向。

## 讲一个和产品沟通的案例

奖金方案详情整体大保存转分块保存。

## 如何处理工作中的压力

开发 OKR 项目时，9月底介入开发，10月中提测，10月底要进行第一次生产发布。压力非常大。

我首先梳理了所有模块，然后对各个功能点进行拆分，设置阶段性期限。

正式开发之后，每天进行5分钟的站立会议，check 项目进度。

开发过程中定期进行CR，提测前对整个流程进行测试，确保提测质量。

在整个过程中，我会使用滴答清单来列出自己每天的工作和check。压力过大时，会通过运动来释放一下压力和调整状态。

## 让你带领一个团队完成项目，你会怎么做

* 设定目标、时间节点
* 拆分目标
* 保持沟通

## 入职后的你如何开展工作

* 首先会与 +1 进行 one on ene，明确自己在团队的定位和职责，针对性的去开展工作

* 积极参与部门和公司组织的培训和各项活动，熟悉公司团队协作模式

* 尽快熟悉业务流程和工作内容，争取在短时间内为团队贡献自己的力量

## 让你负责一个项目，接到手你会做什么事

* 新项目

1. 明确需求与目标
2. 制定项目计划（技术方案 && 排期 && 第三方插件）
3. 技术选型 && 难点调研
4. 搭建项目（集成规范）
5. 功能开发（CR）
6. 提测 && 部署
7. 维护文档

* 老项目

1. 了解当前项目业务逻辑，熟悉代码
2. 功能开发
3. 问题排查与优化
4. 优化、重构（代码 && 规范 && 技术升级 && 第三方插件 && && 文档）

## 入职后发现不适合这个职位怎么做

既然选择加入公司，肯定是对公司有了解的。

首先复盘自己的工作表现和不适应的点，看看是技能的问题还是其他方面的原因。

如果是技能问题的话，会主动学习，补全自己的短板。

如果经过一段时间还是觉得不合适，会主动与 leader 进行沟通，寻求建议。

## 如果期望薪资达不到怎么办

薪资对我来首确实是一个重要的考虑因素。但是我对咱们公司的这个工作机会非常感兴趣，他在企业文化、发展前景方面都很有吸引力，所以相差不大的话我愿意考虑接受这个 offer，同时也希望在未来随着个人的工作表现和公司业绩提升，有机会重新评估薪资。

## **优点和缺点**

**优点：**

* 自驱性强

* 善于主动学习

* 性格好，沟通协调能力不错

**缺点：**

* 有时过于纠结细节，影响效率

* 开会效率有待提升

## **业余爱好**

篮球、羽毛球

## **职业生涯规划**

技术方面，希望在夯实前端基础的同时，继续在前端工程化方面继续钻研。业务方面，希望能够找到一块自己感兴趣的业务持续深入，在提高自己竞争力的同时，为公司作出更大的共贡献。

## **和前leader关系如何**

上下级和朋友关系都有。

## **入职时间**

希望尽快。3天以上。6号、13号、30号

## **期望薪资**

年包基础上30%

## **对岗位的了解**

商业化广告业务主要是依托于抖音的一个B端商户平台，支持商户进行广告的管理、投放、策略、优化等。在字节的整体营收中占比很高。

## **对加班的看法**

总的来说，我认为加班应该是偶发的，而不是常态。高效的时间管理和清晰的目标是避免加班的最好方法。但如果团队或项目需要，我愿意承担责任，配合完成任务，同时也希望能够帮助团队提升效率，形成良性循环。

## **如何面对自己的失败**

首先是通过一些释放压力的方式使自己尽快从失败中走出来，然后找时间仔细复盘，发现问题。

## **希望与什么上级共事**

有想法，执行力强

## **反问环节**

* 目前商业化团队需要的优秀人才是怎样的

* 晋升机制 -->
