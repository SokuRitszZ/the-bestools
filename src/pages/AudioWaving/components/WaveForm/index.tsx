interface Props {
  data: number[];
}

export const WaveForm = ({ data }: Props) => {
  return (
    <div className={'w-full flex items-center justify-center h-100px'}>
      {data.map((num, index) => 
        <div
          key={index}
          className={'flex-1 bg-#ccc duration-16 min-h-5px'}
          style={{ height: num >> 1 }}
        />,
      )}
    </div>
  );
};