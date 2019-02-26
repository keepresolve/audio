/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
function drawCircle(path, r, x, y) {
    var c = r * Math.tan(Math.PI / 8);
    var d = r * Math.sin(Math.PI / 4);
    path.moveTo(x + r, y);
    path.quadTo(x + r, y + c, x + d, y + d);
    path.quadTo(x + c, y + r, x, y + r);
    path.quadTo(x - c, y + r, x - d, y + d);
    path.quadTo(x - r, y + c, x - r, y);
    path.quadTo(x - r, y - c, x - d, y - d);
    path.quadTo(x - c, y - r, x, y - r);
    path.quadTo(x + c, y - r, x + d, y - d);
    path.quadTo(x + r, y - c, x + r, y);
}

function Circle(x, y, radius, fillColor){
    Q.doSuperConstructor(this, Circle);
    this.setLocation(x, y);
    this.anchorPosition = Q.Position.CENTER_MIDDLE;
    this.setStyle(Q.Styles.LABEL_POSITION, Q.Position.CENTER_MIDDLE);
    this.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_MIDDLE);
    this.setStyle(Q.Styles.LABEL_FONT_SIZE, 10);
    this.setStyle(Q.Styles.SHAPE_FILL_COLOR, fillColor);
    this.radius = radius;
}
Circle.prototype = {
    _radius: 25,
    setColor: function(color){
        this.setStyle(Q.Styles.SHAPE_FILL_COLOR, color);
    },
    update: function(){
        var radius = this._radius;
        var path = new Q.Path();
        drawCircle(path, radius, 0, 0);
        this.image = path;
    }
}
Q.extend(Circle, Q.Node);
Object.defineProperties(Circle.prototype, {
    radius: {
        get: function(){
            return this._radius;
        },
        set: function(v){
            if(this.v == this._radius){
                return;
            }
            this._radius = v;
            this.update();
        }
    }
})

function createCircle(name, parent, cx, cy, radius, color){
    var child = new Circle(cx, cy, radius, color || '#FFF');
    child.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#555');
    child.name = name;
    child.host = child.parent = parent;
    return child;
}

function Fiber(name, x, y){
    Q.doSuperConstructor(this, Fiber, arguments);
    this.anchorPosition = Q.Position.LEFT_TOP;
    this.setStyle(Q.Styles.SHAPE_FILL_COLOR, '#FFF');
    this.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#555');
    this.setStyle(Q.Styles.LABEL_FONT_SIZE, 20);
    this.setStyle(Q.Styles.LABEL_POSITION, Q.Position.CENTER_MIDDLE);
    this.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_BOTTOM);
    this.update();
}
Fiber.prototype = {
    radius: 100,
    coreRadius: 25,
    gap: 120,
    coreCount: 8,
    head: null,
    tail: null,
    getCore: function(isHead, id){
        return isHead ? this.head.cores[id] : this.tail.cores[id];
    },
    _createFiber: function(cx, cy, color){
        var radius = this.radius;
        var coreRadius = this.coreRadius;
        cx += this.x;
        cy += this.y;

        var fiber = createCircle(null, this, cx, cy, radius, color);
        fiber.movable = false;
        var cores = fiber.cores = {};
        var coreCount = this.coreCount;
        var i = 1;
        if(coreCount > 1){
            var angle = -Math.PI / 2;
            var preAngle = 2 * Math.PI / (coreCount - 1);
            var r = radius - coreRadius - 10;
            while(i < coreCount){
                var x = Math.cos(angle) * r;
                var y = Math.sin(angle) * r;
                createCircle('' + i, fiber, cx + x, cy + y, coreRadius).movable = false;;
                i++;
                angle += preAngle;
            }
        }
        createCircle('' + i, fiber, cx, cy, coreRadius).movable = false;;
        fiber.forEachChild(function(child){
            cores[child.name] = child;
        })
        return fiber;
    },
    update: function(){
        var radius = this.radius;
        var cx = radius;
        var cy = radius;
        var gap = this.gap;
        var path = new Q.Path();
        drawCircle(path, radius, cx, cy);
        this.head = this._createFiber(cx, cy, '#FFF');
        cx += radius + radius + gap;
        drawCircle(path, radius, cx, cy);
        this.tail = this._createFiber(cx, cy, '#CCC');
        path.moveTo(radius, 0);
        path.lineTo(cx, 0);
        path.lineTo(cx, radius + radius);
        path.lineTo(radius, radius + radius);
        path.closePath();
        this.image = path;
    }
}
Q.extend(Fiber, Q.Node);

function Rack(name, x, y){
    Q.doSuperConstructor(this, Rack, arguments);
    this.anchorPosition = Q.Position.LEFT_TOP;
    this.setStyle(Q.Styles.SHAPE_FILL_COLOR, '#FFF');
    this.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#555');
    this.setStyle(Q.Styles.LABEL_FONT_SIZE, 20);

    this._update();
}
Rack.prototype = {
    RTUs: null,
    getRTU: function(id){
        return this.RTUs[id];
    },
    _update: function(){
        this.RTUs = {};
        var rows = 3;
        var columns = 12;
        var gap = 40;
        var width = (columns + 1) * gap;
        var height = (rows + 1) * gap;
        this.image = new Q.Path();
        this.image.lineTo(width, 0);
        this.image.lineTo(width, height);
        this.image.lineTo(0, height);
        this.image.closePath();

        var x = this.x, y = this.y;
        var radius = 14;
        var row = 0;
        var cy = y + gap;
        var i = 0;
        while(row < rows){
            var column = 0;
            var cx = x + gap;
            while(column < columns){
                var RTU = createCircle(null, this, cx, cy, radius, '#FFF');
                RTU.row = row;
                RTU.column = column;
                this.RTUs[i++] = RTU;
                cx += gap;
                column++;
            }
            cy += gap;
            row++;
        }
    }
}

Q.extend(Rack, Q.Node);

var graph = new Q.Graph('canvas');
graph.originAtCenter = false;

graph.createFiber = function(name, x, y){
    var fiber = new Fiber(name, x, y);
    this.addElement(fiber, true);
    return fiber;
}
graph.createFlexEdge = function(name, from, to){
    var edge = this.createEdge(name, from, to);
    edge.setStyle(Q.Styles.ARROW_TO, false);
    edge.setStyle(Q.Styles.EDGE_FROM_AT_EDGE, false);
    edge.setStyle(Q.Styles.EDGE_TO_AT_EDGE, false);
    edge.setStyle(Q.Styles.SHADOW_BLUR, 5);
    edge.setStyle(Q.Styles.SHADOW_COLOR, '#000');
    edge.zIndex = 10;
    from = edge.from;
    to = edge.to;
    var cx = (from.x + to.x) / 2;
    var cy = (from.y + to.y) / 2;
    var dx = from.x - to.x, dy = from.y - to.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    distance = Math.min(30, distance * 0.2);
    if(angle > 0){
        distance = -distance;
    }
    var cos = Math.cos(angle) * distance;
    var sin = Math.sin(angle) * distance;

    edge.addPathSegment([cx - cos, cy + sin, cx + cos, cy - sin], Q.Consts.SEGMENT_CURVE_TO);

    return edge;
}

var hello = graph.createFiber("Fiber\nBundle", 100, 10);
hello.getCore(true, 1).setColor('#CCF');
hello.getCore(true, 2).setColor('#CCF');
hello.getCore(true, 3).setColor('#CCF');
hello.getCore(false, 1).setColor('#CCF');
hello.getCore(false, 2).setColor('#CCF');
hello.getCore(false, 3).setColor('#CCF');

var rack = new Rack('Rack', 100, 350);
graph.addElement(rack, true);
rack.getRTU(1).setColor('#FAA');

graph.createFlexEdge(hello.getCore(true, 1), rack.getRTU(5));
graph.createFlexEdge(hello.getCore(false, 1), rack.getRTU(1)).setStyle(Q.Styles.EDGE_COLOR, '#4AC');