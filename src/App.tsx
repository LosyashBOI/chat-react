import './css/style.css';

import { useState } from 'react';

import Bottom from './components/bottom';
import { MODALS, Modals } from './components/modals';
import Output from './components/output';
import Top from './components/top';

type modalKeys = keyof typeof MODALS;
export type modalValues = typeof MODALS[modalKeys];

function App() {
  const [activeModal, setActiveModal] = useState<modalValues>(MODALS.INACTIVE);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="chat">
      <div className="chat__container flex">
        <Top setActive={setActiveModal} />
        <Output />
        <Bottom />
      </div>
      <Modals active={activeModal} setActive={setActiveModal} />
    </div>
  );
}

export default App;
