import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import Header from '../layouts/header';
import { fetchLostAndFoundData, deleteLostAndFoundData, getDailyStats, getMonthlyStats } from '../services/api';
import { useAuth } from '../App';

function HomePage() {
    const [lostAndFoundItems, setLostAndFoundItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const successMessage = localStorage.getItem('success');
        if (successMessage) {
            Swal.fire({
                title: 'Login Berhasil!',
                text: successMessage,
                icon: 'success',
                confirmButtonText: 'OK'
            });
            localStorage.removeItem('success');
        }

        fetchData();
    });

    const fetchData = async () => {
        try {
            const userId = user ? user.id : null;

            if (!userId) {
                throw new Error('No user ID found');
            }

            const data = await fetchLostAndFoundData();
            const filteredData = data.filter(item => item.user_id === userId);
            setLostAndFoundItems(filteredData);
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
            } 
            setIsLoading(false);
        }
    };

   
    return (
        <div>
            <Header />
            <main>
                <div className='container w-50 my-5'>
                    <div className='card'>
                        <div className='card-header'>
                            <Link className='btn btn-sm btn-info' to={'/add'}>Tambah Data</Link>
                        </div>
                        <div className='card-body'>
                            
                            {isLoading ? (
                                <p className='text-center'>Loading...</p>
                            ) : error ? (
                                <p className="text-danger">{error}</p>
                            ) : (
                                <div className='table-responsive'>
                                    <table className='table table-bordered text-center'>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lostAndFoundItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.status}</td>
                                                    <td>
                                                        <Link className="btn btn-sm btn-warning me-2" >
                                                            Detail
                                                        </Link>
                                                        <Link className="btn btn-sm btn-warning me-2" >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;
