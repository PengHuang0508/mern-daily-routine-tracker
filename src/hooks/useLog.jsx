import { useState } from 'react';

export const useLog = (initialValue) => {
  const [input, setInput] = useState(initialValue);

  return {
    input,
    setInput,
    reset: () => setInput(initialValue),
    bind: {
      onChange: (event) => {
        let newValue = Number(event.target.value);

        if (newValue > 24) {
          newValue = 24;
        } else if (newValue < 0) {
          newValue = 0;
        }

        setInput({
          ...input,
          [event.target.name]: newValue,
        });
      },
    },
  };
};
