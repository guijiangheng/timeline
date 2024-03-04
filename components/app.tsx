'use client';

import { nanoid } from 'nanoid';
import { type ReactNode } from 'react';
import { useImmer, type Updater } from 'use-immer';

import { type AssetType } from '@/utils/consts';
import { createContext } from '@/utils/create-context';
import { DndContext } from '@dnd-kit/core';

export interface AssetData {
  id: string;
  type: AssetType;
  cover: string;
  duration: number;
}

export interface ClipData {
  id: string;
  position: number;
  begin: number;
  end: number;
  asset: AssetData;
}

export interface TimelineData {
  id: string;
  clips: ClipData[];
}

interface StoreValue {
  assets: AssetData[];
  timelines: TimelineData[];
  setTimelines: Updater<TimelineData[]>;
}

export const [StoreProviderImpl, useStore] = createContext<StoreValue>('Store');

export const StoreProvider = ({
  assets,
  children,
}: {
  assets: AssetData[];
  children: ReactNode;
}) => {
  const [timelines, setTimelines] = useImmer<TimelineData[]>(() =>
    new Array(4).fill(null).map((_, k) => ({
      id: nanoid(),
      clips: [
        {
          id: nanoid(),
          position: 0,
          begin: 0,
          end: assets[k].duration,
          asset: assets[k],
        },
      ],
    })),
  );

  return (
    <DndContext
      onDragEnd={(e) => {
        if (e.over !== null) {
          if (e.over.id === 'timelines') {
            setTimelines((draft) => {
              const asset = assets.find((x) => x.id === e.active.id)!;

              draft.push({
                id: nanoid(),
                clips: [
                  {
                    id: nanoid(),
                    position: 0,
                    begin: 0,
                    end: asset.duration,
                    asset,
                  },
                ],
              });
            });
          } else if (typeof e.over.id === 'string') {
            setTimelines((draft) => {
              console.log(e.over!.id);
              const asset = assets.find((x) => x.id === e.active.id)!;
              const timeline = draft.find((x) => x.id === e.over!.id)!;

              let position = 0;

              if (timeline.clips.length > 0) {
                const lastClip = timeline.clips[timeline.clips.length - 1];
                position = lastClip.position + (lastClip.end - lastClip.begin);
              }

              timeline.clips.push({
                id: nanoid(),
                position,
                begin: 0,
                end: asset.duration,
                asset,
              });
            });
          }
        }
      }}
    >
      <StoreProviderImpl
        assets={assets}
        timelines={timelines}
        setTimelines={setTimelines}
      >
        {children}
      </StoreProviderImpl>
    </DndContext>
  );
};
