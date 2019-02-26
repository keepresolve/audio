/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
;(function (Q) {
    function Overview(html, graph) {
        this.html = html;
        this.canvas = Q.createCanvas(true);
        this.html.appendChild(this.canvas);
        new Q.DragSupport(this.canvas, this);
        this.setGraph(graph);
    }

    function globalToLocal(evt, div) {
        if (evt.touches) {
            if (evt.changedTouches && evt.changedTouches.length) {
                evt = evt.changedTouches[0];
            } else {
                evt = evt.touches[0];
            }
        }
        var clientRect = div.getBoundingClientRect();
        var x = evt.clientX || 0;
        var y = evt.clientY || 0;
        if (Q.isTouchSupport && Q.isSafari) {
            if (window.pageXOffset && x == evt.pageX) {
                x -= window.pageXOffset;
            }
            if (window.pageYOffset && y == evt.pageY) {
                y -= window.pageYOffset;
            }
        }
        return [x - clientRect.left, y - clientRect.top];
    }

    Overview.prototype = {
        canvas: null,
        html: null,
        setGraph: function (graph) {
            if (this.graph == graph) {
                return;
            }
            this._uninstall();
            this.graph = graph;
            this._install();
        },
        _install: function () {
            if (!this.graph) {
                return;
            }
            if (!this._onPropertyChanged) {
                this._onPropertyChanged = function (evt) {
                    var kind = evt.kind;
                    if (kind == 'element.bounds') {
                        this._invalidateGraph();
                        return;
                    }
                    if (kind == 'transform' || kind == 'viewport') {
                        this.invalidate();
                    }
                }.bind(this)
                this._onDataChanged = function (evt) {
                    this._invalidateGraph();
                }.bind(this)
            }
            this.graph.propertyChangeDispatcher.addListener(this._onPropertyChanged);
            this.graph.dataPropertyChangeDispatcher.addListener(this._onDataChanged);
            this.graph.listChangeDispatcher.addListener(this._onDataChanged);
            this._invalidateGraph(true);
        },
        _uninstall: function () {
            if (!this.graph || !this._onPropertyChanged) {
                return;
            }
            this.graph.propertyChangeDispatcher.removeListener(this._onPropertyChanged);
            this.graph.dataPropertyChangeDispatcher.removeListener(this._onDataChanged);
            this.graph.listChangeDispatcher.removeListener(this._onDataChanged);
            this.imageInfo = null;
            this.bounds = null;
            this.scale = null;
        },
        _toCanvas: function (x, y) {
            x = this.scale * (x - this.bounds.x);
            y = this.scale * (y - this.bounds.y);
            return [x, y]
        },
        _toGraph: function (evt) {
            var xy = globalToLocal(evt, this.html);
            var x = xy[0] / this.scale + this.bounds.x;
            var y = xy[1] / this.scale + this.bounds.y;
            return [x, y]
        },
        _validateGraph: function () {
            this._invalidateGraphFlag = false;
            if (!this.visible) {
                return;
            }
            var width = this.html.clientWidth, height = this.html.clientHeight;
            var bounds = new Q.Rect();
            bounds.add(this.graph.bounds);
            var imageScale = Math.min(width / bounds.width, height / bounds.height) * this.canvas.ratio;

            this.imageInfo = this.exportGraphImage(imageScale, bounds);

            this.imageInfo.scale = imageScale;
            this.imageInfo.bounds = bounds;

            this.invalidate();
        },
        exportGraphImage: function (scale, bounds) {
            return this.graph.exportImage(scale, bounds);
        },
        _invalidateGraphFlag: false,
        _invalidateGraph: function (force) {
            if (!this.graph || (!force && this._invalidateGraphFlag)) {
                return;
            }
            this._invalidateGraphFlag = true;
            this.graph.callLater(this._validateGraph, this, force ? 100 : 1000);
        },
        invalidate: function (force) {
            if (!force && this._invalidateFlag) {
                return;
            }
            this._invalidateFlag = true;
            setTimeout(this.validate.bind(this));
        },
        validate: function () {
            this._invalidateFlag = false;
            var imageInfo = this.imageInfo;
            if (!imageInfo) {
                return;
            }
            var viewportBounds = this.graph.viewportBounds;
            if (!viewportBounds.height || !viewportBounds.width) {
                return;
            }

            var canvas = this.canvas;
            var ratio = canvas.ratio;
            var g = canvas.getContext('2d');
            var width = this.html.clientWidth, height = this.html.clientHeight;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            g.scale(ratio, ratio);

            var bounds = new Q.Rect(imageInfo.bounds);
            bounds.add(viewportBounds);
            var scale = Math.min(width / bounds.width, height / bounds.height);
            this.scale = scale;

            var offsetX = (width / scale - bounds.width) / 2;
            var offsetY = (height / scale - bounds.height) / 2;
            bounds.x -= offsetX;
            bounds.y -= offsetY;
            bounds.width = width / scale;
            bounds.height = height / scale;
            this.bounds = bounds;

            g.save();
            var xy = this._toCanvas(imageInfo.bounds.x, imageInfo.bounds.y);
            g.translate(xy[0], xy[1]);
            g.scale(scale / imageInfo.scale, scale / imageInfo.scale);
            g.drawImage(this.imageInfo.canvas, 0, 0);
            g.restore();

            g.beginPath();
            g.moveTo(0, 0);
            g.lineTo(canvas.width, 0);
            g.lineTo(canvas.width, canvas.height);
            g.lineTo(0, canvas.height);
            g.lineTo(0, 0);

            xy = this._toCanvas(viewportBounds.x, viewportBounds.y);
            var x = xy[0];
            var y = xy[1];
            var width = viewportBounds.width * scale;
            var height = viewportBounds.height * scale;


            g.moveTo(x, y);
            g.lineTo(x, y + height);
            g.lineTo(x + width, y + height);
            g.lineTo(x + width, y);
            g.closePath();
            g.fillStyle = "rgba(30, 30, 30, 0.3)";
            g.fill();
            g.lineWidth = 0.5;
            g.strokeStyle = '#333';
            g.strokeRect(x, y, width, height)
        },
        accept: function () {
            return this.graph != null;
        },
        startdrag: function (evt) {
            this.enddrag();
            if (!this.scale) {
                return;
            }
            var xy = this._toGraph(evt);
            var viewport = this.graph.viewportBounds;
            if (viewport.contains(xy[0], xy[1])) {
                this._dragInfo = {
                    scale: this.scale / this.graph.scale,
                    point: xy
                };
                this.graph.stopAnimation()
            }
        },
        ondrag: function (evt) {
            if (!this._dragInfo) {
                return;
            }
            var scale = this._dragInfo.scale;
            var dx = evt.dx;
            var dy = evt.dy;
            dx /= scale;
            dy /= scale;
            this.graph.translate(-dx, -dy, false)
        },
        enddrag: function () {
            this._dragInfo = null;
        },
        onstart: function (evt) {
            Q.stopEvent(evt);
            var xy = this._toGraph(evt);
            this.graph.centerTo(xy[0], xy[1])
        },
        onmousewheel: function (evt) {
            Q.stopEvent(evt);
            var xy = this._toGraph(evt);
            xy = this.graph.toCanvas(xy[0], xy[1]);
            this.graph.zoomAt(Math.pow(this.graph.scaleStep, evt.delta), xy.x, xy.y);
        },
        ondblclick: function (evt) {
            var graph = this.graph;
            if (graph.enableDoubleClickToOverview) {
                var resetScale = graph.resetScale || 1;
                if (Math.abs(graph.scale - resetScale) < 0.001) {
                    graph.zoomToOverview();
                } else {
                    graph.moveToCenter(resetScale)
                }
            }
        },
        visible: true,
        setVisible: function (visible) {
            this.visible = visible;
            if (visible) {
                this.html.style.display = 'block';
            } else {
                this.html.style.display = 'none';
            }
            this._invalidateGraph();
        }
    }
    Q.Overview = Overview;
})(Q);
