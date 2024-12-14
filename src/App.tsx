import { keysIn } from 'lodash';
import { useState } from 'react';
import { Window } from './components';
import { TOOLS_MAP } from './consts';

import './pages/TextReplacer';
import './pages/CodePic';
import './pages/JsonVisual';
import './pages/JsonTyping';

function App() {
  const [currentTool, setCurrentTool] = useState('');

  return (
    <div className={'w-screen h-screen flex items-center justify-center bg-#fff gap-4'}>
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
