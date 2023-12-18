import { useEffect, useState } from "react";

function getSavedValue(key, initialValue) {
  // get the saved value from the local storage if it exists
  const savedValue = JSON.parse(localStorage.getItem(key));

  // check the saved value if not null then return the value
  if (savedValue) return savedValue;
  // check the initial value is a function then invoke it and return its value
  if (initialValue instanceof Function) return initialValue();

  // if the saved value is null and the initial value is not a function then return the initialValue
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // if there is already a local storage saved value then set it to "value" variable if not it should be set to the initialValue
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    // whenever the value variable is changed  then set the value to the localStorage
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
