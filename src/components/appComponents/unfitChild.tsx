import React from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useFormContext } from "react-hook-form";
import CurrencyInputComponent from "../genericComponents/currency.input/currency.input";

function UnfitChild() {
  const { register, control } = useFormContext();

  return (
    <div>
      <div className="flex mb-2">
        <div className="w-80">
          How many Physical or Mentally unfit child do you have ?{" "}
        </div>
        <div>
          <input
            {...register("unfitCount", { required: true })}
            className="text-right form-field"
            defaultValue={0}
          />
        </div>
      </div>
      <div className="italic">
        Tax rebate of 50000 BDT for each physical or mentally unfit child
      </div>
      <div className="flex mb-2">
        <div className="w-80">Advanced income tax </div>
        <div>
          <Controller
            control={control}
            rules={{
              required: "This field is required.",
              min: 0,
            }}
            defaultValue={0}
            name={`advanceIncomeTax`}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CurrencyInput
                className="text-right form-field"
                onValueChange={(value: any) => {
                  onChange(value);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default UnfitChild;
