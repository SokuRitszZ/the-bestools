import './App.css';
import { Window } from './components';
import { TextReplacer } from './pages/TextReplacer';

function App() {

  return (
    <div className={'w-screen h-screen flex items-center justify-center bg-#fff'}>
      <Window>
        <TextReplacer />
      </Window>
    </div>
  );
}

export default App;
