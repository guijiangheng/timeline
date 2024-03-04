'use client';

import { useStore } from './app';
import { Asset } from './asset';

export const Assets = () => {
  const { assets } = useStore();

  return (
    <div className="grid flex-1 grid-cols-2 gap-2 self-start">
      {assets.map((x) => (
        <Asset
          key={x.id}
          id={x.id}
          type={x.type}
          cover={x.cover}
          duration={x.duration}
        />
      ))}
    </div>
  );
};
