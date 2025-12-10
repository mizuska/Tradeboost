import { useEffect, useRef } from 'react';

const TradingBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let candles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Genera candele iniziali
    const generateCandles = () => {
      candles = [];
      const candleWidth = 12;
      const gap = 8;
      const totalCandles = Math.ceil(canvas.width / (candleWidth + gap)) + 5;
      
      let lastClose = canvas.height / 2;
      
      for (let i = 0; i < totalCandles; i++) {
        const volatility = Math.random() * 80 + 20;
        const open = lastClose;
        const close = open + (Math.random() - 0.45) * volatility;
        const high = Math.max(open, close) + Math.random() * 30;
        const low = Math.min(open, close) - Math.random() * 30;
        
        candles.push({
          x: i * (candleWidth + gap),
          open,
          close,
          high,
          low,
          width: candleWidth,
          opacity: 0.3 + Math.random() * 0.4,
        });
        
        lastClose = close;
      }
    };

    generateCandles();

    // Particelle fluttuanti
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let scrollOffset = 0;

    const animate = () => {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Griglia di sfondo
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Disegna candele
      scrollOffset += 0.3;
      if (scrollOffset > 20) {
        scrollOffset = 0;
        // Aggiungi nuova candela e rimuovi la prima
        const lastCandle = candles[candles.length - 1];
        const volatility = Math.random() * 80 + 20;
        const open = lastCandle.close;
        const close = open + (Math.random() - 0.45) * volatility;
        
        candles.shift();
        candles.push({
          x: lastCandle.x + 20,
          open,
          close,
          high: Math.max(open, close) + Math.random() * 30,
          low: Math.min(open, close) - Math.random() * 30,
          width: 12,
          opacity: 0.3 + Math.random() * 0.4,
        });
        
        candles.forEach(c => c.x -= 20);
      }

      candles.forEach(candle => {
        const isGreen = candle.close > candle.open;
        const color = isGreen ? '#00ff88' : '#ff3366';
        const bodyTop = Math.min(candle.open, candle.close);
        const bodyHeight = Math.abs(candle.close - candle.open) || 2;

        // Wick (stoppino)
        ctx.strokeStyle = color;
        ctx.globalAlpha = candle.opacity * 0.6;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(candle.x + candle.width / 2 - scrollOffset, candle.high);
        ctx.lineTo(candle.x + candle.width / 2 - scrollOffset, candle.low);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.globalAlpha = candle.opacity;
        ctx.fillRect(
          candle.x - scrollOffset,
          bodyTop,
          candle.width,
          bodyHeight
        );

        // Glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.fillRect(
          candle.x - scrollOffset,
          bodyTop,
          candle.width,
          bodyHeight
        );
        ctx.shadowBlur = 0;
      });

      // Particelle
      ctx.globalAlpha = 1;
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.4,
      }}
    />
  );
};

export default TradingBackground;
