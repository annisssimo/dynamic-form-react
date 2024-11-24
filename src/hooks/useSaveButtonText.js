import { useState, useEffect } from 'react';

const useSaveButtonText = (isSubmitting) => {
  const [buttonText, setButtonText] = useState('SAVE');

  useEffect(() => {
    if (isSubmitting) {
      setButtonText('Saving...');
    } else {
      setButtonText('SAVE');
    }
  }, [isSubmitting]);

  return buttonText;
};

export default useSaveButtonText;
