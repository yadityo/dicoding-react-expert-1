import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { FaRegComment, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa6';
import { postedAt, threadItemShape } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (isUpVoted) {
      neutralVote(id);
    } else {
      upVote(id);
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (isDownVoted) {
      neutralVote(id);
    } else {
      downVote(id);
    }
  };

  return (
    <div className="thread-item">
      <header className="thread-item__header">
        <span className="thread-item__category">#{category}</span>
        <h4 className="thread-item__title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h4>
      </header>
      <div className="thread-item__body">
        {parser(body.length > 200 ? `${body.substring(0, 200)}...` : body)}
      </div>
      <footer className="thread-item__footer">
        <div className="thread-item__buttons">
          <button type="button" onClick={onUpVoteClick} aria-label="Upvote">
            {isUpVoted ? <FaThumbsUp style={{ color: 'red' }} /> : <FaRegThumbsUp />}
            <span className="thread-item__up-vote-label">{upVotesBy.length}</span>
          </button>
          <button type="button" onClick={onDownVoteClick} aria-label="Downvote">
            {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <span className="thread-item__down-vote-label">{downVotesBy.length}</span>
          </button>
          <div className="thread-item__comment-count">
            <FaRegComment />
            <span>{totalComments}</span>
          </div>
        </div>
        <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        <div className="thread-item__owner">
          <p>Dibuat oleh <strong>{user.name}</strong></p>
          <img src={user.avatar} alt={user.name} />
        </div>
      </footer>
    </div>
  );
}

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default ThreadItem;