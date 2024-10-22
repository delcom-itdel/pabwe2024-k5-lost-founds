import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { getProfile, updateProfile, changeProfilePhoto } from '../services/api';
import Header from '../layouts/header';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [editedProfile, setEditedProfile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
                setEditedProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = await updateProfile(editedProfile.name, editedProfile.email);
            setProfile(updatedProfile);
            setEditedProfile(updatedProfile);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const message = await changeProfilePhoto(file);
                alert(message);
                const updatedProfile = await getProfile();
                setProfile(updatedProfile);
                setEditedProfile(updatedProfile);
            } catch (error) {
                console.error('Error changing profile photo:', error);
                alert('Failed to change profile photo. Please try again.');
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (!profile || !editedProfile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5>Profile</h5>
                        <Link to="/" className="btn btn-light">
                            <b>Back</b>
                        </Link>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <img
                                        src={profile.photo ? profile.photo : 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="img-fluid rounded"
                                        style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                                        onClick={triggerFileInput}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                    />
                                    <p className="mt-2">Tekan gambar untuk mengganti foto profile</p>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={editedProfile.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={editedProfile.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;