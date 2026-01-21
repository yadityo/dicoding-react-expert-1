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

// ... action creator lain

// THUNK FUNCTION
function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    // Tampilkan loading
    dispatch(showLoading()); 
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleLikeThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();
        // 1. Optimistic Update UI dulu
        dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
        
        // 2. Request API
        try {
            await api.toggleLikeThread(threadId);
        } catch (error) {
            alert(error.message);
            // 3. Rollback state jika error (opsional tapi disarankan)
            dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id })); 
        }
    }
}

export { 
    ActionType, 
    receiveThreadsActionCreator, 
    asyncPopulateUsersAndThreads,
    asyncToggleLikeThread
};