import { useEffect, useState } from "react";

interface IProps {
  min: number;
  max: number;
  rangeValue: number[];
}
export const useDebounceTimer = ({ min, max, rangeValue }: IProps) => {
  const [debouncedValue, setDebouncedValue] = useState<number[]>([min, max]);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(rangeValue);
    }, 600);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [rangeValue]);

  return { debouncedValue };
};
