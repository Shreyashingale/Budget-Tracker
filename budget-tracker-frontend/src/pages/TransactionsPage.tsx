import { useEffect, useState } from 'react';
import API from '../services/api';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  category: number;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get('transactions/');
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Transactions</h2>
      {transactions.map((txn) => (
        <div key={txn.id}>
          {txn.amount} | {txn.description} | {txn.date}
        </div>
      ))}
    </div>
  );
};

export default TransactionsPage;
