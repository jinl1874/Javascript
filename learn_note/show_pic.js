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

function count_body() {
    var body_element = document.getElementsByTagName("body")[0];
    var num = body_element.childNodes.length;
    alert(num);
}

function pop_up(url) {
    window.open(url, "pop_up", "weight=300, height=400");
}

// window.onload = pop_up("https://zhihu.com");


window.onload = prepare_links;
function prepare_links() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("class") === "pop_up") {
            alert(links[i].getAttribute("href"));
            links[i].onclick = function () {
                pop_up(this.href);
                return false;
            }
        }
    }
}