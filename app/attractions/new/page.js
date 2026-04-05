"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/component/attractions.css";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [coverimage, setCoverimage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);

  const onAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/attractions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        detail,
        coverimage,
        latitude,
        longitude,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Add Attraction Success!");
      router.push("/attractions");
    } else {
      alert("Add Attraction Failed!");
    }
  };

  return (
    <div className="add-page">
      <div className="add-container">
        <div className="add-card">
          <h1 className="add-title">➕ Add Attraction</h1>

          <form className="add-form" onSubmit={onAdd}>
            <label className="add-label">Attraction Name</label>
            <input
              className="add-input"
              type="text"
              placeholder="Enter attraction name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="add-label">Attraction Detail</label>
            <textarea
              className="add-textarea"
              placeholder="Enter attraction detail..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />

            <label className="add-label">Cover Image URL</label>
            <input
              className="add-input"
              type="text"
              placeholder="Enter image url..."
              value={coverimage}
              onChange={(e) => setCoverimage(e.target.value)}
              required
            />

            <label className="add-label">Latitude</label>
            <input
              className="add-input"
              type="number"
              step="any"
              placeholder="Enter latitude..."
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />

            <label className="add-label">Longitude</label>
            <input
              className="add-input"
              type="number"
              step="any"
              placeholder="Enter longitude..."
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />

            {coverimage && (
              <div className="add-preview-box">
                <img
                  src={coverimage}
                  alt="preview"
                  className="add-preview-img"
                />
              </div>
            )}

            <div className="add-btn-group">
              <button className="add-btn" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                className="add-btn cancel"
                type="button"
                onClick={() => router.push("/attractions")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}