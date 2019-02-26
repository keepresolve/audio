/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
function createNode(x, y, text, fillColor, number, lampColor) {
    var width = 150;
    var height = 24;
    var padding = 4;
    var node = graph.createNode(text, x, y);
    node.image = 'interaction/web.png';//cloud.svg';
    node.size = {height: height}
    node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_MIDDLE);
    node.setStyle(Q.Styles.LABEL_POSITION, {x: width / 2, y: height / 2});
    node.setStyle(Q.Styles.BACKGROUND_COLOR, fillColor || '#FFF');
    node.setStyle(Q.Styles.BORDER, 1);
    node.setStyle(Q.Styles.BORDER_COLOR, '#FA0');
    node.setStyle(Q.Styles.PADDING, padding);

    var numberLabel = new Q.LabelUI();
    numberLabel.position = {x: width - 10, y: height / 2 - 6};
    numberLabel.fontSize = 10;
    numberLabel.fontStyle = 'bold';
    node.addUI(numberLabel, {
        property: "number",
        propertyType: Q.Consts.PROPERTY_TYPE_CLIENT,
        bindingProperty: "data"
    });
    node.set('number', '' + number);
    var lamp = new Q.ImageUI(Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -3.5, -3.5, 7, 7));
    lamp.fillGradient = new Q.Gradient(Q.Consts.GRADIENT_TYPE_RADIAL, [Q.toColor(0xAAFFFFFF), Q.toColor(0x33EEEEEE), Q.toColor(0x44888888), Q.toColor(0x33666666)],
        [0.1, 0.3, 0.7, 0.9], 0, -0.2, -0.2);
    lamp.lineWidth = 0.5;
    lamp.strokeStyle = '#CCC';
    lamp.position = {x: width - 10, y: height / 2 + 6};
    node.addUI(lamp, {
        property: "lampColor",
        propertyType: Q.Consts.PROPERTY_TYPE_CLIENT,
        bindingProperty: "fillColor"
    });
    node.set('lampColor', lampColor);

    return node;
}

function createEdge(from, to) {
    var edge = graph.createEdge(from, to);
    edge.setStyle(Q.Styles.ARROW_TO_SIZE, {width: 5, height: 8});
    edge.edgeType = Q.Consts.EDGE_TYPE_ORTHOGONAL_HORIZONTAL;
    edge.setStyle(Q.Styles.EDGE_SPLIT_BY_PERCENT, false);
    edge.setStyle(Q.Styles.EDGE_SPLIT_VALUE, 30);
    edge.setStyle(Q.Styles.EDGE_CORNER, Q.Consts.EDGE_CORNER_NONE);
    return edge;
}


var graph = new Q.Graph('canvas');
graph.styles = {};
graph.styles[Q.Styles.SELECTION_TYPE] = Q.Consts.SELECTION_TYPE_BORDER;
graph.styles[Q.Styles.SELECTION_COLOR] = '#FA0';
graph.styles[Q.Styles.SELECTION_BORDER] = 3;

graph.isMovable = function(){ return false;}
graph.moveToCenter();
var hgap = 250;
var vgap = 40;
var a = createNode(0, 0, 'Web LB API', null, 0, '#FA0');
var b1 = createNode(hgap, -vgap, 'Web LB API', '#FF0', 0, '#FF0');
var b2 = createNode(hgap, vgap, 'Web LB API', null, 0, '#00F');
var c1 = createNode(hgap * 2, vgap / 3 - vgap, 'Web LB API', '#FF0', 0, '#0FF');
var c2 = createNode(hgap * 2, vgap / 3 + vgap, 'Web LB API', null, 0, '#0F0');

var edge1 = createEdge(a, b1);
var edge2 = createEdge(a, b2);
var edge3 = createEdge(a, c1);
//            var edge4 = createEdge(a, c2);
var edge5 = createEdge(b1, c1);
//            var edge6 = createEdge(b1, c2);
var edge7 = createEdge(b2, c1);

var isSetting = false;
graph.selectionModel.listChangeDispatcher.on(function (evt) {
    if(isSetting){
        return;
    }
    if(evt.kind == 'add'){
        var data = evt.data;
        if(data instanceof Q.Node){
            isSetting = true;
            var edges = data.getEdges();
            edges.push(data);
            graph.setSelection(edges);
            isSetting = false;
        }
    }
})

//do layout
graph.callLater(function () {
    var fromBounds = graph.getUIBounds(edge3.from);
    var toBounds = graph.getUIBounds(edge3.to);
    edge3.addPathSegment([fromBounds.right, fromBounds.cy - 10]);
    edge3.addPathSegment([fromBounds.right + 15, fromBounds.cy - 10]);
    edge3.addPathSegment([fromBounds.right + 15, fromBounds.cy - 80]);
    edge3.addPathSegment([toBounds.x - 20, fromBounds.cy - 80]);
    edge3.addPathSegment([toBounds.x - 20, toBounds.cy - 5]);
    edge3.addPathSegment([toBounds.x, toBounds.cy - 5]);

    var fromBounds = graph.getUIBounds(edge5.from);
    var toBounds = graph.getUIBounds(edge5.to);
    edge5.addPathSegment([fromBounds.right, fromBounds.cy]);
    edge5.addPathSegment([toBounds.x - 25, fromBounds.cy]);
    edge5.addPathSegment([toBounds.x - 25, toBounds.cy]);
    edge5.addPathSegment([toBounds.x, toBounds.cy]);

    var fromBounds = graph.getUIBounds(edge7.from);
    var toBounds = graph.getUIBounds(edge7.to);
    edge7.addPathSegment([fromBounds.right, fromBounds.cy]);
    edge7.addPathSegment([toBounds.x - 25, fromBounds.cy]);
    edge7.addPathSegment([toBounds.x - 25, toBounds.cy + 5]);
    edge7.addPathSegment([toBounds.x, toBounds.cy + 5]);

    edge2.setStyle(Q.Styles.EDGE_FROM_OFFSET, {y: 8});
})

graph.setSelection(b1);

var time = setTimeout(function A() {
    graph.forEach(function (a) {
        if (!(a instanceof Q.Node)) {
            return;
        }
        a.set('number', '' + Q.randomInt(10));
        a.set('lampColor', Q.randomColor());
    })
    time = setTimeout(A, 1000);
}, 1000);

function destroy(){
    clearTimeout(time);
}