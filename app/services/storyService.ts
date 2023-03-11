import * as hackerNewsApi from '~/api/hackerNewsApi';

import type { IStory } from '~/types/IStory';

type FetchOptions = {
  limit: number;
};

export async function fetchLastStories(): Promise<IStory[]>;
export async function fetchLastStories(options: FetchOptions): Promise<IStory[]>;
export async function fetchLastStories(
  { limit }: FetchOptions = { limit: 100 },
): Promise<IStory[]> {
  const storiesIds: number[] = await hackerNewsApi.fetchLastStories();

  const stories = await Promise.all(
    storiesIds.slice(0, limit).map((storyId) => hackerNewsApi.fetchStory(storyId)),
  );

  return stories;
}

export async function fetchStory(storyId: number) {
  const story = await hackerNewsApi.fetchStory(storyId);

  return {
    ...story,
    comments: await Promise.all(
      story.kids?.map((commentId) => hackerNewsApi.fetchComment(commentId)) ?? [],
    ),
  };
}

export async function fetchExpandedComment(commentId: number) {
  const rootComment = await hackerNewsApi.fetchReplies(commentId);

  if (rootComment.kids !== undefined && rootComment.kids.length > 0) {
    rootComment.comments = await Promise.all(rootComment.kids.map(fetchExpandedComment));
  } else {
    rootComment.comments = [];
  }

  return rootComment;
}
