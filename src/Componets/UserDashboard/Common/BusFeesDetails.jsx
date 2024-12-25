import React from 'react';

// Sample bus fees data in JSON format
const busFeesData = {
  "busFeesDetails": [
    { "class": "Class 1", "busMonthlyFee": 500, "busYearlyFee": 5000 },
    { "class": "Class 2", "busMonthlyFee": 600, "busYearlyFee": 6000 },
    { "class": "Class 3", "busMonthlyFee": 700, "busYearlyFee": 7000 },
    { "class": "Class 4", "busMonthlyFee": 800, "busYearlyFee": 8000 },
    { "class": "Class 5", "busMonthlyFee": 900, "busYearlyFee": 9000 },
    { "class": "Class 6", "busMonthlyFee": 1000, "busYearlyFee": 10000 },
    { "class": "Class 7", "busMonthlyFee": 1100, "busYearlyFee": 11000 },
    { "class": "Class 8", "busMonthlyFee": 1200, "busYearlyFee": 12000 },
    { "class": "Class 9", "busMonthlyFee": 1300, "busYearlyFee": 13000 },
    { "class": "Class 10", "busMonthlyFee": 1400, "busYearlyFee": 14000 },
    { "class": "Class 11", "busMonthlyFee": 1500, "busYearlyFee": 15000 },
    { "class": "Class 12", "busMonthlyFee": 1600, "busYearlyFee": 16000 }
  ]
};

const BusFeesDetails = () => {
  return (
    <>
      <button onClick={() => window.history.back()} className='border-2 border-sky-500 m-4 text-[#105183] hover:bg-sky-500 hover:text-white font-bold py-2 px-4 rounded'>
        Back to Home
      </button>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Bus Fees Details</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-[#105183] to-[#539bd7] text-white">
              <tr>
                <th className='py-3 px-6 text-left'>SN.</th>
                <th className="py-3 px-6 text-left">Class</th>
                <th className="py-3 px-6 text-left">Monthly Bus Fee</th>
                <th className="py-3 px-6 text-left">Yearly Bus Fee</th>
              </tr>
            </thead>
            <tbody>
              {busFeesData.busFeesDetails.map((busFeeDetail, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6 border-b text-gray font-bold">{index + 1}.</td>
                  <td className="py-3 px-6 border-b text-gray font-bold">{busFeeDetail.class}</td>
                  <td className="py-3 px-6 border-b text-gray font-bold">{`₹ ${busFeeDetail.busMonthlyFee}`}</td>
                  <td className="py-3 px-6 border-b text-gray font-bold">{`₹ ${busFeeDetail.busYearlyFee}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BusFeesDetails;
