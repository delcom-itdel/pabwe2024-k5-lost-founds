import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLostAndFoundDetail, editLostAndFoundData } from '../services/api';

function EditPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('lost');
    const [isCompleted, setIsCompleted] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLostAndFoundDetail(id);
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
                setIsCompleted(data.is_completed);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editLostAndFoundData(id, title, description, status, isCompleted);
            Swal.fire({
                title: 'Success',
                text: 'Data has been successfully updated!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
            });
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to update data.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className='container w-50 my-5'>
            <div className='card'>
                <div className='card-header'>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                </div>
                <div className='card-body'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className='text-danger'>{error}</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="lost">Lost</option>
                                    <option value="found">Found</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="is_completed" className="form-label">Is Completed</label>
                                <select
                                    className="form-select"
                                    id="is_completed"
                                    value={isCompleted}
                                    onChange={(e) => setIsCompleted(e.target.value)}
                                >
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditPage;
