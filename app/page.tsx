import { StoreProvider } from '@/components/app';
import { Assets } from '@/components/assets';
import { Timelines } from '@/components/timelines';

export default function Home() {
  return (
    <StoreProvider>
      <main className="flex min-h-screen">
        {/* Asset library */}
        <div className="flex w-80 border-r border-gray-300 p-2">
          <Assets />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center">Canvas</div>
          <Timelines />
        </div>
      </main>
    </StoreProvider>
  );
}
