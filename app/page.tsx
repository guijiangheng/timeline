import { Asset, AssetType, type AssetProps } from '@/components/asset';
import { Timeline } from '@/components/timeline';

const assets: AssetProps[] = new Array(4).fill(null).map((_, k) => ({
  type: AssetType.Video,
  duration: Math.floor(Math.random() * 100 * 100) / 100,
  cover: `https://picsum.photos/id/${k}/200/300`,
}));

const timelines = new Array(4).fill(null).map((_, k) => ({
  clips: [{ position: 0, begin: 0, end: assets[k].duration, asset: assets[k] }],
}));

export default function Home() {
  return (
    <main className="flex min-h-screen">
      {/* Asset library */}
      <div className="flex w-80 border-r border-gray-300 p-2">
        <div className="grid flex-1 grid-cols-2 gap-2 self-start">
          {assets.map((x, k) => (
            <Asset
              key={k}
              type={x.type}
              cover={x.cover}
              duration={x.duration}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center">Canvas</div>
        <div className="flex h-80 flex-col overflow-auto border-t border-gray-900 bg-gray-700">
          {timelines.map((x, k) => (
            <Timeline key={k} clips={x.clips} />
          ))}
        </div>
      </div>
    </main>
  );
}
