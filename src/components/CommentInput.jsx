import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  function onAddComment(event) {
    event.preventDefault();
    if (content.trim()) {
        addComment({ content });
        setContent('');
    }
  }

  return (
    <form className="comment-input" onSubmit={onAddComment}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Beri komentar..."
        required
      />
      <button type="submit">Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;