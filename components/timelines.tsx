'use client';

import { useStore } from './app';
import { Timeline } from './timeline';

export const Timelines = () => {
  const { timelines } = useStore();

  return (
    <div className="flex h-80 flex-col overflow-auto border-t border-gray-900 bg-gray-700">
      {timelines.map((x) => (
        <Timeline key={x.id} id={x.id} clips={x.clips} />
      ))}
    </div>
  );
};
