import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinancialInfoPage = () => {
    const [formData, setFormData] = useState({
        salary: '',
        age: '',
        retirementSavingsTarget: '',
    });
    useEffect(() => {
        const storedData = localStorage.getItem('financialInfo');
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
        localStorage.setItem('financialInfo', JSON.stringify(formData));
        navigate('/investment-preferences');
    };

    const handleBackClick = () => {
        navigate('/personal-info');
    };

    return (
        <div className="container mt-5  pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Financial Information</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="retirementAgeTarget">Age</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currentSalary">Salary</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="salary"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="retirementSavingsTarget">Retirement Savings Target</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="retirementSavingsTarget"
                                        name="retirementSavingsTarget"
                                        value={formData.retirementSavingsTarget}
                                        onChange={handleChange}
                                    />
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

export default FinancialInfoPage;
