import React, { useState } from 'react';

const LimitedTextView = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div style={{ maxHeight: expanded ? 'none' : '50px', overflow: 'hidden' }}>
        {text}
      </div>
      <button onClick={toggleExpanded}>
        {expanded ? '↑ Show Less' : '↓ Show More'}
      </button>
    </>
  );
};

export default LimitedTextView;