'use client';

import { nanoid } from 'nanoid';
import { type ReactNode } from 'react';
import { useImmer, type Updater } from 'use-immer';

import { createContext } from '@/utils/create-context';

export enum AssetType {
  Video,
  Audio,
}

export interface AssetData {
  id: string;
  type: AssetType;
  cover: string;
  duration: number;
}

export interface ClipData {
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

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useImmer<AssetData[]>(() =>
    new Array(4).fill(null).map((_, k) => ({
      id: nanoid(),
      type: AssetType.Video,
      duration: Math.floor(Math.random() * 100 * 100) / 100,
      cover: `https://picsum.photos/id/${k}/200/300`,
    })),
  );

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
    <StoreProviderImpl
      assets={assets}
      timelines={timelines}
      setTimelines={setTimelines}
    >
      {children}
    </StoreProviderImpl>
  );
};
