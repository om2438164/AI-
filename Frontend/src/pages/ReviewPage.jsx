import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const ReviewPage = () => {
    const [formData, setFormData] = useState({
        personalInfo: {},
        financialInfo: {},
        investmentPreferences: {},
    });


    const navigate = useNavigate();

    useEffect(() => {
        const personalInfoData = JSON.parse(localStorage.getItem('personalInfo'));
        const financialInfoData = JSON.parse(localStorage.getItem('financialInfo'));
        const investmentPreferencesData = JSON.parse(localStorage.getItem('investmentPreferences'));

        setFormData({
            personalInfo: personalInfoData || {},
            financialInfo: financialInfoData || {},
            investmentPreferences: investmentPreferencesData || {},
        });
    }, []);

    const handleEditClick = (step) => {
        navigate(`/${step}`);
    };

    const handleSubmit = async () => {
        const data = {
            age: parseInt(formData.financialInfo.age),
            target_savings: parseInt(formData.financialInfo.retirementSavingsTarget),
            risk_tolerance: formData.investmentPreferences.riskTolerance,
            salary: parseInt(formData.financialInfo.salary)
        };
        if (!data.age || !data.target_savings || !data.risk_tolerance || !data.salary) {
            alert("Please provide all fields")
        }
        else {
            try {

                const response = await axios.post('http://localhost:5000/allocate', data);
                const allocations = response.data;

                navigate('/allocation-results', { state: { allocations } });
            } catch (error) {
                console.error('There was an error!', error);
            }
        }


    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Review Your Information</h2>
                            <div>
                                <h4>Personal Information:</h4>
                                <p>Name: {formData.personalInfo.name}</p>
                                <p>Email: {formData.personalInfo.email}</p>
                                <p>Contact: {formData.personalInfo.contact}</p>
                            </div>
                            <hr />
                            <div>
                                <h4>Financial Information:</h4>
                                <p>Age : {formData.financialInfo.age}</p>
                                <p>Salary: {formData.financialInfo.salary}</p>
                                <p>Retirement Savings Target: {formData.financialInfo.retirementSavingsTarget}</p>
                            </div>
                            <hr />
                            <div>
                                <h4>Investment Preferences:</h4>
                                <p>Risk Tolerance: {formData.investmentPreferences.riskTolerance}</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleEditClick('investment-preferences')}
                                >
                                    Edit Investment Preferences
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleEditClick('financial-info')}
                                >
                                    Edit Financial Information
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleEditClick('personal-info')}
                                >
                                    Edit Personal Information
                                </button>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Confirm and Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
