import type { IExpandedComment } from '~/types/IExpandedComment';

import type { IComment } from '~/types/IComment'

function isExpandedComment(comment: IComment | IExpandedComment): comment is IExpandedComment {
  return comment.expanded;
}

type CommentProps = {
  comment: IComment | IExpandedComment;
  onExpand?:  (id: number) => void;
}

const Comment = ({comment, onExpand}: CommentProps) => {
  if (comment.expanded || comment.kids === undefined || comment.kids.length === 0) {
    return (
      <div className='comment'>
        <div className='comment__title'>{comment.by} | {new Date(comment.time * 1000).toLocaleString()} |&nbsp;
          <span>
           {comment.kids?.length ?? 0} repl{(comment.kids?.length ?? 0) === 1 ? 'y' : 'ies'}
          </span>
        </div>
        <div className='comment__text'>{comment.text}</div>
        {isExpandedComment(comment) && comment.comments.map(comment => <div key={comment.id} className='comment__inner'><Comment  comment={comment} /></div>)}
      </div>
    )
  }

  return (
    <div className='comment'>
      <div className='comment__title'>{comment.by} | {new Date(comment.time * 1000).toLocaleString()} |&nbsp;
        <span className='comment__expand' onClick={() => onExpand?.(comment.id)}>
          show {comment.kids.length} repl{comment.kids.length === 1 ? 'y' : 'ies'}
        </span>
      </div>
      <div className='comment__text'>{comment.text}</div>
    </div>
    
  )
}

export default Comment
