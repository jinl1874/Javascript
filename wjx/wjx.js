(function () {
    var config = [
        {
            id: 5,
            answer: ["不知道", "随便吧", "自学去"]
        }
    ];

    // 完成填写重新打开填写界面
    (function new_wxj() {
        var url = window.location.href;
        //https://www.wjx.cn/wjx/join/complete.aspx?q=83481770&JoinID=106588372552&jidx=1&s=&njqj=1
        var re = /complete\.aspx?q=(\d+)/;
        var obj = re.exec(url);
        if (obj) {
            window.location.href = "https://www.wjx.cn/jq/" + obj[1] + ".aspx";
        }
        else {
            console.log("no pat", obj);
        }
    })();

    var url = window.location.href;
    // 将手机版网页转为PC版
    (function redirect(params) {
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
    })();

    // 随机数函数


    // 找到所有的问题节点

    // 选项随机填写

    // 填空根据config来填写
})