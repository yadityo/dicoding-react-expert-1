import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
      
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
      
    case ActionType.TOGGLE_LIKE_THREAD: {
      const { threadId, userId, voteType } = action.payload;

      return threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,

            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      }).map((thread) => {

        if (thread.id === threadId) {
           if (voteType === 1) {
             return {
               ...thread,
               upVotesBy: [...thread.upVotesBy, userId],
             };
           } 
           if (voteType === -1) {
             return {
               ...thread,
               downVotesBy: [...thread.downVotesBy, userId],
             };
           }

        }
        return thread;
      });
    }
      
    default:
      return threads;
  }
}

export default threadsReducer;