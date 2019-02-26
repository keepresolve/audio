/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
var graph = new Q.MapChart(canvas);
graph.originAtCenter = false;

var strokeColor = "#888";

graph.minScale = 0.5;
graph.maxScale = 4;
//graph.fullRefresh = true;

//custom ui
function CircleUI(data){
    Q.doSuperConstructor(this, CircleUI, arguments);
}
CircleUI.prototype = {
    alignPosition: null,
    measure: function () {
        if(this.data){
            this.setMeasuredBounds(this.data.width, this.data.height);
        }
    },
    draw: function (g, scale, selected, selectionStyles) {
        this.data.draw(g);
    },
    doHitTest: function(x, y, tolerance){
        return false;
    }
}
Q.extend(CircleUI, Q.BaseUI);

Q.Node.prototype.hideCircle = function (r, color) {
    if(this.circleUI){
        this.circleUI.visible = false;
        this.invalidate();
    }
}
Q.Node.prototype.showCircle = function (r, color) {
    if(!r){
        this.hideCircle();
        return;
    }
    var circle = this.circleUI;
    if (!circle) {
        circle = this.circleUI = new CircleUI({
            draw: function (g) {
                var r = this.r || 100;
                g.globalAlpha = 0.3;
                var color = this.fillColor || Q.toColor(0x55FFAA00);
                g.fillStyle = color;
                g.beginPath();
                g.arc(r, r, r, 0, 2 * Math.PI);
                g.fill();
                g.strokeStyle = '#000';
                g.stroke();
            }
        });
        circle.zIndex = -1;
        this.addUI(circle);
    }
    circle.data.r = r;
    circle.data.width = r * 2;
    circle.data.height = r * 2;
    circle.data.fillColor = color;
    circle.invalidateData();
    circle.visible = true;

    this.invalidate();
}

graph.onPropertyChange('scale', function(evt){
    var scale = evt.value;//.scale;
    // Q.log(scale + ', ' + graph.scale);
    scale = 1 + (scale - 1) * 0.5;
    graph.callLater(function(){
        graph.graphModel.forEach(function(element){
            if(element.type == "path"){
                element.setStyle(Q.Styles.SHAPE_STROKE, 1 / scale);
                return;
            }
            if(element.type == "point"){
                element.setStyle(Q.Styles.SHAPE_STROKE, 2 / scale);
                return;
            }
            element.setStyle(Q.Styles.LABEL_FONT_SIZE, 9 / scale);
            if(element.image){
                element.size = {width: 20 / scale};
            }
        })
    })
})

var url = "mapchart/china-en.json";
var loading = graph.createNode("Loading '" + url + "' ...");
loading.image = null;

var colors = ["#D5E7C4", "#CDE6FF", "#EFDEE6", "#FFF8CC"];
var index = 0;
graph.loadJSONByURL(url, function(element, type, info){
    element.info = info;
    element.movable = false;
    element.type = type;
    element.outputProperties = "type,info".split(",");
    if(type == "path"){
        element.setStyle(Q.Styles.SHAPE_FILL_COLOR, colors[index++ % colors.length]);
//        element.setStyle(Q.Styles.SHAPE_FILL_GRADIENT, Q.Gradient.LINEAR_GRADIENT_VERTICAL);
        element.setStyle(Q.Styles.SHAPE_STROKE_STYLE, strokeColor);
        element.setStyle(Q.Styles.SHAPE_STROKE, 0.5);
        element.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_MIDDLE);
        element.setStyle(Q.Styles.LABEL_POSITION, Q.Position.CENTER_MIDDLE);
        element.zIndex = -1;
        return;
    }
    if(type == "point"){
        element.setStyle(Q.Styles.SHAPE_FILL_COLOR, "#DDD");
        element.setStyle(Q.Styles.SHAPE_STROKE_STYLE, "#EE0000");
        element.zIndex = 10;
        return;
    }
    if(type == "label"){
        if(info.class == 'tc'){
            element.visible = false;
        }
        element.setStyle(Q.Styles.LABEL_COLOR, "#AAA");
    }
}, function(){
    function createEdge(from, to, name){
        if(name === undefined){
            name = from.name + ' > ' + to.name;
        }
        var edge = graph.createEdge(name, from, to);
        return edge;
    }
    graph.removeElement(loading);
    var beijing = graph.createNode(getI18NString('Beijing'), 455, 198.6);
    beijing.image = Q.Graphs.server;
    var shanghai = graph.createNode(getI18NString('Shanghai'), 525, 315);
    var changsha = graph.createNode(getI18NString('Changsha'), 421, 366);
    createEdge(beijing, shanghai, null);
    var edge = createEdge(beijing, shanghai);
    edge.setStyle(Q.Styles.EDGE_COLOR, "#2898E0");
    edge.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "rgba(255,255,255,0.7)");
    edge = createEdge(shanghai, changsha);
    edge.setStyle(Q.Styles.EDGE_COLOR, "#2898E0");
    edge.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "rgba(255,255,255,0.7)");
    graph.zoomToOverview();

    timer = setTimeout(function blinking(){
        shanghai.showCircle(50 + Q.randomInt(100), Q.randomColor());
        beijing.showCircle(50 + Q.randomInt(100), Q.randomColor());
        timer = setTimeout(blinking, 1000);

        Q.log(Date.now())
    }, 1000);
});

var timer;
function destroy(){
    if(timer){
        clearTimeout(timer);
    }
}