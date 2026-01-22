import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa6';
import { postedAt, commentItemShape } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralVote,
  authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (isUpVoted) {
      neutralVote(id);
    } else {
      upVote(id);
    }
  };

  const onDownVoteClick = () => {
    if (isDownVoted) {
      neutralVote(id);
    } else {
      downVote(id);
    }
  };

  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner">
          <img src={owner.avatar} alt={owner.name} />
          <p>
            <strong>{owner.name}</strong>
          </p>
        </div>
        <p className="comment-item__posted-at">{postedAt(createdAt)}</p>
      </header>
      <div className="comment-item__content">{parser(content)}</div>
      <footer className="comment-item__footer">
        <button type="button" onClick={onUpVoteClick}>
          {isUpVoted ? <FaThumbsUp style={{ color: 'red' }} /> : <FaRegThumbsUp />}
          <span>{upVotesBy.length}</span>
        </button>
        <button type="button" onClick={onDownVoteClick}>
          {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
          <span>{downVotesBy.length}</span>
        </button>
      </footer>
    </div>
  );
}

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default CommentItem;