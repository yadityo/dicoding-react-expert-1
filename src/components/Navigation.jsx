import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  return (
    <div className="navigation">
      <img src={authUser.avatar} alt={authUser.id} title={authUser.name} />
      <nav>
        <Link to="/">Threads</Link>
        <Link to="/leaderboards">Leaderboards</Link>
      </nav>
      <button type="button" onClick={signOut}>Sign Out</button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;