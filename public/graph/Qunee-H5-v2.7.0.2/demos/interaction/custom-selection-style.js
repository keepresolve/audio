/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
var graph = new Q.Graph(canvas);
graph.originAtCenter = false;

var i = 0;
while (i++ < 10) {
    var j = 0;
    while (j++ < 5) {
        graph.createNode("" + i + "-" + j, i * 70, j * 70).setStyle(Q.Styles.IMAGE_RADIUS, 0);
    }
}
var setSelectionStyle = function (element) {
    if (!(element instanceof Q.Node)) {
        return;
    }
    var selected = graph.isSelected(element);
    if (selected) {
        element.setStyle(Q.Styles.BACKGROUND_COLOR, "#2898E0");
        element.setStyle(Q.Styles.PADDING, 5);
        element.setStyle(Q.Styles.BORDER, 1);
    } else {
        element.setStyle(Q.Styles.BACKGROUND_COLOR, null);
        element.setStyle(Q.Styles.PADDING, 0);
        element.setStyle(Q.Styles.BORDER, 0);
    }
}
graph.selectionChangeDispatcher.addListener(function (evt) {
    var data = evt.data;
    if (!data) {
        return;
    }
    if (Array.isArray(data)) {
        for (var i = 0, l = data.length; i < l; i++) {
            setSelectionStyle(data[i]);
        }
    } else {
        setSelectionStyle(data);
    }
});