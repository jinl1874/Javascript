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

function count_body() {
    var body_element = document.getElementsByTagName("body")[0];
    var num = body_element.childNodes.length;
    alert(num);
}

function pop_up(url) {
    window.open(url, "pop_up", "weight=300, height=400");
}

// window.onload = pop_up("https://zhihu.com");

function prepare_gallery() {
    if (!(document.getElementsByTagName || document.getElementById))
        return false;
    var gallery = document.getElementById("image_gallery");
    if (!gallery) return false;
    links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        // alert(links[i])
        links[i].onclick = function () {
            return show_pic(this) ? false : true;
        };
    }
}
// function prepare_links() {
//     var links = document.getElementsByTagName("a");
//     for (var i = 0; i < links.length; i++) {
//         if (links[i].getAttribute("class") === "pop_up") {
//             alert(links[i].getAttribute("href"));
//             links[i].onclick = function () {
//                 pop_up(this.href);
//                 return false;
//             }
//         }
//     }
// }


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
addLoadEvent(prepare_gallery)