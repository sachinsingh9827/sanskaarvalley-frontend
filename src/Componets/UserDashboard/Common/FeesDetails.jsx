import React from 'react';

// Sample fees data in JSON format
const feesData = {
  "feesDetails": [
    { "class": "Class 1", "monthlyFee": 1000, "yearlyFee": 10000 },
    { "class": "Class 2", "monthlyFee": 1200, "yearlyFee": 12000 },
    { "class": "Class 3", "monthlyFee": 1300, "yearlyFee": 13000 },
    { "class": "Class 4", "monthlyFee": 1400, "yearlyFee": 14000 },
    { "class": "Class 5", "monthlyFee": 1500, "yearlyFee": 15000 },
    { "class": "Class 6", "monthlyFee": 1600, "yearlyFee": 16000 },
    { "class": "Class 7", "monthlyFee": 1700, "yearlyFee": 17000 },
    { "class": "Class 8", "monthlyFee": 1800, "yearlyFee": 18000 },
    { "class": "Class 9", "monthlyFee": 2000, "yearlyFee": 20000 },
    { "class": "Class 10", "monthlyFee": 2200, "yearlyFee": 22000 },
    { "class": "Class 11", "monthlyFee": 2400, "yearlyFee": 24000 },
    { "class": "Class 12", "monthlyFee": 2500, "yearlyFee": 25000 }
  ]
};

const FeesDetails = () => {
  return (
  <>
  <button onClick={() => window.history.back()} className='border-2 border-sky-500 m-4 text-[#105183] hover:bg-sky-500 hover:text-white  font-bold py-2 px-4 rounded'>Back</button>
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 ">Fees Details</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md ">
          <thead className="bg-gradient-to-r from-[#539bd7]  to-[#105183] text-white ">
            <tr>
              <th className='py-3 px-6 text-left'>SN.</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Monthly Fee</th>
              <th className="py-3 px-6 text-left">Yearly Fee</th>
            </tr>
          </thead>
          <tbody>
            {feesData.feesDetails.map((feeDetail, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-6 border-none text-gray font-bold">{index + 1}.</td>
                <td className="py-3 px-6 border-none text-gray font-bold">{feeDetail.class}</td>
                <td className="py-3 px-6 border-none text-gray font-bold">{`₹ ${feeDetail.monthlyFee}`}</td>
                <td className="py-3 px-6 border-none text-gray font-bold">{`₹ ${feeDetail.yearlyFee}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default FeesDetails;
