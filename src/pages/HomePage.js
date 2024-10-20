import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../layouts/header';

function HomePage() {

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
            setSuccess(successMessage);
        }
    }, []);

    return (
        <div>
            <Header />
            <main>
                <div className='container'>

                </div>
            </main>
        </div>
    );
}

export default HomePage;
