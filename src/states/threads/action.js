import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}


function toggleLikeThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: { threadId, userId, voteType },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id, voteType: 1 })); 
    try {
      await api.toggleUpVoteThread(threadId);
    } catch (error) {
      alert(error.message);

      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id, voteType: 0 })); 
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id, voteType: -1 })); 
    try {
      await api.toggleDownVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id, voteType: 0 }));
    }
  };
}

function asyncToggleNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id, voteType: 0 }));
    try {
      await api.toggleNeutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);

    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleLikeThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
};