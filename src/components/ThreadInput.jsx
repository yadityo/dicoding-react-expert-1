import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function onAddThread(event) {
    event.preventDefault();
    if (title.trim() && body.trim()) {
       addThread({ title, body, category });
    }
  }

  return (
    <form className="thread-input" onSubmit={onAddThread}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Kategori (opsional)"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Apa yang ingin Anda diskusikan?"
        required
      />
      <button type="submit">Buat</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;