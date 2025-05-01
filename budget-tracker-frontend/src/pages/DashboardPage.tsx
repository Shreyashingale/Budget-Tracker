import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import API from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const chartRef = useRef<SVGSVGElement | null>(null);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const balance = income - expenses;

  // Dummy fetch — later you will call API based on selected month/year
  useEffect(() => {
    // Here you will fetch data based on month and year
    // For now, dummy random data
    const dummyIncome = 5000 + Math.floor(Math.random() * 1000);
    const dummyExpenses = 3000 + Math.floor(Math.random() * 500);

    setIncome(dummyIncome);
    setExpenses(dummyExpenses);
  }, [month, year]);

  // Draw D3 chart
  useEffect(() => {
    if (!chartRef.current) return;

    const fetchBudget = async () => {
      try {
        const response = await API.get('budgets/current' , {params : {month:'1',year:'2025'}});
        console.log("response : " , response);
      } catch (error) {
        console.error('Failed to fetch budget', error);
      }
    };
    fetchBudget();

    const data = [
      { label: "Income", value: income },
      { label: "Expenses", value: expenses },
    ];

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(["#4caf50", "#f44336"]);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  }, [income, expenses]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Month and Year Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="p-2 border rounded-md"
        >
          {[...Array(12)].map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {new Date(0, idx).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2 border rounded-md"
        >
          {Array.from({ length: 5 }, (_, idx) => new Date().getFullYear() - idx).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Income</h2>
          <p className="text-2xl text-green-700 mt-2">${income}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p className="text-2xl text-red-700 mt-2">${expenses}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Balance</h2>
          <p className="text-2xl text-blue-700 mt-2">${balance}</p>
        </div>
      </div>

      {/* D3 Chart */}
      <div className="flex justify-center mb-10">
        <svg ref={chartRef}></svg>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => navigate("/addtransaction")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Add Transaction
        </button>

        <button
          onClick={() => navigate("/transactions")}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
        >
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
