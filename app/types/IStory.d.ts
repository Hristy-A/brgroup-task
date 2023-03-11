export interface IStory {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;

  kids?: number[];
  deleted?: true;
  dead?: true;
}
