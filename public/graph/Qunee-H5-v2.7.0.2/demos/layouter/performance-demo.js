/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
var names = ["Winnie", "Zoe", "Sam Sha", "Leo", "Mike", "Joshua", "Kelly", "Hatty", "Eric"];

function createNode(x, y) {
    var node = new Q.Node(withLabel ? names[Q.randomInt(names.length)] : null, x, y);
    node.image = randomIcon();
    return node;
}

function createEdge(node1, node2) {
    var edge = new Q.Edge(node1, node2);
    edge.setStyle(Q.Styles.LABEL_ROTATABLE, false);
    edge.setStyle(Q.Styles.ARROW_TO, false);
    return edge;
}

var graph = new Q.Graph(canvas);

function createMatrix(model, height, rows, count, withEdge, isGroup) {
    var x = 0, y = 0;
    var perX, perY;
    perX = perY = height / rows | 0;
    var startX = -height / 2, startY = -height / 2;
    var prevNode, prevNodes = [];
    while (model.length < count) {
        y = 0;
        prevNode = null;
        while (y < rows) {
            var node = isGroup ? new Q.Group(x + "-" + y, startX + x * perX, startY + y * perY)
                : createNode(startX + x * perX, startY + y * perY);
            model.add(node);

            if(isGroup){
                var child1 = createNode(node.x - 50, node.y - 50);
                var child2 = createNode(node.x + 50, node.y + 50);
                var child3 = createNode(node.x - 50, node.y + 20);
                model.add(createEdge(child1, child2));
                model.add(child1);
                model.add(child2);
                model.add(child3);

                node.addChild(child1);
                node.addChild(child2);
                node.addChild(child3);
            }
            y++;
            if (withEdge) {
                if (prevNodes.length) {
                    if (prevNodes[y - 1]) {
                        model.add(createEdge(prevNodes[y - 1], node));
                    }
                    prevNodes[y - 1] = node;
                } else {
                    prevNodes.push(node);
                }
                if (prevNode) {
                    model.add(createEdge(prevNode, node));
                }
                prevNode = node;
            }
            if(model.length >= count){
                return;
            }
        }
        x++;
    }
}
function loadDatas(withEdges, withGroup, itemCount, zoomToOverview) {
    graph.graphModel.clear();

    var time = Date.now();
    var graphModel = new Q.GraphModel();

    var gap = 100;
    var rows = Math.ceil(Math.sqrt(itemCount / 4));
    var height = (rows - 1) * gap;
    Q.log(rows)
    if (!withGroup) {
        createMatrix(graphModel, height, rows, itemCount, withEdges);
    } else {
        createMatrix(graphModel, height, rows / 2, itemCount, withEdges, true);
    }

    graph.graphModel = graphModel;

    if (zoomToOverview) {
        graph.zoomToOverview();
    }
    graph.callLater(function () {
        showDialog(getI18NString("Element counts and loading time - Commercial license support more elements and more than 50% performance increase"), "item counts: '" + graph.graphModel.length + "'<br>loading time: '" + (Date.now() - time) + "'ms");
    });

}

var itemCount = Q.isTouchSupport ? 500 : 2000;
var withEdges = true;
var withGroups = false;
var withLabel = true;
var zoomToOverview = true;
var delayedRendering = graph.delayedRendering;


var toolbox = document.createElement("div");
toolbox.id = "toolbox";
Q.css(toolbox, {
    position: "absolute",
    top: "100px",
    right: "0px",
    "box-shadow": "-1px 0px 2px #888",
    "border-radius": "8px 0 0 8px"
});
graph.html.parentNode.appendChild(toolbox);

function destroy() {
    toolbox.parentNode.removeChild(toolbox);
}

function createForm(items, onSubmit) {
    var form = document.createElement('form');
    form.setAttribute('role', 'form');

    for (var name in items) {
        var item = items[name];
        var div = document.createElement('div');
        var label = document.createElement('label');
        div.appendChild(label);
        var input = document.createElement('input');
        item.dom = input;
        if (item.type) {
            input.setAttribute('type', item.type);
            if(item.onchange){
                input.onchange = item.onchange
            }
            if (item.type == 'checkbox') {
                div.className = 'checkbox';
                input.checked = item.value;
                label.appendChild(input);
                label.appendChild(document.createTextNode(item.label));
                div.appendChild(label);
                form.appendChild(div);
                continue;
            }
        }
        div.className = 'form-group';
        input.className = 'form-control input-sm';
        label.textContent = item.label;
        if (item.placeholder) {
            input.setAttribute('placeholder', item.placeholder);
        }
        if (item.value) {
            input.value = item.value;
        }
        div.appendChild(input);
        form.appendChild(div);
    }
    var submit = document.createElement('button');
    submit.className = 'btn btn-default btn-sm';
    submit.setAttribute('type', 'submit');
    submit.innerHTML = getI18NString('Submit');
    submit.onclick = function (evt) {
        var data = {};
        for (var name in items) {
            var item = items[name];
            var dom = item.dom;
            if (item.type == 'checkbox') {
                data[name] = dom.checked;
            } else {
                data[name] = dom.value;
            }
        }
        onSubmit(data);
        return false;
    }
    form.appendChild(submit);
    return form;
}

var form = createForm({
    delayedRendering: {type: 'checkbox', value: delayedRendering, label: getI18NString('Delayed Rendering'), onchange: function(evt){
        graph.delayedRendering = evt.target.checked;
    }},
    count: {value: itemCount, label: getI18NString('Element Counts')},
    withEdge: {type: 'checkbox', value: withEdges, label: getI18NString('with Edge')},
    withGroup: {type: 'checkbox', value: withGroups, label: getI18NString('with Group')},
    withLabel: {type: 'checkbox', value: withLabel, label: getI18NString('Show Label')},
    zoomToOverview: {type: "checkbox", value: zoomToOverview, label: getI18NString('Zoom to Overview')}
}, function (formData) {
    var count = parseInt(formData.count);
    var withEdge = formData.withEdge;
    var withGroup = formData.withGroup;
    withLabel = formData.withLabel;
    loadDatas(withEdge, withGroup, count, formData.zoomToOverview);
});
//form.style.width = '120px';
toolbox.appendChild(form);

loadDatas(withEdges, withGroups, itemCount, zoomToOverview);