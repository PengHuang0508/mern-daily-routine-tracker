import React from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';
// Utils
import { capitalizeFirstLetter } from '../../utils/helpers';

const SVGRadarChart = () => {
  const routineChartData = useSelector((state) => state.log.routineChartData);
  const windowSize = useWindowSize();
  let canvasSize = windowSize.width / 2;
  let chartSize = windowSize.width / 2 - 50;

  if (windowSize.width > 600) {
    canvasSize = 400;
    chartSize = 300;
  }

  const middleOfCanvas = (canvasSize / 2).toFixed(4);
  const numberOfScales = 4;
  const properties = Object.keys(routineChartData);
  const perks = properties.map((key, i, all) => {
    return {
      key,
      angle: (Math.PI * 2 * i) / all.length,
    };
  });

  const polarToX = (angle, distance) =>
    Math.cos(angle - Math.PI / 2) * distance;
  const polarToY = (angle, distance) =>
    Math.sin(angle - Math.PI / 2) * distance;

  // Scales
  const scales = [4, 3, 2, 1].map((value) => (
    <circle
      key={`scale-${value}`}
      cx={0}
      cy={0}
      r={((value / numberOfScales) * chartSize) / 2}
      fill='#f7f7f7'
      stroke='#555'
      strokeWidth='0.5'
    />
  ));

  // Axes
  const joinPoints = (points) => {
    return points
      .map((point) => point[0].toFixed(4) + ',' + point[1].toFixed(4))
      .join(' ');
  };
  const axis = () => (col, i) => (
    <polyline
      key={`poly-axis-${i}`}
      points={joinPoints([
        [0, 0],
        [
          polarToX(col.angle, chartSize / 2),
          polarToY(col.angle, chartSize / 2),
        ],
      ])}
      stroke='#333'
      strokeWidth='.5'
    />
  );
  const axes = perks.map(axis());

  // Captions
  const caption = () => (col) => (
    <text
      key={`caption-of-${col.key}`}
      x={polarToX(col.angle, (chartSize / 2) * 1.1).toFixed(4)}
      y={polarToY(col.angle, (chartSize / 2) * 1.1).toFixed(4)}
      dx={-20}
      dy={5 / 2}
      fill='#1976d2'
      fontWeight='700'
      fontSize='1em'
    >
      {capitalizeFirstLetter(col.key)}
    </text>
  );
  const captions = perks.map(caption());

  // Shape
  const pathDefinition = (points) => {
    let drawPath =
      'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);

    for (let i = 1; i < points.length; i++) {
      drawPath += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
    }

    return drawPath + 'z';
  };
  const shape = (
    <path
      key='shape'
      d={pathDefinition(
        perks.map((col) => {
          const value = routineChartData[col.key];
          return [
            polarToX(col.angle, (value * chartSize) / 2),
            polarToY(col.angle, (value * chartSize) / 2),
          ];
        })
      )}
      stroke={`#dd5544`}
      fill={`#dd5544`}
      fillOpacity='.5'
    />
  );

  let draw = [scales, axes, captions, shape].map((graph, index) => (
    <g key={`chart-${index}`}>{graph}</g>
  ));

  return (
    <svg
      version='1'
      xmlns='http://www.w3.org/2000/svg'
      width={canvasSize}
      height={canvasSize}
      viewBox={`0 0 ${canvasSize} ${canvasSize}`}
      style={{ maxWidth: '100%' }}
    >
      <g transform={`translate(${middleOfCanvas},${middleOfCanvas})`}>{draw}</g>
    </svg>
  );
};

export default SVGRadarChart;
