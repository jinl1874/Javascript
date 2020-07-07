#! https://zhuanlan.zhihu.com/p/157369955
![Image](https://pic4.zhimg.com/80/v2-9c092909045fec920d8c5ad03c352900.jpg)

# JavaScript 学习笔记（2）：DOM

#### 1. DOM

1.  DOM 的 D 指的是`Document`（文档），O 指的`Object`（对象），M 指的是`Model`（模型）。
2.  JS 的对象包括三种，分别是：

    - 用户定义对象，不过在这里很少用。
    - 内建对象，包括 Math、Array 等内建对象。
    - 宿主对象，由浏览器提供的对象。

3.  模型，即将文档用“树”图表示出来，如例图所示：
    ![Image](https://pic4.zhimg.com/80/v2-908a37eed3d355f8539d8552c8e725f6.png)
    根元素是 html，有两个子分支 head 与 body，它们处于同一层次，属于兄弟关系，他们也分别有不同的子元素。

#### 2. 节点`node`

节点包括元素节点、文本节点和属性结点。

1. 元素节点：标签的名字即元素的名字，如文本段落元素的名字是“p”，列表项元素的名字是“li”。
2. 文本节点：<p>元素包含文本，它是一个文本节点。大多文本节点被包括在元素节点的内部。并非所有的元素节点都包含有文本节点，如`<ul><li>Test</li></ul>`中的`<ul>`没有直接包含文本节点，包括其它元素节点，后者即`<li>`包含文本节点。
3. 属性节点：用来对元素做出更具体的描述。例如几乎所有的元素都有一个 title 属性，可以利用这个属性对包含在元素里的东西做出准确详细的描述：
   ```HTML
   <p title="test">此处应有文本</p>
   ```
   里面的`title="test"`是属性节点。

#### 3. CSS

CSS 即层叠样式表，可以告诉浏览器该如何显示文档内容。

1. 样式的声明可放在文档中的`<head>`里，亦可另起一文件。
2. 语法：
   ```css
   selector {
     property: value;
   }
   ```
   例子：
   ```css
   p {
     color: red;
     font-size: 18px;
   }
   ```
   这个会自动应用于文档里所有的 p 元素。
3. id 属性：独一无二的标识符，只可用于一处。
   ```css
   #id {
     font-style: italic;
   }
   ```
   使用：
   ```html
   <p id="id">Test</p>
   ```
4. class 属性：可应用于所有元素中。
   ```css
   .class {
     font-style: italic;
   }
   ```
   使用：
   ```html
   <p class="class">Test</p>
   ```

#### 4. 获取节点

1. getElementById，获取具体某个 id 的节点。
   使用方法:
   ```js
   var id_element = document.getElementById(id_name);
   ```
2. getElementsByClassName，获取所有使用该 class 的节点，返回的是一个数组。注意`getElementsByClassName`中间的 `elements`有加`s`。
   ```js
   var class_element = document.getElementsByClassName(class_name);
   ```
3. getElementsByTagName，获取所有名为该 TagName 的节点，返回的是一个数组。注意`getElementsByTagName`中间的 `elements`有加`s`。
   ```js
   var tag_element = document.getElementsByTagName(tag_name);
   ```

#### 5. 获取和设置属性

1. 获取属性：`getAttribute`，获取想要查询的属性值，参数为查询属性的名字。
   `getAttribute`不能通过`document`节点调用，只用被元素节点调用。
   使用方法：

   ```js
   // 先得到节点值
   var lis = document.getElementsByTagName("li");
   // 再获取其中的属性值
   for (var i = 0; i < lis.length; i++) {
     alert(lis[i].getAttribute("title"));
   }
   ```

2. 设置属性：`setAttribute`，设置具体的属性值，参数为属性名字和属性值。同样只用被元素节点调用。
   使用方法：
   ```js
   // 先得到节点值
   var lis = document.getElementsByTagName("li");
   // 再修改其中的属性值
   for (var i = 0; i < lis.length; i++) {
     alert(lis[i].getAttribute("title"));
     lis[i].setAttribute("title", "li_tag");
     alert(lis[i].getAttribute("title"));
   }
   ```

> 欢迎访问我的个人[博客](https://jinl1874.xyz)
