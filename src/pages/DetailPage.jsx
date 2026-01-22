import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,      // Import baru
  asyncToggleDownVoteComment,    // Import baru
  asyncToggleNeutralVoteComment, // Import baru
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = ({ content }) => {
    dispatch(asyncCreateComment({ content }));
  };

  const onUpVoteThreadDetail = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const onNeutralVoteThreadDetail = () => {
    dispatch(asyncToggleNeutralVoteThreadDetail());
  };

  // Handler untuk komentar
  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  const onNeutralVoteComment = (commentId) => {
    dispatch(asyncToggleNeutralVoteComment(commentId));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="detail-page">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        addComment={onAddComment}
        upVoteThreadDetail={onUpVoteThreadDetail}
        downVoteThreadDetail={onDownVoteThreadDetail}
        neutralVoteThreadDetail={onNeutralVoteThreadDetail}
        upVoteComment={onUpVoteComment}
        downVoteComment={onDownVoteComment}
        neutralVoteComment={onNeutralVoteComment}
      />
    </div>
  );
}

export default DetailPage;