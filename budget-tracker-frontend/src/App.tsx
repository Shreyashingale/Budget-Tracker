import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';
import TransactionForm from './pages/TransactionForm';
function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginPage setToken={setToken} />} />
      <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/" />} />
      <Route path="/transactions" element={token ? <TransactionsPage /> : <Navigate to="/" />} />
      <Route path="/addtransaction" element={token ? <TransactionForm /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
