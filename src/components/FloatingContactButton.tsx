import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'motion/react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

interface FloatingContactButtonProps {
  onOpenContact: () => void;
}

interface CornerPoint {
  id: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  x: number;
  y: number;
  label: string;
}

export const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({
  onOpenContact,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 220, height: 48 });
  const [targetCorner, setTargetCorner] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('bottom-right');
  const [isDragging, setIsDragging] = useState(false);
  const [magneticActive, setMagneticActive] = useState(false);
  const dragDistanceRef = useRef(0);

  // Motion values for spring-based physics
  const springConfig = { stiffness: 420, damping: 26, mass: 0.75 };
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const getPadding = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 16;
    }
    return 24;
  };
  const PADDING = getPadding();
  const TOP_NAV_OFFSET = 88; // Keep clearance below top navigation bar
  const MAGNETIC_RADIUS = 200; // Distance in px where magnetic pull activates

  // Calculate the 4 screen corners based on viewport and button size
  const getCorners = (): Record<CornerPoint['id'], CornerPoint> => {
    if (typeof window === 'undefined') {
      return {
        'top-left': { id: 'top-left', x: 24, y: 88, label: 'Top Left' },
        'top-right': { id: 'top-right', x: 500, y: 88, label: 'Top Right' },
        'bottom-left': { id: 'bottom-left', x: 24, y: 500, label: 'Bottom Left' },
        'bottom-right': { id: 'bottom-right', x: 500, y: 500, label: 'Bottom Right' },
      };
    }

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const btnW = dimensions.width;
    const btnH = dimensions.height;

    const leftX = PADDING;
    const rightX = Math.max(PADDING, winW - btnW - PADDING);
    const topY = TOP_NAV_OFFSET;
    const bottomY = Math.max(topY, winH - btnH - PADDING);

    return {
      'top-left': { id: 'top-left', x: leftX, y: topY, label: 'Top Left' },
      'top-right': { id: 'top-right', x: rightX, y: topY, label: 'Top Right' },
      'bottom-left': { id: 'bottom-left', x: leftX, y: bottomY, label: 'Bottom Left' },
      'bottom-right': { id: 'bottom-right', x: rightX, y: bottomY, label: 'Bottom Right' },
    };
  };

  // Initialize position to bottom-right corner on mount
  useEffect(() => {
    setMounted(true);
    const updateSizeAndPos = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const w = rect.width > 0 ? rect.width : 210;
        const h = rect.height > 0 ? rect.height : 48;
        setDimensions({ width: w, height: h });

        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const corners = {
          'top-left': { x: PADDING, y: TOP_NAV_OFFSET },
          'top-right': { x: Math.max(PADDING, winW - w - PADDING), y: TOP_NAV_OFFSET },
          'bottom-left': { x: PADDING, y: Math.max(TOP_NAV_OFFSET, winH - h - PADDING) },
          'bottom-right': { x: Math.max(PADDING, winW - w - PADDING), y: Math.max(TOP_NAV_OFFSET, winH - h - PADDING) },
        };

        const target = corners[targetCorner] || corners['bottom-right'];
        rawX.set(target.x);
        rawY.set(target.y);
      }
    };

    updateSizeAndPos();
    window.addEventListener('resize', updateSizeAndPos);
    return () => window.removeEventListener('resize', updateSizeAndPos);
  }, [targetCorner]);

  // Handle drag movement and detect magnetic corner proximity
  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragDistanceRef.current += Math.hypot(info.delta.x, info.delta.y);
    const corners = getCorners();
    const currentX = rawX.get();
    const currentY = rawY.get();

    // Check distance to closest corner
    let nearestDist = Infinity;
    let nearestCorner: CornerPoint['id'] = 'bottom-right';

    (Object.values(corners) as CornerPoint[]).forEach((corner) => {
      const dist = Math.hypot(currentX - corner.x, currentY - corner.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestCorner = corner.id;
      }
    });

    if (nearestDist < MAGNETIC_RADIUS) {
      setMagneticActive(true);
      setTargetCorner(nearestCorner);
    } else {
      setMagneticActive(false);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    dragDistanceRef.current = 0;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setMagneticActive(false);

    const corners = getCorners();
    const currentX = rawX.get();
    const currentY = rawY.get();

    // Find the closest corner to snap with spring physics
    let nearestDist = Infinity;
    let closestCorner: CornerPoint = corners['bottom-right'];

    (Object.values(corners) as CornerPoint[]).forEach((corner) => {
      const dist = Math.hypot(currentX - corner.x, currentY - corner.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        closestCorner = corner;
      }
    });

    setTargetCorner(closestCorner.id);
    // Snap directly to the corner with the spring
    rawX.set(closestCorner.x);
    rawY.set(closestCorner.y);
  };

  const handleClick = (e: React.MouseEvent) => {
    // If user dragged more than 6 pixels, treat as drag release, don't open modal
    if (dragDistanceRef.current > 6) {
      e.stopPropagation();
      return;
    }
    onOpenContact();
  };

  const corners = getCorners();

  return (
    <>
      {/* Corner Magnetic Visual Anchor Rings when dragging near snap zones */}
      {isDragging && (
        <div className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300">
          {(Object.values(corners) as CornerPoint[]).map((corner) => {
            const isTargeted = targetCorner === corner.id && magneticActive;
            return (
              <motion.div
                key={corner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isTargeted ? 0.9 : 0.25,
                  scale: isTargeted ? 1.08 : 0.95,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  left: corner.x,
                  top: corner.y,
                  width: dimensions.width,
                  height: dimensions.height,
                }}
                className={`rounded-full border transition-colors flex items-center justify-center ${
                  isTargeted
                    ? 'border-[#F9F9F9]/80 bg-[#F9F9F9]/10 shadow-[0_0_24px_rgba(255,255,255,0.25)]'
                    : 'border-dashed border-[#F9F9F9]/20'
                }`}
              >
                {isTargeted && (
                  <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#F9F9F9] uppercase bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    Magnetic Snap
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Spring-Driven Floating Magnetic Button */}
      <motion.div
        id="floating-contact-founder-container"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: mounted ? springX : undefined,
          y: mounted ? springY : undefined,
          bottom: mounted ? undefined : 24,
          right: mounted ? undefined : 24,
          zIndex: 45,
          touchAction: 'none',
        }}
        drag
        dragMomentum={false}
        dragElastic={0.15}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileDrag={{
          scale: 1.06,
          cursor: 'grabbing',
        }}
        className="cursor-grab active:cursor-grabbing select-none"
      >
        <button
          ref={buttonRef}
          id="floating-contact-founder-btn"
          onClick={handleClick}
          className={`group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full text-white transition-all duration-300 ${
            magneticActive
              ? 'bg-[#222222] border-2 border-white shadow-[0_12px_40px_rgba(255,255,255,0.25)]'
              : 'bg-[#181818] hover:bg-[#202020] border border-white/30 hover:border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          } hover:scale-[1.02] cursor-pointer`}
          title="Drag anywhere to snap to corners • Click to contact founder directly"
        >
          <div className="relative shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#F9F9F9] group-hover:rotate-12 transition-transform duration-200" />
            <span
              className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors ${
                magneticActive ? 'bg-amber-300 shadow-[0_0_8px_#fde047]' : 'bg-[#F9F9F9] animate-pulse'
              }`}
            />
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] font-medium whitespace-nowrap">
            Contact Founder
          </span>

          <span className="inline-flex items-center overflow-hidden max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap text-[9px] font-mono tracking-wider text-[#F9F9F9]/70 pl-0 group-hover:pl-2.5 border-l-0 group-hover:border-l border-[#F9F9F9]/30 gap-1.5 pointer-events-none">
            <span>Direct Desk</span>
            <ArrowRight className="w-3 h-3 text-[#F9F9F9]/60 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </button>
      </motion.div>
    </>
  );
};
