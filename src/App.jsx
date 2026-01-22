import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LeaderboardsPage from './pages/LeaderboardsPage'; // 1. Import ini
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import Navigation from './components/Navigation';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import './App.css';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return <Loading />;
  }

  if (authUser === null) {
    return (
      <main>
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="app-container">
      <header>
        <Navigation authUser={authUser} signOut={onSignOut} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<AddThreadPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;