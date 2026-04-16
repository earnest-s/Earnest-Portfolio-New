import { useEffect, useRef } from 'react';
import './anoai.css';

const AnoAI = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrameTime = 0;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallViewport = window.matchMedia('(max-width: 960px)').matches;
    const targetFps = reducedMotion ? 0 : isSmallViewport ? 20 : 30;
    const frameInterval = targetFps > 0 ? 1000 / targetFps : 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawWave = (time: number, yOffset: number, amp: number, speed: number, color: string) => {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 12) {
        const y = yOffset + Math.sin((x * 0.006) + (time * speed)) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, yOffset - amp, 0, height);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const drawFrame = (timeSeconds: number) => {
      ctx.clearRect(0, 0, width, height);

      // Soft animated aurora-like layers.
      drawWave(timeSeconds, height * 0.24, 48, 0.85, 'rgba(255, 60, 120, 0.26)');
      drawWave(timeSeconds, height * 0.34, 64, 0.62, 'rgba(70, 170, 255, 0.20)');
      drawWave(timeSeconds, height * 0.46, 72, 0.48, 'rgba(145, 95, 255, 0.16)');
    };

    const animate = (timestamp: number) => {
      if (document.hidden) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      if (frameInterval && timestamp - lastFrameTime < frameInterval) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = timestamp;
      drawFrame(timestamp * 0.001);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();

    if (reducedMotion) {
      drawFrame(0);
    } else {
      frameId = window.requestAnimationFrame(animate);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      lastFrameTime = 0;
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="anoai-container">
      <canvas ref={canvasRef} className="anoai-canvas" />
      <div className="anoai-divider" />
    </div>
  );
};

export default AnoAI;
