import * as React from 'react';

/**
 * Pointer-driven 3D tilt for dashboard cards. Tracks the cursor within the
 * element and writes rotation (--rx/--ry) and a sheen origin (--mx/--my) as
 * CSS custom properties consumed by the .tilt-3d class in globals.css.
 *
 * Returns props to spread onto the element you want to tilt. The element must
 * carry the `tilt-3d` class. Honors prefers-reduced-motion by no-opping.
 *
 * @param max Maximum rotation in degrees at the edges of the element.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 9) {
  const ref = React.useRef<T>(null);

  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el || prefersReducedMotion) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Pointer position normalized to 0..1 within the element.
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      // Map to rotation. rotateY follows horizontal travel; rotateX is
      // inverted so the top edge tips away as the cursor rises.
      const ry = (px - 0.5) * 2 * max;
      const rx = -(py - 0.5) * 2 * max;
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    },
    [max, prefersReducedMotion],
  );

  const reset = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, []);

  return { ref, onMouseMove, onMouseLeave: reset };
}
