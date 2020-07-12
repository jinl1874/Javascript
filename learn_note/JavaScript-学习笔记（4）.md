#! https://zhuanlan.zhihu.com/p/158627969
![Image](https://pic4.zhimg.com/80/v2-9f92869c4a82962c83d562e6b3f4bcd6.jpg)

# JavaScript-学习笔记（4）：实践

### 平衡退化

#### 1. 定义

1. 定义：网站的访问者有可能使用不支持 js 的浏览器（虽说现在应该没有了），又或者是禁止网页使用 js（因为弹窗广告），所以需要在浏览器不支持 js 的情况下浏览网站，这就是平稳退化（graceful degradation）。
2. 例子：新窗口打开一个链接，许多电子商务网站的结算页面都有指向服务条款的链接，与其让用户手动点击打开，不如自动打开一个新窗口来显示相关信息。
   js 使用 window 对象的`open()`方法来创建新的浏览器窗口。使用：
   ```js
   // url 表示要打开的链接，name 表示是新窗口的名字，方便js调用，features 表示的是新窗口的属性。
   window.open(url, name, features);
   ```
3. 具体应用：

   ```js
   function pop_up(url) {
     window.open(url, "pop_up", "weight=300, height=400");
   }
   ```

   函数不会对网页的访问有任何影响，影响到网页的只有：如何使用此函数。可以使用伪协议（pseudo-protocol)。

#### 2. 伪协议

1. 真协议用来在计算机之间传输数据包，如 HTTP 协议。伪协议使用非标准化协议，可以通过一个链接来调用 js 函数。
2. 用法：
   ```js
   <a href='javascript:pop_up("https://zhihu.com");'>知乎网</a>
   ```
3. 内嵌的事件处理函数的具体应用：
   ```html
   <a href="#" onclick="pop_up('https://zhihu.com'); return false;">
     知乎网
   </a>
   ```
4. 上述代码同样无法平稳退化。要使得平稳退化，须得在 a 标签的 href 属性加上 url 链接。具体如下：

   ```html
   <a
     href="https://zhihu.com"
     onclick="pop_up('https://zhihu.com'); return false;"
   >
     知乎网
   </a>
   ```

   简化一下：

   ```html
   <a
     href="https://zhihu.com"
     onclick="pop_up(this.getAttribute('href')); return false;"
   >
     知乎网
   </a>
   ```

   更简明的引用方法————`this.href`：

   ```html
   <a href="https://zhihu.com" onclick="pop_up(this.href); return false;">
     知乎网
   </a>
   ```

### 分离 JavaScript

#### 1. 分离

1. 使用类似于 CSS 的方法，比如使用下面这个语句来表明“当这个链接点击时，也可以调用`pop_up`函数”。

   ```html
   <a href="https://zhihu.com" class="pop_up">知乎网</a>
   ```

   js 语言不强制事件必须在 HTML 文档上处理，因此可以在外部把事件添加到某个元素上。

   ```js
   element.event = action;
   ```

   可以使用 id 或者 className 或者 TagName 来确定元素，比如：

   ```js
   getElementById(id).event = action;
   ```

   涉及多个元素时，可以用`getElementByTagName`以及`getAttribute`把事件添加到特定属性的元素上。
   具体操作为：

   - 先用使用`getElementByTagName`获取元素数组。
   - 遍历数组。
   - 再根据属性值`class==pop_up`筛选出那个元素。
   - 把这个链接的`href`属性值传递给`pop_up()`函数。
   - 取消这个链接的默认行为。

   具体代码为：

   ```js
   var links = document.getElementsByTagName("a");
   for (var i = 0; i < links.length; i++) {
     if (links[i].getAttribute("class") === "pop_up") {
       links[i].onclick = function () {
         pop_up(this.getAttribute("href"));
         return false;
       };
     }
   }
   ```

   只要把上述代码存入一个外部 js 文件，就等于把这些操作从 html 分离出来了。

2. 上述代码存入外部文件后，会无法正常运行。
   因为这个语句的第一语使用了 document 这个对象，js 文件加载的时候文档可能会不完整。所以要等文档全部加载后才能运行，这时可以使用 window.onload 函数，当触发这个函数时，document 对象已经存在。
   所以最终代码为：

   ```js
   window.onload = prepareLinks;
   function prepareLinks() {
     var links = document.getElementsByTagName("a");
     for (var i = 0; i < links.length; i++) {
       if (links[i].getAttribute("class") === "pop_up") {
         links[i].onclick = function () {
           pop_up(this.getAttribute("href"));
           return false;
         };
       }
     }
   }
   ```

### 向后兼容

    某些支持js脚本的古老浏览器，也不一定能正常工作。

#### 1. 对象检测(object detection)

1. js 万物皆是对象，所以只要判断是否有对应的对象存在即可。
2. 根据条件表达的求值结果，使用`if`语句来决定应该执行什么操作。

   ```js
   if (method) {
     statements;
   }
   ```

   例如，有一个使用了`getElementById()`方法的函数，就可以在调用前检查浏览器是否支持这个函数。使用对象检测时，要删掉方法名后面的括号，如果不删掉，测试的是方法的结果，无论方法存不存在。

   ```js
   function(){
    if(document.getElementById){
      statements using getElementById;
    }
   }
   ```

   如果浏览器不支持方法的话，那么将永远无法调用。

3. 上面使用的方法有一个不足之处是，会增加花括号，多了以后会导致代码阅读困难。
   改进方法是换一种方式。改为“当不支持这个方法是，就结束”。具体代码为：

   ```js
   if (!getElementById) {
     return false;
   }
   ```

4. 所以在把 onclick 事件加到链接时，可以加一 if 语来判断浏览器是否支持。
   ```js
   window.onload = prepareLinks;
   function prepareLinks() {
     if (!document.getElementsByTagName) return false;
     var links = document.getElementsByTagName("a");
     for (var i = 0; i < links.length; i++) {
       if (links[i].getAttribute("class") === "pop_up") {
         links[i].onclick = function () {
           pop_up(this.getAttribute("href"));
           return false;
         };
       }
     }
   }
   ```

#### 2. 嗅探技术

1. 定义：指通过提取浏览器供应商提供的信息来解决向后兼容的问题。
2. 理论上可行，不过随着浏览器的发展，这种技术已经被淘汰了。

### 性能考虑

#### 1. 少访问 DOM 和减少标记

1. 以下面的代码为例

   ```js
   if(document.getElementsByTagName("a")){
     var links = document.getElementsByTagName("a");
     for (var i=0; i <links.length; i++){
       statements......
     }
   }
   ```

   上面的代码可以运行，但相同的操作重复了两次，浪费了性能，所以可以进行优化一下。

   ```js
   links = document.getElementsByTagName("a");
   if (links.length > 0){
     for (var i=0; i<links.length; i++){
       statements......
     }
   }
   ```

#### 2. 合并和放置脚本

1. 包含脚本的方式是使用外部文件，而不是包在`<script>`里。并且可以把 funtionA.js、funtionB.js 和 futntionC.js 合并到同一个文件，这样就可以减少加载页面时发送的请求。
2. 把脚本放在`<head>`标签会有一个问题，位于`<head>`块中的脚本会导致浏览器无法并行加载其它文件（如图像和其它脚本）。
3. 把`<script>`标签都放在文档的末尾，`</body>`的标记之前，可以使页面变得更快。

#### 3. 压缩脚本

1. 定义：把脚本中不必要的字节，如空格和注释，统统删除，从而达到压缩文件的目的。有的甚至会重写部分代码，使用更短的变量名等。
2. 精简后的代码很难看懂，却能减少文件大小，很多情况下，应该有两版本，一个是工作副本，可以修改并添加注释，一个是精简副本，用于放在站点上。为了区分，一般会在精简版本的文件名上加上 min 字符。
3. 代码压缩工具：
   - Douglas Crockford 的 JSMin <http://www.crockford.com/javascript/jsmin.html>;
   - 雅虎的 YUI compressor <http://developer.yahoo.com/yui/compressor>
   - 谷歌的 Closure Compiler <http://closure-compiler.appspot.com/home>

几个 DOM 脚本编辑工作相关的概念和实践：

- 平稳退化
- 分离 Javascript
- 向后兼容
- 性能考虑

> 欢迎访问我的个人[博客](https://jinl1874.xyz)
