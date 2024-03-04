import { nanoid } from 'nanoid';

import { StoreProvider } from '@/components/app';
import { Assets } from '@/components/assets';
import { Timelines } from '@/components/timelines';
import { AssetType } from '@/utils/consts';

export default async function Home() {
  const assets = new Array(4).fill(null).map((_, k) => ({
    id: nanoid(),
    type: AssetType.Video,
    duration: 5 + Math.floor(Math.random() * 100 * 100) / 100,
    cover: `https://picsum.photos/id/${k}/200/300`,
  }));

  return (
    <StoreProvider assets={assets}>
      <main className="flex min-h-screen">
        {/* Asset library */}
        <div className="flex w-80 flex-shrink-0 border-r border-gray-300 p-2">
          <Assets />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center">Canvas</div>
          <div className="flex h-80 overflow-auto border-t border-gray-900 bg-gray-700">
            <Timelines />
          </div>
        </div>
      </main>
    </StoreProvider>
  );
}
