import { useState } from 'react';

import Select from '../Select';

import { SelectOption } from '~/types';

import styles from './styles.module.css';

const options = [
  {
    label: 'Jack',
    value: 10,
    image: 'https://source.unsplash.com/random/?portrait/10',
  },
  {
    label: 'Isabella',
    value: 1,
    image: 'https://source.unsplash.com/random/?portrait/9',
  },
  {
    label: 'Henry',
    value: 4,
    image: 'https://source.unsplash.com/random/?portrait/8',
  },
  {
    label: 'Alice',
    value: 5,
    image: 'https://source.unsplash.com/random/?portrait/1',
  },
  {
    label: 'Bob',
    value: 2,
    image: 'https://source.unsplash.com/random/?portrait/2',
  },
  {
    label: 'Charlie',
    value: 8,
    image: 'https://source.unsplash.com/random/?portrait/3',
  },
  {
    label: 'David',
    value: 6,
    image: 'https://source.unsplash.com/random/?portrait/4',
  },
  {
    label: 'Emily',
    value: 3,
    image: 'https://source.unsplash.com/random/?portrait/5',
  },
  {
    label: 'Frank',
    value: 9,
    image: 'https://source.unsplash.com/random/?portrait/6',
  },
  {
    label: 'Grace',
    value: 7,
    image: 'https://source.unsplash.com/random/?portrait/7',
  },
];

const SelectDisplay = () => {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <div className={styles.selectDisplay}>
      <Select
        multiple
        title='Select users'
        options={options}
        value={value1}
        onChange={(option) => setValue1(option)}
      />

      <Select
        title='Select user'
        options={options}
        value={value2}
        onChange={(option) => setValue2(option)}
      />
    </div>
  );
};

export default SelectDisplay;
