import React, { useRef, useEffect } from 'react';

export const LiquidSphere3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle field & liquid rings
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * width * 0.8,
      y: (Math.random() - 0.5) * height * 0.8,
      z: Math.random() * 200 + 50,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.28;

      // Mouse offset calculation
      const targetOffX = (mouseX - centerX) * 0.08;
      const targetOffY = (mouseY - centerY) * 0.08;

      // Outer Liquid Glow Bloom
      const ambientGlow = ctx.createRadialGradient(
        centerX + targetOffX,
        centerY + targetOffY,
        radius * 0.2,
        centerX + targetOffX,
        centerY + targetOffY,
        radius * 1.8
      );
      ambientGlow.addColorStop(0, 'rgba(252, 76, 2, 0.35)');
      ambientGlow.addColorStop(0.5, 'rgba(252, 76, 2, 0.12)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX + targetOffX, centerY + targetOffY, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Outer Orbit Ring 1 (Athletic Precision Ring)
      ctx.save();
      ctx.translate(centerX + targetOffX, centerY + targetOffY);
      ctx.rotate(time * 0.6);
      ctx.strokeStyle = 'rgba(252, 76, 2, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 18]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.45, radius * 0.75, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Outer Orbit Ring 2 (Glass Ring)
      ctx.save();
      ctx.translate(centerX + targetOffX, centerY + targetOffY);
      ctx.rotate(-time * 0.4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([20, 10]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.6, radius * 0.65, -Math.PI / 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Dynamic Metallic Liquid Sphere Core
      ctx.save();
      ctx.translate(centerX + targetOffX, centerY + targetOffY);

      // Deformable Liquid Blob contour
      ctx.beginPath();
      const points = 16;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave = Math.sin(angle * 4 + time * 2) * 8 + Math.cos(angle * 3 - time * 1.5) * 6;
        const r = radius + wave;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Liquid Metallic Gradient
      const liquidGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      liquidGrad.addColorStop(0, '#FC4C02');
      liquidGrad.addColorStop(0.35, '#ff7738');
      liquidGrad.addColorStop(0.7, '#1e1c1b');
      liquidGrad.addColorStop(1, '#080808');

      ctx.fillStyle = liquidGrad;
      ctx.shadowColor = 'rgba(252, 76, 2, 0.5)';
      ctx.shadowBlur = 35;
      ctx.fill();

      // Glass Edge Reflection
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Highlight Arc (Glass Refraction Specular)
      ctx.beginPath();
      ctx.arc(-radius * 0.35, -radius * 0.35, radius * 0.4, -Math.PI * 0.7, -Math.PI * 0.1);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.restore();

      // Floating PR Gold & Orange Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const pX = centerX + Math.cos(p.angle) * p.z + targetOffX * 0.5;
        const pY = centerY + Math.sin(p.angle) * (p.z * 0.5) + targetOffY * 0.5;

        ctx.fillStyle = Math.random() > 0.3 ? `rgba(252, 76, 2, ${p.alpha})` : `rgba(212, 175, 55, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Overlay Metallic Core Icon Text / Badge ("APEX 1RM")
      ctx.save();
      ctx.translate(centerX + targetOffX, centerY + targetOffY);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '0.15em';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 8;
      ctx.fillText('OVERLOAD // 1RM', 0, 0);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center">
      {/* Background glass blur halo */}
      <div className="absolute inset-0 bg-[#FC4C02]/15 blur-[90px] rounded-full pointer-events-none animate-pulse-glow" />
      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-pointer transition-transform duration-500 hover:scale-105" />
    </div>
  );
};
