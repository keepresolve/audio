/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
function MagnifyingInteraction(graph){
    this.graph = graph;
    this.topCanvas = graph.topCanvas;
}
MagnifyingInteraction.prototype = {
    onstart: function(evt, graph){
        this._addDrawable();
        this.ondrag(evt, graph);
    },
    onrelease: function(){
        this._removeDrawable();
        this.currentPoint = null;
    },
    ondrag: function(evt, graph){
        this.currentPoint = graph.toLogical(evt);
        this.topCanvas.invalidate();
    },
    _removeDrawable: function () {
        if (this._id) {
            this.topCanvas.removeDrawable(this._id);
            delete this._id;
            this.topCanvas.invalidate();
        }
    },
    _addDrawable: function () {
        if (this._id && this.topCanvas.contains(this._id)) {
            return;
        }
        this._id = this.topCanvas.addDrawable(this.draw, this).id;
        this.topCanvas.invalidate();
    },
    scale: 2,
    draw: function (g, scale) {
        if(!this.currentPoint){
            return;
        }
        var xy = this.currentPoint;
        var graph = this.graph;
        var size = 200;
        var ratio =  graph.ratio || 1;
        var scale = Math.min(graph.maxScale, graph.scale * this.scale);
        size /= scale;
        var renderScale = scale * ratio;
        var clipBounds = new Q.Rect(xy.x - size * 0.5, xy.y - size * 0.5, size, size)
        var imageInfo = graph.exportImage(renderScale, clipBounds);
        g.save();
        g.translate(xy.x, xy.y);
        g.scale(1 / graph.scale / ratio, 1 / graph.scale / ratio);
        g.fillStyle = '#FFF';
        g.strokeStyle = '#fcfb9b';
        g.lineWidth = 10;
        g.beginPath();
        // var x = -imageInfo.width / 2, y = -imageInfo.height / 2, width = imageInfo.width, height = imageInfo.height;
        // g.rect(x, y, width, height);
        g.arc(0, 0, imageInfo.width / 2, 0, 2 * Math.PI, false);
        g.stroke();
        g.clip();
        g.fill();
        g.drawImage(imageInfo.canvas, -imageInfo.width / 2, -imageInfo.height / 2)
        g.restore()
    }
}
Q.Defaults.registerInteractions('magnifying', [MagnifyingInteraction, Q.WheelZoomInteraction, Q.DoubleClickInteraction, Q.TooltipInteraction])

var graph = new Q.Graph('canvas');
graph.interactionMode = 'magnifying';

var TableUI = function (data) {
    Q.doSuperConstructor(this, TableUI, arguments);
}
TableUI.prototype = {
    cellWidth: 80,
    cellHeight: 25,
    measure: function () {
        if (!this.data) {
            this.setMeasuredBounds(0, 0);
            return;
        }
        var width = 0, height = 0;
        if (this.data.header) {
            height += this.cellHeight;
            width = this.data.header.length * this.cellWidth;
        }
        if (this.data.data && this.data.data.length) {
            var rows = this.data.data.length;
            height += rows * this.cellHeight;
            if (!width) {
                width = this.data.data[0].length * this.cellWidth;
            }
        }
        this.setMeasuredBounds(width, height);
    },
    drawCell: function (g, x, y, background, align, color, content) {
        var text;
        if (content instanceof Object && !Q.isString(content)) {
            text = '' + content.text;
            color = content.color || color;
            align = content.align || align;
        } else {
            text = '' + content;
        }
        var cellWidth = this.cellWidth, cellHeight = this.cellHeight;
        if (background) {
            g.fillStyle = background;
            g.fillRect(x, y, cellWidth, cellHeight);
            g.strokeStyle = '#FFF';
            g.strokeRect(x, y, cellWidth, cellHeight);
        }
        if (align) {
            if(align == 'center'){
                x += cellWidth / 2;
            }else if(align == 'right'){
                x += cellWidth;
            }
            g.textAlign = align;
        }
        g.textBaseline = 'middle';
        g.fillStyle = color;
        g.fillText(text, x, y + cellHeight / 2);
    },
    draw: function (g, scale, selected) {
        if (!this.data) {
            return;
        }
        g.fillStyle = '#EEE';
        g.fillRect(0, 0, this.originalBounds.width, this.originalBounds.height);

        var header = this.data.header;
        var data = this.data.data;

        var x = 0, y = 0;
        var cellWidth = this.cellWidth, cellHeight = this.cellHeight;
        if (header) {
            header.forEach(function (name) {
                this.drawCell(g, x, y, '#597EB5', 'center', '#FFF', name);
                x += cellWidth;
            }.bind(this))
            y+= cellHeight;
        }
        if(data){
            data.forEach(function(row, index){
                x = 0;
                var background = index % 2 ? '#EAEDF4' : '#CAD0DF';
                row.forEach(function (name) {
                    this.drawCell(g, x, y, background, 'center', '#555', name);
                    x += cellWidth;
                }.bind(this))
                y+= cellHeight;
            }.bind(this));
        }
    }
}
Q.extend(TableUI, Q.BaseUI);
var hello = graph.createNode("Hello", -100, -50);
hello.image = Q.Graphs.server;
var tableUI = new TableUI();
tableUI.position = Q.Position.CENTER_TOP;
tableUI.anchorPosition = Q.Position.CENTER_BOTTOM;
tableUI.offsetY = -10;
tableUI.showPointer = true;
tableUI.backgroundColor = '#EAEDF4';
tableUI.borderRadius = 0;
hello.addUI(tableUI, {
    property: 'tableData',
    propertyType: Q.Consts.PROPERTY_TYPE_CLIENT,
    bindingProperty: "data"
})
hello.tableUI = tableUI;
hello.set('tableData', {
    header: ['ID', 'Project', 'Value'], data: [
        ['1', 'Temperature', {text: '24°C', color: '#FF0'}],
        ['2', 'Humidity', {text: '56%', color: '#F00'}],
        ['3', 'Air Volume', '52.0CMH'],
    ]
});
var qunee = graph.createNode("Qunee", 100, 50);
var edge = graph.createEdge("Hello\nQunee", hello, qunee);