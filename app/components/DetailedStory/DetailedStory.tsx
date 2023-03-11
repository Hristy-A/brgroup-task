import Comment from "~/components/Comment/Comment"
import Story from "~/components/Story/Story";

import type { IDetailedStory } from "~/types/IDetailedStory"

type DetailedStoryProps = {
  story: IDetailedStory;
  onExpand: (id: number) => void;
}

const DetailedStory = ({story, onExpand}: DetailedStoryProps) => {
  return (
    <div className='stories'>
      <Story story={story} />
        {
          story.comments.map(comment => <Comment key={comment.id} comment={comment} onExpand={onExpand} />)
        }
    </div>
  )
}

export default DetailedStory
