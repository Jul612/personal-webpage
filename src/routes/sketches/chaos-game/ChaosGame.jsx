import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import Index from '../../../components/layout';

const options = {
  triangle: {
    type: '',
    lerpAmount: 0.5,
    pointAmount: 3,
  },
  square: {
    type: '',
    lerpAmount: 0.4,
    pointAmount: 4,
  },
  pentagon: {
    type: '',
    lerpAmount: 0.5,
    pointAmount: 5,
  },
};

let option = options.triangle;
let randomPoints = false;
let iteration = 100;
let size = 0;
let maxSize;
let seedPoints = [];
let current;
let previous;

const pickSeedPoints = (p, rando = false) => {
  const radius = (maxSize / 2) - 10;
  const points = [];
  let point;

  const randomPoint = () => {
    const x = p.random(p.width);
    const y = p.random(p.height);
    return { x, y };
  };

  const pointInCircle = (i) => {
    const angle = (i * p.TWO_PI) / option.pointAmount;
    const x = radius * p.cos(angle) + p.width / 2;
    const y = radius * p.sin(angle) + p.height / 2;
    return { x, y };
  };

  for (let i = 0; i < option.pointAmount; i++) {
    if (rando) point = randomPoint();
    else point = pointInCircle(i);
    points.push(point);
  }
  return [...points];
};

const drawChaosPoints = (p, typeS = '') => {
  const lerpCurrent = (currentP, nextP) => {
    currentP.x = p.lerp(nextP.x, currentP.x, option.lerpAmount);
    currentP.y = p.lerp(nextP.y, currentP.y, option.lerpAmount);
  };

  for (let i = 0; i < iteration; i++) {
    p.stroke(200, 20, 120);
    p.strokeWeight(1);
    p.point(current.x, current.y);

    const next = p.random(seedPoints);

    switch (typeS) {
      case '':
        lerpCurrent(current, next);
        break;
      case 'not-same-as-prev':
        if (next !== previous) lerpCurrent(current, next);
        previous = next;
        break;
      default:
        break;
    }
  }
};

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    size = window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight;
    maxSize = size - size / 50;
    p.createCanvas(size, size).parent('parent');
    current = { x: p.random(size), y: p.random(size) };
    seedPoints = pickSeedPoints(p, randomPoints);
    p.background(30);
  };

  p.draw = () => {
    p.stroke(255);
    p.strokeWeight(10);
    seedPoints.forEach((point) => {
      p.point(point.x, point.y);
    });

    drawChaosPoints(p, option.type);
  };
});

const ChaosGame = function () {
  const [sketch, setSketch] = React.useState(null);
  const [type, setType] = React.useState('triangle');

  useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);

    return () => {
      newSketch.remove();
      option = options.triangle;
      randomPoints = false;
      iteration = 100;
      size = 0;
      maxSize = null;
      seedPoints = [];
      current = null;
      previous = null;
    };
  }, []);

  const handleOptionChange = ({ target: { value } }) => {
    sketch.remove();
    option = options[value];
    setType(value);
    setSketch(makeSketch());
  };

  const handleRefresh = () => {
    sketch.remove();
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Index
      handleRefresh={handleRefresh}
      sketchDescription={`
        This is a chaos game.
        The chaos game is a simple way to create a fractal.
        The chaos game is a type of fractal where the points are generated randomly.
        The points are then lerped an infinite amount of time to create a smooth line.
      `}
      controls={[
        {
          key: 'Type',
          control: (
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                value={type}
                label="Color"
                onChange={handleOptionChange}
              >
                <MenuItem value="triangle">
                  Triangle
                </MenuItem>
                <MenuItem value="square">
                  Square
                </MenuItem>
                <MenuItem value="pentagon">
                  Pentagon
                </MenuItem>
              </Select>
            </FormControl>
          ),
        },
      ]}
    >
      <div
        style={{ display: 'grid', placeItems: 'center', backgroundColor: 'hsl(0, 0%, 11.7%)' }}
        id="parent"
        className="sketch-container"
      />
    </Index>
  );
};

export default ChaosGame;
