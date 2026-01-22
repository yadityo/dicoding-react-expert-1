import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { 
  asyncToggleUpVoteThread, 
  asyncToggleDownVoteThread, 
  asyncToggleNeutralVoteThread 
} from '../states/threads/action';

function HomePage() {

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => {
    dispatch(asyncToggleUpVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncToggleDownVoteThread(id));
  };

  const onNeutralVote = (id) => {
    dispatch(asyncToggleNeutralVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <ThreadList 
        threads={threadList} 
        upVote={onUpVote} 
        downVote={onDownVote} 
        neutralVote={onNeutralVote} 
      />

      <div className="homepage__action">
        <Link to="/new" className="action-button">
            <FaPlus />
        </Link>
      </div>
    </section>
  );
}

export default HomePage;