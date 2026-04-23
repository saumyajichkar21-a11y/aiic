import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ end, suffix = '', label, duration = 3 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // easeOutExpo curve for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    if (inView) {
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center p-6 glass-card transform hover:-translate-y-2 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 flex justify-center items-center">
        <span>{count.toLocaleString()}</span>
        <span className="text-accent-gold ml-1">{suffix}</span>
      </div>
      <p className="text-text-secondary font-medium tracking-wider uppercase text-sm mt-2">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
