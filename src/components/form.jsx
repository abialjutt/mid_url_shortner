import React, { useState } from 'react';

function Form({onSubmit}) {
  const [longUrl, setLongUrl] = useState('');
  const [date, setDate] = useState('');

  const handleLongUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Shorten the long URL and save it in local storage with the date
    const shortUrl = generateShortUrl(longUrl);
    const urlData = {longUrl, shortUrl, date};
    const urlDataArray = JSON.parse(localStorage.getItem('urlDataArray')) || [];
    urlDataArray.push(urlData);
    localStorage.setItem('urlDataArray', JSON.stringify(urlDataArray));

    // Clear the form inputs
    setLongUrl('');
    setDate('');
    
    // Call the onSubmit prop with the shortened URL
    onSubmit(shortUrl);
  };

  const generateShortUrl = (longUrl) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
  
    // Generate a random 6-character string for the short URL
    for (let i = 0; i < 6; i++) {
      shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    // Map the short URL to the long URL in local storage
    const urlMap = JSON.parse(localStorage.getItem('urlMap')) || {};
    urlMap[shortUrl] = longUrl;
    localStorage.setItem('urlMap', JSON.stringify(urlMap));
  
    // Return the short URL
    return `https://bit.ly/${shortUrl}`;
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input placeholder='URL' type="text" value={longUrl} onChange={handleLongUrlChange} />
      </label>
      <label>
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <button type="submit">Shorten URL</button>
    </form>
  );
};
export default Form;