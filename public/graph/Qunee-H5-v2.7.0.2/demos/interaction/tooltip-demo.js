/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
var graph = new Q.Graph(canvas);
graph.enableTooltip = true;

//Q.Defaults.TOOLTIP_DELAY = 0;
//Q.Defaults.TOOLTIP_DURATION = 10000;

graph.tooltipDelay = 0;
graph.tooltipDuration = 10000;

var hello = graph.createNode("mouse over and wait a moment\ntooltip will appear.", -100, -50);
hello.tooltip = "Hello</br>This is a HTML format <b>Tooltip</b>.<li>AAA</li><li>BBB</li><li>CCC</li>";
var qunee = graph.createNode("Qunee", 100, 50);
var edge = graph.createEdge("Hello &&&\nQunee", hello, qunee);