import React from 'react';
import ChoiseButton from './ChoiseButton';
import './StoryChapter.css';

const StoryChapter = ({ text, background, choices, onChoice }) => {
  return (
    <div
      className="story-chapter"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="chapter-text">
        {text}
      </div>
      <div className="chapter-choices">
        {choices.map((choice, index) => (
          <ChoiseButton
            key={index}
            text={choice.text}
            onClick={() => onChoice(choice.next)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryChapter;
