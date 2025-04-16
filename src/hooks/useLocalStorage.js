import { getItem, removeItem, setItem } from "@/utils/localStorage";
import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const data = getItem(key);
    return data !== undefined ? data : initialValue;
  });

  function handleDispatch(action) {
    if (typeof action === 'function') {
      setValue((prevState) => {
        const newValue = action(prevState);
        setItem(key, newValue);
        return newValue;
      });
    } else {
      setValue(action);
      setItem(key, action);
    }
  }

  function clearState() {
    setValue(null);  // Set value to null when clearing the state
    removeItem(key);
  }

  return [value, handleDispatch, clearState];
}
