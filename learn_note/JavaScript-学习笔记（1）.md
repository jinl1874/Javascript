---
title: JavaScript 学习笔记（1）：准备
date: 2020-07-03 20:35:47
tags:
  - js
categories:
  - [JavaScript]
---

#### 1. 准备

1. 文本编辑器：VSCode
   去(官网)[https://code.visualstudio.com/]下载 vscode，安装时一路点 next，最后在应用商店选择下载一个 javascript 的插件，需要中文界面的话可以搜索安装"Chinese"插件。
2. 浏览器：Firefox 浏览器（或者 Chrome）。

3. js 的位置：Html 的文档里的`<script>`标签里，或者是别起一个后缀名为".js"的文件，再在`<script>`标签的`src`属性引用它。
   ```html
   <script src="example.js"></script>
   ```

#### 2. 语法

1. 语句结尾不需加上分号，但建议在末尾加上分号，这是一种良好的习惯。
2. 注释：
   - 单句的注释是在语句前加上`//`，如`// console.log("Test");`；
   - 一段代码的注释是在代码前加上`/*`，在代码后加上 `/*`，如：
   ```js
   /*
   alert("document");
   console.log("Daoli");
   */
   ```
3. 变量（variable）

   - 变量不需要提前声明，不过提前声明是个良好的编程习惯。下面的语句是声明。

   ```js
   var num;
   ```

   亦可直接声明赋值

   ```js
   var num = 1;
   ```

   - 变量区分大小写；
   - 变量名不允许包含空格或标点符号（除了美元符号`$`）。

4. 数据类型

   - js 是一种弱类型语言，可以在任何时候改变变量的数据类型。

   ```js
   var num = 1;
   num = "jinl";
   ```

   - 字符串：由零个或多个字符构成，字符包括但不限于字母、数字、标点符号和空格，字符串必需包括在引号里；
   - 数值：数值不限于是整数，js 可以使用带小数点的数值；
   - 布尔值：只有两种取值：`true` 或者 `false`。

5. 数组

   - 声明：可选给定数组的长度；

   ```js
   var array_0 = Array(4);
   var array_1 = Array();
   ```

   - 赋值：直接`array_0[index] = "str"`,或者：`var array_0 = new("str1", "str2", "str3", "str4")`；
   -

6. 对象

   - 与数组类似，对象也使用一个名字表示一组值。每个值是对象的一个属性。前面代表键，冒号后面代表值。
   - 创建方法：使用花括号语法：

   ```js
   test_obj = {
     name: "apple",
     year: 1999,
     eat_or_not: true,
   };
   ```

   访问属性：取对象里的键。

   ```js
   var name = test_obj("name");
   ```
