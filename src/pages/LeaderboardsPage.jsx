import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <header>
        <h2>Klasemen Pengguna Aktif</h2>
      </header>
      <div className="leaderboards-list">
        <header className="leaderboards-list__header">
          <p className="leaderboards-list__header-label">Pengguna</p>
          <p className="leaderboards-list__header-label">Skor</p>
        </header>
        {leaderboards.map(({ user, score }) => (
          <LeaderboardItem key={user.id} user={user} score={score} />
        ))}
      </div>
    </section>
  );
}

export default LeaderboardsPage;