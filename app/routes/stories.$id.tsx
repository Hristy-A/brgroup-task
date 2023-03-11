import { useState } from 'react'
import { Link, useLoaderData, useParams } from "@remix-run/react";
import DetailedStory from "~/components/DetailedStory/DetailedStory";
import * as storyService from '~/services/storyService'

import comment from '~/styles/comment.css'
import shared from '~/styles/shared.css'
import refreshIcon from '~/assets/refresh.png'
import backIcon from '~/assets/back.png'

import type { LoaderArgs } from "@remix-run/node";
import type { IDetailedStory } from "~/types/IDetailedStory";

const Story = () => {
  const initStory = useLoaderData();
  const [story, setStory] = useState<IDetailedStory>(initStory);
  const { id = 0 } = useParams();

  async function updateStory() {
    const story = await storyService.fetchStory(Number(id as string));
    setStory(story);
  }

  async function handleExpandComment(id: number) {
    const expandedComments = await storyService.fetchExpandedComment(id);

    setStory(prevStory => {
      return {
        ...prevStory,
        comments: prevStory.comments.map(comment => {
          return comment.id === id ? expandedComments : comment;
        })
      }
    })
  }

  return (
    <>
      <header className="header">
        <Link to="/"><img className="header__back" src={backIcon} alt="" /></Link>
        <h1 className="header__title">Hacker News</h1>
        <button onClick={updateStory} className="header__refresh-button"><img src={refreshIcon} alt="" className="header__refresh" /></button>
      </header>
      <DetailedStory story={story} onExpand={handleExpandComment} />
    </>
  )
}

export function loader({ params }: LoaderArgs): Promise<IDetailedStory> {
  const id = params.id as string;

  return storyService.fetchStory(Number(id));
}

export function links() {
  return [
    {rel: 'stylesheet', href: shared},
    {rel: 'stylesheet', href: comment},
  ];
}

export default Story;
