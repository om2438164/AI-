import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AllocationResults = () => {
    const location = useLocation();
    const { allocated_per, monthly_investment } = location.state.allocations || {};
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [targetSavings, setTargetSavings] = useState('');
    const [riskTolerance, setRiskTolerance] = useState('');

    useEffect(() => {
        const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
        const financialInfoData = JSON.parse(localStorage.getItem('financialInfo'));
        const investmentPreferencesData = JSON.parse(localStorage.getItem('investmentPreferences'));
        if (personalInfo && personalInfo.name) {
            setUserName(personalInfo.name);
            setAge(financialInfoData.age)
            setRiskTolerance(investmentPreferencesData.riskTolerance)
            setSalary(financialInfoData.salary)
            setTargetSavings(financialInfoData.retirementSavingsTarget)
        }
    }, []);

    const handleNewAllocation = () => {
        localStorage.removeItem('personalInfo');
        localStorage.removeItem('financialInfo');
        localStorage.removeItem('investmentPreferences');
        navigate('/');
    };

    const handleEditClick = () => {
        navigate('/review');
    };

    const handleDownloadPDF = () => {
        const content = contentRef.current; // Correctly reference the container element

        html2canvas(content).then(canvas => {
            const pdf = new jsPDF('p', 'mm', 'a4');

            const nameWidth = pdf.getStringUnitWidth(`Allocation Results for ${userName}`) * 18 / pdf.internal.scaleFactor;
            const pageWidth = pdf.internal.pageSize.getWidth();
            const startX = (pageWidth - nameWidth) / 2;

            // Add user details
            pdf.setFontSize(18);
            pdf.text(`\t Allocation Results `, startX, 15);

            let x = 25
            pdf.setFontSize(12);
            pdf.text(`Name:${userName}`, x, 25)
            pdf.text(`Age: ${age}`, x, 30);
            pdf.text(`Salary: ${salary}`, x, 35);
            pdf.text(`Target Savings: ${targetSavings}`, x, 40);
            pdf.text(`Risk Tolerance: ${riskTolerance}`, x, 45);

            // Add allocations data
            let y = 55;
            allocated_per.forEach((stock, i = 0) => {
                pdf.setFontSize(12);
                pdf.text(` `, x, y);
                pdf.text(`${i + 1}.`, x - 5, y + 5);
                pdf.text(`Company Name: ${stock['Company Name']}`, x, y + 5);
                pdf.text(`Symbol: ${stock.Symbol}`, x, y + 10);
                pdf.text(`Allocation: ${stock.Allocation}%`, x, y + 15);
                pdf.text(`Beta: ${stock.Beta}`, x, y + 20);
                pdf.text(`Price: ${stock.Price}`, x, y + 25);
                y += 30;
            });
            // Save PDF
            pdf.save('allocation_results.pdf');
        });
    };

    return (
        <div className="container mt-5" ref={contentRef}> {/* Set the ref to the container element */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <div className='ms-5'>

                                <h2 className="text-center mb-4">Allocation Results</h2>
                                <p className="text-center mb-4">Dear {userName}, here are your allocation results:</p>

                                <p><strong>User Details:</strong></p>
                                <ul>
                                    <li>Name: {userName}</li>
                                    <li>Age: {age}</li>
                                    <li>Salary: {salary}</li>
                                    <li>Target Savings: {targetSavings}</li>
                                    <li>Risk Tolerance: {riskTolerance}</li>
                                    <strong> <li>Monthly Investment: {monthly_investment}</li></strong>
                                </ul>

                                <p><strong>Allocated Stocks:</strong></p>
                                <ol className='ms-4'>
                                    {allocated_per.map((stock, index) => (
                                        <li key={index}>
                                            <strong>Company Name:</strong> {stock['Company Name']} <br />
                                            <strong>Symbol:</strong> {stock.Symbol} <br />
                                            <strong>Allocation:</strong> {stock.Allocation}% <br />
                                            <strong>Invest Amount:</strong> {stock['Invest Amount'] ? stock['Invest Amount'].toFixed(2) : 'N/A'} <br />
                                            <strong>Beta:</strong> {stock.Beta} <br />
                                            <strong>Price:</strong> {stock.Price}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="text-center mt-4 pt-4">
                                <div className="d-flex justify-content-around">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-primary" onClick={handleNewAllocation}>
                                        New User Allocations
                                    </button>
                                    <button className="btn btn-success" onClick={handleDownloadPDF}>
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllocationResults;
