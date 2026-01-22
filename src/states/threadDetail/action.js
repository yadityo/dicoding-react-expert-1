import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeThreadDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}


function toggleLikeCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: { commentId, userId, voteType },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();
    try {
      await api.createComment({ threadId: threadDetail.id, content });
      dispatch(asyncReceiveThreadDetail(threadDetail.id));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}


function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, voteType: 1 }));
    try {
      await api.toggleUpVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, voteType: 0 }));
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, voteType: -1 }));
    try {
      await api.toggleDownVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, voteType: 0 }));
    }
  };
}

function asyncToggleNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, voteType: 0 }));
    try {
      await api.toggleNeutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}


function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, voteType: 1 }));
    try {
      await api.toggleUpVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, voteType: 0 }));
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, voteType: -1 }));
    try {
      await api.toggleDownVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, voteType: 0 }));
    }
  };
}

function asyncToggleNeutralVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, voteType: 0 }));
    try {
      await api.toggleNeutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleLikeThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
};