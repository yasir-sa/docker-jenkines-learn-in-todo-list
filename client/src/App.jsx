import React from 'react';
import './App.css';
import Todo from './components/todo/todo'; // Todo component-ஐ இம்போர்ட் செய்கிறோம்

function App() {
  return (
    <>
      {/* Todo காம்போனன்டை இங்கே பிளேஸ் பண்ணியாச்சு.
        இது உங்களுடைய Todo List UI மற்றும் API லாஜிக் முழுவதையும் கவனித்துக் கொள்ளும்.
      */}
      <Todo />
    </>
  );
}

export default App;