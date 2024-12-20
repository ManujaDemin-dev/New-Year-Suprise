"use client"; // Use client-side rendering

import { useEffect, useRef } from 'react';
import './snowStyles.css'; // Assuming the CSS above is in this file

const SnowEffect = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const snowflakes = useRef([]);
  const snowLevels = useRef([]);
  const maxSnowDepth = 80; // Limit snow depth to 100px
  const snowflakeCharacters = ['❄', '*', '❉', '❃', '❅'];
  const snowflakeCounter = useRef(0);
  const isMelting = useRef(false);
  const snowflakeCreationRate = useRef(8); // Default value for smaller screens
  const lastFrameTime = useRef(performance.now());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      snowflakeCreationRate.current = window.innerWidth > 768 ? 1 : 8;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const snowBuildUpCanvas = canvasRef.current;
    const ctx = snowBuildUpCanvas.getContext('2d');

    const updateCanvasSize = () => {
      snowBuildUpCanvas.width = container.offsetWidth;
      snowBuildUpCanvas.height = container.offsetHeight;
    };

    updateCanvasSize();

    snowLevels.current = new Array(snowBuildUpCanvas.width).fill(0);

    const createSnowflake = () => {
      const snowflake = {
        x: Math.random() * snowBuildUpCanvas.width,
        y: -10,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        opacity: 1,
        character: snowflakeCharacters[Math.floor(Math.random() * snowflakeCharacters.length)]
      };
      snowflakes.current.push(snowflake);
    };

    const smoothAccumulation = () => {
      for (let i = 1; i < snowLevels.current.length - 1; i++) {
        snowLevels.current[i] = (snowLevels.current[i - 1] + snowLevels.current[i] + snowLevels.current[i + 1]) / 3;
      }
    };

    const drawSnowflakes = (deltaTime) => {
      ctx.clearRect(0, 0, snowBuildUpCanvas.width, snowBuildUpCanvas.height);

      ctx.fillStyle = 'white';
      for (let x = 0; x < snowLevels.current.length; x++) {
        ctx.fillRect(x, snowBuildUpCanvas.height - snowLevels.current[x], 1, snowLevels.current[x]);
      }

      snowflakes.current.forEach((snowflake, index) => {
        ctx.globalAlpha = snowflake.opacity;
        ctx.font = `${snowflake.size}px sans-serif`;
        ctx.fillText(snowflake.character, snowflake.x, snowflake.y);
        ctx.globalAlpha = 1;

        if (!isMelting.current) {
          snowflake.y += snowflake.speed * deltaTime * 60;
        } else {
          snowflake.speed *= 0.98;
          snowflake.opacity *= 0.98;
        }

        if (snowflake.y + snowflake.size / 2 >= snowBuildUpCanvas.height - snowLevels.current[Math.floor(snowflake.x)]) {
          if (!isMelting.current) {
            const snowflakeX = Math.floor(snowflake.x);
            const snowflakeSize = snowflake.size / 2;

            const accumulationWidth = Math.ceil(snowflakeSize * 2);
            for (let i = -accumulationWidth; i <= accumulationWidth; i++) {
              const xIndex = Math.min(Math.max(snowflakeX + i, 0), snowLevels.current.length - 1);
              const distance = Math.abs(i);
              const falloff = Math.exp(-distance / 5);

              if (snowLevels.current[xIndex] < maxSnowDepth) {
                snowLevels.current[xIndex] += snowflake.size / 4 * falloff;
              }
            }

            snowflakes.current.splice(index, 1);
          }
        }
      });

      smoothAccumulation();
    };

    const meltSnow = () => {
      let allMelted = true;
      for (let i = 0; i < snowLevels.current.length; i++) {
        if (snowLevels.current[i] > 0) {
          const meltRate = Math.random() * 0.3 + 0.1;
          snowLevels.current[i] -= meltRate;
          if (snowLevels.current[i] < 0) snowLevels.current[i] = 0;
          allMelted = false;
        }
      }

      for (let i = 0; i < snowLevels.current.length; i++) {
        if (i > 0 && i < snowLevels.current.length - 1) {
          const leftNeighbor = snowLevels.current[i - 1];
          const rightNeighbor = snowLevels.current[i + 1];
          const average = (leftNeighbor + rightNeighbor) / 2;
          const adjustment = (average - snowLevels.current[i]) * 0.2;
          snowLevels.current[i] += adjustment;
        }
      }

      return allMelted;
    };

    const checkFullSnow = () => {
      return snowLevels.current.every(level => level >= maxSnowDepth);
    };

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastFrameTime.current) / 1000;
      lastFrameTime.current = currentTime;

      if (!isMelting.current) {
        if (checkFullSnow()) {
          isMelting.current = true;
        } else if (snowflakeCounter.current % snowflakeCreationRate.current === 0) {
          createSnowflake();
        }
        snowflakeCounter.current++;
      } else {
        if (meltSnow()) {
          snowflakes.current.length = 0;
          snowLevels.current.fill(0);
          isMelting.current = false;
        }
      }

      drawSnowflakes(deltaTime);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      snowflakes.current = [];
      snowLevels.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} id="snow-container">
      <canvas ref={canvasRef} id="snow-build-up" />
    </div>
  );
};

export default SnowEffect;
