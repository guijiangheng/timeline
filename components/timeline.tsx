'use client';

import { type TimelineData } from './app';
import { Clip } from './clip';

export const Timeline = ({ id, clips }: TimelineData) => (
  <div className="relative box-content h-8 bg-blue-300 px-2 py-1 hover:bg-blue-400">
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
