import { Link } from "@remix-run/react"

import linkIcon from '~/assets/link.png'
import upArrowIcon from '~/assets/uparrow.png'

import type { IStory } from "~/types/IStory"


type StoryProps = {
  story: IStory;
  index?: number;
}

const Story = ({story, index}: StoryProps) => {
  return (
    <div className="stories__row">
      {index && <div className="stories__index">{index}.</div>}
      <img src={upArrowIcon} alt="" className="stories__vote-icon" />
      <div>
        <div>
          <span>{story.title}</span>
          &nbsp;
          <a href={story.url} target='_blank' rel="noreferrer"><img className="stories__open-origin-icon" src={linkIcon} alt="" /></a>
        </div>
        <div className="stories__details">
          <span>
            {story.score} points by {story.by}
          </span>
          &nbsp;|&nbsp;
          <Link className="stories__comments-link" to={`/stories/${story.id}`}>{story.kids?.length ?? 0} {story.kids?.length === 1 ? 'comment' : 'comments'}</Link>
          <span>
          &nbsp;|
          written at {new Date(story.time * 1000).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Story
