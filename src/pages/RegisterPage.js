import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/register.css';
import { register } from '../services/api';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const data = await register(name, email, password);
            if (data.success === true) {
                setSuccess(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else if (error.response && error.response.status === 409) {
                setError(error.response.data.message);
            } else {
                setError('Terjadi masalah pada server, coba lagi nanti.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 register-card w-75 bg-light">
                <h3 className="text-center mb-4">Register</h3>

                {/* Menampilkan pesan sukses jika ada */}
                {success && (
                    <div className="alert alert-success animate__animated animate__fadeIn" role="alert">
                        {success}
                    </div>
                )}

                {/* Menampilkan pesan error jika ada */}
                {error && (
                    <div className="alert alert-danger animate__animated animate__shakeX" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="animate__animated animate__fadeIn">
                    <div className="form-group mb-3">
                        <label htmlFor="name">Nama Lengkap</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p>
                        Sudah mempunyai akun? <Link to="/login">Masuk</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
