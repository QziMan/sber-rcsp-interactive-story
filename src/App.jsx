import React, { useState } from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
import './App.css';

const initializeAssistant = (getState /*: any*/, getRecoveryState) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,                                           
      // getRecoveryState: getState,                                           
      nativePanel: {
        defaultText: 'ччччччч',
        screenshotMode: false,
        tabIndex: -1,
    },
    });
  } else {
  return createAssistant({ getState });
  }
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      notes: [{ id: Math.random().toString(36).substring(7), title: 'тест' }],
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());

    this.assistant.on('data', (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      if (event.type === 'character') {
        console.log(`assistant.on(data): character: "${event?.character?.id}"`);
      } else if (event.type === 'insets') {
        console.log(`assistant.on(data): insets`);
      } else {
        const { action } = event;
        this.dispatchAssistantAction(action);
      }
    });

    this.assistant.on('start', (event) => {
      let initialData = this.assistant.getInitialData();

      console.log(`assistant.on(start)`, event, initialData);
    });

    this.assistant.on('command', (event) => {
      console.log(`assistant.on(command)`, event);
    });

    this.assistant.on('error', (event) => {
      console.log(`assistant.on(error)`, event);
    });

    this.assistant.on('tts', (event) => {
      console.log(`assistant.on(tts)`, event);
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant() {
    console.log('getStateForAssistant: this.state:', this.state);
    const state = {
      item_selector: {
        items: this.state.notes.map(({ id, title }, index) => ({
          number: index + 1,
          id,
          title,
        })),
        ignored_words: [
          'открой','запусти','расскажи','поставь','начни','давай', // startStory.sc
          'А', 'Б',  // chooseOption.sc
          'закрой', 'прекрати', 'замолчи' // endStory.sc
        ],
      },
    };
    console.log('getStateForAssistant: state:', state);
    return state;
  }

  // dispatchAssistantAction(action) {
  //   console.log('dispatchAssistantAction', action);
  //   if (action) {
  //     switch (action.type) {
  //       case 'add_note':
  //         return this.add_note(action);

  //       case 'done_note':
  //         return this.done_note(action);

  //       case 'delete_note':
  //         return this.delete_note(action);

  //       default:
  //         throw new Error();
  //     }
  //   }
  // }

  _send_action_value(action_id, value) {
    const data = {
      action: {
        action_id: action_id,
        parameters: {
          value: value,
        },
      },
    };
    const unsubscribe = this.assistant.sendData(data, (data) => {
      const { type, payload } = data;
      console.log('sendData onData:', type, payload);
      unsubscribe();
    });
  }


  render() {
    console.log('render');
    return (
      <div className="App">
        <StoryPage />
      </div>
    );
  }
}
