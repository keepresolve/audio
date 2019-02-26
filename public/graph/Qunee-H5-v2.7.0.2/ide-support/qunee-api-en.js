/**
 * This file is part of Qunee for HTML5.
 * Copyright (c) 2015 by qunee.com
 *
 * @author {@link http://qunee.com}
 * @description Qunee for HTML5 library, providing graphic component, and able to realize topological graph, organization chart and flow chart etc.
 * With features of high efficiency, light weight and easy extension
 * @type Object
 * @namespace
 * @static
 */
var Q = {};
/**
 * Version No.
 * @type String
 * @static
 */
Q.version = {};
/**
 * Inherit, subclass inherits superclass, and rewrite attribute or function
 * @example Q.extend(Q.Node, Q.Element, {
 *  toString: function(){
 *    return "Node";
 *  }
 * });
 * @param {Function} sb
 * @param {Function} sp
 * @param {Object} overrides rewrite method
 * @static
 */
Q.extend = function (sb, sp, overrides) {};
/**
 * Call superclass  constructor, equal to java super(...)
 * @example
 * function Node(id){
 *  Q.doSuperConstructor(this, Node, arguments);
 *  ...
 * }
 * @param {Object} object
 * @param {Function} type
 * @param {Array} args Call parameters
 * @static
 */
Q.doSuperConstructor = function (object, type, args) {};
/**
 * Call superclass  function, equal to super.method***(...)
 * @example
 * NodeUI.initialize.prototype = function(){
 *  Q.doSuper(this, NodeUI, "initialize");
 *  ...
 * }
 *
 * @param {Object} object
 * @param {Function} type
 * @param {String} method Calling method
 * @param {Array} args Call parameters, which generally are arguments
 * @static
 */
Q.doSuper = function (object, type, method, args) {};
/**
 * Generates function, and appoint function scope
 * @param {Object} obj  Function scope
 * @param {Function} strFunc Function
 * @returns {Function}
 * @static
 */
Q.createFunction = function (obj, strFunc) {};
/**
 * Sets class name
 * @param {HTMLElement} element HTML element object
 * @param {type} className
 * @static
 */
Q.setClass = function (element, className) {};
/**
 * Adds class name
 * @param {HTMLElement} element HTML element object
 * @param {type} className
 * @static
 */
Q.appendClass = function (element, className) {};
/**
 * Removes class name
 * @param {HTMLElement} element HTML element object
 * @param {type} className
 * @static
 */
Q.removeClass = function (element, className) {};
/**
 * Traverse array, and call callback function in the appointed scope
 * @param {Array} array
 * @param {Function} call Call back function. If results of callback function return to false, the traversal ends
 * @param {Object} [scope] function scope
 * @returns {Boolean} If returning to false, it means not traversing the entire array
 * @static
 */
Q.forEach = function (array, call, scope, params) {};
/**
 * Traverse array backward, and call callback function in the appointed scope
 * @param {Array} array
 * @param {Function} call Call back function. If results of callback function return to false, the traversal ends
 * @param {Object} [scope] function scope
 * @returns {Boolean} If returning to false, it means not traversing the entire array
 * @static
 */
Q.forEachReverse = function (array, call, scope, params) {};
/**
 * If it is the type of Number
 * @example
 * Q.isNumber(0);
 *
 * @param {Object} n Object
 * @returns {Boolean} Wheterh n is the type of Number
 * @static
 */
Q.isNumber = function (n) {};
/**
 * If it is character string
 * @param {Object} s
 * @returns {Boolean}
 * @static
 */
Q.isString = function (s) {};
/**
 * If the object is the type of Boolean
 * @param {Object} b
 * @returns {Boolean}
 * @static
 */
Q.isBoolean = function (b) {};
/**
 * Whether it is an array
 * @param {Object} array
 * @returns {Boolean}
 * @static
 */
Q.isArray = function (a) {};
/**
 * Stop the fault response of browser to events
 * @example
 * Such as in default webpage, press "ctrl + s", the default action of browser is to save webpage. To organize this default action, press the following code
 * document.body.onkeydown = function(evt){
 *  Q.eventPreventDefault(evt);
 * }
 *
 * @param {Event} evt mouse, or touch events
 * @static
 */
Q.eventPreventDefault = function (evt) {};
/**
 * Prevent events transmitting to other element objects
 * @param {Event} evt
 * @static
 */
Q.eventStopPropagation = function (evt) {};
/**
 * Stop default response of browser to events, and prevent events transmitting to other element object
 * @see Q.eventPreventDefault
 * @see Q.eventStopPropagation
 * @param {Event} evt
 * @static
 */
Q.stopEvent = function (evt) {};
/**
 * Delay running, able to assign delay time, callback function and function scope
 * @see setTimeout
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Number} time Delay time
 * @static
 */
Q.callLater = function (call, scope, time) {};
/**
 * Call the callback function when drawing the frame time next time
 * @see requestAnimationFrame
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @static
 */
Q.nextFrame = function (call, scope) {};
/**
 * Traverse all kids
 * @param {HTMLElement} parent Parent node
 * @param {Function} call Call back function. If results of function return to false, the traversal ends
 * @param {Object} [scope] function scope
 * @static
 */
Q.forEachChild = function (parent, call, scope) {};
/**
 * Depth-first traversal
 * @param {Array} array set
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Boolean} postOrder if postorder traversal
 * @static
 */
Q.forEachByDepthFirst = function (array, call, scope, postOrder) {};
/**
 * Depth-first reverse traversal
 * @param {Array} array set
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Boolean} postOrder if postorder traversal
 * @static
 */
Q.forEachByDepthFirstReverse = function (array, call, scope, postOrder) {};
/**
 * Breadth-first traversal
 * @param {Array} array set
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @static
 */
Q.forEachByBreadthFirst = function (array, call, scope) {};
/**
 * Random integer value
 * @param {Number} i Number range
 * @returns {Number}
 * @static
 */
Q.randomInt = function (i) {};
/**
 * Random Boolean value
 * @returns {Boolean}
 * @static
 */
Q.randomBool = function () {};
/**
 * Random color
 * @param {Number} alpha transparency from 0 to 1
 * @returns {String} color
 * @static
 */
Q.randomColor = function (alpha) {};
/**
 * For HTMLElement, add event monitoring and appoint the monitored function scope
 * @see HTMLElement#addEventListener
 * @param {HTMLElement} eventTarget
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} useCapture if capturing events, there are two stages for monitoring interactive events in Internet: capture and bubbling. During the capture stage, the events are firstly distributed to the parent element. During the bubbling stage, the events are firstly distributed to the elements where events happen, and then bubbles go upward
 * @param {Object} [scope] function scope
 * @returns {Function} If there are no appointed function scope, return to the incoming objects of listener. If the scope has been appointed, create a new closure function. Call the listener within it, and return to the newly-created function object
 * @static
 */
Q.addEventListener = function (eventTarget, type, listener, useCapture, scope) {};
/**
 *Obtain the first child node taking the tag name as the appointed name
 * @param {HTMLElement} parentNode
 * @param {String} tagName
 * @returns {HTMLElement}
 * @static
 */
Q.getFirstElementChildByTagName = function (parentNode, tagName) {};
/**
 * If supporting touch events
 * @type Boolean
 */
Q.isTouchSupport = {};
/**
 * If it is iOS system
 * @type Boolean
 */
Q.isIOS = {};
/**
 * If within the appointed rectangular range
 * @param {Number} x rectangle x position
 * @param {Number} y rectangle y position
 * @param {Number} width rectangle width
 * @param {Number} height rectangle height
 * @param {Number} px point x coordinate
 * @param {Number} py point y coordinate
 * @returns {Boolean} if crossing
 * @static
 */
Q.intersectsPoint = function (x, y, width, height, px, py){};
/**
 * If it is contained in the rectangle
 * @param {Number} tx scope x coordinate
 * @param {Number} ty scope y coordinate
 * @param {Number} tw scope width
 * @param {Number} th scope height
 * @param {Number} rx rectangle x position
 * @param {Number} ry rectangle y position
 * @param {Number} rw rectangle width
 * @param {Number} rh rectangle height
 * @returns {Boolean} if contained
 * @static
 */
Q.containsRect = function (tx, ty, tw, th, rx, ry, rw, rh) {};
/**
 *Rectangle
 * @param {Number} x x position
 * @param {Number} y y position
 * @param {Number} w width
 * @param {Number} w height
 * @constructor
 * @extends Q.Size
 */
Q.Rect = function (x, y, w, h) {};
Q.Rect.prototype = new Q.Size();
/**
 * x position
 * @type number
 */
Q.Rect.prototype.x = {};
/**
 * y position
 * @type number
 */
Q.Rect.prototype.y = {};
/**
 * According to incoming rectangle object, set x, y, width and height of rectangle
 * @param {Q.Rect} rect
 */
Q.Rect.prototype.setByRect = function (rect){};
/**
 * Set x, y, width and height of rectangle
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
Q.Rect.prototype.set = function (x, y, width, height) {};
/**
 * Offset to rectangle
 * @param {Number} dx x offset
 * @param {Number} dy y offset
 */
Q.Rect.prototype.offset = function (dx, dy){};
/**
 * If coordinate points are in the scope of rectangle
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @returns {Boolean}
 */
Q.Rect.prototype.contains = function (x, y){};
/**
 * If coordinate points are in the scope of rectangle
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @param {Number} tolerance
 * @returns {Boolean}
 */
Q.Rect.prototype.intersectsPoint = function (x, y, tolerance) {};
/**
 * If two rectangles are crossing
 * @param {type} x2 rectangle x coordinate
 * @param {type} y2 rectangle y coordinate
 * @param {type} width2 rectangle width
 * @param {type} height2 rectangle height
 * @returns {Boolean}
 */
Q.Rect.prototype.intersectsRect = function (x2, y2, width2, height2) {};
/**
 * If coordinate points are in the scope of rectangle
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @returns {Boolean}
 */
Q.Rect.prototype.intersects = function (x, y){};
/**
 * Crossing scope of two rectangles
 * @param {Q.Rect} r another rectangle
 * @returns {Rect} crossing scope
 */
Q.Rect.prototype.intersection = function (x, y, w, h) {};
/**
 * Adds rectangle scope and make the rectangle contained in the coordinate points
 * @param {Q.Point} point Coordinate points
 */
Q.Rect.prototype.addPoint = function (point){};
/**
 * Adds rectangle scope and make the rectangle contained in the coordinate points
 * @param {Number} newx coordinate x
 * @param {Number} newy coordinate y
 */
Q.Rect.prototype.add = function (newx, newy) {};
/**
 * Adds rectangle scope and make the rectangle contain the introduced rectangle scope
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @param {Number} width rectangle width
 * @param {Number} height rectangle height
 */
Q.Rect.prototype.addRect = function (x, y, width, height) {};
/**
 * Shrink rectabgle scope
 * @see Q.Rect.prototype.grow
 * @param {Number} t top extended distance
 * @param {Number} l Left extended distance
 * @param {Number} b bottom extended distance
 * @param {Number} r Right extended distance
 */
Q.Rect.prototype.shrink = function (t, l, b, r) {};
/**
 * Extend the rectangle scope along the upper left and lower right direction. If the value is a minus, it means the rectangle scope is shrinked
 * @param {Number} t top extended distance
 * @param {Number} l Left extended distance
 * @param {Number} b bottom extended distance
 * @param {Number} r Right extended distance
 */
Q.Rect.prototype.grow = function (t, l, b, r) {};
/**
 * Combine the rectangle, and return to a new rectangle scope
 * @param {Q.Rect} r another rectangle
 * @returns {Q.Rect} New rectangle scope after combination
 */
Q.Rect.prototype.union = function (r) {};
/**
 * Removes rectangle scope, and set the height at -1
 */
Q.Rect.prototype.clear = function (){};
/**
 *Judge if the scope of two rectangles are the same
 * @param {Rect} rect Another rectangle
 * @returns {Boolean}
 */
Q.Rect.prototype.equals = function (rect){};
/**
 * Acquire the crossing point of edge segment and rectangle
 * @param {number} inX Endpoint of edge segment in the rectangle
 * @param {number} inY Endpoint of edge segment in the rectangle
 * @param {number} outX Endpoint of edge segment out of the rectangle
 * @param {number} outY Endpoint of edge segment out of the rectangle
 * @returns {Q.Point}
 */
Q.Rect.prototype.getIntersectionPoint = function (inX, inY, outX, outY){};
/**
 * Left distance, equal to {@link Q.Rect#x}
 * @type number
 */
Q.Rect.prototype.left = {};
/**
 * Top distance, equal to {@link Q.Rect#y}
 * @type number
 */
Q.Rect.prototype.top = {};
/**
 * Bottom distance, equal to top + height
 * @type number
 */
Q.Rect.prototype.bottom = {};
/**
 * Right distance, equal to left + width
 * @type number
 */
Q.Rect.prototype.right = {};
/**
 * Position of the Central point x
 * @type number
 */
Q.Rect.prototype.cx = {};
/**
 * Position of coordinate y at the central point
 * @type number
 */
Q.Rect.prototype.cy = {};
/**
 * Coordinate at the central point
 * @type object
 */
Q.Rect.prototype.center = {};
/**
 * Size, dimension
 * @constructor
 * @param {Number} w width
 * @param {Number} w height
 */
Q.Size = function (w, h) {};
/**
 * Width
 * @type number
 */
Q.Size.prototype.width = {};
/**
 * Height
 * @type number
 */
Q.Size.prototype.height = {};
/**
 * If empty
 * @returns {Boolean}
 */
Q.Size.prototype.isEmpty = function () {};
/**
 * Clone object
 * @returns {Q.Size}
 */
Q.Size.prototype.clone = function () {};
/**
 * Object of coordinate point
 * @constructor
 * @param {Number} x coordinate value x
 * @param {Number} y coordinate value y
 * @param {Number} rotate angle, Radian value
 */
Q.Point = function (x, y, rotate) {};
/**
 * Coordinate x
 * @type number
 */
Q.Point.prototype.x = {};
/**
 * Coordinate y
 * @type number
 */
Q.Point.prototype.y = {};
/**
 * Rotate radian
 * @type number
 */
Q.Point.prototype.rotate = {};
/**
 * Set coordinate value
 * @param {Number} x
 * @param {Number} y
 * @param {Number} rotate
 */
Q.Point.prototype.set = function (x, y, rotate){};
/**
 * Coordinate negate, x = -x, y = -y;
 */
Q.Point.prototype.negate = function () {};
/**
 * Coordinate offset
 * @param {Number} dx
 * @param {Number} dy
 */
Q.Point.prototype.offset = function (dx, dy) {};
/**
 * Judge if coordinates are the same
 * @param {Q.Point} o
 * @returns {Boolean}
 */
Q.Point.prototype.equals = function (o) {};
/**
 * Distance between two points
 * @param {Q.Point} p2
 * @returns {Number}
 */
Q.Point.prototype.distanceTo = function (p2) {};
/**
 * Clone objects of coordinate point
 * @returns {Q.Point}
 */
Q.Point.prototype.clone = function () {};
/**
 * Gap, including four values at top, bottom, left and right positions, for describing internal gap, external gap and expansion volume
 * @example Set the internal gap for the node elements and set with background color
 * node.setStyle(Q.Styles.BACKGROUND_COLOR, "#CCCCCC");
 * node.setStyle(Q.Styles.PADDING, new Q.Insets(10));
 * @constructor
 * @param {Number} top Top gap
 * @param {Number} left Left gap
 * @param {Number} bottom Bottom gap
 * @param {Number} right Right gap
 */
Q.Insets = function (top, left, bottom, right) {};
/**
 * Top gap
 * @type number
 */
Q.Insets.prototype.top = {};
/**
 * Bottom gap
 * @type number
 */
Q.Insets.prototype.bottom = {};
/**
 * Left gap
 * @type number
 */
Q.Insets.prototype.left = {};
/**
 * Right gap
 * @type number
 */
Q.Insets.prototype.right = {};
/**
 * Set the gap value at top, left, bottom and right positions
 * @param {Number} top Top gap
 * @param {Number} left Left gap
 * @param {Number} bottom Bottom gap
 * @param {Number} right Right gap
 * @returns {Object}
 */
Q.Insets.prototype.set = function (top, left, bottom, right){};
/**
 * Clone gap object
 * @returns {Q.Insets}
 */
Q.Insets.prototype.clone = function (){};
/**
 * If gap are the same
 * @param {Object} o
 * @returns {Boolean}
 */
Q.Insets.prototype.equals = function (o){};
/**
 * events
 * @constructor
 * @param {Object} source
 * @param {Object} type
 * @param {Object} kind
 * @param {Object} value
 */
Q.Event = function (source, type, kind, value) {};
/**
 * Distributed objects of events
 * @type Object
 */
Q.Event.prototype.source = {};
/**
 * Type of events, property change events, or collection change events
 * @example
 * new Q.Event(graph, "property.change", "name", "new name");
 * @type String
 */
Q.Event.prototype.type = {};
/**
 * Type of events, such as property name in the events of property change
 * @example
 * new Q.Event(graph, "property.change", "name", "new name");
 * @type String
 */
Q.Event.prototype.kind = {};
/**
 * Event-related data object, such as property value in the events of property change
 * @type Object
 */
Q.Event.prototype.value = {};
/**
 * Property change events
 * @constructor
 * @extends Q.Event
 * @param {Object} source Event distributor
 * @param {String} propertyName
 * @param {Object} value New property value
 * @param {Object} oldNew property value before being revised
 */
Q.PropertyChangeEvent = function (source, propertyName, value, oldValue) {};
Q.PropertyChangeEvent.prototype = new Q.Event();
/**
 * Property type, for {@link Q.Element} element, the properties are defaulted in three types: accessor, style and client
 * @see Q.Consts.PROPERTY_TYPE_ACCESSOR
 * @see Q.Consts.PROPERTY_TYPE_STYLE
 * @see Q.Consts.PROPERTY_TYPE_CLIENT
 * @type Object
 */
Q.PropertyChangeEvent.prototype.propertyType = {};
/**
 * Property name, the same with kind property
 * @see {@link Q.Event#kind}
 * @type String
 */
Q.PropertyChangeEvent.prototype.propertyName = {};
/**
 * Collection change events, distribute this kind of events in case if to add or delete elements, adjust element order or clear collection
 * @constructor
 * @extends Q.Event
 * @param {Object} source Collection object
 * @param {Object} kind Event kind:
 * {@link Q.ListEvent.KIND_ADD},
 * {@link Q.ListEvent.KIND_REMOVE},
 * {@link Q.ListEvent.KIND_CLEAR},
 * {@link Q.ListEvent.KIND_INDEX_CHANGE}
 * @param {Object} data event data. In case of element adding event, this parameter will be newly added element or element collection
 * @param {int} index serial number. In case of element adding event, insert the serial number in front of position
 * @param {Object} oldIndex. If to modify the element sequence event, this parameter indicates the original position of element
 */
Q.ListEvent = function (source, kind, data, index, oldIndex) {};
Q.ListEvent.prototype = new Q.Event();
/**
 * Serial number, in case of element adding event, insert the serial number in front of position
 * @type number
 */
Q.ListEvent.prototype.index = {};
/**
 *. If to modify the element sequence event, this parameter indicates the original position of element
 * @type number
 */
Q.ListEvent.prototype.oldIndex = {};
/**
 * Element adding event
 * @see Q.Event.kind
 * @static
 * @type String
 */
Q.ListEvent.KIND_ADD = {};
/**
 * Element deleting event
 * @static
 * @type String
 */
Q.ListEvent.KIND_REMOVE = {};
/**
 * Collection empty event
 * @static
 * @type String
 */
Q.ListEvent.KIND_CLEAR = {};
/**
 * Element sequence change event
 * @static
 * @type String
 */
Q.ListEvent.KIND_INDEX_CHANGE = {};
/**
 * Event handler, set with a listener, for responsing to events
 * @constructor
 */
Q.Handler = function () {};
/**
 * Listener
 * @see Q.IListener
 * @type Object
 */
Q.Handler.prototype.listener = {};
/**
 * Distributed events before operation
 * @param {Event} evt
 * @returns {Boolean} returning to flase means stopping the later operation
 */
Q.Handler.prototype.beforeEvent = function (evt) {};
/**
 * Distributed events
 * @param {Event} evt
 */
Q.Handler.prototype.onEvent = function (evt) {};
/**
 * Event dispatcher, compared with handler, can add or delete several listeners
 * @constructor
 * @extends Q.Handler
 */
Q.Dispatcher = function () {};
Q.Dispatcher.prototype = new Q.Handler();
/**
 * Collection of listeners
 * @type Array
 */
Q.Dispatcher.prototype.listeners = {};
/**
 * If containing listener
 * @param {(Function|Q.IListener)} fn listener
 * @param {Object} [scope] scope
 * @returns {Boolean}
 */
Q.Dispatcher.prototype.contains = function (fn, scope) {};
/**
 * Adds listener
 * @example
 * var dispatcher = new Q.Dispatcher();
 * dispatcher.addListener(function(evt){
 *  Q.log("on event");
 * });
 * dispatcher.addListener({
 *  beforeEvent: function(evt){Q.log("before event");},
 *  onEvent: function(evt){Q.log("on event");}
 * });
 * dispatcher.fireEvent({name: "alarm event"});
 * @param {(Function|Q.IListener)} listener
 * @param {Object} [scope] scope
 * @returns {Object} return to listener object generated internally (including scope related information)
 */
Q.Dispatcher.prototype.addListener = function (listener, scope) {};
/**
 * delete listener
 * @param {(Function|Q.IListener)} listener
 * @param {Object} [scope] scope
 * @param {boolean} keepScope whether it is kept to action on objects. Delete the scope objects if false
 */
Q.Dispatcher.prototype.removeListener = function (listener, scope, keepScope) {};
/**
 * Equivalent to #addListener
 * @param {(Function|Q.IListener)} listener
 * @param {Object} [scope] scope
 */
Q.Dispatcher.prototype.on = function (listener, scope) {};
/**
 * Equivalent to #removeListener
 * @param {(Function|Q.IListener)} listener
 * @param {Object} [scope] scope
 * @param {boolean} keepScope whether it is kept to action on objects. Delete the scope objects if false
 */
Q.Dispatcher.prototype.un = function (listener, scope, keepScope) {};
/**
 * Removes listener
 * @returns {Object}
 */
Q.Dispatcher.prototype.clear = function () {};
/**
 * Destroy, default will remove all listeners
 * @returns {Object}
 */
Q.Dispatcher.prototype.destroy = function () {};
/**
 * Position, for describing information of relative positions, including position attribute of both horizontal and vertical directions. There are three positions are each direction, combining nine position at top, bottom, left and right places
 * @constructor
 * @param {String} h
 * @param {String} v
 */
Q.Position = function (h, v) {};
/**
 * Positions at vertical direction: top, middle and bottom
 * @type String
 */
Q.Position.prototype.verticalPosition = {};
/**
 * Positions at horizontal direction: left, middle and right
 * @type String
 */
Q.Position.prototype.horizontalPosition = {};
/**
 * Abbreviated name
 * @type String
 */
Q.Position.prototype.sortName = {};
/**
 * Top left
 * @static
 * @type Position
 */
Q.Position.LEFT_TOP = {};
/**
 * Middle left
 * @static
 * @type Position
 */
Q.Position.LEFT_MIDDLE = {};
/**
 * Bottom left
 * @static
 * @type Position
 */
Q.Position.LEFT_BOTTOM = {};
/**
 * Center top
 * @static
 * @type Position
 */
Q.Position.CENTER_TOP = {};
/**
 * Middle
 * @static
 * @type Position
 */
Q.Position.CENTER_MIDDLE = {};
/**
 * Central bottom
 * @static
 * @type Position
 */
Q.Position.CENTER_BOTTOM = {};
/**
 * Top right
 * @static
 * @type Position
 */
Q.Position.RIGHT_TOP = {};
/**
 * Middle right
 * @static
 * @type Position
 */
Q.Position.RIGHT_MIDDLE = {};
/**
 * Bottom right
 * @static
 * @type Position
 */
Q.Position.RIGHT_BOTTOM = {};
/**
 * Random position
 * @type Q.Position
 */
Q.Position.random = {};
/**
 * Data type, for describing data element, including id, set membership, attribute setting, event distribution and the like functions, is the base class of element objects
 * @constructor
 * @extends Q.Handler
 */
Q.Data = function () {};
Q.Data.prototype = new Q.Handler();
/**
 * The only id
 * @type int
 */
Q.Data.prototype.id = {};
/**
 * Acquire property
 * @see {@link Q.Data#set}
 * @param {String} key
 * @returns {Object}
 */
Q.Data.prototype.get = function (key) {};
/**
 * Set attributes, and dispatch property change event
 * @see {@link Q.Data#get}
 * @example
 * var data = new Q.Data();
 * data.set("name", "hello");
 * data.get("name");
 *
 * @param {String} key
 * @param {Object} value
 * @returns {Boolean} If new property is the same with the original, or the property setting fails, return to false
 */
Q.Data.prototype.set = function (key, value) {};
/**
 * Delete properties, and delete one property from property list
 * @param {String} key
 */
Q.Data.prototype.remove = function (key) {};
/**
 * Adds child, assigning the serial number of child
 * @see {@link Q.Data#onChildAdd}
 * @param {Q.Data} child
 * @param {int} [index]
 * @returns {Boolean} If adding fails, return to false
 */
Q.Data.prototype.addChild = function (child, index) {};
/**
 * Being successful to add child, call this method
 * @param {Q.Data} child
 * @param {int} index
 */
Q.Data.prototype.onChildAdds = function (child, index) {};
/**
 * Delete child
 * @see {@link Q.Data#onChildRemove}
 * @param {Object} child
 * @returns {Object}
 */
Q.Data.prototype.removeChild = function (child) {};
/**
 * When a child is deleted, call this method
 * @param {Object} child
 * @returns {Object}
 */
Q.Data.prototype.onChildRemoves = function (child) {};
/**
 * Acquire child collection
 * @returns {Array} Child collection
 */
Q.Data.prototype.toChildren = function () {};
/**
 * Removes all child elements
 * @see {@link Q.Data#onChildrenClear}
 */
Q.Data.prototype.clearChildren = function () {};
/**
 * Traverse child
 * @param {Function} call Callback function
 * @param {Object} [scope] scope
 */
Q.Data.prototype.forEachChild = function (call, scope){};
/**
 * To remove a child, call this method
 * @param {Array} children Child collection being removed
 */
Q.Data.prototype.onChildrenClear = function (children) {};
/**
 * Acquire the serial number of children
 * @see {@link Q.Data#setChildIndex}
 * @param {Q.Data} child
 * @returns {int} Serial number
 */
Q.Data.prototype.getChildIndex = function (child) {};
/**
 * Set the serial number of children
 * @see {@link Q.Data#getChildIndex}
 * @param {Q.Data} child Child element
 * @param {int} index Serial number
 * @returns {Object}
 */
Q.Data.prototype.setChildIndex = function (child, index) {};
/**
 * If any child
 * @returns {Boolean}
 */
Q.Data.prototype.hasChildren = function () {};
/**
 * Acquire a child according to the serial number
 * @param {int} index Serial number
 * @returns {Object}
 */
Q.Data.prototype.getChildAt = function (index) {};
/**
 * If it is introduced child or offspring node of parameter
 * @param {Q.Data} parent Parent node
 * @returns {Boolean} If offspring node
 */
Q.Data.prototype.isDescendantOf = function (parent) {};
/**
 * Dispatch the property change event
 * @param {string} propertyName
 * @param {Object} value
 * @param {Object} oldValue
 * @param {Object} propertyType
 * @returns {Object}
 */
Q.Data.prototype.firePropertyChangeEvent = function (propertyName, value, oldValue, propertyType){};
/**
 * To replace parent node, call this method
 * @param {Q.Data} oldParent Original parent node
 * @param {Q.Data} newParent New parent node
 */
Q.Data.prototype.onParentChanged = function (oldParent, newParent) {};
/**
 * Child quantity
 * @type int
 */
Q.Data.prototype.childrenCount = {};
/**
 * Child collection
 * @type Q.HashList
 */
Q.Data.prototype.children = {};
/**
 * Parent node
 * @type Q.Data
 */
Q.Data.prototype.parent = {};
/**
 * User property
 * @type Object
 */
Q.Data.prototype.properties = {};
/**
 * Select model for storing and managing selected elements
 * @constructor
 * @param {Q.DataModel} box Data model. All selected elements in the model must belong to this kind of data model
 * @extends Q.HashList
 */
Q.SelectionModel = function (box) {};
Q.SelectionModel.prototype = new Q.HashList();
/**
 * Data model, all selected elements in the model must belong to this kind of data model
 * @type DataModel
 * @readonly
 */
Q.SelectionModel.prototype.box = {};
/**
 * If being selected
 * @param {(Q.Data|in)} data Element object or element id
 * @returns {Boolean}
 */
Q.SelectionModel.prototype.isSelected = function (data) {};
/**
 * Selected element
 * @example
 * graph.selectionModel.select(node1);
 * @see {@link Q.SelectionModel#add}
 * @param {Q.Data} data
 */
Q.SelectionModel.prototype.select = function (data){};
/**
 * Selection cancelled
 * @example
 * graph.selectionModel.unselect(node1);
 * @param {Q.Data} data
 */
Q.SelectionModel.prototype.unselect = function (data){};
/**
 * Modify selecting status of element
 * @param {Q.Data} data
 */
Q.SelectionModel.prototype.reverseSelect = function (data){};
/**
 * Data model
 * @constructor
 * @extends Q.HashList
 */
Q.DataModel = function () {};
Q.DataModel.prototype = new Q.HashList();
/**
 * Managing model of element selecting status
 * @readonly
 * @type Q.SelectionModel
 */
Q.DataModel.prototype.selectionModel = {};
/**
 * Dispatcher of change event of element selecting status
 * @readonly
 * @type Q.Dispatcher
 */
Q.DataModel.prototype.selectionChangeDispatcher = {};
/**
 * Dispatcher of change event of element property
 * @readonly
 * @type Q.Dispatcher
 */
Q.DataModel.prototype.dataChangeDispatcher = {};
/**
 * Dispatcher of change event of element parent node
 * @type Q.Dispatcher
 */
Q.DataModel.prototype.parentChangeDispatcher = {};
/**
 * Root layer element collection
 * @type Object
 */
Q.DataModel.prototype.roots = {};
/**
 * Before change of element property
 * @param {Q.PropertyChangeEvent} event Property change event
 * @returns {Boolean} To return to false, stop modification of element property
 */
Q.DataModel.prototype.beforeDataPropertyChange = function (event) {};
/**
 * Change events of element property
 * @param {Q.PropertyChangeEvent} event Property change event
 */
Q.DataModel.prototype.onDataPropertyChanged = function (event) {};
/**
 * Acquire the root layer element collection
 * @returns {Array}
 */
Q.DataModel.prototype.toRoots = function () {};
/**
 * Depth-first traversal
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Boolean} postOrder Whether postorder traversal, it is defaulted to be preorder traversal
 */
Q.DataModel.prototype.forEachByDepthFirst = function (call, scope, postOrder) {};
/**
 * Depth-first reverse traversal
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Object} postOrder Whether postorder traversal, it is defaulted to be preorder traversal
 */
Q.DataModel.prototype.forEachByDepthFirstReverse = function (call, scope, postOrder) {};
/**
 * Breadth-first traversal
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 */
Q.DataModel.prototype.forEachByBreadthFirst = function (call, scope) {};
/**
 * Breadth-first reverse traversal
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 */
Q.DataModel.prototype.forEachByBreadthFirstReverse = function (call, scope) {};
/**
 * Interface of listener
 * @namespace
 * @type object
 * @static
 */
Q.IListener = {};
/**
 * Call when an event happens
 * @static
 * @param {Q.Event} evt
 */
Q.IListener.onEvent = function (evt) {};
/**
 * Call before an event happens
 * @static
 * @param {Q.Event} evt
 * @returns {Boolean} To return to false, stop execution of events
 */
Q.IListener.beforeEvent = function (evt) {};
/**
 * Request linkage via AJAX
 * @example
 Q.loadURL(jsfile, function (req) {
             var code = req.responseText;
             ...
         }, showError)
 * @static
 * @param {String} url Request linkage
 * @param {Function} callback Call back function, such as when the introduced param is XMLHttpRequest
 * @param {Function} onError Callback this function in case the request is abnormal
 * @param {Object} params Request a param, referring to XMLHttpRequest#send(...);
 */
Q.loadURL = function (url, callback, onError, params, addTime) {};
/**
 * Request source of XML
 * @see Q.loadURL
 * @example
 Q.loadXML('map.svg', function(doc){
        var paths = doc.getElementsByTagName("path");
     }, showError);
 * @static
 * @param {String} url Request linkage
 * @param {Function} callback Call back function, such as when the introduced param is XMLDocument
 * @param {Function} onError Callback this function in case the request is abnormal
 * @param {Object} params Request a param, referring to XMLHttpRequest#send(...);
 */
Q.loadXML = function (url, callback, onError, params, addTime) {};
/**
 * Request source of JSON
 * @see Q.loadURL
 * @example
 Q.loadJSON('map.json', function(json){
        for(var d in json){

        }
     }, showError);
 * @static
 * @param {String} url Request linkage
 * @param {Function} callback Call back function, such as when the introduced param is JS
 * @param {Function} onError Callback this function in case the request is abnormal
 * @param {Object} params Request a param, referring to XMLHttpRequest#send(...);
 */
Q.loadJSON = function (url, callback, onError, params, addTime) {};
/**
 * Judge if key press is: Command under Mac OS X or Ctrl in other operation systems
 * @static
 * @param {Object} evt
 * @returns {Object}
 */
Q.isMetaKey = function (evt){};
/**
 * Calculate length
 * @static
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
Q.calculateDistance = function (x1, y1, x2, y2) {};
/**
 * Extend array, integrating the function of hashmap and list
 * @constructor
 */
Q.HashList = function (values) {};
/**
 * Acquire elements in the model via serial numbers
 * @param {int} index
 * @returns {Q.Data}
 */
Q.HashList.prototype.get = function (index) {};
/**
 * Acquire elements in the model via id
 * @param {int} id The only number
 * @returns {Q.Data}
 */
Q.HashList.prototype.getById = function (id) {};
/**
 * Acquire elements in the model via serial numbers
 * @param {int} index Serial number
 * @returns {Q.Data}
 */
Q.HashList.prototype.getByIndex = function (index) {};
/**
 * Traverse elements in the model
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Object} [params] Other introduced parameters
 */
Q.HashList.prototype.forEach = function (call, scope, params) {};
/**
 * Traverse reversely elements in the model
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Object} [params] Other introduced parameters
 */
Q.HashList.prototype.forEachReverse = function (call, scope, params) {};
/**
 * Quantity of elements in the model
 * @returns {int}
 */
Q.HashList.prototype.size = function () {};
/**
 * If containing elements
 * @param {Q.Data} data Elements
 * @returns {Boolean}
 */
Q.HashList.prototype.contains = function (data) {};
/**
 * Judge if elements exist in the data model via id
 * @param {int} id The only number
 * @returns {Boolean}
 */
Q.HashList.prototype.containsById = function (id) {};
/**
 * Adjust the serial number of element
 * @param {Q.Data} data Elements
 * @param {int} index Serial number
 */
Q.HashList.prototype.setIndex = function (data, index) {};
/**
 * Set the element serial number after the appointed one
 * @param {Q.Data} data
 * @param {int} index Serial number
 */
Q.HashList.prototype.setIndexAfter = function (data, index){};
/**
 * Set the element serial number before the appointed one
 * @param {Q.Data} data
 * @param {int} index Serial number
 */
Q.HashList.prototype.setIndexBefore = function (data, index){};
/**
 * Acquire the element serial number
 * @param {Q.Data} data
 * @returns {int}
 */
Q.HashList.prototype.indexOf = function (data) {};
/**
 * Acquire the serial number of element in the vessel via element number
 * @param {int} id The only number
 * @returns {int} The serial number of element in the data model
 */
Q.HashList.prototype.getIndexById = function (id) {};
/**
 * Adds elements
 * @param {Q.Data} data
 * @param {int} index Serial number
 */
Q.HashList.prototype.add = function (data, index) {};
/**
 * Adds elements to the front of collection, with the same effect via the following method
 * @code
 * HashList.add(data, 0);
 *
 * @param {Q.Data} data
 * @returns {Object}
 */
Q.HashList.prototype.addFirst = function (data){};
/**
 * Delete elements
 * @param {Q.Data} data
 */
Q.HashList.prototype.remove = function (data) {};
/**
 * Delete elements via element number
 * @param {int} id The only number
 */
Q.HashList.prototype.removeById = function (id) {};
/**
 * Set element collection
 * @param {(Q.Data|Array)} data Element or element collection
 */
Q.HashList.prototype.set = function (data) {};
/**
 * Removes all elements
 */
Q.HashList.prototype.clear = function () {};
/**
 * Acquire element collection
 * @returns {Array}
 */
Q.HashList.prototype.toDatas = function () {};
/**
 * If data models are empty
 * @returns {Boolean}
 */
Q.HashList.prototype.isEmpty = function () {};
/**
 * Copy collection
 * @param {boolean} deep
 * @returns {Q.HashList}
 */
Q.HashList.prototype.clone = function (deep){};
/**
 * Data collection
 * @type Array
 */
Q.HashList.prototype.datas = {};
/**
 * Random element
 * @type Q.Data
 */
Q.HashList.prototype.random = {};
/**
 * Element quantity
 * @type int
 */
Q.HashList.prototype.length = {};
/**
 * Drag support class, to provide drag interaction support for HTML elements, supporting mouse and touch events
 * @constructor
 * @param {HTMLElement} html
 * @param {Object} listener
 */
Q.DragSupport = function (html, listener, scope){};
/**
 * Destroy listening
 * @returns {Object}
 */
Q.DragSupport.prototype.destroy = function (){};
/**
 * Prompt box, referring to window#alert
 * @static
 * @param {Object} text
 * @returns {Object}
 */
Q.alert = function (text){};
/**
 * Input box
 * @static
 * @param {Object} message
 * @param {Object} value
 * @param {Object} callback
 * @param {Object} scope
 * @returns {Object}
 */
Q.prompt = function (message, value, callback, scope){};
/**
 * Confirm box
 * @static
 * @param {Object} message
 * @param {Object} callback
 * @param {Object} scope
 * @returns {Object}
 */
Q.confirm = function (message, callback, scope){};
/**
 * Adds new CSS rules
 * @static
 * @param {Object} selector
 * @param {Object} rulesStr
 * @returns {Object}
 */
Q.addCSSRule = function (selector, rulesStr) {};
/**
 * Create <canvas>, and assign width and height
 * @static
 * @param {number} w width
 * @param {number} h height
 * @returns {HTMLCanvasElement}
 */
Q.createCanvas = function (w, h, withRatio){};
/**
 * Draw pictures to canvas, supporting png, svg and gif (except IE), supporting built-in graphics, Q.Path, and user-defined draw function
 * @static
 * @param {Object} key Image registered name, image linkage or image drawing object
 * @param {Object} canvas Canvas where images are drawn on this object
 * @param {Object} styles Draw style param, including filling color and shadow effect etc.
 * @see Q.registerImage
 */
Q.drawImage = function (key, canvas, styles){};
/**
 * Register pictures, supporting png, svg and gif (except IE), supporting built-in graphics, Q.Path, and user-defined draw function
 * @static
 * @param {string} key
 * @param {Object} data
 */
Q.registerImage = function (key, data, width, height){};
/**
 * Judge if images are registered
 * @static
 * @param {String} key
 * @returns {Boolean}
 * @see Q.registerImage
 */
Q.hasImage = function (key){};
/**
 * Acquire all registered images
 * @static
 * @returns {Array}
 */
Q.getAllImages = function (){};
/**
 * Path segment
 * @constructor
 * @param {Object} type
 * @param {Object} points
 */
Q.PathSegment = function (type, points){};
/**
 * Export JSON for data serialization
 * @returns {Object}
 */
Q.PathSegment.prototype.toJSON = function (){};
/**
 * Resolve JSON data, and generate properties in the path segments for data deserialization
 * @param {Object} json
 * @returns {Object}
 */
Q.PathSegment.prototype.parseJSON = function (json){};
/**
 * Information of coordinate point of path segment
 * @type null
 */
Q.PathSegment.prototype.points = {};
/**
 * Type of path segment
 * @type string
 */
Q.PathSegment.prototype.type = {};
/**
 * Copy path segment
 * @returns {Q.PathSegment}
 */
Q.PathSegment.prototype.clone = function (){};
/**
 * Move coordinate point
 * @param {Object} dx
 * @param {Object} dy
 * @returns {Object}
 */
Q.PathSegment.prototype.move = function (dx, dy){};
/**
 * Polygon element
 * @constructor
 * @extends Q.Node
 * @param {Object} name
 * @param {Q.Path} path
 */
Q.ShapeNode = function (name, path){};
Q.ShapeNode.prototype = new Q.Node();
/**
 * Move brush
 * @param {number} x
 * @param {number} y
 */
Q.ShapeNode.prototype.moveTo = function (x, y) {};
/**
 * Drawn line
 * @param {number} x
 * @param {number} y
 */
Q.ShapeNode.prototype.lineTo = function (x, y) {};
/**
 * Quadratic curve
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
Q.ShapeNode.prototype.quadTo = function (x1, y1, x2, y2) {};
/**
 * Cubic curve
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 */
Q.ShapeNode.prototype.curveTo = function (x1, y1, x2, y2, x3, y3) {};
/**
 * Arc
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} radius
 */
Q.ShapeNode.prototype.arcTo = function (x1, y1, x2, y2, radius) {};
/**
 *Close
 */
Q.ShapeNode.prototype.closePath = function () {};
/**
 * Clear path
 */
Q.ShapeNode.prototype.clear = function (){};
/**
 * Delete path segment according to segment position
 * @param {Int} index
 */
Q.ShapeNode.prototype.removePathSegmentByIndex = function (index){};
/**
 * Path changes
 */
Q.ShapeNode.prototype.firePathChange = function (){};
/**
 * Polygon path
 * @type Q.Path
 */
Q.ShapeNode.prototype.path = {};
/**
 * Bus element
 * @constructor
 * @extends Q.ShapeNode
 * @param {Object} name
 * @param {Object} path
 */
Q.Bus = function (name, path){};
Q.Bus.prototype = new Q.ShapeNode.prototype.agentNode();
/**
 * Group element type
 * @constructor
 * @extends Q.Node
 * @param {Object} name
 * @param {number} x
 * @param {number} y
 */
Q.Group = function (name, x, y){};
Q.Group.prototype = new Q.Node();
/**
 * Unfold combined properties
 * @type null
 */
Q.Group.prototype.expanded = {};
/**
 * Min size of group
 * @type null
 */
Q.Group.prototype.minSize = {};
/**
 * Group type
 * @type String
 */
Q.Group.prototype.groupType = {};
/**
 * Internal gap of group
 * @type Q.Insets
 */
Q.Group.prototype.padding = {};
/**
 * Group image
 * @type Object
 */
Q.Group.prototype.groupImage = {};
/**
 * Text element
 * @constructor
 * @extends Q.Node
 * @param {Object} label
 * @param {Object} x
 * @param {Object} y
 */
Q.Text = function (label, x, y){};
Q.Text.prototype = new Q.Node();
/**
 * Adjust size interactive device
 * @constructor
 * @param {Q.Graph} graph
 */
Q.ResizeInteraction = function (graph){};
/**
 * To delete this element, callback this method. If the currently-edited element is deleted, all edit status will be cleared
 * @param {Object} element
 * @param {Q.Graph} graph
 * @returns {Object}
 */
Q.ResizeInteraction.prototype.onElementRemoved = function (element, graph){};
/**
 * To clear this element, callback this method. If the currently-edited element is deleted, all edit status will be cleared
 * @param {Q.Graph} graph
 * @returns {Object}
 */
Q.ResizeInteraction.prototype.onClear = function (graph){};
/**
 * Create image interactive listener
 * @constructor
 * @param {Q.Graph} graph
 */
Q.CreateShapeInteraction = function (graph){};
/**
 * Default drawn styles of polygon during interaction include line width and filling color and the like information
 * @returns {Object}
 */
Q.CreateShapeInteraction.prototype.getDefaultDrawStyles = function (){};
/**
 * Call this function when a polygon is created
 * @param {Object} evt
 * @param {Q.Graph} graph
 */
Q.CreateShapeInteraction.prototype.finish = function (evt, graph){};
/**
 * Create a polygon element
 * @param {Object} evt
 * @param {Array} pathSegments
 * @param {Number} cx
 * @param {Number} cy
 * @returns {Q.ShapeNode}
 */
Q.CreateShapeInteraction.prototype.createElement = function (evt, pathSegments, cx, cy){};
/**
 * If the path is closed
 * @type boolean
 */
Q.CreateShapeInteraction.prototype.isClosePath = {};
/**
 * Interactive drawing
 * @param {CanvasRenderingContext2D} g
 * @param {Number} scale
 */
Q.CreateShapeInteraction.prototype.doDraw = function (g, scale){};
/**
 * Set brush drawing style, which includes line width, color and filling color etc.
 * @see Q.CreateShapeInteraction#getDefaultDrawStyles
 * @param {CanvasRenderingContext2D} g
 */
Q.CreateShapeInteraction.prototype.styleDraw = function (g){};
/**
 * Drawing point
 * @param {CanvasRenderingContext2D} g
 * @param {Object} p
 * @param {Boolean} moveTo If it is moveTo
 */
Q.CreateShapeInteraction.prototype.drawPoint = function (g, p, moveTo){};
/**
 * Current mouse point
 * @type Object
 */
Q.CreateShapeInteraction.prototype.currentPoint = {};
/**
 * Collection of coordinate points
 * @type Array
 */
Q.CreateShapeInteraction.prototype.points = {};
/**
 When a element is deleted, callback this function, to ensure prompt update of interactive canvas
 * @param {Q.Element} element
 * @param {Q.Graph} graph
 */
Q.CreateShapeInteraction.prototype.onElementRemoved = function (element, graph){};
/**
 * When a element vessel is cleared, callback this function, to ensure prompt update of interactive canvas
 * @param {Q.Graph} graph
 */
Q.CreateShapeInteraction.prototype.onClear = function (graph){};
/**
 * Invalid canvas
 */
Q.CreateShapeInteraction.prototype.invalidate = function (){};
/**
 * Delete interactive canvas
 */
Q.CreateShapeInteraction.prototype.removeDrawable = function (){};
/**
 * Adds interactive canvas
 */
Q.CreateShapeInteraction.prototype.addDrawable = function (){};
/**
 * When clicking "ESC", whether to cancel the current interaction is defaulted to true
 * @type boolean
 */
Q.CreateShapeInteraction.prototype.escapable = {};
/**
 * Create a listener for line interaction
 * @constructor
 * @extends Q.CreateShapeInteraction
 * @param {Q.Graph} graph
 */
Q.CreateLineInteraction = function (graph){};
Q.CreateLineInteraction.prototype = new Q.CreateShapeInteraction();
/**
 * Simply connection the interaction listener
 * @constructor
 * @param {Q.Graph} graph
 */
Q.CreateSimpleEdgeInteraction = function (graph){};
/**
 * Draw machine interaction interface
 * @param {CanvasRenderingContext2D} g
 * @param {Object} scale
 * @returns {Object}
 */
Q.CreateSimpleEdgeInteraction.prototype.doDraw = function (g, scale){};
/**
 * Whether a node is permitted to be regarded as start node of the link
 * @param {Q.Node} node
 * @param {Q.Graph} graph
 * @returns {Object} Boolean
 */
Q.CreateSimpleEdgeInteraction.prototype.canLinkFrom = function (node, graph){};
/**
 * Whether a node is permitted to be regarded as end node of the link
 * @param {Q.Node} node
 * @param {Q.Graph} graph
 * @returns {Object} Boolean
 */
Q.CreateSimpleEdgeInteraction.prototype.canLinkTo = function (node, graph){};
/**
 * Acquire default drawing style
 * @returns {Object}
 */
Q.CreateSimpleEdgeInteraction.prototype.getDefaultDrawStyles = function (){};
/**
 * Text editor
 * @constructor
 */
Q.LabelEditor = function (){};
/**
 * HTML elements for text edition
 * @type HTMLElement
 */
Q.LabelEditor.prototype.html = {};
/**
 * Create HTML elements, and default to create the element of TextArea
 * @returns {Object}
 */
Q.LabelEditor.prototype.createHTML = function (){};
/**
 * Set text content and font
 * @param {Object} text
 * @param {Object} fontSize
 * @returns {Object}
 */
Q.LabelEditor.prototype.setText = function (text, fontSize) {};
/**
 *
 * @param {Object} input
 * @returns {Object}
 */
Q.LabelEditor.prototype.onSizeChange = function (input){};
/**
 * In case of change of text in input box, callback this function. Make dynamic adjustment on textbox size
 * @param {Object} evt
 * @returns {Object}
 */
Q.LabelEditor.prototype.onValueChange = function (evt){};
/**
 * Assign position and text of textbox, indicate the textbox and start to edit
 * @param {Object} x
 * @param {Object} y
 * @param {Object} text
 * @param {Object} fontSize
 * @param {Object} callback
 * @returns {Object}
 */
Q.LabelEditor.prototype.startEdit = function (x, y, text, fontSize, callback){};
/**
 * Whether it is being edited. It means under edition when the textbox is in visible status
 * @returns {Object}
 */
Q.LabelEditor.prototype.isEditing = function (){};
/**
 * Cancel edition and hide textbox
 * @returns {Object}
 */
Q.LabelEditor.prototype.cancelEdit = function (){};
/**
 * Stop edition. Cancel the edition if the param cancel is true. Otherwise the new text value will be set for bound element
 * @param {Boolean} cancel If to cancel
 * @returns {Object}
 */
Q.LabelEditor.prototype.stopEdit = function (cancel){};
/**
 * Delete components of textbox
 * @returns {Object}
 */
Q.LabelEditor.prototype.destroy = function (){};
/**
 * Offset interaction device
 * @constructor
 * @param {Q.Graph} graph
 */
Q.PanInteraction = function (graph){};
/**
 * Click interaction device
 * @constructor
 * @param {Q.Graph} graph
 */
Q.SelectionInteraction = function (graph){};
/**
 * Interaction device for node movement
 * @constructor
 * @param {Q.Graph} graph
 */
Q.MoveInteraction = function (graph){};
/**
 * Interaction device for roller zooming
 * @constructor
 * @param {Q.Graph} graph
 */
Q.WheelZoomInteraction = function (graph) {};
/**
 * Double click the interaction device
 * @constructor
 * @param {Q.Graph} graph
 */
Q.DoubleClickInteraction = function (graph){};
/**
 * Interaction device for image export
 * @constructor
 * @param {Q.Graph} graph
 */
Q.ExportInteraction = function (graph){};
/**
 * Interaction device of text prompt box
 * @constructor
 * @param {Q.Graph} graph
 */
Q.TooltipInteraction = function (graph){};
/**
 * Select interaction device
 * @constructor
 * @param {Q.Graph} graph
 */
Q.RectangleSelectionInteraction = function (graph){};
/**
 * Interaction listener for edition of inflection point
 * @constructor
 * @param {Q.Graph} graph
 */
Q.PointsInteraction = function (graph){};
/**
 * Callback this function when the element is deleted
 * @param {Q.Element} element
 * @param {Q.Graph} graph
 */
Q.PointsInteraction.prototype.onElementRemoved = function (element, graph){};
/**
 * Callback this function when the canvas element is cleared
 * @param {Q.Graph} graph
 */
Q.PointsInteraction.prototype.onClear = function (graph){};
/**
 * Invalid interaction device, which can be used to update the drawing status during the process of interaction
 * @returns {Object}
 */
Q.PointsInteraction.prototype.invalidate = function (){};
/**
 * Automatic layout, calculate the element position automatically according to topological relation of nodes, parent relation or other relation, to realize automatic layout of elements
 * @constructor
 * @static
 */
Q.Layouter = function (graph){};
/**
 * Acquire node scope
 * @see Q.Graph#getUIBounds
 * @param {Object} node
 * @returns {Object}
 */
Q.Layouter.prototype.getNodeBounds = function (node) {};
/**
 * If possible to join in layout
 * @param {Object} node
 * @param {Object} from
 * @returns {Object}
 */
Q.Layouter.prototype.isLayoutable = function (node, from){};
/**
 * Acquire layout result in following format {id: {x, y, node}}
 * @param {Object} params
 * @returns {Object}
 */
Q.Layouter.prototype.getLayoutResult = function (params){};
/**
 * Set node coordinate
 * @param {Object} locations is key-value format, where key is node id and value is the information of node position, referring to {"10": {node: nodeA, x: 100, y: 100}}
 * @param {boolean} byAnimate if animation is applied
 * @param {number} duration Duration of animation
 * @param {Object} animationType Type of animation
 * @param {Function} callback Callback function
 */
Q.Layouter.prototype.updateLocations = function (locations, byAnimate, duration, animationType, callback){};
/**
 * Start layout
 * @param {Object} params
 * @param {Object} immediately
 * @returns {Object}
 */
Q.Layouter.prototype.doLayout = function (params, immediately) {};
/**
 * If it is in horizontal direction
 * @static
 * @param {String} direction
 * @returns {Boolean}
 */
Q.isHorizontalDirection = function (direction){};
/**
 * Bubble layouter
 * Bubble layout is similar to tree layout, which is applicable for expression of tree graph. The layout is arranged in a round and is a high efficiency type of layout
 * @constructor
 * @extends Q.Layouter
 * @param {Q.Graph} graph
 * @param {Object} radius
 * @param {Object} gap
 * @param {Object} startAngle
 */
Q.BalloonLayouter = function (graph, radius, gap, startAngle){};
Q.BalloonLayouter.prototype = new Q.Layouter();
/**
 * Types of angle distribution include separately the distribution according to needs and average distribution: {@link Q.Consts.ANGLE_SPACING_PROPORTIONAL}, {@link Q.Consts.ANGLE_SPACING_REGULAR}
 * @type string
 */
Q.BalloonLayouter.prototype.angleSpacing = {};
/**
 * Radius mode includes two kinds: {@link Q.Consts.RADIUS_MODE_UNIFORM}, {@link Q.Consts.RADIUS_MODE_VARIABLE}
 * @type string
 */
Q.BalloonLayouter.prototype.radiusMode = {};
/**
 * Default gaps are used to control the distance among adjacent nodes
 * @type number
 */
Q.BalloonLayouter.prototype.gap = {};
/**
 * Min radius is used to control the min distance among the top and the bottom nodes
 * @type number
 */
Q.BalloonLayouter.prototype.radius = {};
/**
 * Start angle is used to rotate the entire layout
 * @type number
 */
Q.BalloonLayouter.prototype.startAngle = {};
/**
 * Node default size (radius). Each node in the bubble layout is equivalent to a round. The node size is indicated by the radius. It is defaulted to get radius of width and height of node UI. If no initialization at node UI, the default size will be obtained
 * @type number
 */
Q.BalloonLayouter.prototype.defaultSize = {};
/**
 * Acquire the min radius of node. It is defaulted to go back to the property of {@link Q.BalloonLayouter#radius}
 * @param {Object} node
 * @param {Object} level
 * @param {Object} isLeaf
 * @returns {Object}
 */
Q.BalloonLayouter.prototype.getRadius = function (node, level, isLeaf){};
/**
 * Acquire node size. Each node in the bubble layout is equivalent to a round. The node size is indicated by the radius. It is defaulted to get radius of width and height of node UI. If no initialization at node UI, go back to the default size{@link Q.BalloonLayouter#defaultSize}
 * @param {Object} node
 * @param {Object} level
 * @param {Object} isLeaf
 * @returns {Object}
 */
Q.BalloonLayouter.prototype.getNodeSize = function (node, level, isLeaf){};
/**
 * Acquire the gap of adjacent nodes. It is defaulted to go back to the default gap {@link Q.BalloonLayouter#gap}
 * @param {Object} node
 * @param {Object} level
 * @param {Object} isLeaf
 * @returns {Object}
 */
Q.BalloonLayouter.prototype.getGap = function (node, level, isLeaf){};
/**
 * For spring layout, electrostatic repulsion, spring tension and central gravitation shall be balanced to separate nodes and reach a dynamic distribution effect
 * @constructor
 * @param {Q.Graph} graph
 * @param {Object} gap
 * @extends Q.Layouter
 */
Q.SpringLayouter = function (graph) {};
Q.SpringLayouter.prototype = new Q.Layouter();
/**
 * Set up the initial informaion of layout nodes, such as electrostatic size and initial speed
 * @param {Q.Node} node Node element
 * @param {Object} nodeInfo Layout node objects
 */
Q.SpringLayouter.prototype.appendNodeInfo = function (node, nodeInfo) {};
/**
 * Set the link layout information, such as elastic coefficient or initial speed
 * @param {Q.Edge} edge Link element
 * @param {Object} edgeInfo Object of link layout
 */
Q.SpringLayouter.prototype.appendEdgeInfo = function (edge, edgeInfo) {};
/**
 * Set the node quality (the higher the quality is, the greater the repulsion will be)
 * @param {Q.Node} node
 * @param {Number} mass Defaults to 1
 */
Q.SpringLayouter.prototype.setMass = function (node, mass) {};
/**
 * Set elastic coefficient
 * @param {Q.Edge} edge
 * @param {Number} k
 */
Q.SpringLayouter.prototype.setElasticity = function (edge, k) {};
/**
 * Every time the value of time gap in the process of kinematics calculation is simulated, the shorter the time gap is, the more accurate the simulated calculation will be. But the recursion frequency will also be greater, default to 0.15
 * @type number
 */
Q.SpringLayouter.prototype.timeStep = {};
/**
 * Electrostatic repulsion coefficient, the higher the coefficient is the greater the node gap will be, default to 50
 * @type number
 */
Q.SpringLayouter.prototype.repulsion = {};
/**
 * Central attraction coefficient, the higher the coefficient is the lower the node gap will be, default to 0.1
 * @type number
 */
Q.SpringLayouter.prototype.attractive = {};
/**
 * Elastic coefficient, the higher the coefficient is the greater the elasticity will be, defaulted to 3
 * @type number
 */
Q.SpringLayouter.prototype.elastic = {};
/**
 * Convert the integer value to Internet-supported color string, and the semitransparent is allowed
 * @param {Number} int16 integer value, such as 0xFFFFFF indicating white, or 0x77000000 indicating black in semitransparent
 * @returns {String} go back to color string, such as "#FFFFFF". If it is in transparent, go back to "rgba(0,0,0,0.4)" and the like
 * @static
 */
Q.toColor = function (int16) {};
/**
 * Printing information of console
 * @see console.log
 * @param {String} o
 * @static
 */
Q.log = function (o) {};
/**
 * Output abnormal information in the console
 * @static
 * @param {Object} error
 */
Q.error = function (error){};
/**
 * Details about printing object in the console
 * @see console.trace
 * @param {Object} o
 * @static
 */
Q.trace = function (o) {};
/**
 * If it is IE browser
 * @type Boolean
 */
Q.isIE = {};
/**
 * If it is Opera browser
 * @type Boolean
 */
Q.isOpera = {};
/**
 * If it is the browser taking webkit as core
 * @type Boolean
 */
Q.isWebkit = {};
/**
 * If it is the browser taking gecko as core, such as firefox
 * @type Boolean
 */
Q.isGecko = {};
/**
 * If it is Firefox browser
 * @type Boolean
 */
Q.isFirefox = {};
/**
 * If it is Safari browser
 * @type Boolean
 */
Q.isSafari = {};
/**
 * If it is Google Chrome browser
 * @type Boolean
 */
Q.isChrome = {};
/**
 * If it is Mac OS X operating system
 * @type Boolean
 */
Q.isMac = {};
/**
 * Default style sheet
 * @see Q.Styles
 * @see Q.Graph#styles
 * @type Object
 * @namespace
 * @static
 */
Q.DefaultStyles = {};
/**
 * Default property list
 * @type Object
 * @namespace
 * @static
 */
Q.Defaults = {};
/**
 * Select pixel tolerance. Setting the selection tolerance can improve the click interaction. When a line is specially fine, it is generally not easy to click on the element directly. If the selection tolerance is set to two pixels, the element is clickable within the scope two pixels from the line
 * Selected pixel tolerance will not change as the zooming of canvas
 * @type number
 * @static
 */
Q.Defaults.SELECTION_TOLERANCE = {};
/**
 * Whether the double canvas buffer mechanism is adopted, the bug for processing partial browser is selected for this item, so it is not recommended to use user setting
 * @private
 * @type Boolean
 */
Q.Defaults.DOUBLE_BUFFER = {};
/**
 * Default word color
 * @type String
 * @static
 */
Q.Defaults.LABEL_COLOR = {};
/**
 * Default font style
 * @static
 * @type string
 */
Q.Defaults.FONT_STYLE = {};
/**
 * Default font size
 * @static
 * @type number
 */
Q.Defaults.FONT_SIZE = {};
/**
 * Default font family name
 * @static
 * @type string
 */
Q.Defaults.FONT_FAMILY = {};
/**
 * Default font, equal to {@link Q.Defaults.FONT_STYLE} + {@link Q.Defaults.FONT_SIZE} + {@link Q.Defaults.FONT_FAMILY}
 * @static
 * @type string
 */
Q.Defaults.FONT = {};
/**
 * Double click the gap time (unit: ms)
 * @static
 * @type number
 */
Q.Defaults.DOUBLE_CLICK_INTERVAL_TIME = {};
/**
 * Long press time gap (unit: ms)
 * @static
 * @type number
 */
Q.Defaults.LONG_PRESS_INTERVAL = {};
/**
 * Default the selected type, supporting three modes
 * @see Q.Consts.SELECTION_TYPE_BORDER_RECT
 * @see Q.Consts.SELECTION_TYPE_BORDER
 * @see Q.Consts.SELECTION_TYPE_SHADOW
 * @static
 * @type string
 */
Q.Defaults.SELECTION_TYPE = {};
/**
 * Default the selected border width
 * @static
 * @type number
 */
Q.Defaults.SELECTION_BORDER = {};
/**
 * Default the selected shadow size
 * @static
 * @type number
 */
Q.Defaults.SELECTION_SHADOW_BLUR = {};
/**
 * Default selected color
 * @static
 * @type string
 */
Q.Defaults.SELECTION_COLOR = {};
/**
 * Default fillet radius of border
 * @static
 * @type number
 */
Q.Defaults.BORDER_RADIUS = {};
/**
 * Default the printer width of bubbling
 * @static
 * @type number
 */
Q.Defaults.POINTER_WIDTH = {};
/**
 * Default arrow size
 * @static
 * @type number
 */
Q.Defaults.ARROW_SIZE = {};
/**
 * Default the size of max image
 * @static
 * @type number
 */
Q.Defaults.IMAGE_MAX_SIZE = {};
/**
 * Default line height
 * @type number
 * @static
 */
Q.Defaults.LINE_HEIGHT = {};
/**
 * Default image height
 * @type number
 * @static
 */
Q.Defaults.IMAGE_WIDTH = {};
/**
 * Default image width
 * @type number
 * @static
 */
Q.Defaults.IMAGE_HEIGHT = {};
/**
 * Max buffer pixel count of single image, to enhance display effect and drawing efficiency, the internal image of Qunee will have cache according to different zooming level. If exceeding the max pixel count,
 * the image size will be bigger when the zooming ratio is high, since Qunee supports infinitely-variable zooming and vector graph. If exceeding the max buffer pixel, Qunee will not activate cache, while stopping dyeing rendering
 * Default value: 1000px * 1000px = 1000,000
 * @static
 * @type number
 */
Q.Defaults.MAX_CACHE_PIXELS = {};
/**
 * Mixture mode of default color
 * @static
 * @type string
 */
Q.Defaults.BLEND_MODE = {};
/**
 * Default group type
 * @static
 * @type string
 */
Q.Defaults.GROUP_TYPE = {};
/**
 * Default internal gap of group
 * @static
 * @type number
 */
Q.Defaults.GROUP_PADDING = {};
/**
 * Whether grouping is defaulted to display in expansion mode
 * @type Boolean
 * @static
 */
Q.Defaults.GROUP_EXPANDED = {};
/**
 * Default min size in case the grouping is expanded
 * @type object
 * @static
 */
Q.Defaults.GROUP_MIN_SIZE = {};
/**
 * Default text alignment method
 * @type Q.Position
 */
Q.Defaults.ALIGN_POSITION = {};
/**
 * Default navigation mode for image component, supporting three modes: rolling bar, navigation button, and null
 * @see Q.Consts.NAVIGATION_***
 * @static
 * @type string
 */
Q.Defaults.NAVIGATION_TYPE = {};
/**
 * Leftward icon on navigation panel
 * @static
 * @type string
 */
Q.Defaults.NAVIGATION_IMAGE_LEFT = {};
/**
 * Upward icon on navigation panel
 * @static
 * @type string
 */
Q.Defaults.NAVIGATION_IMAGE_TOP = {};
/**
 * Default interaction and zooming animation
 * @static
 * @type object
 */
Q.Defaults.ZOOM_ANIMATE = {};
/**
 * Default max duration of animation
 * @static
 * @type number
 */
Q.Defaults.ANIMATION_MAXTIME = {};
/**
 * Default type of animation
 * @static
 * @param {Object} t
 * @returns {Object}
 */
Q.Defaults.ANIMATION_TYPE = function (t) {};
/**
 * During touch interaction, the default size of interaction handle
 * @static
 * @type number
 */
Q.Defaults.INTERACTION_HANDLER_SIZE_TOUCH = {};
/**
 * During desktop interaction, the default size of interaction handle
 * @static
 * @type number
 */
Q.Defaults.INTERACTION_HANDLER_SIZE_DESKTOP = {};
/**
 * During touch interaction, radius of rotate handle
 * @static
 * @type number
 */
Q.Defaults.INTERACTION_ROTATE_HANDLER_SIZE_TOUCH = {};
/**
 * During desktop interaction, radius of rotate handle
 * @static
 * @type number
 */
Q.Defaults.INTERACTION_ROTATE_HANDLER_SIZE_DESKTOP = {};
/**
 * When selecting status, the border style (line width) of selected rectangle
 * @static
 * @type number
 */
Q.Defaults.SELECTION_RECTANGLE_STROKE = {};
/**
 * When selecting status, the border color of selected rectangle
 * @static
 * @type string
 */
Q.Defaults.SELECTION_RECTANGLE_STROKE_COLOR = {};
/**
 * When selecting status, the filling color of selected rectangle
 * @static
 * @type string
 */
Q.Defaults.SELECTION_RECTANGLE_FILL_COLOR = {};
/**
 * Registered default interaction mode
 * @param {String} name Mode name
 * @param {Array} interactions Collection of interaction listener
 * @param {String} cursor Default cursor
 * @static
 */
Q.Defaults.registerInteractions = function (name, interactions, cursor) {};
/**
 * If wire bundle is defaulted to expand
 * @type Boolean
 * @static
 */
Q.Defaults.EDGE_BUNDLE_EXPANDED = {};
/**
 * Name list of styles
 * @example Set selected color to red
 * var node = graph.createNode("node");
 * node.setStyle(Q.Styles.SELECTION_COLOR, "#FF0000");
 *
 * @see Element#setStyle
 * @type Object
 * @namespace
 * @static
 */
Q.Styles = {};
/**
 * Selected color
 * @type String
 * @static
 */
Q.Styles.SELECTION_COLOR = {};
/**
 * Selected border width
 * @type String
 * @static
 */
Q.Styles.SELECTION_BORDER = {};
/**
 * Selected shadow blur distance
 * @type String
 * @static
 */
Q.Styles.SELECTION_SHADOW_BLUR = {};
/**
 * Selected shadow x offset
 * @static
 * @type string
 */
Q.Styles.SELECTION_SHADOW_OFFSET_X = {};
/**
 * Selected shadow y offset
 * @static
 * @type string
 */
Q.Styles.SELECTION_SHADOW_OFFSET_Y = {};
/**
 * Selected type, supporting three modes
 * @see Q.Consts.SELECTION_TYPE_BORDER_RECT
 * @see Q.Consts.SELECTION_TYPE_BORDER
 * @see Q.Consts.SELECTION_TYPE_SHADOW
 * @static
 * @type string
 */
Q.Styles.SELECTION_TYPE = {};
/**
 * Rendering color
 * @static
 * @type string
 */
Q.Styles.RENDER_COLOR = {};
/**
 * Color rendering mode
 * @static
 * @type string
 */
Q.Styles.RENDER_COLOR_BLEND_MODE = {};
/**
 * Shadow blur distance
 * @static
 * @type string
 */
Q.Styles.SHADOW_BLUR = {};
/**
 * Shadow color
 * @static
 * @type string
 */
Q.Styles.SHADOW_COLOR = {};
/**
 * Shadow x offset
 * @static
 * @type string
 */
Q.Styles.SHADOW_OFFSET_X = {};
/**
 * Shadow y offset
 * @static
 * @type string
 */
Q.Styles.SHADOW_OFFSET_Y = {};
/**
 * Image stroke width
 * @type String
 * @static
 */
Q.Styles.SHAPE_STROKE = {};
/**
 * Image stroke style can be used to set stroke color
 * SHAPE_***The style works only when the element image is Shape, such as setting node image as rounded rectangle: node.image = Q.Shapes.getRect(0, 0, 90, 50, 10);
 * @see Q.Node#image
 * @example Set the stroke color of element image in red
 * var node = graph.createNode("node");
 * node.image = Q.Shapes.getRect(0, 0, 90, 50, 10);
 * node.setStyle(Q.Styles.SHAPE_STROKE_STYLE, "#FF0000");
 * @type String
 * @static
 */
Q.Styles.SHAPE_STROKE_STYLE = {};
/**
 * Vector graph, dotted line style, property value is a value or value collection, such as: [5, 2]
 * @example
 var shape = Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -30, -5, 60, 25);
 var line = graph.createNode(null, 0, 0);
 line.setStyle(Q.Styles.SHAPE_STROKE, 1);
 line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, Colors.yellow);
 line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 2]);
 line.image = shape;
 * @static
 * @type String
 */
Q.Styles.SHAPE_LINE_DASH = {};
/**
 * Vector graph, dotted line style, dotted line offset, add offset at periodical time, cable to realize the flow effect of lines, not supporting IE
 * @static
 * @type String
 * @example
 var offset = 0;
 var timer = setInterval(function(){
     offset += -1;
     shape.setStyle(Q.Styles.SHAPE_LINE_DASH_OFFSET, offset);
 }, 150);
 */
Q.Styles.SHAPE_LINE_DASH_OFFSET = {};
/**
 * Image filling color
 * @type String
 * @static
 */
Q.Styles.SHAPE_FILL_COLOR = {};
/**
 * Image filling gradient
 * @Gradient
 * @type String
 * @static
 */
Q.Styles.SHAPE_FILL_GRADIENT = {};
/**
 * Outline border of polygon
 * @static
 * @type string
 */
Q.Styles.SHAPE_OUTLINE = {};
/**
 * Outline border style of polygon
 * @static
 * @type string
 */
Q.Styles.SHAPE_OUTLINE_STYLE = {};
/**
 * Line endpoint style, applicable for Edge, and the Node taking Shape as the main part
 * @type String
 * @static
 */
Q.Styles.LINE_CAP = {};
/**
 * Style of line joints
 * @type String
 * @static
 */
Q.Styles.LINE_JOIN = {};
/**
 * Set accessories and layout along the image path. Each element in Qunee is comprised of many UI components, where one of them is called main UI and others are called accessories. The The position of main UI is obtained by calculation of element coordinate property, \\
 * The position of accessory UI is relative to main UI or another accessory module.
 * For example, one Node element is comprised of one image and one label. The label is relative to image layout. The position of image is the location coordinate of this element, and the label position is relative to image,
 * It is defaulted to locate under image. It can be set to nine positions such as top, bottom, right and left. If this image is not a picture, it is a shape, such as broken line.
 * Now layout the label along the broken line and rotate along the direction of broken line by setting the style property of Q.Styles.LAYOUT_BY_PATH
 * It reacts to Node only
 * @see Q.Styles.LABEL_ROTATABLE
 * @type String
 * @static
 */
Q.Styles.LAYOUT_BY_PATH = {};
/**
 * Background color
 * @type String
 * @static
 */
Q.Styles.BACKGROUND_COLOR = {};
/**
 * Background gradient
 * @Gradient
 * @type String
 * @static
 */
Q.Styles.BACKGROUND_GRADIENT = {};
/**
 * Border width
 * @type String
 * @static
 */
Q.Styles.BORDER = {};
/**
 * Border color
 * @type String
 * @static
 */
Q.Styles.BORDER_COLOR = {};
/**
 * Dotted line style of border, property value is a value or value collection, such as: [5, 2]
 * @static
 * @type string
 */
Q.Styles.BORDER_LINE_DASH = {};
/**
 * Dotted line offset of border, the property value is a value. Replace this style at periodical time, and be able to realize flow effect of lines
 * @static
 * @type string
 */
Q.Styles.BORDER_LINE_DASH_OFFSET = {};
/**
 * Fillet value of border, be able to set values or: {x: 10, y: 20}
 * @static
 * @type string
 */
Q.Styles.BORDER_RADIUS = {};
/**
 * Internal gap is the gap between background or border and UI component when background or border is set
 * @see Q.Insets
 * @type String
 * @static
 */
Q.Styles.PADDING = {};
/**
 * Background color of image
 * @static
 * @type string
 */
Q.Styles.IMAGE_BACKGROUND_COLOR = {};
/**
 * Background gradient of image
 * @static
 * @type string
 */
Q.Styles.IMAGE_BACKGROUND_GRADIENT = {};
/**
 * Image border
 * @static
 * @type string
 */
Q.Styles.IMAGE_BORDER = {};
/**
 * Image border style
 * @static
 * @type string
 */
Q.Styles.IMAGE_BORDER_STYLE = {};
/**
 * Dotted line style of image border
 * @static
 * @type string
 */
Q.Styles.IMAGE_BORDER_LINE_DASH = {};
/**
 * Dotted line offset of image border
 * @static
 * @type string
 */
Q.Styles.IMAGE_BORDER_LINE_DASH_OFFSET = {};
/**
 * Fillet radius of image border
 * @static
 * @type string
 */
Q.Styles.IMAGE_BORDER_RADIUS = {};
/**
 * Fillet radius of image border, equal to {Q.Styles.IMAGE_BORDER_RADIUS}
 * @static
 * @type string
 */
Q.Styles.IMAGE_RADIUS = {};
/**
 * Internal gap of image
 * @static
 * @type string
 */
Q.Styles.IMAGE_PADDING = {};
/**
 * Rotate angle of text label, the property value is arc
 * @static
 * @type string
 */
Q.Styles.LABEL_ROTATE = {};
/**
 * Position of text label, combined with Q.Styles.LABEL_ANCHOR_POSITION, for confirming the position of text label
 * @Position
 * @type String
 * @static
 */
Q.Styles.LABEL_POSITION = {};
/**
 * Position of mount point of text label, combined with Q.Styles.LABEL_ANCHOR_POSITION, for confirming the position of text label
 * @type String
 * @static
 */
Q.Styles.LABEL_ANCHOR_POSITION = {};
/**
 * Word color of text label
 * @type String
 * @static
 */
Q.Styles.LABEL_COLOR = {};
/**
 * Word size of text label
 * @example
 * node.setStyle(Q.Styles.LABEL_FONT_SIZE, 20);
 * @type String
 * @static
 */
Q.Styles.LABEL_FONT_SIZE = {};
/**
 * Word name of text label
 * @example
 * node.setStyle(Q.Styles.LABEL_FONT_FAMILY, "Helvetica");
 * @type String
 * @static
 */
Q.Styles.LABEL_FONT_FAMILY = {};
/**
 * Word style of text label
 * @example
 * node.setStyle(Q.Styles.LABEL_FONT_STYLE, "lighter");
 * @type String
 * @static
 */
Q.Styles.LABEL_FONT_STYLE = {};
/**
 * Internal gap of text label
 * @see Q.Insets
 * @type String
 * @static
 */
Q.Styles.LABEL_PADDING = {};
/**
 * Bubbling pointer width of text label
 * @see Q.Styles.LABEL_POINTER
 * @type String
 * @static
 */
Q.Styles.LABEL_POINTER_WIDTH = {};
/**
 * If the bubbling pointer of text label is displayed
 * @see Q.Styles.LABEL_POINTER_WIDTH
 * @example
 * var node = graph.createNode("Hello Qunee");
 * node.setStyle(Q.Styles.LABEL_OFFSET_Y, -10);
 * node.setStyle(Q.Styles.LABEL_BORDER, 1);
 * node.setStyle(Q.Styles.LABEL_POINTER, true);
 * node.setStyle(Q.Styles.LABEL_PADDING, new Q.Insets(2, 5));
 * @type String
 * @static
 */
Q.Styles.LABEL_POINTER = {};
/**
 * Fillet width of text label, supporting a value or such objects: {x: 10, y: 10}
 * @type String
 * @static
 */
Q.Styles.LABEL_RADIUS = {};
/**
 * Text label x direction offset
 * @type String
 * @static
 */
Q.Styles.LABEL_OFFSET_X = {};
/**
 * Text label y direction offset
 * @type String
 * @static
 */
Q.Styles.LABEL_OFFSET_Y = {};
/**
 * Style of text size, set to {width: 100, height: 80}
 * @example
 * var text = graph.createText("Text");
 * text.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(100, 80));
 * @static
 * @type string
 */
Q.Styles.LABEL_SIZE = {};
/**
 * Text align method
 * @static
 * @type string
 */
Q.Styles.LABEL_ALIGN_POSITION = {};
/**
 * Border width of text label
 * @see Q.Styles.LABEL_BORDER_STYLE
 * @type String
 * @static
 */
Q.Styles.LABEL_BORDER = {};
/**
 * Border color of text label
 * @see Q.Styles.LABEL_BORDER
 * @type String
 * @static
 */
Q.Styles.LABEL_BORDER_STYLE = {};
/**
 * Background color of text label
 * @type String
 * @static
 */
Q.Styles.LABEL_BACKGROUND_COLOR = {};
/**
 * Background gradient of text label
 * @type String
 * @static
 */
Q.Styles.LABEL_BACKGROUND_GRADIENT = {};
/**
 * If text label is allowed to rotate
 * @see Q.Styles.LAYOUT_BY_PATH
 * @type String
 * @static
 */
Q.Styles.LABEL_ROTATABLE = {};
/**
 * Shadow blur distance of text label
 * @static
 * @type string
 */
Q.Styles.LABEL_SHADOW_BLUR = {};
/**
 * Shadow color of text label
 * @static
 * @type string
 */
Q.Styles.LABEL_SHADOW_COLOR = {};
/**
 * Shadow x offset of text label
 * @static
 * @type string
 */
Q.Styles.LABEL_SHADOW_OFFSET_X = {};
/**
 * Shadow y offset of text label
 * @static
 * @type string
 */
Q.Styles.LABEL_SHADOW_OFFSET_Y = {};
/**
 * Background color of group
 * @type String
 * @static
 */
Q.Styles.GROUP_BACKGROUND_COLOR = {};
/**
 * Background gradient of group
 * @type String
 * @static
 */
Q.Styles.GROUP_BACKGROUND_GRADIENT = {};
/**
 * Group stroke width
 * @see Q.Styles.GROUP_STROKE_STYLE
 * @type String
 * @static
 */
Q.Styles.GROUP_STROKE = {};
/**
 * Group stroke style
 * @see Q.Styles.GROUP_STROKE
 * @type String
 * @static
 */
Q.Styles.GROUP_STROKE_STYLE = {};
/**
 * Dotted line style of group sideline
 * @static
 * @type string
 */
Q.Styles.GROUP_STROKE_LINE_DASH = {};
/**
 * Dotted line offset of group sideline
 * @static
 * @type string
 */
Q.Styles.GROUP_STROKE_LINE_DASH_OFFSET = {};
/**
 * Rotate angle of line bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_ROTATE = {};
/**
 * Position of line bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_POSITION = {};
/**
 * Position of mount point of line bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_ANCHOR_POSITION = {};
/**
 * Color of line bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_COLOR = {};
/**
 * Word size of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_FONT_SIZE = {};
/**
 * Word family of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_FONT_FAMILY = {};
/**
 * Word style of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_FONT_STYLE = {};
/**
 * Internal gap of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_PADDING = {};
/**
 * Bubble pointer width of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_POINTER_WIDTH = {};
/**
 * Bubbling of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_POINTER = {};
/**
 * Fillet of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_RADIUS = {};
/**
 * Edge bundle text x offset
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_OFFSET_X = {};
/**
 * Edge bundle text y offset
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_OFFSET_Y = {};
/**
 * border of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_BORDER = {};
/**
 * Border style of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_BORDER_STYLE = {};
/**
 * Background color of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_BACKGROUND_COLOR = {};
/**
 * Border background gradient of edge bundle text
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_BACKGROUND_GRADIENT = {};
/**
 * If edge bundle text can be rotated
 * @static
 * @type string
 */
Q.Styles.EDGE_BUNDLE_LABEL_ROTATABLE = {};
/**
 * Edge width
 * @see Q.Edge
 * @type String
 * @static
 */
Q.Styles.EDGE_WIDTH = {};
/**
 * Edge colour
 * @see Q.Edge
 * @type String
 * @static
 */
Q.Styles.EDGE_COLOR = {};
/**
 * Border of edge outline
 * @static
 * @type string
 */
Q.Styles.EDGE_OUTLINE = {};
/**
 * Type of edge outline
 * @static
 * @type string
 */
Q.Styles.EDGE_OUTLINE_STYLE = {};
/**
 * Dotted line style of edge, property value is a value or value collection, such as: [5, 2]
 * @example
 *  edge1.setStyle(Q.Styles.EDGE_LINE_DASH, [8, 4, 0.01, 4]);
 * @static
 * @type string
 */
Q.Styles.EDGE_LINE_DASH = {};
/**
 * Offset of dotted line, it is for realizing edge flow effect
 * @static
 * @type string
 */
Q.Styles.EDGE_LINE_DASH_OFFSET = {};
/**
 * Offset from edge start end
 * @type String
 * @static
 */
Q.Styles.EDGE_FROM_OFFSET = {};
/**
 * Offset from terminal end of edge
 * @type String
 * @static
 */
Q.Styles.EDGE_TO_OFFSET = {};
/**
 * Edge bundle gap
 * @type String
 * @static
 */
Q.Styles.EDGE_BUNDLE_GAP = {};
/**
 * Edge looped bundle gap
 * @type String
 * @static
 */
Q.Styles.EDGE_LOOPED_EXTAND = {};
/**
 * Edge extension amount, proper for Consts.EDGE_TYPE_ELBOW*** edge
 * @type String
 * @static
 */
Q.Styles.EDGE_EXTEND = {};
/**
 * Edge control point, proper for Consts.EDGE_TYPE_ORTHOGONAL*** edge
 * @type String
 * @static
 */
Q.Styles.EDGE_CONTROL_POINT = {};
/**
 * Splitting by proportion, proper for Consts.EDGE_TYPE_ORTHOGONAL*** edge
 * @type String
 * @static
 */
Q.Styles.EDGE_SPLIT_BY_PERCENT = {};
/**
 * Split proportional value, 0 - 1, proper for Consts.EDGE_TYPE_ORTHOGONAL***, and split edges as per proportion
 * @see Q.Styles.EDGE_SPLIT_BY_PERCENT
 * @type String
 * @static
 */
Q.Styles.EDGE_SPLIT_PERCENT = {};
/**
 * Split position value of edge, 0 - 1, proper for Consts.EDGE_TYPE_ORTHOGONAL***, and split edges not as per proportion
 * @type String
 * @static
 */
Q.Styles.EDGE_SPLIT_VALUE = {};
/**
 * Edge corner, proper for edges of Consts.EDGE_TYPE_ORTHOGONAL***, supporting three kinds:
 * @see Q.Consts.EDGE_CORNER_NONE
 * @see Q.Consts.EDGE_CORNER_ROUND
 * @see Q.Consts.EDGE_CORNER_BEVEL
 * @type String
 * @static
 */
Q.Styles.EDGE_CORNER = {};
/**
 * Edge corner fillet
 * @static
 * @type string
 */
Q.Styles.EDGE_CORNER_RADIUS = {};
/**
 * Display arrow at start end, proper for edge and Shape
 * @type String
 * @static
 */
Q.Styles.ARROW_FROM = {};
/**
 * Arrow size at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_SIZE = {};
/**
 * Arrow offset at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_OFFSET = {};
/**
 * Arrow border width at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_STROKE = {};
/**
 * Arrow border style at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_STROKE_STYLE = {};
/**
 * Outline border thickness of start arrow
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_OUTLINE = {};
/**
 * Outline border color of start arrow
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_OUTLINE_STYLE = {};
/**
 * Arrow outline dotted line at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_LINE_DASH = {};
/**
 * Offset of arrow outline dotted line at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_LINE_DASH_OFFSET = {};
/**
 * Filling color of arrow at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_FILL_COLOR = {};
/**
 * Filling gradient of arrow at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_FILL_GRADIENT = {};
/**
 * End style of arrow outline at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_LINE_CAP = {};
/**
 * Joint style of arrow outline at start end
 * @static
 * @type string
 */
Q.Styles.ARROW_FROM_LINE_JOIN = {};
/**
 * Display arrow at terminal end, proper for edge and Shape
 * @type String
 * @static
 */
Q.Styles.ARROW_TO = {};
/**
 * Arrow size at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_SIZE = {};
/**
 * Arrow offset at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_OFFSET = {};
/**
 * Arrow border width at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_STROKE = {};
/**
 * Arrow border style at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_STROKE_STYLE = {};
/**
 * Thickness of outer border of end arrow
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_OUTLINE = {};
/**
 * Color of outer border of end arrow
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_OUTLINE_STYLE = {};
/**
 * Arrow outline dotted line at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_LINE_DASH = {};
/**
 * Offset of arrow outline dotted line at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_LINE_DASH_OFFSET = {};
/**
 * Filling color of arrow at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_FILL_COLOR = {};
/**
 * Filling gradient of arrow at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_FILL_GRADIENT = {};
/**
 * End style of arrow outline at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_LINE_CAP = {};
/**
 * Joint style of arrow outline at terminal end
 * @static
 * @type string
 */
Q.Styles.ARROW_TO_LINE_JOIN = {};
/**
 * List of constants
 * @type Object
 * @namespace
 * @static
 */
Q.Consts = {};
/**
 * Selection types of rectangular border
 * @see Q.Styles.SELECTION_TYPE
 * @static
 * @type string
 */
Q.Consts.SELECTION_TYPE_BORDER_RECT = {};
/**
 * Selection types of border
 * @see Q.Styles.SELECTION_TYPE
 * @static
 * @type string
 */
Q.Consts.SELECTION_TYPE_BORDER = {};
/**
 * Selection types of shadow
 * @see Q.Styles.SELECTION_TYPE
 * @static
 * @type string
 */
Q.Consts.SELECTION_TYPE_SHADOW = {};
/**
 * SVG name space, for creating SVG elements
 * @type type
 * @static
 */
Q.Consts.NS_SVG = {};
/**
 * Direct property
 * @example
 * node.name = "Hello";
 * @type type
 */
Q.Consts.PROPERTY_TYPE_ACCESSOR = {};
/**
 * Style property
 * @example
 * node.setStyle(Q.Styles.LABEL_OFFSET_X, 10);
 *
 * @type type
 * @static
 */
Q.Consts.PROPERTY_TYPE_STYLE = {};
/**
 * User property
 * node.set("name", "Hello");
 * @type type
 * @static
 */
Q.Consts.PROPERTY_TYPE_CLIENT = {};
/**
 * Default edge type
 * @see Q.Edge#edgeType
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_DEFAULT = {};
/**
 * Elbow edge type
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_ELBOW = {};
/**
 * Elbow edge type at horizontal direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_ELBOW_HORIZONTAL = {};
/**
 * Elbow edge type at vertical direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_ELBOW_VERTICAL = {};
/**
 * Orthogonal edge type
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_ORTHOGONAL = {};
/**
 * Orthogonal edge type at horizontal direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_ORTHOGONAL_HORIZONTAL = {};
/**
 * Orthogonal edge type at vertical direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_ORTHOGONAL_VERTICAL = {};
/**
 * Horizontal L-shape edge type
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_HORIZONTAL_VERTICAL = {};
/**
 * Vertical L-shape edge type
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_VERTICAL_HORIZONTAL = {};
/**
 * Bow edge type, in upward direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_EXTEND_TOP = {};
/**
 * Bow edge type, in leftward direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_EXTEND_LEFT = {};
/**
 * Bow edge type, in downward direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_EXTEND_BOTTOM = {};
/**
 * Bow edge type, in rightward direction
 * @type type
 * @static
 */
Q.Consts.EDGE_TYPE_EXTEND_RIGHT = {};
/**
 * Z-shape edge type
 * @static
 * @type string
 */
Q.Consts.EDGE_TYPE_ZIGZAG = {};
/**
 * No edge corner, proper for Consts.EDGE_TYPE_ORTHOGONAL*** edge
 * @see Q.Edge#edgeType
 * @see Q.Styles.EDGE_CORNER
 * @type type
 * @static
 */
Q.Consts.EDGE_CORNER_NONE = {};
/**
 * Fillet style, proper for Consts.EDGE_TYPE_ORTHOGONAL*** edge
 * @see Q.Edge#edgeType
 * @see Q.Styles.EDGE_CORNER
 * @type type
 * @static
 */
Q.Consts.EDGE_CORNER_ROUND = {};
/**
 *Bevel style, proper for Consts.EDGE_TYPE_ORTHOGONAL*** edge
 * @see Q.Edge#edgeType
 * @see Q.Styles.EDGE_CORNER
 * @type type
 * @static
 */
Q.Consts.EDGE_CORNER_BEVEL = {};
/**
 * Rectangular group type
 * @type type
 * @static
 */
Q.Consts.GROUP_TYPE_RECT = {};
/**
 * Round group type
 * @type type
 * @static
 */
Q.Consts.GROUP_TYPE_CIRCLE = {};
/**
 * Ellipse group type
 * @type type
 * @static
 */
Q.Consts.GROUP_TYPE_ELLIPSE = {};
/**
 * Round
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @type type
 * @static
 */
Q.Consts.SHAPE_CIRCLE = {};
/**
 *Rectangle
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @see Q.Shapes.getRect
 * @type type
 * @static
 */
Q.Consts.SHAPE_RECT = {};
/**
 * Round rectangle
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @see Q.Shapes.getRect
 * @type type
 * @static
 */
Q.Consts.SHAPE_ROUNDRECT = {};
/**
 * Star-shaped
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @type type
 * @static
 */
Q.Consts.SHAPE_STAR = {};
/**
 * Triangle
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @type type
 * @static
 */
Q.Consts.SHAPE_TRIANGLE = {};
/**
 * Hexagon
 * @static
 * @type string
 */
Q.Consts.SHAPE_HEXAGON = {};
/**
 * Pentagon
 * @static
 * @type string
 */
Q.Consts.SHAPE_PENTAGON = {};
/**
 * Trapezium
 * @static
 * @type string
 */
Q.Consts.SHAPE_TRAPEZIUM = {};
/**
 * Slant parallelogram
 * @static
 * @type string
 */
Q.Consts.SHAPE_RHOMBUS = {};
/**
 * Parallelogram
 * @static
 * @type string
 */
Q.Consts.SHAPE_PARALLELOGRAM = {};
/**
 * heart-shape
 * @static
 * @type string
 */
Q.Consts.SHAPE_HEART = {};
/**
 * Diamond
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @type type
 * @static
 */
Q.Consts.SHAPE_DIAMOND = {};
/**
 * Cross
 * @static
 * @type string
 */
Q.Consts.SHAPE_CROSS = {};
/**
 * standard arrow
 * @see Q.Shapes
 * @see Q.Shapes.getShape
 * @type type
 * @static
 */
Q.Consts.SHAPE_ARROW_STANDARD = {};
/**
 * Arrow 1
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_1 = {};
/**
 * Arrow 2
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_2 = {};
/**
 * Arrow 3
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_3 = {};
/**
 * Arrow 4
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_4 = {};
/**
 * Arrow 5
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_5 = {};
/**
 * Arrow 6
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_6 = {};
/**
 * Arrow 7
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_7 = {};
/**
 * Arrow 8
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_8 = {};
/**
 * Open arrow
 * @static
 * @type string
 */
Q.Consts.SHAPE_ARROW_OPEN = {};
/**
 * Line end (line cap) style, flat edge
 * @type type
 * @static
 */
Q.Consts.LINE_CAP_TYPE_BUTT = {};
/**
 * Line end (line cap) style, round edge
 * @type type
 * @static
 */
Q.Consts.LINE_CAP_TYPE_ROUND = {};
/**
 * Line end (line cap) style, square edge
 * @type type
 * @static
 */
Q.Consts.LINE_CAP_TYPE_SQUARE = {};
/**
 * Style of line joints, bevel
 * @type type
 * @static
 */
Q.Consts.LINE_JOIN_TYPE_BEVEL = {};
/**
 * Style of line joints, round
 * @type type
 * @static
 */
Q.Consts.LINE_JOIN_TYPE_ROUND = {};
/**
 * Style of line joints, miter
 * @type type
 * @static
 */
Q.Consts.LINE_JOIN_TYPE_MITER = {};
/**
 * Gradient type: radial gradient
 * @see Q.Gradient
 * @type type
 * @static
 */
Q.Consts.GRADIENT_TYPE_RADIAL = {};
/**
 * Gradient type: linear gradient
 * @see Q.Gradient
 * @type type
 * @static
 */
Q.Consts.GRADIENT_TYPE_LINEAR = {};
/**
 * Type of path segment: moveTo
 * @see Q.Path
 * @see CanvasRenderingContext2D
 * @type type
 * @static
 */
Q.Consts.SEGMENT_MOVE_TO = {};
/**
 * Type of path segment: lineTo
 * @see Q.Path
 * @see CanvasRenderingContext2D
 * @type type
 * @static
 */
Q.Consts.SEGMENT_LINE_TO = {};
/**
 * Type of path segment: quadraticCurveTo
 * @see Q.Path
 * @see CanvasRenderingContext2D
 * @type type
 * @static
 */
Q.Consts.SEGMENT_QUAD_TO = {};
/**
 * Type of path segment: bezierCurveTo
 * @see Q.Path
 * @see CanvasRenderingContext2D
 * @type type
 * @static
 */
Q.Consts.SEGMENT_CURVE_TO = {};
/**
 * Type of arc segment: #arcTo
 * @static
 * @type string
 */
Q.Consts.SEGMENT_ARC_TO = {};
/**
 * Type of path segment: closePath
 * @see Q.Path
 * @see CanvasRenderingContext2D
 * @type type
 * @static
 */
Q.Consts.SEGMENT_CLOSE = {};
/**
 * Blend mode - darken
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_DARKEN = {};
/**
 * Blend mode - multiply
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_MULTIPLY = {};
/**
 * Blend mode - color overlay
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_COLOR_BURN = {};
/**
 * Blend mode - linear overlay
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_LINEAR_BURN = {};
/**
 * Blend mode - lighten
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_LIGHTEN = {};
/**
 * Blend mode - screen
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_SCREEN = {};
/**
 * Blend mode - gray dyeing
 * @static
 * @type string
 */
Q.Consts.BLEND_MODE_GRAY = {};
/**
 * Roller navigation mode
 * @see Q.Graph#navigationType
 * @static
 * @type string
 */
Q.Consts.NAVIGATION_SCROLLBAR = {};
/**
 * No navigation panel
 * @see Q.Graph#navigationType
 * @static
 * @type string
 */
Q.Consts.NAVIGATION_NONE = {};
/**
 * Navigation button mode
 * @see Q.Graph#navigationType
 * @static
 * @type string
 */
Q.Consts.NAVIGATION_BUTTON = {};
/**
 * Interaction mode: browsing mode
 * @static
 * @type string
 */
Q.Consts.INTERACTION_MODE_VIEW = {};
/**
 * Interaction mode: default
 * @type type
 * @static
 */
Q.Consts.INTERACTION_MODE_DEFAULT = {};
/**
 * Select interaction mode
 * @static
 * @type string
 */
Q.Consts.INTERACTION_MODE_SELECTION = {};
/**
 * Interaction mode: zoom in
 * @type type
 * @static
 */
Q.Consts.INTERACTION_MODE_ZOOMIN = {};
/**
 * Interaction mode: zoom out
 * @type type
 * @static
 */
Q.Consts.INTERACTION_MODE_ZOOMOUT = {};
/**
 * Create edge interaction mode, simple mode
 * @static
 * @type string
 */
Q.Consts.INTERACTION_MODE_CREATE_SIMPLE_EDGE = {};
/**
 * Create edge mode
 * @static
 * @type string
 */
Q.Consts.INTERACTION_MODE_CREATE_EDGE = {};
/**
 * Create interaction mode of polygon
 * @static
 * @type string
 */
Q.Consts.INTERACTION_MODE_CREATE_SHAPE = {};
/**
 * Create interaction mode of polyline
 * @static
 * @type string
 */
Q.Consts.INTERACTION_MODE_CREATE_LINE = {};
/**
 * Layout direction: from left to right
 * @type type
 * @static
 */
Q.Consts.DIRECTION_RIGHT = {};
/**
 * Layout direction: from right to left
 * @static
 * @type number
 */
Q.Consts.DIRECTION_LEFT = {};
/**
 *  Layout direction: horizontal and central layout, only applied to layout type of Q.Consts.LAYOUT_TYPE_TWO_SIDE
 * @static
 * @type number
 */
Q.Consts.DIRECTION_CENTER = {};
/**
 * Layout direction: from top to bottom
 * @type type
 * @static
 */
Q.Consts.DIRECTION_BOTTOM = {};
/**
 * Layout direction: from bottom to top
 * @static
 * @type number
 */
Q.Consts.DIRECTION_TOP = {};
/**
 *  Layout direction: vertical and central layout, only applied to layout type of Q.Consts.LAYOUT_TYPE_TWO_SIDE
 * @static
 * @type number
 */
Q.Consts.DIRECTION_MIDDLE = {};
/**
 * Layout type: even distribution
 * @type type
 * @static
 */
Q.Consts.LAYOUT_TYPE_EVEN = {};
/**
 * Layout type: horizontal even distribution
 * @static
 * @type string
 */
Q.Consts.LAYOUT_TYPE_EVEN_HORIZONTAL = {};
/**
 * Layout type: vertical even distribution
 * @static
 * @type string
 */
Q.Consts.LAYOUT_TYPE_EVEN_VERTICAL = {};
/**
 * Layout type: distribution at two sides
 * @type type
 * @static
 */
Q.Consts.LAYOUT_TYPE_TWO_SIDE = {};
/**
 * Angles are distributed according to the demand, applicable to {Q.BalloonLayouter}
 * @static
 * @type string
 */
Q.Consts.ANGLE_SPACING_PROPORTIONAL = {};
/**
 * Angle even distribution
 * @static
 * @type string
 */
Q.Consts.ANGLE_SPACING_REGULAR = {};
/**
 * Unified radius mode, applicable to {Q.BalloonLayouter}
 * @static
 * @type string
 */
Q.Consts.RADIUS_MODE_UNIFORM = {};
/**
 * Variable radius mode, applicable to {Q.BalloonLayouter}
 * @static
 * @type string
 */
Q.Consts.RADIUS_MODE_VARIABLE = {};
/**
 * Graph list
 * @see Q.Node
 * @see Q.ImageUI
 * @example
 * node.image = Q.Graphs.server;
 *
 * @type type
 * @static
 */
Q.Graphs = {};
/**
 * Graph component type can be added with various graph element (node, edge and group etc.), and anchoring graph on graph element, so as to realize rich graph exhibition effect, and topological graph, organization chart, flow chart and machine room chart etc.
 * @param {(HTMLElement|String)} div HTML node on graph component, or id name of HTML elements
 * @constructor
 */
Q.Graph = function (div, graphModel) {};
/**
 * Initial coordinate origin locates at screen center, defaulted to true. If it is desired to keep the old top left corner as coordinate origin, set this property to false
 * @type boolean
 */
Q.Graph.prototype.originAtCenter = {};
/**
 * If editable
 * @type boolean
 */
Q.Graph.prototype.editable = {};
/**
 * Acquire information of drag and drop, default to use JSON.parse (...) for analysing introduced data. But it supports only to basic data objects. If it is requested to drag or drop complex information, such as gradient objects (Q.Gradient), the self-defined analysis can be made
 * @param {MouseEvent} evt drag and drop mouse event
 * @param {String} text drag and drop character string
 * @returns {Object} go back to drag and drop information object. Default to use JSON.parse(...) for analysing introduced data
 */
Q.Graph.prototype.getDropInfo = function (evt, text){};
/**
 * When graph is in editable status, make response to element drop event, and realize creation of nodes by drag and drop
 * @param {MouseEvent} evt
 */
Q.Graph.prototype.ondrop = function (evt){};
/**
 * If activating double click scan display function for blank canvas, default to true
 * @type boolean
 */
Q.Graph.prototype.enableDoubleClickToOverview = {};
/**
 * If the graph is visible, default back to true
 * @param {Q.Element} item
 * @returns {Boolean}
 */
Q.Graph.prototype.isVisible = function (item) {};
/**
 * If the graph is movable, default back to true
 * @param {Q.Element} item
 * @returns {Boolean}
 */
Q.Graph.prototype.isMovable = function (item) {};
/**
 * If nework element is selectable
 * @param {Object} item
 * @returns {Object}
 */
Q.Graph.prototype.isSelectable = function (item) {};
/**
 * If elements are editable
 * @param {Q.Element} item
 * @returns {boolean}
 */
Q.Graph.prototype.isEditable = function (item) {};
/**
 * If elements are rotatable
 * @param {Q.Element} item
 * @returns {boolean}
 */
Q.Graph.prototype.isRotatable = function (item) {};
/**
 * If nodes are resizable
 * @param {Q.Node} item
 * @returns {boolean}
 */
Q.Graph.prototype.isResizable = function (item) {};
/**
 * Whether a node is permitted to be regarded as start node of edge
 * @param {Q.Node} node
 * @returns {Boolean}
 */
Q.Graph.prototype.canLinkFrom = function (node){};
/**
 * Whether a node is permitted to be regarded as end node of edge
 * @param {Q.Node} node
 * @param {Q.Node} from start node
 * @returns {Boolean}
 */
Q.Graph.prototype.canLinkTo = function (node, from){};
/**
 * Create node object
 * @param {String} name node name
 * @param {Number} x node position
 * @param {Number} y node position
 * @returns {Node}
 */
Q.Graph.prototype.createNode = function (name, x, y) {};
/**
 * Create text node
 * @param {Object} name
 * @param {number} x
 * @param {number} y
 * @returns {Object}
 */
Q.Graph.prototype.createText = function (name, x, y) {};
/**
 * Create polygon
 * @param {Object} name
 * @param {Object} path
 * @param {number} x
 * @param {number} y
 * @returns {Object}
 */
Q.Graph.prototype.createShapeNode = function (name, path, x, y) {};
/**
 * Create group node
 * @param {Object} name
 * @param {number} x
 * @param {number} y
 * @returns {Object}
 */
Q.Graph.prototype.createGroup = function (name, x, y) {};
/**
 * Create edge element
 * @param {String} name edge name
 * @param {Node} from edge start end
 * @param {Node} to edge terminal end
 * @returns {Edge}
 */
Q.Graph.prototype.createEdge = function (name, from, to) {};
/**
 * Adds element
 * @param {Q.Element} element
 * @param {Boolean} withChildren
 */
Q.Graph.prototype.addElement = function (element, withChildren){};
/**
 * Delete network element
 * @param {Object} element
 * @returns {Object}
 */
Q.Graph.prototype.removeElement = function (element){};
/**
 * Clear element collection
 */
Q.Graph.prototype.clear = function (){};
/**
 * Acquire element style property
 * @param {Q.Element} node element
 * @param {String} name style name
 * @returns {Object} style value
 */
Q.Graph.prototype.getStyle = function (node, name) {};
/**
 * Translation
 * @param {Number} tx x direction offset
 * @param {Number} tx y direction offset
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.translate = function (tx, ty, byAnimate) {};
/**
 * Move to assigned position
 * @param {Number} tx x position
 * @param {Number} ty y position
 * @param {Number} scale zooming proportion
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.translateTo = function (tx, ty, scale, byAnimate) {};
/**
 * Take appointed position as the center
 * @param {Number} cx central point x coordinate
 * @param {Number} cy central point y coordinate
 * @param {Number} scale zooming proportion
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.centerTo = function (cx, cy, scale, byAnimate) {};
/**
 * Move to center. Setting will be valid at the next drawing
 * @param {Number} scale zooming proportion
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.moveToCenter = function (scale, byAnimate) {};
/**
 * By zooming and moving canvas, show all elements in the canvas. If now zooming rate is less than the min zooming rate of graph, the min zooming rate shall be obtained, displayed at the middle place. Setting results will enter into effect at the next drawing
 * @param {object} byAnimate with animation
 * @param {Number} maxScale max scale
 */
Q.Graph.prototype.zoomToOverview = function (byAnimate, maxScale) {};
/**
 * Zoom according to appointed position
 * @param {Number} scale
 * @param {Number} px
 * @param {Number} py
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.zoomAt = function (scale, px, py, byAnimate) {};
/**
 * Assign the zooming point to zoom out at the centre
 * @param {Number} px central zooming point x coordinate
 * @param {Number} py central zooming point y coordinate
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.zoomOut = function (px, py, byAnimate) {};
/**
 * Assign the zooming point to zoom in at the centre
 * @param {Number} px central zooming point x coordinate
 * @param {Number} py central zooming point y coordinate
 * @param {object} byAnimate Animation param
 */
Q.Graph.prototype.zoomIn = function (px, py, byAnimate) {};
/**
 * If to enable inertia animation
 * @type boolean
 */
Q.Graph.prototype.enableInertia = {};
/**
 * Acquire corresponding UI object as per elements
 * @param {Q.Element} element
 * @returns {ElementUI}
 */
Q.Graph.prototype.getUI = function (element) {};
/**
 * Acquire the element UI object at mouse point location
 * @see Q.Graph#getElementByMouseEvent
 * @see Q.Graph#hitTest
 * @param {MouseEvent} evt mouse event
 * @returns {ElementUI}
 */
Q.Graph.prototype.getUIByMouseEvent = function (evt) {};
/**
 * Acquire the UI object at mouse point location
 * @param {MouseEvent} evt mouse event
 * @returns {BaseUI}
 */
Q.Graph.prototype.hitTest = function (evt) {};
/**
 * The canvas screen coordinate is converted to canvas logic coordinate
 * @param {Object} evt mouse point or coordinate point object
 * @returns {Point} logic point coordinate
 */
Q.Graph.prototype.globalToLocal = function (evt) {};
/**
 * Logic coordinate is converted to canvas coordinate
 * @see {Q.Graph#toLogical}
 * @param {Number} x
 * @param {Number} y
 * @returns {Q.Point}
 */
Q.Graph.prototype.toCanvas = function (x, y) {};
/**
 * Canvas coordinate is converted to logic coordinate
 * @see {Q.Graph#toCanvas}
 * @param {Number} x
 * @param {Number} y
 * @returns {Q.Point}
 */
Q.Graph.prototype.toLogical = function (x, y) {};
/**
 * Acquire the element object at mouse point location
 * @param {type} evt mouse event
 * @returns {Element}
 */
Q.Graph.prototype.getElementByMouseEvent = function (evt) {};
/**
 * Acquire elements via id
 * @param {number} id
 * @returns {Object}
 */
Q.Graph.prototype.getElement = function (id) {};
/**
 * Disable canvas, and redraw
 */
Q.Graph.prototype.invalidate = function () {};
/**
 * Invalid element UI
 * @param {Object} ui
 * @returns {Object}
 */
Q.Graph.prototype.invalidateUI = function (ui){};
/**
 * Invalid element is used for updating element display status
 * @param {Q.Element} element
 */
Q.Graph.prototype.invalidateElement = function (element){};
/**
 * Acquire scope of element UI
 * @param {Q.Element} element element object
 * @returns {Rect}
 */
Q.Graph.prototype.getUIBounds = function (element) {};
/**
 * Traverse all visible element UI object
 * @param {Function} call Callback function
 * @param {Object} scope
 */
Q.Graph.prototype.forEachVisibleUI = function (call, scope) {};
/**
 * Traverse all visible element UI
 * @param {Object} call
 * @param {Object} scope
 * @returns {Object}
 */
Q.Graph.prototype.forEachReverseVisibleUI = function (call, scope) {};
/**
 * Traverse all element UI
 * @param {Object} call
 * @param {Object} scope
 * @returns {Object}
 */
Q.Graph.prototype.forEachUI = function (call, scope) {};
/**
 * Traverse reversely all element UI
 * @param {Object} call
 * @param {Object} scope
 * @returns {Object}
 */
Q.Graph.prototype.forEachReverseUI = function (call, scope) {};
/**
 * Traverse all network elements
 * @param {Function} call
 * @param {Object} scope
 */
Q.Graph.prototype.forEach = function (call, scope) {};
/**
 * Acquire the first element object as per element name
 * @param {String} name
 * @returns {Element}
 */
Q.Graph.prototype.getElementByName = function (name) {};
/**
 * Acquire focus for canvas
 * @param {Boolean} withoutScroll In the webpage, when element focus is obtained, move to visible scope automatically. Set this option to avoid automatic rolling
 */
Q.Graph.prototype.focus = function (withoutScroll) {};
/**
 * Delay the call. Call when canvas is used for drawing at the next time
 * @param {Function} call Callback function
 * @param {Object} [scope] scope
 * @param {Number} delay Delay time
 */
Q.Graph.prototype.callLater = function (call, scope, delay) {};
/**
 * Export the canvas to graphs. Restore graph data (character string) and image width and height
 * @see HTMLCanvasElement#toDataURL
 * @param {Number} scale zooming proportion
 * @param {Rect} clipBounds Exporting scope
 * @returns {Object} {data: imageData, width: imageWidth, height: imageHeight}
 */
Q.Graph.prototype.exportImage = function (scale, clipBounds) {};
/**
 * Set the currently-selected elements. Originally selected information will be cleared
 * @param {Object} data Element or element collection
 */
Q.Graph.prototype.setSelection = function (data) {};
/**
 * Adds selected elements
 * @param {Object} data Element or element collection
 */
Q.Graph.prototype.select = function (data) {};
/**
 * Cancel the selection status of elements
 * @param {Object} data Element or element collection
 */
Q.Graph.prototype.unselect = function (data) {};
/**
 * Change selection status of elements. Originally selected one will be cancelled and replaced by the one not selected before
 * @param {Q.Element} data
 */
Q.Graph.prototype.reverseSelect = function (data) {};
/**
 * Select all
 */
Q.Graph.prototype.selectAll = function () {};
/**
 * Clear the selection status of elements
 */
Q.Graph.prototype.unSelectAll = function () {};
/**
 * Clear the selection status of elements
 * @returns {Object}
 */
Q.Graph.prototype.unselectAll = function (){};
/**
 * Judge if elements are selected
 * @param {Q.Element} element
 * @returns {Boolean}
 */
Q.Graph.prototype.isSelected = function (element) {};
/**
 * Element selection manager
 * @type Q.SelectionModel
 */
Q.Graph.prototype.selectionModel = {};
/**
 * Move elements to upper layer for display. Default to call this method when the element is clicked and selected
 * @param {Q.Element} element
 */
Q.Graph.prototype.sendToTop = function (element) {};
/**
 * Display at the bottom
 * @param {Q.Element} element
 */
Q.Graph.prototype.sendToBottom = function (element) {};
/**
 * Move elements and related elements. Take follower as example. When edges under group or two edges of the edge move, the edges will also be moved, to ensure correctness of position
 * @param {Array} elements Element collection
 * @param {Number} dx x directional moving distance
 * @param {Number} dy y directional moving distance
 */
Q.Graph.prototype.moveElements = function (elements, dx, dy) {};
/**
 * Change expanded status of edge. When several edges exist between two nodes, this group of edges is called EdgeBundle. When the edge bundle is expanded, all edges will be arranged in parallelism. When it is in bundle, it is displayed to be an edge
 * @param {Edge} edge One edge in bundle
 */
Q.Graph.prototype.reverseExpanded = function (edge) {};
/**
 * Before the interaction event, dispatch the interaction event, and call this method before interaction movement. For example, if going back to false, it means stopping the execution of event action
 * @example
 *      var interactionEvent = new InteractionEvent(graph, InteractionEvent.ELEMENT_MOVE_START, evt, this.currentDraggingElement, this.draggingElements);
 *      if(graph.beforeInteractionEvent(interactionEvent) === false){
 *          this.destroy();
 *          return;
 *      }
 *      graph.onInteractionEvent(interactionEvent);
 * @see Q.Dispatcher#beforeEvent
 * @see Q.Graph#interactionDispatcher
 * @param {Event} event
 * @returns {Boolean} If to stop the event execution. To go back false, it means to stop the execution of event action
 */
Q.Graph.prototype.beforeInteractionEvent = function (event) {};
/**
 * When the interaction event happens, dispatch events
 * @see Q.Dispatcher#onEvent
 * @see Q.Graph#interactionDispatcher
 * @param {Event} event
 */
Q.Graph.prototype.onInteractionEvent = function (event) {};
/**
 * Adds user interaction
 * @example
 * graph.addCustomInteraction({
 *  onmousedown: function(evt, graph){
 *      Q.log("mousedown");
 *  }});
 * @param {Object} interaction Interaction listener
 */
Q.Graph.prototype.addCustomInteraction = function (interaction) {};
/**
 * If to enable the zooming of mouse rolling, default to true. It is invalid for mobile platform
 * @type Boolean
 */
Q.Graph.prototype.enableWheelZoom = {};
/**
 * If to activate prompt message, default as true
 * @see Q.Graph#getTooltip
 * @type Boolean
 */
Q.Graph.prototype.enableTooltip = {};
/**
 * Acquire the alerting text of elements. Support HTML format. Default to obtain element tooltip or name property
 * @see Q.Graph#enableTooltip
 * @param {Q.Element} element
 * @returns {String}
 */
Q.Graph.prototype.getTooltip = function (element) {};
/**
 * Update canvas window. When HTML element size of canvas changes, the canvas shall be resized, to bestrew the entire model. Call this method now. Default that this method will be called automatically when webpage window changes
 * @example
 * Q.addEventListener(window, "resize", function(evt) {
 *      this.updateViewport();
 *  }, false, graph);
 */
Q.Graph.prototype.updateViewport = function () {};
/**
 * Destroy canvas. When deleting graph component, call this method to remove mouse keyboard or touch monitoring and remove child node etc., and to release memory
 */
Q.Graph.prototype.destroy = function () {};
/**
 * Change to canvas property
 * @param {String} type
 * @param {Object} listener
 * @param {Object} scope
 */
Q.Graph.prototype.onPropertyChange = function (type, listener, scope) {};
/**
 * Deleting selected elements
 */
Q.Graph.prototype.removeSelection = function () {};
/**
 * Delete selected elements via interface interaction
 * @param {MouseEvent} evt
 */
Q.Graph.prototype.removeSelectionByInteraction = function (evt){};
/**
 * Create polygon via interface interacion. Call back this function when polygon interaction mode is created
 * @see Q.Consts.INTERACTION_MODE_CREATE_SHAPE
 * @param {Object} evt
 * @param {Array} pathSegments
 * @param {Number} x
 * @param {Number} y
 * @returns {Q.ShapeNode}
 */
Q.Graph.prototype.createShapeByInteraction = function (evt, pathSegments, x, y){};
/**
 * Create edge via interface interacion. Call back this function when multi-segment interaction mode is created
 * @see Q.Consts.INTERACTION_MODE_CREATE_LINE
 * @param {Object} evt
 * @param {Array} pathSegments
 * @param {Number} x
 * @param {Number} y
 * @returns {Q.ShapeNode}
 */
Q.Graph.prototype.createLineByInteraction = function (evt, pathSegments, x, y){};
/**
 * Create edge via interface interaction
 * @param {Q.Point} start
 * @param {Q.Point} end
 * @param {MouseEvent} evt
 * @param {Q.Path} pathSegments
 * @returns {Q.Edge}
 */
Q.Graph.prototype.createEdgeByInteraction = function (start, end, evt, pathSegments){};
/**
 * When an element is created via interface interaction, callback this function
 * @param {Q.Element} element
 * @param {MouseEvent} evt Interaction mouse or touch event
 */
Q.Graph.prototype.onElementCreated = function (element, evt, dragInfo){};
/**
 * Start text edition
 * @param {Object} element Element being edited currently
 * @param {Object} label  Text component being clicked currently（LabelUI）
 * @param {Object} labelEditor Text editor
 * @param {Object} xy Current mouse point location
 */
Q.Graph.prototype.startLabelEdit = function (element, label, labelEditor, xy){};
/**
 * Call this function when the text edition is submitted, for setting text information
 * @param {Q.Element} element
 * @param {Q.LabelUI} label
 * @param {string} text
 * @param {Q.ElementUI} elementUI
 */
Q.Graph.prototype.onLabelEdit = function (element, label, text, elementUI){};
/**
 * Set the current interaction mode, and transfer custom-made interaction parameters. Acquire it via graph.interactionProperties in the interaction listener
 * @param {String} mode
 * @param {Array} interactionProperties
 */
Q.Graph.prototype.setInteractionMode = function (mode, interactionProperties){};
/**
 * Go back to upper layer of subnet
 * @returns {Object}
 */
Q.Graph.prototype.upSubNetwork = function (){};
/**
 * Visible status of invalid elements. When the subnet is switched, the internal system will call this method, so as to reconfirm the visible status of elements
 * @returns {Object}
 */
Q.Graph.prototype.invalidateVisibility = function (){};
/**
 * Visible filter
 * @type Function
 */
Q.Graph.prototype.visibleFilter = {};
/**
 * Dispatcher of change event of topological graph property
 * @type Q.Dispatcher
 */
Q.Graph.prototype.propertyChangeDispatcher = {};
/**
 * Dispatcher of change event of network element collection
 * @type Q.Dispatcher
 */
Q.Graph.prototype.listChangeDispatcher = {};
/**
 * Dispatcher of change event of network element property
 * @type Q.Dispatcher
 */
Q.Graph.prototype.dataPropertyChangeDispatcher = {};
/**
 * Dispatcher of selected change event
 * @type Q.Dispatcher
 */
Q.Graph.prototype.selectionChangeDispatcher = {};
/**
 * Dispatcher of change event of parent node
 * @type Q.Dispatcher
 */
Q.Graph.prototype.parentChangeDispatcher = {};
/**
 * Dispatcher of change event of child node layer
 * @type Q.Dispatcher
 */
Q.Graph.prototype.childIndexChangeDispatcher = {};
/**
 * Interaction event dispatcher. Monitor interaction events via this dispatcher
 * @type Q.Dispatcher
 */
Q.Graph.prototype.interactionDispatcher = {};
/**
 * style list
 * @type Object
 */
Q.Graph.prototype.styles = {};
/**
 * 图元管理容器
 * @type Q.GraphModel
 */
Q.Graph.prototype.graphModel = {};
/**
 * Basic UI type, base class of other UI types
 * @constructor
 * @param {Object} data corresponding data element objects, such as one NodeUI object corresponds to one Node object. This Node object is the data object of UI type
 */
Q.BaseUI = function (data) {};
/**
 * Invalid UI component
 * @returns {Object}
 */
Q.BaseUI.prototype.invalidate = function (){};
/**
 * Border color
 * @type String
 */
Q.BaseUI.prototype.borderColor = {};
/**
 * Dotted line style of border
 * @type null
 */
Q.BaseUI.prototype.borderLineDash = {};
/**
 * Dotted line offset of border
 * @type null
 */
Q.BaseUI.prototype.borderLineDashOffset = {};
/**
 * Whether selected status is synchronized, both parent model and child model are selected. Default to true
 * @type boolean
 */
Q.BaseUI.prototype.syncSelection = {};
/**
 * Whether selected status is synchronized, it is the same with the selection style of parent model. Default to true
 * @type boolean
 */
Q.BaseUI.prototype.syncSelectionStyles = {};
/**
 * Set the measuring scope of component
 * @param {Number} w
 * @param {Number} h
 * @param {Number} [x=0]
 * @param {Number} [y=0]
 */
Q.BaseUI.prototype.setMeasuredBounds = function (w, h, x, y) {};
/**
 * Component initialization
 */
Q.BaseUI.prototype.initialize = function () {};
/**
 * Measuring component. Calculate the size and scope of component via this method
 * @see {@link Q.BaseUI#invalidateSize}
 */
Q.BaseUI.prototype.measure = function () {};
/**
 * Component drawing, the position, offset and rotation of component is not necessary to be considered in this function. The coordinate conversion has been done in the internal system, just to realize the drawing logic.
 * @param {CanvasRenderingContext2D} g  Draw brush
 * @param {Number} scale canvas zooming proportion
 * @param {Boolean} [selected=false] Whether drawing selected effect
 */
Q.BaseUI.prototype.draw = function (g, scale, selected, selectionStyles) {};
/**
 * Invalid component data. After calling this method, the component will be resized and relevant style will be recalculated
 * @see {@link Q.BaseUI#invalidateSize}
 * @see {@link Q.BaseUI#invalidateRender}
 */
Q.BaseUI.prototype.invalidateData = function () {};
/**
 * Invalid component size. Call this method to redraw the component, and resize the component during the effective stage
 * @see {@link Q.BaseUI#measure}
 * @see {@link Q.BaseUI#invalidateRender}
 */
Q.BaseUI.prototype.invalidateSize = function () {};
/**
 * Invalid component, call this method to indicate that this component has to be redrawn
 * @see {@link Q.BaseUI#validate}
 */
Q.BaseUI.prototype.invalidateRender = function () {};
/**
 * Validate function
 * @returns {Object}
 */
Q.BaseUI.prototype.doValidate = function (){};
/**
 * Validate component, and complete the measuring of component etc. During the redrawing stage of canvas, if this component is under invalid stage, the system will call the method of component automatically
 */
Q.BaseUI.prototype.validate = function () {};
/**
 * When the data object changes, callback this function
 * @param {Object} data
 * @param {Object} oldData
 */
Q.BaseUI.prototype.onDataChanged = function (data, oldData) {};
/**
 * Acquire the component scope
 * @returns {Object}
 */
Q.BaseUI.prototype.getBounds = function () {};
/**
 * Destroy
 * @returns {Object}
 */
Q.BaseUI.prototype.destroy = function (){};
/**
 * Corresponding data object of UI component
 * @type Object
 */
Q.BaseUI.prototype.data = {};
/**
 * Parent node
 * @type Q.BaseUI
 */
Q.BaseUI.prototype.parent = {};
/**
 * Element component, corresponding data object is {@link Q.Element}
 * @constructor
 * @extends Q.BaseUI
 * @param {Q.Element} data
 * @param {Q.Graph} graph canvas component
 */
Q.ElementUI = function (data, graph) {};
Q.ElementUI.prototype = new Q.BaseUI();
/**
 * Canvas model where element components locate
 * @type Q.Graph
 */
Q.ElementUI.prototype.graph = {};
/**
 * Adds child component
 * @param {Q.BaseUI} child
 * @param {int} index Serial number
 */
Q.ElementUI.prototype.addChild = function (child, index) {};
/**
 * Delete child component
 * @param {Q.BaseUI} child
 * @returns {Object}
 */
Q.ElementUI.prototype.removeChild = function (child) {};
/**
 * Acquire element property
 * @param {String} propertyName
 * @param {Object} propertyType  There are three defaulted properties of elements: accessor, style, client
 * @see Q.Consts.PROPERTY_TYPE_ACCESSOR
 * @see Q.Consts.PROPERTY_TYPE_STYLE
 * @see Q.Consts.PROPERTY_TYPE_CLIENT
 * @returns {Object}
 */
Q.ElementUI.prototype.getProperty = function (propertyName, propertyType) {};
/**
 * Acquire style property
 * @param {String} styleName
 * @returns {Object}
 */
Q.ElementUI.prototype.getStyle = function (styleName) {};
/**
 * If the component has been initialized, when the property of data element changes, the system will call this method.
 * @param {Q.Event} evt property change event
 */
Q.ElementUI.prototype.onPropertyChange = function (evt) {};
/**
 * Text label component, element component is defaulted to be comprised of one main part and one text label
 * @type Q.Label
 */
Q.ElementUI.prototype.label = {};
/**
 * Initialized text label
 * @returns {Object}
 */
Q.ElementUI.prototype.initLabel = function () {};
/**
 * Adds data bundle
 * @example For example, bundle the name property of elements to the data property of label components
 * this.addBinding(this.label, {
                    property : "name",//"name" property of elements
                    bindingProperty : "data"// bundle to "data" property of label component
                });
 * @param {Q.BaseUI} ui
 * @param {Object} bindingProperty
 */
Q.ElementUI.prototype.addBinding = function (ui, bindingProperty) {};
/**
 * Sub UI sequence in the invalid element UI
 * @returns {Object}
 */
Q.ElementUI.prototype.invalidateChildrenIndex = function (){};
/**
 * Invalidate child component
 * @returns {boolean} If component scope changes
 */
Q.ElementUI.prototype.validateChildren = function () {};
/**
 * Main scope of element
 * @type null
 */
Q.ElementUI.prototype.bodyBounds = {};
/**
 * Main body of element component
 * @type Q.BaseUI
 */
Q.ElementUI.prototype.body = {};
/**
 * Node component
 * @constructor
 * @extends Q.ElementUI
 * @param {Q.Node} node
 * @param {Q.Graph} graph canvas component
 */
Q.NodeUI = function (node, graph) {};
/**
 * Edge component
 * @constructor
 * @extends Q.ElementUI
 * @param {Q.Edge} edge
 * @param {Q.Graph} graph
 */
Q.EdgeUI = function (edge, graph){};
Q.EdgeUI.prototype = new Q.ElementUI();
/**
 * Graph component, the main part of edge
 * @type Q.ShapeUI
 */
Q.EdgeUI.prototype.shape = {};
/**
 * Edge path
 * @type Q.Path
 */
Q.EdgeUI.prototype.path = {};
/**
 * Validate the edge path segment
 * @returns {Object}
 */
Q.EdgeUI.prototype.validatePoints = function () {};
/**
 * Draw edge self-loop
 * @param {Q.Path} path
 * @param {Q.NodeUI} fromUI
 * @param {String} edgeType
 * @param {Q.Rect} bounds
 */
Q.EdgeUI.prototype.drawLoopedEdge = function (path, fromUI, edgeType, bounds){};
/**
 * Draw edge
 * @param {Q.Path} path
 * @param {Q.NodeUI} fromUI
 * @param {Q.NodeUI} toUI
 * @param {String} edgeType
 * @param {Q.Rect} fromBounds
 * @param {Q.Rect} toBounds
 */
Q.EdgeUI.prototype.drawEdge = function (path, fromUI, toUI, edgeType, fromBounds, toBounds){};
/**
 * Check edge bundle text
 * @returns {Object}
 */
Q.EdgeUI.prototype.checkBundleLabel = function (){};
/**
 * Create edge bundle text
 * @returns {Object}
 */
Q.EdgeUI.prototype.createBundleLabel = function (){};
/**
 * Acquire edge bundle text
 * @returns {Object}
 */
Q.EdgeUI.prototype.getBundleLabel = function (){};
/**
 * Edge length
 * @type number
 */
Q.EdgeUI.prototype.length = {};
/**
 * Draw reference lines
 * @static
 * @param {Object} g
 * @param {Object} start
 * @param {Object} end
 * @param {Object} type
 * @returns {Object}
 */
Q.EdgeUI.drawReferenceLine = function (g, start, end, type){};
/**
 * Text label component
 * @constructor
 * @extends Q.BaseUI
 * @param {Object} data
 */
Q.LabelUI = function (data) {};
Q.LabelUI.prototype = new Q.BaseUI();
/**
 * Font color
 * @type null
 */
Q.LabelUI.prototype.color = {};
/**
 * Font size
 * @type number
 */
Q.LabelUI.prototype.fontSize = {};
/**
 * Font name
 * @type String
 */
Q.LabelUI.prototype.fontFamily = {};
/**
 * Font style
 * @type String
 */
Q.LabelUI.prototype.fontStyle = {};
/**
 * Text align method
 * @type Q.Position
 */
Q.LabelUI.prototype.alignPosition = {};
/**
 * Font
 * @type string
 */
Q.LabelUI.prototype.font = {};
/**
 * Graph component, supporting grid images, such as: png, jpg, gif(not supporting animation), or image object {@link Q.Path}, or realize the interface object of {@link Q.IDrawable}
 * @see {@link Q.Node#image}
 * @see {@link Q.NodeUI#image}
 * @constructor
 * @extends Q.BaseUI
 * @param {Q.Graph} graph
 */
Q.ImageUI = function (data) {};
Q.ImageUI.prototype = new Q.BaseUI();
/**
 * Stroke style
 * @type String
 */
Q.ImageUI.prototype.strokeStyle = {};
/**
 * Filling color
 * @type String
 */
Q.ImageUI.prototype.fillColor = {};
/**
 * Filling gradient
 * @type Q.Gradient
 */
Q.ImageUI.prototype.fillGradient = {};
/**
 * Outline border width
 * @type Number
 */
Q.ImageUI.prototype.outline = {};
/**
 * Size validation, for validation of size property of Image UI
 * @returns {Object}
 */
Q.ImageUI.prototype.validateSize = function () {};
/**
 * When the component scope changes, callback this function
 * @returns {Object}
 */
Q.ImageUI.prototype.onBoundsChanged = function () {};
/**
 * Original image size
 * @type Q.Rect
 */
Q.ImageUI.prototype.originalBounds = {};
/**
 * Graph list
 * @namespace
 * @type object
 * @static
 */
Q.Shapes = {};
/**
 * Register image
 * @static
 * @param {String} name
 * @param {(Function|Q.Path)} shapeGenerator Graph object or graph generator (Function(x, y, width, height))
 */
Q.Shapes.register = function (name, shapeGenerator) {};
/**
 * If scope and strok width are given, acquire the graph object
 * @static
 * @param {String} name
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} lineWidth
 * @returns {Q.Path}
 */
Q.Shapes.getShape = function (name, x, y, width, height, lineWidth) {};
/**
 * Acquire rectangle
 * @static
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} rx
 * @param {Number} ry
 * @returns {Q.Path}
 */
Q.Shapes.getRect = function (x, y, width, height, rx, ry, path){};
/**
 * Acquire all graphs
 * @static
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} lineWidth
 * @returns {Array}
 */
Q.Shapes.getAllShapes = function (x, y, width, height, lineWidth){};
/**
 * Create regular polygon
 * @static
 * @param {int} number Number of polygon
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @param {number} angle
 * @returns {Q.Path}
 */
Q.Shapes.createRegularShape = function (number, cx, cy, r, angle) {};
/**
 * Graph path
 * @constructor
 * @param {Array} segments Path segment collection
 */
Q.Path = function (segments) {};
/**
 * Export JSON
 * @returns {Object}
 */
Q.Path.prototype.toJSON = function (){};
/**
 * Analyse JSON
 * @param {Object} json
 */
Q.Path.prototype.parseJSON = function (json){};
/**
 * Clear path
 */
Q.Path.prototype.clear = function () {};
/**
 * Move brush
 * @see CanvasRenderingContext2D#moveTo
 * @param {Number} x
 * @param {Number} y
 */
Q.Path.prototype.moveTo = function (x, y) {};
/**
 * Drawn line
 * @see CanvasRenderingContext2D#lineTo
 * @param {Number} x
 * @param {Number} y
 */
Q.Path.prototype.lineTo = function (x, y) {};
/**
 * Quadratic Bezier curve
 * @see CanvasRenderingContext2D#quadraticCurveTo
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 */
Q.Path.prototype.quadTo = function (x1, y1, x2, y2) {};
/**
 * Cubic Bezier curve
 * @see CanvasRenderingContext2D#bezierCurveTo
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 */
Q.Path.prototype.curveTo = function (x1, y1, x2, y2, x3, y3) {};
/**
 * Arc, not supporting Opera
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} radius
 */
Q.Path.prototype.arcTo = function (x1, y1, x2, y2, radius) {};
/**
 * Closed path
 * @see CanvasRenderingContext2D#closePath
 */
Q.Path.prototype.closePath = function () {};
/**
 * Line end style
 * @type string
 */
Q.Path.prototype.lineCap = {};
/**
 * Style of line joints
 * @type string
 */
Q.Path.prototype.lineJoin = {};
/**
 * Draw images
 * @param {CanvasRenderingContext2D} g
 * @param {Number} scale
 * @param {Object} params  Draw param, including stroke width, filling color and gradient and the like information
 * @param {Boolean} selected
 */
Q.Path.prototype.draw = function (g, scale, params, selected, selectionStyles){};
/**
 * Validate
 */
Q.Path.prototype.validate = function () {};
/**
 * Acquire path scope
 * @param {Number} lineWidth Stroke width
 * @returns {Q.Rect}
 */
Q.Path.prototype.getBounds = function (lineWidth, bounds) {};
/**
 * Generate images of appointed scope and width
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} lineWidth
 * @returns {Q.Path}
 */
Q.Path.prototype.generator = function (x, y, width, height, lineWidth) {};
/**
 * Along the direction of path, acquire the point position along the path
 * @param {Number} x
 * @param {Number} y
 * @returns {Q.Point} position contains the direction
 */
Q.Path.prototype.getLocation = function (x, y){};
/**
 * Gradient
 * @constructor
 * @param {String} type Gradient type
 * @param {Array} colors Gradient color
 * @param {Array} [positions] color position
 * @param {Number} [angle] rotate angle
 */
Q.Gradient = function (type, colors, positions, angle, tx, ty){};
/**
 * Gradient type
 * @see Q.Consts.GRADIENT_TYPE_RADIAL
 * @see Q.Consts.GRADIENT_TYPE_LINEAR
 * @type String
 */
Q.Gradient.prototype.type = {};
/**
 * Gradient color
 * @type Array
 */
Q.Gradient.prototype.colors = {};
/**
 * Gradient position collection. The position value is 0-1
 * @type Array
 */
Q.Gradient.prototype.positions = {};
/**
 * Rotate angle
 * @type number
 */
Q.Gradient.prototype.angle = {};
/**
 * Gradient offset
 * @type number
 */
Q.Gradient.prototype.tx = {};
/**
 * Gradient offset
 * @type number
 */
Q.Gradient.prototype.ty = {};
/**
 * Gradient position
 * @see Q.Position
 * @type Q.Position
 */
Q.Gradient.prototype.position = {};
/**
 * If gradient color is null
 * @returns {Boolean}
 */
Q.Gradient.prototype.isEmpty = function () {};
/**
 * Generate gradient information according to scope
 * @param {Q.Rect} bounds
 * @returns {String} Gradient filling text
 */
Q.Gradient.prototype.generatorGradient = function (bounds){};
/**
 * Vertical linear gradient
 * @static
 * @type Q.Gradient
 */
Q.Gradient.LINEAR_GRADIENT_VERTICAL = {};
/**
 * Horizontal linear gradient
 * @static
 * @type Q.Gradient
 */
Q.Gradient.LINEAR_GRADIENT_HORIZONTAL = {};
/**
 * Radial gradient
 * @static
 * @type Q.Gradient
 */
Q.Gradient.RADIAL_GRADIENT = {};
/**
 * Rainbow linear gradient
 * @static
 * @type Q.Gradient
 */
Q.Gradient.RAINBOW_LINEAR_GRADIENT = {};
/**
 * Vertical rainbow linear gradient
 * @static
 * @type Q.Gradient
 */
Q.Gradient.RAINBOW_LINEAR_GRADIENT_VERTICAL = {};
/**
 * Rainbow radial gradient
 * @static
 * @type Q.Gradient
 */
Q.Gradient.RAINBOW_RADIAL_GRADIENT = {};
/**
 * Interaction event
 * @constructor
 * @extends Q.Event
 * @param {Q.Graph} graph
 * @param {String} kind
 * @param {Object} event origin event
 * @param {Object} data
 * @param {Object} datas
 */
Q.InteractionEvent = function (graph, kind, event, data, datas) {};
Q.InteractionEvent.prototype = new Q.Event();
/**
 * Start movement
 * @static
 * @type string
 */
Q.InteractionEvent.ELEMENT_MOVE_START = {};
/**
 * Network element is under movement
 * @static
 * @type string
 */
Q.InteractionEvent.ELEMENT_MOVING = {};
/**
 * Network element finishes movement
 * @static
 * @type string
 */
Q.InteractionEvent.ELEMENT_MOVE_END = {};
/**
 * Create the type of element interaction event
 * @static
 * @type string
 */
Q.InteractionEvent.ELEMENT_CREATED = {};
/**
 * Delete the type of element interaction event
 * @static
 * @type string
 */
Q.InteractionEvent.ELEMENT_REMOVED = {};
/**
 * Start event of inflection point change
 * @static
 * @type string
 */
Q.InteractionEvent.POINT_MOVE_START = {};
/**
 * Inflection point edition event
 * @static
 * @type string
 */
Q.InteractionEvent.POINT_MOVING = {};
/**
 * End event of inflection point edition
 * @static
 * @type string
 */
Q.InteractionEvent.POINT_MOVE_END = {};
/**
 * Start event for resize of node
 * @static
 * @type string
 */
Q.InteractionEvent.RESIZE_START = {};
/**
 * Event for resize of node
 * @static
 * @type string
 */
Q.InteractionEvent.RESIZING = {};
/**
 * End event for resize of node
 * @static
 * @type string
 */
Q.InteractionEvent.RESIZE_END = {};
/**
 * Edge bundle interaction
 * @static
 * @type string
 */
Q.InteractionEvent.EDGE_BUNDLE = {};
/**
 * Start frame selection
 * @static
 * @type string
 */
Q.InteractionEvent.SELECT_START = {};
/**
 * Network element is under frame selection
 * @static
 * @type string
 */
Q.InteractionEvent.SELECT_BETWEEN = {};
/**
 * Frame selection is completed
 * @static
 * @type string
 */
Q.InteractionEvent.SELECT_END = {};
/**
 * Long press event
 * @static
 * @type string
 */
Q.InteractionEvent.LONG_CLICK = {};
/**
 * Element object
 * @constructor
 * @extends Q.Data
 * @param {String} name Name
 */
Q.Element = function (name){};
Q.Element.prototype = new Q.Data();
/**
 * Acquire style property
 * @param {String} name
 * @returns {Object}
 */
Q.Element.prototype.getStyle = function (name){};
/**
 * Set style property
 * @param {String} name
 * @param {Object} value
 */
Q.Element.prototype.setStyle = function (name, value){};
/**
 * Set multi-style property
 * @param {Object} styles
 * @param {Boolean} silent Not dispatch change event of property
 */
Q.Element.prototype.putStyles = function (styles, silent){};
/**
 * Invalid visible status
 * @param {Boolean} onlySelf Whether to invalid itself only, default to invalid the following children setting
 */
Q.Element.prototype.invalidateVisibility = function (onlySelf){};
/**
 * Set invalid element, for updating interface
 */
Q.Element.prototype.invalidate = function (){};
/**
 * Mounting UI component to element component {@link Q.ElementUI}
 * @param {Q.BaseUI} ui
 * @param {Object} bindingProperties Binding information
 * @example
 * var node = graph.createNode("node");
 * var label2 = new Q.LabelUI();
 node.addUI(label2, [{
					property : "label2",
					propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
					bindingProperty : "data"
				}, {
					property : "label2.color",
					propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
					bindingProperty : "color"
				}]);
 node.set("label2", "another label");
 node.set("label2.color", Colors.blue);
 */
Q.Element.prototype.addUI = function (ui, bindingProperties){};
/**
 * Delete UI component
 * @param {Object} ui
 * @returns {Object}
 */
Q.Element.prototype.removeUI = function (ui){};
/**
 * Type, for internal usage
 * @type string
 */
Q.Element.prototype.type = {};
/**
 * Corresponding element UI type (Q.Element)
 * @type Function
 */
Q.Element.prototype.uiClass = {};
/**
 * Element name
 * @type String
 */
Q.Element.prototype.name = {};
/**
 * Network element layer
 * @type int
 */
Q.Element.prototype.zIndex = {};
/**
 * Enable to be subnet type. Any element can be regarded as subnet type. When the subnet type is set, in case the current subnet of canvas is set to this element, the canvas will display the children element under this element
 * @type boolean
 */
Q.Element.prototype.enableSubNetwork = {};
/**
 * Element binded to all sub UI objects
 * @type null
 */
Q.Element.prototype.bindingUIs = {};
/**
 * Element style list
 * @type null
 */
Q.Element.prototype.styles = {};
/**
 * Node element. Set images, graph, or mount other UI components. Corresponding UI types are NodeUI
 * @param {type} name
 * @extends Q.Element
 * @constructor
 */
Q.Node = function (name, x, y) {};
Q.Node.prototype = new Q.Element();
/**
 * Traverse all edges or agent edges connected to this node
 * @param {type} call
 * @param {type} scope
 * @param {Boolean} selfEdgeOnly
 * @returns {undefined}
 */
Q.Node.prototype.forEachEdge = function (call, scope, noLoop) {};
/**
 * Traverse all edges connected from this node
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Boolean} [selfEdgeOnly] Just consider the edge directly connected. Not traverse the agent edge
 */
Q.Node.prototype.forEachOutEdge = function (call, scope) {};
/**
 * Traverse all edges connected to this node
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 * @param {Boolean} [selfEdgeOnly] Just consider the edge directly connected. Not traverse the agent edge
 */
Q.Node.prototype.forEachInEdge = function (call, scope, selfEdgeOnly) {};
/**
 * Acquire all edges
 * @returns {Array}
 */
Q.Node.prototype.getEdges = function (){};
/**
 * If any edge is connected to
 * @param {Boolean} [selfEdgeOnly] Just consider the edge directly connected. Not traverse the agent edge
 * @returns {Boolean}
 */
Q.Node.prototype.hasInEdge = function () {};
/**
 If any edge is connected from here
 * @param {Boolean} [selfEdgeOnly] Just consider the edge directly connected. Not traverse the agent edge
 * @returns {Boolean}
 */
Q.Node.prototype.hasOutEdge = function () {};
/**
 * If any edge connected with this node
 * @param {Boolean} [selfEdgeOnly] Just consider the edge directly connected. Not traverse the agent edge
 * @returns {Boolean}
 */
Q.Node.prototype.hasEdge = function () {};
/**
 * Judge if the node is connected to this edge
 * @param {Q.Edge} edge
 * @returns {Boolean}
 */
Q.Node.prototype.linkedWith = function (edge){};
/**
 * If any edge exists between appointed nodes
 * @param {Q.Node} node
 * @returns {Boolean}
 */
Q.Node.prototype.hasEdgeWith = function (node){};
/**
 * If any self-looped edge
 * @returns {boolean}
 */
Q.Node.prototype.hasLoops = function (){};
/**
 * Acquire edge bundle between two nodes
 * @param {Q.Node} node Another node
 * @returns {Q.EdgeBundle}
 */
Q.Node.prototype.getEdgeBundle = function (node) {};
/**
 * Set node position
 * @see {@link Q.Node#location}
 * @param {Number} x
 * @param {Number} y
 */
Q.Node.prototype.setLocation = function (x, y) {};
/**
 * Adds follower. When the node is draged, the follower will move by following the host node
 * @see {@link Q.Graph#moveElements}
 * @param {Q.Node} follower
 */
Q.Node.prototype.addFollower = function (follower) {};
/**
 * Delete follower
 * @param {Q.Node} follower
 */
Q.Node.prototype.removeFollower = function (follower) {};
/**
 * If any follower
 * @returns {Boolean}
 */
Q.Node.prototype.hasFollowers = function () {};
/**
 * Follower collection
 * @returns {Array}
 */
Q.Node.prototype.toFollowers = function () {};
/**
 * Clear follower
 */
Q.Node.prototype.clearFollowers = function () {};
/**
 * Acquire serial number of follower
 * @param {Q.Node} follower
 * @returns {int}
 */
Q.Node.prototype.getFollowerIndex = function (follower) {};
/**
 * Set serial number of follower
 * @param {Q.Node} child
 * @param {int} index Serial number
 */
Q.Node.prototype.setFollowerIndex = function (child, index) {};
/**
 * Acquire the number of follower
 * @returns {int}
 */
Q.Node.prototype.getFollowerCount = function () {};
/**
 * If following appointed nodes
 * @param {Object} h
 * @returns {Object}
 */
Q.Node.prototype.isFollow = function (h){};
/**
 * Self-looped edge collection on the node
 * @type Array
 */
Q.Node.prototype.loops = {};
/**
 * Quantity of edges connected to this node
 * @type int
 */
Q.Node.prototype.edgeCount = {};
/**
 * Agent node, when the node locates at the subgroup, in case the group is closed, this group will be the agent node of the node
 * @type Q.Node
 */
Q.Node.prototype.agentNode = {};
/**
 * Host node
 * @type Q.Node
 */
Q.Node.prototype.host = {};
/**
 * Node position
 * @type Q.Point
 */
Q.Node.prototype.location = {};
/**
 * Node size
 * @type Q.Size
 */
Q.Node.prototype.size = {};
/**
 * Node graph
 * @see Q.ImageUI
 * @see Q.NodeUI
 * @type Object
 */
Q.Node.prototype.image = {};
/**
 * Rotate radian of node
 * @type number
 */
Q.Node.prototype.rotate = {};
/**
 * Anchor position, default at the middle
 * @type {Q.Position}
 */
Q.Node.prototype.anchorPosition = {};
/**
 * Edge
 * @constructor
 * @extends Q.Element
 * @param {Q.Node} from start node
 * @param {Q.Node} to end node
 * @param {String} name
 */
Q.Edge = function (from, to, name) {};
Q.Edge.prototype = new Q.Element();
/**
 * Acquire another node
 * @param {Q.Node} node
 * @returns {Q.Node} another node
 */
Q.Edge.prototype.otherNode = function (node) {};
/**
 * Connect edge
 */
Q.Edge.prototype.connect = function () {};
/**
 * Disconnect edge
 */
Q.Edge.prototype.disconnect = function () {};
/**
 * If edge is connected
 * @returns {Boolean}
 */
Q.Edge.prototype.isConnected = function () {};
/**
 * If edge is valid
 * @returns {Boolean}
 */
Q.Edge.prototype.isInvalid = function () {};
/**
 * If it is self-looped (the start and the terminal end at the same node)
 * @returns {Boolean}
 */
Q.Edge.prototype.isLooped = function () {};
/**
 * Acquire edge bundle
 * @param {Boolean} [byAgentNode] Edge bundle of agent node
 * @returns {Q.EdgeBundle}
 */
Q.Edge.prototype.getEdgeBundle = function (byAgentNode){};
/**
 * If any edge bundle exists
 * @returns {boolean}
 */
Q.Edge.prototype.hasEdgeBundle = function (){};
/**
 * If any path segment. To set a path, the edge shall be arranged in path direction
 * @returns {Boolean}
 */
Q.Edge.prototype.hasPathSegments = function () {};
/**
 * If binding is allowed
 * @see {@link Q.Edge#hasPathSegments}
 * @see {@link Q.Edge#bundleEnabled}
 * @returns {Boolean} If binding is allowed. If #hasPathSegments() goes back to false，#bundleEnabled property will be true, and then go back to true
 */
Q.Edge.prototype.isBundleEnabled = function () {};
/**
 * Edge inflection point has changed
 * @param {Q.PathSegment} value
 */
Q.Edge.prototype.firePathChange = function (value){};
/**
 * Adds path segment
 * @param {Array} points
 * @param {String} type
 * @param {int} index
 */
Q.Edge.prototype.addPathSegment = function (points, type, index){};
/**
 * Delete path segment according to segment position
 * @param {int} index
 */
Q.Edge.prototype.removePathSegmentByIndex = function (index){};
/**
 * Delete path segment
 * @param {Object} pathSegment
 * @returns {Object}
 */
Q.Edge.prototype.removePathSegment = function (pathSegment){};
/**
 * Removes path segment
 * @param {number} dx
 * @param {number} dy
 * @param {int} index
 */
Q.Edge.prototype.movePathSegment = function (dx, dy, index){};
/**
 * Edge path segment
 * @type Q.HashList
 */
Q.Edge.prototype.pathSegments = {};
/**
 * Start end node
 * @type Q.Node
 */
Q.Edge.prototype.from = {};
/**
 * Terminal end node
 * @type Q.Node
 */
Q.Edge.prototype.to = {};
/**
 * Agent node at start end
 * @type Q.Node
 */
Q.Edge.prototype.fromAgent = {};
/**
 * Agent node at terminal end
 * @type Q.Node
 */
Q.Edge.prototype.toAgent = {};
/**
 * Edge type
 * @see Q.Consts.EDGE_TYPE_***
 * @type String
 */
Q.Edge.prototype.edgeType = {};
/**
 * If bundle is allowed, default to true
 * @type Boolean
 */
Q.Edge.prototype.bundleEnabled = {};
/**
 * Edge angle, when the edge is connected to the bus, lay the edge according to appointed angle
 * @type number
 */
Q.Edge.prototype.angle = {};
/**
 * Graph model, for saving and managing graph element
 * @constructor
 * @extends Q.DataModel
 */
Q.GraphModel = function (){};
Q.GraphModel.prototype = new Q.DataModel();
/**
 * Traverse all nodes
 * @param {Function} call Callback function
 * @param {Object} [scope] function scope
 */
Q.GraphModel.prototype.forEachNode = function (call, scope){};
/**
 * Dispatcher of change event of property
 * @type Q.Dispatcher
 */
Q.GraphModel.prototype.propertyChangeDispatcher = {};
/**
 * Current subnet objects, Pay attention that the property of subnet object #enableSubNetwork must be true
 * @type Q.Element
 * @see Q.Graph#currentSubNetwork
 */
Q.GraphModel.prototype.currentSubNetwork = {};
/**
 * The graph model is a graph made of connection relation. Traverse according to image depth
 * @param {Function} call Callback function
 * @param {Object} scope callback function scope
 * @param {boolean} postOrder if postorder traversal is adopted
 */
Q.GraphModel.prototype.forEachByTopoDepthFirstSearch = function (call, scope, postOrder, undirected){};
/**
 * The graph model is a graph made of connection relation. Traverse according to image width
 * @param {Object} call
 * @param {Object} scope
 * @param {Object} postOrder
 * @returns {Object}
 */
Q.GraphModel.prototype.forEachByTopoBreadthFirstSearch = function (call, scope, postOrder, undirected){};
/**
 * Edge bundle, containing edges between two nodes
 * @constructor
 * @param {Q.Node} node1 one node
 * @param {Q.Node} node2 Another node
 */
Q.EdgeBundle = function (node1, node2) {};
/**
 * Node 1
 * @type Q.Node
 */
Q.EdgeBundle.prototype.node1 = {};
/**
 * Another node
 * @type Q.Node
 */
Q.EdgeBundle.prototype.node2 = {};
/**
 * Agent edge
 * @type Q.Edge
 */
Q.EdgeBundle.prototype.agentEdge = {};
/**
 * If empty
 * @returns {Boolean}
 */
Q.EdgeBundle.prototype.isEmpty = function () {};
/**
 * If it is in positive sequence, in case the start node is node 1, and the end node is node 2, it will be called positive sequence
 * @param {Q.Edge} edge
 * @returns {Boolean}
 */
Q.EdgeBundle.prototype.isPositiveOrder = function (edge) {};
/**
 * If bundle is allowed
 * @returns {Boolean}
 */
Q.EdgeBundle.prototype.canBind = function (graph) {};
/**
 * Acquire the gap
 * @param {Object} edge
 * @returns {Number}
 */
Q.EdgeBundle.prototype.getYOffset = function (edge) {};
/**
 * Change expanding status
 */
Q.EdgeBundle.prototype.reverseExpanded = function () {};
/**
 * Edge collection that can be binded
 * @type Array
 */
Q.EdgeBundle.prototype.bindableEdges = {};
/**
 * If it is in expanded status
 * @type Boolean
 */
Q.EdgeBundle.prototype.expanded = {};
/**
 * Tree-form layout
 * @constructor
 * @param {Q.Graph} graph
 * @extends Q.Layouter
 */
Q.TreeLayouter = function (graph) {};
Q.TreeLayouter.prototype = new Q.Layouter();
/**
 * Horizontal gap
 * @type number
 */
Q.TreeLayouter.prototype.hGap = {};
/**
 * Vertical gap
 * @type number
 */
Q.TreeLayouter.prototype.vGap = {};
/**
 * Layout direction among layers
 * @see Consts.DIRECTION_RIGHT
 * @see Consts.DIRECTION_BOTTOM
 * @type number
 */
Q.TreeLayouter.prototype.parentChildrenDirection = {};
/**
 * Layout type, reference value: Q.Consts.LAYOUT_TYPE_***
 * @type string
 */
Q.TreeLayouter.prototype.layoutType = {};
/**
 * Default size of node element, before the graph is not initialized or the node graph has not be loaded, the system will be unable to acquire the accurate size of node element, and now the default size will be applied
 * @type Q.Size
 */
Q.TreeLayouter.prototype.defaultSize = {};
/**
 * Acquire node size
 * @param {Q.Node} node
 * @returns {Q.Size} Node size
 */
Q.TreeLayouter.prototype.getNodeSize = function (node){};
/**
 * Software name
 * @static
 * @type String
 */
Q.name = {};
/**
 * Description about Qunee for HTML5
 * @static
 * @type String
 */
Q.about = {};
/**
 * Description of software copyright
 * @static
 * @type String
 */
Q.copyright = {};
/**
 * Set css style
 * @example
 * Q.css(document.body, {
 *  "background-color": Q.toColor(0xEE2898E0),
 *  "border": "1px solid #222222"
 *  "border-radius": "5px",
 * });
 * @static
 * @param {HTMLElement} el
 * @param {Object} props Style property
 */
Q.css = function (el, props) {};
/**
 * Graph drawing interface
 * @example Self-defined node graph is a rectangle
 * var customDraw = {
 *  width: 100,
 *  height: 100,
 *  draw: function(g, scale){
 *    g.beginPath();
 *    g.fillStyle = Q.toColor(0xCC2898E0);
 *    g.fillRect(0, 0, 100, 100);
 *  }
 * }
 * var node = graph.createNode("custom shape");
 * node.image = customDraw;
 * @static
 * @namespace
 * @type object
 */
Q.IDrawable = {};
/**
 * Drawing function
 * @static
 * @param {CanvasRenderingContext2D} g
 * @param {Number} [scale]
 */
Q.IDrawable.draw = function (g, scale){};

Q.IDrawable.draw = function (g, scale){};
/**
 * Click the mouse on the entire webpage under edit mode can callback the function, and the default will close the edit mode by closing the edit box. If the set of {@link Q.Defaults.LABEL_EDITOR_SUBMIT_WHEN_LOST_FOCUS} is true, the edit text will be submitted, otherwise it will only be submitted when pressing Enter.
 * @param {MouseEvent} evt
 */
Q.LabelEditor.prototype.onClickOnWindow = function (evt){};
/**
 * Default of the interactive editor realizes the function of the shortcut key of deleting the primitives.
 * @constructor
 * @param {Q.Graph} graph
 */
Q.EditInteraction = function (graph){};
/**
 * During the interactive process, the prototype of drawable interactor class often needs to draw some temporary graphs or auxiliary lines. These graphs can be drew on the top canvas of {@link Q.Graph#topCanvas} and cleared at the end of the interaction.
 * Customized interaction can inherit this class and rewrite {@link Q.DrawableInteraction}
 * @constructor
 * @param {Q.Graph} graph
 */
Q.DrawableInteraction = function (graph){};
/**
 * This function will be called back when the primitives on the canvas are deleted.
 * @param {Q.Element} element
 * @param {Q.Graph} graph
 */
Q.DrawableInteraction.prototype.onElementRemoved = function (element, graph){};
/**
 * This function will be called back when the canvas is empty.
 * @param {Q.Graph} graph
 */
Q.DrawableInteraction.prototype.onClear = function (graph){};
/**
 * Set invalid state for refreshing the graphs drawn in the interactive process, the method will
 */
Q.DrawableInteraction.prototype.invalidate = function (){};
/**
 * Delete the drawing layer from the top Canvas.
 */
Q.DrawableInteraction.prototype.removeDrawable = function (){};
/**
 * Add the drawing layer to the top Canvas
 */
Q.DrawableInteraction.prototype.addDrawable = function (){};
/**
 * Draw the content, and rewrite this method to realize the interactive drawing.
 * @param {CanvasRenderingContext2D} g
 * @param {Number} scale
 */
Q.DrawableInteraction.prototype.doDraw = function (g, scale){};
/**
 * Whether quit is allowed or not by pressing the shortcut ESC
 * @type boolean
 */
Q.DrawableInteraction.prototype.escapable = {};
/**
 * Create a path interactor, inheriting from {@link Q.DrawableInteraction} to realize the route drawing during the interactive process. Creation of the link interaction {@link Q.CreateEdgeInteraction} and the creation of the path interaction {@link Q.CreateShapeInteraction} are both inherit from this class.
 * @constructor
 * @extends Q.DrawableInteraction
 * @param {Q.Graph} graph
 */
Q.DrawPathInteraction = function (graph){};
Q.DrawPathInteraction.prototype = new Q.DrawableInteraction();
/**
 * Set the drawing patterns, such as line width, color, fill color, and so on.
 * @param {CanvasRenderingContext2D} g
 */
Q.DrawPathInteraction.prototype.styleDraw = function (g){};
/**
 * The default of the drawing point is lineTo. MoveTo drawing will be used if moveTo parameter is true, while quadraticCurveTo drawing will be used if the coordinate point input is an array.
 * @param {CanvasRenderingContext2D} g
 * @param {Q.Point} p coordinate point or collection of coordinate points.
 * @param {Boolean} moveTo is moveTo or not
 */
Q.DrawPathInteraction.prototype.drawPoint = function (g, p, moveTo){};
/**
 * Add the inflection point.
 * @param {Q.Point} xy coordinate point
 */
Q.DrawPathInteraction.prototype.addPoint = function (xy){};
/**
 * Coordinates of the current point of the cursor
 * @type Q.Point
 */
Q.DrawPathInteraction.prototype.currentPoint = {};
/**
 * Last coordinate point
 * @type Q.Point
 */
Q.DrawPathInteraction.prototype.prevPoint = {};
/**
 * Collection of the path points
 * @type Array
 */
Q.DrawPathInteraction.prototype.points = {};
/**
 * Create the link interactor
 * @constructor
 * @extends Q.DrawPathInteraction
 * @param {Q.Graph} graph
 */
Q.CreateEdgeInteraction = function (graph){};
Q.CreateEdgeInteraction.prototype = new Q.DrawPathInteraction();
/**
 * Call this method at the end of the creation of the link interaction.
 * @param {MouseEvent} evt
 * @param {Q.Graph} graph
 * @param {Q.Node} end end node
 */
Q.CreateEdgeInteraction.prototype.finish = function (evt, graph, end){};
/**
 * Convert the mouse events to the relative coordinates on the canvas
 * @param {MouseEvent} evt
 * @returns {Q.Point}
 */
Q.CreateEdgeInteraction.prototype.toLogicalPoint = function (evt){};
/**
 * Set the coordinates of the current cursor, the default attribute of which is to directly set the currentPoint while rewriting which can specially handle the current point, such as changing to curve and linking to the current cursor
 * @param {Q.Point} p
 */
Q.CreateEdgeInteraction.prototype.setCurrentPoint = function (p){};
/**
 * Acquire the default drawing pattern starting from the pattern list of the graph as the default set, while acquiring it from Q.DefaultStyles if not defined.
 * @param {Q.Graph} graph
 * @returns {Object}
 */
Q.CreateEdgeInteraction.prototype.getDefaultDrawStyles = function (graph){};
/**
 * Click on the entire webpage will callback the function under the edit mode, so as to end the edit mode and close the edit box
 * @param {MouseEvent} evt
 */
Q.LabelEditor.prototype.onClickOnWindow = function (evt){};
/**
 * Draw the reference line
 * @param {CanvasRenderingContext2D} g
 * @param {Number} scale
 */
Q.PointsInteraction.prototype.drawLine = function (g, scale){};
/**
 * Handle the mouse-click event
 * @param {MouseEvent} evt
 * @param {Q.Graph} graph
 */
Q.PointsInteraction.prototype.onclick = function (evt, graph){};
/**
 * Whether the primitives can be edited or not
 * @param {Q.Element} element
 * @returns {Boolean}
 */
Q.PointsInteraction.prototype.isEditable = function (element){};
/**
 * The range extending amount of the primitive UI. As the displayed range of the component usually goes beyond its calculation limits, margin is usually reserved for the calculation of the component bounds to avoid being cut, and the default value of which is 1.
 * @static
 * @type number
 */
Q.Defaults.UI_BOUNDS_GROW = {};
/**
 * The tolerance of the linking endpoint. The linking endpoint of Qunee is defaulted to be connected to the edge of the node. Some error will be existed in the track of the edge where 100% fit is not required for the purpose of performance improvement. And the default of the error is 2 pixels.
 * @static
 * @type number
 */
Q.Defaults.LOOKING_EDGE_ENDPOINT_TOLERANCE = {};
/**
 * Whether to submit the edit text when the text input box lost its focus
 * @type Boolean
 */
Q.Defaults.LABEL_EDITOR_SUBMIT_WHEN_LOST_FOCUS = {};
/**
 * Hint the display duration of the text
 * @static
 * @type number
 */
Q.Defaults.TOOLTIP_DURATION = {};
/**
 * Hint the initial appearing time of the text
 * @static
 * @type number
 */
Q.Defaults.TOOLTIP_DELAY = {};
/**
 * Primitive transparency
 * @static
 * @type string
 */
Q.Styles.ALPHA = {};
/**
 * Display layer of the node images can be used for adjusting the display layers of the graph, text label and other sub-UI
 * @static
 * @type string
 */
Q.Styles.IMAGE_Z_INDEX = {};
/**
 * Adjustment of the node image can be mirroring flip and vertical flip
 * @static
 * @type string
 */
Q.Styles.IMAGE_ADJUST = {};
/**
 * Node image transparency
 * @static
 * @type string
 */
Q.Styles.IMAGE_ALPHA = {};
/**
 * The text label is visible or not
 * @static
 * @type string
 */
Q.Styles.LABEL_VISIBLE = {};
/**
 * Display order of the text label
 * @static
 * @type string
 */
Q.Styles.LABEL_Z_INDEX = {};
/**
 * Whether the text label is top display, the pattern of which is usually used in mapping application to prevent the text label from being blocked by the parcel
 * @static
 * @type string
 */
Q.Styles.LABEL_ON_TOP = {};
/**
 * Connect the link starting endpoint to the edge of the node
 * @static
 * @type string
 */
Q.Styles.EDGE_FROM_AT_EDGE = {};
/**
 * Connect the link ending point to the edge of the node
 * @static
 * @type string
 */
Q.Styles.EDGE_TO_AT_EDGE = {};
/**
 * Acquire the default pattern
 * @param {Object} name
 * @returns {Object}
 */
Q.Graph.prototype.getDefaultStyle = function (name){};
/**
 * Stop translating or scaling the animation
 * @returns {Object}
 */
Q.Graph.prototype.stopAnimation = function (){};
/**
 * Acquire the text label for the binding ligature. It is set default that the number of the ligature, such as +3, will be displayed when multiple ligatures are shown together. Rewriting the function can customize the content of the text label
 * @param {Q.Edge} edge
 * @returns {String}
 */
Q.Graph.prototype.getBundleLabel = function (edge){};
/**
 * Determine whether the coordinates are located on this component, and the function will be called when click on the primitive
 * @param {Number} x
 * @param {Number} y
 * @param {Number} tolerance Tolerance
 * @param {Boolean} notCheckBackground Determine whether to consider the background
 * @returns {Boolean}
 */
Q.BaseUI.prototype.hitTest = function (x, y, tolerance, notCheckBackground) {};
/**
 * Determine whether the coordinates are located within the range of the component
 * @param {Number} x
 * @param {Number} y
 * @param {Number} tolerance
 * @param {Boolean} notCheckBackground Consider the background or not
 * @returns {Boolean}
 */
Q.BaseUI.prototype.hitTestByBounds = function (x, y, tolerance, notCheckBackground){};
/**
 * Original range
 * @type Q.Rect
 */
Q.BaseUI.prototype.originalBounds = {};
/**
 * Top display
 * @type Boolean
 */
Q.BaseUI.prototype.showOnTop = {};
/**
 * Determine whether the coordinates are located on the component by relative coordinates without considering the background. Rewriting the method can realize the hitTest function of the component
 * @param {Number} x Relative coordinate x
 * @param {Number} y Relative coordinate y
 * @param {Number} tolerance Tolerance
 * @returns {Boolean}
 */
Q.BaseUI.prototype.doHitTest = function (x, y, tolerance) {};
/**
 * Determine whether the coordinates are located on the sub-component
 * @param {Number} x Relative coordinate x
 * @param {Number} y Relative coordinate y
 * @param {Number} tolerance Tolerance
 * @returns {Boolean}
 */
Q.ElementUI.prototype.hitTestChildren = function (x, y, tolerance) {};
/**
 * Add the path segment
 * @param {Q.PathSegment} pathsegment
 */
Q.Path.prototype.add = function (pathsegment){};
/**
 * Delete the path segment
 * @param {int} index
 */
Q.Path.prototype.removePathSegment = function (index) {};
/**
 * Determine whether the coordinates are located on the path
 * @param {Number} x
 * @param {Number} y
 * @param {Number} tolerance Tolerance
 * @param {Boolean} inBounds Whether located within the path bounds. Input true if clarified that the coordinates are located within the path bounds to decrease the calculation
 * @param {Number} lineWidth Line width of the path
 * @param {Boolean} isFill Whether to fill the path
 * @returns {Boolean}
 */
Q.Path.prototype.hitTest = function (x, y, tolerance, inBounds, lineWidth, isFill) {};
/**
 * Copy the collection of the path segment
 * @returns {Array}
 */
Q.Path.prototype.toSegments = function () {};
/**
 * Path segment array
 * @type Array
 */
Q.Path.prototype.segments = {};
/**
 * Network element is rotating
 * @static
 * @type string
 */
Q.InteractionEvent.ROTATING = {};
/**
 * Network element finishes rotate
 * @static
 * @type string
 */
Q.InteractionEvent.ROTATE_END = {};
/**
 * Element select event
 * @static
 * @type string
 */
Q.InteractionEvent.SELECT = {};
/**
 * Move coordinate point
 * @param {Number} dx
 * @param {Number} dy
 */
Q.Edge.prototype.move = function (dx, dy){};
/**
 * Validate this EdgeBundle
 * @returns {Object}
 */
Q.Edge.prototype.validateEdgeBundle = function (){};
/**
 * How many edges in this EdgeBundle
 * @type number
 */
Q.EdgeBundle.prototype.length = {};
/**
 * Width
 * @static
 * @type number
 */
Q.Defaults.GROUP_MIN_SIZE.width = {};
/**
 * Height
 * @static
 * @type number
 */
Q.Defaults.GROUP_MIN_SIZE.height = {};

///V2.5
/**
 Scale the rectangle as a whole
 * @param {number} scale
 * @returns {Q.Rect} Return to itself
 */
Q.Rect.prototype.scale = function (scale){};
/**
 Form of output array, format is :[x,y,width,height]
 * @returns {Array}
 */
Q.Rect.prototype.toArray = function (){};
/**
 The coordinate {x, y}of the last control point of the path segment
 * @type Object
 */
Q.PathSegment.prototype.lastPoint = {};
/**
 The coordinate {x, y}of the first control point of the path segment
 * @type Object
 */
Q.PathSegment.prototype.firstPoint = {};
/**
 Set of path segment of polygon primitives
 * @see Q.Path
 * @see {@link Q.ShapeNode#path}
 * @type Array
 */
Q.ShapeNode.prototype.pathSegments = {};
/**
 Total length of polygon segments
 * @type number
 */
Q.ShapeNode.prototype.length = {};
/**
 UI Components corresponding to different groups are used to realize the actual drawing of grouping objects
 * @param {Q.Group} node
 * @param {Q.Graph} canvas
 */
Q.GroupUI = function (node, canvas){};
/**
 Respond to start kneading events
 * @param {TouchEvent} evt
 * @param {Q.Graph} graph
 */
Q.PanInteraction.prototype.startpinch = function (evt, graph){};
/**
 Respond to end events
 * @param {TouchEvent} evt
 * @param {Q.Graph} graph
 */
Q.PanInteraction.prototype.endpinch = function (evt, graph){};
/**
 Select assembler from the the right mouse button
 * @constructor
 */
Q.RectangleSelectionInteractionByRightButton = function () {};
/**
 Respond to right click menu event. Since the right click selection function is in conflict with right click menu, Qunee will cancel the processing of “contextmenu” on the browser
 * @param {MouseEvent} evt
 * @param {Q.Graph} graph
 */
Q.RectangleSelectionInteractionByRightButton.prototype.oncontextmenu = function (evt, graph){};
/**
 Set invalid state and refresh selection gridline state.
 */
Q.RectangleSelectionInteractionByRightButton.prototype.invalidate = function (){};
/**
 Whether start using right click selection interaction
 * @type boolean
 */
Q.Graph.prototype.enableRectangleSelectionByRightButton = {};
/**
 When the right click selection interaction ends call this function
 * @param {Q.Graph} graph
 */
Q.RectangleSelectionInteractionByRightButton.prototype.destroy = function (graph){};
/**
 Whether delay drawing, default value
 * @static
 * @type boolean
 */
Q.Defaults.DELAYED_RENDERING = {};
/**
 Check the limited field of canvas. If the limited field of canvas is set, when the matrix and view port change, Qunee will use this function to make sure the view port be within the display region.
 * @see {@link Q.Graph#limitedBounds}
 * @param {boolean} animate
 */
Q.Graph.prototype.checkLimitedBounds = function (animate) {};
/**
 Scale from the click location. When scaling with the mouse wheel, this function will be used.
 * @param {MouseEvent} evt
 * @param {number} zoominDelta
 * @param {boolean} animate
 * @param {Function} callback
 */
Q.Graph.prototype.zoomByMouseEvent = function (evt, zoominDelta, animate, callback) {};
/**
 When interactive transform  begins, call back this function.
 */
Q.Graph.prototype.onAnimationStart = function (){};
/**
 When interactive transform ends, call back this function.
 */
Q.Graph.prototype.onAnimationEnd = function (){};
/**
 Whether during the transforming process
 * @returns {boolean}
 */
Q.Graph.prototype.isAnimating = function (){};
/**
 Default scale transform
 * @type object
 */
Q.Graph.prototype.zoomAnimation = {};
/**
 Pause drawing the canvas. If the canvas starts using delay drawing {@link Q.Graph#delayedRendering}, this function will be called when scaling interaction.
 * @see {@link Q.Graph#delayedRendering}
 * @param {boolean} pause
 * @param {boolean} force
 */
Q.Graph.prototype.pauseRendering = function (pause, force){};
/**
 Logical coordinate of central point
 * @readonly
 * @type object
 */
Q.Graph.prototype.center = {};
/**
 Canvas mouse gesture
 * @type string
 */
Q.Graph.prototype.cursor = {};
/**
 Name of interactive mode
 * @type string
 */
Q.Graph.prototype.interactionMode = {};
/**
 Times of scaling stepping when scaling with mouse wheel
 * @type number
 */
Q.Graph.prototype.scaleStep = {};
/**
 The maximum scaling of the canvas
 * @type number
 */
Q.Graph.prototype.maxScale = {};
/**
 The minimum scaling of the canvas
 * @type number
 */
Q.Graph.prototype.minScale = {};
/**
 * Current scaling of the canvas
 * @type number
 */
Q.Graph.prototype.scale = {};
/**
 Offset of x coordinate of the matrix changed by canvas
 * @readonly
 * @type number
 */
Q.Graph.prototype.tx = {};
/**
 Offset of y coordinate of the matrix changed by canvas
 * @readonly
 * @type number
 */
Q.Graph.prototype.ty = {};
/**
 Quantity of primitives
 * @readonly
 * @type number
 */
Q.Graph.prototype.count = {};
/**
 Width of canvas module. Use the screen coordinates
 * @type number
 */
Q.Graph.prototype.width = {};
/**
 Height of canvas module. Use the screen coordinates
 * @type number
 */
Q.Graph.prototype.height = {};
/**
 Viewport scope of the canvas. Use canvas logical coordinates.
 * @see {Q.Graph#toLogical}
 * @type Q.Rect
 */
Q.Graph.prototype.viewportBounds = {};
/**
 Scope of primitives in the canvas. Use canvas logical coordinates.
 * @see {Q.Graph#toLogical}
 * @type Q.Rect
 */
Q.Graph.prototype.bounds = {};
/**
 HTML elements of canvas
 * @see {@link Q.Graph#html}
 * @type HTMLElement
 */
Q.Graph.prototype.canvasPanel = {};
/**
 Father node of HTML element of the canvas, that is the father node of {@link Q.Graph#canvasPanel}
 * @see {@link Q.Graph#canvasPanel}
 * @type HTMLElement
 */
Q.Graph.prototype.html = {};
/**
 Types of navigation of canvas. The default types of navigation of graphic components. Support three types of navigation such as scroll bar, navigation button, none
 * @see {@link Q.Consts.NAVIGATION_BUTTON}
 * @see {@link Q.Consts.NAVIGATION_SCROLLBAR}
 * @see {@link Q.Graph#navigationType}
 * @type string
 */
Q.Graph.prototype.navigationType = {};
/**
 Current subnet. Only set {@link Q.Element#enableSubNetwork} as true, it can be taken as the current subnet
 * @see {@link Q.Element#enableSubNetwork}
 * @type Q.Element
 */
Q.Graph.prototype.currentSubNetwork = {};
/**
 Limit the canvas display range. Canvas viewport will not be beyond the scope
 * @type Q.Rect
 */
Q.Graph.prototype.limitedBounds = {};
/**
 Ratio of canvas. Under equal altitude resolution ratio of retina screen. A point on the screen may be drawn from several pixels, when Qunee will scale the canvas correspondingly to adapt the display of HD screen
 * @type number
 */
Q.Graph.prototype.ratio = {};
/**
 During interactive transforming, whether delay drawing canvas, default true. During scale interaction, the canvas will respond to the canvas interaction rather than immediately draw. After the interaction ends canvas will redraw the interface. This nature can increase the responding efficiency of the canvas during scaling.
 However, under some browsers or when Qunee coincides with other components coordinate inconformity or twinkling may occur during interaction. Set this nature as false.
 * @type boolean
 */
Q.Graph.prototype.delayedRendering = {};
/**
 Scope of primitive UI components. The nature is similar to {@link Q.ElementUI#uiBounds}. Both can reflect the scope of UI components. They are different for the latter is relative coordinate and the former is absolute coordinate
 * @see {@link Q.ElementUI#uiBounds}
 * @example
 *var hello = graph.createNode("Hello", 100, 100);
 *  hello.image = Q.Graphs.server;
 *  hello.rotate = 0.4;
 *  graph.callLater(function(){
 *    var bounds = graph.getUI(hello).bounds;
 *    Q.log(bounds.toString())
 * })
 * 输出结果: 65.70861828586547 , 70.79394504440262 , 66.97513929902449 , 75.67538822483633
 Output result: 65.70861828586547 , 70.79394504440262 , 66.97513929902449 , 75.67538822483633
 * @type Q.Rect
 */
Q.ElementUI.prototype.bounds = {};
/**
 Increase inflection points
 * @see {@link Q.Edge#addPathSegement}
 * @param {number} x
 * @param {number} y
 * @param {number} tolerance
 */
Q.EdgeUI.prototype.addPoint = function (x, y, tolerance){};
/**
 Path length
 * @type number
 */
Q.Path.prototype.length = {};
/**
 Start translation interactive events
 * @static
 * @type string
 */
Q.InteractionEvent.PAN_START = {};
/**
 End translation interactive events
 * @static
 * @type string
 */
Q.InteractionEvent.PAN_END = {};
/**
 Node x coordinate
 * @see {@link Q.Node#location}
 * @see {@link Q.Node#y}
 * @type null
 */
Q.Node.prototype.x = {};
/**
 Node y coordinate
 * @see {@link Q.Node#location}
 * @see {@link Q.Node#x}
 * @type number
 */
Q.Node.prototype.y = {};
/**
 Increase path segment of inflection point
 * @returns {Q.PathSegment}
 */
Q.Edge.prototype.addPathSegement = function (){};
/**
 * All edges in the binding
 * @type Array
 */
Q.EdgeBundle.prototype.edges = {};