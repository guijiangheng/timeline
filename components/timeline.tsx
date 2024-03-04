'use client';

import { type TimelineData } from './app';
import { Clip } from './clip';

export const Timeline = ({ clips }: TimelineData) => (
  <div className="relative box-content h-8 bg-blue-300 px-2 py-1 hover:bg-blue-400">
    {clips.map((x, k) => (
      <Clip
        key={k}
        position={x.position}
        begin={x.begin}
        end={x.end}
        asset={x.asset}
      />
    ))}
  </div>
);
