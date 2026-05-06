import React, { useState } from 'react';
import { ShieldCheck, DollarSign, Briefcase } from 'lucide-react';

const EligibilityChecker = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [existingEMIs, setExistingEMIs] = useState<number>(0);
  const [result, setResult] = useState<{ eligible: boolean; message: string; maxEmi: number } | null>(null);

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Rule: Total EMI (New + Existing) should not exceed 50% of Monthly Income
    const maxAllowedEmi = monthlyIncome * 0.5;
    
    // Assume a standard loan: 10% annual interest over 36 months
    const r = 10 / (12 * 100);
    const n = 36;
    const newEmi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const totalEmi = newEmi + existingEMIs;

    if (totalEmi <= maxAllowedEmi) {
      setResult({
        eligible: true,
        message: "Great! You are highly likely to be eligible for this loan amount.",
        maxEmi: maxAllowedEmi
      });
    } else {
      setResult({
        eligible: false,
        message: `Your requested loan amount results in EMIs that exceed 50% of your income when combined with existing obligations. Consider a lower loan amount or longer tenure.`,
        maxEmi: maxAllowedEmi
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-8 border-t-4 border-green-500">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <ShieldCheck className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Loan Eligibility Checker</h2>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">
        Check your loan eligibility instantly based on your income and existing obligations.
      </p>

      <form onSubmit={checkEligibility} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Income ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              min="100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requested Loan Amount ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              min="1000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Existing Monthly EMIs ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={existingEMIs}
              onChange={(e) => setExistingEMIs(Number(e.target.value))}
              className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Check Eligibility
        </button>
      </form>

      {result && (
        <div className={`mt-6 rounded-lg p-6 border ${result.eligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {result.eligible ? (
                <ShieldCheck className="h-6 w-6 text-green-600" />
              ) : (
                <ShieldCheck className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-lg font-medium ${result.eligible ? 'text-green-800' : 'text-red-800'}`}>
                {result.eligible ? 'You appear to be eligible!' : 'Eligibility concerns detected'}
              </h3>
              <div className={`mt-2 text-sm ${result.eligible ? 'text-green-700' : 'text-red-700'}`}>
                <p>{result.message}</p>
                <p className="mt-2 font-semibold">Max Recommended Monthly EMI: ${result.maxEmi.toFixed(2)}</p>
                <p className="mt-1 text-xs opacity-80">*Based on 50% Debt-to-Income ratio and a standard 3-year term.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecker;
