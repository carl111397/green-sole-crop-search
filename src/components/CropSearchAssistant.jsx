import React, { useState, useEffect } from 'react';
import knowledgeBase from '../data/knowledgebase.json';

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
    <div>
      <input
        type="text"
        placeholder="Search Crops, Fertilizers, Guides..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredResources.map((resource, index) => (
          <li key={index}>
            <strong>{resource.name}</strong>
            <p>{resource.info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
