import './css/style.css';

import Bottom from './components/bottom';
import { Modals } from './components/modals';
import Output from './components/output';
import Top from './components/top';

function App() {
  return (
    <div className="chat">
      <div className="chat__container flex">
        <Top />
        <Output />
        <Bottom />
      </div>
      <Modals />
    </div>
  );
}

export default App;
