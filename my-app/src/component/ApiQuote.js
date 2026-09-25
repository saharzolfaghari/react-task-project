import React, { useState, useEffect } from 'react';

export const ApiQuote = () => {
  const [quote, setQuote] = useState('در حال دریافت جمله انگیزشی...');

  useEffect(() => {
    // دریافت جمله انگیزشی از API
    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'))
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data.contents);
        if (parsed && parsed[0]) {
          setQuote(`"${parsed[0].q}" — ${parsed[0].a}`);
        }
      })
      .catch(() => {
        // در صورت بروز خطا یا قطع بودن اینترنت، متن پیش‌فرض نشان داده می‌شود
        setQuote('هر روز یک قدم به هدف‌ات نزدیک‌تر شو! ✨');
      });
  }, []);

  return (
    <div className="api-quote" style={{ margin: '15px 0', fontStyle: 'italic', color: '#555' }}>
      <p>💡 {quote}</p>
    </div>
  );
};