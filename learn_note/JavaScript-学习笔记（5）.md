#! https://zhuanlan.zhihu.com/p/158981101
![Image](https://pic4.zhimg.com/80/v2-c2ae8e85af1b13b5afd2afca908bbb28.jpg)

# JavaScript-学习笔记（5）：改进图片库

审视一下之前的图片库，思考一下：

#### 支持平稳退化？

1. 当 js 被禁用后，用户点击链接时会自动调动原来 a 标签的方法，同样可以查看所有的图片，网页的基本功能没有受到损害。

2. 使用伪协仪的话就没戏了。

#### js 与 html 标记分离吗？

1. 不分离，`onclick`事件直接插在标记文档里。
   ```html
   <li>
     <a
       onclick="show_pic(this); return false;"
       href="images/dog.jpg"
       title="a dog east something"
     >
       dog
     </a>
   </li>
   ```
2. 为了让浏览器知道与哪些链接有着不一样的行为，可以添加一个`class`属性：

   ```html
   <li>
     <a href="images/dog.jpg" class="gallerypic" title="a dog east something">
       dog
     </a>
   </li>
   ```

   但是这种方法太麻烦了，可以直接给整个清单设置一个 ID。

   ```html
   <ul id="image_gallery">
     <li>
       <a href="images/dog.jpg" title="a dog east something"> dog </a>
     </li>
     <li>
       <a href="images/follower.jpg" title="a follower ">follower</a>
     </li>
     <li>
       <a href="images/part.jpg" title="a part here">part</a>
     </li>
     <li>
       <a href="images/sea.jpg" title="the sea ">sea</a>
     </li>
     <li>
       <a href="images/star.jpg" title="water star">star</a>
     </li>
   </ul>
   ```

   只有一个“挂钩”，但是也足够了。

3. 添加事件处理函数
   具体操作：

   - 检查是否支持`getElementsByTagName`和`getElementById`；
   - 检查是否存在有`id=image_gallery`的元素；
   - 遍历`image_gallery`的所有链接；
   - 设置 `onclick` 事件，让其关联操作：

     - 将这个链接作为参数传递给`show_pic`函数；
     - 取消链接被点击时的默认行为，不让浏览打开该链接。

   具体代码：

   ```js
   function prepare_gallery() {
     if (!(document.getElementsByTagName || document.getElementById))
       return false;
     var gallery = document.getElementById("image_gallery");
     if (!gallery) return false;
     links = gallery.getElementsByTagName("a");
     for (var i = 0; i < links.length; i++) {
       links[i].onclick = function () {
         // 把整个link元素传进去
         show_pic(this);
         return false;
       };
     }
   }
   ```

4. 共享 onload
   当有多个函数需要 onload 时使用，那么可以创建一个匿名函数来绑定指令。
   ```js
   window.onload = function () {
     first_function();
     second_function();
   };
   ```
   这是最简单的处理方式，还有一个弹性最佳的解决方案。这个方案需要写一点代码，但一不旦有了那些代码，把函数绑定到`window.onload`事件就行了。
   这个函数名是`addLoadEvent`，要完成的操作有：
   - 把现在的`window.load`事件处理函数的值存入变量`oldonload`。
   - 如果处理函数还没有绑定函数，就像平时那样把新函数添加给它。
   - 如果已经绑定了函数，就把新函数追加到现有指令的末尾。
     具体代码：
   ```js
   function addLoadEvent(func) {
     var oldonload = window.onload;
     if (typeof window.onload != "function") {
       window.onload = func;
     } else {
       window.onload = function () {
         oldonload();
         func();
       };
     }
   }
   ```
   如果需要把函数加到队列里去，只需写以下代码：
   ```js
   addLoadEvent(first_function);
   addLoadEvent(second_function);
   ```

#### 不要做太多的假设

1. 检查元素是否存在

   ```js
   if (!document.getElementById("placeholder")) return false;
   // 如果 id为 `description`存在，那么执行修改文字，否则忽略
   if (document.getElementById("description")) {
     // 获取title属性
     var title = whic_pic.getAttribute("title");
     // 获取p结点
     var p_element = document.getElementById("description");
     // 将p元素赋值给nodeValue
     p_element.firstChild.nodeValue = title;
   }
   ```

   全部代码为：

   ```js
   function show_pic(whic_pic) {
     if (!document.getElementById("default")) return false;
     // 获取 href 属性
     var source = whic_pic.getAttribute("href");
     // 获取默认结点
     var placeholder = document.getElementById("default");
     // 如果 id为 `description`存在，那么执行修改文字，否则忽略
     if (document.getElementById("description")) {
       // 设置属性
       placeholder.setAttribute("src", source);
       // 获取 title 属性
       var title = whic_pic.getAttribute("title");
       // 获取 p 结点
       var p_element = document.getElementById("description");
       // 将 p 元素赋值给 nodeValue
       p_element.firstChild.nodeValue = title;
     }
     return true;
   }
   ```

   改进后即使不存在要找的元素，也不会发生错误。

2. 如果 palceholder 图片在文档中删去，并在浏览器刷新页面，就会出现无论点击哪个链接，都没有任何响应。
   因为 prepare_gallery 函数取消了 onclick 事件的默认行为。其实是否要返回一个 false 用来取消默认行为，应该由 show_pic 函数决定。show_pic 返回两个可值的值。
   - 如果切换图片成功，返回 true；
   - 否则，返回 false。
     为了修正该问题，应该在返回前验证返回值，来决定是否阻止默认行为，如果返回 true，则更新。可以利用`!`来对 show_pic 的返回值取反。
   ```js
   links[i].onclick = function () {
     return !show_pic(this);
   };
   ```
   如果 show_pic 返回 true，那么就返回 false，浏览器会取消默认行为；
   如果返回 false，那就返回 true，浏览器会使用 onclick 的默认行为。
   所以最终代码为：
   ```js
   function prepare_gallery() {
     if (!(document.getElementsByTagName || document.getElementById))
       return false;
     var gallery = document.getElementById("image_gallery");
     if (!gallery) return false;
     links = gallery.getElementsByTagName("a");
     for (var i = 0; i < links.length; i++) {
       links[i].onclick = function () {
         return !show_pic(this);
       };
     }
   }
   ```

#### 优化

1. 检查 title 属性

   ```js
   var text = which_pic.getAttribute("title");
   ```

   为了检查 title 属性是否真的存在，可以测试是否为 null。当不存在时，可以设置为空字符

   ```js
   if (which_pic.getAttribute("title")) {
     var text = which_pic.getAttribute("title");
   } else {
     var text = "";
   }
   ```

   完成同一操作的其它方法：

   ```js
   var text = which_pic.getAttribute("title")
     ? which_pic.getAttribute("title")
     : "";
   ```

   上面的`?`是一个三元操作符（ternary operator）。问号的后面是`text`的两种取值可能，如果`which_pic.getAttribute("title")`的返回值不为空，那么将其赋给`text`；如果返回值为空值，那么`text`将被赋为第二个值。
   三元操作符是`if/else`的一种变形体，比较简短，逻辑表达不怎么明显，不习惯的话可以用回`if/else`表达式。

2. 增加了几项检查，函数的代码也变多了。实际工作中，需要自己决定是否真的需要检查，它们针对的是 HTML 文档有可能不在你控制范围内的情况。理想情况下，应该不需要对 HTML 文档做太多的假设。

#### 键盘访问

1. `prepare_gallery()`的核心代码：

   ```js
   links[i].onclick = function () {
     return !show_pic(this);
   };
   ```

   也可以使用三元操作符：

   ```js
   links[i].onclick = function () {
     return show_pic(this) ? false : true;
   };
   ```

   用鼠标点击时是没有任何问题的，但是用键盘来的话就不一定了。
   使用 tab 键是可以移动链接的，再按回车键就可以启用当前链接。
   使用`onkeypress`来处理键盘事件，按下键盘的按键会触发该事件。复制一份指令即可。

   ```js
   links[i].onclick = function () {
     return show_pic(this) ? false : true;
   };
   links[i].onkeypress = function () {
     return show_pic(this) ? false : true;
   };
   ```

   更简单的方法：

   ```js
   links[i].onclick = function () {
     return show_pic(this) ? false : true;
   };
   // js函数之间是可以赋值的
   links[i].onkeypress = links[i].onclick;
   ```

2. 这就是 js 和 html 分离带来的好处
   把所有的函数和事件都放在了外部文件，只需要修改 js 代码，而不用去修改 html 代码。

3. onkeypress 的问题
   在某些浏览器里，按 Tag 键都会触发该函数，现在应该没有这种奇怪的浏览器了。
   最好不要使用`onkeypress`事件处理函数，`onclick`事件处理已经能满足要求，对键盘的支持也相当完美。
   最终代码：

   ```js
   function show_pic(whic_pic) {
     if (!document.getElementById("default")) return false;
     // 获取 href 属性
     var source = whic_pic.getAttribute("href");
     // 获取默认结点
     var placeholder = document.getElementById("default");
     // 设置属性
     // 如果 id为 `description`存在，那么执行修改文字，否则忽略
     if (document.getElementById("description")) {
       placeholder.setAttribute("src", source);
       // 获取 title 属性
       var title = whic_pic.getAttribute("title");
       // 获取 p 结点
       var p_element = document.getElementById("description");
       // 将 p 元素赋值给 nodeValue
       p_element.firstChild.nodeValue = title;
     }
     return true;
   }
   function prepare_gallery() {
     if (!(document.getElementsByTagName || document.getElementById))
       return false;
     var gallery = document.getElementById("image_gallery");
     if (!gallery) return false;
     links = gallery.getElementsByTagName("a");
     for (var i = 0; i < links.length; i++) {
       links[i].onclick = function () {
         return show_pic(this) ? false : true;
       };
     }
   }
   ```

#### js 与 css 结合

1. id 可以使用在 CSS 样式表里，比如，把图片清单的项目符号去掉，可以得用`image_gallery`写如下的 CSS 语句。

   ```css
   #image_gallery {
     list-style: none;
   }
   ```

   将这些 CSS 语句存入一个外部文件如`layout.css`，然后再从 gallery.html 的头部<head>引用其。

   ```html
   <link rel="stylesheet" href="layout.css" />
   ```

   可以将其改变为横向

   ```css
   #image_gallery li {
     display: inline;
   }
   ```

   ![Image](https://pic4.zhimg.com/80/v2-53bc454ddb197b6284a55ade119fa8c9.png)

#### DOM Core 和 HTML-DOM

1. 已经使用的 DOM 方法：

   - getElementById
   - getElementsByTagName
   - getAttribute
   - setAttribute

   HTML-DOM 提供了一个 forms 对象，可以把下面的代码：

   ```js
   document.getElementsByTagName("form");
   ```

   简化为：

   ```js
   document.forms;
   ```

   把图片 src 取出来的语句：

   ```js
   element.getAttribute("src");
   ```

   简化为：

   ```js
   element.src;
   ```

   HTML-DOM 的代码会很短，但是只能用来处理 Web 文档。
   用 HTML-DOM 重写 show_pic 的话，可以变得更简短：

   ```js
   var source = whic_pic.getAttribute("href");
   ```

   简化为：

   ```js
   var source = whic_pic.href;
   ```

   设置属性

   ```js
   placeholder.setAttribute("src", source);
   ```

   可改为

   ```js
   placeholder.src = source;
   ```

2. 即使了解 HTML-DOM，也要了解 DOM-sore，即使你只决定使用一种，毕竟要阅读别人编写的脚本。

#### 小结

无

> 欢迎访问我的个人[博客](https://jinl1874.xyz)
