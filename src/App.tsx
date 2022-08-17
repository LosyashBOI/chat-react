import './css/style.css';

import { useState } from 'react';

import Bottom from './components/bottom';
import { MODALS, Modals } from './components/modals';
import Output from './components/output';
import Top from './components/top';
import { token, userEmail } from './utils';

type modalKeys = keyof typeof MODALS;
export type modalValues = typeof MODALS[modalKeys];

function App() {
  const [activeModal, setActiveModal] = useState<modalValues>(MODALS.CONFIRMATION);
  const [isLoggedIn, setLogin] = useState(!!token);
  const [email, setEmail] = useState(userEmail);

  return (
    <div className="chat">
      <div className="chat__container flex">
        <Top setActive={setActiveModal} isLoggedIn={isLoggedIn} setLogin={setLogin} />
        <Output currentEmail={email} isLoggedIn={isLoggedIn} />
        <Bottom />
      </div>
      <Modals
        active={activeModal}
        setActive={setActiveModal}
        setLogin={setLogin}
        setEmail={setEmail}
      />
    </div>
  );
}

export default App;
