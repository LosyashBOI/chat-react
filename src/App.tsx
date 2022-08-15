import './css/style.css';

import { useState } from 'react';

import Bottom from './components/bottom';
import { MODALS, Modals } from './components/modals';
import Output from './components/output';
import Top from './components/top';

type modalKeys = keyof typeof MODALS;
export type modalValues = typeof MODALS[modalKeys];

const defaultName = 'Я';

function App() {
  const [activeModal, setActiveModal] = useState<modalValues>(MODALS.INACTIVE);
  const [isLoggedIn, setLogin] = useState(false);
  const [name, setName] = useState(defaultName);
  // const [email, setEmail] = useState('');

  return (
    <div className="chat">
      <div className="chat__container flex">
        <Top setActive={setActiveModal} isLoggedIn={isLoggedIn} setLogin={setLogin} />
        <Output name={name} />
        <Bottom />
      </div>
      <Modals
        active={activeModal}
        setActive={setActiveModal}
        setLogin={setLogin}
        setName={setName}
      />
    </div>
  );
}

export default App;
