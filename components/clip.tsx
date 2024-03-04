'use client';

import { useEffect, useRef, useState } from 'react';

import { PIXELS_PER_SECOND } from '@/utils/consts';
import { useEventCallback } from '@/utils/use-event-callback';

import { useStore, type ClipData } from './app';

export interface ClipProps extends ClipData {
  timelineId: string;
}

export const Clip = ({
  timelineId,
  id,
  position,
  begin,
  end,
  asset,
}: ClipProps) => {
  const { setTimelines } = useStore();

  const left = useDrag((offset) => {
    setTimelines((timelines) => {
      const timeline = timelines.find((x) => x.id === timelineId);
      if (timeline !== undefined) {
        const clip = timeline.clips.find((x) => x.id === id);
        if (clip !== undefined) {
          const newBegin = Math.min(
            clip.end,
            Math.max(0, clip.begin + offset / PIXELS_PER_SECOND),
          );
          const realOffset = newBegin - clip.begin;
          clip.begin = newBegin;
          clip.position += realOffset;
        }
      }
    });
  });

  const right = useDrag((offset) => {
    setTimelines((timelines) => {
      const timeline = timelines.find((x) => x.id === timelineId);
      if (timeline !== undefined) {
        const clip = timeline.clips.find((x) => x.id === id);
        if (clip !== undefined) {
          clip.end = Math.max(
            clip.begin,
            Math.min(asset.duration, clip.end + offset / PIXELS_PER_SECOND),
          );
        }
      }
    });
  });

  return (
    <div
      className="absolute h-8 overflow-hidden rounded-md border border-gray-500 bg-red-300"
      style={{
        width: `${(end - begin) * PIXELS_PER_SECOND}px`,
        backgroundImage: `url(${asset.cover})`,
        backgroundSize: '60px auto',
        transform: `translateX(${position * PIXELS_PER_SECOND}px)`,
      }}
    >
      <div
        ref={left.ref}
        className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-red-600"
        style={{
          transform: `translateX(${begin * PIXELS_PER_SECOND}px)`,
        }}
      />
      <div
        ref={right.ref}
        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-red-600"
      />
    </div>
  );
};

type UseDragCallback = (offset: number) => void;

const useDrag = (callback: UseDragCallback) => {
  const ref = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);

  const memoCallback = useEventCallback(callback);

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
        memoCallback(e.pageX - startX);
        startX = e.pageX;
      };

      const onMouseUp = (e: MouseEvent) => {
        setDragging(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      node.addEventListener('mousedown', onMouseDown);

      return () => {
        node.removeEventListener('mousedown', onMouseDown);
      };
    }
  }, [memoCallback]);

  return { ref, dragging };
};
