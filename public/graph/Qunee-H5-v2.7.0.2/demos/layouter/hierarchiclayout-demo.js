/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
var HierarchicLayouter = function (graph) {
    this.graph = graph;
}

HierarchicLayouter.prototype = {
    getLayoutResult: function (params) {
        if (!(params instanceof Object)) {
            if (Q.isNumber(params)) {
                params = {xGap: params, yGap: params}
            } else {
                params = {};
            }
        }
        var xGap = params.xGap || 100;
        var yGap = params.yGap || 100;
        var graph = this.graph;

        var locations = {};

        graph.graphModel.forEachByTopoBreadthFirstSearch(function (v, from, layer, index, sum) {
            if (v._layer === undefined || layer > v._layer) {
                v._layer = layer;
                return;
            }
        });

        var layers = {};
        graph.forEach(function (element) {
            if (element._layer !== undefined) {
                var nodes = layers[element._layer];
                if (!nodes) {
                    nodes = layers[element._layer] = [];
                }
                nodes.push(element);
            }
        })

        var layer = 0;
        while (true) {
            var nodes = layers[layer];
            if (!nodes) {
                break;
            }
            var width = (nodes.length - 1) * xGap;
            var x = -width / 2;
            var y = layer * yGap;
            nodes.forEach(function (node, i) {
                locations[node.id] = {node: node, x: x + i * xGap, y: y};
                delete node._layer;
            })
            layer++;
        }

        return locations;
    }
}
Q.extend(HierarchicLayouter, Q.Layouter);


var graph = new Q.Graph('canvas');

var A1 = graph.createNode("A");
var A2 = graph.createNode("B");
var A3 = graph.createNode("C");
var A4 = graph.createNode("D");
var A5 = graph.createNode("E");

var B1 = graph.createNode("F");
var B2 = graph.createNode("G");

var C1 = graph.createNode("H");
var C2 = graph.createNode("I");
var C3 = graph.createNode("J");

graph.createEdge(A1, B1);
graph.createEdge(A1, B2);
graph.createEdge(A2, B1);
graph.createEdge(A2, B2);
graph.createEdge(A3, B1);
graph.createEdge(A3, B2);
graph.createEdge(B1, C1);
graph.createEdge(B1, C2);
graph.createEdge(B1, C3);
graph.createEdge(B2, C1);
graph.createEdge(B2, C2);
graph.createEdge(B2, C3);

var layouter = new HierarchicLayouter(graph);
layouter.doLayout({
    byAnimate: true,
    callback: function () {
        graph.moveToCenter();
    }
});