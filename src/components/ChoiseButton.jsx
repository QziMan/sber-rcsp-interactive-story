import React from 'react';
import './ChoiseButton.css';

const ChoiseButton = ({ text, onClick }) => {
  return (
    <button className="choise-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default ChoiseButton;
