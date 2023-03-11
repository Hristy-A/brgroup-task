import type { IStory } from './IStory';
import type { IComment } from './IComment';
import type { IExpandedComment } from './IExpandedComment';

export interface IDetailedStory extends Omit<IStory, 'kids'> {
  comments: Array<IComment | IExpandedComment>;
}
