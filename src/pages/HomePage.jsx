import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [categoryFilter, setCategoryFilter] = useState(''); // State lokal untuk filter

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Ambil list kategori unik
  const categories = new Set(threads.map((thread) => thread.category));

  // Logic filter
  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  })).filter((thread) => {
     // Jika filter kosong tampilkan semua, jika tidak sesuaikan kategori
     return categoryFilter ? thread.category === categoryFilter : true;
  });

  return (
    <section className="home-page">
       <div className="categories-list">
          <button onClick={() => setCategoryFilter('')}>All</button>
          {[...categories].map((category) => (
             <button key={category} onClick={() => setCategoryFilter(category)}>
                #{category}
             </button>
          ))}
       </div>
       <ThreadList threads={threadList} />
    </section>
  );
}