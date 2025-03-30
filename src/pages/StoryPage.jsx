import React, { useState } from 'react';
import StoryChapter from './StoryChapter';
import './StoryPage.css';

const storyData = {
  chapter1: {
    text: "В три-девятом цартве, в три-десятом государстве...",
    background: "https://via.placeholder.com/600x400?text=Chapter+1",
    choices: [
      { text: "Спасти дракона", next: "chapter2" },
      { text: "Подружиться с драконом", next: "chapter3" },
    ],
  },
  chapter2: {
    text: "Вы решили спасти дракона. Он благодарит вас и ведёт к новым приключениям.",
    background: "https://via.placeholder.com/600x400?text=Chapter+2",
    choices: [
      { text: "Продолжить приключение", next: "chapter4" },
      { text: "Остаться с драконом", next: "chapter5" },
    ],
  },
  chapter3: {
    text: "Вы решили подружиться с драконом. Он становится вашим верным другом.",
    background: "https://via.placeholder.com/600x400?text=Chapter+3",
    choices: [
      { text: "Исследовать мир вместе", next: "chapter4" },
      { text: "Отправиться в путешествие", next: "chapter5" },
    ],
  },
  chapter4: {
    text: "Приключение продолжается. Это новый этап вашей сказки...",
    background: "https://via.placeholder.com/600x400?text=Chapter+4",
    choices: [
      { text: "Выбрать путь света", next: "chapterEnd" },
      { text: "Выбрать путь тьмы", next: "chapterEnd" },
    ],
  },
  chapter5: {
    text: "Вы решаете остаться и наслаждаться дружбой. Мир становится ярче...",
    background: "https://via.placeholder.com/600x400?text=Chapter+5",
    choices: [
      { text: "Исследовать дальше", next: "chapterEnd" },
      { text: "Отдохнуть", next: "chapterEnd" },
    ],
  },
  chapterEnd: {
    text: "Сказка завершена. Спасибо за участие!",
    background: "https://via.placeholder.com/600x400?text=The+End",
    choices: [],
  },
};

const StoryPage = () => {
  const [currentChapter, setCurrentChapter] = useState('chapter1');

  const handleChoice = (nextChapter) => {
    if (storyData[nextChapter]) {
      setCurrentChapter(nextChapter);
    } else {
      console.warn("Глава не найдена:", nextChapter);
    }
  };

  const chapter = storyData[currentChapter];

  return (
    <div className="story-page">
      <StoryChapter
        text={chapter.text}
        background={chapter.background}
        choices={chapter.choices}
        onChoice={handleChoice}
      />
    </div>
  );
};

export default StoryPage;
