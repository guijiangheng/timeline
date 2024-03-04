'use client';

import { PIXELS_PER_SECOND } from '@/utils/consts';
import { useDroppable } from '@dnd-kit/core';
import { useMemo } from 'react';
import { useStore } from './app';
import { Timeline } from './timeline';

export const Timelines = () => {
  const { timelines } = useStore();

  const { isOver, setNodeRef } = useDroppable({
    id: 'timelines',
  });

  const width = useMemo(
    () =>
      Math.max(
        ...timelines.map((x) =>
          Math.max(
            ...x.clips.map(
              (clip) =>
                (clip.position + clip.end - clip.begin) * PIXELS_PER_SECOND,
            ),
          ),
        ),
      ),
    [timelines],
  );

  return (
    <div
      ref={setNodeRef}
      className="flex h-80 flex-col overflow-auto border-t border-gray-900 bg-gray-700"
      style={{
        opacity: isOver ? 0.8 : 1,
        minWidth: `${width + 100}px`,
      }}
    >
      {timelines.map((x) => (
        <Timeline key={x.id} id={x.id} clips={x.clips} />
      ))}
    </div>
  );
};
