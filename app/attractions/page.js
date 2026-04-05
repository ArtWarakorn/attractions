'use client'
import React, { useState, useEffect } from "react";
import "@/component/attractions.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAttractions = async () => {
      const response = await fetch("/api/attractions");
      const data = await response.json();
      setAttractions(data);
      setLoading(false);
    };
    fetchAttractions();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading Attractions...</h2>
      </div>
    );
  }

  const onhandle = (id) => {
    router.push(`/attractions/${id}`);
  }

  return (
    <div className="page-list">
      <h1 className="title">🌍 Attractions</h1>

      <div className="grid">
        {attractions.map((attraction, index) => (
          <div
            key={attraction.id}
            className="card"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="img-box">
              <img
                src={attraction.coverimage}
                alt={attraction.name}
                className="card-img"
              />
            </div>

            <div className="content">
              <h2>{attraction.name}</h2>
              <p>{attraction.detail}</p>
              <button
                className="btn"
                onClick={() => onhandle(attraction.id)}
              >View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
