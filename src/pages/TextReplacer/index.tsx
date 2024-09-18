import { createEffect, createMemo, createSignal, Index } from 'solid-js';
import { useStorage } from '../../hooks';
import { text } from '../../utils/form-callbacks';
import { Parameter, ReplaceOption } from './types';

interface Props {
  key?: string;
}

export const TextReplacer = (props: Props) => {
  const key = props.key ?? '__TEXT_REPLACERS__';
  const [parameters, setParameters] = useStorage<Parameter[]>({
    key: `${key}_PARAMETERS__`,
    defaultValue: [],
  });
  const [options, setOptions] = useStorage<ReplaceOption[]>({
    key: `${key}_OPTIONS__`,
    defaultValue: [{
      id: Date.now(),
      name: '',
      template: '',
    }],
  });
  const [selectedOption, setSelectedOption] = createSignal<ReplaceOption>(options()[0]);
  const sufText = createMemo(() => {
    // TODO: process
    let text = selectedOption().template;
    
    parameters().forEach(param => {
      text = text.replaceAll(`{{${param.name}}}`, param.value);
    });
    
    return text;
  });

  createEffect(()=> {
    const newOption = selectedOption();
    setOptions(options => options.map(option => option.id === newOption.id ? newOption : option));
  });

  return (
    <div class={'w-full h-full flex flex-col gap-4px bg-pink p-4px rounded-10px'}>
      <div class={'flex-[0.5] w-full flex items-stretch justify-center gap-4px h-50px'}>
        <select
          class={'flex-1 rounded-8px border-none'}
          // value={selectedOption().name} 
          onChange={text((value) => {
            const option = options().find(x => '' + x.id === value);
            if (option) {
              setSelectedOption(option);
            }
          })}
        >
          <Index each={options()}>
            {option => 
              <option value={option().id}>{option().name}</option>
            }
          </Index>
        </select>
        <input 
          class={'flex-1 rounded-8px outline-none border-none'}
          value={selectedOption().name}
          onInput={text((value) => {
            const newOption = {
              ...selectedOption(),
              name: value,
            };
            
            setSelectedOption(newOption);
          })}
          type="text" 
        />
        <button onClick={() => setOptions([...options(), { name: `Template ${options().length}`, template: '', id: Date.now() }])} class={'flex-1'}>+</button>
        <button
          onClick={() => {
            setOptions(options => options.filter(option => option.id !== selectedOption().id));
            setSelectedOption(options()[0]);
          }}
          class={'flex-1'}
        >
          -
        </button>
      </div>
      <div class={'flex-[4] w-full flex gap-4px'}>
        <textarea
          value={selectedOption().template}
          onInput={text((value) => {
            const newOption = {
              ...selectedOption(),
              template: value,
            };
            setSelectedOption(newOption);
          })} 
          class={'flex-1 h-full bg-sky border-none outline-none'}
        />
        <textarea value={sufText()} class={'flex-1 h-full bg-green border-none outline-none'}/>
      </div>
      <div class={'flex-[1] w-full bg-#ccc grid grid-cols-3 overflow-auto gap-5px mt-4px'}>
        <Index each={parameters()}>
          {param => 
            <div class={'box-border flex flex-col h-100px items-center justify-center'}>
              <input
                type="text"
                value={param().name}
                onInput={text((value) => {
                  param().name = value;
                  setParameters([...parameters()]);
                })}
              />
              <textarea
                class={'w-full'}
                value={param().value}
                onInput={text(value => {
                  param().value = value;
                  setParameters([...parameters()]);
                })}
              />
            </div>
          }
        </Index>
        <button class={'w-full'} onClick={() => setParameters([...parameters(), { name: '', value: '' }])}>+</button>,
      </div>
    </div>
  );
};