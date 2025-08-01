import React, { useState, useEffect } from 'react';
import knowledgeBase from '../data/knowledgebase.json';
import styles from './CropSearchAssistant.module.css';

export default function CropSearchAssistant() {
  const [query, setQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState('');

  useEffect(() => {
    // Filter knowledgebase resources based on search query
    const results = knowledgeBase.filter(resource =>
      resource.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResources(results);

    // AI Suggestion Logic (Mocked)
    if (query.toLowerCase().includes('maize')) {
      setAiSuggestion('Tip: For Maize, consider nitrogen fertilization to boost yields by 60%.');
    } else if (query.toLowerCase().includes('soil')) {
      setAiSuggestion('AI Suggests: Conduct a soil pH test before applying fertilizers.');
    } else if (query.toLowerCase().includes('drought')) {
      setAiSuggestion('AI Suggests: Drought-resistant sorghum thrives in LM 4-5 zones.');
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
