/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
function ImageBackground(graph, options) {
    this.graph = graph;
    graph.delayedRendering = false;
    graph.background = this;
    graph.onPropertyChange('transform', this.update.bind(this));

    this.canvas = Q.createCanvas(graph.width, graph.height);
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0px';
    this.canvas.style['-webkit-user-select'] = 'none';
    this.canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

    graph.canvasPanel.insertBefore(this.canvas, graph.canvasPanel.firstChild);

    this._options = options;

    this.graph._getOverviewScaleInfo = function () {
        var elementBounds = this.bounds;
        if (this.background && this.background.bounds) {
            elementBounds = elementBounds.union(this.background.bounds);
        }
        if (!elementBounds.isEmpty()) {
            var xScale = this.width / elementBounds.width;
            var yScale = this.height / elementBounds.height;
            var scale = Math.max(xScale, yScale);
            scale = Math.max(this.minScale, Math.min(this.maxScale, scale));
            return {scale: scale, cx: elementBounds.cx, cy: elementBounds.cy};
        }
    }
    this.graph.zoomToOverview = function (byAnimate, maxScale) {
        return this.callLater(function () {
            var scaleInfo = this._getOverviewScaleInfo();
            if (scaleInfo) {
                if (maxScale) {
                    scaleInfo.scale = Math.min(scaleInfo.scale, maxScale);
                }
                this.centerTo(scaleInfo.cx, scaleInfo.cy, scaleInfo.scale, false);
            }
        }, this);
    }
}

ImageBackground.prototype = {
    update: function () {
        if (!this._imageTarget) {
            return;
        }
        //Q.callLater(function () {
            var image = this._imageTarget;
            var graph = this.graph;
            var canvas = this.canvas;

            canvas.width = graph.width;//clear canvas
            canvas.height = graph.height;//clear canvas

            var g = canvas.g;

            g.save();
            g.translate(graph.tx, graph.ty);
            g.scale(graph.scale, graph.scale);

            g.drawImage(image, 0, 0, image.width, image.height);

            g.restore();
        //}.bind(this));
    },
    _doTransform: function (g, scale, bounds) {
        g.translate(-scale * bounds.x, -scale * bounds.y);
        g.scale(scale, scale);
    },
    _onImageLoad: function (evt) {
        if (evt.target != this._imageTarget) {
            return;
        }
        this.bounds = new Q.Rect(0, 0, this._imageTarget.width, this._imageTarget.height);
        this.update();
        if (this._options && this._options.onload instanceof Function) {
            this._options.onload(this);
        }
    }
}

Object.defineProperties(ImageBackground.prototype, {
    image: {
        get: function () {
            return this._image;
        },
        set: function (v) {
            this._image = v;
            if (!v) {
                this._imageTarget = null;
                return;
            }
            var image = this._imageTarget = document.createElement('img');
            image.src = this._image;
            image.onload = this._onImageLoad.bind(this);
        }
    }
})


var graph = new Q.Graph('canvas');
graph.originAtCenter = false;

var background = new ImageBackground(graph, {
    onload: function () {
        loadDatas();
        graph.limitedBounds = background.bounds;
        graph.zoomToOverview();
    }
});

background.image = 'mapchart/map_background.jpg';

graph.styles = {
    //'shadow.color': '#555',
    //'shadow.blur': 2,
    'arrow.to': false,
    'shape.fill.gradient': new Q.Gradient(Q.Consts.GRADIENT_TYPE_RADIAL, [Q.toColor(0x55DDDDDD), Q.toColor(0x55777777), Q.toColor(0x55C0C0C0), Q.toColor(0x55555555)], [0, 0.6, 0.8, 1]),
    'shape.stroke': 0.5,
    'shape.stroke.style': '#000'
}

function loadDatas(){
    var nodes = [];
    function createNode(x, y) {
        var node = graph.createNode(null, x, y);
        node.image = Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -20, -20, 40, 40);
        node.putStyles({
            'shadow.color': '#0FF',
            'shadow.blur': 5,
        })
        node.setStyle(Q.Styles.SHAPE_FILL_COLOR, Q.randomColor());
        nodes.push(node);
        return node;
    }
    function createEdge(from, to) {
        var edge = graph.createEdge(from, to);
        return edge;
    }

    createNode(254, 304);
    createNode(1303, 533);
    createNode(1456, 493);
    createNode(1386, 481);
    createNode(1509, 1096);
    createNode(383, 1125);
    createNode(536, 569);
    createNode(905, 656);
    createNode(573, 199);
    createNode(635, 508);
    createNode(150, 255);
    createNode(181, 321);
    createNode(446, 601);

    nodes.forEach(function(node, index){
        for(var ii = index + 1; ii < nodes.length; ii++){
            createEdge(node, nodes[ii])
        }
    })
}