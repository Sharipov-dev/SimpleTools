'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    let time = 0;

    // Wave class for ripple effects
    class Wave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;
      width: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 0;
        this.maxRadius = Math.random() * 150 + 100;
        this.speed = Math.random() * 0.5 + 0.3;
        this.opacity = 0.3;
        this.width = 1;
      }

      update() {
        this.radius += this.speed;
        this.opacity = (1 - this.radius / this.maxRadius) * 0.3;
        
        if (this.radius > this.maxRadius) {
          this.radius = 0;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    // Geometric line class
    class GeometricLine {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      angle: number;
      length: number;
      rotationSpeed: number;
      opacity: number;

      constructor() {
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        this.angle = Math.random() * Math.PI * 2;
        this.length = Math.random() * 100 + 50;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.updateEndPoint();
      }

      updateEndPoint() {
        this.x2 = this.x1 + Math.cos(this.angle) * this.length;
        this.y2 = this.y1 + Math.sin(this.angle) * this.length;
      }

      update() {
        this.angle += this.rotationSpeed;
        this.updateEndPoint();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Create waves and lines
    const waves: Wave[] = [];
    const lines: GeometricLine[] = [];
    
    for (let i = 0; i < 5; i++) {
      waves.push(new Wave());
    }
    
    for (let i = 0; i < 15; i++) {
      lines.push(new GeometricLine());
    }

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw and update waves
      waves.forEach((wave) => {
        wave.update();
        wave.draw();
      });

      // Draw and update geometric lines
      lines.forEach((line) => {
        line.update();
        line.draw();
      });

      // Draw flowing sine waves across the screen
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const offset = i * 200;
        const amplitude = 30;
        const frequency = 0.005;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + offset - 300 + Math.sin(x * frequency + time + i) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

