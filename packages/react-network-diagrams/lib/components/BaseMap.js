'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Scale = require('d3-scale');

var _BidirectionalEdge = require('./BidirectionalEdge');

var _NodeLabel = require('./NodeLabel');

var _MapLegend = require('./MapLegend');

var _Node = require('./Node');

var _SimpleEdge = require('./SimpleEdge');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2018, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import '../map.css';

function getElementOffset(element) {
  var de = document.documentElement;
  var box = element.getBoundingClientRect();
  var top = box.top + window.pageYOffset - de.clientTop;
  var left = box.left + window.pageXOffset - de.clientLeft;
  return { top: top, left: left };
}

/**
 * The BaseMap forms a general network drawing component which
 * doesn't assume that the drawing is of a Network. It is used
 * by the `<TrafficMap>` to produce the chart seen of the front
 * page of my.es.net.
 */

var BaseMap = exports.BaseMap = function (_React$Component) {
  _inherits(BaseMap, _React$Component);

  function BaseMap(props) {
    _classCallCheck(this, BaseMap);

    var _this = _possibleConstructorReturn(this, (BaseMap.__proto__ || Object.getPrototypeOf(BaseMap)).call(this, props));

    _this.state = {
      dragging: null
    };
    return _this;
  }

  _createClass(BaseMap, [{
    key: 'handleNodeMouseDown',
    value: function handleNodeMouseDown(id, e) {
      var _scale = this.scale(),
          xScale = _scale.xScale,
          yScale = _scale.yScale;

      var _getOffsetMousePositi = this.getOffsetMousePosition(e),
          x = _getOffsetMousePositi.x,
          y = _getOffsetMousePositi.y;

      var drag = {
        id: id,
        x0: xScale.invert(x),
        y0: yScale.invert(y)
      };
      this.setState({ dragging: drag });
    }
  }, {
    key: 'handleSelectionChange',
    value: function handleSelectionChange(type, id) {
      if (this.props.onNodeSelected) {
        if (type === 'node') {
          this.props.onNodeSelected(id);
        }
      } else if (this.props.onEdgeSelected) {
        if (type === 'edge') {
          this.props.onEdgeSelected(id);
        }
      } else if (this.props.onSelectionChange) {
        this.props.onSelectionChange(type, id);
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      e.preventDefault();
      if (this.state.dragging) {
        var id = this.state.dragging.id;

        var _scale2 = this.scale(),
            xScale = _scale2.xScale,
            yScale = _scale2.yScale;

        var _getOffsetMousePositi2 = this.getOffsetMousePosition(e),
            x = _getOffsetMousePositi2.x,
            y = _getOffsetMousePositi2.y;

        if (this.props.onNodeDrag) {
          this.props.onNodeDrag(id, xScale.invert(x), yScale.invert(y));
        }
      }
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      e.stopPropagation();
      this.setState({ dragging: null });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.onNodeSelected || this.props.onEdgeSelected) {
        return;
      }
      if (this.props.onPositionSelected) {
        var _scale3 = this.scale(),
            xScale = _scale3.xScale,
            yScale = _scale3.yScale;

        var _getOffsetMousePositi3 = this.getOffsetMousePosition(e),
            x = _getOffsetMousePositi3.x,
            y = _getOffsetMousePositi3.y;

        this.props.onPositionSelected(xScale.invert(x), yScale.invert(y));
      }
      if (this.props.onSelectionChange) {
        this.props.onSelectionChange(null);
      }
    }

    /**
     * Get the event mouse position relative to the event rect
     */

  }, {
    key: 'getOffsetMousePosition',
    value: function getOffsetMousePosition(e) {
      var trackerRect = this.map;
      var offset = getElementOffset(trackerRect);
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      return { x: Math.round(x), y: Math.round(y) };
    }
  }, {
    key: 'scale',
    value: function scale() {
      return {
        xScale: (0, _d3Scale.scaleLinear)().domain([this.props.bounds.x1, this.props.bounds.x2]).range([this.props.margin, this.props.width - this.props.margin * 2]),
        yScale: (0, _d3Scale.scaleLinear)().domain([this.props.bounds.y1, this.props.bounds.y2]).range([this.props.margin, this.props.height - this.props.margin * 2])
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _scale4 = this.scale(),
          xScale = _scale4.xScale,
          yScale = _scale4.yScale;

      var hasSelectedNode = this.props.selection.nodes.length;
      var hasSelectedEdge = this.props.selection.edges.length;

      //
      // Build a mapping of edge names to the edges themselves
      //

      var edgeMap = {};
      _underscore2.default.each(this.props.topology.edges, function (edge) {
        edgeMap[edge.source + '--' + edge.target] = edge;
        edgeMap[edge.target + '--' + edge.source] = edge;
      });

      //
      // Build a list of nodes (each a Node) from our topology
      //

      var secondarySelectedNodes = [];
      _underscore2.default.each(this.props.selection.edges, function (edgeName) {
        var edge = edgeMap[edgeName];
        if (edge) {
          secondarySelectedNodes.push(edge.source);
          secondarySelectedNodes.push(edge.target);
        }
      });

      var nodeCoordinates = {};
      var nodes = _underscore2.default.map(this.props.topology.nodes, function (node) {
        var name = node.name,
            id = node.id,
            label = node.label,
            props = _objectWithoutProperties(node, ['name', 'id', 'label']);

        props.id = id || name;
        props.x = xScale(node.x);
        props.y = yScale(node.y);
        props.label = label || name;

        var nodeSelected = _underscore2.default.contains(_this2.props.selection.nodes, props.id);
        var edgeSelected = _underscore2.default.contains(secondarySelectedNodes, node.name);
        props.selected = nodeSelected || edgeSelected;
        props.muted = hasSelectedNode && !props.selected || hasSelectedEdge && !props.selected;

        nodeCoordinates[node.name] = { x: props.x, y: props.y };

        return _react2.default.createElement(_Node.Node, _extends({
          key: props.id
        }, props, {
          onSelectionChange: function onSelectionChange(type, i) {
            return _this2.handleSelectionChange(type, i);
          },
          onMouseDown: function onMouseDown(id, e) {
            return _this2.handleNodeMouseDown(id, e);
          },
          onMouseMove: function onMouseMove(type, i, xx, yy) {
            return _this2.props.onNodeMouseMove(i, xx, yy);
          },
          onMouseUp: function onMouseUp(type, i, e) {
            return _this2.props.onNodeMouseUp(i, e);
          }
        }));
      });

      //
      // Build a axillary structure to help us build the paths
      //
      // For each node, we need a map of sources and destinations
      // for each path e.g. If DENV has two incoming paths, both
      // from SACR and one out going path to KANS the that would
      // be represented like this:
      //
      //      nodePathMap[DENV].targetMap[SACR] => [PATH1, PATH2]
      //                                 [KANS] => [PATH2]

      var nodePaths = {};
      _underscore2.default.each(this.props.paths, function (path) {
        var pathName = path.name;
        var pathSteps = path.steps;
        for (var i = 0; i < pathSteps.length - 1; i++) {
          var node = pathSteps[i];
          var next = pathSteps[i + 1];

          var a = void 0;
          var z = void 0;

          // We store our target based on geography, west to east etc A->Z
          if (_underscore2.default.has(nodeCoordinates, node) && _underscore2.default.has(nodeCoordinates, next)) {
            if (nodeCoordinates[node].x < nodeCoordinates[next].x || nodeCoordinates[node].y < nodeCoordinates[next].y) {
              a = node;
              z = next;
            } else {
              a = next;
              z = node;
            }

            if (!_underscore2.default.has(nodePaths, a)) {
              nodePaths[a] = { targetMap: {} };
            }

            if (!_underscore2.default.has(nodePaths[a].targetMap, z)) {
              nodePaths[a].targetMap[z] = [];
            }

            nodePaths[a].targetMap[z].push(pathName);
          } else {
            if (!_underscore2.default.has(nodeCoordinates, node)) {
              throw new Error('Missing node in path \'' + pathName + '\': ' + node);
            }
            if (!_underscore2.default.has(nodeCoordinates, next)) {
              throw new Error('Missing node in path \'' + pathName + '\': ' + next);
            }
          }
        }
      });

      //
      // For drawing path bidirectional only, we build up a map first to
      // tell us which edges are touched by a path
      //

      var edgePathMap = {};
      _underscore2.default.each(this.props.paths, function (path) {
        var pathSteps = path.steps;
        if (pathSteps.length > 1) {
          for (var i = 0; i < pathSteps.length - 1; i++) {
            var source = pathSteps[i];
            var destination = pathSteps[i + 1];
            var sourceToDestinationName = source + '--' + destination;
            var destinationToSourceName = destination + '--' + source;
            edgePathMap[sourceToDestinationName] = path;
            edgePathMap[destinationToSourceName] = path;
          }
        }
      });

      var edges = _underscore2.default.map(this.props.topology.edges, function (edge) {
        var selected = _underscore2.default.contains(_this2.props.selection.edges, edge.name);

        if (!_underscore2.default.has(nodeCoordinates, edge.source) || !_underscore2.default.has(nodeCoordinates, edge.target)) {
          return;
        }

        // either 'simple' or 'bi-directional' edges.
        var edgeDrawingMethod = _this2.props.edgeDrawingMethod;

        // either 'linear' or 'curved'
        var edgeShape = 'linear';
        if (!_underscore2.default.isUndefined(edge.shape) && !_underscore2.default.isNull(edge.shape)) {
          edgeShape = edge.shape;
        }

        var curveDirection = 'left';
        if (!_underscore2.default.isUndefined(edge.curveDirection) && !_underscore2.default.isNull(edge.curveDirection)) {
          curveDirection = edge.curveDirection;
        }

        var muted_val = hasSelectedEdge && !selected || hasSelectedNode;
        var muted = muted_val === 0 ? false : true;

        if (edgeDrawingMethod === 'simple') {
          return _react2.default.createElement(_SimpleEdge.SimpleEdge, {
            x1: nodeCoordinates[edge.source].x,
            x2: nodeCoordinates[edge.target].x,
            y1: nodeCoordinates[edge.source].y,
            y2: nodeCoordinates[edge.target].y,
            source: edge.source,
            target: edge.target,
            shape: 'angled',
            curveDirection: curveDirection,
            color: edge.stroke,
            width: edge.width,
            classed: edge.classed,
            key: edge.name,
            name: edge.name,
            selected: selected,
            muted: muted,
            onSelectionChange: function onSelectionChange(type, id) {
              return _this2.handleSelectionChange(type, id);
            }
          });
        } else if (edgeDrawingMethod === 'bidirectionalArrow') {
          return _react2.default.createElement(_BidirectionalEdge.BidirectionalEdge, {
            x1: nodeCoordinates[edge.source].x,
            x2: nodeCoordinates[edge.target].x,
            y1: nodeCoordinates[edge.source].y,
            y2: nodeCoordinates[edge.target].y,
            source: edge.source,
            target: edge.target,
            shape: edgeShape,
            curveDirection: curveDirection,
            offset: edge.offset,
            sourceTargetColor: edge.sourceTargetColor,
            targetSourceColor: edge.targetSourceColor,
            width: edge.width,
            classed: edge.classed,
            key: edge.name,
            name: edge.name,
            selected: selected,
            muted: muted,
            onSelectionChange: function onSelectionChange(type, id) {
              return _this2.handleSelectionChange(type, id);
            }
          });
        } else if (edgeDrawingMethod === 'pathBidirectionalArrow') {
          if (_underscore2.default.has(edgePathMap, edge.name)) {
            return _react2.default.createElement(_BidirectionalEdge.BidirectionalEdge, {
              x1: nodeCoordinates[edge.source].x,
              x2: nodeCoordinates[edge.target].x,
              y1: nodeCoordinates[edge.source].y,
              y2: nodeCoordinates[edge.target].y,
              source: edge.source,
              target: edge.target,
              shape: edgeShape,
              curveDirection: curveDirection,
              sourceTargetColor: edge.sourceTargetColor,
              targetSourceColor: edge.targetSourceColor,
              width: edge.width,
              classed: edge.classed,
              key: edge.name,
              name: edge.name,
              selected: selected,
              muted: muted,
              onSelectionChange: function onSelectionChange(type, id) {
                return _this2.handleSelectionChange(type, id);
              }
            });
          } else {
            return _react2.default.createElement(_SimpleEdge.SimpleEdge, {
              x1: nodeCoordinates[edge.source].x,
              x2: nodeCoordinates[edge.target].x,
              y1: nodeCoordinates[edge.source].y,
              y2: nodeCoordinates[edge.target].y,
              source: edge.source,
              target: edge.target,
              shape: edgeShape,
              curveDirection: curveDirection,
              color: edge.stroke,
              width: 1,
              classed: edge.classed,
              key: edge.name,
              name: edge.name,
              selected: selected,
              muted: muted,
              onSelectionChange: function onSelectionChange(type, id) {
                return _this2.handleSelectionChange(type, id);
              }
            });
          }
        }
      });

      //
      // Build the paths
      //

      var paths = _underscore2.default.map(this.props.paths, function (path) {
        var pathName = path.name;
        var pathSteps = path.steps;
        var pathSegments = [];
        var pathColor = path.color || 'steelblue';
        var pathWidth = path.width || 1;
        if (pathSteps.length > 1) {
          for (var i = 0; i < pathSteps.length - 1; i++) {
            var a = void 0;
            var z = void 0;
            var dir = void 0;
            var source = pathSteps[i];
            var destination = pathSteps[i + 1];

            // Get the position of path (if multiple paths run parallel)
            if (nodeCoordinates[source].x < nodeCoordinates[destination].x || nodeCoordinates[source].y < nodeCoordinates[destination].y) {
              a = source;
              z = destination;
              dir = 1;
            } else {
              a = destination;
              z = source;
              dir = -1;
            }

            var pathsToDest = nodePaths[a].targetMap[z];
            var pathIndex = _underscore2.default.indexOf(pathsToDest, pathName);
            var pos = (pathIndex - (pathsToDest.length - 1) / 2) * dir;

            // Get the edge from edgeMap
            var edgeName = source + '--' + destination;
            var edge = edgeMap[edgeName];

            // Get the shape of the edge (linear or curved) and if
            // curved, get the curve direction
            var edgeShape = 'linear';
            if (edge && !_underscore2.default.isUndefined(edge.shape) && !_underscore2.default.isNull(edge.shape)) {
              edgeShape = edge.shape;
            }

            // either 'left' or 'right'
            var curveDirection = 'left';
            if (edge && !_underscore2.default.isUndefined(edge.curveDirection) && !_underscore2.default.isNull(edge.curveDirection)) {
              curveDirection = edge.curveDirection;
            }

            //
            // Construct this path segment as a simple (i.e. line only)
            // path piece. The width of the path is currently a prop of
            // the map, but it would be nice to expand this to
            // optionally be a prop of that line segement
            //

            if (_this2.props.edgeDrawingMethod === 'simple') {
              pathSegments.push(_react2.default.createElement(_SimpleEdge.SimpleEdge, {
                x1: nodeCoordinates[source].x,
                y1: nodeCoordinates[source].y,
                x2: nodeCoordinates[destination].x,
                y2: nodeCoordinates[destination].y,
                position: pos * 6,
                source: source,
                color: pathColor,
                target: destination,
                shape: edgeShape,
                curveDirection: curveDirection,
                width: pathWidth,
                classed: 'path-' + pathName,
                key: pathName + '--' + edgeName,
                name: pathName + '--' + edgeName
              }));
            }
          }
        }
        return _react2.default.createElement(
          'g',
          { key: pathName },
          pathSegments
        );
      });

      //
      // Build the labels
      //

      var labels = _underscore2.default.map(this.props.topology.labels, function (label) {
        var x = xScale(label.x);
        var y = yScale(label.y);
        return _react2.default.createElement(_NodeLabel.NodeLabel, {
          x: x,
          y: y,
          label: label.label,
          labelPosition: label.labelPosition,
          key: label.label
        });
      });

      //
      // Build the legend
      //

      var legend = null;
      if (!_underscore2.default.isNull(this.props.legendItems)) {
        legend = _react2.default.createElement(_MapLegend.MapLegend, {
          x: this.props.legendItems.x,
          y: this.props.legendItems.y,
          edgeTypes: this.props.legendItems.edgeTypes,
          nodeTypes: this.props.legendItems.nodeTypes,
          colorSwatches: this.props.legendItems.colorSwatches
        });
      }

      var style = void 0;
      if (this.state.dragging) {
        style = {
          cursor: 'pointer'
        };
      } else if (this.props.onPositionSelected || this.props.onNodeSelected || this.props.onEdgeSelected) {
        style = {
          cursor: 'crosshair'
        };
      } else {
        style = {
          cursor: 'default'
        };
      }

      return _react2.default.createElement(
        'svg',
        {
          style: style,
          ref: function ref(inst) {
            _this2.map = inst;
          },
          width: this.props.width,
          height: this.props.height,
          className: 'noselect map-container',
          onClick: function onClick(e) {
            return _this2.handleClick(e);
          },
          onMouseMove: function onMouseMove(e) {
            return _this2.handleMouseMove(e);
          },
          onMouseUp: function onMouseUp(e) {
            return _this2.handleMouseUp(e);
          }
        },
        _react2.default.createElement(
          'g',
          null,
          edges,
          paths,
          nodes,
          labels,
          legend
        )
      );
    }
  }]);

  return BaseMap;
}(_react2.default.Component);

BaseMap.propTypes = {
  /**
   * The topology structure, as detailed above. This contains the
   * descriptions of nodes, edges and paths used to render the topology
   */
  topology: _propTypes2.default.object.isRequired,

  /** The width of the circuit diagram */
  width: _propTypes2.default.number,

  /** The height of the circuit diagram */
  height: _propTypes2.default.number,

  /** The blank margin around the diagram drawing */
  margin: _propTypes2.default.number,

  /**
   * Specified as an object containing x1, y1 and x2, y2. This is the region
   * to display on the map. If this isn't specified the bounds will be
   * calculated from the nodes in the Map.
   */
  bounds: _propTypes2.default.shape({
    x1: _propTypes2.default.number,
    y1: _propTypes2.default.number,
    x2: _propTypes2.default.number,
    y2: _propTypes2.default.number
  }),

  /**
   * The is the overall rendering style for the edge connections. Maybe
   * one of the following strings:
   *
   *  * "simple" - simple line connections between nodes
   *  * "bidirectionalArrow" - network traffic represented by bi-directional arrows
   *  * "pathBidirectionalArrow" - similar to "bidirectionalArrow", but only for
   *  edges that are used in the currently displayed path(s).
   */
  edgeDrawingMethod: _propTypes2.default.oneOf(['simple', 'bidirectionalArrow', 'pathBidirectionalArrow']),

  legendItems: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number,
    edgeTypes: _propTypes2.default.object,
    nodeTypes: _propTypes2.default.object,
    colorSwatches: _propTypes2.default.object
  }),

  selection: _propTypes2.default.object,

  paths: _propTypes2.default.array,

  pathWidth: _propTypes2.default.number
};

BaseMap.defaultProps = {
  width: 800,
  height: 600,
  margin: 20,
  bounds: { x1: 0, y1: 0, x2: 1, y2: 1 },
  edgeDrawingMethod: 'simple',
  legendItems: null,
  selection: { nodes: {}, edges: {} },
  paths: [],
  pathWidth: 5
};