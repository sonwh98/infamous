!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.famous=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var RenderNode = _dereq_('./RenderNode');
var EventHandler = _dereq_('./EventHandler');
var ElementAllocator = _dereq_('./ElementAllocator');
var Transform = _dereq_('./Transform');
var Transitionable = _dereq_('../transitions/Transitionable');

var _zeroZero = [0, 0];
var usePrefix = !('perspective' in document.documentElement.style);

function _getElementSize(element) {
    return [element.clientWidth, element.clientHeight];
}

var _setPerspective = usePrefix ? function(element, perspective) {
    element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
} : function(element, perspective) {
    element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
};

/**
 * The top-level container for a Famous-renderable piece of the document.
 *   It is directly updated by the process-wide Engine object, and manages one
 *   render tree root, which can contain other renderables.
 *
 * @class Context
 * @constructor
 * @private
 * @param {Node} container Element in which content will be inserted
 */
function Context(container) {}

// Note: Unused
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};

/**
 * Add renderables to this Context's render tree.
 *
 * @method add
 *
 * @param {Object} obj renderable object
 * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
 */
Context.prototype.add = function add(obj) {};

/**
 * Move this Context to another containing document element.
 *
 * @method migrate
 *
 * @param {Node} container Element to which content will be migrated
 */
Context.prototype.migrate = function migrate(container) {};

/**
 * Gets viewport size for Context.
 *
 * @method getSize
 *
 * @return {Array.Number} viewport size as [width, height]
 */
Context.prototype.getSize = function getSize() {
    return this._size;
};

/**
 * Sets viewport size for Context.
 *
 * @method setSize
 *
 * @param {Array.Number} size [width, height].  If unspecified, use size of root document element.
 */
Context.prototype.setSize = function setSize(size) {};

/**
 * Commit this Context's content changes to the document.
 *
 * @private
 * @method update
 * @param {Object} contextParameters engine commit specification
 */
Context.prototype.update = function update(contextParameters) {};

/**
 * Get current perspective of this context in pixels.
 *
 * @method getPerspective
 * @return {Number} depth perspective in pixels
 */
Context.prototype.getPerspective = function getPerspective() {};

/**
 * Set current perspective of this context in pixels.
 *
 * @method setPerspective
 * @param {Number} perspective in pixels
 * @param {Object} [transition] Transitionable object for applying the change
 * @param {function(Object)} callback function called on completion of transition
 */
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
Context.prototype.emit = function emit(type, event) {};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
Context.prototype.on = function on(type, handler) {};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function} handler function object to remove
 * @return {EventHandler} internal event handler object (for chaining)
 */
Context.prototype.removeListener = function removeListener(type, handler) {};

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
Context.prototype.pipe = function pipe(target) {};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe".
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
Context.prototype.unpipe = function unpipe(target) {};

module.exports = Context;
},{"../transitions/Transitionable":88,"./ElementAllocator":2,"./EventHandler":7,"./RenderNode":11,"./Transform":15}],2:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Internal helper object to Context that handles the process of
 *   creating and allocating DOM elements within a managed div.
 *   Private.
 *
 * @class ElementAllocator
 * @constructor
 * @private
 * @param {Node} container document element in which Famo.us content will be inserted
 */
function ElementAllocator(container) {}

/**
 * Move the document elements from their original container to a new one.
 *
 * @private
 * @method migrate
 *
 * @param {Node} container document element to which Famo.us content will be migrated
 */
ElementAllocator.prototype.migrate = function migrate(container) {};

/**
 * Allocate an element of specified type from the pool.
 *
 * @private
 * @method allocate
 *
 * @param {string} type type of element, e.g. 'div'
 * @return {Node} allocated document element
 */
ElementAllocator.prototype.allocate = function allocate(type) {};

/**
 * De-allocate an element of specified type to the pool.
 *
 * @private
 * @method deallocate
 *
 * @param {Node} element document element to deallocate
 */
ElementAllocator.prototype.deallocate = function deallocate(element) {};

/**
 * Get count of total allocated nodes in the document.
 *
 * @private
 * @method getNodeCount
 *
 * @return {Number} total node count
 */
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};

module.exports = ElementAllocator;
},{}],3:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = _dereq_('./Entity');
var EventHandler = _dereq_('./EventHandler');
var Transform = _dereq_('./Transform');

var usePrefix = !('transform' in document.documentElement.style);
var devicePixelRatio = window.devicePixelRatio || 1;

/**
 * A base class for viewable content and event
 *   targets inside a Famo.us application, containing a renderable document
 *   fragment. Like an HTML div, it can accept internal markup,
 *   properties, classes, and handle events.
 *
 * @class ElementOutput
 * @constructor
 *
 * @param {Node} element document parent of this container
 */
function ElementOutput(element) {}

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} fn handler callback
 * @return {EventHandler} this
 */
ElementOutput.prototype.on = function on(type, fn) {};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on"
 *
 * @method removeListener
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} fn handler
 */
ElementOutput.prototype.removeListener = function removeListener(type, fn) {};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} [event] event data
 * @return {EventHandler} this
 */
ElementOutput.prototype.emit = function emit(type, event) {};

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
ElementOutput.prototype.pipe = function pipe(target) {};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe"
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
ElementOutput.prototype.unpipe = function unpipe(target) {};

/**
 * Return spec for this surface. Note that for a base surface, this is
 *    simply an id.
 *
 * @method render
 * @private
 * @return {Object} render spec for this surface (spec id)
 */
ElementOutput.prototype.render = function render() {};

//  Attach Famous event handling to document events emanating from target
//    document element.  This occurs just after attachment to the document.
//    Calling this enables methods like #on and #pipe.
function _addEventListeners(target) {}

//  Detach Famous event handling from document events emanating from target
//  document element.  This occurs just before detach from the document.
function _removeEventListeners(target) {}

/**
 * Return a Matrix's webkit css representation to be used with the
 *    CSS3 -webkit-transform style.
 *    Example: -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,716,243,0,1)
 *
 * @method _formatCSSTransform
 * @private
 * @param {FamousMatrix} m matrix
 * @return {string} matrix3d CSS style representation of the transform
 */
function _formatCSSTransform(m) {}

/**
 * Directly apply given FamousMatrix to the document element as the
 *   appropriate webkit CSS style.
 *
 * @method setMatrix
 *
 * @static
 * @private
 * @param {Element} element document element
 * @param {FamousMatrix} matrix
 */

var _setMatrix;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    _setMatrix = function(element, matrix) {
        element.style.zIndex = (matrix[14] * 1000000) | 0;    // fix for Firefox z-buffer issues
        element.style.transform = _formatCSSTransform(matrix);
    };
}
else if (usePrefix) {
    _setMatrix = function(element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
}
else {
    _setMatrix = function(element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}

// format origin as CSS percentage string
function _formatCSSOrigin(origin) {}

// Directly apply given origin coordinates to the document element as the
// appropriate webkit CSS style.
var _setOrigin = usePrefix ? function(element, origin) {
    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
} : function(element, origin) {
    element.style.transformOrigin = _formatCSSOrigin(origin);
};

// Shrink given document element until it is effectively invisible.
var _setInvisible = usePrefix ? function(element) {
    element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
    element.style.opacity = 0;
} : function(element) {
    element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
    element.style.opacity = 0;
};

function _xyNotEquals(a, b) {}

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
ElementOutput.prototype.commit = function commit(context) {};

ElementOutput.prototype.cleanup = function cleanup() {};

/**
 * Place the document element that this component manages into the document.
 *
 * @private
 * @method attach
 * @param {Node} target document parent of this container
 */
ElementOutput.prototype.attach = function attach(target) {};

/**
 * Remove any contained document content associated with this surface
 *   from the actual document.
 *
 * @private
 * @method detach
 */
ElementOutput.prototype.detach = function detach() {};

module.exports = ElementOutput;
},{"./Entity":5,"./EventHandler":7,"./Transform":15}],4:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

/**
 * The singleton object initiated upon process
 *   startup which manages all active Context instances, runs
 *   the render dispatch loop, and acts as a listener and dispatcher
 *   for events.  All methods are therefore static.
 *
 *   On static initialization, window.requestAnimationFrame is called with
 *     the event loop function.
 *
 *   Note: Any window in which Engine runs will prevent default
 *     scrolling behavior on the 'touchmove' event.
 *
 * @static
 * @class Engine
 */
var Context = _dereq_('./Context');
var EventHandler = _dereq_('./EventHandler');
var OptionsManager = _dereq_('./OptionsManager');

var Engine = {};

var contexts = [];

var nextTickQueue = [];

var currentFrame = 0;
var nextTickFrame = 0;

var deferQueue = [];

var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();

var options = {
    containerType: 'div',
    containerClass: 'famous-container',
    fpsCap: undefined,
    runLoop: true,
    appMode: true
};
var optionsManager = new OptionsManager(options);

/** @const */
var MAX_DEFER_FRAME_TIME = 10;

/**
 * Inside requestAnimationFrame loop, step() is called, which:
 *   calculates current FPS (throttling loop if it is over limit set in setFPSCap),
 *   emits dataless 'prerender' event on start of loop,
 *   calls in order any one-shot functions registered by nextTick on last loop,
 *   calls Context.update on all Context objects registered,
 *   and emits dataless 'postrender' event on end of loop.
 *
 * @static
 * @private
 * @method step
 */
Engine.step = function step() {};

// engage requestAnimationFrame
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    }
    else loopEnabled = false;
}
window.requestAnimationFrame(loop);

//
// Upon main document window resize (unless on an "input" HTML element):
//   scroll to the top left corner of the window,
//   and for each managed Context: emit the 'resize' event and update its size.
// @param {Object=} event document event
//
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();

/**
 * Initialize famous for app mode
 *
 * @static
 * @private
 * @method initialize
 */
function initialize() {}
var initialized = false;

function addRootClasses() {}

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
Engine.pipe = function pipe(target) {};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe".
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
Engine.unpipe = function unpipe(target) {};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @static
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
Engine.on = function on(type, handler) {};

function addEngineListener(type, forwarder) {}

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @static
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function} handler function object to remove
 * @return {EventHandler} internal event handler object (for chaining)
 */
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};

/**
 * Return the current calculated frames per second of the Engine.
 *
 * @static
 * @method getFPS
 *
 * @return {Number} calculated fps
 */
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};

/**
 * Set the maximum fps at which the system should run. If internal render
 *    loop is called at a greater frequency than this FPSCap, Engine will
 *    throttle render and update until this rate is achieved.
 *
 * @static
 * @method setFPSCap
 *
 * @param {Number} fps maximum frames per second
 */
Engine.setFPSCap = function setFPSCap(fps) {};

/**
 * Return engine options.
 *
 * @static
 * @method getOptions
 * @param {string} key
 * @return {Object} engine options
 */
Engine.getOptions = function getOptions(key) {};

/**
 * Set engine options
 *
 * @static
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.fpsCap]  maximum fps at which the system should run
 * @param {boolean} [options.runLoop=true] whether the run loop should continue
 * @param {string} [options.containerType="div"] type of container element.  Defaults to 'div'.
 * @param {string} [options.containerClass="famous-container"] type of container element.  Defaults to 'famous-container'.
 */
Engine.setOptions = function setOptions(options) {};

/**
 * Creates a new Context for rendering and event handling with
 *    provided document element as top of each tree. This will be tracked by the
 *    process-wide Engine.
 *
 * @static
 * @method createContext
 *
 * @param {Node} el will be top of Famo.us document element tree
 * @return {Context} new Context within el
 */
Engine.createContext = function createContext(el) {};

function mount(context, el) {}

/**
 * Registers an existing context to be updated within the run loop.
 *
 * @static
 * @method registerContext
 *
 * @param {Context} context Context to register
 * @return {FamousContext} provided context
 */
Engine.registerContext = function registerContext(context) {};

/**
 * Returns a list of all contexts.
 *
 * @static
 * @method getContexts
 * @return {Array} contexts that are updated on each tick
 */
Engine.getContexts = function getContexts() {};

/**
 * Removes a context from the run loop. Note: this does not do any
 *     cleanup.
 *
 * @static
 * @method deregisterContext
 *
 * @param {Context} context Context to deregister
 */
Engine.deregisterContext = function deregisterContext(context) {};

/**
 * Queue a function to be executed on the next tick of the
 *    Engine.
 *
 * @static
 * @method nextTick
 *
 * @param {function(Object)} fn function accepting window object
 */
Engine.nextTick = function nextTick(fn) {};

/**
 * Queue a function to be executed sometime soon, at a time that is
 *    unlikely to affect frame rate.
 *
 * @static
 * @method defer
 *
 * @param {Function} fn
 */
Engine.defer = function defer(fn) {};

optionsManager.on('change', function(data) {});

module.exports = Engine;
},{"./Context":1,"./EventHandler":7,"./OptionsManager":10}],5:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * A singleton that maintains a global registry of Surfaces.
 *   Private.
 *
 * @private
 * @static
 * @class Entity
 */

var entities = [];

/**
 * Get entity from global index.
 *
 * @private
 * @method get
 * @param {Number} id entity registration id
 * @return {Surface} entity in the global index
 */
function get(id) {}

/**
 * Overwrite entity in the global index
 *
 * @private
 * @method set
 * @param {Number} id entity registration id
 * @param {Surface} entity to add to the global index
 */
function set(id, entity) {}

/**
 * Add entity to global index
 *
 * @private
 * @method register
 * @param {Surface} entity to add to global index
 * @return {Number} new id
 */
function register(entity) {}

/**
 * Remove entity from global index
 *
 * @private
 * @method unregister
 * @param {Number} id entity registration id
 */
function unregister(id) {}

module.exports = {};
},{}],6:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * EventEmitter represents a channel for events.
 *
 * @class EventEmitter
 * @constructor
 */
function EventEmitter() {}

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
EventEmitter.prototype.emit = function emit(type, event) {};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
   EventEmitter.prototype.on = function on(type, handler) {};

/**
 * Alias for "on".
 * @method addListener
 */
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

   /**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function} handler function object to remove
 * @return {EventEmitter} this
 */
EventEmitter.prototype.removeListener = function removeListener(type, handler) {};

/**
 * Call event handlers with this set to owner.
 *
 * @method bindThis
 *
 * @param {Object} owner object this EventEmitter belongs to
 */
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};

module.exports = EventEmitter;
},{}],7:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventEmitter = _dereq_('./EventEmitter');

/**
 * EventHandler forwards received events to a set of provided callback functions.
 * It allows events to be captured, processed, and optionally piped through to other event handlers.
 *
 * @class EventHandler
 * @extends EventEmitter
 * @constructor
 */
function EventHandler() {}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;

/**
 * Assign an event handler to receive an object's input events.
 *
 * @method setInputHandler
 * @static
 *
 * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
 * @param {EventHandler} handler assigned event handler
 */
EventHandler.setInputHandler = function setInputHandler(object, handler) {};

/**
 * Assign an event handler to receive an object's output events.
 *
 * @method setOutputHandler
 * @static
 *
 * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
 * @param {EventHandler} handler assigned event handler
 */
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
EventHandler.prototype.emit = function emit(type, event) {};

/**
 * Alias for emit
 * @method addListener
 */
EventHandler.prototype.trigger = EventHandler.prototype.emit;

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
EventHandler.prototype.pipe = function pipe(target) {};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe".
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
EventHandler.prototype.unpipe = function unpipe(target) {};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
EventHandler.prototype.on = function on(type, handler) {};

/**
 * Alias for "on"
 * @method addListener
 */
EventHandler.prototype.addListener = EventHandler.prototype.on;

/**
 * Listen for events from an upstream event handler.
 *
 * @method subscribe
 *
 * @param {EventEmitter} source source emitter object
 * @return {EventHandler} this
 */
EventHandler.prototype.subscribe = function subscribe(source) {};

/**
 * Stop listening to events from an upstream event handler.
 *
 * @method unsubscribe
 *
 * @param {EventEmitter} source source emitter object
 * @return {EventHandler} this
 */
EventHandler.prototype.unsubscribe = function unsubscribe(source) {};

module.exports = EventHandler;
},{"./EventEmitter":6}],8:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Context = _dereq_('./Context');
var Transform = _dereq_('./Transform');
var Surface = _dereq_('./Surface');

/**
 * A Context designed to contain surfaces and set properties
 *   to be applied to all of them at once.
 *   This is primarily used for specific performance improvements in the rendering engine.
 *   Private.
 *
 * @private
 * @class Group
 * @extends Surface
 * @constructor
 * @param {Object} [options] Surface options array (see Surface})
 */
function Group(options) {}

/** @const */
Group.SIZE_ZERO = [0, 0];

Group.prototype = Object.create(Surface.prototype);
Group.prototype.elementType = 'div';
Group.prototype.elementClass = 'famous-group';

/**
 * Add renderables to this component's render tree.
 *
 * @method add
 * @private
 * @param {Object} obj renderable object
 * @return {RenderNode} Render wrapping provided object, if not already a RenderNode
 */
Group.prototype.add = function add() {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {Number} Render spec for this component
 */
Group.prototype.render = function render() {};

/**
 * Place the document element this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
Group.prototype.deploy = function deploy(target) {};

/**
 * Remove this component and contained content from the document
 *
 * @private
 * @method recall
 *
 * @param {Node} target node to which the component was deployed
 */
Group.prototype.recall = function recall(target) {};

/**
 * Apply changes from this component to the corresponding document element.
 *
 * @private
 * @method commit
 *
 * @param {Object} context update spec passed in from above in the render tree.
 */
Group.prototype.commit = function commit(context) {};

module.exports = Group;
},{"./Context":1,"./Surface":14,"./Transform":15}],9:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = _dereq_('./Transform');
var Transitionable = _dereq_('../transitions/Transitionable');
var TransitionableTransform = _dereq_('../transitions/TransitionableTransform');

/**
 *
 *  A collection of visual changes to be
 *    applied to another renderable component. This collection includes a
 *    transform matrix, an opacity constant, a size, an origin specifier.
 *    Modifier objects can be added to any RenderNode or object
 *    capable of displaying renderables.  The Modifier's children and descendants
 *    are transformed by the amounts specified in the Modifier's properties.
 *
 * @class Modifier
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {Transform} [options.transform] affine transformation matrix
 * @param {Number} [options.opacity]
 * @param {Array.Number} [options.origin] origin adjustment
 * @param {Array.Number} [options.size] size to apply to descendants
 */
function Modifier(options) {}

/**
 * Function, object, or static transform matrix which provides the transform.
 *   This is evaluated on every tick of the engine.
 *
 * @method transformFrom
 *
 * @param {Object} transform transform provider object
 * @return {Modifier} this
 */
Modifier.prototype.transformFrom = function transformFrom(transform) {};

/**
 * Set function, object, or number to provide opacity, in range [0,1].
 *
 * @method opacityFrom
 *
 * @param {Object} opacity provider object
 * @return {Modifier} this
 */
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {};

/**
 * Set function, object, or numerical array to provide origin, as [x,y],
 *   where x and y are in the range [0,1].
 *
 * @method originFrom
 *
 * @param {Object} origin provider object
 * @return {Modifier} this
 */
Modifier.prototype.originFrom = function originFrom(origin) {};

/**
 * Set function, object, or numerical array to provide align, as [x,y],
 *   where x and y are in the range [0,1].
 *
 * @method alignFrom
 *
 * @param {Object} align provider object
 * @return {Modifier} this
 */
Modifier.prototype.alignFrom = function alignFrom(align) {};

/**
 * Set function, object, or numerical array to provide size, as [width, height].
 *
 * @method sizeFrom
 *
 * @param {Object} size provider object
 * @return {Modifier} this
 */
Modifier.prototype.sizeFrom = function sizeFrom(size) {};

/**
 * Set function, object, or numerical array to provide proportions, as [percent of width, percent of height].
 *
 * @method proportionsFrom
 *
 * @param {Object} proportions provider object
 * @return {Modifier} this
 */
Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {};

 /**
 * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
 * @deprecated
 * @method setTransform
 *
 * @param {Transform} transform Transform to transition to
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {};

/**
 * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
 * @deprecated
 * @method setOpacity
 *
 * @param {Number} opacity Opacity value to transition to.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {};

/**
 * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
 * @deprecated
 * @method setOrigin
 *
 * @param {Array.Number} origin two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {};

/**
 * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
 * @deprecated
 * @method setAlign
 *
 * @param {Array.Number} align two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {};

/**
 * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
 * @deprecated
 * @method setSize
 * @param {Array.Number} size two element array of [width, height]
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setSize = function setSize(size, transition, callback) {};

/**
 * Deprecated: Prefer proportionsFrom with static origin array, or use a Transitionable with those proportions.
 * @deprecated
 * @method setProportions
 * @param {Array.Number} proportions two element array of [percent of width, percent of height]
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {};

/**
 * Deprecated: Prefer to stop transform in your provider object.
 * @deprecated
 * @method halt
 */
Modifier.prototype.halt = function halt() {};

/**
 * Deprecated: Prefer to use your provided transform or output of your transform provider.
 * @deprecated
 * @method getTransform
 * @return {Object} transform provider object
 */
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};

/**
 * Deprecated: Prefer to determine the end state of your transform from your transform provider
 * @deprecated
 * @method getFinalTransform
 * @return {Transform} transform matrix
 */
Modifier.prototype.getFinalTransform = function getFinalTransform() {};

/**
 * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
 * @deprecated
 * @method getOpacity
 * @return {Object} opacity provider object
 */
Modifier.prototype.getOpacity = function getOpacity() {};

/**
 * Deprecated: Prefer to use your provided origin or output of your origin provider.
 * @deprecated
 * @method getOrigin
 * @return {Object} origin provider object
 */
Modifier.prototype.getOrigin = function getOrigin() {};

/**
 * Deprecated: Prefer to use your provided align or output of your align provider.
 * @deprecated
 * @method getAlign
 * @return {Object} align provider object
 */
Modifier.prototype.getAlign = function getAlign() {};

/**
 * Deprecated: Prefer to use your provided size or output of your size provider.
 * @deprecated
 * @method getSize
 * @return {Object} size provider object
 */
Modifier.prototype.getSize = function getSize() {};

/**
 * Deprecated: Prefer to use your provided proportions or output of your proportions provider.
 * @deprecated
 * @method getProportions
 * @return {Object} proportions provider object
 */
Modifier.prototype.getProportions = function getProportions() {};

// call providers on tick to receive render spec elements to apply
function _update() {}

/**
 * Return render spec for this Modifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} target (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this Modifier, including the
 *    provided target
 */
Modifier.prototype.modify = function modify(target) {};

module.exports = Modifier;
},{"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89,"./Transform":15}],10:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = _dereq_('./EventHandler');

/**
 *  A collection of methods for setting options which can be extended
 *  onto other classes.
 *
 *
 *  **** WARNING ****
 *  You can only pass through objects that will compile into valid JSON.
 *
 *  Valid options:
 *      Strings,
 *      Arrays,
 *      Objects,
 *      Numbers,
 *      Nested Objects,
 *      Nested Arrays.
 *
 *    This excludes:
 *        Document Fragments,
 *        Functions
 * @class OptionsManager
 * @constructor
 * @param {Object} value options dictionary
 */
function OptionsManager(value) {}

/**
 * Create options manager from source dictionary with arguments overriden by patch dictionary.
 *
 * @static
 * @method OptionsManager.patch
 *
 * @param {Object} source source arguments
 * @param {...Object} data argument additions and overwrites
 * @return {Object} source object
 */
OptionsManager.patch = function patchObject(source, data) {};

function _createEventOutput() {}

/**
 * Create OptionsManager from source with arguments overriden by patches.
 *   Triggers 'change' event on this object's event handler if the state of
 *   the OptionsManager changes as a result.
 *
 * @method patch
 *
 * @param {...Object} arguments list of patch objects
 * @return {OptionsManager} this
 */
OptionsManager.prototype.patch = function patch() {};

/**
 * Alias for patch
 *
 * @method setOptions
 *
 */
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;

/**
 * Return OptionsManager based on sub-object retrieved by key
 *
 * @method key
 *
 * @param {string} identifier key
 * @return {OptionsManager} new options manager with the value
 */
OptionsManager.prototype.key = function key(identifier) {};

/**
 * Look up value by key or get the full options hash
 * @method get
 *
 * @param {string} key key
 * @return {Object} associated object or full options hash
 */
OptionsManager.prototype.get = function get(key) {};

/**
 * Alias for get
 * @method getOptions
 */
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;

/**
 * Set key to value.  Outputs 'change' event if a value is overwritten.
 *
 * @method set
 *
 * @param {string} key key string
 * @param {Object} value value object
 * @return {OptionsManager} new options manager based on the value object
 */
OptionsManager.prototype.set = function set(key, value) {};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'change')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
OptionsManager.prototype.on = function on() {};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'change')
 * @param {function} handler function object to remove
 * @return {EventHandler} internal event handler object (for chaining)
 */
OptionsManager.prototype.removeListener = function removeListener() {};

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
OptionsManager.prototype.pipe = function pipe() {};

/**
 * Remove handler object from set of downstream handlers.
 * Undoes work of "pipe"
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
OptionsManager.prototype.unpipe = function unpipe() {};

module.exports = OptionsManager;
},{"./EventHandler":7}],11:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = _dereq_('./Entity');
var SpecParser = _dereq_('./SpecParser');

/**
 * A wrapper for inserting a renderable component (like a Modifer or
 *   Surface) into the render tree.
 *
 * @class RenderNode
 * @constructor
 *
 * @param {Object} object Target renderable component
 */
function RenderNode(object) {}

/**
 * Append a renderable to the list of this node's children.
 *   This produces a new RenderNode in the tree.
 *   Note: Does not double-wrap if child is a RenderNode already.
 *
 * @method add
 * @param {Object} child renderable object
 * @return {RenderNode} new render node wrapping child
 */
RenderNode.prototype.add = function add(child) {};

/**
 * Return the single wrapped object.  Returns null if this node has multiple child nodes.
 *
 * @method get
 *
 * @return {Ojbect} contained renderable object
 */
RenderNode.prototype.get = function get() {};

/**
 * Overwrite the list of children to contain the single provided object
 *
 * @method set
 * @param {Object} child renderable object
 * @return {RenderNode} this render node, or child if it is a RenderNode
 */
RenderNode.prototype.set = function set(child) {};

/**
 * Get render size of contained object.
 *
 * @method getSize
 * @return {Array.Number} size of this or size of single child.
 */
RenderNode.prototype.getSize = function getSize() {};

// apply results of rendering this subtree to the document
function _applyCommit(spec, context, cacheStorage) {}

/**
 * Commit the content change from this node to the document.
 *
 * @private
 * @method commit
 * @param {Context} context render context
 */
RenderNode.prototype.commit = function commit(context) {};

/**
 * Generate a render spec from the contents of the wrapped component.
 *
 * @private
 * @method render
 *
 * @return {Object} render specification for the component subtree
 *    only under this node.
 */
RenderNode.prototype.render = function render() {};

module.exports = RenderNode;
},{"./Entity":5,"./SpecParser":13}],12:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = _dereq_('./Transform');
var Modifier = _dereq_('./Modifier');
var RenderNode = _dereq_('./RenderNode');

/**
 * Builds and renders a scene graph based on a declarative structure definition.
 * See the Scene examples in the examples distribution (http://github.com/Famous/examples.git).
 *
 * @class Scene
 * @constructor
 * @param {Object|Array|Spec} definition in the format of a render spec.
 */
function Scene(definition) {}

var _MATRIX_GENERATORS = {
    'translate': Transform.translate,
    'rotate': Transform.rotate,
    'rotateX': Transform.rotateX,
    'rotateY': Transform.rotateY,
    'rotateZ': Transform.rotateZ,
    'rotateAxis': Transform.rotateAxis,
    'scale': Transform.scale,
    'skew': Transform.skew,
    'matrix3d': function() {
        return arguments;
    }
};

/**
 * Clone this scene
 *
 * @method create
 * @return {Scene} deep copy of this scene
 */
Scene.prototype.create = function create() {};

function _resolveTransformMatrix(matrixDefinition) {}

// parse transform into tree of render nodes, doing matrix multiplication
// when available
function _parseTransform(definition) {}

function _parseArray(definition) {}

// parse object directly into tree of RenderNodes
function _parse(definition) {}

/**
 * Builds and renders a scene graph based on a canonical declarative scene definition.
 * See examples/Scene/example.js.
 *
 * @method load
 * @param {Object} definition definition in the format of a render spec.
 */
Scene.prototype.load = function load(definition) {};

/**
 * Add renderables to this component's render tree
 *
 * @method add
 *
 * @param {Object} obj renderable object
 * @return {RenderNode} Render wrapping provided object, if not already a RenderNode
 */
Scene.prototype.add = function add() {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
Scene.prototype.render = function render() {};

module.exports = Scene;
},{"./Modifier":9,"./RenderNode":11,"./Transform":15}],13:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = _dereq_('./Transform');

/**
 *
 * This object translates the rendering instructions ("render specs")
 *   that renderable components generate into document update
 *   instructions ("update specs").  Private.
 *
 * @private
 * @class SpecParser
 * @constructor
 */
function SpecParser() {}
SpecParser._instance = new SpecParser();

/**
 * Convert a render spec coming from the context's render chain to an
 *    update spec for the update chain. This is the only major entry point
 *    for a consumer of this class.
 *
 * @method parse
 * @static
 * @private
 *
 * @param {renderSpec} spec input render spec
 * @param {Object} context context to do the parse in
 * @return {Object} the resulting update spec (if no callback
 *   specified, else none)
 */
SpecParser.parse = function parse(spec, context) {};

/**
 * Convert a renderSpec coming from the context's render chain to an update
 *    spec for the update chain. This is the only major entrypoint for a
 *    consumer of this class.
 *
 * @method parse
 *
 * @private
 * @param {renderSpec} spec input render spec
 * @param {Context} context
 * @return {updateSpec} the resulting update spec
 */
SpecParser.prototype.parse = function parse(spec, context) {};

/**
 * Prepare SpecParser for re-use (or first use) by setting internal state
 *  to blank.
 *
 * @private
 * @method reset
 */
SpecParser.prototype.reset = function reset() {};

// Multiply matrix M by vector v
function _vecInContext(v, m) {}

var _zeroZero = [0, 0];

// From the provided renderSpec tree, recursively compose opacities,
//    origins, transforms, and sizes corresponding to each surface id from
//    the provided renderSpec tree structure. On completion, those
//    properties of 'this' object should be ready to use to build an
//    updateSpec.
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {};

module.exports = SpecParser;
},{"./Transform":15}],14:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var ElementOutput = _dereq_('./ElementOutput');

/**
 * A base class for viewable content and event
 *   targets inside a Famo.us application, containing a renderable document
 *   fragment. Like an HTML div, it can accept internal markup,
 *   properties, classes, and handle events.
 *
 * @class Surface
 * @constructor
 *
 * @param {Object} [options] default option overrides
 * @param {Array.Number} [options.size] [width, height] in pixels
 * @param {Array.string} [options.classes] CSS classes to set on target div
 * @param {Array} [options.properties] string dictionary of CSS properties to set on target div
 * @param {Array} [options.attributes] string dictionary of HTML attributes to set on target div
 * @param {string} [options.content] inner (HTML) content of surface
 */
function Surface(options) {}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';

/**
 * Set HTML attributes on this Surface. Note that this will cause
 *    dirtying and thus re-rendering, even if values do not change.
 *
 * @method setAttributes
* @param {Object} attributes property dictionary of "key" => "value"
 */
Surface.prototype.setAttributes = function setAttributes(attributes) {};

/**
 * Get HTML attributes on this Surface.
 *
 * @method getAttributes
 *
 * @return {Object} Dictionary of this Surface's attributes.
 */
Surface.prototype.getAttributes = function getAttributes() {};

/**
 * Set CSS-style properties on this Surface. Note that this will cause
 *    dirtying and thus re-rendering, even if values do not change.
 *
 * @method setProperties
 * @chainable
 * @param {Object} properties property dictionary of "key" => "value"
 */
Surface.prototype.setProperties = function setProperties(properties) {};

/**
 * Get CSS-style properties on this Surface.
 *
 * @method getProperties
 *
 * @return {Object} Dictionary of this Surface's properties.
 */
Surface.prototype.getProperties = function getProperties() {};

/**
 * Add CSS-style class to the list of classes on this Surface. Note
 *   this will map directly to the HTML property of the actual
 *   corresponding rendered <div>.
 *
 * @method addClass
 * @chainable
 * @param {string} className name of class to add
 */
Surface.prototype.addClass = function addClass(className) {};

/**
 * Remove CSS-style class from the list of classes on this Surface.
 *   Note this will map directly to the HTML property of the actual
 *   corresponding rendered <div>.
 *
 * @method removeClass
 * @chainable
 * @param {string} className name of class to remove
 */
Surface.prototype.removeClass = function removeClass(className) {};

/**
 * Toggle CSS-style class from the list of classes on this Surface.
 *   Note this will map directly to the HTML property of the actual
 *   corresponding rendered <div>.
 *
 * @method toggleClass
 * @param {string} className name of class to toggle
 */
Surface.prototype.toggleClass = function toggleClass(className) {};

/**
 * Reset class list to provided dictionary.
 * @method setClasses
 * @chainable
 * @param {Array.string} classList
 */
Surface.prototype.setClasses = function setClasses(classList) {};

/**
 * Get array of CSS-style classes attached to this div.
 *
 * @method getClasslist
 * @return {Array.string} array of class names
 */
Surface.prototype.getClassList = function getClassList() {};

/**
 * Set or overwrite inner (HTML) content of this surface. Note that this
 *    causes a re-rendering if the content has changed.
 *
 * @method setContent
 * @chainable
 * @param {string|Document Fragment} content HTML content
 */
Surface.prototype.setContent = function setContent(content) {};

/**
 * Return inner (HTML) content of this surface.
 *
 * @method getContent
 *
 * @return {string} inner (HTML) content
 */
Surface.prototype.getContent = function getContent() {};

/**
 * Set options for this surface
 *
 * @method setOptions
 * @chainable
 * @param {Object} [options] overrides for default options.  See constructor.
 */
Surface.prototype.setOptions = function setOptions(options) {};

//  Apply to document all changes from removeClass() since last setup().
function _cleanupClasses(target) {}

// Apply values of all Famous-managed styles to the document element.
//  These will be deployed to the document on call to #setup().
function _applyStyles(target) {}

// Clear all Famous-managed styles from the document element.
// These will be deployed to the document on call to #setup().
function _cleanupStyles(target) {}

// Apply values of all Famous-managed attributes to the document element.
//  These will be deployed to the document on call to #setup().
function _applyAttributes(target) {}

// Clear all Famous-managed attributes from the document element.
// These will be deployed to the document on call to #setup().
function _cleanupAttributes(target) {}

function _xyNotEquals(a, b) {}

/**
 * One-time setup for an element to be ready for commits to document.
 *
 * @private
 * @method setup
 *
 * @param {ElementAllocator} allocator document element pool for this context
 */
Surface.prototype.setup = function setup(allocator) {};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
Surface.prototype.commit = function commit(context) {};

/**
 *  Remove all Famous-relevant attributes from a document element.
 *    This is called by SurfaceManager's detach().
 *    This is in some sense the reverse of .deploy().
 *
 * @private
 * @method cleanup
 * @param {ElementAllocator} allocator
 */
Surface.prototype.cleanup = function cleanup(allocator) {};

/**
 * Place the document element that this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
Surface.prototype.deploy = function deploy(target) {};

/**
 * Remove any contained document content associated with this surface
 *   from the actual document.
 *
 * @private
 * @method recall
 */
Surface.prototype.recall = function recall(target) {};

/**
 *  Get the x and y dimensions of the surface.
 *
 * @method getSize
 * @return {Array.Number} [x,y] size of surface
 */
Surface.prototype.getSize = function getSize() {};

/**
 * Set x and y dimensions of the surface.
 *
 * @method setSize
 * @chainable
 * @param {Array.Number} size as [width, height]
 */
Surface.prototype.setSize = function setSize(size) {};

module.exports = Surface;
},{"./ElementOutput":3}],15:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 *  A high-performance static matrix math library used to calculate
 *    affine transforms on surfaces and other renderables.
 *    Famo.us uses 4x4 matrices corresponding directly to
 *    WebKit matrices (column-major order).
 *
 *    The internal "type" of a Matrix is a 16-long float array in
 *    row-major order, with:
 *    elements [0],[1],[2],[4],[5],[6],[8],[9],[10] forming the 3x3
 *          transformation matrix;
 *    elements [12], [13], [14] corresponding to the t_x, t_y, t_z
 *           translation;
 *    elements [3], [7], [11] set to 0;
 *    element [15] set to 1.
 *    All methods are static.
 *
 * @static
 *
 * @class Transform
 */
var Transform = {};

// WARNING: these matrices correspond to WebKit matrices, which are
//    transposed from their math counterparts
Transform.precision = 1e-6;
Transform.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

/**
 * Multiply two or more Transform matrix types to return a Transform matrix.
 *
 * @method multiply4x4
 * @static
 * @param {Transform} a left Transform
 * @param {Transform} b right Transform
 * @return {Transform}
 */
Transform.multiply4x4 = function multiply4x4(a, b) {};

/**
 * Fast-multiply two or more Transform matrix types to return a
 *    Matrix, assuming bottom row on each is [0 0 0 1].
 *
 * @method multiply
 * @static
 * @param {Transform} a left Transform
 * @param {Transform} b right Transform
 * @return {Transform}
 */
Transform.multiply = function multiply(a, b) {};

/**
 * Return a Transform translated by additional amounts in each
 *    dimension. This is equivalent to the result of
 *
 *    Transform.multiply(Matrix.translate(t[0], t[1], t[2]), m).
 *
 * @method thenMove
 * @static
 * @param {Transform} m a Transform
 * @param {Array.Number} t floats delta vector of length 2 or 3
 * @return {Transform}
 */
Transform.thenMove = function thenMove(m, t) {};

/**
 * Return a Transform matrix which represents the result of a transform matrix
 *    applied after a move. This is faster than the equivalent multiply.
 *    This is equivalent to the result of:
 *
 *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
 *
 * @method moveThen
 * @static
 * @param {Array.Number} v vector representing initial movement
 * @param {Transform} m matrix to apply afterwards
 * @return {Transform} the resulting matrix
 */
Transform.moveThen = function moveThen(v, m) {};

/**
 * Return a Transform which represents a translation by specified
 *    amounts in each dimension.
 *
 * @method translate
 * @static
 * @param {Number} x x translation
 * @param {Number} y y translation
 * @param {Number} z z translation
 * @return {Transform}
 */
Transform.translate = function translate(x, y, z) {};

/**
 * Return a Transform scaled by a vector in each
 *    dimension. This is a more performant equivalent to the result of
 *
 *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
 *
 * @method thenScale
 * @static
 * @param {Transform} m a matrix
 * @param {Array.Number} s delta vector (array of floats &&
 *    array.length == 3)
 * @return {Transform}
 */
Transform.thenScale = function thenScale(m, s) {};

/**
 * Return a Transform which represents a scale by specified amounts
 *    in each dimension.
 *
 * @method scale
 * @static
 * @param {Number} x x scale factor
 * @param {Number} y y scale factor
 * @param {Number} z z scale factor
 * @return {Transform}
 */
Transform.scale = function scale(x, y, z) {};

/**
 * Return a Transform which represents a clockwise
 *    rotation around the x axis.
 *
 * @method rotateX
 * @static
 * @param {Number} theta radians
 * @return {Transform}
 */
Transform.rotateX = function rotateX(theta) {};

/**
 * Return a Transform which represents a clockwise
 *    rotation around the y axis.
 *
 * @method rotateY
 * @static
 * @param {Number} theta radians
 * @return {Transform}
 */
Transform.rotateY = function rotateY(theta) {};

/**
 * Return a Transform which represents a clockwise
 *    rotation around the z axis.
 *
 * @method rotateZ
 * @static
 * @param {Number} theta radians
 * @return {Transform}
 */
Transform.rotateZ = function rotateZ(theta) {};

/**
 * Return a Transform which represents composed clockwise
 *    rotations along each of the axes. Equivalent to the result of
 *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
 *
 * @method rotate
 * @static
 * @param {Number} phi radians to rotate about the positive x axis
 * @param {Number} theta radians to rotate about the positive y axis
 * @param {Number} psi radians to rotate about the positive z axis
 * @return {Transform}
 */
Transform.rotate = function rotate(phi, theta, psi) {};

/**
 * Return a Transform which represents an axis-angle rotation
 *
 * @method rotateAxis
 * @static
 * @param {Array.Number} v unit vector representing the axis to rotate about
 * @param {Number} theta radians to rotate clockwise about the axis
 * @return {Transform}
 */
Transform.rotateAxis = function rotateAxis(v, theta) {};

/**
 * Return a Transform which represents a transform matrix applied about
 * a separate origin point.
 *
 * @method aboutOrigin
 * @static
 * @param {Array.Number} v origin point to apply matrix
 * @param {Transform} m matrix to apply
 * @return {Transform}
 */
Transform.aboutOrigin = function aboutOrigin(v, m) {};

/**
 * Return a Transform representation of a skew transformation
 *
 * @method skew
 * @static
 * @param {Number} phi scale factor skew in the x axis
 * @param {Number} theta scale factor skew in the y axis
 * @param {Number} psi scale factor skew in the z axis
 * @return {Transform}
 */
Transform.skew = function skew(phi, theta, psi) {};

/**
 * Return a Transform representation of a skew in the x-direction
 *
 * @method skewX
 * @static
 * @param {Number} angle the angle between the top and left sides
 * @return {Transform}
 */
Transform.skewX = function skewX(angle) {};

/**
 * Return a Transform representation of a skew in the y-direction
 *
 * @method skewY
 * @static
 * @param {Number} angle the angle between the top and right sides
 * @return {Transform}
 */
Transform.skewY = function skewY(angle) {};

/**
 * Returns a perspective Transform matrix
 *
 * @method perspective
 * @static
 * @param {Number} focusZ z position of focal point
 * @return {Transform}
 */
Transform.perspective = function perspective(focusZ) {};

/**
 * Return translation vector component of given Transform
 *
 * @method getTranslate
 * @static
 * @param {Transform} m Transform
 * @return {Array.Number} the translation vector [t_x, t_y, t_z]
 */
Transform.getTranslate = function getTranslate(m) {};

/**
 * Return inverse affine transform for given Transform.
 *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
 *   Will provide incorrect results if not invertible or preconditions not met.
 *
 * @method inverse
 * @static
 * @param {Transform} m Transform
 * @return {Transform}
 */
Transform.inverse = function inverse(m) {};

/**
 * Returns the transpose of a 4x4 matrix
 *
 * @method transpose
 * @static
 * @param {Transform} m matrix
 * @return {Transform} the resulting transposed matrix
 */
Transform.transpose = function transpose(m) {};

function _normSquared(v) {}
function _norm(v) {}
function _sign(n) {}

/**
 * Decompose Transform into separate .translate, .rotate, .scale,
 *    and .skew components.
 *
 * @method interpret
 * @static
 * @param {Transform} M transform matrix
 * @return {Object} matrix spec object with component matrices .translate,
 *    .rotate, .scale, .skew
 */
Transform.interpret = function interpret(M) {};

/**
 * Weighted average between two matrices by averaging their
 *     translation, rotation, scale, skew components.
 *     f(M1,M2,t) = (1 - t) * M1 + t * M2
 *
 * @method average
 * @static
 * @param {Transform} M1 f(M1,M2,0) = M1
 * @param {Transform} M2 f(M1,M2,1) = M2
 * @param {Number} t
 * @return {Transform}
 */
Transform.average = function average(M1, M2, t) {};

/**
 * Compose .translate, .rotate, .scale, .skew components into
 * Transform matrix
 *
 * @method build
 * @static
 * @param {matrixSpec} spec object with component matrices .translate,
 *    .rotate, .scale, .skew
 * @return {Transform} composed transform
 */
Transform.build = function build(spec) {};

/**
 * Determine if two Transforms are component-wise equal
 *   Warning: breaks on perspective Transforms
 *
 * @method equals
 * @static
 * @param {Transform} a matrix
 * @param {Transform} b matrix
 * @return {boolean}
 */
Transform.equals = function equals(a, b) {};

/**
 * Determine if two Transforms are component-wise unequal
 *   Warning: breaks on perspective Transforms
 *
 * @method notEquals
 * @static
 * @param {Transform} a matrix
 * @param {Transform} b matrix
 * @return {boolean}
 */
Transform.notEquals = function notEquals(a, b) {};

/**
 * Constrain angle-trio components to range of [-pi, pi).
 *
 * @method normalizeRotation
 * @static
 * @param {Array.Number} rotation phi, theta, psi (array of floats
 *    && array.length == 3)
 * @return {Array.Number} new phi, theta, psi triplet
 *    (array of floats && array.length == 3)
 */
Transform.normalizeRotation = function normalizeRotation(rotation) {};

/**
 * (Property) Array defining a translation forward in z by 1
 *
 * @property {array} inFront
 * @static
 * @final
 */
Transform.inFront = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1e-3, 1];

/**
 * (Property) Array defining a translation backwards in z by 1
 *
 * @property {array} behind
 * @static
 * @final
 */
Transform.behind = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1e-3, 1];

module.exports = Transform;
},{}],16:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = _dereq_('./EventHandler');
var OptionsManager = _dereq_('./OptionsManager');
var RenderNode = _dereq_('./RenderNode');
var Utility = _dereq_('../utilities/Utility');

/**
 * Useful for quickly creating elements within applications
 *   with large event systems.  Consists of a RenderNode paired with
 *   an input EventHandler and an output EventHandler.
 *   Meant to be extended by the developer.
 *
 * @class View
 * @uses EventHandler
 * @uses OptionsManager
 * @uses RenderNode
 * @constructor
 */
function View(options) {}

View.DEFAULT_OPTIONS = {}; // no defaults

/**
 * Look up options value by key
 * @method getOptions
 *
 * @param {string} key key
 * @return {Object} associated object
 */
View.prototype.getOptions = function getOptions(key) {};

/*
 *  Set internal options.
 *  No defaults options are set in View.
 *
 *  @method setOptions
 *  @param {Object} options
 */
View.prototype.setOptions = function setOptions(options) {};

/**
 * Add a child renderable to the view.
 *   Note: This is meant to be used by an inheriting class
 *   rather than from outside the prototype chain.
 *
 * @method add
 * @return {RenderNode}
 * @protected
 */
View.prototype.add = function add() {};

/**
 * Alias for add
 * @method _add
 */
View.prototype._add = View.prototype.add;

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
View.prototype.render = function render() {};

/**
 * Return size of contained element.
 *
 * @method getSize
 * @return {Array.Number} [width, height]
 */
View.prototype.getSize = function getSize() {};

module.exports = View;
},{"../utilities/Utility":95,"./EventHandler":7,"./OptionsManager":10,"./RenderNode":11}],17:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Helper object used to iterate through items sequentially. Used in
 *   views that deal with layout.  A ViewSequence object conceptually points
 *   to a node in a linked list.
 *
 * @class ViewSequence
 *
 * @constructor
 * @param {Object|Array} options Options object, or content array.
 * @param {Number} [options.index] starting index.
 * @param {Number} [options.array] Array of elements to populate the ViewSequence
 * @param {Object} [options._] Optional backing store (internal
 * @param {Boolean} [options.loop] Whether to wrap when accessing elements just past the end
 *   (or beginning) of the sequence.
 */
function ViewSequence(options) {}

// constructor for internal storage
ViewSequence.Backing = function Backing(array) {};

// Get value "i" slots away from the first index.
ViewSequence.Backing.prototype.getValue = function getValue(i) {};

// Set value "i" slots away from the first index.
ViewSequence.Backing.prototype.setValue = function setValue(i, value) {};

// Get sequence size from backing up to index
// TODO: remove from viewSequence with proper abstraction
ViewSequence.Backing.prototype.getSize = function getSize(index) {};

// Calculates cumulative size
// TODO: remove from viewSequence with proper abstraction
ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {};

// After splicing into the backing store, restore the indexes of each node correctly.
ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {};

/**
 * Return ViewSequence node previous to this node in the list, respecting looping if applied.
 *
 * @method getPrevious
 * @return {ViewSequence} previous node.
 */
ViewSequence.prototype.getPrevious = function getPrevious() {};

/**
 * Return ViewSequence node next after this node in the list, respecting looping if applied.
 *
 * @method getNext
 * @return {ViewSequence} previous node.
 */
ViewSequence.prototype.getNext = function getNext() {};

/**
 * Return index of the provided item in the backing array
 *
 * @method indexOf
 * @return {Number} index or -1 if not found
 */
ViewSequence.prototype.indexOf = function indexOf(item) {};

/**
 * Return index of this ViewSequence node.
 *
 * @method getIndex
 * @return {Number} index
 */
ViewSequence.prototype.getIndex = function getIndex() {};

/**
 * Return printable version of this ViewSequence node.
 *
 * @method toString
 * @return {string} this index as a string
 */
ViewSequence.prototype.toString = function toString() {};

/**
 * Add one or more objects to the beginning of the sequence.
 *
 * @method unshift
 * @param {...Object} value arguments array of objects
 */
ViewSequence.prototype.unshift = function unshift(value) {};

/**
 * Add one or more objects to the end of the sequence.
 *
 * @method push
 * @param {...Object} value arguments array of objects
 */
ViewSequence.prototype.push = function push(value) {};

/**
 * Remove objects from the sequence
 *
 * @method splice
 * @param {Number} index starting index for removal
 * @param {Number} howMany how many elements to remove
 * @param {...Object} value arguments array of objects
 */
ViewSequence.prototype.splice = function splice(index, howMany) {};

/**
 * Exchange this element's sequence position with another's.
 *
 * @method swap
 * @param {ViewSequence} other element to swap with.
 */
ViewSequence.prototype.swap = function swap(other) {};

   /**
 * Return value of this ViewSequence node.
 *
 * @method get
 * @return {Object} value of thiss
 */
ViewSequence.prototype.get = function get() {};

   /**
 * Call getSize() on the contained View.
 *
 * @method getSize
 * @return {Array.Number} [width, height]
 */
ViewSequence.prototype.getSize = function getSize() {};

/**
 * Generate a render spec from the contents of this component.
 * Specifically, this will render the value at the current index.
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
ViewSequence.prototype.render = function render() {};

module.exports = ViewSequence;
},{}],18:[function(_dereq_,module,exports){
module.exports = {
  Context: _dereq_('./Context'),
  ElementAllocator: _dereq_('./ElementAllocator'),
  ElementOutput: _dereq_('./ElementOutput'),
  Engine: _dereq_('./Engine'),
  Entity: _dereq_('./Entity'),
  EventEmitter: _dereq_('./EventEmitter'),
  EventHandler: _dereq_('./EventHandler'),
  Group: _dereq_('./Group'),
  Modifier: _dereq_('./Modifier'),
  OptionsManager: _dereq_('./OptionsManager'),
  RenderNode: _dereq_('./RenderNode'),
  Scene: _dereq_('./Scene'),
  SpecParser: _dereq_('./SpecParser'),
  Surface: _dereq_('./Surface'),
  Transform: _dereq_('./Transform'),
  View: _dereq_('./View'),
  ViewSequence: _dereq_('./ViewSequence')
};

},{"./Context":1,"./ElementAllocator":2,"./ElementOutput":3,"./Engine":4,"./Entity":5,"./EventEmitter":6,"./EventHandler":7,"./Group":8,"./Modifier":9,"./OptionsManager":10,"./RenderNode":11,"./Scene":12,"./SpecParser":13,"./Surface":14,"./Transform":15,"./View":16,"./ViewSequence":17}],19:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = _dereq_('../core/EventHandler');

/**
 * A switch which wraps several event destinations and
 *  redirects received events to at most one of them.
 *  Setting the 'mode' of the object dictates which one
 *  of these destinations will receive events.
 *
 * @class EventArbiter
 * @constructor
 *
 * @param {Number | string} startMode initial setting of switch,
 */
function EventArbiter(startMode) {}

/**
 * Set switch to this mode, passing events to the corresponding
 *   EventHandler.  If mode has changed, emits 'change' event,
 *   emits 'unpipe' event to the old mode's handler, and emits 'pipe'
 *   event to the new mode's handler.
 *
 * @method setMode
 *
 * @param {string | number} mode indicating which event handler to send to.
 */
EventArbiter.prototype.setMode = function setMode(mode) {};

/**
 * Return the existing EventHandler corresponding to this
 *   mode, creating one if it doesn't exist.
 *
 * @method forMode
 *
 * @param {string | number} mode mode to which this eventHandler corresponds
 *
 * @return {EventHandler} eventHandler corresponding to this mode
 */
EventArbiter.prototype.forMode = function forMode(mode) {};

/**
 * Trigger an event, sending to currently selected handler, if
 *   it is listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} eventType event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
EventArbiter.prototype.emit = function emit(eventType, event) {};

module.exports = EventArbiter;
},{"../core/EventHandler":7}],20:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = _dereq_('../core/EventHandler');

/**
 * EventFilter regulates the broadcasting of events based on
 *  a specified condition function of standard event type: function(type, data).
 *
 * @class EventFilter
 * @constructor
 *
 * @param {function} condition function to determine whether or not
 *    events are emitted.
 */
function EventFilter(condition) {}
EventFilter.prototype = Object.create(EventHandler.prototype);
EventFilter.prototype.constructor = EventFilter;

/**
 * If filter condition is met, trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} data event data
 * @return {EventHandler} this
 */
EventFilter.prototype.emit = function emit(type, data) {};

/**
 * An alias of emit. Trigger determines whether to send
 *  events based on the return value of it's condition function
 *  when passed the event type and associated data.
 *
 * @method trigger
 * @param {string} type name of the event
 * @param {object} data associated data
 */
EventFilter.prototype.trigger = EventFilter.prototype.emit;

module.exports = EventFilter;
},{"../core/EventHandler":7}],21:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = _dereq_('../core/EventHandler');

/**
 * EventMapper routes events to various event destinations
 *  based on custom logic.  The function signature is arbitrary.
 *
 * @class EventMapper
 * @constructor
 *
 * @param {function} mappingFunction function to determine where
 *  events are routed to.
 */
function EventMapper(mappingFunction) {}
EventMapper.prototype = Object.create(EventHandler.prototype);
EventMapper.prototype.constructor = EventMapper;

EventMapper.prototype.subscribe = null;
EventMapper.prototype.unsubscribe = null;

/**
 * Trigger an event, sending to all mapped downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} data event data
 * @return {EventHandler} this
 */
EventMapper.prototype.emit = function emit(type, data) {};

/**
 * Alias of emit.
 * @method trigger
 */
EventMapper.prototype.trigger = EventMapper.prototype.emit;

module.exports = EventMapper;
},{"../core/EventHandler":7}],22:[function(_dereq_,module,exports){
module.exports = {
  EventArbiter: _dereq_('./EventArbiter'),
  EventFilter: _dereq_('./EventFilter'),
  EventMapper: _dereq_('./EventMapper')
};

},{"./EventArbiter":19,"./EventFilter":20,"./EventMapper":21}],23:[function(_dereq_,module,exports){
module.exports = {
  core: _dereq_('./core'),
  inputs: _dereq_('./inputs'),
  events: _dereq_('./events'),
  modifiers: _dereq_('./modifiers'),
  physics: _dereq_('./physics'),
  math: _dereq_('./math'),
  transitions: _dereq_('./transitions'),
  utilities: _dereq_('./utilities'),
  surfaces: _dereq_('./surfaces'),
  views: _dereq_('./views'),
  widgets: _dereq_('./widgets')
};

},{"./core":18,"./events":22,"./inputs":36,"./math":42,"./modifiers":47,"./physics":71,"./surfaces":82,"./transitions":92,"./utilities":96,"./views":111,"./widgets":116}],24:[function(_dereq_,module,exports){
var EventHandler = _dereq_('../core/EventHandler');
var Transitionable = _dereq_('../transitions/Transitionable');

/**
 * Accumulates differentials of event sources that emit a `delta`
 *  attribute taking a Number or Array of Number types. The accumulated
 *  value is stored in a getter/setter.
 *
 * @class Accumulator
 * @constructor
 * @param value {Number|Array|Transitionable}   Initializing value
 * @param [eventName='update'] {String}         Name of update event
 */
function Accumulator(value, eventName) {}

function _handleUpdate(data) {}

/**
 * Basic getter
 *
 * @method get
 * @return {Number|Array} current value
 */
Accumulator.prototype.get = function get() {
    return this._state.get();
};

/**
 * Basic setter
 *
 * @method set
 * @param value {Number|Array} new value
 */
Accumulator.prototype.set = function set(value) {
    this._state.set(value);
};

module.exports = Accumulator;
},{"../core/EventHandler":7,"../transitions/Transitionable":88}],25:[function(_dereq_,module,exports){
var hasTouch = 'ontouchstart' in window;

function kill(type) {}

if (hasTouch) {
    kill('mousedown');
    kill('mousemove');
    kill('mouseup');
    kill('mouseleave');
}
},{}],26:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * FastClick is an override shim which maps event pairs of
 *   'touchstart' and 'touchend' which differ by less than a certain
 *   threshold to the 'click' event.
 *   This is used to speed up clicks on some browsers.
 */
(function() {
  if (!window.CustomEvent) return;
  var clickThreshold = 300;
  var clickWindow = 500;
  var potentialClicks = {};
  var recentlyDispatched = {};
  var _now = Date.now;

  window.addEventListener('touchstart', function(event) {
      var timestamp = _now();
      for (var i = 0; i < event.changedTouches.length; i++) {
          var touch = event.changedTouches[i];
          potentialClicks[touch.identifier] = timestamp;
      }
  });

  window.addEventListener('touchmove', function(event) {
      for (var i = 0; i < event.changedTouches.length; i++) {
          var touch = event.changedTouches[i];
          delete potentialClicks[touch.identifier];
      }
  });

  window.addEventListener('touchend', function(event) {
      var currTime = _now();
      for (var i = 0; i < event.changedTouches.length; i++) {
          var touch = event.changedTouches[i];
          var startTime = potentialClicks[touch.identifier];
          if (startTime && currTime - startTime < clickThreshold) {
              var clickEvt = new window.CustomEvent('click', {
                  'bubbles': true,
                  'detail': touch
              });
              recentlyDispatched[currTime] = event;
              event.target.dispatchEvent(clickEvt);
          }
          delete potentialClicks[touch.identifier];
      }
  });

  window.addEventListener('click', function(event) {
      var currTime = _now();
      for (var i in recentlyDispatched) {
          var previousEvent = recentlyDispatched[i];
          if (currTime - i < clickWindow) {
              if (event instanceof window.MouseEvent && event.target === previousEvent.target) event.stopPropagation();
          }
          else delete recentlyDispatched[i];
      }
  }, true);
})();
},{}],27:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = _dereq_('../core/EventHandler');

/**
 * Combines multiple types of sync classes (e.g. mouse, touch,
 *  scrolling) into one standardized interface for inclusion in widgets.
 *
 *  Sync classes are first registered with a key, and then can be accessed
 *  globally by key.
 *
 *  Emits 'start', 'update' and 'end' events as a union of the sync class
 *  providers.
 *
 * @class GenericSync
 * @constructor
 * @param syncs {Object|Array} object with fields {sync key : sync options}
 *    or an array of registered sync keys
 * @param [options] {Object|Array} options object to set on all syncs
 */
function GenericSync(syncs, options) {}

GenericSync.DIRECTION_X = 0;
GenericSync.DIRECTION_Y = 1;
GenericSync.DIRECTION_Z = 2;

// Global registry of sync classes. Append only.
var registry = {};

/**
 * Register a global sync class with an identifying key
 *
 * @static
 * @method register
 *
 * @param syncObject {Object} an object of {sync key : sync options} fields
 */
GenericSync.register = function register(syncObject) {};

/**
 * Helper to set options on all sync instances
 *
 * @method setOptions
 * @param options {Object} options object
 */
GenericSync.prototype.setOptions = function(options) {};

/**
 * Pipe events to a sync class
 *
 * @method pipeSync
 * @param key {String} identifier for sync class
 */
GenericSync.prototype.pipeSync = function pipeToSync(key) {};

/**
 * Unpipe events from a sync class
 *
 * @method unpipeSync
 * @param key {String} identifier for sync class
 */
GenericSync.prototype.unpipeSync = function unpipeFromSync(key) {};

function _addSingleSync(key, options) {}

/**
 * Add a sync class to from the registered classes
 *
 * @method addSync
 * @param syncs {Object|Array.String} an array of registered sync keys
 *    or an object with fields {sync key : sync options}
 */
GenericSync.prototype.addSync = function addSync(syncs) {};

module.exports = GenericSync;
},{"../core/EventHandler":7}],28:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = _dereq_('../core/EventHandler');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Handles piped in mouse drag events. Outputs an object with the position delta from last frame, position from start,
 * current velocity averaged out over the velocitySampleLength (set via options), clientX, clientY, offsetX, and offsetY.
 *
 * Emits 'start', 'update' and 'end' events. Designed to be used either as a standalone MouseSync, or as part of a
 * GenericSync.
 *
 * @class MouseSync
 * @constructor
 *
 * @example
 *   var Surface = require('../core/Surface');
 *   var MouseSync = require('../inputs/MouseSync');
 *
 *   var surface = new Surface({ size: [100, 100] });
 *   var mouseSync = new MouseSync();
 *   surface.pipe(mouseSync);
 *
 *   mouseSync.on('start', function (e) { // react to start });
 *   mouseSync.on('update', function (e) { // react to update });
 *   mouseSync.on('end', function (e) { // react to end });
 *
 * @param [options] {Object}                An object of the following configurable options.
 * @param [options.clickThreshold] {Number} Absolute distance from click origin that will still trigger a click.
 * @param [options.direction] {Number}      Read from a particular axis. Valid options are: undefined, 0 or 1. 0 corresponds to x, and 1 to y. Default is undefined, which allows both x and y.
 * @param [options.rails] {Boolean}         Read from axis with the greatest differential.
 * @param [options.velocitySampleLength] {Number}  Number of previous frames to check velocity against.
 * @param [options.propogate] {Boolean}     Add a listener to document on mouseleave. This allows drag events to continue across the entire page.
 */
function MouseSync(options) {}

MouseSync.DEFAULT_OPTIONS = {};

MouseSync.DIRECTION_X = 0;
MouseSync.DIRECTION_Y = 1;

var MINIMUM_TICK_TIME = 8;

/**
 *  Triggered by mousedown.
 *
 *  @method _handleStart
 *  @private
 */
function _handleStart(event) {}

/**
 *  Triggered by mousemove.
 *
 *  @method _handleMove
 *  @private
 */
function _handleMove(event) {}

/**
 *  Triggered by mouseup on the element or document body if propagation is enabled, or
 *  mouseleave if propagation is off.
 *
 *  @method _handleEnd
 *  @private
 */
function _handleEnd(event) {}

/**
 *  Switches the mousemove listener to the document body, if propagation is enabled.
 *  @method _handleLeave
 *  @private
 */
function _handleLeave(event) {}

/**
 * Return entire options dictionary, including defaults.
 *
 * @method getOptions
 * @return {Object} configuration options
 */
MouseSync.prototype.getOptions = function getOptions() {};

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param [options] {Object}             default options overrides
 * @param [options.direction] {Number}   read from a particular axis
 * @param [options.rails] {Boolean}      read from axis with greatest differential
 * @param [options.propogate] {Boolean}  add listened to document on mouseleave
 */
MouseSync.prototype.setOptions = function setOptions(options) {};

module.exports = MouseSync;
},{"../core/EventHandler":7,"../core/OptionsManager":10}],29:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var TwoFingerSync = _dereq_('./TwoFingerSync');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Handles piped in two-finger touch events to change position via pinching / expanding.
 *   Emits 'start', 'update' and 'end' events with
 *   position, velocity, touch ids, and distance between fingers.
 *
 * @class PinchSync
 * @extends TwoFingerSync
 * @constructor
 * @param {Object} options default options overrides
 * @param {Number} [options.scale] scale velocity by this factor
 */
function PinchSync(options) {}

PinchSync.prototype = Object.create(TwoFingerSync.prototype);
PinchSync.prototype.constructor = PinchSync;

PinchSync.DEFAULT_OPTIONS = {};

PinchSync.prototype._startUpdate = function _startUpdate(event) {};

PinchSync.prototype._moveUpdate = function _moveUpdate(diffTime) {};

/**
 * Return entire options dictionary, including defaults.
 *
 * @method getOptions
 * @return {Object} configuration options
 */
PinchSync.prototype.getOptions = function getOptions() {
    return this.options;
};

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.scale] scale velocity by this factor
 */
PinchSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};

module.exports = PinchSync;
},{"../core/OptionsManager":10,"./TwoFingerSync":35}],30:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var TwoFingerSync = _dereq_('./TwoFingerSync');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Handles piped in two-finger touch events to increase or decrease scale via pinching / expanding.
 *   Emits 'start', 'update' and 'end' events an object with position, velocity, touch ids, and angle.
 *   Useful for determining a rotation factor from initial two-finger touch.
 *
 * @class RotateSync
 * @extends TwoFingerSync
 * @constructor
 * @param {Object} options default options overrides
 * @param {Number} [options.scale] scale velocity by this factor
 */
function RotateSync(options) {}

RotateSync.prototype = Object.create(TwoFingerSync.prototype);
RotateSync.prototype.constructor = RotateSync;

RotateSync.DEFAULT_OPTIONS = {
    scale : 1
};

RotateSync.prototype._startUpdate = function _startUpdate(event) {};

RotateSync.prototype._moveUpdate = function _moveUpdate(diffTime) {};

/**
 * Return entire options dictionary, including defaults.
 *
 * @method getOptions
 * @return {Object} configuration options
 */
RotateSync.prototype.getOptions = function getOptions() {
    return this.options;
};

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.scale] scale velocity by this factor
 */
RotateSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};

module.exports = RotateSync;
},{"../core/OptionsManager":10,"./TwoFingerSync":35}],31:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var TwoFingerSync = _dereq_('./TwoFingerSync');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Handles piped in two-finger touch events to increase or decrease scale via pinching / expanding.
 *   Emits 'start', 'update' and 'end' events an object with position, velocity, touch ids, distance, and scale factor.
 *   Useful for determining a scaling factor from initial two-finger touch.
 *
 * @class ScaleSync
 * @extends TwoFingerSync
 * @constructor
 * @param {Object} options default options overrides
 * @param {Number} [options.scale] scale velocity by this factor
 */
function ScaleSync(options) {}

ScaleSync.prototype = Object.create(TwoFingerSync.prototype);
ScaleSync.prototype.constructor = ScaleSync;

ScaleSync.DEFAULT_OPTIONS = {
    scale : 1
};

function _reset() {
    this.touchAId = undefined;
    this.touchBId = undefined;
}

// handles initial touch of two fingers
ScaleSync.prototype._startUpdate = function _startUpdate(event) {};

// handles movement of two fingers
ScaleSync.prototype._moveUpdate = function _moveUpdate(diffTime) {};

/**
 * Return entire options dictionary, including defaults.
 *
 * @method getOptions
 * @return {Object} configuration options
 */
ScaleSync.prototype.getOptions = function getOptions() {
    return this.options;
};

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.scale] scale velocity by this factor
 */
ScaleSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};

module.exports = ScaleSync;
},{"../core/OptionsManager":10,"./TwoFingerSync":35}],32:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = _dereq_('../core/EventHandler');
var Engine = _dereq_('../core/Engine');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Handles piped in mousewheel events.
 *   Emits 'start', 'update', and 'end' events with payloads including:
 *   delta: change since last position,
 *   position: accumulated deltas,
 *   velocity: speed of change in pixels per ms,
 *   slip: true (unused).
 *
 *   Can be used as delegate of GenericSync.
 *
 * @class ScrollSync
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.direction] Pay attention to x changes (ScrollSync.DIRECTION_X),
 *   y changes (ScrollSync.DIRECTION_Y) or both (undefined)
 * @param {Number} [options.minimumEndSpeed] End speed calculation floors at this number, in pixels per ms
 * @param {boolean} [options.rails] whether to snap position calculations to nearest axis
 * @param {Number | Array.Number} [options.scale] scale outputs in by scalar or pair of scalars
 * @param {Number} [options.stallTime] reset time for velocity calculation in ms
 */
function ScrollSync(options) {}

ScrollSync.DEFAULT_OPTIONS = {
    direction: undefined,
    minimumEndSpeed: Infinity,
    rails: false,
    scale: 1,
    stallTime: 50,
    lineHeight: 40,
    preventDefault: true
};

ScrollSync.DIRECTION_X = 0;
ScrollSync.DIRECTION_Y = 1;

var MINIMUM_TICK_TIME = 8;

var _now = Date.now;

function _newFrame() {}

function _handleMove(event) {}

/**
 * Return entire options dictionary, including defaults.
 *
 * @method getOptions
 * @return {Object} configuration options
 */
ScrollSync.prototype.getOptions = function getOptions() {
    return this.options;
};

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.minimimEndSpeed] If final velocity smaller than this, round down to 0.
 * @param {Number} [options.stallTime] ms of non-motion before 'end' emitted
 * @param {Number} [options.rails] whether to constrain to nearest axis.
 * @param {Number} [options.direction] ScrollSync.DIRECTION_X, DIRECTION_Y -
 *    pay attention to one specific direction.
 * @param {Number} [options.scale] constant factor to scale velocity output
 */
ScrollSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};

module.exports = ScrollSync;
},{"../core/Engine":4,"../core/EventHandler":7,"../core/OptionsManager":10}],33:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var TouchTracker = _dereq_('./TouchTracker');
var EventHandler = _dereq_('../core/EventHandler');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Handles piped in touch events. Emits 'start', 'update', and 'events'
 *   events with delta, position, velocity, acceleration, clientX, clientY, count, and touch id.
 *   Useful for dealing with inputs on touch devices. Designed to be used either as standalone, or
 *   included in a GenericSync.
 *
 * @class TouchSync
 * @constructor
 *
 * @example
 *   var Surface = require('../core/Surface');
 *   var TouchSync = require('../inputs/TouchSync');
 *
 *   var surface = new Surface({ size: [100, 100] });
 *   var touchSync = new TouchSync();
 *   surface.pipe(touchSync);
 *
 *   touchSync.on('start', function (e) { // react to start });
 *   touchSync.on('update', function (e) { // react to update });
 *   touchSync.on('end', function (e) { // react to end });*
 *
 * @param [options] {Object}             default options overrides
 * @param [options.direction] {Number}   read from a particular axis
 * @param [options.rails] {Boolean}      read from axis with greatest differential
 * @param [options.velocitySampleLength] {Number}  Number of previous frames to check velocity against.
 * @param [options.scale] {Number}       constant factor to scale velocity output
 * @param [options.touchLimit] {Number}  touchLimit upper bound for emitting events based on number of touches
 */
function TouchSync(options) {}

TouchSync.DEFAULT_OPTIONS = {
    direction: undefined,
    rails: false,
    touchLimit: 1,
    velocitySampleLength: 10,
    scale: 1
};

TouchSync.DIRECTION_X = 0;
TouchSync.DIRECTION_Y = 1;

var MINIMUM_TICK_TIME = 8;

/**
 *  Triggered by trackstart.
 *  @method _handleStart
 *  @private
 */
function _handleStart(data) {}

/**
 *  Triggered by trackmove.
 *  @method _handleMove
 *  @private
 */
function _handleMove(data) {}

/**
 *  Triggered by trackend.
 *  @method _handleEnd
 *  @private
 */
function _handleEnd(data) {}

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param [options] {Object}             default options overrides
 * @param [options.direction] {Number}   read from a particular axis
 * @param [options.rails] {Boolean}      read from axis with greatest differential
 * @param [options.scale] {Number}       constant factor to scale velocity output
 */
TouchSync.prototype.setOptions = function setOptions(options) {};

/**
 * Return entire options dictionary, including defaults.
 *
 * @method getOptions
 * @return {Object} configuration options
 */
TouchSync.prototype.getOptions = function getOptions() {
    return this.options;
};

module.exports = TouchSync;
},{"../core/EventHandler":7,"../core/OptionsManager":10,"./TouchTracker":34}],34:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = _dereq_('../core/EventHandler');

var _now = Date.now;

function _timestampTouch(touch, event, history) {}

function _handleStart(event) {}

function _handleMove(event) {}

function _handleEnd(event) {}

function _handleUnpipe() {}

/**
 * Helper to TouchSync – tracks piped in touch events, organizes touch
 *   events by ID, and emits track events back to TouchSync.
 *   Emits 'trackstart', 'trackmove', and 'trackend' events upstream.
 *
 * @class TouchTracker
 * @constructor
 * @param {Object} options default options overrides
 * @param [options.selective] {Boolean} selective if false, saves state for each touch
 * @param [options.touchLimit] {Number} touchLimit upper bound for emitting events based on number of touches
 */
function TouchTracker(options) {}

/**
 * Record touch data, if selective is false.
 * @private
 * @method track
 * @param {Object} data touch data
 */
TouchTracker.prototype.track = function track(data) {
    this.touchHistory[data.identifier] = [data];
};

module.exports = TouchTracker;
},{"../core/EventHandler":7}],35:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = _dereq_('../core/EventHandler');

/**
 * Helper to PinchSync, RotateSync, and ScaleSync.  Generalized handling of
 *   two-finger touch events.
 *   This class is meant to be overridden and not used directly.
 *
 * @class TwoFingerSync
 * @constructor
 */
function TwoFingerSync() {}

TwoFingerSync.calculateAngle = function(posA, posB) {
    var diffX = posB[0] - posA[0];
    var diffY = posB[1] - posA[1];
    return Math.atan2(diffY, diffX);
};

TwoFingerSync.calculateDistance = function(posA, posB) {
    var diffX = posB[0] - posA[0];
    var diffY = posB[1] - posA[1];
    return Math.sqrt(diffX * diffX + diffY * diffY);
};

TwoFingerSync.calculateCenter = function(posA, posB) {
    return [(posA[0] + posB[0]) / 2.0, (posA[1] + posB[1]) / 2.0];
};

var _now = Date.now;

// private
TwoFingerSync.prototype.handleStart = function handleStart(event) {};

// private
TwoFingerSync.prototype.handleMove = function handleMove(event) {};

// private
TwoFingerSync.prototype.handleEnd = function handleEnd(event) {};

module.exports = TwoFingerSync;
},{"../core/EventHandler":7}],36:[function(_dereq_,module,exports){
module.exports = {
  Accumulator: _dereq_('./Accumulator'),
  DesktopEmulationMode: _dereq_('./DesktopEmulationMode'),
  FastClick: _dereq_('./FastClick'),
  GenericSync: _dereq_('./GenericSync'),
  MouseSync: _dereq_('./MouseSync'),
  PinchSync: _dereq_('./PinchSync'),
  RotateSync: _dereq_('./RotateSync'),
  ScaleSync: _dereq_('./ScaleSync'),
  ScrollSync: _dereq_('./ScrollSync'),
  TouchSync: _dereq_('./TouchSync'),
  TouchTracker: _dereq_('./TouchTracker'),
  TwoFingerSync: _dereq_('./TwoFingerSync')
};

},{"./Accumulator":24,"./DesktopEmulationMode":25,"./FastClick":26,"./GenericSync":27,"./MouseSync":28,"./PinchSync":29,"./RotateSync":30,"./ScaleSync":31,"./ScrollSync":32,"./TouchSync":33,"./TouchTracker":34,"./TwoFingerSync":35}],37:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Vector = _dereq_('./Vector');

/**
 * A library for using a 3x3 numerical matrix, represented as a two-level array.
 *
 * @class Matrix
 * @constructor
 *
 * @param {Array.Array} values array of rows
 */
function Matrix(values) {
    this.values = values ||
        [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ];

    return this;
}

var _register = new Matrix();
var _vectorRegister = new Vector();

/**
 * Return the values in the matrix as an array of numerical row arrays
 *
 * @method get
 *
 * @return {Array.array} matrix values as array of rows.
 */
Matrix.prototype.get = function get() {
    return this.values;
};

/**
 * Set the nested array of rows in the matrix.
 *
 * @method set
 *
 * @param {Array.array} values matrix values as array of rows.
 */
Matrix.prototype.set = function set(values) {
    this.values = values;
};

/**
 * Take this matrix as A, input vector V as a column vector, and return matrix product (A)(V).
 *   Note: This sets the internal vector register.  Current handles to the vector register
 *   will see values changed.
 *
 * @method vectorMultiply
 *
 * @param {Vector} v input vector V
 * @return {Vector} result of multiplication, as a handle to the internal vector register
 */
Matrix.prototype.vectorMultiply = function vectorMultiply(v) {};

/**
 * Multiply the provided matrix M2 with this matrix.  Result is (this) * (M2).
 *   Note: This sets the internal matrix register.  Current handles to the register
 *   will see values changed.
 *
 * @method multiply
 *
 * @param {Matrix} M2 input matrix to multiply on the right
 * @return {Matrix} result of multiplication, as a handle to the internal register
 */
Matrix.prototype.multiply = function multiply(M2) {};

/**
 * Creates a Matrix which is the transpose of this matrix.
 *   Note: This sets the internal matrix register.  Current handles to the register
 *   will see values changed.
 *
 * @method transpose
 *
 * @return {Matrix} result of transpose, as a handle to the internal register
 */
Matrix.prototype.transpose = function transpose() {};

/**
 * Clones the matrix
 *
 * @method clone
 * @return {Matrix} New copy of the original matrix
 */
Matrix.prototype.clone = function clone() {};

module.exports = Matrix;
},{"./Vector":41}],38:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Matrix = _dereq_('./Matrix');

/**
 * @class Quaternion
 * @constructor
 *
 * @param {Number} w
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 */
function Quaternion(w,x,y,z) {}

var register = new Quaternion(1,0,0,0);

/**
 * Doc: TODO
 * @method add
 * @param {Quaternion} q
 * @return {Quaternion}
 */
Quaternion.prototype.add = function add(q) {};

/*
 * Docs: TODO
 *
 * @method sub
 * @param {Quaternion} q
 * @return {Quaternion}
 */
Quaternion.prototype.sub = function sub(q) {};

/**
 * Doc: TODO
 *
 * @method scalarDivide
 * @param {Number} s
 * @return {Quaternion}
 */
Quaternion.prototype.scalarDivide = function scalarDivide(s) {};

/*
 * Docs: TODO
 *
 * @method scalarMultiply
 * @param {Number} s
 * @return {Quaternion}
 */
Quaternion.prototype.scalarMultiply = function scalarMultiply(s) {};

/*
 * Docs: TODO
 *
 * @method multiply
 * @param {Quaternion} q
 * @return {Quaternion}
 */
Quaternion.prototype.multiply = function multiply(q) {};

var conj = new Quaternion(1,0,0,0);

/*
 * Docs: TODO
 *
 * @method rotateVector
 * @param {Vector} v
 * @return {Quaternion}
 */
Quaternion.prototype.rotateVector = function rotateVector(v) {};

/*
 * Docs: TODO
 *
 * @method inverse
 * @return {Quaternion}
 */
Quaternion.prototype.inverse = function inverse() {};

/*
 * Docs: TODO
 *
 * @method negate
 * @return {Quaternion}
 */
Quaternion.prototype.negate = function negate() {};

/*
 * Docs: TODO
 *
 * @method conj
 * @return {Quaternion}
 */
Quaternion.prototype.conj = function conj() {};

/*
 * Docs: TODO
 *
 * @method normalize
 * @param {Number} length
 * @return {Quaternion}
 */
Quaternion.prototype.normalize = function normalize(length) {};

/*
 * Docs: TODO
 *
 * @method makeFromAngleAndAxis
 * @param {Number} angle
 * @param {Vector} v
 * @return {Quaternion}
 */
Quaternion.prototype.makeFromAngleAndAxis = function makeFromAngleAndAxis(angle, v) {};

/*
 * Docs: TODO
 *
 * @method setWXYZ
 * @param {Number} w
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Quaternion}
 */
Quaternion.prototype.setWXYZ = function setWXYZ(w,x,y,z) {};

/*
 * Docs: TODO
 *
 * @method set
 * @param {Array|Quaternion} v
 * @return {Quaternion}
 */
Quaternion.prototype.set = function set(v) {};

/**
 * Docs: TODO
 *
 * @method put
 * @param {Quaternion} q
 * @return {Quaternion}
 */
Quaternion.prototype.put = function put(q) {
    q.set(register);
};

/**
 * Doc: TODO
 *
 * @method clone
 * @return {Quaternion}
 */
Quaternion.prototype.clone = function clone() {
    return new Quaternion(this);
};

/**
 * Doc: TODO
 *
 * @method clear
 * @return {Quaternion}
 */
Quaternion.prototype.clear = function clear() {};

/**
 * Doc: TODO
 *
 * @method isEqual
 * @param {Quaternion} q
 * @return {Boolean}
 */
Quaternion.prototype.isEqual = function isEqual(q) {
    return q.w === this.w && q.x === this.x && q.y === this.y && q.z === this.z;
};

/**
 * Doc: TODO
 *
 * @method dot
 * @param {Quaternion} q
 * @return {Number}
 */
Quaternion.prototype.dot = function dot(q) {
    return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
};

/**
 * Doc: TODO
 *
 * @method normSquared
 * @return {Number}
 */
Quaternion.prototype.normSquared = function normSquared() {
    return this.dot(this);
};

/**
 * Doc: TODO
 *
 * @method norm
 * @return {Number}
 */
Quaternion.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};

/**
 * Doc: TODO
 *
 * @method isZero
 * @return {Boolean}
 */
Quaternion.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};

/**
 * Doc: TODO
 *
 * @method getTransform
 * @return {Transform}
 */
Quaternion.prototype.getTransform = function getTransform() {};

var matrixRegister = new Matrix();

/**
 * Doc: TODO
 *
 * @method getMatrix
 * @return {Transform}
 */
Quaternion.prototype.getMatrix = function getMatrix() {};

var epsilon = 1e-5;

/**
 * Doc: TODO
 *
 * @method slerp
 * @param {Quaternion} q
 * @param {Number} t
 * @return {Transform}
 */
Quaternion.prototype.slerp = function slerp(q, t) {};

module.exports = Quaternion;
},{"./Matrix":37}],39:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




var RAND = Math.random;

function _randomFloat(min,max) {
    return min + RAND() * (max - min);
}

function _randomInteger(min,max) {
    return (min + RAND() * (max - min + 1)) >> 0;
}

/**
 * Very simple uniform random number generator library wrapping Math.random().
 *
 * @class Random
 * @static
 */
var Random = {};

/**
 * Get single random integer between min and max (inclusive), or array
 *   of size dim if specified.
 *
 * @method integer
 *
 * @param {Number} min lower bound, default 0
 * @param {Number} max upper bound, default 1
 * @param {Number} dim (optional) dimension of output array, if specified
 * @return {number | array<number>} random integer, or optionally, an array of random integers
 */
Random.integer = function integer(min,max,dim) {};

/**
 * Get single random float between min and max (inclusive), or array
 *   of size dim if specified
 *
 * @method range
 *
 * @param {Number} min lower bound, default 0
 * @param {Number} max upper bound, default 1
 * @param {Number} [dim] dimension of output array, if specified
 * @return {Number} random float, or optionally an array
 */
Random.range = function range(min,max,dim) {};

/**
 * Return random number among the set {-1 ,1}
 *
 * @method sign
 *
 * @param {Number} prob probability of returning 1, default 0.5
 * @return {Number} random sign (-1 or 1)
 */
Random.sign = function sign(prob) {
    prob = (prob !== undefined) ? prob : 0.5;
    return (RAND() < prob) ? 1 : -1;
};

/**
 * Return random boolean value, true or false.
 *
 * @method bool
 *
 * @param {Number} prob probability of returning true, default 0.5
 * @return {Boolean} random boolean
 */
Random.bool = function bool(prob) {
    prob = (prob !== undefined) ? prob : 0.5;
    return RAND() < prob;
};

module.exports = Random;
},{}],40:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * A few static methods.
 *
 * @class Utilities
 * @static
 */
var Utilities = {};

/**
 * Constrain input to range.
 *
 * @method clamp
 * @param {Number} value input
 * @param {Array.Number} range [min, max]
 * @static
 */
Utilities.clamp = function clamp(value, range) {
    return Math.max(Math.min(value, range[1]), range[0]);
};

/**
 * Euclidean length of numerical array.
 *
 * @method length
 * @param {Array.Number} array array of numbers
 * @static
 */
Utilities.length = function length(array) {};

module.exports = Utilities;
},{}],41:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Three-element floating point vector.
 *
 * @class Vector
 * @constructor
 *
 * @param {number} x x element value
 * @param {number} y y element value
 * @param {number} z z element value
 */
function Vector(x,y,z) {}

var _register = new Vector(0,0,0);

/**
 * Add this element-wise to another Vector, element-wise.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method add
 * @param {Vector} v addend
 * @return {Vector} vector sum
 */
Vector.prototype.add = function add(v) {};

/**
 * Subtract another vector from this vector, element-wise.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method sub
 * @param {Vector} v subtrahend
 * @return {Vector} vector difference
 */
Vector.prototype.sub = function sub(v) {};

/**
 * Scale Vector by floating point r.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method mult
 *
 * @param {number} r scalar
 * @return {Vector} vector result
 */
Vector.prototype.mult = function mult(r) {};

/**
 * Scale Vector by floating point 1/r.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method div
 *
 * @param {number} r scalar
 * @return {Vector} vector result
 */
Vector.prototype.div = function div(r) {
    return this.mult(1 / r);
};

/**
 * Given another vector v, return cross product (v)x(this).
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method cross
 * @param {Vector} v Left Hand Vector
 * @return {Vector} vector result
 */
Vector.prototype.cross = function cross(v) {};

/**
 * Component-wise equality test between this and Vector v.
 * @method equals
 * @param {Vector} v vector to compare
 * @return {boolean}
 */
Vector.prototype.equals = function equals(v) {
    return (v.x === this.x && v.y === this.y && v.z === this.z);
};

/**
 * Rotate clockwise around x-axis by theta radians.
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method rotateX
 * @param {number} theta radians
 * @return {Vector} rotated vector
 */
Vector.prototype.rotateX = function rotateX(theta) {};

/**
 * Rotate clockwise around y-axis by theta radians.
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method rotateY
 * @param {number} theta radians
 * @return {Vector} rotated vector
 */
Vector.prototype.rotateY = function rotateY(theta) {};

/**
 * Rotate clockwise around z-axis by theta radians.
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method rotateZ
 * @param {number} theta radians
 * @return {Vector} rotated vector
 */
Vector.prototype.rotateZ = function rotateZ(theta) {};

/**
 * Return dot product of this with a second Vector
 * @method dot
 * @param {Vector} v second vector
 * @return {number} dot product
 */
Vector.prototype.dot = function dot(v) {};

/**
 * Return squared length of this vector
 * @method normSquared
 * @return {number} squared length
 */
Vector.prototype.normSquared = function normSquared() {};

/**
 * Return length of this vector
 * @method norm
 * @return {number} length
 */
Vector.prototype.norm = function norm() {};

/**
 * Scale Vector to specified length.
 *   If length is less than internal tolerance, set vector to [length, 0, 0].
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method normalize
 *
 * @param {number} length target length, default 1.0
 * @return {Vector}
 */
Vector.prototype.normalize = function normalize(length) {};

/**
 * Make a separate copy of the Vector.
 *
 * @method clone
 *
 * @return {Vector}
 */
Vector.prototype.clone = function clone() {
    return new Vector(this);
};

/**
 * True if and only if every value is 0 (or falsy)
 *
 * @method isZero
 *
 * @return {boolean}
 */
Vector.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};

function _setXYZ(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
}

function _setFromArray(v) {
    return _setXYZ.call(this,v[0],v[1],v[2] || 0);
}

function _setFromVector(v) {
    return _setXYZ.call(this, v.x, v.y, v.z);
}

function _setFromNumber(x) {
    return _setXYZ.call(this,x,0,0);
}

/**
 * Set this Vector to the values in the provided Array or Vector.
 *
 * @method set
 * @param {object} v array, Vector, or number
 * @return {Vector} this
 */
Vector.prototype.set = function set(v) {
    if (v instanceof Array) return _setFromArray.call(this, v);
    if (typeof v === 'number') return _setFromNumber.call(this, v);
    return _setFromVector.call(this, v);
};

Vector.prototype.setXYZ = function(x,y,z) {
    return _setXYZ.apply(this, arguments);
};

Vector.prototype.set1D = function(x) {
    return _setFromNumber.call(this, x);
};

/**
 * Put result of last internal register calculation in specified output vector.
 *
 * @method put
 * @param {Vector} v destination vector
 * @return {Vector} destination vector
 */

Vector.prototype.put = function put(v) {
    if (this === _register) _setFromVector.call(v, _register);
    else _setFromVector.call(v, this);
};

/**
 * Set this vector to [0,0,0]
 *
 * @method clear
 */
Vector.prototype.clear = function clear() {
    return _setXYZ.call(this,0,0,0);
};

/**
 * Scale this Vector down to specified "cap" length.
 *   If Vector shorter than cap, or cap is Infinity, do nothing.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method cap
 * @return {Vector} capped vector
 */
Vector.prototype.cap = function cap(cap) {
    if (cap === Infinity) return _setFromVector.call(_register, this);
    var norm = this.norm();
    if (norm > cap) return _setFromVector.call(_register, this.mult(cap / norm));
    else return _setFromVector.call(_register, this);
};

/**
 * Return projection of this Vector onto another.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method project
 * @param {Vector} n vector to project upon
 * @return {Vector} projected vector
 */
Vector.prototype.project = function project(n) {
    return n.mult(this.dot(n));
};

/**
 * Reflect this Vector across provided vector.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method reflectAcross
 * @param {Vector} n vector to reflect across
 * @return {Vector} reflected vector
 */
Vector.prototype.reflectAcross = function reflectAcross(n) {
    n.normalize().put(n);
    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
};

/**
 * Convert Vector to three-element array.
 *
 * @method get
 * @return {array<number>} three-element array
 */
Vector.prototype.get = function get() {
    return [this.x, this.y, this.z];
};

Vector.prototype.get1D = function() {
    return this.x;
};

module.exports = Vector;
},{}],42:[function(_dereq_,module,exports){
module.exports = {
  Matrix: _dereq_('./Matrix'),
  Quaternion: _dereq_('./Quaternion'),
  Random: _dereq_('./Random'),
  Utilities: _dereq_('./Utilities'),
  Vector: _dereq_('./Vector')
};

},{"./Matrix":37,"./Quaternion":38,"./Random":39,"./Utilities":40,"./Vector":41}],43:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = _dereq_('../core/Transform');
var Transitionable = _dereq_('../transitions/Transitionable');
var EventHandler = _dereq_('../core/EventHandler');
var Utilities = _dereq_('../math/Utilities');
var GenericSync = _dereq_('../inputs/GenericSync');
var MouseSync = _dereq_('../inputs/MouseSync');
var TouchSync = _dereq_('../inputs/TouchSync');
GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

/**
 * Makes added render nodes responsive to drag beahvior.
 *   Emits events 'start', 'update', 'end'.
 * @class Draggable
 * @constructor
 * @param {Object} [options] options configuration object.
 * @param {Number} [options.snapX] grid width for snapping during drag
 * @param {Number} [options.snapY] grid height for snapping during drag
 * @param {Array.Number} [options.xRange] maxmimum [negative, positive] x displacement from start of drag
 * @param {Array.Number} [options.yRange] maxmimum [negative, positive] y displacement from start of drag
 * @param {Number} [options.scale] one pixel of input motion translates to this many pixels of output drag motion
 * @param {Number} [options.projection] User should set to Draggable._direction.x or
 *    Draggable._direction.y to constrain to one axis.
 *
 */
function Draggable(options) {}

//binary representation of directions for bitwise operations
var _direction = {
    x : 0x01,         //001
    y : 0x02          //010
};

Draggable.DIRECTION_X = _direction.x;
Draggable.DIRECTION_Y = _direction.y;

var _clamp = Utilities.clamp;

Draggable.DEFAULT_OPTIONS = {
    projection  : _direction.x | _direction.y,
    scale       : 1,
    xRange      : null,
    yRange      : null,
    snapX       : 0,
    snapY       : 0,
    transition  : {duration : 0}
};

function _mapDifferential(differential) {}

function _handleStart() {
    if (!this._active) return;
    if (this._positionState.isActive()) this._positionState.halt();
    this.eventOutput.emit('start', {position : this.getPosition()});
}

function _handleMove(event) {}

function _handleEnd() {
    if (!this._active) return;
    this.eventOutput.emit('end', {position : this.getPosition()});
}

function _bindEvents() {
    this.sync.on('start', _handleStart.bind(this));
    this.sync.on('update', _handleMove.bind(this));
    this.sync.on('end', _handleEnd.bind(this));
}

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options.  See constructor.
 */
Draggable.prototype.setOptions = function setOptions(options) {};

/**
 * Get current delta in position from where this draggable started.
 *
 * @method getPosition
 *
 * @return {array<number>} [x, y] position delta from start.
 */
Draggable.prototype.getPosition = function getPosition() {
    return this._positionState.get();
};

/**
 * Transition the element to the desired relative position via provided transition.
 *  For example, calling this with [0,0] will not change the position.
 *  Callback will be executed on completion.
 *
 * @method setRelativePosition
 *
 * @param {array<number>} position end state to which we interpolate
 * @param {transition} transition transition object specifying how object moves to new position
 * @param {function} callback zero-argument function to call on observed completion
 */
Draggable.prototype.setRelativePosition = function setRelativePosition(position, transition, callback) {};

/**
 * Transition the element to the desired absolute position via provided transition.
 *  Callback will be executed on completion.
 *
 * @method setPosition
 *
 * @param {array<number>} position end state to which we interpolate
 * @param {transition} transition transition object specifying how object moves to new position
 * @param {function} callback zero-argument function to call on observed completion
 */
Draggable.prototype.setPosition = function setPosition(position, transition, callback) {};

/**
 * Set this draggable to respond to user input.
 *
 * @method activate
 *
 */
Draggable.prototype.activate = function activate() {
    this._active = true;
};

/**
 * Set this draggable to ignore user input.
 *
 * @method deactivate
 *
 */
Draggable.prototype.deactivate = function deactivate() {
    this._active = false;
};

/**
 * Switch the input response stage between active and inactive.
 *
 * @method toggle
 *
 */
Draggable.prototype.toggle = function toggle() {
    this._active = !this._active;
};

/**
 * Return render spec for this Modifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} target (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this Modifier, including the
 *    provided target
 */
Draggable.prototype.modify = function modify(target) {
    var pos = this.getPosition();
    return {
        transform: Transform.translate(pos[0], pos[1]),
        target: target
    };
};

module.exports = Draggable;
},{"../core/EventHandler":7,"../core/Transform":15,"../inputs/GenericSync":27,"../inputs/MouseSync":28,"../inputs/TouchSync":33,"../math/Utilities":40,"../transitions/Transitionable":88}],44:[function(_dereq_,module,exports){
var Transitionable = _dereq_('../transitions/Transitionable');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Modifier that allows you to fade the opacity of affected renderables in and out.
 * @class Fader
 * @constructor
 * @param {Object} [options] options configuration object.
 * @param {Boolean} [options.cull=false] Stops returning affected renderables up the tree when they're fully faded when true.
 * @param {Transition} [options.transition=true] The main transition for showing and hiding.
 * @param {Transition} [options.pulseInTransition=true] Controls the transition to a pulsed state when the Fader instance's pulse
 * method is called.
 * @param {Transition} [options.pulseOutTransition=true]Controls the transition back from a pulsed state when the Fader instance's pulse
 * method is called.
 *
 */
function Fader(options, startState) {}

Fader.DEFAULT_OPTIONS = {
    cull: false,
    transition: true,
    pulseInTransition: true,
    pulseOutTransition: true
};

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options.  See constructor.
 */
Fader.prototype.setOptions = function setOptions(options) {};

/**
 * Fully displays the Fader instance's associated renderables.
 *
 * @method show
 * @param {Transition} [transition] The transition that coordinates setting to the new state.
 * @param {Function} [callback] A callback that executes once you've transitioned to the fully shown state.
 */
Fader.prototype.show = function show(transition, callback) {};

/**
 * Fully fades the Fader instance's associated renderables.
 *
 * @method hide
 * @param {Transition} [transition] The transition that coordinates setting to the new state.
 * @param {Function} [callback] A callback that executes once you've transitioned to the fully faded state.
 */
Fader.prototype.hide = function hide(transition, callback) {};

/**
 * Manually sets the opacity state of the fader to the passed-in one. Executes with an optional
 * transition and callback.
 *
 * @method set
 * @param {Number} state A number from zero to one: the amount of opacity you want to set to.
 * @param {Transition} [transition] The transition that coordinates setting to the new state.
 * @param {Function} [callback] A callback that executes once you've finished executing the pulse.
 */
Fader.prototype.set = function set(state, transition, callback) {
    this.halt();
    this.transitionHelper.set(state, transition, callback);
};

/**
 * Halt the transition
 *
 * @method halt
 */
Fader.prototype.halt = function halt() {
    this.transitionHelper.halt();
};

/**
 * Tells you if your Fader instance is above its visibility threshold.
 *
 * @method isVisible
 * @return {Boolean} Whether or not your Fader instance is visible.
 */
Fader.prototype.isVisible = function isVisible() {
    return (this.transitionHelper.get() > 0);
};

/**
 * Return render spec for this Modifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} target (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this Modifier, including the
 *    provided target
 */
Fader.prototype.modify = function modify(target) {
    var currOpacity = this.transitionHelper.get();
    if (this.options.cull && !currOpacity) return undefined;
    else return {opacity: currOpacity, target: target};
};

module.exports = Fader;
},{"../core/OptionsManager":10,"../transitions/Transitionable":88}],45:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * A class to add and remove a chain of modifiers
 *   at a single point in the render tree
 *
 * @class ModifierChain
 * @constructor
 */
function ModifierChain() {
    this._chain = [];
    if (arguments.length) this.addModifier.apply(this, arguments);
}

/**
 * Add a modifier, or comma separated modifiers, to the modifier chain.
 *
 * @method addModifier
 *
 * @param {...Modifier*} varargs args list of Modifiers
 */
ModifierChain.prototype.addModifier = function addModifier(varargs) {
    Array.prototype.push.apply(this._chain, arguments);
};

/**
 * Remove a modifier from the modifier chain.
 *
 * @method removeModifier
 *
 * @param {Modifier} modifier
 */
ModifierChain.prototype.removeModifier = function removeModifier(modifier) {
    var index = this._chain.indexOf(modifier);
    if (index < 0) return;
    this._chain.splice(index, 1);
};

/**
 * Return render spec for this Modifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} input (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this Modifier, including the
 *    provided target
 */
ModifierChain.prototype.modify = function modify(input) {
    var chain  = this._chain;
    var result = input;
    for (var i = 0; i < chain.length; i++) {
        result = chain[i].modify(result);
    }
    return result;
};

module.exports = ModifierChain;
},{}],46:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Modifier = _dereq_('../core/Modifier');
var Transform = _dereq_('../core/Transform');
var Transitionable = _dereq_('../transitions/Transitionable');
var TransitionableTransform = _dereq_('../transitions/TransitionableTransform');

/**
 *  A collection of visual changes to be
 *    applied to another renderable component, strongly coupled with the state that defines
 *    those changes. This collection includes a
 *    transform matrix, an opacity constant, a size, an origin specifier, and an alignment specifier.
 *    StateModifier objects can be added to any RenderNode or object
 *    capable of displaying renderables.  The StateModifier's children and descendants
 *    are transformed by the amounts specified in the modifier's properties.
 *
 * @class StateModifier
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {Transform} [options.transform] affine transformation matrix
 * @param {Number} [options.opacity]
 * @param {Array.Number} [options.origin] origin adjustment
 * @param {Array.Number} [options.align] align adjustment
 * @param {Array.Number} [options.size] size to apply to descendants
 * @param {Array.Number} [options.propportions] proportions to apply to descendants
 */
function StateModifier(options) {}

/**
 * Set the transform matrix of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setTransform
 *
 * @param {Transform} transform Transform to transition to.
 * @param {Transitionable} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {Function} [callback] callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {};

/**
 * Set the opacity of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setOpacity
 *
 * @param {Number} opacity Opacity value to transition to.
 * @param {Transitionable} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    this._opacityState.set(opacity, transition, callback);
    return this;
};

/**
 * Set the origin of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setOrigin
 *
 * @param {Array.Number} origin two element array with values between 0 and 1.
 * @param {Transitionable} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {};

/**
 * Set the alignment of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setAlign
 *
 * @param {Array.Number} align two element array with values between 0 and 1.
 * @param {Transitionable} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
    if (align === null) {
        if (this._hasAlign) {
            this._modifier.alignFrom(null);
            this._hasAlign = false;
        }
        return this;
    }
    else if (!this._hasAlign) {
        this._hasAlign = true;
        this._modifier.alignFrom(this._alignState);
    }
    this._alignState.set(align, transition, callback);
    return this;
};

/**
 * Set the size of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setSize
 *
 * @param {Array.Number} size two element array of [width, height]
 * @param {Transitionable} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size === null) {
        if (this._hasSize) {
            this._modifier.sizeFrom(null);
            this._hasSize = false;
        }
        return this;
    }
    else if (!this._hasSize) {
        this._hasSize = true;
        this._modifier.sizeFrom(this._sizeState);
    }
    this._sizeState.set(size, transition, callback);
    return this;
};

/**
 * Set the proportions of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setProportions
 *
 * @param {Array.Number} proportions two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
    if (proportions === null) {
        if (this._hasProportions) {
            this._modifier.proportionsFrom(null);
            this._hasProportions = false;
        }
        return this;
    }
    else if (!this._hasProportions) {
        this._hasProportions = true;
        this._modifier.proportionsFrom(this._proportionsState);
    }
    this._proportionsState.set(proportions, transition, callback);
    return this;
};

/**
 * Stop the transition.
 *
 * @method halt
 */
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
    this._proportionsState.halt();
};

/**
 * Get the current state of the transform matrix component.
 *
 * @method getTransform
 * @return {Object} transform provider object
 */
StateModifier.prototype.getTransform = function getTransform() {
    return this._transformState.get();
};

/**
 * Get the destination state of the transform component.
 *
 * @method getFinalTransform
 * @return {Transform} transform matrix
 */
StateModifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._transformState.getFinal();
};

/**
 * Get the current state of the opacity component.
 *
 * @method getOpacity
 * @return {Object} opacity provider object
 */
StateModifier.prototype.getOpacity = function getOpacity() {
    return this._opacityState.get();
};

/**
 * Get the current state of the origin component.
 *
 * @method getOrigin
 * @return {Object} origin provider object
 */
StateModifier.prototype.getOrigin = function getOrigin() {
    return this._hasOrigin ? this._originState.get() : null;
};

/**
 * Get the current state of the align component.
 *
 * @method getAlign
 * @return {Object} align provider object
 */
StateModifier.prototype.getAlign = function getAlign() {
    return this._hasAlign ? this._alignState.get() : null;
};

/**
 * Get the current state of the size component.
 *
 * @method getSize
 * @return {Object} size provider object
 */
StateModifier.prototype.getSize = function getSize() {
    return this._hasSize ? this._sizeState.get() : null;
};

/**
 * Get the current state of the propportions component.
 *
 * @method getProportions
 * @return {Object} size provider object
 */
StateModifier.prototype.getProportions = function getProportions() {
    return this._hasProportions ? this._proportionsState.get() : null;
};

/**
 * Return render spec for this StateModifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} target (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this StateModifier, including the
 *    provided target
 */
StateModifier.prototype.modify = function modify(target) {
    return this._modifier.modify(target);
};

module.exports = StateModifier;
},{"../core/Modifier":9,"../core/Transform":15,"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89}],47:[function(_dereq_,module,exports){
module.exports = {
  Draggable: _dereq_('./Draggable'),
  Fader: _dereq_('./Fader'),
  ModifierChain: _dereq_('./ModifierChain'),
  StateModifier: _dereq_('./StateModifier')
};

},{"./Draggable":43,"./Fader":44,"./ModifierChain":45,"./StateModifier":46}],48:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = _dereq_('../core/EventHandler');

/**
 * The Physics Engine is responsible for mediating bodies with their
 *   interaction with forces and constraints (agents). Specifically, it
 *   is responsible for:
 *
 *   - adding and removing bodies
 *   - updating a body's state over time
 *   - attaching and detaching agents
 *   - sleeping upon equillibrium and waking upon excitation
 *
 * @class PhysicsEngine
 * @constructor
 * @param options {Object} options
 */
function PhysicsEngine(options) {}




/**
 * @property PhysicsEngine.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
PhysicsEngine.DEFAULT_OPTIONS = {

    /**
     * The number of iterations the engine takes to resolve constraints
     * @attribute constraintSteps
     * @type Number
     */
    constraintSteps : 1,

    /**
     * The energy threshold required for the Physics Engine to update
     * @attribute sleepTolerance
     * @type Number
     */
    sleepTolerance : 1e-7,

    /**
     * The maximum velocity magnitude of a physics body
     *      Range : [0, Infinity]
     * @attribute velocityCap
     * @type Number
     */
    velocityCap : undefined,

    /**
     * The maximum angular velocity magnitude of a physics body
     *      Range : [0, Infinity]
     * @attribute angularVelocityCap
     * @type Number
     */
    angularVelocityCap : undefined
};

/**
 * Options setter
 *
 * @method setOptions
 * @param opts {Object}
 */
PhysicsEngine.prototype.setOptions = function setOptions(opts) {
    for (var key in opts) if (this.options[key]) this.options[key] = opts[key];
};

/**
 * Method to add a physics body to the engine. Necessary to update the
 *   body over time.
 *
 * @method addBody
 * @param body {Body}
 * @return body {Body}
 */
PhysicsEngine.prototype.addBody = function addBody(body) {};

/**
 * Remove a body from the engine. Detaches body from all forces and
 *   constraints.
 *
 * TODO: Fix for in loop
 *
 * @method removeBody
 * @param body {Body}
 */
PhysicsEngine.prototype.removeBody = function removeBody(body) {};



/**
 * Attaches a force or constraint to a Body. Returns an AgentId of the
 *   attached agent which can be used to detach the agent.
 *
 * @method attach
 * @param agents {Agent|Array.Agent} A force, constraint, or array of them.
 * @param [targets=All] {Body|Array.Body} The Body or Bodies affected by the agent
 * @param [source] {Body} The source of the agent
 * @return AgentId {Number}
 */
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {};

/**
 * Append a body to the targets of a previously defined physics agent.
 *
 * @method attachTo
 * @param agentID {AgentId} The agentId of a previously defined agent
 * @param target {Body} The Body affected by the agent
 */
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {};

/**
 * Undoes PhysicsEngine.attach. Removes an agent and its associated
 *   effect on its affected Bodies.
 *
 * @method detach
 * @param id {AgentId} The agentId of a previously defined agent
 */
PhysicsEngine.prototype.detach = function detach(id) {};

/**
 * Remove a single Body from a previously defined agent.
 *
 * @method detach
 * @param id {AgentId} The agentId of a previously defined agent
 * @param target {Body} The body to remove from the agent
 */
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {};

/**
 * A convenience method to give the Physics Engine a clean slate of
 * agents. Preserves all added Body objects.
 *
 * @method detachAll
 */
PhysicsEngine.prototype.detachAll = function detachAll() {};


/**
 * Returns the corresponding agent given its agentId.
 *
 * @method getAgent
 * @param id {AgentId}
 */
PhysicsEngine.prototype.getAgent = function getAgent(id) {};

/**
 * Returns all particles that are currently managed by the Physics Engine.
 *
 * @method getParticles
 * @return particles {Array.Particles}
 */
PhysicsEngine.prototype.getParticles = function getParticles() {};

/**
 * Returns all bodies, except particles, that are currently managed by the Physics Engine.
 *
 * @method getBodies
 * @return bodies {Array.Bodies}
 */
PhysicsEngine.prototype.getBodies = function getBodies() {};

/**
 * Returns all bodies that are currently managed by the Physics Engine.
 *
 * @method getBodies
 * @return bodies {Array.Bodies}
 */
PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {};

/**
 * Iterates over every Particle and applies a function whose first
 *   argument is the Particle
 *
 * @method forEachParticle
 * @param fn {Function} Function to iterate over
 * @param [dt] {Number} Delta time
 */
PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {};

/**
 * Iterates over every Body that isn't a Particle and applies
 *   a function whose first argument is the Body
 *
 * @method forEachBody
 * @param fn {Function} Function to iterate over
 * @param [dt] {Number} Delta time
 */
PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {};

/**
 * Iterates over every Body and applies a function whose first
 *   argument is the Body
 *
 * @method forEach
 * @param fn {Function} Function to iterate over
 * @param [dt] {Number} Delta time
 */
PhysicsEngine.prototype.forEach = function forEach(fn, dt) {};

/**
 * Calculates the potential energy of an agent, like a spring, by its Id
 *
 * @method getAgentEnergy
 * @param agentId {Number} The attached agent Id
 * @return energy {Number}
 */
PhysicsEngine.prototype.getAgentEnergy = function(agentId) {};

/**
 * Calculates the kinetic energy of all Body objects and potential energy
 *   of all attached agents.
 *
 * TODO: implement.
 * @method getEnergy
 * @return energy {Number}
 */
PhysicsEngine.prototype.getEnergy = function getEnergy() {};

/**
 * Updates all Body objects managed by the physics engine over the
 *   time duration since the last time step was called.
 *
 * @method step
 */
PhysicsEngine.prototype.step = function step() {};

/**
 * Tells whether the Physics Engine is sleeping or awake.
 *
 * @method isSleeping
 * @return {Boolean}
 */
PhysicsEngine.prototype.isSleeping = function isSleeping() {};

/**
 * Tells whether the Physics Engine is sleeping or awake.
 *
 * @method isActive
 * @return {Boolean}
 */
PhysicsEngine.prototype.isActive = function isSleeping() {};

/**
 * Stops the Physics Engine update loop. Emits an 'end' event.
 *
 * @method sleep
 */
PhysicsEngine.prototype.sleep = function sleep() {};

/**
 * Restarts the Physics Engine update loop. Emits an 'start' event.
 *
 * @method wake
 */
PhysicsEngine.prototype.wake = function wake() {};

PhysicsEngine.prototype.emit = function emit(type, data) {};

PhysicsEngine.prototype.on = function on(event, fn) {};

module.exports = PhysicsEngine;
},{"../core/EventHandler":7}],49:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Particle = _dereq_('./Particle');
var Transform = _dereq_('../../core/Transform');
var Vector = _dereq_('../../math/Vector');
var Quaternion = _dereq_('../../math/Quaternion');
var Matrix = _dereq_('../../math/Matrix');
var Integrator = _dereq_('../integrators/SymplecticEuler');

/**
 * A unit controlled by the physics engine which extends the zero-dimensional
 *   Particle to include geometry. In addition to maintaining the state
 *   of a Particle its state includes orientation, angular velocity
 *   and angular momentum and responds to torque forces.
 *
 * @class Body
 * @extends Particle
 * @constructor
 */
function Body(options) {
    Particle.call(this, options);
    options = options || {};

    this.orientation     = new Quaternion();
    this.angularVelocity = new Vector();
    this.angularMomentum = new Vector();
    this.torque          = new Vector();

    if (options.orientation)     this.orientation.set(options.orientation);
    if (options.angularVelocity) this.angularVelocity.set(options.angularVelocity);
    if (options.angularMomentum) this.angularMomentum.set(options.angularMomentum);
    if (options.torque)          this.torque.set(options.torque);

    this.angularVelocity.w = 0;        //quaternify the angular velocity
    this.setMomentsOfInertia();

    // registers
    this.pWorld = new Vector();        //placeholder for world space position
}

Body.DEFAULT_OPTIONS = Particle.DEFAULT_OPTIONS;
Body.DEFAULT_OPTIONS.orientation = [0, 0, 0, 1];
Body.DEFAULT_OPTIONS.angularVelocity = [0, 0, 0];

Body.prototype = Object.create(Particle.prototype);
Body.prototype.constructor = Body;

Body.prototype.isBody = true;

Body.prototype.setMass = function setMass() {};

/**
 * Setter for moment of inertia, which is necessary to give proper
 *   angular inertia depending on the geometry of the body.
 *
 * @method setMomentsOfInertia
 */
Body.prototype.setMomentsOfInertia = function setMomentsOfInertia() {};

/**
 * Update the angular velocity from the angular momentum state.
 *
 * @method updateAngularVelocity
 */
Body.prototype.updateAngularVelocity = function updateAngularVelocity() {};

/**
 * Determine world coordinates from the local coordinate system. Useful
 *   if the Body has rotated in space.
 *
 * @method toWorldCoordinates
 * @param localPosition {Vector} local coordinate vector
 * @return global coordinate vector {Vector}
 */
Body.prototype.toWorldCoordinates = function toWorldCoordinates(localPosition) {};

/**
 * Calculates the kinetic and intertial energy of a body.
 *
 * @method getEnergy
 * @return energy {Number}
 */
Body.prototype.getEnergy = function getEnergy() {};

/**
 * Extends Particle.reset to reset orientation, angular velocity
 *   and angular momentum.
 *
 * @method reset
 * @param [p] {Array|Vector} position
 * @param [v] {Array|Vector} velocity
 * @param [q] {Array|Quaternion} orientation
 * @param [L] {Array|Vector} angular momentum
 */
Body.prototype.reset = function reset(p, v, q, L) {};

/**
 * Setter for orientation
 *
 * @method setOrientation
 * @param q {Array|Quaternion} orientation
 */
Body.prototype.setOrientation = function setOrientation(q) {};

/**
 * Setter for angular velocity
 *
 * @method setAngularVelocity
 * @param w {Array|Vector} angular velocity
 */
Body.prototype.setAngularVelocity = function setAngularVelocity(w) {};

/**
 * Setter for angular momentum
 *
 * @method setAngularMomentum
 * @param L {Array|Vector} angular momentum
 */
Body.prototype.setAngularMomentum = function setAngularMomentum(L) {};

/**
 * Extends Particle.applyForce with an optional argument
 *   to apply the force at an off-centered location, resulting in a torque.
 *
 * @method applyForce
 * @param force {Vector} force
 * @param [location] {Vector} off-center location on the body
 */
Body.prototype.applyForce = function applyForce(force, location) {};

/**
 * Applied a torque force to a body, inducing a rotation.
 *
 * @method applyTorque
 * @param torque {Vector} torque
 */
Body.prototype.applyTorque = function applyTorque(torque) {};

/**
 * Extends Particle.getTransform to include a rotational component
 *   derived from the particle's orientation.
 *
 * @method getTransform
 * @return transform {Transform}
 */
Body.prototype.getTransform = function getTransform() {};

/**
 * Extends Particle._integrate to also update the rotational states
 *   of the body.
 *
 * @method getTransform
 * @protected
 * @param dt {Number} delta time
 */
Body.prototype._integrate = function _integrate(dt) {};

/**
 * Updates the angular momentum via the its integrator.
 *
 * @method integrateAngularMomentum
 * @param dt {Number} delta time
 */
Body.prototype.integrateAngularMomentum = function integrateAngularMomentum(dt) {};

/**
 * Updates the orientation via the its integrator.
 *
 * @method integrateOrientation
 * @param dt {Number} delta time
 */
Body.prototype.integrateOrientation = function integrateOrientation(dt) {};

module.exports = Body;
},{"../../core/Transform":15,"../../math/Matrix":37,"../../math/Quaternion":38,"../../math/Vector":41,"../integrators/SymplecticEuler":72,"./Particle":51}],50:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Body = _dereq_('./Body');
var Matrix = _dereq_('../../math/Matrix');

/**
 * Implements a circle, or spherical, geometry for a Body with
 * radius.
 *
 * @class Circle
 * @extends Body
 * @constructor
 */
function Circle(options) {}

Circle.prototype = Object.create(Body.prototype);
Circle.prototype.constructor = Circle;

/**
 * Basic setter for radius.
 * @method setRadius
 * @param r {Number} radius
 */
Circle.prototype.setRadius = function setRadius(r) {};

Circle.prototype.setMomentsOfInertia = function setMomentsOfInertia() {};

module.exports = Circle;
},{"../../math/Matrix":37,"./Body":49}],51:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Vector = _dereq_('../../math/Vector');
var Transform = _dereq_('../../core/Transform');
var EventHandler = _dereq_('../../core/EventHandler');
var Integrator = _dereq_('../integrators/SymplecticEuler');

/**
 * A point body that is controlled by the Physics Engine. A particle has
 *   position and velocity states that are updated by the Physics Engine.
 *   Ultimately, a particle is a special type of modifier, and can be added to
 *   the Famo.us Scene Graph like any other modifier.
 *
 * @class Particle
 * @uses EventHandler
 * @extensionfor Body
 *
 * @param [options] {Options}           An object of configurable options.
 * @param [options.position] {Array}    The position of the particle.
 * @param [options.velocity] {Array}    The velocity of the particle.
 * @param [options.mass] {Number}       The mass of the particle.
 */
 function Particle(options) {}

Particle.DEFAULT_OPTIONS = {
    position : [0, 0, 0],
    velocity : [0, 0, 0],
    mass : 1
};


// Cached timing function
var now = Date.now;

/**
 * @attribute isBody
 * @type Boolean
 * @static
 */
Particle.prototype.isBody = false;

/**
 * Determines if particle is active
 *
 * @method isActive
 * @return {Boolean}
 */
Particle.prototype.isActive = function isActive() {};

/**
 * Stops the particle from updating
 *
 * @method sleep
 */
Particle.prototype.sleep = function sleep() {};

/**
 * Starts the particle update
 *
 * @method wake
 */
Particle.prototype.wake = function wake() {};

/**
 * Basic setter for position
 *
 * @method setPosition
 * @param position {Array|Vector}
 */
Particle.prototype.setPosition = function setPosition(position) {};

/**
 * 1-dimensional setter for position
 *
 * @method setPosition1D
 * @param x {Number}
 */
Particle.prototype.setPosition1D = function setPosition1D(x) {};

/**
 * Basic getter function for position
 *
 * @method getPosition
 * @return position {Array}
 */
Particle.prototype.getPosition = function getPosition() {};

/**
 * 1-dimensional getter for position
 *
 * @method getPosition1D
 * @return value {Number}
 */
Particle.prototype.getPosition1D = function getPosition1D() {};

/**
 * Basic setter function for velocity Vector
 *
 * @method setVelocity
 * @function
 */
Particle.prototype.setVelocity = function setVelocity(velocity) {};

/**
 * 1-dimensional setter for velocity
 *
 * @method setVelocity1D
 * @param x {Number}
 */
Particle.prototype.setVelocity1D = function setVelocity1D(x) {};

/**
 * Basic getter function for velocity Vector
 *
 * @method getVelocity
 * @return velocity {Array}
 */
Particle.prototype.getVelocity = function getVelocity() {};

/**
 * Basic setter function for force Vector
 *
 * @method setForce
 * @return force {Array}
 */
Particle.prototype.setForce = function setForce(force) {};

/**
 * 1-dimensional getter for velocity
 *
 * @method getVelocity1D
 * @return velocity {Number}
 */
Particle.prototype.getVelocity1D = function getVelocity1D() {};

/**
 * Basic setter function for mass quantity
 *
 * @method setMass
 * @param mass {Number} mass
 */
Particle.prototype.setMass = function setMass(mass) {};

/**
 * Basic getter function for mass quantity
 *
 * @method getMass
 * @return mass {Number}
 */
Particle.prototype.getMass = function getMass() {};

/**
 * Reset position and velocity
 *
 * @method reset
 * @param position {Array|Vector}
 * @param velocity {Array|Vector}
 */
Particle.prototype.reset = function reset(position, velocity) {};

/**
 * Add force vector to existing internal force Vector
 *
 * @method applyForce
 * @param force {Vector}
 */
Particle.prototype.applyForce = function applyForce(force) {};

/**
 * Add impulse (change in velocity) Vector to this Vector's velocity.
 *
 * @method applyImpulse
 * @param impulse {Vector}
 */
Particle.prototype.applyImpulse = function applyImpulse(impulse) {};

/**
 * Update a particle's velocity from its force accumulator
 *
 * @method integrateVelocity
 * @param dt {Number} Time differential
 */
Particle.prototype.integrateVelocity = function integrateVelocity(dt) {};

/**
 * Update a particle's position from its velocity
 *
 * @method integratePosition
 * @param dt {Number} Time differential
 */
Particle.prototype.integratePosition = function integratePosition(dt) {};

/**
 * Update the position and velocity of the particle
 *
 * @method _integrate
 * @protected
 * @param dt {Number} Time differential
 */
Particle.prototype._integrate = function _integrate(dt) {};

/**
 * Get kinetic energy of the particle.
 *
 * @method getEnergy
 * @function
 */
Particle.prototype.getEnergy = function getEnergy() {};

/**
 * Generate transform from the current position state
 *
 * @method getTransform
 * @return Transform {Transform}
 */
Particle.prototype.getTransform = function getTransform() {};

/**
 * The modify interface of a Modifier
 *
 * @method modify
 * @param target {Spec}
 * @return Spec {Spec}
 */
Particle.prototype.modify = function modify(target) {};

Particle.prototype.emit = function emit(type, data) {};

Particle.prototype.on = function on() {};

Particle.prototype.removeListener = function removeListener() {};

Particle.prototype.pipe = function pipe() {};

Particle.prototype.unpipe = function unpipe() {};

module.exports = Particle;
},{"../../core/EventHandler":7,"../../core/Transform":15,"../../math/Vector":41,"../integrators/SymplecticEuler":72}],52:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Body = _dereq_('./Body');
var Matrix = _dereq_('../../math/Matrix');

/**
 * Implements a rectangular geometry for an Body with
 * size = [width, height].
 *
 * @class Rectangle
 * @extends Body
 * @constructor
 */
function Rectangle(options) {}

Rectangle.prototype = Object.create(Body.prototype);
Rectangle.prototype.constructor = Rectangle;

/**
 * Basic setter for size.
 * @method setSize
 * @param size {Array} size = [width, height]
 */
Rectangle.prototype.setSize = function setSize(size) {};

Rectangle.prototype.setMomentsOfInertia = function setMomentsOfInertia() {};

module.exports = Rectangle;
},{"../../math/Matrix":37,"./Body":49}],53:[function(_dereq_,module,exports){
module.exports = {
  Body: _dereq_('./Body'),
  Circle: _dereq_('./Circle'),
  Particle: _dereq_('./Particle'),
  Rectangle: _dereq_('./Rectangle')
};

},{"./Body":49,"./Circle":50,"./Particle":51,"./Rectangle":52}],54:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Vector = _dereq_('../../math/Vector');

/**
 *  Allows for two circular bodies to collide and bounce off each other.
 *
 *  @class Collision
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Number} [options.restitution] The energy ratio lost in a collision (0 = stick, 1 = elastic) Range : [0, 1]
 *  @param {Number} [options.drift] Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1]
 *  @param {Number} [options.slop] Amount of penetration in pixels to ignore before collision event triggers
 *
 */
function Collision(options) {}

Collision.prototype = Object.create(Constraint.prototype);
Collision.prototype.constructor = Collision;

Collision.DEFAULT_OPTIONS = {
    restitution : 0.5,
    drift : 0.5,
    slop : 0
};

function _normalVelocity(particle1, particle2) {}

/*
 * Setter for options.
 *
 * @method setOptions
 * @param options {Objects}
 */
Collision.prototype.setOptions = function setOptions(options) {};

/**
 * Adds an impulse to a physics body's velocity due to the constraint
 *
 * @method applyConstraint
 * @param targets {Array.Body}  Array of bodies to apply the constraint to
 * @param source {Body}         The source of the constraint
 * @param dt {Number}           Delta time
 */
Collision.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

module.exports = Collision;
},{"../../math/Vector":41,"./Constraint":55}],55:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = _dereq_('../../core/EventHandler');

/**
 *  Allows for two circular bodies to collide and bounce off each other.
 *
 *  @class Constraint
 *  @constructor
 *  @uses EventHandler
 *  @param options {Object}
 */
function Constraint() {}

/*
 * Setter for options.
 *
 * @method setOptions
 * @param options {Objects}
 */
Constraint.prototype.setOptions = function setOptions(options) {};

/**
 * Adds an impulse to a physics body's velocity due to the constraint
 *
 * @method applyConstraint
 */
Constraint.prototype.applyConstraint = function applyConstraint() {};

/**
 * Getter for energy
 *
 * @method getEnergy
 * @return energy {Number}
 */
Constraint.prototype.getEnergy = function getEnergy() {
    return 0.0;
};

module.exports = Constraint;
},{"../../core/EventHandler":7}],56:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Vector = _dereq_('../../math/Vector');

/**
 *  A constraint that keeps a physics body on a given implicit curve
 *    regardless of other physical forces are applied to it.
 *
 *    A curve constraint is two surface constraints in disguise, as a curve is
 *    the intersection of two surfaces, and is essentially constrained to both
 *
 *  @class Curve
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Function} [options.equation] An implicitly defined surface f(x,y,z) = 0 that body is constrained to e.g. function(x,y,z) { x*x + y*y - r*r } corresponds to a circle of radius r pixels
 *  @param {Function} [options.plane] An implicitly defined second surface that the body is constrained to
 *  @param {Number} [options.period] The spring-like reaction when the constraint is violated
 *  @param {Number} [options.number] The damping-like reaction when the constraint is violated
 */
function Curve(options) {}

Curve.prototype = Object.create(Constraint.prototype);
Curve.prototype.constructor = Curve;

/** @const */ var epsilon = 1e-7;
/** @const */ var pi = Math.PI;

Curve.DEFAULT_OPTIONS = {
    equation  : function(x,y,z) {
        return 0;
    },
    plane : function(x,y,z) {
        return z;
    },
    period : 0,
    dampingRatio : 0
};

/**
 * Basic options setter
 *
 * @method setOptions
 * @param options {Objects}
 */
Curve.prototype.setOptions = function setOptions(options) {
    for (var key in options) this.options[key] = options[key];
};

/**
 * Adds a curve impulse to a physics body.
 *
 * @method applyConstraint
 * @param targets {Array.Body} Array of bodies to apply force to.
 * @param source {Body} Not applicable
 * @param dt {Number} Delta time
 */
Curve.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

module.exports = Curve;
},{"../../math/Vector":41,"./Constraint":55}],57:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Vector = _dereq_('../../math/Vector');

/**
 *  A constraint that keeps a physics body a given distance away from a given
 *  anchor, or another attached body.
 *
 *
 *  @class Distance
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Array} [options.anchor] The location of the anchor
 *  @param {Number} [options.length] The amount of distance from the anchor the constraint should enforce
 *  @param {Number} [options.minLength] The minimum distance before the constraint is activated. Use this property for a "rope" effect.
 *  @param {Number} [options.period] The spring-like reaction when the constraint is broken.
 *  @param {Number} [options.dampingRatio] The damping-like reaction when the constraint is broken.
 *
 */
function Distance(options) {}

Distance.prototype = Object.create(Constraint.prototype);
Distance.prototype.constructor = Distance;

Distance.DEFAULT_OPTIONS = {
    anchor : null,
    length : 0,
    minLength : 0,
    period : 0,
    dampingRatio : 0
};

/** @const */ var pi = Math.PI;

/**
 * Basic options setter
 *
 * @method setOptions
 * @param options {Objects}
 */
Distance.prototype.setOptions = function setOptions(options) {};

function _calcError(impulse, body) {
    return body.mass * impulse.norm();
}

/**
 * Set the anchor position
 *
 * @method setOptions
 * @param anchor {Array}
 */
Distance.prototype.setAnchor = function setAnchor(anchor) {};

/**
 * Adds an impulse to a physics body's velocity due to the constraint
 *
 * @method applyConstraint
 * @param targets {Array.Body}  Array of bodies to apply the constraint to
 * @param source {Body}         The source of the constraint
 * @param dt {Number}           Delta time
 */
Distance.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

module.exports = Distance;
},{"../../math/Vector":41,"./Constraint":55}],58:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Vector = _dereq_('../../math/Vector');

/**
 *  A spring constraint is like a spring force, except that it is always
 *    numerically stable (even for low periods), at the expense of introducing
 *    damping (even with dampingRatio set to 0).
 *
 *    Use this if you need fast spring-like behavior, e.g., snapping
 *
 *  @class Snap
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Number} [options.period] The amount of time in milliseconds taken for one complete oscillation when there is no damping. Range : [150, Infinity]
 *  @param {Number} [options.dampingRatio] Additional damping of the spring. Range : [0, 1]. At 0 this spring will still be damped, at 1 the spring will be critically damped (the spring will never oscillate)
 *  @param {Number} [options.length] The rest length of the spring. Range: [0, Infinity].
 *  @param {Array} [options.anchor] The location of the spring's anchor, if not another physics body.
 *
 */
function Snap(options) {
Snap.prototype = Object.create(Constraint.prototype);
Snap.prototype.constructor = Snap;

Snap.DEFAULT_OPTIONS = {
    period : 300,
    dampingRatio : 0.1,
    length : 0,
    anchor : undefined
};

/** const */ var pi = Math.PI;

/**
 * Basic options setter
 *
 * @method setOptions
 * @param options {Objects} options
 */
Snap.prototype.setOptions = function setOptions(options) {};

/**
 * Calculates energy of spring
 *
 * @method getEnergy
 * @param targets {Body} target physics body
 * @param source {Body} source physics body
 * @return energy {Number}
 */
Snap.prototype.getEnergy = function getEnergy(targets, source) {
    var options     = this.options;
    var restLength  = options.length;
    var anchor      = options.anchor || source.position;
    var strength    = Math.pow(2 * pi / options.period, 2);

    var energy = 0.0;
    for (var i = 0; i < targets.length; i++){
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};

/**
 * Adds a spring impulse to a physics body's velocity due to the constraint
 *
 * @method applyConstraint
 * @param targets {Array.Body}  Array of bodies to apply the constraint to
 * @param source {Body}         The source of the constraint
 * @param dt {Number}           Delta time
 */
Snap.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

module.exports = Snap;
},{"../../math/Vector":41,"./Constraint":55}],59:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Vector = _dereq_('../../math/Vector');

/**
 *  A constraint that keeps a physics body on a given implicit surface
 *    regardless of other physical forces are applied to it.
 *
 *  @class Surface
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Function} [options.equation] An implicitly defined surface f(x,y,z) = 0 that body is constrained to e.g. function(x,y,z) { x*x + y*y + z*z - r*r } corresponds to a sphere of radius r pixels.
 *  @param {Number} [options.period] The spring-like reaction when the constraint is violated.
 *  @param {Number} [options.dampingRatio] The damping-like reaction when the constraint is violated.
 */
function Surface(options) {}

Surface.prototype = Object.create(Constraint.prototype);
Surface.prototype.constructor = Surface;

Surface.DEFAULT_OPTIONS = {
    equation : undefined,
    period : 0,
    dampingRatio : 0
};

/** @const */ var epsilon = 1e-7;
/** @const */ var pi = Math.PI;

/**
 * Basic options setter
 *
 * @method setOptions
 * @param options {Objects}
 */
Surface.prototype.setOptions = function setOptions(options) {
    for (var key in options) this.options[key] = options[key];
};

/**
 * Adds a surface impulse to a physics body.
 *
 * @method applyConstraint
 * @param targets {Array.Body} Array of bodies to apply force to.
 * @param source {Body} Not applicable
 * @param dt {Number} Delta time
 */
Surface.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

module.exports = Surface;
},{"../../math/Vector":41,"./Constraint":55}],60:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Vector = _dereq_('../../math/Vector');

/**
 *  A wall describes an infinite two-dimensional plane that physics bodies
 *    can collide with. To define a wall, you must give it a distance (from
 *    the center of the physics engine's origin, and a normal defining the plane
 *    of the wall.
 *
 *    (wall)
 *      |
 *      | (normal)     (origin)
 *      | --->            *
 *      |
 *      |    (distance)
 *      ...................
 *            (100px)
 *
 *      e.g., Wall({normal : [1,0,0], distance : 100})
 *      would be a wall 100 pixels to the left, whose normal points right
 *
 *  @class Wall
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Number} [options.restitution] The energy ratio lost in a collision (0 = stick, 1 = elastic). Range : [0, 1]
 *  @param {Number} [options.drift] Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1]
 *  @param {Number} [options.slop] Amount of penetration in pixels to ignore before collision event triggers.
 *  @param {Array} [options.normal] The normal direction to the wall.
 *  @param {Number} [options.distance] The distance from the origin that the wall is placed.
 *  @param {onContact} [options.onContact] How to handle collision against the wall.
 *
 */
function Wall(options) {}

Wall.prototype = Object.create(Constraint.prototype);
Wall.prototype.constructor = Wall;

/**
 * @property Wall.ON_CONTACT
 * @type Object
 * @protected
 * @static
 */
Wall.ON_CONTACT = {

    /**
     * Physical bodies bounce off the wall
     * @attribute REFLECT
     */
    REFLECT : 0,

    /**
     * Physical bodies are unaffected. Usecase is to fire events on contact.
     * @attribute SILENT
     */
    SILENT : 1
};

Wall.DEFAULT_OPTIONS = {
    restitution : 0.5,
    drift : 0.5,
    slop : 0,
    normal : [1, 0, 0],
    distance : 0,
    onContact : Wall.ON_CONTACT.REFLECT
};

/*
 * Setter for options.
 *
 * @method setOptions
 * @param options {Objects}
 */
Wall.prototype.setOptions = function setOptions(options) {};

/**
 * Adds an impulse to a physics body's velocity due to the wall constraint
 *
 * @method applyConstraint
 * @param targets {Array.Body}  Array of bodies to apply the constraint to
 * @param source {Body}         The source of the constraint
 * @param dt {Number}           Delta time
 */
Wall.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

module.exports = Wall;
},{"../../math/Vector":41,"./Constraint":55}],61:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = _dereq_('./Constraint');
var Wall = _dereq_('./Wall');
var Vector = _dereq_('../../math/Vector');

/**
 *  Walls combines one or more Wall primitives and exposes a simple API to
 *  interact with several walls at once. A common use case would be to set up
 *  a bounding box for a physics body, that would collide with each side.
 *
 *  @class Walls
 *  @constructor
 *  @extends Constraint
 *  @uses Wall
 *  @param {Options} [options] An object of configurable options.
 *  @param {Array} [options.sides] An array of sides e.g., [Walls.LEFT, Walls.TOP]
 *  @param {Array} [options.size] The size of the bounding box of the walls.
 *  @param {Array} [options.origin] The center of the wall relative to the size.
 *  @param {Array} [options.drift] Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1]
 *  @param {Array} [options.slop] Amount of penetration in pixels to ignore before collision event triggers.
 *  @param {Array} [options.restitution] The energy ratio lost in a collision (0 = stick, 1 = elastic) The energy ratio lost in a collision (0 = stick, 1 = elastic)
 *  @param {Array} [options.onContact] How to handle collision against the wall.
 */
function Walls(options) {}

Walls.prototype = Object.create(Constraint.prototype);
Walls.prototype.constructor = Walls;
/**
 * @property Walls.ON_CONTACT
 * @type Object
 * @extends Wall.ON_CONTACT
 * @static
 */
Walls.ON_CONTACT = Wall.ON_CONTACT;

/**
 * An enumeration of common types of walls
 *    LEFT, RIGHT, TOP, BOTTOM, FRONT, BACK
 *    TWO_DIMENSIONAL, THREE_DIMENSIONAL
 *
 * @property Walls.SIDES
 * @type Object
 * @final
 * @static
 */
Walls.SIDES = {
    LEFT   : 0,
    RIGHT  : 1,
    TOP    : 2,
    BOTTOM : 3,
    FRONT  : 4,
    BACK   : 5,
    TWO_DIMENSIONAL : [0, 1, 2, 3],
    THREE_DIMENSIONAL : [0, 1, 2, 3, 4, 5]
};

Walls.DEFAULT_OPTIONS = {
    sides : Walls.SIDES.TWO_DIMENSIONAL,
    size : [window.innerWidth, window.innerHeight, 0],
    origin : [.5, .5, .5],
    drift : 0.5,
    slop : 0,
    restitution : 0.5,
    onContact : Walls.ON_CONTACT.REFLECT
};


/*
 * Setter for options.
 *
 * @method setOptions
 * @param options {Objects}
 */
Walls.prototype.setOptions = function setOptions(options) {};

/*
 * Setter for size.
 *
 * @method setOptions
 * @param options {Objects}
 */
Walls.prototype.setSize = function setSize(size, origin) {};



/**
 * Adds an impulse to a physics body's velocity due to the walls constraint
 *
 * @method applyConstraint
 * @param targets {Array.Body}  Array of bodies to apply the constraint to
 * @param source {Body}         The source of the constraint
 * @param dt {Number}           Delta time
 */
Walls.prototype.applyConstraint = function applyConstraint(targets, source, dt) {};

/**
 * Apply a method to each wall making up the walls
 *
 * @method applyConstraint
 * @param fn {Function}  Function that takes in a wall as its first parameter
 */
Walls.prototype.forEach = function forEach(fn) {};

/**
 * Rotates the walls by an angle in the XY-plane
 *
 * @method applyConstraint
 * @param angle {Function}
 */
Walls.prototype.rotateZ = function rotateZ(angle) {};

/**
 * Rotates the walls by an angle in the YZ-plane
 *
 * @method applyConstraint
 * @param angle {Function}
 */
Walls.prototype.rotateX = function rotateX(angle) {};

/**
 * Rotates the walls by an angle in the XZ-plane
 *
 * @method applyConstraint
 * @param angle {Function}
 */
Walls.prototype.rotateY = function rotateY(angle) {};

/**
 * Resets the walls to their starting oritentation
 */
Walls.prototype.reset = function reset() {};

module.exports = Walls;
},{"../../math/Vector":41,"./Constraint":55,"./Wall":60}],62:[function(_dereq_,module,exports){
module.exports = {
  Collision: _dereq_('./Collision'),
  Constraint: _dereq_('./Constraint'),
  Curve: _dereq_('./Curve'),
  Distance: _dereq_('./Distance'),
  Snap: _dereq_('./Snap'),
  Surface: _dereq_('./Surface'),
  Wall: _dereq_('./Wall'),
  Walls: _dereq_('./Walls')
};

},{"./Collision":54,"./Constraint":55,"./Curve":56,"./Distance":57,"./Snap":58,"./Surface":59,"./Wall":60,"./Walls":61}],63:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Force = _dereq_('./Force');

/**
 * Drag is a force that opposes velocity. Attach it to the physics engine
 * to slow down a physics body in motion.
 *
 * @class Drag
 * @constructor
 * @extends Force
 * @param {Object} options options to set on drag
 */
function Drag(options) {}

Drag.prototype = Object.create(Force.prototype);
Drag.prototype.constructor = Drag;

/**
 * @property Drag.FORCE_FUNCTIONS
 * @type Object
 * @protected
 * @static
 */
Drag.FORCE_FUNCTIONS = {

    /**
     * A drag force proportional to the velocity
     * @attribute LINEAR
     * @type Function
     * @param {Vector} velocity
     * @return {Vector} drag force
     */
    LINEAR : function(velocity) {
        return velocity;
    },

    /**
     * A drag force proportional to the square of the velocity
     * @attribute QUADRATIC
     * @type Function
     * @param {Vector} velocity
     * @return {Vector} drag force
     */
    QUADRATIC : function(velocity) {
        return velocity.mult(velocity.norm());
    }
};

/**
 * @property Drag.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
Drag.DEFAULT_OPTIONS = {

    /**
     * The strength of the force
     *    Range : [0, 0.1]
     * @attribute strength
     * @type Number
     * @default 0.01
     */
    strength : 0.01,

    /**
     * The type of opposing force
     * @attribute forceFunction
     * @type Function
     */
    forceFunction : Drag.FORCE_FUNCTIONS.LINEAR
};

/**
 * Adds a drag force to a physics body's force accumulator.
 *
 * @method applyForce
 * @param targets {Array.Body} Array of bodies to apply drag force to.
 */
Drag.prototype.applyForce = function applyForce(targets) {};

/**
 * Basic options setter
 *
 * @method setOptions
 * @param {Objects} options
 */
Drag.prototype.setOptions = function setOptions(options) {
    for (var key in options) this.options[key] = options[key];
};

module.exports = Drag;
},{"./Force":64}],64:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Vector = _dereq_('../../math/Vector');
var EventHandler = _dereq_('../../core/EventHandler');

/**
 * Force base class.
 *
 * @class Force
 * @uses EventHandler
 * @constructor
 */
function Force(force) {}

/**
 * Basic setter for options
 *
 * @method setOptions
 * @param options {Objects}
 */
Force.prototype.setOptions = function setOptions(options) {};

/**
 * Adds a force to a physics body's force accumulator.
 *
 * @method applyForce
 * @param targets {Array.Body} Array of bodies to apply a force to.
 */
Force.prototype.applyForce = function applyForce(targets) {};

/**
 * Getter for a force's potential energy.
 *
 * @method getEnergy
 * @return energy {Number}
 */
Force.prototype.getEnergy = function getEnergy() {};

module.exports = Force;
},{"../../core/EventHandler":7,"../../math/Vector":41}],65:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Force = _dereq_('./Force');
var Vector = _dereq_('../../math/Vector');

/**
 *  Repulsion is a force that repels (attracts) bodies away (towards)
 *    each other. A repulsion of negative strength is attractive.
 *
 *  @class Repulsion
 *  @constructor
 *  @extends Force
 *  @param {Object} options overwrites default options
 */
function Repulsion(options) {}

Repulsion.prototype = Object.create(Force.prototype);
Repulsion.prototype.constructor = Repulsion;
/**
 * @property Repulsion.DECAY_FUNCTIONS
 * @type Object
 * @protected
 * @static
 */
Repulsion.DECAY_FUNCTIONS = {

    /**
     * A linear decay function
     * @attribute LINEAR
     * @type Function
     * @param {Number} r distance from the source body
     * @param {Number} cutoff the effective radius of influence
     */
    LINEAR : function(r, cutoff) {
        return Math.max(1 - (1 / cutoff) * r, 0);
    },

    /**
     * A Morse potential decay function (http://en.wikipedia.org/wiki/Morse_potential)
     * @attribute MORSE
     * @type Function
     * @param {Number} r distance from the source body
     * @param {Number} cutoff the minimum radius of influence
     */
    MORSE : function(r, cutoff) {
        var r0 = (cutoff === 0) ? 100 : cutoff;
        var rShifted = r + r0 * (1 - Math.log(2)); //shift by x-intercept
        return Math.max(1 - Math.pow(1 - Math.exp(rShifted/r0 - 1), 2), 0);
    },

    /**
     * An inverse distance decay function
     * @attribute INVERSE
     * @type Function
     * @param {Number} r distance from the source body
     * @param {Number} cutoff a distance shift to avoid singularities
     */
    INVERSE : function(r, cutoff) {
        return 1 / (1 - cutoff + r);
    },

    /**
     * An inverse squared distance decay function
     * @attribute GRAVITY
     * @type Function
     * @param {Number} r distance from the source body
     * @param {Number} cutoff a distance shift to avoid singularities
     */
    GRAVITY : function(r, cutoff) {
        return 1 / (1 - cutoff + r*r);
    }
};

/**
 * @property Repulsion.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
Repulsion.DEFAULT_OPTIONS = {

    /**
     * The strength of the force
     *    Range : [0, 100]
     * @attribute strength
     * @type Number
     * @default 1
     */
    strength : 1,

    /**
     * The location of the force, if not another physics body
     *
     * @attribute anchor
     * @type Number
     * @default 0.01
     * @optional
     */
    anchor : undefined,

    /**
     * The range of the repulsive force
     * @attribute radii
     * @type Array
     * @default [0, Infinity]
     */
    range : [0, Infinity],

    /**
     * A normalization for the force to avoid singularities at the origin
     * @attribute cutoff
     * @type Number
     * @default 0
     */
    cutoff : 0,

    /**
     * The maximum magnitude of the force
     *    Range : [0, Infinity]
     * @attribute cap
     * @type Number
     * @default Infinity
     */
    cap : Infinity,

    /**
     * The type of decay the repulsive force should have
     * @attribute decayFunction
     * @type Function
     */
    decayFunction : Repulsion.DECAY_FUNCTIONS.GRAVITY
};

/*
 * Setter for options.
 *
 * @method setOptions
 * @param {Objects} options
 */
Repulsion.prototype.setOptions = function setOptions(options) {};

/**
 * Adds a drag force to a physics body's force accumulator.
 *
 * @method applyForce
 * @param targets {Array.Body}  Array of bodies to apply force to.
 * @param source {Body}         The source of the force
 */
Repulsion.prototype.applyForce = function applyForce(targets, source) {};

module.exports = Repulsion;
},{"../../math/Vector":41,"./Force":64}],66:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Drag = _dereq_('./Drag');

/**
 * Rotational drag is a force that opposes angular velocity.
 *   Attach it to a physics body to slow down its rotation.
 *
 * @class RotationalDrag
 * @constructor
 * @extends Force
 * @param {Object} options options to set on drag
 */
function RotationalDrag(options) {}

RotationalDrag.prototype = Object.create(Drag.prototype);
RotationalDrag.prototype.constructor = RotationalDrag;

RotationalDrag.DEFAULT_OPTIONS = Drag.DEFAULT_OPTIONS;
RotationalDrag.FORCE_FUNCTIONS = Drag.FORCE_FUNCTIONS;

/**
 * @property Repulsion.FORCE_FUNCTIONS
 * @type Object
 * @protected
 * @static
 */
RotationalDrag.FORCE_FUNCTIONS = {

    /**
     * A drag force proprtional to the angular velocity
     * @attribute LINEAR
     * @type Function
     * @param {Vector} angularVelocity
     * @return {Vector} drag force
     */
    LINEAR : function(angularVelocity) {
        return angularVelocity;
    },

    /**
     * A drag force proprtional to the square of the angular velocity
     * @attribute QUADRATIC
     * @type Function
     * @param {Vector} angularVelocity
     * @return {Vector} drag force
     */
    QUADRATIC : function(angularVelocity) {
        return angularVelocity.mult(angularVelocity.norm());
    }
};

/**
 * Adds a rotational drag force to a physics body's torque accumulator.
 *
 * @method applyForce
 * @param targets {Array.Body} Array of bodies to apply drag force to.
 */
RotationalDrag.prototype.applyForce = function applyForce(targets) {};

/*
 * Setter for options.
 *
 * @method setOptions
 * @param {Objects} options
 */
RotationalDrag.prototype.setOptions = function setOptions(options) {};

module.exports = RotationalDrag;
},{"./Drag":63}],67:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

//TODO: test inheritance
var Force = _dereq_('./Force');
var Spring = _dereq_('./Spring');
var Quaternion = _dereq_('../../math/Quaternion');

/**
 *  A force that rotates a physics body back to target Euler angles.
 *  Just as a spring translates a body to a particular X, Y, Z, location,
 *  a rotational spring rotates a body to a particular X, Y, Z Euler angle.
 *      Note: there is no physical agent that does this in the "real world"
 *
 *  @class RotationalSpring
 *  @constructor
 *  @extends Spring
 *  @param {Object} options options to set on drag
 */
function RotationalSpring(options) {}

RotationalSpring.prototype = Object.create(Spring.prototype);
RotationalSpring.prototype.constructor = RotationalSpring;

RotationalSpring.DEFAULT_OPTIONS = Spring.DEFAULT_OPTIONS;
RotationalSpring.FORCE_FUNCTIONS = Spring.FORCE_FUNCTIONS;

/** @const */
var pi = Math.PI;


RotationalSpring.prototype.setOptions = function setOptions(options) {};

/**
 * Adds a torque force to a physics body's torque accumulator.
 *
 * @method applyForce
 * @param targets {Array.Body} Array of bodies to apply torque to.
 */
RotationalSpring.prototype.applyForce = function applyForce(targets) {};
/**
 * Calculates the potential energy of the rotational spring.
 *
 * @method getEnergy
 * @param [targets] target The physics body attached to the spring
 */
RotationalSpring.prototype.getEnergy = function getEnergy(targets) {
    var options     = this.options;
    var restLength  = options.length;
    var anchor      = options.anchor;
    var strength    = options.stiffness;

    var energy = 0.0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.orientation).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};

module.exports = RotationalSpring;
},{"../../math/Quaternion":38,"./Force":64,"./Spring":68}],68:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

/*global console */

var Force = _dereq_('./Force');
var Vector = _dereq_('../../math/Vector');

/**
 *  A force that moves a physics body to a location with a spring motion.
 *    The body can be moved to another physics body, or an anchor point.
 *
 *  @class Spring
 *  @constructor
 *  @extends Force
 *  @param {Object} options options to set on drag
 */
function Spring(options) {}

Spring.prototype = Object.create(Force.prototype);
Spring.prototype.constructor = Spring;

/** @const */
var pi = Math.PI;
var MIN_PERIOD = 150;

/**
 * @property Spring.FORCE_FUNCTIONS
 * @type Object
 * @protected
 * @static
 */
Spring.FORCE_FUNCTIONS = {

    /**
     * A FENE (Finitely Extensible Nonlinear Elastic) spring force
     *      see: http://en.wikipedia.org/wiki/FENE
     * @attribute FENE
     * @type Function
     * @param {Number} dist current distance target is from source body
     * @param {Number} rMax maximum range of influence
     * @return {Number} unscaled force
     */
    FENE : function(dist, rMax) {
        var rMaxSmall = rMax * .99;
        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
        return r / (1 - r * r/(rMax * rMax));
    },

    /**
     * A Hookean spring force, linear in the displacement
     *      see: http://en.wikipedia.org/wiki/Hooke's_law
     * @attribute FENE
     * @type Function
     * @param {Number} dist current distance target is from source body
     * @return {Number} unscaled force
     */
    HOOK : function(dist) {
        return dist;
    }
};

/**
 * @property Spring.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
Spring.DEFAULT_OPTIONS = {

    /**
     * The amount of time in milliseconds taken for one complete oscillation
     * when there is no damping
     *    Range : [150, Infinity]
     * @attribute period
     * @type Number
     * @default 300
     */
    period : 300,

    /**
     * The damping of the spring.
     *    Range : [0, 1]
     *    0 = no damping, and the spring will oscillate forever
     *    1 = critically damped (the spring will never oscillate)
     * @attribute dampingRatio
     * @type Number
     * @default 0.1
     */
    dampingRatio : 0.1,

    /**
     * The rest length of the spring
     *    Range : [0, Infinity]
     * @attribute length
     * @type Number
     * @default 0
     */
    length : 0,

    /**
     * The maximum length of the spring (for a FENE spring)
     *    Range : [0, Infinity]
     * @attribute length
     * @type Number
     * @default Infinity
     */
    maxLength : Infinity,

    /**
     * The location of the spring's anchor, if not another physics body
     *
     * @attribute anchor
     * @type Array
     * @optional
     */
    anchor : undefined,

    /**
     * The type of spring force
     * @attribute forceFunction
     * @type Function
     */
    forceFunction : Spring.FORCE_FUNCTIONS.HOOK
};



/**
 * Basic options setter
 *
 * @method setOptions
 * @param options {Object}
 */
Spring.prototype.setOptions = function setOptions(options) {};

/**
 * Adds a spring force to a physics body's force accumulator.
 *
 * @method applyForce
 * @param targets {Array.Body} Array of bodies to apply force to.
 */
Spring.prototype.applyForce = function applyForce(targets, source) {};

/**
 * Calculates the potential energy of the spring.
 *
 * @method getEnergy
 * @param [targets] target  The physics body attached to the spring
 * @return {source}         The potential energy of the spring
 */
Spring.prototype.getEnergy = function getEnergy(targets, source) {};

module.exports = Spring;
},{"../../math/Vector":41,"./Force":64}],69:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Force = _dereq_('./Force');
var Vector = _dereq_('../../math/Vector');

/**
 *  A force that moves a physics body to a location with a spring motion.
 *    The body can be moved to another physics body, or an anchor point.
 *
 *  @class VectorField
 *  @constructor
 *  @extends Force
 *  @param {Object} options options to set on drag
 */
function VectorField(options) {}

VectorField.prototype = Object.create(Force.prototype);
VectorField.prototype.constructor = VectorField;

/**
 * @property Spring.FORCE_FUNCTIONS
 * @type Object
 * @protected
 * @static
 */
VectorField.FIELDS = {
    /**
     * Constant force, e.g., gravity
     * @attribute CONSTANT
     * @type Function
     * @param v {Vector}        Current position of physics body
     * @param options {Object}  The direction of the force
     *      Pass a {direction : Vector} into the VectorField options
     * @return {Number} unscaled force
     */
    CONSTANT : function(v, options) {
        options.direction.put(this.evaluation);
    },

    /**
     * Linear force
     * @attribute LINEAR
     * @type Function
     * @param v {Vector} Current position of physics body
     * @return {Vector} unscaled force
     */
    LINEAR : function(v) {
        v.put(this.evaluation);
    },

    /**
     * Radial force, e.g., Hookean spring
     * @attribute RADIAL
     * @type Function
     * @param v {Vector} Current position of physics body
     * @return {Vector} unscaled force
     */
    RADIAL : function(v) {
        v.mult(-1).put(this.evaluation);
    },

    /**
     * Point attractor force, e.g., Hookean spring with an anchor
     * @attribute POINT_ATTRACTOR
     * @type Function
     * @param v {Vector}        Current position of physics body
     * @param options {Object}  And object with the position of the attractor
     *      Pass a {position : Vector} into the VectorField options
     * @return {Vector} unscaled force
     */
    POINT_ATTRACTOR : function(v, options) {
        options.position.sub(v).put(this.evaluation);
    }
};

/**
 * @property VectorField.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
VectorField.DEFAULT_OPTIONS = {

    /**
     * The strength of the force
     *    Range : [0, 10]
     * @attribute strength
     * @type Number
     * @default .01
     */
    strength : .01,

    /**
     * Type of vectorfield
     *    Range : [0, 100]
     * @attribute field
     * @type Function
     */
    field : VectorField.FIELDS.CONSTANT
};

/**
 * Basic options setter
 *
 * @method setOptions
 * @param {Objects} options
 */
VectorField.prototype.setOptions = function setOptions(options) {};



/**
 * Adds the VectorField's force to a physics body's force accumulator.
 *
 * @method applyForce
 * @param targets {Array.body} Array of bodies to apply force to.
 */
VectorField.prototype.applyForce = function applyForce(targets) {};

VectorField.prototype.getEnergy = function getEnergy(targets) {};

module.exports = VectorField;
},{"../../math/Vector":41,"./Force":64}],70:[function(_dereq_,module,exports){
module.exports = {
  Drag: _dereq_('./Drag'),
  Force: _dereq_('./Force'),
  Repulsion: _dereq_('./Repulsion'),
  RotationalDrag: _dereq_('./RotationalDrag'),
  RotationalSpring: _dereq_('./RotationalSpring'),
  Spring: _dereq_('./Spring'),
  VectorField: _dereq_('./VectorField')
};

},{"./Drag":63,"./Force":64,"./Repulsion":65,"./RotationalDrag":66,"./RotationalSpring":67,"./Spring":68,"./VectorField":69}],71:[function(_dereq_,module,exports){
module.exports = {
  PhysicsEngine: _dereq_('./PhysicsEngine'),
  bodies: _dereq_('./bodies'),
  forces: _dereq_('./forces'),
  constraints: _dereq_('./constraints'),
  integrators: _dereq_('./integrators')
};

},{"./PhysicsEngine":48,"./bodies":53,"./constraints":62,"./forces":70,"./integrators":73}],72:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Ordinary Differential Equation (ODE) Integrator.
 * Manages updating a physics body's state over time.
 *
 *  p = position, v = velocity, m = mass, f = force, dt = change in time
 *
 *      v <- v + dt * f / m
 *      p <- p + dt * v
 *
 *  q = orientation, w = angular velocity, L = angular momentum
 *
 *      L <- L + dt * t
 *      q <- q + dt/2 * q * w
 *
 * @class SymplecticEuler
 * @constructor
 * @param {Object} options Options to set
 */
var SymplecticEuler = {};

/*
 * Updates the velocity of a physics body from its accumulated force.
 *      v <- v + dt * f / m
 *
 * @method integrateVelocity
 * @param {Body} physics body
 * @param {Number} dt delta time
 */
SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {};

/*
 * Updates the position of a physics body from its velocity.
 *      p <- p + dt * v
 *
 * @method integratePosition
 * @param {Body} physics body
 * @param {Number} dt delta time
 */
SymplecticEuler.integratePosition = function integratePosition(body, dt) {};

/*
 * Updates the angular momentum of a physics body from its accumuled torque.
 *      L <- L + dt * t
 *
 * @method integrateAngularMomentum
 * @param {Body} physics body (except a particle)
 * @param {Number} dt delta time
 */
SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;

    if (t.isZero()) return;

    L.add(t.mult(dt)).put(L);
    t.clear();
};

/*
 * Updates the orientation of a physics body from its angular velocity.
 *      q <- q + dt/2 * q * w
 *
 * @method integrateOrientation
 * @param {Body} physics body (except a particle)
 * @param {Number} dt delta time
 */
SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;

    if (w.isZero()) return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
//        q.normalize.put(q);
};

module.exports = SymplecticEuler;
},{}],73:[function(_dereq_,module,exports){
module.exports = {
  SymplecticEuler: _dereq_('./SymplecticEuler')
};

},{"./SymplecticEuler":72}],74:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');

/**
 * A surface containing an HTML5 Canvas element.
 *   This extends the Surface class.
 *
 * @class CanvasSurface
 * @extends Surface
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {Array.Number} [options.canvasSize] [width, height] for document element
 */
function CanvasSurface(options) {
    if (options && options.canvasSize) this._canvasSize = options.canvasSize;
    Surface.apply(this, arguments);
    if (!this._canvasSize) this._canvasSize = this.getSize();
    this._backBuffer = document.createElement('canvas');
    if (this._canvasSize) {
        this._backBuffer.width = this._canvasSize[0];
        this._backBuffer.height = this._canvasSize[1];
    }
    this._contextId = undefined;
}

CanvasSurface.prototype = Object.create(Surface.prototype);
CanvasSurface.prototype.constructor = CanvasSurface;
CanvasSurface.prototype.elementType = 'canvas';
CanvasSurface.prototype.elementClass = 'famous-surface';

/**
 * Set inner document content.  Note that this is a noop for CanvasSurface.
 *
 * @method setContent
 *
 */
CanvasSurface.prototype.setContent = function setContent() {};

/**
 * Place the document element this component manages into the document.
 *    This will draw the content to the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
CanvasSurface.prototype.deploy = function deploy(target) {
    if (this._canvasSize) {
        target.width = this._canvasSize[0];
        target.height = this._canvasSize[1];
    }
    if (this._contextId === '2d') {
        target.getContext(this._contextId).drawImage(this._backBuffer, 0, 0);
        this._backBuffer.width = 0;
        this._backBuffer.height = 0;
    }
};

/**
 * Remove this component and contained content from the document
 *
 * @private
 * @method recall
 *
 * @param {Node} target node to which the component was deployed
 */
CanvasSurface.prototype.recall = function recall(target) {
    var size = this.getSize();

    this._backBuffer.width = target.width;
    this._backBuffer.height = target.height;

    if (this._contextId === '2d') {
        this._backBuffer.getContext(this._contextId).drawImage(target, 0, 0);
        target.width = 0;
        target.height = 0;
    }
};

/**
 * Returns the canvas element's context
 *
 * @method getContext
 * @param {string} contextId context identifier
 */
CanvasSurface.prototype.getContext = function getContext(contextId) {
    this._contextId = contextId;
    return this._currentTarget ? this._currentTarget.getContext(contextId) : this._backBuffer.getContext(contextId);
};

/**
 *  Set the size of the surface and canvas element.
 *
 *  @method setSize
 *  @param {Array.number} size [width, height] of surface
 *  @param {Array.number} canvasSize [width, height] of canvas surface
 */
CanvasSurface.prototype.setSize = function setSize(size, canvasSize) {
    Surface.prototype.setSize.apply(this, arguments);
    if (canvasSize) this._canvasSize = [canvasSize[0], canvasSize[1]];
    if (this._currentTarget) {
        this._currentTarget.width = this._canvasSize[0];
        this._currentTarget.height = this._canvasSize[1];
    }
};

module.exports = CanvasSurface;
},{"../core/Surface":14}],75:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');
var Context = _dereq_('../core/Context');

/**
 * ContainerSurface is an object designed to contain surfaces and
 *   set properties to be applied to all of them at once.
 *   This extends the Surface class.
 *   A container surface will enforce these properties on the
 *   surfaces it contains:
 *
 *   size (clips contained surfaces to its own width and height);
 *
 *   origin;
 *
 *   its own opacity and transform, which will be automatically
 *   applied to  all Surfaces contained directly and indirectly.
 *
 * @class ContainerSurface
 * @extends Surface
 * @constructor
 * @param {Array.Number} [options.size] [width, height] in pixels
 * @param {Array.string} [options.classes] CSS classes to set on all inner content
 * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
 * @param {string} [options.content] inner (HTML) content of surface (should not be used)
 */
function ContainerSurface(options) {
    Surface.call(this, options);
    this._container = document.createElement('div');
    this._container.classList.add('famous-group');
    this._container.classList.add('famous-container-group');
    this._shouldRecalculateSize = false;
    this.context = new Context(this._container);
    this.setContent(this._container);
}

ContainerSurface.prototype = Object.create(Surface.prototype);
ContainerSurface.prototype.constructor = ContainerSurface;
ContainerSurface.prototype.elementType = 'div';
ContainerSurface.prototype.elementClass = 'famous-surface';

/**
 * Add renderables to this object's render tree
 *
 * @method add
 *
 * @param {Object} obj renderable object
 * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
 */
ContainerSurface.prototype.add = function add() {
    return this.context.add.apply(this.context, arguments);
};

/**
 * Return spec for this surface.  Note: Can result in a size recalculation.
 *
 * @private
 * @method render
 *
 * @return {Object} render spec for this surface (spec id)
 */
ContainerSurface.prototype.render = function render() {
    if (this._sizeDirty) this._shouldRecalculateSize = true;
    return Surface.prototype.render.apply(this, arguments);
};

/**
 * Place the document element this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
ContainerSurface.prototype.deploy = function deploy() {
    this._shouldRecalculateSize = true;
    return Surface.prototype.deploy.apply(this, arguments);
};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 * @param {Transform} transform unused TODO
 * @param {Number} opacity  unused TODO
 * @param {Array.Number} origin unused TODO
 * @param {Array.Number} size unused TODO
 * @return {undefined} TODO returns an undefined value
 */
ContainerSurface.prototype.commit = function commit(context, transform, opacity, origin, size) {
    var previousSize = this._size ? [this._size[0], this._size[1]] : null;
    var result = Surface.prototype.commit.apply(this, arguments);
    if (this._shouldRecalculateSize || (previousSize && (this._size[0] !== previousSize[0] || this._size[1] !== previousSize[1]))) {
        this.context.setSize();
        this._shouldRecalculateSize = false;
    }
    this.context.update();
    return result;
};

module.exports = ContainerSurface;
},{"../core/Context":1,"../core/Surface":14}],76:[function(_dereq_,module,exports){
var ContainerSurface = _dereq_('./ContainerSurface');

function FormContainerSurface(options) {
    if (options) this._method = options.method || '';
    ContainerSurface.apply(this, arguments);
}

FormContainerSurface.prototype = Object.create(ContainerSurface.prototype);
FormContainerSurface.prototype.constructor = FormContainerSurface;

FormContainerSurface.prototype.elementType = 'form';

FormContainerSurface.prototype.deploy = function deploy(target) {
    if (this._method) target.method = this._method;
    return ContainerSurface.prototype.deploy.apply(this, arguments);
};

module.exports = FormContainerSurface;
},{"./ContainerSurface":75}],77:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');

/**
 * A surface containing image content.
 *   This extends the Surface class.
 *
 * @class ImageSurface
 *
 * @extends Surface
 * @constructor
 * @param {Object} [options] overrides of default options
 */
function ImageSurface(options) {
    this._imageUrl = undefined;
    Surface.apply(this, arguments);
}

var urlCache = [];
var countCache = [];
var nodeCache = [];
var cacheEnabled = true;

ImageSurface.enableCache = function enableCache() {
    cacheEnabled = true;
};

ImageSurface.disableCache = function disableCache() {
    cacheEnabled = false;
};

ImageSurface.clearCache = function clearCache() {
    urlCache = [];
    countCache = [];
    nodeCache = [];
};

ImageSurface.getCache = function getCache() {
    return {
        urlCache: urlCache,
        countCache: countCache,
        nodeCache: countCache
    };
};

ImageSurface.prototype = Object.create(Surface.prototype);
ImageSurface.prototype.constructor = ImageSurface;
ImageSurface.prototype.elementType = 'img';
ImageSurface.prototype.elementClass = 'famous-surface';

/**
 * Set content URL.  This will cause a re-rendering.
 * @method setContent
 * @param {string} imageUrl
 */
ImageSurface.prototype.setContent = function setContent(imageUrl) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (urlIndex !== -1) {
        if (countCache[urlIndex] === 1) {
            urlCache.splice(urlIndex, 1);
            countCache.splice(urlIndex, 1);
            nodeCache.splice(urlIndex, 1);
        } else {
            countCache[urlIndex]--;
        }
    }

    urlIndex = urlCache.indexOf(imageUrl);
    if (urlIndex === -1) {
        urlCache.push(imageUrl);
        countCache.push(1);
    }
    else {
        countCache[urlIndex]++;
    }

    this._imageUrl = imageUrl;
    this._contentDirty = true;
};

/**
 * Place the document element that this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
ImageSurface.prototype.deploy = function deploy(target) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (nodeCache[urlIndex] === undefined && cacheEnabled) {
        var img = new Image();
        img.src = this._imageUrl || '';
        nodeCache[urlIndex] = img;
    }

    target.src = this._imageUrl || '';
};

/**
 * Remove this component and contained content from the document
 *
 * @private
 * @method recall
 *
 * @param {Node} target node to which the component was deployed
 */
ImageSurface.prototype.recall = function recall(target) {
    target.src = '';
};

module.exports = ImageSurface;
},{"../core/Surface":14}],78:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');

/**
 * A Famo.us surface in the form of an HTML input element.
 *   This extends the Surface class.
 *
 * @class InputSurface
 * @extends Surface
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {string} [options.placeholder] placeholder text hint that describes the expected value of an <input> element
 * @param {string} [options.type] specifies the type of element to display (e.g. 'datetime', 'text', 'button', etc.)
 * @param {string} [options.value] value of text
 */
function InputSurface(options) {
    this._placeholder = options.placeholder || '';
    this._value       = options.value || '';
    this._type        = options.type || 'text';
    this._name        = options.name || '';

    Surface.apply(this, arguments);

    this.on('click', this.focus.bind(this));
    window.addEventListener('click', function(event) {
        if (event.target !== this._currentTarget) this.blur();
    }.bind(this));
}
InputSurface.prototype = Object.create(Surface.prototype);
InputSurface.prototype.constructor = InputSurface;

InputSurface.prototype.elementType = 'input';
InputSurface.prototype.elementClass = 'famous-surface';

/**
 * Set placeholder text.  Note: Triggers a repaint.
 *
 * @method setPlaceholder
 * @param {string} str Value to set the placeholder to.
 * @return {InputSurface} this, allowing method chaining.
 */
InputSurface.prototype.setPlaceholder = function setPlaceholder(str) {
    this._placeholder = str;
    this._contentDirty = true;
    return this;
};

/**
 * Focus on the current input, pulling up the keyboard on mobile.
 *
 * @method focus
 * @return {InputSurface} this, allowing method chaining.
 */
InputSurface.prototype.focus = function focus() {
    if (this._currentTarget) this._currentTarget.focus();
    return this;
};

/**
 * Blur the current input, hiding the keyboard on mobile.
 *
 * @method blur
 * @return {InputSurface} this, allowing method chaining.
 */
InputSurface.prototype.blur = function blur() {
    if (this._currentTarget) this._currentTarget.blur();
    return this;
};

/**
 * Set the placeholder conent.
 *   Note: Triggers a repaint next tick.
 *
 * @method setValue
 * @param {string} str Value to set the main input value to.
 * @return {InputSurface} this, allowing method chaining.
 */
InputSurface.prototype.setValue = function setValue(str) {
    this._value = str;
    this._contentDirty = true;
    return this;
};

/**
 * Set the type of element to display conent.
 *   Note: Triggers a repaint next tick.
 *
 * @method setType
 * @param {string} str type of the input surface (e.g. 'button', 'text')
 * @return {InputSurface} this, allowing method chaining.
 */
InputSurface.prototype.setType = function setType(str) {
    this._type = str;
    this._contentDirty = true;
    return this;
};

/**
 * Get the value of the inner content of the element (e.g. the entered text)
 *
 * @method getValue
 * @return {string} value of element
 */
InputSurface.prototype.getValue = function getValue() {
    if (this._currentTarget) {
        return this._currentTarget.value;
    }
    else {
        return this._value;
    }
};

/**
 * Set the name attribute of the element.
 *   Note: Triggers a repaint next tick.
 *
 * @method setName
 * @param {string} str element name
 * @return {InputSurface} this, allowing method chaining.
 */
InputSurface.prototype.setName = function setName(str) {
    this._name = str;
    this._contentDirty = true;
    return this;
};

/**
 * Get the name attribute of the element.
 *
 * @method getName
 * @return {string} name of element
 */
InputSurface.prototype.getName = function getName() {
    return this._name;
};

/**
 * Place the document element this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
InputSurface.prototype.deploy = function deploy(target) {
    if (this._placeholder !== '') target.placeholder = this._placeholder;
    target.value = this._value;
    target.type = this._type;
    target.name = this._name;
};

module.exports = InputSurface;
},{"../core/Surface":14}],79:[function(_dereq_,module,exports){
var InputSurface = _dereq_('./InputSurface');

function SubmitInputSurface(options) {
    InputSurface.apply(this, arguments);
    this._type = 'submit';
    if (options && options.onClick) this.setOnClick(options.onClick);
}

SubmitInputSurface.prototype = Object.create(InputSurface.prototype);
SubmitInputSurface.prototype.constructor = SubmitInputSurface;

SubmitInputSurface.prototype.setOnClick = function(onClick) {
    this.onClick = onClick;
};

SubmitInputSurface.prototype.deploy = function deploy(target) {
    if (this.onclick) target.onClick = this.onClick;
    InputSurface.prototype.deploy.apply(this, arguments);
};

module.exports = SubmitInputSurface;
},{"./InputSurface":78}],80:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');

/**
 * A Famo.us surface in the form of an HTML textarea element.
 *   This extends the Surface class.
 *
 * @class TextareaSurface
 * @extends Surface
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {string} [options.placeholder] placeholder text hint that describes the expected value of an textarea element
 * @param {string} [options.value] value of text
 * @param {string} [options.name] specifies the name of textarea
 * @param {string} [options.wrap] specify 'hard' or 'soft' wrap for textarea
 * @param {number} [options.cols] number of columns in textarea
 * @param {number} [options.rows] number of rows in textarea
 */
function TextareaSurface(options) {
    this._placeholder = options.placeholder || '';
    this._value       = options.value || '';
    this._name        = options.name || '';
    this._wrap        = options.wrap || '';
    this._cols        = options.cols || '';
    this._rows        = options.rows || '';

    Surface.apply(this, arguments);
    this.on('click', this.focus.bind(this));
}
TextareaSurface.prototype = Object.create(Surface.prototype);
TextareaSurface.prototype.constructor = TextareaSurface;

TextareaSurface.prototype.elementType = 'textarea';
TextareaSurface.prototype.elementClass = 'famous-surface';

/**
 * Set placeholder text.  Note: Triggers a repaint.
 *
 * @method setPlaceholder
 * @param {string} str Value to set the placeholder to.
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.setPlaceholder = function setPlaceholder(str) {
    this._placeholder = str;
    this._contentDirty = true;
    return this;
};

/**
 * Focus on the current input, pulling up the keyboard on mobile.
 *
 * @method focus
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.focus = function focus() {
    if (this._currentTarget) this._currentTarget.focus();
    return this;
};

/**
 * Blur the current input, hiding the keyboard on mobile.
 *
 * @method focus
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.blur = function blur() {
    if (this._currentTarget) this._currentTarget.blur();
    return this;
};

/**
 * Set the value of textarea.
 *   Note: Triggers a repaint next tick.
 *
 * @method setValue
 * @param {string} str Value to set the main textarea value to.
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.setValue = function setValue(str) {
    this._value = str;
    this._contentDirty = true;
    return this;
};

/**
 * Get the value of the inner content of the textarea (e.g. the entered text)
 *
 * @method getValue
 * @return {string} value of element
 */
TextareaSurface.prototype.getValue = function getValue() {
    if (this._currentTarget) {
        return this._currentTarget.value;
    }
    else {
        return this._value;
    }
};

/**
 * Set the name attribute of the element.
 *   Note: Triggers a repaint next tick.
 *
 * @method setName
 * @param {string} str element name
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.setName = function setName(str) {
    this._name = str;
    this._contentDirty = true;
    return this;
};

/**
 * Get the name attribute of the element.
 *
 * @method getName
 * @return {string} name of element
 */
TextareaSurface.prototype.getName = function getName() {
    return this._name;
};

/**
 * Set the wrap of textarea.
 *   Note: Triggers a repaint next tick.
 *
 * @method setWrap
 * @param {string} str wrap of the textarea surface (e.g. 'soft', 'hard')
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.setWrap = function setWrap(str) {
    this._wrap = str;
    this._contentDirty = true;
    return this;
};

/**
 * Set the number of columns visible in the textarea.
 *   Note: Overridden by surface size; set width to true. (eg. size: [true, *])
 *         Triggers a repaint next tick.
 *
 * @method setColumns
 * @param {number} num columns in textarea surface
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.setColumns = function setColumns(num) {
    this._cols = num;
    this._contentDirty = true;
    return this;
};

/**
 * Set the number of rows visible in the textarea.
 *   Note: Overridden by surface size; set height to true. (eg. size: [*, true])
 *         Triggers a repaint next tick.
 *
 * @method setRows
 * @param {number} num rows in textarea surface
 * @return {TextareaSurface} this, allowing method chaining.
 */
TextareaSurface.prototype.setRows = function setRows(num) {
    this._rows = num;
    this._contentDirty = true;
    return this;
};

/**
 * Place the document element this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
TextareaSurface.prototype.deploy = function deploy(target) {
    if (this._placeholder !== '') target.placeholder = this._placeholder;
    if (this._value !== '') target.value = this._value;
    if (this._name !== '') target.name = this._name;
    if (this._wrap !== '') target.wrap = this._wrap;
    if (this._cols !== '') target.cols = this._cols;
    if (this._rows !== '') target.rows = this._rows;
};

module.exports = TextareaSurface;
},{"../core/Surface":14}],81:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');

/**
 * Creates a famous surface containing video content. Currently adding
 *   controls and manipulating the video are not supported through the
 *   surface interface, but can be accomplished via standard JavaScript
 *   manipulation of the video DOM element.
 *   This extends the Surface class.
 *
 * @class VideoSurface
 * @extends Surface
 * @constructor
 * @param {Object} [options] default option overrides
 * @param {Array.Number} [options.size] [width, height] in pixels
 * @param {Array.string} [options.classes] CSS classes to set on inner content
 * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
 * @param {String} [options.src] videoUrl URL
 * @param {boolean} [options.autoplay] autoplay
 */
function VideoSurface(options) {
    Surface.apply(this, arguments);
    this._videoUrl = undefined;
    this.options = Object.create(VideoSurface.DEFAULT_OPTIONS);
    if (options) this.setOptions(options);
}

VideoSurface.prototype = Object.create(Surface.prototype);
VideoSurface.prototype.constructor = VideoSurface;

VideoSurface.DEFAULT_OPTIONS = {
    autoplay: false
};

VideoSurface.prototype.elementType = 'video';
VideoSurface.prototype.elementClass = 'famous-surface';

/**
 * Set internal options, overriding any default options
 *
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Boolean} [options.autoplay] HTML autoplay
 */
VideoSurface.prototype.setOptions = function setOptions(options) {
    if (options.size) this.setSize(options.size);
    if (options.classes) this.setClasses(options.classes);
    if (options.properties) this.setProperties(options.properties);
    if (options.autoplay) this.options.autoplay = options.autoplay;
    if (options.src) {
        this._videoUrl = options.src;
        this._contentDirty = true;
    }
};

/**
 * Set url of the video.
 *
 * @method setContent
 * @param {string} videoUrl URL
 */
VideoSurface.prototype.setContent = function setContent(videoUrl) {
    this._videoUrl = videoUrl;
    this._contentDirty = true;
};

/**
 * Place the document element this component manages into the document.
 *   Note: In the case of VideoSurface, simply changes the options on the target.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
VideoSurface.prototype.deploy = function deploy(target) {
    target.src = this._videoUrl;
    target.autoplay = this.options.autoplay;
};

/**
 * Remove this component and contained content from the document.
 *   Note: This doesn't actually remove the <video> element from the
 *   document.
 * @private
 * @method recall
 *
 * @param {Node} target node to which the component was deployed
 */
VideoSurface.prototype.recall = function recall(target) {
    target.src = '';
};

module.exports = VideoSurface;
},{"../core/Surface":14}],82:[function(_dereq_,module,exports){
module.exports = {
  CanvasSurface: _dereq_('./CanvasSurface'),
  ContainerSurface: _dereq_('./ContainerSurface'),
  FormContainerSurface: _dereq_('./FormContainerSurface'),
  ImageSurface: _dereq_('./ImageSurface'),
  InputSurface: _dereq_('./InputSurface'),
  SubmitInputSurface: _dereq_('./SubmitInputSurface'),
  TextareaSurface: _dereq_('./TextareaSurface'),
  VideoSurface: _dereq_('./VideoSurface')
};

},{"./CanvasSurface":74,"./ContainerSurface":75,"./FormContainerSurface":76,"./ImageSurface":77,"./InputSurface":78,"./SubmitInputSurface":79,"./TextareaSurface":80,"./VideoSurface":81}],83:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * A simple in-memory object cache.  Used as a helper for Views with
 * provider functions.
 * @class CachedMap
 * @constructor
 */
function CachedMap(mappingFunction) {
    this._map = mappingFunction || null;
    this._cachedOutput = null;
    this._cachedInput = Number.NaN; //never valid as input
}

/**
 * Creates a mapping function with a cache.
 * This is the main entry point for this object.
 * @static
 * @method create
 * @param {function} mappingFunction mapping
 * @return {function} memorized mapping function
 */
CachedMap.create = function create(mappingFunction) {
    var instance = new CachedMap(mappingFunction);
    return instance.get.bind(instance);
};

/**
 * Retrieve items from cache or from mapping function.
 *
 * @method get
 * @param {Object} input input key
 */
CachedMap.prototype.get = function get(input) {
    if (input !== this._cachedInput) {
        this._cachedInput = input;
        this._cachedOutput = this._map(input);
    }
    return this._cachedOutput;
};

module.exports = CachedMap;
},{}],84:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * A library of curves which map an animation explicitly as a function of time.
 *
 * @class Easing
 */
var Easing = {

    /**
     * @property inQuad
     * @static
     */
    inQuad: function(t) {
        return t*t;
    },

    /**
     * @property outQuad
     * @static
     */
    outQuad: function(t) {
        return -(t-=1)*t+1;
    },

    /**
     * @property inOutQuad
     * @static
     */
    inOutQuad: function(t) {
        if ((t/=.5) < 1) return .5*t*t;
        return -.5*((--t)*(t-2) - 1);
    },

    /**
     * @property inCubic
     * @static
     */
    inCubic: function(t) {
        return t*t*t;
    },

    /**
     * @property outCubic
     * @static
     */
    outCubic: function(t) {
        return ((--t)*t*t + 1);
    },

    /**
     * @property inOutCubic
     * @static
     */
    inOutCubic: function(t) {
        if ((t/=.5) < 1) return .5*t*t*t;
        return .5*((t-=2)*t*t + 2);
    },

    /**
     * @property inQuart
     * @static
     */
    inQuart: function(t) {
        return t*t*t*t;
    },

    /**
     * @property outQuart
     * @static
     */
    outQuart: function(t) {
        return -((--t)*t*t*t - 1);
    },

    /**
     * @property inOutQuart
     * @static
     */
    inOutQuart: function(t) {
        if ((t/=.5) < 1) return .5*t*t*t*t;
        return -.5 * ((t-=2)*t*t*t - 2);
    },

    /**
     * @property inQuint
     * @static
     */
    inQuint: function(t) {
        return t*t*t*t*t;
    },

    /**
     * @property outQuint
     * @static
     */
    outQuint: function(t) {
        return ((--t)*t*t*t*t + 1);
    },

    /**
     * @property inOutQuint
     * @static
     */
    inOutQuint: function(t) {
        if ((t/=.5) < 1) return .5*t*t*t*t*t;
        return .5*((t-=2)*t*t*t*t + 2);
    },

    /**
     * @property inSine
     * @static
     */
    inSine: function(t) {
        return -1.0*Math.cos(t * (Math.PI/2)) + 1.0;
    },

    /**
     * @property outSine
     * @static
     */
    outSine: function(t) {
        return Math.sin(t * (Math.PI/2));
    },

    /**
     * @property inOutSine
     * @static
     */
    inOutSine: function(t) {
        return -.5*(Math.cos(Math.PI*t) - 1);
    },

    /**
     * @property inExpo
     * @static
     */
    inExpo: function(t) {
        return (t===0) ? 0.0 : Math.pow(2, 10 * (t - 1));
    },

    /**
     * @property outExpo
     * @static
     */
    outExpo: function(t) {
        return (t===1.0) ? 1.0 : (-Math.pow(2, -10 * t) + 1);
    },

    /**
     * @property inOutExpo
     * @static
     */
    inOutExpo: function(t) {
        if (t===0) return 0.0;
        if (t===1.0) return 1.0;
        if ((t/=.5) < 1) return .5 * Math.pow(2, 10 * (t - 1));
        return .5 * (-Math.pow(2, -10 * --t) + 2);
    },

    /**
     * @property inCirc
     * @static
     */
    inCirc: function(t) {
        return -(Math.sqrt(1 - t*t) - 1);
    },

    /**
     * @property outCirc
     * @static
     */
    outCirc: function(t) {
        return Math.sqrt(1 - (--t)*t);
    },

    /**
     * @property inOutCirc
     * @static
     */
    inOutCirc: function(t) {
        if ((t/=.5) < 1) return -.5 * (Math.sqrt(1 - t*t) - 1);
        return .5 * (Math.sqrt(1 - (t-=2)*t) + 1);
    },

    /**
     * @property inElastic
     * @static
     */
    inElastic: function(t) {
        var s=1.70158;var p=0;var a=1.0;
        if (t===0) return 0.0;  if (t===1) return 1.0;  if (!p) p=.3;
        s = p/(2*Math.PI) * Math.asin(1.0/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/ p));
    },

    /**
     * @property outElastic
     * @static
     */
    outElastic: function(t) {
        var s=1.70158;var p=0;var a=1.0;
        if (t===0) return 0.0;  if (t===1) return 1.0;  if (!p) p=.3;
        s = p/(2*Math.PI) * Math.asin(1.0/a);
        return a*Math.pow(2,-10*t) * Math.sin((t-s)*(2*Math.PI)/p) + 1.0;
    },

    /**
     * @property inOutElastic
     * @static
     */
    inOutElastic: function(t) {
        var s=1.70158;var p=0;var a=1.0;
        if (t===0) return 0.0;  if ((t/=.5)===2) return 1.0;  if (!p) p=(.3*1.5);
        s = p/(2*Math.PI) * Math.asin(1.0/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/p));
        return a*Math.pow(2,-10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/p)*.5 + 1.0;
    },

    /**
     * @property inBack
     * @static
     */
    inBack: function(t, s) {
        if (s === undefined) s = 1.70158;
        return t*t*((s+1)*t - s);
    },

    /**
     * @property outBack
     * @static
     */
    outBack: function(t, s) {
        if (s === undefined) s = 1.70158;
        return ((--t)*t*((s+1)*t + s) + 1);
    },

    /**
     * @property inOutBack
     * @static
     */
    inOutBack: function(t, s) {
        if (s === undefined) s = 1.70158;
        if ((t/=.5) < 1) return .5*(t*t*(((s*=(1.525))+1)*t - s));
        return .5*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
    },

    /**
     * @property inBounce
     * @static
     */
    inBounce: function(t) {
        return 1.0 - Easing.outBounce(1.0-t);
    },

    /**
     * @property outBounce
     * @static
     */
    outBounce: function(t) {
        if (t < (1/2.75)) {
            return (7.5625*t*t);
        } else if (t < (2/2.75)) {
            return (7.5625*(t-=(1.5/2.75))*t + .75);
        } else if (t < (2.5/2.75)) {
            return (7.5625*(t-=(2.25/2.75))*t + .9375);
        } else {
            return (7.5625*(t-=(2.625/2.75))*t + .984375);
        }
    },

    /**
     * @property inOutBounce
     * @static
     */
    inOutBounce: function(t) {
        if (t < .5) return Easing.inBounce(t*2) * .5;
        return Easing.outBounce(t*2-1.0) * .5 + .5;
    }
};

module.exports = Easing;
},{}],85:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Utility = _dereq_('../utilities/Utility');

/**
 * Transition meta-method to support transitioning multiple
 *   values with scalar-only methods.
 *
 *
 * @class MultipleTransition
 * @constructor
 *
 * @param {Object} method Transionable class to multiplex
 */
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}

MultipleTransition.SUPPORTS_MULTIPLE = true;

/**
 * Get the state of each transition.
 *
 * @method get
 *
 * @return state {Number|Array} state array
 */
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};

/**
 * Set the end states with a shared transition, with optional callback.
 *
 * @method set
 *
 * @param {Number|Array} endState Final State.  Use a multi-element argument for multiple transitions.
 * @param {Object} transition Transition definition, shared among all instances
 * @param {Function} callback called when all endStates have been reached.
 */
MultipleTransition.prototype.set = function set(endState, transition, callback) {};

/**
 * Reset all transitions to start state.
 *
 * @method reset
 *
 * @param  {Number|Array} startState Start state
 */
MultipleTransition.prototype.reset = function reset(startState) {};

module.exports = MultipleTransition;
},{"../utilities/Utility":95}],86:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var PE = _dereq_('../physics/PhysicsEngine');
var Particle = _dereq_('../physics/bodies/Particle');
var Spring = _dereq_('../physics/constraints/Snap');
var Vector = _dereq_('../math/Vector');

/**
 * SnapTransition is a method of transitioning between two values (numbers,
 * or arrays of numbers). It is similar to SpringTransition except
 * the transition can be much faster and always has a damping effect.
 *
 * @class SnapTransition
 * @constructor
 *
 * @param [state=0] {Number|Array} Initial state
 */
function SnapTransition(state) {}

SnapTransition.SUPPORTS_MULTIPLE = 3;

/**
 * @property SnapTransition.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
SnapTransition.DEFAULT_OPTIONS = {

    /**
     * The amount of time in milliseconds taken for one complete oscillation
     * when there is no damping
     *    Range : [0, Infinity]
     *
     * @attribute period
     * @type Number
     * @default 100
     */
    period : 100,

    /**
     * The damping of the snap.
     *    Range : [0, 1]
     *
     * @attribute dampingRatio
     * @type Number
     * @default 0.2
     */
    dampingRatio : 0.2,

    /**
     * The initial velocity of the transition.
     *
     * @attribute velocity
     * @type Number|Array
     * @default 0
     */
    velocity : 0
};

function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}

function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = (distance === 0)
        ? this._restTolerance
        : this._restTolerance * distance;
}

function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}

function _wake() {
    this.PE.wake();
}

function _sleep() {
    this.PE.sleep();
}

function _setParticlePosition(p) {
    this.particle.position.set(p);
}

function _setParticleVelocity(v) {
    this.particle.velocity.set(v);
}

function _getParticlePosition() {
    return (this._dimensions === 0)
        ? this.particle.getPosition1D()
        : this.particle.getPosition();
}

function _getParticleVelocity() {
    return (this._dimensions === 0)
        ? this.particle.getVelocity1D()
        : this.particle.getVelocity();
}

function _setCallback(callback) {
    this._callback = callback;
}

function _setupDefinition(definition) {
    var defaults = SnapTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)       definition.period       = defaults.period;
    if (definition.dampingRatio === undefined) definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)     definition.velocity     = defaults.velocity;

    //setup spring
    this.spring.setOptions({
        period       : definition.period,
        dampingRatio : definition.dampingRatio
    });

    //setup particle
    _setParticleVelocity.call(this, definition.velocity);
}

function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }

    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [0,0,0]);
        _sleep.call(this);
    }
}

/**
 * Resets the state and velocity
 *
 * @method reset
 *
 * @param state {Number|Array}      State
 * @param [velocity] {Number|Array} Velocity
 */
SnapTransition.prototype.reset = function reset(state, velocity) {};

/**
 * Getter for velocity
 *
 * @method getVelocity
 *
 * @return velocity {Number|Array}
 */
SnapTransition.prototype.getVelocity = function getVelocity() {};

/**
 * Setter for velocity
 *
 * @method setVelocity
 *
 * @return velocity {Number|Array}
 */
SnapTransition.prototype.setVelocity = function setVelocity(velocity) {};

/**
 * Detects whether a transition is in progress
 *
 * @method isActive
 *
 * @return {Boolean}
 */
SnapTransition.prototype.isActive = function isActive() {};

/**
 * Halt the transition
 *
 * @method halt
 */
SnapTransition.prototype.halt = function halt() {};

/**
 * Get the current position of the transition
s     *
 * @method get
 *
 * @return state {Number|Array}
 */
SnapTransition.prototype.get = function get() {};

/**
 * Set the end position and transition, with optional callback on completion.
 *
 * @method set
 *
 * @param state {Number|Array}      Final state
 * @param [definition] {Object}     Transition definition
 * @param [callback] {Function}     Callback
 */
SnapTransition.prototype.set = function set(state, definition, callback) {};

module.exports = SnapTransition;
},{"../math/Vector":41,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/constraints/Snap":58}],87:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

/*global console*/

var PE = _dereq_('../physics/PhysicsEngine');
var Particle = _dereq_('../physics/bodies/Particle');
var Spring = _dereq_('../physics/forces/Spring');
var Vector = _dereq_('../math/Vector');

/**
 * SpringTransition is a method of transitioning between two values (numbers,
 * or arrays of numbers) with a bounce. The transition will overshoot the target
 * state depending on the parameters of the transition.
 *
 * @class SpringTransition
 * @constructor
 *
 * @param {Number|Array} [state=0] Initial state
 */
function SpringTransition(state) {}

SpringTransition.SUPPORTS_MULTIPLE = 3;

/**
 * @property SpringTransition.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
SpringTransition.DEFAULT_OPTIONS = {

    /**
     * The amount of time in milliseconds taken for one complete oscillation
     * when there is no damping
     *    Range : [0, Infinity]
     *
     * @attribute period
     * @type Number
     * @default 300
     */
    period : 300,

    /**
     * The damping of the snap.
     *    Range : [0, 1]
     *    0 = no damping, and the spring will oscillate forever
     *    1 = critically damped (the spring will never oscillate)
     *
     * @attribute dampingRatio
     * @type Number
     * @default 0.5
     */
    dampingRatio : 0.5,

    /**
     * The initial velocity of the transition.
     *
     * @attribute velocity
     * @type Number|Array
     * @default 0
     */
    velocity : 0
};



/**
 * Resets the position and velocity
 *
 * @method reset
 *
 * @param {Number|Array.Number} pos positional state
 * @param {Number|Array} vel velocity
 */
SpringTransition.prototype.reset = function reset(pos, vel) {
    this._dimensions = (pos instanceof Array)
        ? pos.length
        : 0;

    this.initState.set(pos);
    _setParticlePosition.call(this, pos);
    _setTarget.call(this, pos);
    if (vel) _setParticleVelocity.call(this, vel);
    _setCallback.call(this, undefined);
};

/**
 * Getter for velocity
 *
 * @method getVelocity
 *
 * @return {Number|Array} velocity
 */
SpringTransition.prototype.getVelocity = function getVelocity() {};

/**
 * Setter for velocity
 *
 * @method setVelocity
 *
 * @return {Number|Array} velocity
 */
SpringTransition.prototype.setVelocity = function setVelocity(v) {};

/**
 * Detects whether a transition is in progress
 *
 * @method isActive
 *
 * @return {Boolean}
 */
SpringTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};

/**
 * Halt the transition
 *
 * @method halt
 */
SpringTransition.prototype.halt = function halt() {
    this.set(this.get());
};

/**
 * Get the current position of the transition
 *
 * @method get
 *
 * @return {Number|Array} state
 */
SpringTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};

/**
 * Set the end position and transition, with optional callback on completion.
 *
 * @method set
 *
 * @param  {Number|Array} endState Final state
 * @param {Object}  definition  Transition definition
 * @param  {Function} callback Callback
 */
SpringTransition.prototype.set = function set(endState, definition, callback) {
    if (!definition) {
        this.reset(endState);
        if (callback) callback();
        return;
    }

    this._dimensions = (endState instanceof Array)
        ? endState.length
        : 0;

    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, endState);
    _setCallback.call(this, callback);
};

module.exports = SpringTransition;
},{"../math/Vector":41,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/forces/Spring":68}],88:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var MultipleTransition = _dereq_('./MultipleTransition');
var TweenTransition = _dereq_('./TweenTransition');

/**
 * A state maintainer for a smooth transition between
 *    numerically-specified states. Example numeric states include floats or
 *    Transform objects.
 *
 * An initial state is set with the constructor or set(startState). A
 *    corresponding end state and transition are set with set(endState,
 *    transition). Subsequent calls to set(endState, transition) begin at
 *    the last state. Calls to get(timestamp) provide the interpolated state
 *    along the way.
 *
 * Note that there is no event loop here - calls to get() are the only way
 *    to find state projected to the current (or provided) time and are
 *    the only way to trigger callbacks. Usually this kind of object would
 *    be part of the render() path of a visible component.
 *
 * @class Transitionable
 * @constructor
 * @param {number|Array.Number|Object.<number|string, number>} start
 *    beginning state
 */
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];

    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;

    this.set(start);
}

var transitionMethods = {};

Transitionable.register = function register(methods) {
    var success = true;
    for (var method in methods) {
        if (!Transitionable.registerMethod(method, methods[method]))
            success = false;
    }
    return success;
};

Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    }
    else return false;
};

Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    }
    else return false;
};



/**
 * Add transition to end state to the queue of pending transitions. Special
 *    Use: calling without a transition resets the object to that state with
 *    no pending actions
 *
 * @method set
 *
 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endState
 *    end state to which we interpolate
 * @param {transition=} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {function()=} callback Zero-argument function to call on observed
 *    completion (t=1)
 */
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback) callback();
        return this;
    }

    var action = [endState, transition];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction) _loadNext.call(this);
    return this;
};

/**
 * Cancel all transitions and reset to a stable state
 *
 * @method reset
 *
 * @param {number|Array.Number|Object.<number, number>} startState
 *    stable state to set to
 */
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};

/**
 * Add delay action to the pending action queue queue.
 *
 * @method delay
 *
 * @param {number} duration delay time (ms)
 * @param {function} callback Zero-argument function to call on observed
 *    completion (t=1)
 */
Transitionable.prototype.delay = function delay(duration, callback) {
    this.set(this.get(), {duration: duration,
        curve: function() {
            return 0;
        }},
        callback
    );
};

/**
 * Get interpolated state of current action at provided time. If the last
 *    action has completed, invoke its callback.
 *
 * @method get
 *
 * @param {number=} timestamp Evaluate the curve at a normalized version of this
 *    time. If omitted, use current time. (Unix epoch time)
 * @return {number|Object.<number|string, number>} beginning state
 *    interpolated to this point in time.
 */
Transitionable.prototype.get = function get(timestamp) {};

/**
 * Is there at least one action pending completion?
 *
 * @method isActive
 *
 * @return {boolean}
 */
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};

/**
 * Halt transition at current state and erase all pending actions.
 *
 * @method halt
 */
Transitionable.prototype.halt = function halt() {
    return this.set(this.get());
};

module.exports = Transitionable;
},{"./MultipleTransition":85,"./TweenTransition":90}],89:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transitionable = _dereq_('./Transitionable');
var Transform = _dereq_('../core/Transform');
var Utility = _dereq_('../utilities/Utility');

/**
 * A class for transitioning the state of a Transform by transitioning
 * its translate, scale, skew and rotate components independently.
 *
 * @class TransitionableTransform
 * @constructor
 *
 * @param [transform=Transform.identity] {Transform} The initial transform state
 */
function TransitionableTransform(transform) {}



/**
 * An optimized way of setting only the translation component of a Transform
 *
 * @method setTranslate
 * @chainable
 *
 * @param translate {Array}     New translation state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {};

/**
 * An optimized way of setting only the scale component of a Transform
 *
 * @method setScale
 * @chainable
 *
 * @param scale {Array}         New scale state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {};

/**
 * An optimized way of setting only the rotational component of a Transform
 *
 * @method setRotate
 * @chainable
 *
 * @param eulerAngles {Array}   Euler angles for new rotation state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {};

/**
 * An optimized way of setting only the skew component of a Transform
 *
 * @method setSkew
 * @chainable
 *
 * @param skewAngles {Array}    New skew state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {};

/**
 * Setter for a TransitionableTransform with optional parameters to transition
 * between Transforms
 *
 * @method set
 * @chainable
 *
 * @param transform {Array}     New transform state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.set = function set(transform, transition, callback) {};

/**
 * Sets the default transition to use for transitioning betwen Transform states
 *
 * @method setDefaultTransition
 *
 * @param transition {Object} Transition definition
 */
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {};

/**
 * Getter. Returns the current state of the Transform
 *
 * @method get
 *
 * @return {Transform}
 */
TransitionableTransform.prototype.get = function get() {};

/**
 * Get the destination state of the Transform
 *
 * @method getFinal
 *
 * @return Transform {Transform}
 */
TransitionableTransform.prototype.getFinal = function getFinal() {};

/**
 * Determine if the TransitionalTransform is currently transitioning
 *
 * @method isActive
 *
 * @return {Boolean}
 */
TransitionableTransform.prototype.isActive = function isActive() {};

/**
 * Halts the transition
 *
 * @method halt
 */
TransitionableTransform.prototype.halt = function halt() {};

module.exports = TransitionableTransform;
},{"../core/Transform":15,"../utilities/Utility":95,"./Transitionable":88}],90:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 *
 * A state maintainer for a smooth transition between
 *    numerically-specified states.  Example numeric states include floats or
 *    Transfornm objects.
 *
 *    An initial state is set with the constructor or set(startValue). A
 *    corresponding end state and transition are set with set(endValue,
 *    transition). Subsequent calls to set(endValue, transition) begin at
 *    the last state. Calls to get(timestamp) provide the _interpolated state
 *    along the way.
 *
 *   Note that there is no event loop here - calls to get() are the only way
 *    to find out state projected to the current (or provided) time and are
 *    the only way to trigger callbacks. Usually this kind of object would
 *    be part of the render() path of a visible component.
 *
 * @class TweenTransition
 * @constructor
 *
 * @param {Object} options TODO
 *    beginning state
 */
function TweenTransition(options) {}

/**
 * Transition curves mapping independent variable t from domain [0,1] to a
 *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
 *    'easeInOut', 'easeOutBounce', 'spring'.
 *
 * @property {object} Curve
 * @final
 */
TweenTransition.Curves = {
    linear: function(t) {
        return t;
    },
    easeIn: function(t) {
        return t*t;
    },
    easeOut: function(t) {
        return t*(2-t);
    },
    easeInOut: function(t) {
        if (t <= 0.5) return 2*t*t;
        else return -2*t*t + 4*t - 1;
    },
    easeOutBounce: function(t) {
        return t*(3 - 2*t);
    },
    spring: function(t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};

TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0 /* considered only if positive */
};

var registeredCurves = {};

/**
 * Add "unit" curve to internal dictionary of registered curves.
 *
 * @method registerCurve
 *
 * @static
 *
 * @param {string} curveName dictionary key
 * @param {unitCurve} curve function of one numeric variable mapping [0,1]
 *    to range inside [0,1]
 * @return {boolean} false if key is taken, else true
 */
TweenTransition.registerCurve = function registerCurve(curveName, curve) {};

/**
 * Remove object with key "curveName" from internal dictionary of registered
 *    curves.
 *
 * @method unregisterCurve
 *
 * @static
 *
 * @param {string} curveName dictionary key
 * @return {boolean} false if key has no dictionary value
 */
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {};

/**
 * Retrieve function with key "curveName" from internal dictionary of
 *    registered curves. Default curves are defined in the
 *    TweenTransition.Curves array, where the values represent
 *    unitCurve functions.
 *
 * @method getCurve
 *
 * @static
 *
 * @param {string} curveName dictionary key
 * @return {unitCurve} curve function of one numeric variable mapping [0,1]
 *    to range inside [0,1]
 */
TweenTransition.getCurve = function getCurve(curveName) {};

/**
 * Retrieve all available curves.
 *
 * @method getCurves
 *
 * @static
 *
 * @return {object} curve functions of one numeric variable mapping [0,1]
 *    to range inside [0,1]
 */
TweenTransition.getCurves = function getCurves() {};





/**
 * Set internal options, overriding any default options.
 *
 * @method setOptions
 *
 *
 * @param {Object} options options object
 * @param {Object} [options.curve] function mapping [0,1] to [0,1] or identifier
 * @param {Number} [options.duration] duration in ms
 * @param {Number} [options.speed] speed in pixels per ms
 */
TweenTransition.prototype.setOptions = function setOptions(options) {};

/**
 * Add transition to end state to the queue of pending transitions. Special
 *    Use: calling without a transition resets the object to that state with
 *    no pending actions
 *
 * @method set
 *
 *
 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endValue
 *    end state to which we _interpolate
 * @param {transition=} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {function()=} callback Zero-argument function to call on observed
 *    completion (t=1)
 */
TweenTransition.prototype.set = function set(endValue, transition, callback) {};

/**
 * Cancel all transitions and reset to a stable state
 *
 * @method reset
 *
 * @param {number|Array.Number|Object.<number, number>} startValue
 *    starting state
 * @param {number} startVelocity
 *    starting velocity
 */
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {};

/**
 * Get current velocity
 *
 * @method getVelocity
 *
 * @returns {Number} velocity
 */
TweenTransition.prototype.getVelocity = function getVelocity() {};

/**
 * Get interpolated state of current action at provided time. If the last
 *    action has completed, invoke its callback.
 *
 * @method get
 *
 *
 * @param {number=} timestamp Evaluate the curve at a normalized version of this
 *    time. If omitted, use current time. (Unix epoch time)
 * @return {number|Object.<number|string, number>} beginning state
 *    _interpolated to this point in time.
 */
TweenTransition.prototype.get = function get(timestamp) {};



/**
 * Update internal state to the provided timestamp. This may invoke the last
 *    callback and begin a new action.
 *
 * @method update
 *
 *
 * @param {number=} timestamp Evaluate the curve at a normalized version of this
 *    time. If omitted, use current time. (Unix epoch time)
 */
TweenTransition.prototype.update = function update(timestamp) {};

/**
 * Is there at least one action pending completion?
 *
 * @method isActive
 *
 *
 * @return {boolean}
 */
TweenTransition.prototype.isActive = function isActive() {};

/**
 * Halt transition at current state and erase all pending actions.
 *
 * @method halt
 *
 */
TweenTransition.prototype.halt = function halt() {};

// Register all the default curves
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);

TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0; v2 = v2 || 0;
    return function(t) {
        return v1*t + (-2*v1 - v2 + 3)*t*t + (v1 + v2 - 2)*t*t*t;
    };
};

module.exports = TweenTransition;
},{}],91:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var PE = _dereq_('../physics/PhysicsEngine');
var Particle = _dereq_('../physics/bodies/Particle');
var Spring = _dereq_('../physics/forces/Spring');
var Wall = _dereq_('../physics/constraints/Wall');
var Vector = _dereq_('../math/Vector');

/**
 * WallTransition is a method of transitioning between two values (numbers,
 *   or arrays of numbers) with a bounce. Unlike a SpringTransition
 *   The transition will not overshoot the target, but bounce back against it.
 *   The behavior of the bounce is specified by the transition options.
 *
 * @class WallTransition
 * @constructor
 *
 * @param {Number|Array} [state=0] Initial state
 */
function WallTransition(state) {}

WallTransition.SUPPORTS_MULTIPLE = 3;

/**
 * @property WallTransition.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
WallTransition.DEFAULT_OPTIONS = {

    /**
     * The amount of time in milliseconds taken for one complete oscillation
     * when there is no damping
     *    Range : [0, Infinity]
     *
     * @attribute period
     * @type Number
     * @default 300
     */
    period : 300,

    /**
     * The damping of the snap.
     *    Range : [0, 1]
     *    0 = no damping, and the spring will oscillate forever
     *    1 = critically damped (the spring will never oscillate)
     *
     * @attribute dampingRatio
     * @type Number
     * @default 0.5
     */
    dampingRatio : 0.5,

    /**
     * The initial velocity of the transition.
     *
     * @attribute velocity
     * @type Number|Array
     * @default 0
     */
    velocity : 0,

    /**
     * The percentage of momentum transferred to the wall
     *
     * @attribute restitution
     * @type Number
     * @default 0.5
     */
    restitution : 0.5
};


/**
 * Resets the state and velocity
 *
 * @method reset
 *
 * @param {Number|Array}  state     State
 * @param  {Number|Array} [velocity] Velocity
 */
WallTransition.prototype.reset = function reset(state, velocity) {};

/**
 * Getter for velocity
 *
 * @method getVelocity
 *
 * @return velocity {Number|Array}
 */
WallTransition.prototype.getVelocity = function getVelocity() {};

/**
 * Setter for velocity
 *
 * @method setVelocity
 *
 * @return velocity {Number|Array}
 */
WallTransition.prototype.setVelocity = function setVelocity(velocity) {};

/**
 * Detects whether a transition is in progress
 *
 * @method isActive
 *
 * @return {Boolean}
 */
WallTransition.prototype.isActive = function isActive() {};

/**
 * Halt the transition
 *
 * @method halt
 */
WallTransition.prototype.halt = function halt() {};

/**
 * Getter
 *
 * @method get
 *
 * @return state {Number|Array}
 */
WallTransition.prototype.get = function get() {};

/**
 * Set the end position and transition, with optional callback on completion.
 *
 * @method set
 *
 * @param state {Number|Array}      Final state
 * @param [definition] {Object}     Transition definition
 * @param [callback] {Function}     Callback
 */
WallTransition.prototype.set = function set(state, definition, callback) {};

module.exports = WallTransition;
},{"../math/Vector":41,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/constraints/Wall":60,"../physics/forces/Spring":68}],92:[function(_dereq_,module,exports){
module.exports = {
  CachedMap: _dereq_('./CachedMap'),
  Easing: _dereq_('./Easing'),
  MultipleTransition: _dereq_('./MultipleTransition'),
  SnapTransition: _dereq_('./SnapTransition'),
  SpringTransition: _dereq_('./SpringTransition'),
  Transitionable: _dereq_('./Transitionable'),
  TransitionableTransform: _dereq_('./TransitionableTransform'),
  TweenTransition: _dereq_('./TweenTransition'),
  WallTransition: _dereq_('./WallTransition')
};

},{"./CachedMap":83,"./Easing":84,"./MultipleTransition":85,"./SnapTransition":86,"./SpringTransition":87,"./Transitionable":88,"./TransitionableTransform":89,"./TweenTransition":90,"./WallTransition":91}],93:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Collection to map keyboard codes in plain english
 *
 * @class KeyCodes
 * @static
 */
var KeyCodes = {
    0 : 48,
    1 : 49,
    2 : 50,
    3 : 51,
    4 : 52,
    5 : 53,
    6 : 54,
    7 : 55,
    8 : 56,
    9 : 57,
    a : 97,
    b : 98,
    c : 99,
    d : 100,
    e : 101,
    f : 102,
    g : 103,
    h : 104,
    i : 105,
    j : 106,
    k : 107,
    l : 108,
    m : 109,
    n : 110,
    o : 111,
    p : 112,
    q : 113,
    r : 114,
    s : 115,
    t : 116,
    u : 117,
    v : 118,
    w : 119,
    x : 120,
    y : 121,
    z : 122,
    A : 65,
    B : 66,
    C : 67,
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    H : 72,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    M : 77,
    N : 78,
    O : 79,
    P : 80,
    Q : 81,
    R : 82,
    S : 83,
    T : 84,
    U : 85,
    V : 86,
    W : 87,
    X : 88,
    Y : 89,
    Z : 90,
    ENTER : 13,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    SPACE: 32,
    SHIFT: 16,
    TAB: 9
};

module.exports = KeyCodes;
},{}],94:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
// TODO fix func-style
/*eslint func-style: [0, "declaration"] */

/**
 * An internal library to reproduce javascript time-based scheduling.
 *   Using standard javascript setTimeout methods can have a negative performance impact
 *   when combined with the Famous rendering process, so instead require Timer and call
 *   Timer.setTimeout, Timer.setInterval, etc.
 *
 * @class Timer
 * @constructor
 */
var FamousEngine = _dereq_('../core/Engine');

var _event  = 'prerender';

var getTime = (window.performance && window.performance.now) ?
    function() {
        return window.performance.now();
    }
    : function() {
        return Date.now();
    };

/**
 * Add a function to be run on every prerender
 *
 * @method addTimerFunction
 *
 * @param {function} fn function to be run every prerender
 *
 * @return {function} function passed in as parameter
 */
function addTimerFunction(fn) {}

/**
 * Wraps a function to be invoked after a certain amount of time.
 *  After a set duration has passed, it executes the function and
 *  removes it as a listener to 'prerender'.
 *
 * @method setTimeout
 *
 * @param {function} fn function to be run after a specified duration
 * @param {number} duration milliseconds from now to execute the function
 *
 * @return {function} function passed in as parameter
 */
function setTimeout(fn, duration) {}

/**
 * Wraps a function to be invoked after a certain amount of time.
 *  After a set duration has passed, it executes the function and
 *  resets the execution time.
 *
 * @method setInterval
 *
 * @param {function} fn function to be run after a specified duration
 * @param {number} duration interval to execute function in milliseconds
 *
 * @return {function} function passed in as parameter
 */
function setInterval(fn, duration) {}

/**
 * Wraps a function to be invoked after a certain amount of prerender ticks.
 *  Similar use to setTimeout but tied to the engine's run speed.
 *
 * @method after
 *
 * @param {function} fn function to be run after a specified amount of ticks
 * @param {number} numTicks number of prerender frames to wait
 *
 * @return {function} function passed in as parameter
 */
function after(fn, numTicks) {}

/**
 * Wraps a function to be continually invoked after a certain amount of prerender ticks.
 *  Similar use to setInterval but tied to the engine's run speed.
 *
 * @method every
 *
 * @param {function} fn function to be run after a specified amount of ticks
 * @param {number} numTicks number of prerender frames to wait
 *
 * @return {function} function passed in as parameter
 */
function every(fn, numTicks) {}

/**
 * Remove a function that gets called every prerender
 *
 * @method clear
 *
 * @param {function} fn event linstener
 */
function clear(fn) {}

/**
 * Executes a function after a certain amount of time. Makes sure
 *  the function is not run multiple times.
 *
 * @method debounce
 *
 * @param {function} func function to run after certain amount of time
 * @param {number} wait amount of time
 *
 * @return {function} function that is not able to debounce
 */
function debounce(func, wait) {}

module.exports = {
    setTimeout : setTimeout,
    setInterval : setInterval,
    debounce : debounce,
    after : after,
    every : every,
    clear : clear
};
},{"../core/Engine":4}],95:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * This namespace holds standalone functionality.
 *  Currently includes name mapping for transition curves,
 *  name mapping for origin pairs, and the after() function.
 *
 * @class Utility
 * @static
 */
var Utility = {};

/**
 * Table of direction array positions
 *
 * @property {object} Direction
 * @final
 */
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};

/**
 * Return wrapper around callback function. Once the wrapper is called N
 *   times, invoke the callback function. Arguments and scope preserved.
 *
 * @method after
 *
 * @param {number} count number of calls before callback function invoked
 * @param {Function} callback wrapped callback function
 *
 * @return {function} wrapped callback with coundown feature
 */
Utility.after = function after(count, callback) {};

/**
 * Load a URL and return its contents in a callback
 *
 * @method loadURL
 *
 * @param {string} url URL of object
 * @param {function} callback callback to dispatch with content
 */
Utility.loadURL = function loadURL(url, callback) {};

/**
 * Create a document fragment from a string of HTML
 *
 * @method createDocumentFragmentFromHTML
 *
 * @param {string} html HTML to convert to DocumentFragment
 *
 * @return {DocumentFragment} DocumentFragment representing input HTML
 */
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {};

/*
 *  Deep clone an object.
 *  @param b {Object} Object to clone
 *  @return a {Object} Cloned object.
 */
Utility.clone = function clone(b) {};

module.exports = Utility;
},{}],96:[function(_dereq_,module,exports){
module.exports = {
  KeyCodes: _dereq_('./KeyCodes'),
  Timer: _dereq_('./Timer'),
  Utility: _dereq_('./Utility')
};

},{"./KeyCodes":93,"./Timer":94,"./Utility":95}],97:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mike@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = _dereq_('../core/Entity');
var Transform = _dereq_('../core/Transform');
var EventHandler = _dereq_('../core/EventHandler');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * ContextualView is an interface for creating views that need to
 *   be aware of their parent's transform, size, and/or origin.
 *   Consists of a OptionsManager paired with an input EventHandler
 *   and an output EventHandler. Meant to be extended by the developer.
 * @class ContextualView
 * @constructor
 * @param {Options} [options] An object of configurable options.
 */
function ContextualView(options) {}

ContextualView.DEFAULT_OPTIONS = {};

/**
 * Patches the ContextualLayout instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the ContextualLayout instance.
 */
ContextualView.prototype.setOptions = function setOptions(options) {};

/**
 * Returns ContextualLayout instance's options.
 *
 * @method setOptions
 * @param {string} key
 * @return {Options} options The instance's object of configurable options.
 */
ContextualView.prototype.getOptions = function getOptions(key) {};

/**
 * Return the registers Entity id for the ContextualView.
 *
 * @private
 * @method render
 * @return {Number} Registered Entity id
 */
ContextualView.prototype.render = function render() {};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
ContextualView.prototype.commit = function commit(context) {};

module.exports = ContextualView;
},{"../core/Entity":5,"../core/EventHandler":7,"../core/OptionsManager":10,"../core/Transform":15}],98:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = _dereq_('../core/Transform');
var OptionsManager = _dereq_('../core/OptionsManager');
var Transitionable = _dereq_('../transitions/Transitionable');
var Utility = _dereq_('../utilities/Utility');
var SequentialLayout = _dereq_('./SequentialLayout');

/**
 * A Sequential Layout that can be opened and closed with animations.
 *
 *   Takes the same options as SequentialLayout
 *   as well as options for the open/close transition
 *   and the rotation you want your Deck instance to layout in.
 *
 * @class Deck
 * @constructor
 * @extends SequentialLayout
 *
 * @param {Options} [options] An object of configurable options
 * @param {Transition} [options.transition={duration: 500, curve: 'easeOutBounce'}
 *   The transition that executes upon opening or closing your deck instance.
 * @param {Number} [stackRotation=0] The amount of rotation applied to the propogation
 *   of the Deck instance's stack of renderables.
 * @param {Object} [options.transition] A transition object for changing between states.
 * @param {Number} [options.direction] axis of expansion (Utility.Direction.X or .Y)
 */
function Deck(options) {}
Deck.prototype = Object.create(SequentialLayout.prototype);
Deck.prototype.constructor = Deck;

Deck.DEFAULT_OPTIONS = OptionsManager.patch(SequentialLayout.DEFAULT_OPTIONS, {
    transition: {
        curve: 'easeOutBounce',
        duration: 500
    },
    stackRotation: 0
});

/**
 * Returns the width and the height of the Deck instance.
 *
 * @method getSize
 * @return {Array} A two value array of Deck's current width and height (in that order).
 *   Scales as Deck opens and closes.
 */
Deck.prototype.getSize = function getSize() {};



/**
 * An accesor method to find out if the messaged Deck instance is open or closed.
 *
 * @method isOpen
 * @return {Boolean} Returns true if the instance is open or false if it's closed.
 */
Deck.prototype.isOpen = function isOpen() {};

/**
 * Sets the Deck instance to an open state.
 *
 * @method open
 * @param {function} [callback] Executes after transitioning to a fully open state.
 */
Deck.prototype.open = function open(callback) {};

/**
 * Sets the Deck instance to an open state.
 *
 * @method close
 * @param {function} [callback] Executes after transitioning to a fully closed state.
 */
Deck.prototype.close = function close(callback) {};

/**
 * Sets the Deck instance from its current state to the opposite state.
 *
 * @method close
 * @param {function} [callback] Executes after transitioning to the toggled state.
 */
Deck.prototype.toggle = function toggle(callback) {};

module.exports = Deck;
},{"../core/OptionsManager":10,"../core/Transform":15,"../transitions/Transitionable":88,"../utilities/Utility":95,"./SequentialLayout":110}],99:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var RenderNode = _dereq_('../core/RenderNode');
var Transform = _dereq_('../core/Transform');
var OptionsManager = _dereq_('../core/OptionsManager');
var Transitionable = _dereq_('../transitions/Transitionable');
var EventHandler = _dereq_('../core/EventHandler');

/**
 * A layout which will arrange two renderables: a featured content, and a
 *   concealed drawer. The drawer can be revealed from any side of the
 *   content (left, top, right, bottom) by dragging the content.
 *
 *   A @link{Sync} must be piped in to recieve user input.
 *
 *   Events:
 *     broadcasts: 'open', 'close'
 *     listens to: 'update', 'end'
 *
 * @class DrawerLayout
 *
 * @constructor
 *
 * @param [options] {Object}                                An object of configurable options
 * @param [options.side=DrawerLayout.SIDES.LEFT] {Number}   The side of the content the drawer is placed.
 *                                                          Choice of DrawerLayout.SIDES.LEFT/RIGHT/TOP/BOTTOM
 * @param [options.drawerLength=0] {Number}                 The default length of the drawer
 * @param [options.velocityThreshold=0] {Number}            The velocity threshold to trigger a toggle
 * @param [options.positionThreshold=0] {Number}            The position threshold to trigger a toggle
 * @param [options.transition=true] {Boolean|Object}        The toggle transition
 */
function DrawerLayout(options) {}

var DIRECTION_X = 0;
var DIRECTION_Y = 1;

DrawerLayout.SIDES = {
    LEFT   : 0,
    TOP    : 1,
    RIGHT  : 2,
    BOTTOM : 3
};

DrawerLayout.DEFAULT_OPTIONS = {
    side: DrawerLayout.SIDES.LEFT,
    drawerLength : 0,
    velocityThreshold : 0,
    positionThreshold : 0,
    transition : true
};

/**
 * Patches the DrawerLayout instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param options {Object} options
 */
DrawerLayout.prototype.setOptions = function setOptions(options) {};

/**
 * Reveals the drawer with a transition
 *   Emits an 'open' event when an opening transition has been committed to.
 *
 * @method open
 * @param [transition] {Boolean|Object} transition definition
 * @param [callback] {Function}         callback
 */
DrawerLayout.prototype.open = function open(transition, callback) {};

/**
 * Conceals the drawer with a transition
 *   Emits a 'close' event when an closing transition has been committed to.
 *
 * @method close
 * @param [transition] {Boolean|Object} transition definition
 * @param [callback] {Function}         callback
 */
DrawerLayout.prototype.close = function close(transition, callback) {};

/**
 * Sets the position in pixels for the content's displacement
 *
 * @method setPosition
 * @param position {Number}             position
 * @param [transition] {Boolean|Object} transition definition
 * @param [callback] {Function}         callback
 */
DrawerLayout.prototype.setPosition = function setPosition(position, transition, callback) {};

/**
 * Gets the position in pixels for the content's displacement
 *
 * @method getPosition
 * @return position {Number} position
 */
DrawerLayout.prototype.getPosition = function getPosition() {};

/**
 * Sets the progress (between 0 and 1) for the content's displacement
 *
 * @method setProgress
 * @param progress {Number}             position
 * @param [transition] {Boolean|Object} transition definition
 * @param [callback] {Function}         callback
 */
DrawerLayout.prototype.setProgress = function setProgress(progress, transition, callback) {};

/**
 * Gets the progress (between 0 and 1) for the content's displacement
 *
 * @method getProgress
 * @return position {Number} position
 */
DrawerLayout.prototype.getProgress = function getProgress() {};

/**
 * Toggles between open and closed states
 *
 * @method toggle
 * @param [transition] {Boolean|Object} transition definition
 */
DrawerLayout.prototype.toggle = function toggle(transition) {};

/**
 * Resets to last state of being open or closed
 *
 * @method reset
 * @param [transition] {Boolean|Object} transition definition
 */
DrawerLayout.prototype.reset = function reset(transition) {};

/**
 * Returns if drawer is committed to being open or closed
 *
 * @method isOpen
 * @return {Boolean}
 */
DrawerLayout.prototype.isOpen = function isOpen(transition) {};

/**
 * Generates a Render Spec from the contents of this component
 *
 * @private
 * @method render
 * @return {Spec}
 */
DrawerLayout.prototype.render = function render() {};

module.exports = DrawerLayout;
},{"../core/EventHandler":7,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../transitions/Transitionable":88}],100:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var CachedMap = _dereq_('../transitions/CachedMap');
var Entity = _dereq_('../core/Entity');
var EventHandler = _dereq_('../core/EventHandler');
var Transform = _dereq_('../core/Transform');
var RenderController = _dereq_('./RenderController');

/**
 * Container which handles swapping renderables from the edge of its parent context.
 * @class EdgeSwapper
 * @constructor
 * @param {Options} [options] An object of configurable options.
 *   Takes the same options as RenderController.
 * @uses RenderController
 */
function EdgeSwapper(options) {}


/**
 * Displays the passed-in content with the EdgeSwapper instance's default transition.
 *
 * @method show
 * @param {Object} content The renderable you want to display.
 */
EdgeSwapper.prototype.show = function show(content) {};

/**
 * Patches the EdgeSwapper instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the Edgeswapper instance.
 */
EdgeSwapper.prototype.setOptions = function setOptions(options) {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
EdgeSwapper.prototype.render = function render() {};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
EdgeSwapper.prototype.commit = function commit(context) {};

module.exports = EdgeSwapper;
},{"../core/Entity":5,"../core/EventHandler":7,"../core/Transform":15,"../transitions/CachedMap":83,"./RenderController":106}],101:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mike@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = _dereq_('../core/Entity');
var Transform = _dereq_('../core/Transform');
var OptionsManager = _dereq_('../core/OptionsManager');
var EventHandler = _dereq_('../core/EventHandler');
var Transitionable = _dereq_('../transitions/Transitionable');

/**
 * A layout which divides a context into sections based on a proportion
 *   of the total sum of ratios.  FlexibleLayout can either lay renderables
 *   out vertically or horizontally.
 * @class FlexibleLayout
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Number} [options.direction=0] Direction the FlexibleLayout instance should lay out renderables.
 * @param {Transition} [options.transition=false] The transiton that controls the FlexibleLayout instance's reflow.
 * @param {Ratios} [options.ratios=[]] The proportions for the renderables to maintain
 */
function FlexibleLayout(options) {}

FlexibleLayout.DIRECTION_X = 0;
FlexibleLayout.DIRECTION_Y = 1;

FlexibleLayout.DEFAULT_OPTIONS = {
    direction: FlexibleLayout.DIRECTION_X,
    transition: false,
    ratios : []
};




/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {Object} Render spec for this component
 */
FlexibleLayout.prototype.render = function render() {};

/**
 * Patches the FlexibleLayouts instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the FlexibleLayout instance.
 */
FlexibleLayout.prototype.setOptions = function setOptions(options) {};

/**
 * Sets the collection of renderables under the FlexibleLayout instance's control.  Also sets
 * the associated ratio values for sizing the renderables if given.
 *
 * @method sequenceFrom
 * @param {Array} sequence An array of renderables.
 */
FlexibleLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {};

/**
 * Sets the associated ratio values for sizing the renderables.
 *
 * @method setRatios
 * @param {Array} ratios Array of ratios corresponding to the percentage sizes each renderable should be
 */
FlexibleLayout.prototype.setRatios = function setRatios(ratios, transition, callback) {};

/**
 * Gets the size of the context the FlexibleLayout exists within.
 *
 * @method getSize
 *
 * @return {Array} Size of the FlexibleLayout in pixels [width, height]
 */
FlexibleLayout.prototype.getSize = function getSize() {};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
FlexibleLayout.prototype.commit = function commit(context) {};

module.exports = FlexibleLayout;
},{"../core/Entity":5,"../core/EventHandler":7,"../core/OptionsManager":10,"../core/Transform":15,"../transitions/Transitionable":88}],102:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = _dereq_('../core/Transform');
var Transitionable = _dereq_('../transitions/Transitionable');
var RenderNode = _dereq_('../core/RenderNode');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * Allows you to link two renderables as front and back sides that can be
 *  'flipped' back and forth along a chosen axis. Rendering optimizations are
 *  automatically handled.
 *
 * @class Flipper
 * @constructor
 * @param {Options} [options] An object of options.
 * @param {Transition} [options.transition=true] The transition executed when flipping your Flipper instance.
 * @param {Direction} [options.direction=Flipper.DIRECTION_X] Direction specifies the axis of rotation.
 */
function Flipper(options) {}

Flipper.DIRECTION_X = 0;
Flipper.DIRECTION_Y = 1;

var SEPERATION_LENGTH = 1;

Flipper.DEFAULT_OPTIONS = {};

/**
 * Toggles the rotation between the front and back renderables
 *
 * @method flip
 * @param {Object} [transition] Transition definition
 * @param {Function} [callback] Callback
 */
Flipper.prototype.flip = function flip(transition, callback) {};

/**
 * Basic setter to the angle
 *
 * @method setAngle
 * @param {Number} angle
 * @param {Object} [transition] Transition definition
 * @param {Function} [callback] Callback
 */
Flipper.prototype.setAngle = function setAngle(angle, transition, callback) {};

/**
 * Patches the Flipper instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the Flipper instance.
 */
Flipper.prototype.setOptions = function setOptions(options) {};

/**
 * Adds the passed-in renderable to the view associated with the 'front' of the Flipper instance.
 *
 * @method setFront
 * @chainable
 * @param {Object} node The renderable you want to add to the front.
 */
Flipper.prototype.setFront = function setFront(node) {};

/**
 * Adds the passed-in renderable to the view associated with the 'back' of the Flipper instance.
 *
 * @method setBack
 * @chainable
 * @param {Object} node The renderable you want to add to the back.
 */
Flipper.prototype.setBack = function setBack(node) {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {Number} Render spec for this component
 */
Flipper.prototype.render = function render() {};

module.exports = Flipper;
},{"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../transitions/Transitionable":88}],103:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = _dereq_('../core/Entity');
var RenderNode = _dereq_('../core/RenderNode');
var Transform = _dereq_('../core/Transform');
var ViewSequence = _dereq_('../core/ViewSequence');
var EventHandler = _dereq_('../core/EventHandler');
var Modifier = _dereq_('../core/Modifier');
var OptionsManager = _dereq_('../core/OptionsManager');
var Transitionable = _dereq_('../transitions/Transitionable');
var TransitionableTransform = _dereq_('../transitions/TransitionableTransform');

/**
 * A layout which divides a context into several evenly-sized grid cells.
 *   If dimensions are provided, the grid is evenly subdivided with children
 *   cells representing their own context, otherwise the cellSize property is used to compute
 *   dimensions so that items of cellSize will fit.
 * @class GridLayout
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Array.Number} [options.dimensions=[1, 1]] A two value array which specifies the amount of columns
 * and rows in your Gridlayout instance.
 * @param {Array.Number} [options.gutterSize=[0, 0]] A two-value array which specifies size of the
 * horizontal and vertical gutters between items in the grid layout.
 * @param {Transition} [options.transition=false] The transiton that controls the Gridlayout instance's reflow.
 */
function GridLayout(options) {}

function _reflow(size, cols, rows) {}

function _createModifier(index, size, position, opacity) {}

function _animateModifier(index, size, position, opacity) {}

GridLayout.DEFAULT_OPTIONS = {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {Object} Render spec for this component
 */
GridLayout.prototype.render = function render() {};

/**
 * Patches the GridLayout instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the GridLayout instance.
 */
GridLayout.prototype.setOptions = function setOptions(options) {};

/**
 * Sets the collection of renderables under the Gridlayout instance's control.
 *
 * @method sequenceFrom
 * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
 */
GridLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {};

/**
 * Returns the size of the grid layout.
 *
 * @method getSize
 * @return {Array} Total size of the grid layout.
 */
GridLayout.prototype.getSize = function getSize() {};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
GridLayout.prototype.commit = function commit(context) {};

module.exports = GridLayout;
},{"../core/Entity":5,"../core/EventHandler":7,"../core/Modifier":9,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../core/ViewSequence":17,"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89}],104:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = _dereq_('../core/Entity');
var RenderNode = _dereq_('../core/RenderNode');
var Transform = _dereq_('../core/Transform');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * A layout which will arrange three renderables into a header and footer area of defined size,
  and a content area of flexible size.
 * @class HeaderFooterLayout
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Number} [options.direction=HeaderFooterLayout.DIRECTION_Y] A direction of HeaderFooterLayout.DIRECTION_X
 * lays your HeaderFooterLayout instance horizontally, and a direction of HeaderFooterLayout.DIRECTION_Y
 * lays it out vertically.
 * @param {Number} [options.headerSize=undefined]  The amount of pixels allocated to the header node
 * in the HeaderFooterLayout instance's direction.
 * @param {Number} [options.footerSize=undefined] The amount of pixels allocated to the footer node
 * in the HeaderFooterLayout instance's direction.
 */
function HeaderFooterLayout(options) {}

/**
 *  When used as a value for your HeaderFooterLayout's direction option, causes it to lay out horizontally.
 *
 *  @attribute DIRECTION_X
 *  @type Number
 *  @static
 *  @default 0
 *  @protected
 */
HeaderFooterLayout.DIRECTION_X = 0;

/**
 *  When used as a value for your HeaderFooterLayout's direction option, causes it to lay out vertically.
 *
 *  @attribute DIRECTION_Y
 *  @type Number
 *  @static
 *  @default 1
 *  @protected
 */
HeaderFooterLayout.DIRECTION_Y = 1;

HeaderFooterLayout.DEFAULT_OPTIONS = {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {Object} Render spec for this component
 */
HeaderFooterLayout.prototype.render = function render() {};

/**
 * Patches the HeaderFooterLayout instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the HeaderFooterLayout instance.
 */
HeaderFooterLayout.prototype.setOptions = function setOptions(options) {};

function _resolveNodeSize(node, defaultSize) {}

function _outputTransform(offset) {}

function _finalSize(directionSize, size) {}

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
HeaderFooterLayout.prototype.commit = function commit(context) {};

module.exports = HeaderFooterLayout;
},{"../core/Entity":5,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15}],105:[function(_dereq_,module,exports){
var Transform = _dereq_('../core/Transform');
var Modifier = _dereq_('../core/Modifier');
var RenderNode = _dereq_('../core/RenderNode');
var Utility = _dereq_('../utilities/Utility');
var OptionsManager = _dereq_('../core/OptionsManager');
var Transitionable = _dereq_('../transitions/Transitionable');
var TransitionableTransform = _dereq_('../transitions/TransitionableTransform');

/**
 * Lightbox, using transitions, shows and hides different renderables. Lightbox can essentially be
 * thought of as RenderController with a stateful implementation and interface.
 *
 * @class Lightbox
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Transform} [options.inTransform] The transform at the start of transitioning in a shown renderable.
 * @param {Transform} [options.outTransform] The transform at the end of transitioning out a renderable.
 * @param {Transform} [options.showTransform] The transform applied to your shown renderable in its state of equilibrium.
 * @param {Number} [options.inOpacity] A number between one and zero that defines the state of a shown renderables opacity upon initially
 * being transitioned in.
 * @param {Number} [options.outOpacity] A number between one and zero that defines the state of a shown renderables opacity upon being
 * fully transitioned out.
 * @param {Number} [options.showOpacity] A number between one and zero that defines the state of a shown renderables opacity
 * once succesfully transitioned in.
 * @param {Array<Number>} [options.inOrigin] A two value array of numbers between one and zero that defines the state of a shown renderables
 * origin upon intially being transitioned in.
 * @param {Array<Number>} [options.outOrigin] A two value array of numbers between one and zero that defines the state of a shown renderable
 * origin once fully hidden.
 * @param {Array<Number>} [options.showOrigin] A two value array of numbers between one and zero that defines the state of a shown renderables
 * origin upon succesfully being shown.
 * @param {Array<Number>} [options.inAlign] A two value array of numbers between one and zero that defines the state of a shown renderables
 * align upon intially being transitioned in.
 * @param {Array<Number>} [options.outAlign] A two value array of numbers between one and zero that defines the state of a shown renderable
 * align once fully hidden.
 * @param {Array<Number>} [options.showAlign] A two value array of numbers between one and zero that defines the state of a shown renderables
 * align upon succesfully being shown.
 * @param {Transition} [options.inTransition=true] The transition in charge of showing a renderable.
 * @param {Transition} [options.outTransition=true]  The transition in charge of removing your previous renderable when
 * you show a new one, or hiding your current renderable.
 * @param {Boolean} [options.overlap=false] When showing a new renderable, overlap determines if the
 *   out transition of the old one executes concurrently with the in transition of the new one,
  *  or synchronously beforehand.
 */
function Lightbox(options) {}

Lightbox.DEFAULT_OPTIONS = {};

/**
 * Patches the Lightbox instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the Lightbox instance.
 */
Lightbox.prototype.setOptions = function setOptions(options) {};

   /**
 * Show displays the targeted renderable with a transition and an optional callback to
 *  execute afterwards.
 * @method show
 * @param {Object} renderable The renderable you want to show.
 * @param {Transition} [transition] Overwrites the default transition in to display the
 * passed-in renderable.
 * @param {function} [callback] Executes after transitioning in the renderable.
 */
Lightbox.prototype.show = function show(renderable, transition, callback) {};

/**
 * Hide hides the currently displayed renderable with an out transition.
 * @method hide
 * @param {Transition} [transition] Overwrites the default transition in to hide the
 * currently controlled renderable.
 * @param {function} [callback] Executes after transitioning out the renderable.
 */
Lightbox.prototype.hide = function hide(transition, callback) {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
Lightbox.prototype.render = function render() {};

module.exports = Lightbox;
},{"../core/Modifier":9,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89,"../utilities/Utility":95}],106:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Modifier = _dereq_('../core/Modifier');
var RenderNode = _dereq_('../core/RenderNode');
var Transform = _dereq_('../core/Transform');
var Transitionable = _dereq_('../transitions/Transitionable');
var View = _dereq_('../core/View');

/**
 * A dynamic view that can show or hide different renderables with transitions.
 * @class RenderController
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Transition} [inTransition=true] The transition in charge of showing a renderable.
 * @param {Transition} [outTransition=true]  The transition in charge of removing your previous renderable when
 * you show a new one, or hiding your current renderable.
 * @param {Boolean} [overlap=true] When showing a new renderable, overlap determines if the
  out transition of the old one executes concurrently with the in transition of the new one,
   or synchronously beforehand.
 */
function RenderController(options) {}
RenderController.prototype = Object.create(View.prototype);
RenderController.prototype.constructor = RenderController;

RenderController.DEFAULT_OPTIONS = {};

RenderController.DefaultMap = {
    transform: function() {
        return Transform.identity;
    },
    opacity: function(progress) {
        return progress;
    },
    origin: null,
    align: null
};

function _mappedState(map, state) {}

/**
 * As your RenderController shows a new renderable, it executes a transition in. This transition in
 *  will affect a default interior state and modify it as you bring renderables in and out. However, if you want to control
 *  the transform, opacity, and origin state yourself, you may call certain methods (such as inTransformFrom) to obtain state from an outside source,
 *  that may either be a function or a Famous transitionable. inTransformFrom sets the accessor for the state of
 *  the transform used in transitioning in renderables.
 *
 * @method inTransformFrom
 * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
 * a transitionable that manages a full transform (a sixteen value array).
 * @chainable
 */
RenderController.prototype.inTransformFrom = function inTransformFrom(transform) {};

/**
 * inOpacityFrom sets the accessor for the state of the opacity used in transitioning in renderables.
 * @method inOpacityFrom
 * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
 * a transitionable that manages opacity (a number between zero and one).
 * @chainable
 */
RenderController.prototype.inOpacityFrom = function inOpacityFrom(opacity) {};

/**
 * inOriginFrom sets the accessor for the state of the origin used in transitioning in renderables.
 * @method inOriginFrom
 * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
 * a transitionable that manages origin (a two value array of numbers between zero and one).
 * @chainable
 */
RenderController.prototype.inOriginFrom = function inOriginFrom(origin) {};

/**
 * inAlignFrom sets the accessor for the state of the align used in transitioning in renderables.
 * @method inAlignFrom
 * @param {Function|Transitionable} align A function that returns an align from outside closure, or a
 * a transitionable that manages align (a two value array of numbers between zero and one).
 * @chainable
 */
RenderController.prototype.inAlignFrom = function inAlignFrom(align) {};

/**
 * outTransformFrom sets the accessor for the state of the transform used in transitioning out renderables.
 * @method outTransformFrom
 * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
 * a transitionable that manages a full transform (a sixteen value array).
 * @chainable
 */
RenderController.prototype.outTransformFrom = function outTransformFrom(transform) {};

/**
 * outOpacityFrom sets the accessor for the state of the opacity used in transitioning out renderables.
 * @method outOpacityFrom
 * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
 * a transitionable that manages opacity (a number between zero and one).
 * @chainable
 */
RenderController.prototype.outOpacityFrom = function outOpacityFrom(opacity) {};

/**
 * outOriginFrom sets the accessor for the state of the origin used in transitioning out renderables.
 * @method outOriginFrom
 * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
 * a transitionable that manages origin (a two value array of numbers between zero and one).
 * @chainable
 */
RenderController.prototype.outOriginFrom = function outOriginFrom(origin) {};

/**
 * outAlignFrom sets the accessor for the state of the align used in transitioning out renderables.
 * @method outAlignFrom
 * @param {Function|Transitionable} align A function that returns an align from outside closure, or a
 * a transitionable that manages align (a two value array of numbers between zero and one).
 * @chainable
 */
RenderController.prototype.outAlignFrom = function outAlignFrom(align) {};

/**
 * Show displays the targeted renderable with a transition and an optional callback to
 * execute afterwards.
 * @method show
 * @param {Object} renderable The renderable you want to show.
 * @param {Transition} [transition] Overwrites the default transition in to display the
 * passed-in renderable.
 * @param {function} [callback] Executes after transitioning in the renderable.
 * @chainable
 */
RenderController.prototype.show = function show(renderable, transition, callback) {};

/**
 * Hide hides the currently displayed renderable with an out transition.
 * @method hide
 * @param {Transition} [transition] Overwrites the default transition in to hide the
 * currently controlled renderable.
 * @param {function} [callback] Executes after transitioning out the renderable.
 * @chainable
 */
RenderController.prototype.hide = function hide(transition, callback) {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
RenderController.prototype.render = function render() {};

module.exports = RenderController;
},{"../core/Modifier":9,"../core/RenderNode":11,"../core/Transform":15,"../core/View":16,"../transitions/Transitionable":88}],107:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var ContainerSurface = _dereq_('../surfaces/ContainerSurface');
var EventHandler = _dereq_('../core/EventHandler');
var Scrollview = _dereq_('./Scrollview');
var Utility = _dereq_('../utilities/Utility');
var OptionsManager = _dereq_('../core/OptionsManager');

/**
 * A Container surface with a scrollview automatically added. The convenience of ScrollContainer lies in
 * being able to clip out portions of the associated scrollview that lie outside the bounding surface,
 * and in being able to move the scrollview more easily by applying modifiers to the parent container
 * surface.
 * @class ScrollContainer
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Options} [options.container=undefined] Options for the ScrollContainer instance's surface.
 * @param {Options} [options.scrollview={direction:Utility.Direction.X}]  Options for the ScrollContainer instance's scrollview.
 */
function ScrollContainer(options) {}

ScrollContainer.DEFAULT_OPTIONS = {};

/**
 * Patches the ScrollContainer instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the ScrollContainer instance.
 */
ScrollContainer.prototype.setOptions = function setOptions(options) {};

/**
 * Sets the collection of renderables under the ScrollContainer instance scrollview's control.
 *
 * @method sequenceFrom
 * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous ViewSequence.
 */
ScrollContainer.prototype.sequenceFrom = function sequenceFrom() {};

/**
 * Returns the width and the height of the ScrollContainer instance.
 *
 * @method getSize
 * @return {Array} A two value array of the ScrollContainer instance's current width and height (in that order).
 */
ScrollContainer.prototype.getSize = function getSize() {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
ScrollContainer.prototype.render = function render() {
    return this.container.render();
};

module.exports = ScrollContainer;
},{"../core/EventHandler":7,"../core/OptionsManager":10,"../surfaces/ContainerSurface":75,"../utilities/Utility":95,"./Scrollview":109}],108:[function(_dereq_,module,exports){
var Entity = _dereq_('../core/Entity');
var Group = _dereq_('../core/Group');
var OptionsManager = _dereq_('../core/OptionsManager');
var Transform = _dereq_('../core/Transform');
var Utility = _dereq_('../utilities/Utility');
var ViewSequence = _dereq_('../core/ViewSequence');
var EventHandler = _dereq_('../core/EventHandler');

/**
 * Scroller lays out a collection of renderables, and will browse through them based on
 * accessed position. Scroller also broadcasts an 'edgeHit' event, with a position property of the location of the edge,
 * when you've hit the 'edges' of it's renderable collection.
 * @class Scroller
 * @constructor
  * @event error
 * @param {Options} [options] An object of configurable options.
 * @param {Number} [options.direction=Utility.Direction.Y] Using the direction helper found in the famous Utility
 * module, this option will lay out the Scroller instance's renderables either horizontally
 * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y), so feel free
 * to just use integers as well.
 * @param {Number} [clipSize=undefined] The size of the area (in pixels) that Scroller will display content in.
 * @param {Number} [margin=undefined] The size of the area (in pixels) that Scroller will process renderables' associated calculations in.
 */
function Scroller(options) {}

Scroller.DEFAULT_OPTIONS = {
    direction: Utility.Direction.Y,
    margin: 0,
    clipSize: undefined,
    groupScroll: false
};

var EDGE_TOLERANCE = 0; //slop for detecting passing the edge

function _sizeForDir(size) {}

function _output(node, offset, target) {}

function _getClipSize() {}

/**
* Returns the cumulative size of the renderables in the view sequence
* @method getCumulativeSize
* @return {array} a two value array of the view sequence's cumulative size up to the index.
*/
Scroller.prototype.getCumulativeSize = function(index) {};

/**
 * Patches the Scroller instance's options with the passed-in ones.
 * @method setOptions
 * @param {Options} options An object of configurable options for the Scroller instance.
 */
Scroller.prototype.setOptions = function setOptions(options) {};

/**
 * Tells you if the Scroller instance is on an edge.
 * @method onEdge
 * @return {Boolean} Whether the Scroller instance is on an edge or not.
 */
Scroller.prototype.onEdge = function onEdge() {};

/**
 * Allows you to overwrite the way Scroller lays out it's renderables. Scroller will
 * pass an offset into the function. By default the Scroller instance just translates each node
 * in it's direction by the passed-in offset.
 * Scroller will translate each renderable down
 * @method outputFrom
 * @param {Function} fn A function that takes an offset and returns a transform.
 * @param {Function} [masterFn]
 */
Scroller.prototype.outputFrom = function outputFrom(fn, masterFn) {};

/**
 * The Scroller instance's method for reading from an external position. Scroller uses
 * the external position to actually scroll through it's renderables.
 * @method positionFrom
 * @param {Getter} position Can be either a function that returns a position,
 * or an object with a get method that returns a position.
 */
Scroller.prototype.positionFrom = function positionFrom(position) {};

/**
 * Sets the collection of renderables under the Scroller instance's control.
 *
 * @method sequenceFrom
 * @param node {Array|ViewSequence} Either an array of renderables or a Famous viewSequence.
 * @chainable
 */
Scroller.prototype.sequenceFrom = function sequenceFrom(node) {};

/**
 * Returns the width and the height of the Scroller instance.
 *
 * @method getSize
 * @return {Array} A two value array of the Scroller instance's current width and height (in that order).
 */
Scroller.prototype.getSize = function getSize(actual) {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
Scroller.prototype.render = function render() {};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
Scroller.prototype.commit = function commit(context) {};

function _innerRender() {}

module.exports = Scroller;
},{"../core/Entity":5,"../core/EventHandler":7,"../core/Group":8,"../core/OptionsManager":10,"../core/Transform":15,"../core/ViewSequence":17,"../utilities/Utility":95}],109:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var PhysicsEngine = _dereq_('../physics/PhysicsEngine');
var Particle = _dereq_('../physics/bodies/Particle');
var Drag = _dereq_('../physics/forces/Drag');
var Spring = _dereq_('../physics/forces/Spring');
var EventHandler = _dereq_('../core/EventHandler');
var OptionsManager = _dereq_('../core/OptionsManager');
var ViewSequence = _dereq_('../core/ViewSequence');
var Scroller = _dereq_('../views/Scroller');
var Utility = _dereq_('../utilities/Utility');
var GenericSync = _dereq_('../inputs/GenericSync');
var ScrollSync = _dereq_('../inputs/ScrollSync');
var TouchSync = _dereq_('../inputs/TouchSync');
GenericSync.register({scroll : ScrollSync, touch : TouchSync});

/** @const */
var TOLERANCE = 0.5;

/** @enum */
var SpringStates = {};

/** @enum */
var EdgeStates = {};

/**
 * Scrollview will lay out a collection of renderables sequentially in the specified direction, and will
 * allow you to scroll through them with mousewheel or touch events.
 * @class Scrollview
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Number} [options.direction=Utility.Direction.Y] Using the direction helper found in the famous Utility
 * module, this option will lay out the Scrollview instance's renderables either horizontally
 * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y), so feel free
 * to just use integers as well.
 * @param {Boolean} [options.rails=true] When true, Scrollview's genericSync will only process input in it's primary access.
 * @param {Number} [clipSize=undefined] The size of the area (in pixels) that Scrollview will display content in.
 * @param {Number} [margin=undefined] The size of the area (in pixels) that Scrollview will process renderables' associated calculations in.
 * @param {Number} [friction=0.001] Input resistance proportional to the velocity of the input.
 * Controls the feel of the Scrollview instance at low velocities.
 * @param {Number} [drag=0.0001] Input resistance proportional to the square of the velocity of the input.
 * Affects Scrollview instance more prominently at high velocities.
 * @param {Number} [edgeGrip=0.5] A coefficient for resistance against after-touch momentum.
 * @param {Number} [egePeriod=300] Sets the period on the spring that handles the physics associated
 * with hitting the end of a scrollview.
 * @param {Number} [edgeDamp=1] Sets the damping on the spring that handles the physics associated
 * with hitting the end of a scrollview.
 * @param {Boolean} [paginated=false] A paginated scrollview will scroll through items discretely
 * rather than continously.
 * @param {Number} [pagePeriod=500] Sets the period on the spring that handles the physics associated
 * with pagination.
 * @param {Number} [pageDamp=0.8] Sets the damping on the spring that handles the physics associated
 * with pagination.
 * @param {Number} [pageStopSpeed=Infinity] The threshold for determining the amount of velocity
 * required to trigger pagination. The lower the threshold, the easier it is to scroll continuosly.
 * @param {Number} [pageSwitchSpeed=1] The threshold for momentum-based velocity pagination.
 * @param {Number} [speedLimit=10] The highest scrolling speed you can reach.
 */
function Scrollview(options) {}

Scrollview.DEFAULT_OPTIONS = {
    direction: Utility.Direction.Y,
    rails: true,
    friction: 0.005,
    drag: 0.0001,
    edgeGrip: 0.2,
    edgePeriod: 300,
    edgeDamp: 1,
    margin: 1000,       // mostly safe
    paginated: false,
    pagePeriod: 500,
    pageDamp: 0.8,
    pageStopSpeed: 10,
    pageSwitchSpeed: 0.5,
    speedLimit: 5,
    groupScroll: false,
    syncScale: 1
};

function _handleStart(event) {}

function _handleMove(event) {}

function _handleEnd(event) {}

function _bindEvents() {}

function _attachAgents() {}

function _detachAgents() {}

function _nodeSizeForDirection(node) {}

function _handleEdge(edge) {}

function _handlePagination() {}

function _setSpring(position, springState) {}

function _normalizeState() {}

function _shiftOrigin(amount) {}

/**
 * Returns the index of the first visible renderable
 *
 * @method getCurrentIndex
 * @return {Number} The current index of the ViewSequence
 */
Scrollview.prototype.getCurrentIndex = function getCurrentIndex() {};

/**
 * goToPreviousPage paginates your Scrollview instance backwards by one item.
 *
 * @method goToPreviousPage
 * @return {ViewSequence} The previous node.
 */
Scrollview.prototype.goToPreviousPage = function goToPreviousPage() {};

/**
 * goToNextPage paginates your Scrollview instance forwards by one item.
 *
 * @method goToNextPage
 * @return {ViewSequence} The next node.
 */
Scrollview.prototype.goToNextPage = function goToNextPage() {};

/**
 * Paginates the Scrollview to an absolute page index.
 *
 * @method goToPage
 */
Scrollview.prototype.goToPage = function goToPage(index) {};

Scrollview.prototype.outputFrom = function outputFrom() {};

/**
 * Returns the position associated with the Scrollview instance's current node
 *  (generally the node currently at the top).
 *
 * @deprecated
 * @method getPosition
 * @param {number} [node] If specified, returns the position of the node at that index in the
 * Scrollview instance's currently managed collection.
 * @return {number} The position of either the specified node, or the Scrollview's current Node,
 * in pixels translated.
 */
Scrollview.prototype.getPosition = function getPosition() {};

/**
 * Returns the absolute position associated with the Scrollview instance
 *
 * @method getAbsolutePosition
 * @return {number} The position of the Scrollview's current Node,
 * in pixels translated.
 */
Scrollview.prototype.getAbsolutePosition = function getAbsolutePosition() {};

/**
 * Returns the offset associated with the Scrollview instance's current node
 *  (generally the node currently at the top).
 *
 * @method getOffset
 * @param {number} [node] If specified, returns the position of the node at that index in the
 * Scrollview instance's currently managed collection.
 * @return {number} The position of either the specified node, or the Scrollview's current Node,
 * in pixels translated.
 */
Scrollview.prototype.getOffset = Scrollview.prototype.getPosition;

/**
 * Sets the position of the physics particle that controls Scrollview instance's "position"
 *
 * @deprecated
 * @method setPosition
 * @param {number} x The amount of pixels you want your scrollview to progress by.
 */
Scrollview.prototype.setPosition = function setPosition(x) {};

/**
 * Sets the offset of the physics particle that controls Scrollview instance's "position"
 *
 * @method setPosition
 * @param {number} x The amount of pixels you want your scrollview to progress by.
 */
Scrollview.prototype.setOffset = Scrollview.prototype.setPosition;

/**
 * Returns the Scrollview instance's velocity.
 *
 * @method getVelocity
 * @return {Number} The velocity.
 */

Scrollview.prototype.getVelocity = function getVelocity() {};

/**
 * Sets the Scrollview instance's velocity. Until affected by input or another call of setVelocity
 *  the Scrollview instance will scroll at the passed-in velocity.
 *
 * @method setVelocity
 * @param {number} v The magnitude of the velocity.
 */
Scrollview.prototype.setVelocity = function setVelocity(v) {};

/**
 * Patches the Scrollview instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the Scrollview instance.
 */
Scrollview.prototype.setOptions = function setOptions(options) {};

/**
 * Sets the collection of renderables under the Scrollview instance's control, by
 *  setting its current node to the passed in ViewSequence. If you
 *  pass in an array, the Scrollview instance will set its node as a ViewSequence instantiated with
 *  the passed-in array.
 *
 * @method sequenceFrom
 * @param {Array|ViewSequence} node Either an array of renderables or a Famous viewSequence.
 */
Scrollview.prototype.sequenceFrom = function sequenceFrom(node) {};

/**
 * Returns the width and the height of the Scrollview instance.
 *
 * @method getSize
 * @return {Array} A two value array of the Scrollview instance's current width and height (in that order).
 */
Scrollview.prototype.getSize = function getSize() {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
Scrollview.prototype.render = function render() {};

module.exports = Scrollview;
},{"../core/EventHandler":7,"../core/OptionsManager":10,"../core/ViewSequence":17,"../inputs/GenericSync":27,"../inputs/ScrollSync":32,"../inputs/TouchSync":33,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/forces/Drag":63,"../physics/forces/Spring":68,"../utilities/Utility":95,"../views/Scroller":108}],110:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var OptionsManager = _dereq_('../core/OptionsManager');
var Entity = _dereq_('../core/Entity');
var Transform = _dereq_('../core/Transform');
var ViewSequence = _dereq_('../core/ViewSequence');
var Utility = _dereq_('../utilities/Utility');

/**
 * SequentialLayout will lay out a collection of renderables sequentially in the specified direction.
 * @class SequentialLayout
 * @constructor
 * @param {Options} [options] An object of configurable options.
 * @param {Number} [options.direction=Utility.Direction.Y] Using the direction helper found in the famous Utility
 * module, this option will lay out the SequentialLayout instance's renderables either horizontally
 * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y), so feel free
 * to just use integers as well.
 */
function SequentialLayout(options) {}

SequentialLayout.DEFAULT_OPTIONS = {};

SequentialLayout.DEFAULT_OUTPUT_FUNCTION = function DEFAULT_OUTPUT_FUNCTION(input, offset, index) {};

/**
 * Returns the width and the height of the SequentialLayout instance.
 *
 * @method getSize
 * @return {Array} A two value array of the SequentialLayout instance's current width and height (in that order).
 */
SequentialLayout.prototype.getSize = function getSize() {};

/**
 * Sets the collection of renderables under the SequentialLayout instance's control.
 *
 * @method sequenceFrom
 * @param {Array|ViewSequence} items Either an array of renderables or a Famous viewSequence.
 * @chainable
 */
SequentialLayout.prototype.sequenceFrom = function sequenceFrom(items) {};

/**
 * Patches the SequentialLayout instance's options with the passed-in ones.
 *
 * @method setOptions
 * @param {Options} options An object of configurable options for the SequentialLayout instance.
 * @chainable
 */
SequentialLayout.prototype.setOptions = function setOptions(options) {};

/**
 * setOutputFunction is used to apply a user-defined output transform on each processed renderable.
 *  For a good example, check out SequentialLayout's own DEFAULT_OUTPUT_FUNCTION in the code.
 *
 * @method setOutputFunction
 * @param {Function} outputFunction An output processer for each renderable in the SequentialLayout
 * instance.
 * @chainable
 */
SequentialLayout.prototype.setOutputFunction = function setOutputFunction(outputFunction) {};

/**
 * Return the id of the component
 *
 * @private
 * @method render
 * @return {number} id of the SequentialLayout
 */
SequentialLayout.prototype.render = function render() {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method commit
 * @param {Object} parentSpec parent render spec
 * @return {Object} Render spec for this component
 */
SequentialLayout.prototype.commit = function commit(parentSpec) {};

module.exports = SequentialLayout;
},{"../core/Entity":5,"../core/OptionsManager":10,"../core/Transform":15,"../core/ViewSequence":17,"../utilities/Utility":95}],111:[function(_dereq_,module,exports){
module.exports = {
  ContextualView: _dereq_('./ContextualView'),
  Deck: _dereq_('./Deck'),
  DrawerLayout: _dereq_('./DrawerLayout'),
  EdgeSwapper: _dereq_('./EdgeSwapper'),
  FlexibleLayout: _dereq_('./FlexibleLayout'),
  Flipper: _dereq_('./Flipper'),
  GridLayout: _dereq_('./GridLayout'),
  HeaderFooterLayout: _dereq_('./HeaderFooterLayout'),
  Lightbox: _dereq_('./Lightbox'),
  RenderController: _dereq_('./RenderController'),
  ScrollContainer: _dereq_('./ScrollContainer'),
  Scroller: _dereq_('./Scroller'),
  Scrollview: _dereq_('./Scrollview'),
  SequentialLayout: _dereq_('./SequentialLayout')
};

},{"./ContextualView":97,"./Deck":98,"./DrawerLayout":99,"./EdgeSwapper":100,"./FlexibleLayout":101,"./Flipper":102,"./GridLayout":103,"./HeaderFooterLayout":104,"./Lightbox":105,"./RenderController":106,"./ScrollContainer":107,"./Scroller":108,"./Scrollview":109,"./SequentialLayout":110}],112:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Scene = _dereq_('../core/Scene');
var Surface = _dereq_('../core/Surface');
var Transform = _dereq_('../core/Transform');
var View = _dereq_('../core/View');

/**
 * A view for displaying the title of the current page
 *  as well as icons for navigating backwards and opening
 *  further options
 *
 * @class NavigationBar
 * @extends View
 * @constructor
 *
 * @param {object} [options] overrides of default options
 * @param {Array.number} [options.size=(undefined,0.5)] Size of the navigation bar and it's componenets.
 * @param {Array.string} [options.backClasses=(back)] CSS Classes attached to back of Navigation.
 * @param {String} [options.backContent=(&#x25c0;)] Content of the back button.
 * @param {Array.string} [options.classes=(navigation)] CSS Classes attached to the surfaces.
 * @param {String} [options.content] Content to pass into title bar.
 * @param {Array.string} [options.classes=(more)] CSS Classes attached to the More surface.
 * @param {String} [options.moreContent=(&#x271a;)] Content of the more button.
 */
function NavigationBar(options) {}

NavigationBar.prototype = Object.create(View.prototype);
NavigationBar.prototype.constructor = NavigationBar;

NavigationBar.DEFAULT_OPTIONS = {
    size: [undefined, 50],
    backClasses: ['back'],
    backContent: '&#x25c0;',
    classes: ['navigation'],
    content: '',
    moreClasses: ['more'],
    moreContent: '&#x271a;'
};

/**
 * Set the title of the NavigationBar
 *
 * @method setContent
 *
 * @param {object} content JSON object containing title information
 *
 * @return {undefined}
 */
NavigationBar.prototype.setContent = function setContent(content) {
    return this.title.setContent(content);
};

module.exports = NavigationBar;
},{"../core/Scene":12,"../core/Surface":14,"../core/Transform":15,"../core/View":16}],113:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');
var CanvasSurface = _dereq_('../surfaces/CanvasSurface');
var Transform = _dereq_('../core/Transform');
var EventHandler = _dereq_('../core/EventHandler');
var Utilities = _dereq_('../math/Utilities');
var OptionsManager = _dereq_('../core/OptionsManager');
var MouseSync = _dereq_('../inputs/MouseSync');
var TouchSync = _dereq_('../inputs/TouchSync');
var GenericSync = _dereq_('../inputs/GenericSync');

GenericSync.register({
    mouse : MouseSync,
    touch : TouchSync
});

/** @constructor */
function Slider(options) {}

Slider.DEFAULT_OPTIONS = {
    size: [200, 60],
    indicatorSize: [200, 30],
    labelSize: [200, 30],
    range: [0, 1],
    precision: 2,
    value: 0,
    label: '',
    fillColor: 'rgba(170, 170, 170, 1)'
};


Slider.prototype.setOptions = function setOptions(options) {};

Slider.prototype.get = function get() {};

Slider.prototype.set = function set(value) {};

Slider.prototype.getSize = function getSize() {};

Slider.prototype.render = function render() {};

module.exports = Slider;
},{"../core/EventHandler":7,"../core/OptionsManager":10,"../core/Surface":14,"../core/Transform":15,"../inputs/GenericSync":27,"../inputs/MouseSync":28,"../inputs/TouchSync":33,"../math/Utilities":40,"../surfaces/CanvasSurface":74}],114:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Utility = _dereq_('../utilities/Utility');
var View = _dereq_('../core/View');
var GridLayout = _dereq_('../views/GridLayout');
var ToggleButton = _dereq_('./ToggleButton');

/**
 * A view for displaying various tabs that dispatch events
 *  based on the id of the button that was clicked
 *
 * @class TabBar
 * @extends View
 * @constructor
 *
 * @param {object} options overrides of default options
 */
function TabBar(options) {}

TabBar.prototype = Object.create(View.prototype);
TabBar.prototype.constructor = TabBar;

TabBar.DEFAULT_OPTIONS = {
    sections: [],
    widget: ToggleButton,
    size: [undefined, 50],
    direction: Utility.Direction.X,
    buttons: {
        toggleMode: ToggleButton.ON
    }
};

/**
 * Update the options for all components of the view
 *
 * @method _updateOptions
 *
 * @param {object} data component options
 */
function _updateOptions(data) {}

/**
 * Return an array of the proper dimensions for the tabs
 *
 * @method _resolveGridDimensions
 *
 * @param {number} count number of buttons
 * @param {number} direction direction of the layout
 *
 * @return {array} the dimensions of the tab section
 */
function _resolveGridDimensions(count, direction) {
    if (direction === Utility.Direction.X) return [count, 1];
    else return [1, count];
}

/**
 * Create a new button with the specified id.  If one already exists with
 *  that id, unbind all listeners.
 *
 * @method defineSection
 *
 * @param {string} id name of the button
 * @param {object} content data for the creation of a new ToggleButton
 */
TabBar.prototype.defineSection = function defineSection(id, content) {};

/**
 * Select a particular button and dispatch the id of the selection
 *  to any listeners.  Deselect all others
 *
 * @method select
 *
 * @param {string} id button id
 */
TabBar.prototype.select = function select(id) {};

module.exports = TabBar;
},{"../core/View":16,"../utilities/Utility":95,"../views/GridLayout":103,"./ToggleButton":115}],115:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Surface = _dereq_('../core/Surface');
var EventHandler = _dereq_('../core/EventHandler');
var RenderController = _dereq_('../views/RenderController');

/**
 * A view for transitioning between two surfaces based
 *  on a 'on' and 'off' state
 *
 * @class TabBar
 * @extends View
 * @constructor
 *
 * @param {object} options overrides of default options
 */
function ToggleButton(options) {}

ToggleButton.OFF = 0;
ToggleButton.ON = 1;
ToggleButton.TOGGLE = 2;

/**
 * Transition towards the 'on' state and dispatch an event to
 *  listeners to announce it was selected. Accepts an optional
 *  argument, `suppressEvent`, which, if truthy, prevents the
 *  event from being dispatched.
 *
 * @method select
 * @param [suppressEvent] {Boolean} When truthy, prevents the
 *   widget from emitting the 'select' event.
 */
ToggleButton.prototype.select = function select(suppressEvent) {};

/**
 * Transition towards the 'off' state and dispatch an event to
 *  listeners to announce it was deselected. Accepts an optional
 *  argument, `suppressEvent`, which, if truthy, prevents the
 *  event from being dispatched.
 *
 * @method deselect
 * @param [suppressEvent] {Boolean} When truthy, prevents the
 *   widget from emitting the 'deselect' event.
 */
ToggleButton.prototype.deselect = function deselect(suppressEvent) {};

/**
 * Return the state of the button
 *
 * @method isSelected
 *
 * @return {boolean} selected state
 */
ToggleButton.prototype.isSelected = function isSelected() {};

/**
 * Override the current options
 *
 * @method setOptions
 *
 * @param {object} options JSON
 */
ToggleButton.prototype.setOptions = function setOptions(options) {};

/**
 * Return the size defined in the options object
 *
 * @method getSize
 *
 * @return {array} two element array [height, width]
 */
ToggleButton.prototype.getSize = function getSize() {};

/**
 * Generate a render spec from the contents of this component.
 *
 * @private
 * @method render
 * @return {number} Render spec for this component
 */
ToggleButton.prototype.render = function render() {
    return this.arbiter.render();
};

module.exports = ToggleButton;
},{"../core/EventHandler":7,"../core/Surface":14,"../views/RenderController":106}],116:[function(_dereq_,module,exports){
module.exports = {
  NavigationBar: _dereq_('./NavigationBar'),
  Slider: _dereq_('./Slider'),
  TabBar: _dereq_('./TabBar'),
  ToggleButton: _dereq_('./ToggleButton')
};

},{"./NavigationBar":112,"./Slider":113,"./TabBar":114,"./ToggleButton":115}]},{},[23])(23)
});
