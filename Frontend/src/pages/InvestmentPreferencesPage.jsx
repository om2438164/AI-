import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvestmentPreferencesPage = () => {
    const [formData, setFormData] = useState({
        riskTolerance: 'medium'
    });
    useEffect(() => {
        const storedData = localStorage.getItem('investmentPreferences');
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
        localStorage.setItem('investmentPreferences', JSON.stringify(formData));

        navigate('/review');
    };

    const handleBackClick = () => {
        navigate('/financial-info');
    };

    return (
        <div className="container mt-5  pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Investment Preferences</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="riskTolerance">Risk Tolerance</label>
                                    <select
                                        className="form-control"
                                        id="riskTolerance"
                                        name="riskTolerance"
                                        value={formData.riskTolerance}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <small className="form-text text-muted">
                                        Low: Conservative approach, lower potential returns. <br />
                                        Medium: Balanced approach, moderate potential returns. <br />
                                        High: Aggressive approach, higher potential returns.
                                    </small>
                                </div>

                            </form>
                            <div className="d-flex justify-content-between mt-3">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleBackClick}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleNextClick}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPreferencesPage;
