import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { fetchLostAndFoundDetail } from '../services/api';

function LostAndFoundDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLostAndFoundDetail(id);
                setItem(data);
                setIsLoading(false);
            } catch (err) {
                if (err.message === 'No authentication token found') {
                    Swal.fire({
                        title: 'Authentication Error',
                        text: 'Please log in to view this page.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/login');
                    });
                } else {
                    setError('Failed to fetch data. Please try again later.');
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    return (
        <div className="container w-50 my-5">
            <div className="card">
                <div className="card-header">
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-danger">{error}</p>
                    ) : item ? (
                        <div>
                            <h5>Title: {item.title}</h5>
                            <p>Description: {item.description}</p>
                            <p>Status: {item.status}</p>
                            <p>Completed: {item.is_completed ? "Yes" : "No"}</p>
                        </div>
                    ) : (
                        <p>No data found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LostAndFoundDetailPage;
