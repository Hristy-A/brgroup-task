import type { IComment } from './IComment';

export interface IExpandedComment extends Omit<IComment, 'expanded'> {
  comments: IExpandedComment[];
  expanded: true;
}
