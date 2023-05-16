import { useState, useEffect, useRef } from 'react';

import { MdClose } from 'react-icons/md';
import { CgSelect } from 'react-icons/cg';
import { BsCheck } from 'react-icons/bs';

import {
  SelectOption,
  SelectProps,
  MultipleSelectProps,
  SingleSelectProps,
} from '~/types';

import styles from './styles.module.css';

type SelectType = SelectProps & (MultipleSelectProps | SingleSelectProps);

const Select = ({ multiple, value, onChange, options, title }: SelectType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      option !== value && onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const renderMultiSelectValue = (v: SelectOption) => {
    return (
      <button
        key={v.value}
        className={styles.optionBadge}
        onClick={(e) => {
          e.stopPropagation();
          selectOption(v);
        }}
      >
        {v.image && (
          <span className={styles.imageBadge}>
            <img src={v.image} alt={`image`} />
          </span>
        )}
        <p>{v.label}</p>
        <span className={styles.removeBtn}>
          <MdClose />
        </span>
      </button>
    );
  };

  const renderSingleSelectValue = (value: SelectOption) => {
    return (
      <>
        {value.image && (
          <span className={styles.imageBadge}>
            <img src={value?.image} alt={`image`} />
          </span>
        )}
        {value && <p>{value.label}</p>}
      </>
    );
  };

  useEffect(() => {
    isOpen && setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;

      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          isOpen && selectOption(options[highlightedIndex]);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        case 'Escape': {
          setIsOpen(false);
          break;
        }
      }
    };
    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div>
      <h1 className={styles.selectTitle}>{title}</h1>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        tabIndex={0}
        className={styles.selectContainer}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => renderMultiSelectValue(v))
            : value && renderSingleSelectValue(value)}
        </span>
        <button
          className={styles.clearBtn}
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          <MdClose />
        </button>
        <div className={styles.divider}></div>
        <div className={styles.selector}>
          <CgSelect />
        </div>
        <ul className={`${styles.options} ${isOpen && styles.show}`}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                highlightedIndex === index && styles.highlighted
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
            >
              {option?.image && (
                <span className={styles.image}>
                  <img src={option.image} alt={`image`} />
                </span>
              )}
              <p>{option.label}</p>
              <span
                className={`${styles.checkBox} ${
                  isOptionSelected(option) && styles.checkBoxSelected
                }`}
              >
                {isOptionSelected(option) && (
                  <BsCheck className={styles.checkIcon} />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
