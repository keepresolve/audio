/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}

Q.Defaults.EDGE_BUNDLE_EXPANDED = false;

var graph = new Q.Graph("canvas");
var hello = graph.createNode("Hello", -100, -50);
var qunee = graph.createNode("Qunee", 100, 50);

var index = 0;
function createEdge(gap){
    var edge = graph.createEdge("Edge - " + index++, hello, qunee);
    edge.validateEdgeBundle = function(){
        var edgeBundle = this.getEdgeBundle(true);
        if(!edgeBundle || edgeBundle.agentEdge != this){
            resetEdgeStyles(this);
            return;
        }
        setBundleStyles(this, edgeBundle);
    };
    edge.setStyle(Q.Styles.EDGE_BUNDLE_GAP, gap);
    edge.setStyle(Q.Styles.EDGE_BUNDLE_LABEL_BACKGROUND_COLOR, "#2898E0");
    edge.setStyle(Q.Styles.EDGE_BUNDLE_LABEL_PADDING, 3);
    if(Q.randomBool()){
        edge.setStyle(Q.Styles.ARROW_FROM, Q.Consts.SHAPE_ARROW_1);
        edge.setStyle(Q.Styles.ARROW_TO, null);
        edge.setStyle(Q.Styles.RENDER_COLOR, Q.randomColor());
    }
    return edge;
}
createEdge(10);
createEdge(20);
createEdge(30);
createEdge(20);
createEdge(10);

function setBundleStyles(edge, edgeBundle){
    if(!edge.oldProperties){
        var oldProperties = edge.oldProperties = {};
        oldProperties.styles = {};
        oldProperties.styles[Q.Styles.EDGE_WIDTH] = edge.getStyle(Q.Styles.EDGE_WIDTH);
        oldProperties.styles[Q.Styles.RENDER_COLOR] = edge.getStyle(Q.Styles.RENDER_COLOR);
        oldProperties.styles[Q.Styles.ARROW_FROM] = edge.getStyle(Q.Styles.ARROW_FROM);
        oldProperties.styles[Q.Styles.ARROW_TO] = edge.getStyle(Q.Styles.ARROW_TO);
        oldProperties.name = edge.name;
    }
    //Read style from all bindings edges
    var fromArrow, toArrow, renderColor, edgeWidth = 4;
    edgeBundle.edges.forEach(function(e){
        if(!fromArrow){
            fromArrow = graph.getStyle(e, Q.Styles.ARROW_FROM);
        }
        if(!toArrow){
            toArrow = graph.getStyle(e, Q.Styles.ARROW_TO);
        }
        if(!renderColor){
            renderColor = graph.getStyle(e, Q.Styles.RENDER_COLOR) || e.getStyle(Q.Styles.EDGE_COLOR);
        }
        edgeWidth = Math.max(edgeWidth, e.getStyle(Q.Styles.EDGE_WIDTH) || 1);

    });
    if(fromArrow !== undefined){
        edge.setStyle(Q.Styles.ARROW_FROM, fromArrow);
    }
    if(toArrow !== undefined){
        edge.setStyle(Q.Styles.ARROW_TO, toArrow);
    }
    edge.setStyle(Q.Styles.EDGE_WIDTH, edgeWidth);
    if(renderColor !== undefined){
        edge.setStyle(Q.Styles.RENDER_COLOR, renderColor);
    }
    edge.name = 'binding status';
}
function resetEdgeStyles(edge){
    var oldProperties = edge.oldProperties;
    if(oldProperties){
        if(oldProperties.styles){
            edge.putStyles(oldProperties.styles);
        }
        for(var name in oldProperties){
            if(name !== 'styles'){
                edge[name] = oldProperties[name];
            }
        }
        edge.oldProperties = null;
    }
}