import { keysIn } from 'lodash';
import { useState } from 'react';
import { Window } from './components';
import { TOOLS_MAP } from './consts';

import './pages/TextReplacer';

function App() {
  const [currentTool, setCurrentTool] = useState('');

  return (
    <div className={'w-screen h-screen flex items-center justify-center bg-#fff'}>
      {keysIn(TOOLS_MAP).map(key => 
        <Window
          tool={TOOLS_MAP[key]}
          open={key === currentTool}
          onSelect={() => setCurrentTool(key)}
          onOk={() => setCurrentTool('')}
        />,
      )}
    </div>
  );
}

export default App;
