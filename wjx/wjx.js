(function () {
    var config = [
        {
            id: 4,
            answer: ["不知道", "随便吧", "自学去"]
        }
    ];

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

    // 将手机版网页转为PC版
    function redirect(url) {
        try {
            // https://www.wjx.cn/m/83481770.aspx
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

    // 随机数函数
    function random_num(length) {
        var num = Math.random() * length;
        return Math.floor(num);
    }

    // 处理单选
    function single_selection(lis) {
        var random_0 = random_num(lis.length);
        lis[random_0].getElementsByClassName('jqRadio')[0].click();
    }
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

    // 提交函数
    function submit_question() {
        document.getElementById("submit_button").click();
    }

    // 遍历找到所有的问题节点
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
            // 如果是填空题，用上面提前准备好的config文件来随机填写
            else if (textarea.length > 0) {
                blanks(title, textarea);
            }

            else {
                // 如果是其它，添加相应的操作.....
                console.log("other");
            }
        }
    }

    // timeout 函数
    function timeout() {
        console.log("timeout");
    }
    // 设置一共要刷多少次题目
    var num = 2;
    for (let i = 0; i < num; i++) {
        var url = window.location.href;
        redirect(url);
        Traverse();
        submit_question();
        new_wxj();
        // 暂停一下，免得被识别为机器人
        setTimeout(timeout(), 4000);
    }
})