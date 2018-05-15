var selectlist = document.getElementsByClassName("select");

for (var i = 0; i < selectlist.length; i++) {
    var selected = document.createElement("div");
    selected.className = "select-sel";
    selected.onclick = function () {
        this.parentElement.classList.toggle("sel-open");
    }
    var list = document.createElement("div");
    list.className = "select-list";
    selectlist[i].appendChild(selected);
    selectlist[i].appendChild(list);
    var tsel = selectlist[i];

    selectlist[i].setValue = function (value) {
        this.setAttribute("data-value", value);
    };

    /**
     * @param {HTMLDivElement} item
     */
    selectlist[i].add = function (item) {
        if ((this.children[1].childElementCount % 6) == 0)
            item.classList.add("sel-nomargin");
        this.children[1].appendChild(item);
        item.onclick = function () {
            var cselectl = this.parentElement.parentElement;
            cselectl.children[0].innerHTML = "";
            cselectl.children[0].appendChild(item.cloneNode(true));
            cselectl.setValue(this.value);
        };
    };

    selectlist[i].select = function (index) {
        var elem = this.children[1].children[index];
        this.children[0].innerHTML = "";
        this.children[0].appendChild(elem.cloneNode(true));
        this.setValue(elem.value);
    }
}

window.addEventListener("click", function (ev) {
    var els = document.getElementsByClassName("select");
    for (var i = 0; i < els.length; i++) {
        if (ev.target != els[i].children[0] &&
            ev.target != els[i].children[0].children[0])
            els[i].classList.remove("sel-open");
    }
});