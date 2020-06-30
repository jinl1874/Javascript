#### 问卷星自动填写脚本

##### 配置
此脚本目前仅支持单选、多选以及填空题。
单选、多选采用随机选择的方法，而填空题则需要自己配置填写的内容。
具体配置方法为：
    如果问卷里的第四题是填空题，那么在全局变量`config`加上一个键值，里面有id和answer两个键，填上相应的值（第四题即`id: 4`)即可。
```javascript
    var config = [
        {
            id: 4,
            answer: ["不知道", "随便吧", "自学去"]
        }
    ];

```



##### 运行
打开浏览器，进入问卷页面如[js测试](https://www.wjx.cn/jq/83481770.aspx)。
有以下两种方法运行：
> 我用的是Firefox浏览器，其它浏览器的操作都差不多，可以就是快捷键有区别。
1. 按`F12`，点击控制台，再把脚本粘贴到文本输入框，再点击上面的`运行`即可。
    ![运行js](http://image.jinl1874.xyz/img/20200630132036.png)
2. 浏览器安装一个名为`Violentmonkey`即[暴力猴](https://violentmonkey.github.io/get-it/)的脚本插件。安装完成之后，进入问卷页面，点击violentmonkey的图标，会出现一个弹框，
   ![violentmonkey](http://image.jinl1874.xyz/img/20200630133801.png)
   再点击其中的`+`，会出现编辑脚本的页面。
   ![edit](http://image.jinl1874.xyz/img/20200630134305.png)
   将脚本粘贴进去，保存文件，再回到问卷页面刷新，此时脚本即可自动运行。


##### 脚本编写思路
1. 主体思路，找到所有`class="div_question"`的div，再遍历`div`，分析每个div是什么类型的题目，再选择对应的操作。
   ```JavaScript
    function Traverse(params) {
        var title_list = document.getElementsByClassName("div_question");
        for (let i = 0; i < title_list.length; i++) {
            const title = title_list[i];
            var lies = title.getElementsByTagName("li");
            var textarea = title.getElementsByTagName("textarea");
            var lis = [];
            // 将lies放在数组里
            for (var kl = 0; kl < lies.length; kl++) {
                lis.push(lies[kl]);
            }

            // 如果是选择，那么执行以下操作
            if (lis.length > 0) {
                // 如果是多选
                if (lis[0].getElementsByClassName('jqCheckbox').length > 0) {
                    multiple_selection(lis);
                }
                // 如果是单选
                else {
                    single_selection(lis);
                }
            }
            // 如果是填空题，那么调用对应的处理函数。
            else if (textarea.length > 0) {
                blanks(title, textarea);
            }
            else {
                // 如果是其它，添加相应的操作.....
                console.log("other");
            }
        }
    }
   ```
2. 单选和多选采用随机数算法
    * 单选题，直接生成一个随机数，再点击随机数的选项。
    ```JavaScript
    // 处理单选
    function single_selection(lis) {
        var random_0 = random_num(lis.length);
        lis[random_0].getElementsByClassName('jqRadio')[0].click();
    }
    ```
    * 多选题，先随机生成一个要选的选项数，再用一个for循环执行。循环里面再生成随机数，接着去点击随机数对应的选项。
    在随机的情况下，有可能会重复点击选项，导致没有选项选上，这时就需要检测一下有没有选项被选上了，如果没有，那就手动选一个。
    ```JavaScript
    // 处理多选
    function multiple_selection(lis) {
        // 获取随机数
        var random_0 = random_num(lis.length);
        for (let i = 0; i <= random_0; i++) {
            var random_1 = random_num(lis.length);
            lis[random_1].getElementsByClassName('jqCheckbox')[0].click();
        }

        // 如果选中的全部抵消了，那么就手动加上一个
        var flag = false;
        for (let i = 0; i < lis.length; i++) {
            const element = lis[i].getElementsByClassName("jqChecked");
            if (element.length > 0)
                flag = true
        }
        if (!flag) {
            lis[random_0].getElementsByClassName('jqCheckbox')[0].click();
        }
    }
    ```
3. 填空题的内容从配置文件里找出，也采用随机填写。
   先获取题目的id，然后从`config`中找到对应的值，再随机选取一个值将其赋值到文本框里。
   ```JavaScript
    // 填空
    function blanks(title, textarea) {
        // 获取当前题目的id
        var id_text = title.getAttribute("id");
        var re_id = /div(\d+)/;
        var id = re_id.exec(id_text)[1]
        // 遍历config里id值为id的answer
        for (var j = 0; j < config.length; j++) {
            if (id == config[j].id) {
                textarea[0].innerHTML = config[j].answer[random_num(config[j].answer.length)];
            }
        }
    }
   ```

4. 重定向到PC版网页。
   由于问卷星手机版的网页与PC版相差无几，因此使用正则表达式修改即可。
    ```JavaScript
    // 将手机版网页转为PC版
    function redirect(url) {
        try {
            var re = /(https:\/\/www\.wjx\.cn\/)(m|jq)(.*)g/
            var obj = re.exec(url);
            if (obj[2] == 'm') {
                console.log("redirect now");
                window.location.href = obj[1] + "jq" + obj[3];
            }
            else {
                console.log("do......");
            }
        } catch (error) {

        }
    }
    ```
    5. 由于填写完成并提交后会跳转到一个抽奖页面，此时的网址含有问卷页面的id，因此可以将其抽取出来，重定向到问卷填写页面。
    ```JavaScript
    // 完成填写重新打开填写界面
    function new_wxj() {
        var url = window.location.href;
        //https://www.wjx.cn/wjx/join/complete.aspx?q=83481770&JoinID=106588372552&jidx=1&s=&njqj=1
        var re = /complete\.aspx\?q=(\d+)/;
        var obj = re.exec(url);
        if (obj) {
            window.location.href = "https://www.wjx.cn/jq/" + obj[1] + ".aspx";
        }
        else {
            console.log("no pat", obj);
        }
    }
    ```

全部代码[在此](https://github.com/jinl1874/Javascript)
欢迎访问我的博客[网站](https://jinl1874.xyz)