import React, { useState, useEffect } from 'react';
import knowledgeBase from '../data/knowledgebase.json';
import styles from './CropSearchAssistant.module.css';

export default function CropSearchAssistant() {
  const [query, setQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState('');

  useEffect(() => {
    const results = knowledgeBase.filter(resource =>
      resource.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResources(results);

    // Call AI Backend only if query is not empty
    if (query.trim() !== '') {
      fetch('http://localhost:5000/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      .then(response => response.json())
      .then(data => setAiSuggestion(data.suggestion))
      .catch(err => {
        console.error('AI API Error:', err);
        setAiSuggestion('');
      });
    } else {
      setAiSuggestion('');
    }

  }, [query]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search Crops, Fertilizers, Guides..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.inputField}
      />

      {filteredResources.map((resource, index) => (
        <div key={index} className={styles.resultCard}>
          <div className={styles.resultTitle}>{resource.name}</div>
          <div className={styles.resultInfo}>{resource.info}</div>
        </div>
      ))}

      {aiSuggestion && (
        <div className={styles.aiSuggestionBox}>
          🤖 {aiSuggestion}
        </div>
      )}
    </div>
  );
}
