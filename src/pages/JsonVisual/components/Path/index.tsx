import { useModel } from '../../ctx';

export const Path = () => {
  const { path, setPath } = useModel();
  const handleJump = (index: number) => {
    setPath(path => path.slice(0, index + 1));
  };

  return (
    <div className={'w-full min-h-12 flex items-center flex-wrap gap-x-6px font-mono'}>
      {path.map((key, index) => {
        return (
          <>
            {index > 0 && <div className="i-mdi:chevron-right w-12px h-12px"></div>}
            <div 
              className={'hover:underline cursor-pointer'}
              onClick={() => handleJump(index)}
              key={key}
            >
              {key}
            </div>
          </>
        );
      })}
    </div>
  );
};