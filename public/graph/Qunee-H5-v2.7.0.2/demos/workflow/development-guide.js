/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
var graph = new Q.Graph(canvas);
graph.originAtCenter = false;

function createStep(label, x, y, title){
    var titleNode = graph.createText(title, x, y - 5);
    titleNode.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#1D4876");
    titleNode.setStyle(Q.Styles.LABEL_COLOR, "#FFF");
    titleNode.setStyle(Q.Styles.LABEL_PADDING, 5);
    titleNode.anchorPosition = Q.Position.LEFT_BOTTOM;
    var node = graph.createText(label, x, y);
    node.setStyle(Q.Styles.LABEL_BORDER, 1);
    node.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#FFF");
    node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#1D4876");
    node.setStyle(Q.Styles.LABEL_FONT_SIZE, 20);
    node.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(120, 50));
    node.anchorPosition = Q.Position.LEFT_TOP;

    titleNode.host = node;
    node.host = titleNode;
    return node;
}

function createEdge(from, to, lineWidth, dash){
    var edge = graph.createEdge(from, to);
    edge.setStyle(Q.Styles.EDGE_WIDTH, lineWidth || 3);
    edge.setStyle(Q.Styles.EDGE_COLOR, "#1D4876");
    if(dash){
        edge.setStyle(Q.Styles.EDGE_LINE_DASH, [10, 10]);
    }
    return edge;
}

var smallSteps = [];
function createSmallStep(label, x, y, parent){
    var node = graph.createText(label, x, y);
    node.setStyle(Q.Styles.LABEL_BORDER, 1);
    node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#1D4876");
    node.setStyle(Q.Styles.LABEL_FONT_SIZE, 16);
    node.setStyle(Q.Styles.LABEL_PADDING, 5);
    node.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(70, 35));
    node.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#FFF");
    node.anchorPosition = Q.Position.LEFT_TOP;
    if(parent){
        node.parent = parent;
        node.host = parent;
    }
    smallSteps.push(node);
    return node;
}

var step1 = createStep("Apply for trial", 80, 100, "Step 1");
var step2 = createStep("Develop", 280, 100, "Step 2");
var step3 = createStep("Release", 500, 100, "Step 3");
var step4 = createStep("Upgrade", 700, 100, "Step 4");
createEdge(step1, step2);
createEdge(step2, step3);
createEdge(step3, step4);

var step1_1 = createSmallStep("Trial download", 90, 220, step1);
var step2_1 = createSmallStep("15 days trial support", 255, 220, step2);
var step2_2 = createSmallStep("Purchase a license", 330, 330, step2);
var step3_1 = createSmallStep("Development support", 469, 220, step3);
var step4_1 = createSmallStep("Buy upgrade", 710, 330, step4);

createEdge(step1, step1_1, 1);
createEdge(step1_1, step2, 1);
createEdge(step2, step2_1, 1);
createEdge(step2_1, step2_2, 1);
createEdge(step2_2, step3_1, 1);
createEdge(step3_1, step3, 1);
createEdge(step4_1, step4, 1, true).name = 'Optional';

graph.visibleFilter = function(node){
    return node.visible !== false;
}

graph.onclick = function(evt){
    var node = evt.getData();
    if(!node){
        Q.forEach(smallSteps, function(p){
            p.visible = true;
            p.invalidateVisibility();
        })
        graph.invalidate();
        return;
    }
    if(node.hasChildren()){
        Q.forEach(smallSteps, function(p){
            var visible = p.isDescendantOf(node);
            p.visible = visible;
            p.invalidateVisibility();
        })
        graph.invalidate();
    }
}
