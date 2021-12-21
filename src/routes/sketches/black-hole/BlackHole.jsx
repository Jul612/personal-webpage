import React, { useEffect } from 'react';
import P5 from 'p5';
import { Particle } from './particle';

let particles = [];
let center = { x: 0, y: 0 };
let blackHole = { pos: null };

const BlackHole = function () {
  const [, setSketch] = React.useState(null);

  const getAvgPosition = (posArray) => {
    const arrLength = posArray.length;
    const accumulation = posArray.reduce((avg, nextPos) => {
      avg.x += nextPos.x;
      avg.y += nextPos.y;
      return avg;
    }, { x: 0, y: 0 });
    accumulation.x /= arrLength;
    accumulation.y /= arrLength;
    return accumulation;
  };

  useEffect(() => {
    const newSketch = new P5((p) => {
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('parent');
        p.ellipseMode(p.CENTER);
        center = { x: p.width / 2, y: p.height / 2 };
        blackHole = { pos: p.createVector(center.x, center.y) };

        p.mousePressed = () => {
          particles.push(new Particle(p, { x: p.mouseX, y: p.mouseY }, 10, 300));
        };
      };

      p.draw = () => {
        p.background(220);

        for (let i = 0; i < particles.length; i += 1) {
          const particle = particles[i];
          const force = p
            .constructor
            .Vector
            .sub(blackHole.pos, particle.pos)
            .normalize()
            .setMag(0.7);
          particle.applyForce(force);
          particle.update();
          // particle.updateLifeTime();
          particle.show();
          particle.showTrail(10);
          if (particle.lifeTime < 1) particles.splice(i, 1);
        }

        const avgPos = getAvgPosition(
          particles.map((particle) => particle.pos),
        );

        p.fill(0);
        p.ellipse(blackHole.pos.x, blackHole.pos.y, 50);
        p.fill(255);
        p.ellipse(avgPos.x, avgPos.y, 30);
      };
    });

    setSketch(newSketch);

    return () => {
      particles = [];
      center = { x: 0, y: 0 };
      blackHole = { pos: null };
      newSketch.remove();
    };
  }, []);

  return (
    <div id="parent" className="sketch-container" />
  );
};

export default BlackHole;