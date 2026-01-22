import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa6';
import { postedAt, commentItemShape } from '../utils';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

function ThreadDetail({
  title, // 'id' dihapus dari sini
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUser,
  upVoteThreadDetail,
  downVoteThreadDetail,
  neutralVoteThreadDetail,
  addComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  return (
    <section className="thread-detail">
      <header>
        <span className="thread-detail__category">#{category}</span>
      </header>
      <div className="thread-detail__content">
        <h2>{title}</h2>
        <div className="thread-detail__body">{parser(body)}</div>
        <div className="thread-detail__footer">
          <div className="thread-detail__buttons">
            <button type="button" onClick={isUpVoted ? neutralVoteThreadDetail : upVoteThreadDetail}>
              {isUpVoted ? <FaThumbsUp style={{ color: 'red' }} /> : <FaRegThumbsUp />}
              <span>{upVotesBy.length}</span>
            </button>
            <button type="button" onClick={isDownVoted ? neutralVoteThreadDetail : downVoteThreadDetail}>
              {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
              <span>{downVotesBy.length}</span>
            </button>
          </div>
          <div className="thread-detail__owner">
            <p>Dibuat oleh <strong>{owner.name}</strong></p>
            <img src={owner.avatar} alt={owner.name} />
            <p>{postedAt(createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="thread-detail__comments">
        <h3>Komentar ({comments.length})</h3>
        <CommentInput addComment={addComment} />
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authUser={authUser}
              upVote={upVoteComment}
              downVote={downVoteComment}
              neutralVote={neutralVoteComment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

ThreadDetail.propTypes = {
  // id: PropTypes.string.isRequired, // Hapus validasi id
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteThreadDetail: PropTypes.func.isRequired,
  downVoteThreadDetail: PropTypes.func.isRequired,
  neutralVoteThreadDetail: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  upVoteComment: PropTypes.func, // Opsional jika belum diimplementasi
  downVoteComment: PropTypes.func,
  neutralVoteComment: PropTypes.func,
};

export default ThreadDetail;