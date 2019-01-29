function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("image", ev.target.getAttribute("image"));
  ev.dataTransfer.setData("type", ev.target.getAttribute("type"));
  ev.dataTransfer.setData("label", ev.target.getAttribute("label"));
}

function drop(ev) {
  //   ev.preventDefault();
  //   debugger;
  //   var image = ev.dataTransfer.getData("image");
  //   var type = ev.dataTransfer.getData("type");
  //   var label = ev.dataTransfer.getData("label");
  //   var xy = graph.globalToLocal(ev);
  //   xy = graph.toLogical(xy.x, xy.y);
  //   if (type == "Node") {
  //     var node = graph.createNode(label, xy.x, xy.y);
  //     if (image) {
  //       if (image.indexOf(".") < 0) {
  //         image = Q.Graphs[image];
  //       }
  //       node.image = image;
  //     }
  //   }
}
function FlexEdgeUI(edge, graph) {
  Q.doSuperConstructor(this, FlexEdgeUI, arguments);
}
FlexEdgeUI.prototype = {
  drawEdge: function(path, fromUI, toUI, edgeType, fromBounds, toBounds) {
    var from = fromBounds.center;
    var to = toBounds.center;
    var cx = (from.x + to.x) / 2;
    var cy = (from.y + to.y) / 2;
    path.curveTo(from.x, from.y, cx, to.y);
  }
};

Q.extend(FlexEdgeUI, Q.EdgeUI);

var CREATE_EDGE_MODE = "create.edge.mode";
function CreateEdgeInteraction(graph) {
  this.graph = graph;
  this.topCavans = graph.topCanvas;
}
CreateEdgeInteraction.prototype = {
  destroy: function(graph) {
    this.start = null;
    graph.cursor = null;
    if (this.drawLineId) {
      this.topCavans.removeDrawable(this.drawLineId);
      delete this.drawLineId;
      this.topCavans.invalidate();
    }
  },
  drawLine: function(g, scale) {
    var x = this.start.x;
    var y = this.start.y;
    g.moveTo(x, y);
    if (this.edgeClass == FlexEdgeUI) {
      var cx = (this.start.x + this.end.x) / 2;
      var cy = (this.start.y + this.end.y) / 2;
      g.bezierCurveTo(
        this.start.x,
        this.start.y,
        cx,
        this.end.y,
        this.end.x,
        this.end.y
      );
    } else {
      g.lineTo(this.end.x, this.end.y);
    }
    g.lineWidth = 3;
    g.strokeStyle = "#88F";
    g.stroke();
  },
  invalidate: function() {
    this.topCavans.invalidate();
  },
  startdrag: function(evt, graph) {
    var start = evt.getData();
    if (!(start instanceof Q.Node)) {
      return;
    }
    evt.responded = true;
    this.start = start;
    graph.cursor = "crosshair";
    this.drawLineId = this.topCavans.addDrawable(this.drawLine, this).id;
  },
  ondrag: function(evt, graph) {
    if (!this.start) {
      return;
    }
    Q.stopEvent(evt);
    this.end = graph.toLogical(evt);
    this.invalidate();
  },
  edgeClass: FlexEdgeUI,
  enddrag: function(evt, graph) {
    if (!this.start) {
      return;
    }
    graph.cursor = "";
    this.invalidate();
    var end = graph.getElementByMouseEvent(evt);
    if (end) {
      var edge = graph.createEdge(this.start, end);
      if (this.edgeClass) {
        edge.uiClass = this.edgeClass;
      }
    }
    this.destroy(graph);
  }
};
Q.Defaults.registerInteractions(CREATE_EDGE_MODE, [
  CreateEdgeInteraction,
  Q.PanInteraction
]);
function onCreateEdgeButtonClick(evt) {
  var target = evt.target;
  if (target.selected) {
    target.selected = false;
    target.className = "";
  } else {
    target.selected = true;
    target.className = "selected";
  }
  graph.interactionMode = target.selected
    ? CREATE_EDGE_MODE
    : Q.Consts.INTERACTION_MODE_DEFAULT;
}
function localToGlobal(x, y, canvas) {
  x += window.pageXOffset;
  y += window.pageYOffset;
  var clientRect = canvas.getBoundingClientRect();
  return { x: x + clientRect.left, y: y + clientRect.top };
}
var graph;
var labelEditor = new Q.LabelEditor();
window.onload = function init() {
  graph = new Q.Graph("canvas");
  graph.editable = true;
  graph.ondblclick = function(evt) {
    var element = graph.getElementByMouseEvent(evt);
    if (!element) {
      return;
    }
    var target = graph.hitTest(evt);
    if (!(target instanceof Q.LabelUI)) {
      return;
    }
    var xy;
    if (element instanceof Q.Node) {
      xy = graph.toCanvas(element.x, element.y);
      xy = localToGlobal(xy.x, xy.y, graph.html);
    } else {
      xy = getPageXY(evt);
    }
    labelEditor.startEdit(
      xy.x,
      xy.y,
      element.name,
      graph.getStyle(element, Q.Styles.LABEL_FONT_SIZE),
      function(text) {
        element.name = text;
      }
    );
  };
  graph.zoomToOverview();

  var hello = graph.createNode("Hello", -100, -50);
  var qunee = graph.createNode("Qunee", 100, 50);
  graph.createNode("Qunee", 200, 50);
  graph.createNode("Qunee", 100, 150);
};
