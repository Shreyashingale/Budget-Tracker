import { useState } from "react";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string; // ISO Date string
};

const dummyTransactions: Transaction[] = [
  {
    id: 1,
    title: "Salary",
    amount: 5000,
    category: "Job",
    type: "income",
    date: "2025-04-01",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 300,
    category: "Food",
    type: "expense",
    date: "2025-04-05",
  },
  {
    id: 3,
    title: "Movie",
    amount: 50,
    category: "Entertainment",
    type: "expense",
    date: "2025-04-10",
  },
];

const ITEMS_PER_PAGE = 5;

const TransactionOverviewPage = () => {
  const [transactions] = useState<Transaction[]>(dummyTransactions); // Later load from API
  const [categoryFilter, setCategoryFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Apply filters
  const filteredTransactions = transactions.filter((t) => {
    return (
      (categoryFilter ? t.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true) &&
      (amountFilter ? t.amount >= parseFloat(amountFilter) : true) &&
      (dateFilter ? t.date.startsWith(dateFilter) : true)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction Overview</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Minimum Amount"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="border p-2">{t.title}</td>
                  <td className="border p-2">${t.amount}</td>
                  <td className="border p-2">{t.category}</td>
                  <td className="border p-2 capitalize">{t.type}</td>
                  <td className="border p-2">{t.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md border ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
              } hover:bg-blue-500 hover:text-white`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionOverviewPage;
