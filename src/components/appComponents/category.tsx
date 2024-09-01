import React from "react";
import { useFormContext } from "react-hook-form";

function Category() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const Categories = [
    { title: "General Man", code: "generalMan", amount: 350000 },
    { title: "Women", code: "women", amount: 400000 },
    { title: "65 years or older citizen", code: "elder", amount: 400000 },
    { title: "Physical or Mental unfit person", code: "unfit", amount: 475000 },
    {
      title: "Gadgated Freedom Fighter",
      code: "freedomFighter",
      amount: 500000,
    },
    { title: "Third Gender", code: "thirdGender", amount: 475000 },
  ];
  return (
    <div className=" mb-2">
      <div className="font-bold text-xl mb-2">General Information</div>
      <div>
        <div className="inline-flex">
          <div className="w-64 mr-3 font-bold"> Category Name</div>
          <div className="font-bold"> Tax Free Income</div>
        </div>
        {Categories.map((item, index) => (
          <div key={`${index}${item.amount}`}>
            <input
              type="radio"
              id={item.amount.toString()}
              {...register("category", { required: "This field is required." })}
              value={item.amount}
            />
            <label className="ml-4" htmlFor={item.amount.toString()}>
              <div className="inline-flex">
                <div className="w-60"> {item.title}</div>
                <div>
                  {item.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  BDT
                </div>
              </div>
            </label>
          </div>
        ))}
        <div>
          {" "}
          {errors.category && (
            <span className="text-red-400">*This field is required</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
