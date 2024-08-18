import React from "react";
import { useFormContext } from "react-hook-form";

function UnfitChild() {
  const { register } = useFormContext();

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
    </div>
  );
}

export default UnfitChild;
