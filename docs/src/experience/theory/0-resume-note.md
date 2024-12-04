---
title: 简历知识点梳理
description: 简历知识点梳理
---

## 一、自我介绍

面试官你好！我叫靳高枫，17年本科毕业，至今已有7年前端开发经验。

我之前任职于B站，主要负责 HR 相关业务的开发，其中主导了B站考勤系统、OKR系统 从 0 到 1 的上线工作。个人对前端开发规范、项目工程化有自己的一些理解，同时也开发了一些效率提升工具，极大提升了团队整体开发效率与一致性。

面试咱们公司的前端开发工程师一职，主要是过往工作经历与职位要求比较相符，同时个人/对##行业也比较感兴趣，希望能获得此次机会，谢谢。

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

## 主导项目做了哪些事情

* 对接产品、设计、后端同学，协调解决业务痛点与技术难点
* 统筹组内人员分配，把控关键时间节点，保障项目交付率
* 功能开发，开发了##模块
* 技术难点攻关

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
* 公共 entity 封装
* 公共 dto 封装
* 分页封装
* 自定义拦截器

## charles代理实现

[企微 JS-SDK 验证、验证](../../summary-middle/library/wx-js-sdk-local-debugging.md)

## 离职原因

我之前所在的公司在组织架构上进行了多次调整，我所负责的 HR 相关部分业务线因策略调整出现了裁员情况。同时，我也希望能够接触新的技术和业务方向，进一步拓展自己的能力，因此选择了离职，希望找到一个可以持续成长并实现价值的机会。

## 对未来的规划

未来，我希望在夯实前端基础的同时，逐步向全栈方向拓展，深入学习后端技术，进一步参与业务逻辑的深度设计与优化，最终成长为一名兼具技术深度与广度的架构师，为团队和业务创造更大的价值。

## 对前端发展的看法

* 前端技术边界的不断扩展

* 前端工程化的统一

* 性能优化和用户体验的不断提升

* AI+，开发辅助，智能交互，低代码

## 对加班的看法

总的来说，我认为加班应该是偶发的，而不是常态。高效的时间管理和清晰的目标是避免加班的最好方法。但如果团队或项目需要，我愿意承担责任，配合完成任务，同时也希望能够帮助团队提升效率，形成良性循环。
