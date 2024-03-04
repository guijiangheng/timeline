import { Clip, type ClipData } from './clip';

export interface TimelineProps {
  clips: ClipData[];
}

export const Timeline = ({ clips }: TimelineProps) => (
  <div className="relative box-content h-8 bg-blue-300 py-1 hover:bg-blue-400">
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
