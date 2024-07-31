import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonalInfoPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
    });
    useEffect(() => {
        const storedData = localStorage.getItem('personalInfo');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextClick = () => {


        navigate('/financial-info');
        localStorage.setItem('personalInfo', JSON.stringify(formData));
    };
    const handleBackClick = () => {
        navigate('/');
    };
    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Personal Information</h2>
                            <form onSubmit={handleNextClick}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact">Contact</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleBackClick}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        type='submit'>
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoPage;
