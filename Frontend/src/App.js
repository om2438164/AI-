
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import FinancialInfoPage from './pages/FinancialInfoPage';
import InvestmentPreferencesPage from './pages/InvestmentPreferencesPage';
import ReviewPage from './pages/ReviewPage';
import AllocationResults from './pages/AllocationResults';
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<WelcomePage />} />
        <Route path="/personal-info" element={<PersonalInfoPage />} />
        <Route path="/financial-info" element={<FinancialInfoPage />} />
        <Route path="/investment-preferences" element={<InvestmentPreferencesPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/allocation-results" element={<AllocationResults />} />
      </Routes>
    </>
  );
}

export default App;
