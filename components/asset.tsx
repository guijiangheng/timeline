export enum AssetType {
  Video,
  Audio,
}

export interface AssetData {
  type: AssetType;
  cover: string;
  duration: number;
}

export type AssetProps = AssetData;

export const Asset = ({ type, cover, duration }: AssetProps) => (
  <img alt="" className="h-40 w-full overflow-hidden rounded-md " src={cover} />
);
