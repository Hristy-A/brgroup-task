import type { IStory } from '~/types/IStory';
import type { IComment } from '~/types/IComment';
import type { IExpandedComment } from '~/types/IExpandedComment';

export function fetchLastStories(): Promise<number[]> {
  return fetch('https://hacker-news.firebaseio.com/v0/newstories.json').then((response) => {
    if (response.ok) return response.json();
    throw new Error('failed to fetch stories');
  });
}

export async function fetchStory(id: number): Promise<IStory> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => {
    if (response.ok) return response.json();
    throw new Error('failed to fetch story');
  });
}

export async function fetchComment(id: number): Promise<IComment> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => {
    if (response.ok)
      return response.json().then((comment) => {
        comment.expanded = false;
        return comment;
      });

    throw new Error('failed to fetch comment');
  });
}

export async function fetchReplies(id: number): Promise<IExpandedComment> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => {
    if (response.ok)
      return response.json().then((comment) => {
        comment.expanded = true;
        return comment;
      });

    throw new Error('failed to fetch comment');
  });
}
