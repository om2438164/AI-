import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {

    const navigate = useNavigate();
    const handleNextClick = () => {
        navigate('/personal-info')

    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body text-center">
                            <h1 className="mb-4">Welcome to the Allocation Engine</h1>
                            <p className="lead">
                                This tool will help you plan your retirement investments based
                                on your personal preferences and financial goals.
                            </p>
                            <button className="btn btn-primary" onClick={handleNextClick}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
