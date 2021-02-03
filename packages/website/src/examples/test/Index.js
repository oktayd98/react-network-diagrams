import React from 'react';
import _ from 'underscore';

import { Resizable, BaseMap } from 'react-network-diagrams';

import test_docs from './test_docs.md';
import test_thumbnail from './test_thumbnail.png';

import topoJSON from '../editor/topo.json';

function buildTopology() {
  const topology = {};

  if (_.isNull(topoJSON)) {
    return null;
  }

  // Create a node list
  topology.nodes = _.map(topoJSON.nodes, (node) => {
    const n = _.clone(node);

    // Radius is based on the type of node, given in the nodeSizeMap
    n.radius = 20;
    n.labelPosition = node.label_position;
    n.labelOffsetX = node.label_dx;
    n.labelOffsetY = node.label_dy;

    n.style = {
      normal: { fill: '#CBCBCB', stroke: '#BEBEBE', cursor: 'pointer' },
      selected: {
        fill: '#37B6D3',
        stroke: 'rgba(55, 182, 211, 0.22)',
        strokeWidth: 10,
        cursor: 'pointer',
      },
      muted: {
        fill: '#CBCBCB',
        stroke: '#BEBEBE',
        opacity: 0.6,
        cursor: 'pointer',
      },
    };

    n.labelStyle = {
      normal: { fill: '#696969', stroke: 'none', fontSize: 9 },
      selected: { fill: '#333', stroke: 'none', fontSize: 11 },
      muted: { fill: '#696969', stroke: 'none', fontSize: 8, opacity: 0.6 },
    };

    n.shape = node.shape;

    return n;
  });

  // Create the tologogy list
  topology.edges = _.map(topoJSON.edges, (edge) => {
    const edgeName = `${edge.source}--${edge.target}`;
    return {
      width: 1,
      classed: edge.capacity,
      source: edge.source,
      target: edge.target,
      name: edgeName,
      shape: 'linear',
      curveDirection: null,
      offset: null,
    };
  });

  topology.name = topoJSON.name;
  topology.description = topoJSON.description;

  return topology;
}

function test() {
  const topo = buildTopology();

  // const test = fetch('http://127.0.0.1:3000')
  //   .then((res) => res.json())
  //   .then((data) => data)
  //   .catch((err) => err);
  // console.log(test);

  // useEffect(async () => {
  //   const res = await fetch('http://127.0.0.1:3000');
  //   const data = await res.json();
  //   setTopo(data);
  // }, []);

  const bounds = {
    x1: 0,
    y1: 0,
    x2: 225,
    y2: 120,
  };
  return (
    <Resizable
      style={{
        background: '#fff',
        borderStyle: 'solid',
        borderColor: 'pink',
      }}
    >
      <BaseMap
        topology={topo}
        width={window.innerWidth}
        height={350}
        bounds={bounds}
      />
    </Resizable>
  );
}

export default { test, test_docs, test_thumbnail };
