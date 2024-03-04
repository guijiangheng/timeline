'use client';

import { useEffect, useRef, useState } from 'react';

import { PIXELS_PER_SECOND } from '@/utils/consts';
import { type ClipData } from './app';

export const Clip = ({ begin, end, asset }: ClipData) => {
  const left = useDrag();
  const right = useDrag();

  return (
    <div
      className="absolute h-8 overflow-hidden rounded-md border border-gray-500 bg-red-300"
      style={{
        width: `${(end - begin) * PIXELS_PER_SECOND}px`,
        backgroundImage: `url(${asset.cover})`,
        backgroundSize: '60px auto',
      }}
    >
      <div
        ref={left.ref}
        className="absolute left-0 h-full w-2 cursor-ew-resize bg-red-600"
        style={{
          transform: `translateX(${left.offsetX}px)`,
        }}
      />
      <div
        ref={right.ref}
        className="absolute right-0 h-full w-2 cursor-ew-resize bg-red-600"
        style={{
          transform: `translateX(${right.offsetX}px)`,
        }}
      />
    </div>
  );
};

const useDrag = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (ref.current !== null) {
      const node = ref.current;
      let startX = 0;

      const onMouseDown = (e: MouseEvent) => {
        setDragging(true);
        startX = e.pageX;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      const onMouseMove = (e: MouseEvent) => {
        setOffsetX(e.pageX - startX);
      };

      const onMouseUp = (e: MouseEvent) => {
        setDragging(false);
        setOffsetX(0);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      node.addEventListener('mousedown', onMouseDown);

      return () => {
        node.removeEventListener('mousedown', onMouseDown);
      };
    }
  }, []);

  return { ref, dragging, offsetX };
};
