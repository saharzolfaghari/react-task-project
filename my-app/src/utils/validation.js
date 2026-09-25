export const validateTaskInput = (title) => {

  if (!title || title.trim().length === 0) {
    return {
      isValid: false,
      message: 'لطفاً عنوان تسک را وارد کنید!'
    };
  }


  if (title.trim().length < 3) {
    return {
      isValid: false,
      message: 'طول عنوان تسک نباید کمتر از ۳ کاراکتر باشد.'
    };
  }


  return { 
    isValid: true, 
    message: '' 
  };
};