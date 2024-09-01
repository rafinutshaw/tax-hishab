import { useNumberFormat } from "@react-input/number-format";
import React from "react";
import CurrencyInput from "react-currency-input-field";

function CurrencyInputComponent(props: any) {
  return (
    <CurrencyInput
      {...props}
      onFocus={(e) => e.target.select()}
      decimalsLimit={2}
    />
  );
}

export default CurrencyInputComponent;
