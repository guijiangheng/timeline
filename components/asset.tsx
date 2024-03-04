import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { type AssetData } from './app';

export const Asset = ({ id, cover }: AssetData) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={setNodeRef}
      alt=""
      {...listeners}
      {...attributes}
      className="h-40 w-full overflow-hidden rounded-md "
      src={cover}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
    />
  );
};
