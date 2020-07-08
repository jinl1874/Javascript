#! https://zhuanlan.zhihu.com/p/157873690
![Image](https://pic4.zhimg.com/80/v2-b01ce219de5b1727e49c023d39fdb14d.jpg)

# JavaScript 学习笔记（3）：图片库

#### 1. 为什么要使用图片库

可以把所有的图片都放到一个网页里，不过当图片过多时，会导致网页体积过大。
因此，为每张图片分别创建一个网页的解决方案。
使用 js 来伊娃衅片是最佳选择：把整个图片库的浏览链接集中在图片库主页里，当用户点击了这个主页里的某个 图片链接时，才把相应的图片传送过去。

#### 2. 准备

1. 文件：准备几张图片，放在一个 images 的目录里，再创建一个`gallery.html`文件，与 images 同目录。
2. 标记：使用无序列表`<ul>`来标记图片链接，
   标记清单：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image Gallery</title>
  </head>

  <body>
    <h1>Snapshots</h1>
    <ul>
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
  </body>
</html>
```

#### 3. 改进

点击某个链接后可以留在当前页面；
点击链接后可以看到图片以及可以看到图片清单。

方法：
增加一个占位符图片，当没有点时，显示一个默认图片，当点击图片的链接时，拦截网页的默认行为，将图片显示为所点击链接的图片。
将`<img id="default" src="images/default.jpg" alt="My image gallery">;`插入无序列表后。新建一个名为`default`的 id 样式表，样式可自定义。
显示结果：
![Image](https://pic4.zhimg.com/80/v2-8a4beab26883ec8160922259ee3da143.png)

#### 4. 实现

1. 代码：要修改占位符的显示，只需将占位符的`src`属性修改为相对应的图片属性即可，需要使用的 js 方法有`getAttribute()`和`setAttribute()`。
   具体代码：

   ```js
   // whic_pic 是元素结点
   function show_pic(whic_pic) {
     // 获取href属性
     var source = whic_pic.getAttribute("href");
     // 获取默认结点
     var placeholder = document.getElementById("default");
     // 设置属性
     placeholder.setAttribute("src", source);
   }
   ```

   其它方法：

   ```js
   // 设置属性
   placeholder.src = source;
   ```

2. 使用：

   - 在同目录下创建一个名为`show_pic.js`的文件，将上述代码放进去，再在`gallery.html`的`<head>`标签里写入`<script src="show_pic.js"></script>`。
   - 要点击某个链接触发事件时，需要使用`onclick`事件处理函数。添加事件处理函数的语法是`event="javaScript Statement(s)`，所以调用`show_pic`的方法是：

   ```js
   onclick = "show_pic(this)";
   ```

   - 拦截网页默认操作：当某个元素添加了事件处理函数后，如果那段 js 代码返回的值是 true，那么 onclick 事件处理函数就认为这个链接被点击了；如果返回的的 false，那么就认为没有被点击。例如`onclick="return false"`这个事件处理函数就会被浏览器认为没有点击，那么也不会调用默认的函数了。所以具体的代码为：

   ```js
   onclick = "show_pic(this); return false";
   ```

   详细代码为：
   // 目前只有手动添加

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
   <li>
     <a
       onclick="show_pic(this); return false;"
       href="images/follower.jpg"
       title="a follower "
       >follower</a
     >
   </li>
   <li>
     <a
       onclick="show_pic(this); return false;"
       href="images/part.jpg"
       title="a part here"
       >part</a
     >
   </li>
   <li>
     <a
       onclick="show_pic(this); return false;"
       href="images/sea.jpg"
       title="the sea "
       >sea</a
     >
   </li>
   <li>
     <a
       onclick="show_pic(this); return false;"
       href="images/star.jpg"
       title="water star"
       >star</a
     >
   </li>
   ```

   现在已经完成了图片库，无论点击哪个都不会跳转了。
   ![Image](https://pic4.zhimg.com/80/v2-a4bcfbfb4a0f1de277c6e4451b4bbbf9.png)

#### 5. 扩展

> 添加切换图片时可以显示不同的文本功能。之前在每个 a 属性里都设置了 title 属性，只要用`getAttribute`函数就可以将其提取出来，然后可以插入到 HTML 文档中。
> 为此需要学习几个新的 Dom 属性。

1. childNodes 属性：在节点树上，这个属性可以获取元素所有的子元素，是一个数组。使用方法：`var children = element.childNodes`，例子：

   ```js
   // 获取body节点，因为一个文档只有一个body标签，所以只需取第一个元素即可
   var body_element = document.getElementsByTagName("body")[0];
   // 获取子元素
   var body_children = body_element.childNodes;
   ```

   实测：将以下代码放进`show_pic.js`里

   ```js
   function count_body() {
     var body_element = document.getElementsByTagName("body")[0];
     var num = body_element.childNodes.length;
     alert(num);
   }
   ```

   为了使文档加载时使用，再添加`window.onload = count_body;`到 js 文件里，接着打开文档，弹出计算的所有的 body 子元素属性了。

2. nodeType 属性
   body 应该只有 3 个子元素，但是显示的数字却比 3 大，只为文档树的节点类型并非只有元素节点一种。文档里几乎每一样东西都是一个节点，甚至连空格和换行符都是。
   第一个节点都有 nodeType 属性，nodeType 的值并不是英文，元素节点的 nodeType 是 1，属性节点的值是 2，文本节点的是 3。
   比如`body_elemnt.nodeType`的值是 1.

3. 标记添加描述
   在`<img>`下添加`<p id="description">Choose an image</p>`这一段文本节点。

4. 获取该结点
   ```js
   // 获取title属性
   var title = whic_pic.getAttribute("title");
   // 获取p结点
   var p_element = document.getElementById("description");
   ```
5. 实现文本切换
   使用 DOM 提供的`nodeValue`属性，它可以得到和设置节点的值。
   `<p>`元素本身是`nodeValue`是一个空值，需要的是`<p>`子元素包含的值。
   因此使用方法为：
   ```js
   p_element.childNodes[0].nodeValue;
   ```
6. firstChild 和 lastChild 属性
   firstChild 是获取节点的第一个元素，lastChild 是获取最后一个元素。
   即`node.childNodes[0] === node.firstChild`。
   使用这两个元素更简洁了。

7. 利用 nodeValue 刷新

   ```js
   // 将p元素赋值给nodeValue
   p_element.firstChild.nodeValue = title;
   ```

   最终代码为：

   ```js
   // whic_pic 是元素结点
   function show_pic(whic_pic) {
     // 获取href属性
     var source = whic_pic.getAttribute("href");
     // 获取默认结点
     var placeholder = document.getElementById("default");
     // 设置属性
     placeholder.setAttribute("src", source);
     // 获取title属性
     var title = whic_pic.getAttribute("title");
     // 获取p结点
     var p_element = document.getElementById("description");
     // 将p元素赋值给nodeValue
     p_element.firstChild.nodeValue = title;
   }
   ```

几个新 DOM 属性：

- childNodes
- nodeType
- firstChild
- lastChild

欢迎访问我的个人[博客](https://jinl1874.xyz)。
