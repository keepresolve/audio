/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}

Q.registerImage('lamp', Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -8, -8, 16, 16));

var lampGradient = new Q.Gradient(Q.Consts.GRADIENT_TYPE_RADIAL, [Q.toColor(0xAAFFFFFF), Q.toColor(0x33EEEEEE), Q.toColor(0x44888888), Q.toColor(0x33666666)],
    [0.1, 0.3, 0.7, 0.9], 0, -0.2, -0.2);

var graph;

function createText(text, x, y){
    var node = graph.createText(text, x, y);
    return node;
}
function createGroupText(text, x, y){
    var node = graph.createText(text, x, y);
    node.setStyle(Q.Styles.LABEL_SIZE, {width: 100})
    var group = createGroup();
    node.parent = group;
    return group;
}
function createGroup(){
    var group = graph.createGroup();
    group.setStyle(Q.Styles.GROUP_STROKE, 2);
    group.setStyle(Q.Styles.GROUP_STROKE_LINE_DASH, [6,4]);
    group.setStyle(Q.Styles.GROUP_BACKGROUND_COLOR, false);
    group.padding = 5;
    group.minSize = {width: 30, height: 20};
    return group;
}
function createBus(x0, y0, x1, y1){
    var bus = new Q.Bus();
    bus.moveTo(x0, y0);
    bus.lineTo(x1, y1);
    graph.graphModel.add(bus);
    bus.setStyle(Q.Styles.SHAPE_STROKE, 4);
    bus.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#555');
    bus.setStyle(Q.Styles.SHAPE_FILL_COLOR, false);
    return bus;
}

var EDGE_TYPE_FIBER = 1;
function createEdge(from, to, type){
    var edge = graph.createEdge(from, to);
    edge.angle = Math.PI / 2;
    edge.setStyle(Q.Styles.ARROW_TO, false);
    if(type == EDGE_TYPE_FIBER){
        edge.setStyle(Q.Styles.EDGE_WIDTH, 3);
        edge.setStyle(Q.Styles.EDGE_COLOR, '#FF0');
        edge.setStyle(Q.Styles.EDGE_OUTLINE, 2);
        edge.setStyle(Q.Styles.EDGE_OUTLINE_STYLE, '#FC0');
        var circle = new Q.ImageUI(Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -5, -5, 10, 10));
        circle.lineWidth = 2;
        circle.strokeStyle = '#ff9f00';
        edge.addUI(circle);
    }
    return edge;
}
function createNode(name, x, y, image, labelPosition){
    var node = graph.createNode(name, x, y);
    if(image){
        node.image = image;
    }
    if(labelPosition == Q.Position.CENTER_MIDDLE){
        node.setStyle(Q.Styles.LABEL_POSITION, labelPosition);
        node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, labelPosition);
    }else if(labelPosition == Q.Position.LEFT_MIDDLE){
        node.setStyle(Q.Styles.LABEL_POSITION, labelPosition);
        node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.RIGHT_MIDDLE);
    }else if(labelPosition == Q.Position.RIGHT_MIDDLE){
        node.setStyle(Q.Styles.LABEL_POSITION, labelPosition);
        node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.LEFT_MIDDLE);
    }
    return node;
}

function createAlarmLamp(x, y, color, message){
    var lamp = graph.createNode(message, x, y);
    lamp.image = 'lamp';
    lamp.setStyle(Q.Styles.SHAPE_FILL_COLOR, color);
    lamp.setStyle(Q.Styles.SHAPE_FILL_GRADIENT, lampGradient);
    lamp.setStyle(Q.Styles.SHAPE_STROKE, 0.5);
    lamp.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#CCC');
    lamp.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, '#FF0');
    lamp.setStyle(Q.Styles.LABEL_SIZE, {width: 100, height: 20});
    lamp.setStyle(Q.Styles.LABEL_PADDING, 5);
    lamp.setStyle(Q.Styles.LABEL_OFFSET_Y, -10);
    lamp.setStyle(Q.Styles.LABEL_POSITION, Q.Position.CENTER_TOP);
    lamp.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.LEFT_BOTTOM);
    return lamp;
}

function createDashLine(x0, y0, x1, y1){
    var line = graph.createShapeNode();
    line.moveTo(x0, y0);
    line.lineTo(x1, y1);
    line.setStyle(Q.Styles.SHAPE_FILL_COLOR, null);
    line.setStyle(Q.Styles.SHAPE_STROKE, 3);
    line.setStyle(Q.Styles.SHAPE_LINE_DASH, [8, 4]);
    line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#6eb0d3');
    return line;
}

function init(){
    graph = new Q.Graph('canvas');
    graph.styles = {
        'label.font.size': 10
    }
    graph.originAtCenter = false;

    var bus1 = createBus(29, 93, 780, 93);
    var groupText1 = createGroupText(getI18NString('Sinopec internal network area'), 125, 24);
    var groupText2 = createGroupText(getI18NString('Remote access area'), 285, 24);
    var groupText3 = createGroupText(getI18NString('Security management area'), 438, 24);

    createEdge(bus1, groupText1);
    createEdge(bus1, groupText2);
    createEdge(bus1, groupText3);

    createNode(getI18NString('Sinopec \nInternet node \n network'), 220, 61, 'Q-cloud', Q.Position.CENTER_MIDDLE).size = {width: 90, height: 55};

    var node1 = createNode(getI18NString('Headquarters core \n switch'), 187, 144, 'Q-exchanger', Q.Position.LEFT_MIDDLE);
    createAlarmLamp(149, 165, '#0F0');
    var node2 = createNode(null, 263, 144, 'Q-exchanger', Q.Position.RIGHT_MIDDLE);
    createAlarmLamp(292, 153, '#F00', getI18NString('Found the password guessing attack event \n ...'));

    createEdge(bus1, node1);
    createEdge(bus1, node2);
    createEdge(node1, node2, EDGE_TYPE_FIBER);

    var node3 = createNode(getI18NString('Server\nSwitch'), 187, 216, 'Q-exchanger2', Q.Position.LEFT_MIDDLE);
    var node4 = createNode(null, 263, 216, 'Q-exchanger2', Q.Position.RIGHT_MIDDLE);
    createEdge(node3, node4, EDGE_TYPE_FIBER);

    createEdge(node1, node3);
    createEdge(node2, node4);

    var bus2 = createBus(29, 248, 780, 248);

    createEdge(bus2, node3);
    createEdge(bus2, node4);

    var subGroup = createGroup();

    var node5 = createNode(getI18NString('Switch'), 339, 329, 'Q-exchanger', Q.Position.LEFT_MIDDLE);
    var node6 = createNode(getI18NString('Switch'), 399, 329, 'Q-exchanger', Q.Position.RIGHT_MIDDLE);
    node5.parent = subGroup;
    node6.parent = subGroup;
    createEdge(node5, node6, EDGE_TYPE_FIBER);
    createEdge(bus2, node5);
    createEdge(bus2, node6);

    createDashLine(28, 174, 780, 174);
    createText(getI18NString('Sinopec headquarters network area'), 513, 133);
    createText(getI18NString('Management system network area'), 549, 216);

    var bus3 = createBus(242, 347, 593, 347);
    var bus4 = createBus(328, 387, 770, 387);
    bus3.parent = subGroup;
    bus4.parent = subGroup;

    createEdge(node5, bus3);
    createEdge(node6, bus3);

    createEdge(bus3, bus4);
    var serverGroups = getI18NString('TMS, TMS\n database, finance company \n new SAP, wave \n report, share platform \n database, fixed report \n database').split(',');
    var x = 344;
    serverGroups.forEach(function(name){
        var group = createGroup();
        group.name = name;
        var server1 = createNode(null, x, 428, 'Q-server');
        var server2 = createNode(null, x + 20, 428, 'Q-server');
        server1.parent = server2.parent = group;
        createEdge(bus4, server1);
        createEdge(bus4, server2);
        x += 63;

        group.parent = subGroup;
    })

    var roots = graph.graphModel.roots.toDatas();

    var group = createGroup();
    group.setStyle(Q.Styles.GROUP_BACKGROUND_GRADIENT, new Q.Gradient(Q.Consts.GRADIENT_TYPE_LINEAR, ['#90d9fc', '#b2e5ff', '#6aa6e5'], [0.1, 0.4, 0.9]));
    group.setStyle(Q.Styles.GROUP_STROKE, 1);
    group.setStyle(Q.Styles.GROUP_STROKE_LINE_DASH, null);
    group.padding = 10;
    roots.forEach(function(e){
        e.parent = group;
    })

    graph.zoomToOverview();
}

init();