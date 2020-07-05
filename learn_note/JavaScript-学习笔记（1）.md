#! https://zhuanlan.zhihu.com/p/156178542
![Image](https://pic4.zhimg.com/80/v2-857bee96d74bfdb6dd3fd42ddb7768f0.jpg)

# JavaScript 学习笔记（1）：基本语法

#### 1. 准备

1. 文本编辑器：VSCode
   去(官网)[https://code.visualstudio.com/]下载 vscode，安装时一路点 next，最后在应用商店选择下载一个 javascript 的插件，需要中文界面的话可以搜索安装"Chinese"插件。
2. 浏览器：Firefox 浏览器（或者 Chrome）。

3. js 的位置：Html 的文档里的`<script>`标签里，或者是别起一个后缀名为".js"的文件，再在`<script>`标签的`src`属性引用它。
   ```html
   <script src="example.js"></script>
   ```
4. 运行，打开浏览器的开发者模式，进入控制台，然后把代码放在输入框中，再点上面的`运行`即可运行代码，如图所示。
   ![Image](https://pic4.zhimg.com/80/v2-6e5927f48e6c9f6eaac9ad93d2fa8767.png)

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

#### 3. 操作

1. 加减乘除的符咒分别是`+-*/`，用法与其它的语言一样。
2. 可以使用`i++`以用`i += 1`这种方式。
3. js 的`+`可以将字符串与数值相连接，连接后是一个更长的字符串，如
   ```js
   var str = "101" + 11;
   // str === "10111"
   ```

#### 4. 条件语句

1. 与 C 语的中的用法一致，基本语法为：
   ```js
   if (condition) {
     statement;
   }
   ```
2. 比较操作符包括：大于(`>`)、小于(`<`)、大于等于(`>=`)、小于等于(`<=`)以及等于(`==`)与不等于(`!=`)。
   其中要注意的是`==`不表示一定相等，比如下面的例子中，`a`与`b`是相等的。

   ```js
   var a = false;
   var b = "";

   if (a == b) {
     alert("true");
   }
   ```

   这个时候就需要另一种等号(`===`)，这个等号会进行严格的比较，同理，不相等要比较需要使用(`!==`)来比较。
   我个人的建议是，一律使用`===`与`!==`。

3. 逻辑操作符
   与`&&`，或`||`，非`！`。

#### 5. 循环

1. while 循环。
   ```js
   while(condition){
      statement；
   }
   ```
2. do-while 循环。
   ```js
   do {
     statement;
   } while (condition);
   ```
3. for 循环
   ```js
   for (initial condition; test condition; alter condition) {
       statement;
   }
   ```
   实例：
   ```js
   for (let index = 0; index < 10; index++) {
     console.log(index);
   }
   ```

#### 6. 函数

1. 定义示例函数：
   ```js
   // test是函数名，params是参数，true是返回值。
   function test(params) {
     alert(params);
     return true;
   }
   ```
2. 调用示例：
   ```js
   bool = test("Test!");
   ```
3. 变量作用域：如果函数内使用了 var 对象，那么就被视为局部变量，否则为全局变量。

#### 7. 对象

1. 对象是自包含的数据集合，包含在对象的数组可以通过属性(property)和方法(method)来访问。
   js 里，属性和方法都使用“点”语法来访问。
   ```js
   object.property;
   object.method();
   ```
2. 内建对象：一般使用`new`的关键字去新建一个对象的实例。如新建一个数组对象：

   ```js
   var array = new Array();
   ```

> 欢迎访问我的个人[博客](https://jinl1874.xyz)
