import { type AssetData } from './app';

export const Asset = ({ type, cover, duration }: AssetData) => (
  <img alt="" className="h-40 w-full overflow-hidden rounded-md " src={cover} />
);
