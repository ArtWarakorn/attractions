'use client'
import React, { useState, useEffect } from 'react'

export default function Page() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttractions = async () => {
      const response = await fetch('/api/attractions');
      const data = await response.json();
      setAttractions(data);
      setLoading(false);
    };
    fetchAttractions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Attractions</h1>
      <ul>
        {attractions.map(attraction => (
          <li key={attraction.id}>
            <img src={attraction.coverimage} alt={attraction.name} width={500} height={300} />
            <h2>{attraction.name}</h2>
            <p>{attraction.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
