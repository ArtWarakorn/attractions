"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "@/component/attraction.css";

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
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <h2>Loading Attractions...</h2>
            </div>
        );
    }
    if (!attraction) return <h2>Not Found</h2>;

    return (
        <div className="page-detail">
            <div className="detail-container">
                <div className="card-detail">
                    <div className="detail-img-box">
                        <img
                            src={attraction.coverimage}
                            alt={attraction.name}
                            className="detail-img"
                        />
                    </div>

                    <div className="detail-content">
                        <h2 className="detail-title">{attraction.name}</h2>
                        <p className="detail-text">{attraction.detail}</p>

                        <button className="back-btn" onClick={onback}>
                            ⬅ Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}