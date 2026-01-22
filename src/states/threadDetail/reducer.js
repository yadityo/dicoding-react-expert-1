import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
      
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.TOGGLE_LIKE_THREAD_DETAIL: {
      const { userId, voteType } = action.payload;
      if (!threadDetail) return threadDetail;

      const cleanUpVotes = threadDetail.upVotesBy.filter((id) => id !== userId);
      const cleanDownVotes = threadDetail.downVotesBy.filter((id) => id !== userId);

      let newUpVotes = cleanUpVotes;
      let newDownVotes = cleanDownVotes;

      if (voteType === 1) newUpVotes = [...newUpVotes, userId];
      else if (voteType === -1) newDownVotes = [...newDownVotes, userId];

      return {
        ...threadDetail,
        upVotesBy: newUpVotes,
        downVotesBy: newDownVotes,
      };
    }


    case ActionType.TOGGLE_LIKE_COMMENT: {
      const { commentId, userId, voteType } = action.payload;
      if (!threadDetail) return threadDetail;

      const newComments = threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const cleanUpVotes = comment.upVotesBy.filter((id) => id !== userId);
          const cleanDownVotes = comment.downVotesBy.filter((id) => id !== userId);

          let newUpVotes = cleanUpVotes;
          let newDownVotes = cleanDownVotes;

          if (voteType === 1) newUpVotes = [...newUpVotes, userId];
          else if (voteType === -1) newDownVotes = [...newDownVotes, userId];

          return {
            ...comment,
            upVotesBy: newUpVotes,
            downVotesBy: newDownVotes,
          };
        }
        return comment;
      });

      return {
        ...threadDetail,
        comments: newComments,
      };
    }

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;