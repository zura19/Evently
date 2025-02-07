/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputProps {
  className?: string;
  placeholder?: string;
  type?: string;
  label: string;
  errorMessage?: string;
  register?: any;
  boxClassName?: string;
}

export interface SelectProps extends InputProps {
  setValue?: any;
  options?: string[];
  arr: { value: string; label: string }[];
  value?: string;
  name: string;
}
