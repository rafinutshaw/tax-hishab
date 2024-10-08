import Category from "@/components/appComponents/category";
import InputTable from "@/components/appComponents/inputTable";
import TaxResult from "@/components/appComponents/taxResult";
import UnfitChild from "@/components/appComponents/unfitChild";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Perticular = {
  title: string;
  code: string;
  maximum?: number;
};

function Index() {
  const methods = useForm();
  const [resultInput, setResultInput] = useState({
    taxFreeIncome: 350000,
    income: 2130000,
    investments: 1180000,
    advancedIncomeTax: 18000,
  });
  const resultRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    watch,
    formState: { errors },
  } = methods;
  const formValues = watch();
  // console.log(formValues);
  console.log(errors);
  const onSubmit = (_: any) => {
    setIsSubmitted(true);
    setTimeout(() => {
      if (resultRef?.current) resultRef.current.scrollIntoView();
    }, 500);
  };

  const SalaryPerticulars: Perticular[] = [
    { title: "Basic", code: "basic" },
    { title: "House Rent", code: "houseRent" },
    { title: "Conveyance", code: "conveyance" },
    { title: "Medical Allowance", code: "medicalAllowance" },
    { title: "Leave encashment", code: "leaveEncashment" },
    { title: "Performance bonus", code: "performanceBonus" },
    { title: "Yearly bonus", code: "yearlyBonus" },
    { title: "Festival bonus", code: "festivalBonus" },
    { title: "Over Time Allowance", code: "overTimeAllowance" },
    { title: "Transportation", code: "transportation" },
    // { title: "Advance Income Tax", code: "advanceIncomeTax" },
  ];

  const InvestmentPerticulars: Perticular[] = [
    { title: "Shanchay Patra", code: "shanchayPatra", maximum: 500000 },
    { title: "DPS", code: "dps", maximum: 120000 },
    { title: "Mutual Fund", code: "mutualFund" },
    { title: "Teasury Bond", code: "teasuryBond" },
    { title: "Stock", code: "stock" },
  ];

  const netIncome = (perticulars: Perticular[], prefix = "") => {
    let total = 0;
    perticulars.map((item) => {
      total += formValues[`${prefix}${item.code}`]
        ? parseInt(formValues[`${prefix}${item.code}`])
        : 0;
    });
    return total;
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4">
            <InputTable
              amountType="salary"
              title="Salary Information"
              particulars={SalaryPerticulars}
            />
            <InputTable
              amountType="investment"
              title="Investment Information"
              showMax={true}
              particulars={InvestmentPerticulars}
            />
            <div className="border rounded mb-8 p-4">
              <Category />
              <UnfitChild />
            </div>
          </div>
          <button className="btn btn-red mb-8" type="submit">
            Calculate
          </button>
        </form>
      </FormProvider>
      <div ref={resultRef}>
        {isSubmitted && (
          <TaxResult
            taxFreeIncomeByCategory={formValues.category}
            income={netIncome(SalaryPerticulars, "total_")}
            investments={netIncome(InvestmentPerticulars)}
            advanceIncomeTax={formValues.advanceIncomeTax}
            unfitChild={formValues.unfitCount}
          />
        )}
      </div>
    </div>
  );
}

export default Index;
