'use client';
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "@/component/attractions.css";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAttraction = async () => {
      const response = await fetch(`/api/attractions/${id}`);
      const data = await response.json();
      setAttraction(data);
      setLoading(false);
    };

    fetchAttraction();
  }, [id]);

  const onback = () => {
    router.push("/attractions");
  };

  if (loading) {
    return (
      <div className="detail-loading-container">
        <div className="detail-spinner"></div>
        <h2>Loading Attractions...</h2>
      </div>
    );
  }

  if (!attraction) return <h2>Not Found</h2>;

  return (
    <div className="detail-page">
      <div className="detail-wrapper">
        <div className="detail-card">
          <div className="detail-image-box">
            <img
              src={attraction.coverimage}
              alt={attraction.name}
              className="detail-image"
            />
          </div>

          <div className="detail-body">
            <h2 className="detail-heading">{attraction.name}</h2>
            <p className="detail-description">{attraction.detail}</p>

            <button className="detail-back-btn" onClick={onback}>
              ⬅ Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}