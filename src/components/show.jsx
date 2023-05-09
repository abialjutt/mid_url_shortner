import React, { useState } from 'react';
import Form from './form';
function Show() {
    const [shortUrl, setShortUrl] = useState('');
  
    const handleFormSubmit = (shortUrl) => {
      setShortUrl(shortUrl);
    };
  
    return (
      <div>
        <Form onSubmit={handleFormSubmit} />
        {shortUrl && <ShortenedUrlDisplay shortUrl={shortUrl} />}
      </div>
    );
  }
  
  function ShortenedUrlDisplay({shortUrl}) {
    return (
      <div className='show_url'>
        Shortened URL: <a href={shortUrl}>{shortUrl}</a>
      </div>
    );
  }
  
  export default Show;
  