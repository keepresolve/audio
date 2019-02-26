/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
function RectElement(x, y, width, height){
    Q.doSuperConstructor(this, RectElement);
    this.image = null;
    this.anchorPosition = Q.Position.LEFT_TOP;
    this.setStyle(Q.Styles.SHAPE_FILL_COLOR, "#EEE");
    this.setStyle(Q.Styles.SHAPE_STROKE, 1);
    this.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#555');
    this.setStyle(Q.Styles.LABEL_PADDING, 5);

    this.setBounds(x, y, width, height);
}
RectElement.prototype = {
    setBounds: function(x, y, width, height, relativeParent){
        if(Q.isNumber(x) && Q.isNumber(y)){
            if(this.parent && relativeParent){
                x += this.parent.x || 0;
                y += this.parent.y || 0;
            }
            this.location = {x: x, y: y};
        }
        if(Q.isNumber(width) && Q.isNumber(height)){
            this.size = {width: width, height: height};
        }
    },
    onSizeChanged: function(){

    }
}
Q.extend(RectElement, Q.Node);
Object.defineProperties(RectElement.prototype, {
    size: {
        set: function(v){
            if(this._size == v){
                return;
            }
            this._size = v;
            this.image = Q.Shapes.getRect(0, 0, v.width, v.height);
            this.onSizeChanged();
        }
    }
})

function Equipment(x, y, width, height){
    Q.doSuperConstructor(this, Equipment, arguments);
    this.movable = false;
}
Equipment.prototype = {
    layoutBounds: null,
    padding: 1,
    row: 1,
    column: 1,
    childMargin: 0,
    getContentBounds: function(){
        var bounds;
        if(this.layoutBounds){
            bounds = new Q.Rect(this.layoutBounds);
        }else{
            bounds = new Q.Rect(0,0,this._size.width, this._size.height);
        }
        if(this.padding){
            bounds.shrink(this.padding);
        }
        return bounds;
    },
    onSizeChanged: function(){
        this.invalidateSize();
    },
    invalidateSize: function(){
        if(this._invalidateFlag){
            return;
        }
        this._invalidateFlag = true;
        // setTimeout(this.validateSize.bind(this), 200)
        Q.nextFrame(this.validateSize.bind(this));

    },
    validateSize: function(){
        this._invalidateFlag = false;
        if(this.hasChildren()){
            this.layoutChildren();
        }
    },
    setChildBounds: function(child, x, y, cellWidth, cellHeight){
        if(this.childMargin){
            var bounds = new Q.Rect(x, y, cellWidth, cellHeight);
            bounds.shrink(this.childMargin);
            child.setBounds(bounds.x, bounds.y, bounds.width, bounds.height, true);
            return;
        }
        child.setBounds(x, y, cellWidth, cellHeight, true);
    },
    layoutChildren: function(){
        var bounds = this.getContentBounds();
        var row = this.row || 1, column = this.column || 1;
        var cellWidth = bounds.width / column;
        var cellHeight = bounds.height / row;
        var startX = bounds.x, startY = bounds.y;

        this.forEachChild(function(child){
            var childRow = child.rowIndex;
            var childColumn = child.columnIndex;
            var rowSpan = child.rowSpan || 1;
            var columnSpan = child.columnSpan || 1;
            if(isNaN(childRow) && isNaN(childColumn) && Q.isNumber(child.index)){
                var index = child.index;
                childRow = index / column | 0;
                childColumn = index % column;
            }else{
                childRow = childRow || 0;
                childColumn = childColumn || 0;
            }
            this.setChildBounds(child, startX + childColumn * cellWidth, startY + childRow * cellHeight, cellWidth * columnSpan, cellHeight * rowSpan);
        }, this)
    },
    /**
     * 2 X 3, child node index
     * 0,  1,  2
     * 3,  4,  5
     * @param index
     * @param info
     * @returns {Equipment}
     */
    createChild: function(index, info){
        var child = new Equipment();
        child.index = index;
        child.info = info;
        child.parent = child.host = this;
        return child;
    },
    findChild: function(index){
        var result;
        this.forEachChild(function(child){
            if(child.index == index){
                result = child;
                return false;
            }
        })
        return result;
    }
}
Q.extend(Equipment, RectElement);

var graph = new Q.Graph(canvas);
graph.getTooltip = function(element){
    if(element.tooltip){
        return element.tooltip;
    }
    var tooltip = element.name || '';
    if(element.index !== undefined){
        if(tooltip){
            tooltip += ' - ';
        }
        tooltip += '' + element.index;
    }
    return tooltip;
}
graph.editable = true;

function createRack(name){
    var rack = new Equipment();
    rack.setStyle(Q.Styles.LABEL_FONT_SIZE, 16);
    rack.setStyle(Q.Styles.LABEL_FONT_STYLE, 'bold');
    rack.name = name;
    rack.row = 1;
    rack.column = 8;
    rack.padding = 5;
    return rack;
}

function createCard(rack, index, name, info){
    var card = rack.createChild(index, info);
    card.name = name;
    card.setStyle(Q.Styles.LABEL_POSITION, Q.Position.CENTER_TOP);
    card.padding = new Q.Insets(60, 5, 10, 5);
    card.row = 5;
    card.column = 2;
    card.childMargin = 5;
    return card;
}

function createPort(card, index, info){
    var port = card.createChild(index, info);
    port.row = 5;
    port.column = 2;
    return port;
}

var names = ['OTDR', 'OPM', 'OSW', 'OLP'];
var rack = createRack('OTDR Rack');
rack.column = 8;
var i = 0;
while(i < rack.column){
    var card = createCard(rack, i++, names[Q.randomInt(names.length)]);
    if(i == 3){
        card.columnSpan = 2;
        card.column = 4;
        i++;
    }
    var j = 0;
    while(j < 10){
        if(j > 4 || Q.randomBool()){
            createPort(card, j);
        }
        j++;
    }
}

rack.setBounds(10, 10, 600, 250);
graph.addElement(rack, true);
graph.editable = true;

graph.moveToCenter();

function createEdge(from, to){
    var edge = graph.createEdge(from, to);
    edge.uiClass = FlexEdgeUI2;
    edge.setStyle(Q.Styles.ARROW_TO, false);
    edge.zIndex = 10;
    edge.setStyle(Q.Styles.EDGE_FROM_AT_EDGE, false);
    edge.setStyle(Q.Styles.EDGE_TO_AT_EDGE, false);
}

createEdge(rack.findChild(0).findChild(5), rack.findChild(2).findChild(7));
createEdge(rack.findChild(2).findChild(8), rack.findChild(5).findChild(6));

function FlexEdgeUI2(edge, graph){
    Q.doSuperConstructor(this, FlexEdgeUI2, arguments);
}
FlexEdgeUI2.prototype = {
    drawEdge: function(path, fromUI, toUI, edgeType, fromBounds, toBounds){
        var from = fromBounds.center;
        var to = toBounds.center;
        var cx = (from.x + to.x) / 2;
        var dx = from.x - to.x, dy = from.y - to.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        path.quadTo(cx, from.y - distance / 4, to.x, to.y)
    }
}
Q.extend(FlexEdgeUI2, Q.EdgeUI);

if(Q.loadClassPath){
    Q.FlexEdgeUI2 = FlexEdgeUI2;
    Q.RectElement = RectElement;
    Q.Equipment = Equipment;
    Q.loadClassPath(RectElement, 'Q.RectElement');
    Q.loadClassPath(Equipment, 'Q.Equipment');
    Q.loadClassPath(Q.FlexEdgeUI2, 'Q.FlexEdgeUI2');
}