/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
function GridBackground(graph) {
    this.graph = graph;
    graph.onPropertyChange('viewport', this.update.bind(this));
    graph.onPropertyChange('transform', this.update.bind(this));

    this.canvas = Q.createCanvas(graph.width, graph.height, true);
    this.canvas.style.backgroundColor = '#FFD';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0px';
    this.canvas.style['-webkit-user-select'] = 'none';
    this.canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

    this.scaleCanvas = Q.createCanvas(graph.width, graph.height, true);
    this.scaleCanvas.style.position = 'absolute';
    this.scaleCanvas.style.top = '0px';
    this.scaleCanvas.style['-webkit-user-select'] = 'none';
    this.scaleCanvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

    graph.canvasPanel.insertBefore(this.canvas, graph.canvasPanel.firstChild);
    graph.canvasPanel.appendChild(this.scaleCanvas);

    this.update();
}

GridBackground.prototype = {
    update: function () {
        var graph = this.graph;
        var canvas = this.canvas;
        var scaleCanvas = this.scaleCanvas;
        graph.callLater(function () {
            canvas.setSize(graph.width, graph.height);
            canvas.width = canvas.width;//clear canvas
            scaleCanvas.setSize(graph.width, graph.height);
            scaleCanvas.width = canvas.width;//clear canvas

            var scale = graph.scale;
            var gap = 50 / scale;
            var currentCell = this.currentCell = 10 * (Math.round(gap / 10) || 1);

            scale = graph.scale * canvas.ratio;
            var bounds = graph.viewportBounds;
            var g = canvas.g;

            g.save();
            this._doTransform(g, scale, bounds);

            g.beginPath();
            var x = bounds.x, y = bounds.y, right = bounds.right, bottom = bounds.bottom;
            if (x % currentCell !== 0) {
                x -= (x % currentCell);
            }
            if (y % currentCell !== 0) {
                y -= (y % currentCell);
            }
            while (x < right) {
                g.moveTo(x, bounds.y);
                g.lineTo(x, bottom);
                x += currentCell;
            }
            while (y < bottom) {
                g.moveTo(bounds.x, y);
                g.lineTo(right, y);
                y += currentCell;
            }

            g.lineWidth = 1 / scale;
            g.strokeStyle = '#CCC';
            g.stroke();

            scaleCanvas.g.save();
            this._doTransform(scaleCanvas.g, scale, bounds);
            this.drawScales(scaleCanvas.g, bounds, scale, scaleCanvas.ratio);
            scaleCanvas.g.restore();

            g.restore();
        }, this);
    },
    _doTransform: function(g, scale, bounds){
        g.translate(-scale * bounds.x, -scale * bounds.y);
        g.scale(scale, scale);
    },
    drawText: function (g, text, x, y, fontSize, textAlign, textBaseline, rotate) {
        fontSize = fontSize || 7;
        g.save();
        var fontScale = 3;
        fontSize *= fontScale;
        g.font = 'normal ' + fontSize + 'px helvetica arial';
        g.fillStyle = '#555';
        g.textAlign = textAlign || 'center';
        g.textBaseline = textBaseline || 'top';
        g.translate(x, y);
        if (rotate) {
            g.rotate(rotate);
        }
        g.scale(1 / fontScale, 1 / fontScale);
        g.fillText(text, 0, 0);
        g.restore();
    },
    drawScales: function (g, bounds, scale, ratio) {
        g.beginPath();

        var scaleLength = 5 * ratio / scale;

        g.moveTo(bounds.x, bounds.y);
        g.lineTo(bounds.right, bounds.y);
        g.moveTo(bounds.x, bounds.y);
        g.lineTo(bounds.x, bounds.bottom);

        g.lineWidth = 5 / scale;
        g.strokeStyle = '#2898E0';
        g.stroke();

        var fontSize = 12 * ratio / scale;

        g.beginPath();
        var x = bounds.x;
        x = this.currentCell * Math.ceil(x / this.currentCell);
        while (x < bounds.right) {
            g.moveTo(x, bounds.y);
            g.lineTo(x, bounds.y + scaleLength + scaleLength);
            this.drawText(g, '' + x | 0, x, bounds.y + scaleLength + scaleLength, fontSize);
            x += this.currentCell;
        }
        var y = bounds.y;
        y = this.currentCell * Math.ceil(y / this.currentCell);
        while (y < bounds.bottom) {
            g.moveTo(bounds.x, y);
            g.lineTo(bounds.x + scaleLength + scaleLength, y);
            this.drawText(g, '' + y | 0, bounds.x + scaleLength + scaleLength, y, fontSize, 'center', 'top', -Math.PI / 6);
            y += this.currentCell;
        }
        g.lineWidth = 1 / scale;
        g.strokeStyle = '#000';
        g.stroke();
    }
}
var graph = new Q.Graph(canvas);
var background = new GridBackground(graph);

var currentCell = 10;
function snapToGrid(x, y) {
    var gap = currentCell;
    x = Math.round(x / gap) * gap;
    y = Math.round(y / gap) * gap;
    return [x, y];
}

graph.interactionDispatcher.addListener(function (evt) {
    if (evt.kind == Q.InteractionEvent.ELEMENT_MOVE_END) {
        var datas = evt.datas;
        datas.forEach(function(node){
            var ps = snapToGrid(node.x, node.y);
            node.setLocation(ps[0], ps[1]);
        });
        return;
    }
    if (evt.kind == Q.InteractionEvent.POINT_MOVE_END) {
        var line = evt.data;
        Q.log(evt.point);
        var segment = evt.point.segment;
        segment.points = snapToGrid(segment.points[0], segment.points[1]);
        line.invalidate();
        return;
    }
    if (evt.kind == Q.InteractionEvent.ELEMENT_CREATED) {
        var node = evt.data;
        var ps = snapToGrid(node.x, node.y);
        node.setLocation(ps[0], ps[1]);
        return;
    }

});

function getLocation(evt,graph){
    var px = (evt.clientX + window.document.documentElement.scrollLeft
        - graph.canvasPanel.offsetLeft)/graph.scale + graph.viewportBounds.x;
    var py = (evt.clientY + window.document.documentElement.scrollTop
        - graph.canvasPanel.offsetTop)/graph.scale + graph.viewportBounds.y;

    return {
        x:px,
        y:py
    }
}


Q.registerImage('Diode.svg', {
    draw: function(cxt){
        cxt.translate(1,1);
        cxt.lineWidth = 2;
        cxt.strokeStyle="#555";
        cxt.fillStyle="#FFF";
        cxt.beginPath();
        cxt.moveTo(0, 0);
        cxt.lineTo(20, 0);
        cxt.moveTo(10, 20);
        cxt.lineTo(10, 0);
        cxt.lineTo(0, 20);
        cxt.lineTo(20, 20);
        cxt.lineTo(10, 0);
        cxt.fill();
        cxt.stroke();
    }
});
Q.registerImage('Ground.svg', {
    draw: function(cxt){
        cxt.translate(1,1);
        cxt.lineWidth = 2;
        cxt.strokeStyle="#555";
        cxt.beginPath();
        cxt.moveTo(0, 0);
        cxt.lineTo(30, 0);
        cxt.moveTo(5, 5);
        cxt.lineTo(25, 5);
        cxt.moveTo(10, 10);
        cxt.lineTo(20, 10);
        cxt.stroke();
    }
});
Q.registerImage('Source.svg', {
    draw: function(cxt){
        cxt.translate(1,1);
        cxt.strokeStyle="#555";
        cxt.fillStyle = '#FFF';
        cxt.lineWidth = 2;
        cxt.beginPath();
        cxt.arc(30,30,30,0,Math.PI*2,true);
        cxt.closePath();
        cxt.stroke();
        cxt.fill();
        cxt.beginPath();
        cxt.moveTo(20, 10);
        cxt.lineTo(20 + 5, 10 + 10);
        cxt.lineTo(20 + 10, 10);
        cxt.stroke();
    }
});
Q.registerImage('Rect.svg', {
    draw: function(cxt){
        cxt.fillStyle="#555";
        cxt.lineWidth = 2;
        cxt.beginPath();
        cxt.rect(0,0,50, 5);
        cxt.closePath();
        cxt.fill();
    }
});

Q.registerImage('Transistor.svg', {
    draw: function(cxt){
        cxt.strokeStyle="#555";
        cxt.lineWidth = 2;
        cxt.beginPath();
        cxt.moveTo(0, 10);
        cxt.lineTo(5, 10);
        cxt.lineTo(16, 0);
        cxt.moveTo(5, 0);
        cxt.lineTo(5, 20);
        cxt.moveTo(5, 10);
        cxt.lineTo(15, 20);
        cxt.stroke();

        cxt.beginPath();
        cxt.strokeStyle="#555";
        cxt.fillStyle="#555";
        cxt.moveTo(15, 20);
        cxt.lineTo(14, 17);
        cxt.lineTo(12, 19);
        cxt.closePath();
        cxt.fill();
        cxt.stroke();
    }
})
var createJoinPoint = function(x, y){
    var point = graph.createNode(null, x, y);
    point.image = Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -3, -3, 6, 6);
    point.setStyle(Q.Styles.SHAPE_FILL_COLOR, '#555');
    point.setStyle(Q.Styles.SHAPE_STROKE, 0);
//        point.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#555');
    return point;
}

function createComponent(image, x, y, anchorPosition){
    var item = graph.createNode(null, x, y);
    if(anchorPosition){
        item.anchorPosition = anchorPosition;
    }
    item.image = image;
    item.busLayout = true;
    return item;
}
function createLine(from, to, type){
    var edge = graph.createEdge(from, to);
    edge.setStyle(Q.Styles.EDGE_WIDTH, 1);
    edge.setStyle(Q.Styles.ARROW_TO, false);
    if(type){
        edge.edgeType = type;
    }
    return edge;
}

var item1 = createComponent('Diode.svg', 0, 0);
var item2 = createComponent('Diode.svg', 0, 100);
var item3 = createComponent('Diode.svg', 100, 0);
var item4 = createComponent('Diode.svg', 100, 100);
var item5 = createComponent('Diode.svg', 200, 0);
var item6 = createComponent('Diode.svg', 200, 100);
var source = createComponent('Source.svg', -200, 50);
var item7 = createComponent('Transistor.svg', 301, 0, Q.Position.RIGHT_MIDDLE);
var item8 = createComponent('Transistor.svg', 301, 100, Q.Position.RIGHT_MIDDLE);

var rect1 = createComponent('Rect.svg', -100, 35);
var rect2 = createComponent('Rect.svg', -100, 50);
var rect3 = createComponent('Rect.svg', -100, 65);
rect1.busLayout = rect2.busLayout = rect3.busLayout = false;
var ground = createComponent('Ground.svg', -200, 200);
var joinPoint0 = createJoinPoint(0, 35);
var joinPoint1 = createJoinPoint(100, -50);
var joinPoint2 = createJoinPoint(100, 50);
var joinPoint3 = createJoinPoint(100, 150);
var joinPoint4 = createJoinPoint(200, -50);
var joinPoint5 = createJoinPoint(200, 65);
var joinPoint6 = createJoinPoint(200, 150);
var joinPoint7 = createJoinPoint(300, -50);
var joinPoint8 = createJoinPoint(300, 65);
var joinPoint9 = createJoinPoint(300, 150);

createLine(item1, joinPoint1, Q.Consts.EDGE_TYPE_VERTICAL_HORIZONTAL);
createLine(item2, joinPoint3, Q.Consts.EDGE_TYPE_VERTICAL_HORIZONTAL);
createLine(item1, joinPoint0);
createLine(joinPoint0, item2);

createLine(joinPoint1, item3);
createLine(item3, joinPoint2);
createLine(joinPoint2, item4);
createLine(item4, joinPoint3);

createLine(joinPoint4, item5);
createLine(item5, joinPoint5);
createLine(joinPoint5, item6);
createLine(item6, joinPoint6);
createLine(joinPoint1, joinPoint4);
createLine(joinPoint3, joinPoint6);

createLine(joinPoint7, item7).angle = Math.PI / 2;
createLine(item7, joinPoint8).angle = Math.PI / 2;
createLine(joinPoint8, item8).angle = Math.PI / 2;
createLine(item8, joinPoint9).angle = Math.PI / 2;
createLine(joinPoint4, joinPoint7);
createLine(joinPoint6, joinPoint9);

createLine(source, ground);
createLine(source, rect1).angle = 0;
createLine(source, rect2).angle = 0;
createLine(source, rect3).angle = 0;

createLine(rect1, joinPoint0);
createLine(rect2, joinPoint2);
createLine(rect3, joinPoint5);

graph.moveToCenter();
