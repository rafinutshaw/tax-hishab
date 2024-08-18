import React, { useEffect, useState } from "react";

type TaxResultProps = {
  income: number;
  taxFreeIncome: number;
  investments: number;
  advanceIncomeTax: number;
  unfitChild: number;
};

const TaxResult: React.FC<TaxResultProps> = ({
  income,
  taxFreeIncome,
  investments,
  advanceIncomeTax,
  unfitChild,
}) => {
  const [totalTax, setTotalTax] = useState(0);
  const [slabData, setSlabData] = useState<any>();
  const [totalRebate, setTotalRebate] = useState(0);
  console.log(income, taxFreeIncome, investments, advanceIncomeTax, unfitChild);
  const taxableIncome =
    income - Math.min(+taxFreeIncome + +unfitChild * 50000, income / 3);

  const getSlabData = () => {
    const SLABS = [
      {
        rate: 0,
        remaining: 0,
        taxableAmount: 0,
        amount: 350000,
      },
      { amount: 100000, rate: 5 },
      { amount: 400000, rate: 10 },
      { amount: 500000, rate: 15 },
      { amount: 500000, rate: 20 },
      { amount: 2000000, rate: 25 },
      { rate: 30, amount: 0, remaining: 0 },
    ];
    let totalIncome = taxableIncome;
    let caltotalTax = 0;
    SLABS.forEach((item, index) => {
      if (index == 0) {
        item.remaining =
          item.amount < totalIncome ? totalIncome - item.amount : 0;
      } else if (index == 6) {
        item.taxableAmount = (SLABS[index - 1].remaining! * item.rate) / 100;
      } else {
        item.taxableAmount =
          SLABS[index - 1].remaining! > item.amount
            ? (item.amount * item.rate) / 100
            : (SLABS[index - 1].remaining! * item.rate) / 100;
        item.remaining =
          item.amount < SLABS[index - 1].remaining!
            ? SLABS[index - 1].remaining! - item.amount
            : 0;
      }
      caltotalTax += item.taxableAmount!;
    });
    return { SLABS, caltotalTax };
  };

  const calculateTotalRebate = () => {
    const rebateIncome = taxableIncome * (3 / 100);
    const rebateInvestment = investments * (15 / 100);
    const maxRebate = 1000000;
    setTotalRebate(Math.min(rebateIncome, rebateInvestment, maxRebate));
  };

  useEffect(() => {
    const data = getSlabData();
    setSlabData(data.SLABS);
    setTotalTax(data.caltotalTax);
    calculateTotalRebate();
  }, []);
  return (
    <div className="mb-8 border rounded p-4">
      <div className="border p-2 mb-2">
        <div className="font-bold">Taxable income calculation</div>
        <table>
          <tbody>
            <tr>
              <td>
                Maximum Tax Free Income on Salary (Total salary income / 3):
              </td>
              <td> {income / 3}</td>
            </tr>
            <tr>
              <td>
                Tax free income based on category and physically or mentally
                unfit children:
              </td>
              <td>{+taxFreeIncome + +unfitChild * 50000}</td>
            </tr>
            <tr>
              <td>Your Applicable Taxable Free Income</td>
              <td>
                {Math.min(+taxFreeIncome + +unfitChild * 50000, income / 3)}
              </td>
            </tr>

            <tr>
              <td>Your Taxable Income</td>
              <td>{taxableIncome}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border p-2 mb-2">
        <div className="font-bold">Slab Calculation</div>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Rate</th>
              <th>Taxable Amount</th>
              <th>Remaining Amount</th>
            </tr>
          </thead>
          <tbody>
            {slabData?.map((item: any) => (
              <tr key={item.rate}>
                <td>{item.amount}</td>
                <td>{item.rate}%</td>
                <td>{item.taxableAmount}</td>
                <td>{item.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>Total tax based on slabs: {totalTax}</div>
      </div>
      <div className="border p-2 mb-2">
        <div className="font-bold">Rebate Calculation</div>
        <table>
          <tbody>
            <tr>
              <td>3% of Taxable Income</td>
              <td>{taxableIncome * (3 / 100)} </td>
            </tr>
            <tr>
              <td>Investments&apos;s 15%</td>
              <td>{investments * (15 / 100)} </td>
            </tr>
            <tr>
              <td>Maximum Rebate</td>
              <td>1000000 </td>
            </tr>
            <tr>
              <td>Advanced Income Tax</td>
              <td>{advanceIncomeTax} </td>
            </tr>

            <tr>
              <td>
                Total Rebate (Minimum from above amounts) - Advance income tax
              </td>
              <td>{totalRebate + +advanceIncomeTax} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>Total Net Tax = {+totalTax - +totalRebate - +advanceIncomeTax}</div>
    </div>
  );
};

export default TaxResult;
