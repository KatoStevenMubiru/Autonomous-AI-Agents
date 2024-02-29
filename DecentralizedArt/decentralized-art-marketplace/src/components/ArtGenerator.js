import React, { useState } from 'react';
import axios from 'axios';

const ArtGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateArt = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint and API key
      const response = await axios.post('https://api.stability.ai/generate', {
        prompt: prompt,
        // Additional parameters as required by the API
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      });

      // Assuming the API returns the image URL
      setImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating art:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for the artwork"
      />
      <button onClick={generateArt} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Art'}
      </button>
      {image && <img src={image} alt="Generated Art" />}
    </div>
  );
};

export default ArtGenerator;