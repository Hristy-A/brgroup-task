import Story from '../Story/Story'

import type { IStory } from '~/types/IStory'

type Props = {
  stories: IStory[]
}

const Stories = ({stories}: Props) => {
  return (
    <div className='stories'>
      {
        stories.map((story, index) => <Story key={story.id} story={story} index={index + 1} />)
      }
    </div>
  )
}

export default Stories
