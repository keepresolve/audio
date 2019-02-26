/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}

var graph = new Q.Graph('canvas');

function ExpandableNode() {
    Q.doSuperConstructor(this, ExpandableNode, arguments);
    this.size = {width: 25};
    this.setStyle(Q.Styles.LABEL_ON_TOP, true);
    this._invalidateExpandedStatus();
}

var LOAD_STATUS_PENDING = 'pending';
var LOAD_STATUS_LOADING = 'loading';
var LOAD_STATUS_LOADED = 'loaded';
var LOAD_STATUS_ERROR = 'error';

ExpandableNode.prototype = {
    $expanded: false,
    loadable: true,
    _loadStatus: LOAD_STATUS_PENDING,
    _setLoadStatus: function (v) {
        if (this._loadStatus == v) {
            return;
        }
        this._loadStatus = v;
        this._invalidateExpandedStatus();

    },
    _canLoad: function () {
        return this.loadable && (this.loadStatus == LOAD_STATUS_PENDING || this.loadStatus == LOAD_STATUS_ERROR);
    },
    _loadData: function (callback) {
        this.loadStatus = LOAD_STATUS_LOADING;
        this._doLoadData(function () {
            this.loadStatus = LOAD_STATUS_LOADED;
            if (callback) {
                callback();
            }
        }.bind(this), function () {
            this.expanded = false;
            this.loadStatus = LOAD_STATUS_ERROR;
        }.bind(this))
    },
    _doLoadData: function (onSuccess, onError) {
        var nodeWidth;
        if (this.size && this.size.width) {
            nodeWidth = this.size.width - 8;
        } else {
            nodeWidth = 30;
        }
        setTimeout(function () {
            if(nodeWidth < 50 && Q.randomInt(10) > 8){
                onError();
                return;
            }
            var i = 3 + Q.randomInt(5);
            while (i-- > 0) {
                var node = createNode('C-' + i, this);
                node.size = {width: nodeWidth}
                node.loadable = nodeWidth > 20 && Q.randomBool();
            }
            onSuccess();
        }.bind(this), 1000)
    },
    onChildAdd: function (child, index) {
        this._invalidateExpandedStatus();
    },
    onChildRemove: function (child) {
        this._invalidateExpandedStatus();
    },
    getExpandImage: function () {
        var hasChildren = this.hasChildren();
        var expanded = this.expanded;
        var loadStatus = this.loadStatus;
        if (!this.loadable || loadStatus == LOAD_STATUS_LOADED) {
            if (!hasChildren) {
                return null;
            }
            return expanded ? 'collapse.svg' : 'expand.svg';
        }
        if (loadStatus == LOAD_STATUS_PENDING) {
            return 'pending.svg';
        }
        if (loadStatus == LOAD_STATUS_LOADING) {
            return 'loading.svg';
        }
        if (loadStatus == LOAD_STATUS_ERROR) {
            return 'error.svg';
        }
        return null;
    },
    checkChildrenVisibilty: function () {
        function checkChildren() {
            var visible = this.visible !== false && this.expanded;
            this.forEachChild(function (child) {
                child.visible = visible;
                checkChildren.call(child);
            })
        }

        checkChildren.call(this)
    },
    _findExpandHandler: function(){
        if(this.expandHandler){
            return this.expandHandler;
        }
        if(this.bindingUIs){
            var result;
            this.bindingUIs.forEach(function(ui){
                ui = ui.ui;
                Q.log(ui.name)
                if(ui.name == 'expandHandler'){
                    result = ui;
                    return false;
                }
            })
            return this.expandHandler = result;
        }
        return null;
    },
    _validateExpandedStatus: function (callback) {
        this.$expandedInvalidateFlag = false;

        if (this.expanded && this._canLoad()) {
            this._loadData(callback);
            callback = null;
        }
        var icon = this.getExpandImage();
        var expandHandler = this._findExpandHandler();

        if (!icon) {
            if (expandHandler) {
                expandHandler.visible = false;
                this.invalidate();
            }
            return;
        }
        if (!expandHandler) {
            expandHandler = new Q.ImageUI();
            expandHandler.shadowBlur = 3;
            expandHandler.shadowColor = '#888'
            expandHandler.position = Q.Position.RIGHT_TOP;
            expandHandler.anchorPosition = Q.Position.LEFT_TOP;
            expandHandler.offsetX = -10;
            expandHandler.fontSize = 11;
            expandHandler.showOnTop = true;
            expandHandler.name = 'expandHandler';
            this.expandHandler = expandHandler;
            this.addUI(expandHandler);
        }
        expandHandler.data = icon;
        expandHandler.visible = true;
        this.checkChildrenVisibilty();
        this.invalidate();
        if (callback) {
            callback();
        }
    },
    _invalidateExpandedStatus: function (callback) {
        if (this.$expandedInvalidateFlag) {
            return;
        }
        this.$expandedInvalidateFlag = true;
        Q.nextFrame(this._validateExpandedStatus.bind(this, callback))
    },
    setExpandedAndLoad: function (expanded, callback) {
        if (this.expanded == expanded) {
            return;
        }
        var old = this.$expanded;
        this.$expanded = expanded;
        this.onEvent(new Q.PropertyChangeEvent(this, "expanded", expanded, old));
        this._invalidateExpandedStatus(callback);
    }
}
Q.extend(ExpandableNode, Q.Node);
Object.defineProperties(ExpandableNode.prototype, {
    loadStatus: {
        get: function () {
            return this._loadStatus;
        },
        set: function (v) {
            this._setLoadStatus(v);
        }
    },
    expanded: {
        get: function () {
            return this.$expanded;
        },
        set: function (v) {
            this.setExpandedAndLoad(v);
        }
    },
    visible: {
        get: function () {
            return this._visible !== false;
        },
        set: function (v) {
            if (this.visible === v) {
                return;
            }
            this._visible = v;
            this.invalidateVisibility();
            this.invalidate();
        }
    }
})

if(Q.loadClassPath){
    Q.ExpandableNode = ExpandableNode;
    Q.loadClassPath(ExpandableNode, 'Q.ExpandableNode');
    ExpandableNode.prototype.addOutProperty('visible');
    ExpandableNode.prototype.addOutProperty('loadStatus');
    ExpandableNode.prototype.addOutProperty('expanded');
}

graph.onclick = function (evt) {
    var data = evt.getData();
    if (data instanceof ExpandableNode) {
        var target = graph.hitTest(evt);
        if (target && target.name == 'expandHandler') {
            var oldLocation = {x: data.x, y: data.y};
            data.setExpandedAndLoad(!data.expanded, function () {
                doLayout({
                    callback: function () {
                        var dx = data.x - oldLocation.x;
                        var dy = data.y - oldLocation.y;
                        dx *= graph.scale;
                        dy *= graph.scale;
                        graph.translate(-dx, -dy, false)
                    }
                })
            });
        }
    }
}

function createNode(name, from, edgeType) {
    var node = new ExpandableNode(name);
    node.size = {width: 30}
    graph.addElement(node);
    if (from) {
        node.parent = node.host = from;
        var edge = createEdge(from, node);
        edge.edgeType = edgeType || Q.Consts.EDGE_TYPE_HORIZONTAL_VERTICAL;
    }
    return node;
}

function createEdge(from, to) {
    var edge = graph.createEdge(from, to);
    return edge;
}

var root = createNode('Root');
root.size = {width: 50}
root.parentChildrenDirection = Q.Consts.DIRECTION_BOTTOM_RIGHT;
root.hGap = 30;

var layouter = new Q.TreeLayouter(graph);
layouter.hGap = 10;
layouter.vGap = 20;

function doLayout(options) {
    layouter.doLayout(options)
}

doLayout({
    callback: function () {
        graph.moveToCenter()
    }
})