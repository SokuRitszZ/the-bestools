import { keysIn, toLower } from 'lodash';
import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import cx from 'classnames';
import { Window } from './components';
import { TOOLS_MAP } from './consts';
import { text } from './utils/form-callbacks';
import commonSt from './common.module.scss';

import './pages/TextReplacer';
import './pages/CodePic';
import './pages/JsonVisual';
import './pages/JsonTyping';
import './pages/AudioWaving';
import './pages/PicTransparentor';

function App() {
  const [currentTool, setCurrentTool] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className={'w-screen h-screen bg-#fff gap-4'}>
      <div className={'flex justify-center w-full shadow-xl'}>
        <div className={'w-1248px h-16 flex items-center justify-between'}>
          <h2 className={'m-0'}>The Bestools</h2>
          <div className="i-mdi:github w-2.5em h-2.5em cursor-pointer" onClick={() => window.open('https://github.com/SokuRitszZ/the-bestools', '_blank')} />
        </div>
      </div>
      <div className={'w-full'}>
        <div className={'w-1248px m-auto'}>
          <div className={'mt-8'}>
            <TextField
              slotProps={{
                input: {
                  startAdornment: 
                    <InputAdornment
                      position="start"
                    >
                      <div className="i-mdi:magnify w-2em h-2em"></div>
                    </InputAdornment>,
                  
                },
              }}
              value={search}
              onChange={text(setSearch)}
              className={cx('w-full', commonSt.textarea)}
              size={'medium'} 
            />
          </div>
          <div className={'flex flex-wrap gap-4 pt-6 w-full'}>
            {keysIn(TOOLS_MAP).filter(key => toLower(key).includes(search)).map(key => 
              <Window
                key={key}
                tool={TOOLS_MAP[key]}
                open={key === currentTool}
                onSelect={() => setCurrentTool(key)}
                onOk={() => setCurrentTool('')}
              />,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
