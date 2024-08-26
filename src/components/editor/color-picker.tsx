import { ChromePicker, CirclePicker } from 'react-color';

import { colors } from '@/lib/types';
import { rgbaObjectToString } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const ColorPicker = ({ value, onChange }: Props) => {
  return (
    <div className='w-full space-y-4'>
      <ChromePicker
        color={value}
        onChange={color => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
        className='rounded-lg border'
      />

      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={color => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
      />
    </div>
  );
};
