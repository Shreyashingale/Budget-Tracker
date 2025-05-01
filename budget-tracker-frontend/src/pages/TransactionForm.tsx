import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';

interface Category {
    id: number;
    name: string;
    type: string;
}

interface FormData {
    amount: number;
    description: string;
    category: number;
    date: string;
}

const TransactionForm: FC = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Fetch categories from backend
        const fetchCategories = async () => {
            try {
                const response = await API.get('categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    const onSubmit = async (data: FormData) => {
        const payload = {
            ...data,
            amount: parseFloat(data.amount.toString()),   // ensure number
            category: parseInt(data.category.toString()), // ensure number
        };

        console.log('📦 Final transaction payload:', payload); // 👈 See this in browser console

        try {
            await API.post('transactions/', payload);
            alert('Transaction added successfully!');
            reset();
        } catch (error) {
            console.error('❌ Failed to add transaction:', error);
            alert('Error adding transaction');
        }
    };



    return (
        <div style={{ padding: '2rem' }}>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    {...register('amount', { required: true })}
                /><br /><br />

                <input
                    type="text"
                    placeholder="Description"
                    {...register('description')}
                /><br /><br />

                <select {...register('category', { required: true })}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.type})
                        </option>
                    ))}
                </select><br /><br />

                <input
                    type="date"
                    {...register('date', { required: true })}
                /><br /><br />

                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;
