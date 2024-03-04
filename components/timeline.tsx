'use client';

import { useDroppable } from '@dnd-kit/core';
import { type TimelineData } from './app';
import { Clip } from './clip';

export const Timeline = ({ id, clips }: TimelineData) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="relative box-content h-8 bg-blue-300 px-2 py-1"
      style={{
        opacity: isOver ? 0.8 : 1,
      }}
    >
      {clips.map((x) => (
        <Clip
          key={x.id}
          timelineId={id}
          id={x.id}
          position={x.position}
          begin={x.begin}
          end={x.end}
          asset={x.asset}
        />
      ))}
    </div>
  );
};
