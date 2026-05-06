import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Clock } from 'lucide-react';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(10);
  const [tenure, setTenure] = useState<number>(12); // in months
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEmi = (e: React.FormEvent) => {
    e.preventDefault();
    const r = rate / (12 * 100); // monthly interest rate
    const n = tenure;
    if (r === 0) {
      setEmi(principal / n);
      return;
    }
    const calcEmi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(calcEmi);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-8 border-t-4 border-indigo-600">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <Calculator className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">EMI Calculator</h2>
      </div>

      <form onSubmit={calculateEmi} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount (Principal)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              min="1000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate (%)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Percent className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Tenure (Months)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              min="1"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Calculate EMI
        </button>
      </form>

      {emi !== null && (
        <div className="mt-6 bg-indigo-50 rounded-lg p-6 border border-indigo-100 text-center animate-pulse-once">
          <p className="text-sm text-indigo-800 font-medium uppercase tracking-wide">Your Estimated Monthly EMI</p>
          <p className="text-4xl font-bold text-indigo-600 mt-2">${emi.toFixed(2)}</p>
          <div className="mt-4 pt-4 border-t border-indigo-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-indigo-500">Total Interest</p>
              <p className="text-sm font-medium text-indigo-900">${((emi * tenure) - principal).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-indigo-500">Total Amount</p>
              <p className="text-sm font-medium text-indigo-900">${(emi * tenure).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
