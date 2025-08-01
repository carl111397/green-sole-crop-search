import React, { useState, useEffect } from 'react';
import knowledgeBase from '../data/knowledgebase.json';
import styles from './CropSearchAssistant.module.css';

export default function CropSearchAssistant() {
  const [query, setQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const results = knowledgeBase.filter(resource =>
      resource.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResources(results);
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
    </div>
  );
}
