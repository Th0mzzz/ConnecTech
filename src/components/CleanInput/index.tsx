import React, { useState, forwardRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IMaskInput } from 'react-imask';
import styles from './input.module.css';

// interface for component props
export interface CleanInputProps {
  value?: string | number;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'year' | string;
  id: string;
  width?: string;
  icon?: React.ReactNode;
  // onChange can receive a value (string|number) or the input change event
  onChange: (value: string | number | React.ChangeEvent<HTMLInputElement>) => void;
  mask?: string | RegExp | null;
  isDisabled?: boolean;
  required?: boolean;
  className?: string;
  maxLength?: number;
  minLength?: number;
  error?: string;
  fontSize?: string;
}

const CleanInput = forwardRef<HTMLInputElement, CleanInputProps>(function CleanInput(
  {
    value,
    label,
    placeholder = '',
    type = 'text',
    id,
    width = '100%',
    icon = null,
    onChange,
    mask = null,
    isDisabled = false,
    required = false,
    className = '',
    maxLength,
    minLength,
    error,
    fontSize = '14px',
  }: CleanInputProps,
  ref
) {
  const [view, setView] = useState<'password' | 'text'>('password');
  const [isOpen, setIsOpen] = useState(false);

  let filteredType: string;
  switch (type) {
    case 'password':
      filteredType = view;
      break;
    case 'year':
      filteredType = 'text';
      break;
    default:
      filteredType = type || 'text';
      break;
  }

  return (
    <div
      className={`${styles.input_container} ${error ? styles.error : ''}`}
      style={{
        width: '100%',
        maxWidth: width,
        marginTop: label ? '1.6rem' : '0.4rem',
      }}
    >
      {label && (
        <label htmlFor={id} className="link " style={{ fontWeight: '700' }}>
          {label}
          {required && <span className="text-[red]"> *</span>}
        </label>
      )}
      {type === 'year' ? (
        <DatePicker
          onChange={(val) => {
            let ano: number | '' = '';
            if (val instanceof Date) {
              ano = val.getFullYear();
            }
            onChange(ano);
            setIsOpen(false);
          }}
          value={typeof value === 'number' ? new Date(value, 0, 1) : null}
          format="y"
          showLeadingZeros={true}
          clearIcon={null}
          calendarIcon={null}
          maxDetail="decade"
          minDetail="decade"
          className={[styles.customDatePicker] as unknown as string}
          calendarProps={{
            className: `${styles.customCalendar} ${isOpen ? styles.active : styles.desactived}`,
          }}
        />
      ) : !mask ? (
        <input
          value={value as string | number | undefined}
          type={filteredType}
          name={id}
          id={id}
          className={`text ${className}`}
          placeholder={`${placeholder}...`}
          onChange={(e) => onChange(e)}
          disabled={isDisabled}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          ref={ref}
          style={{ fontSize }}
        />
      ) : (
        <IMaskInput
          // A biblioteca aceita string para mask, mas tipos exigem Masked; usamos cast controlado
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mask={(mask ?? '') as any}
          value={value ? String(value) : ''}
          name={id}
          id={id}
          className="text"
          placeholder={`${placeholder}...`}
          onAccept={(val: unknown) => onChange(typeof val === 'string' ? val : String(val))}
          disabled={isDisabled}
          required={required}
          minLength={minLength}
        />
      )}

      {icon && <span className={styles.icon}>{icon}</span>}

      {type === 'password' && (
        <div
          className={styles.icon}
          onClick={() => {
            setView((prev) => (prev === 'password' ? 'text' : 'password'));
          }}
        >
          {view === 'password' ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
      {error && (
        <span className={`link text-[red] text-[12px] mt-1 ${styles.errorMessage}`}>{error}</span>
      )}
    </div>
  );
});

CleanInput.displayName = 'CleanInput';

export default CleanInput;
