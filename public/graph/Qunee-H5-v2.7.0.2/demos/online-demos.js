/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
$(function () {
    var other_list = $("#other_list ul")[0];

    var demos = [
        {name: "SVG to Canvas Code", url: "http://demo.qunee.com/svg2canvas"},
        {name: "TopoJSON Map", url: "http://map.qunee.com/"},
        {name: "Graph Editor", url: "http://demo.qunee.com/editor/"},
        {name: getI18NString('Hydrological stations'), url: "http://demo.qunee.com/waterwsn/"},
        {name: "Google Map - Openlayers", url: "http://demo.qunee.com/map/map.html"},
        {name: "OpenStreetMap - Leaflet", url: "http://demo.qunee.com/map/mapByLeafLet.html"},
        {name: "China Map - Leaflet", url: "http://demo.qunee.com/map/leaflet_china_map.html"},
        {name: "Tree + Qunee - EasyUI", url: "http://demo.qunee.com/14-4-25/treeAndGraph.html"},
        {name: "TV Tower Map", url: "http://map.qunee.com/tv-tower/"}
    ]

    demos.forEach(function (demo) {
        var li = document.createElement("li");
        li.innerHTML = '<a target="_blank" href="' + demo.url + '">' + demo.name + '</a>';
        other_list.appendChild(li);
    });
});