import { Controller, useForm, useFormContext } from "react-hook-form";
import { Particular } from "./sharedTypes";
import { Fragment, useEffect } from "react";
import InfoBar from "../genericComponents/info/info.bar";
import CurrencyInput from "../genericComponents/currency.input/currency.input";

type InputTableProps = {
  particulars: Particular[];
  showMax?: boolean;
  title: string;
  amountType: string;
};

const InputTable: React.FC<InputTableProps> = ({
  particulars,
  showMax = false,
  title,
}) => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const formValues = watch();
  console.log(formValues);
  const netIncome = () => {
    let total = 0;
    particulars.map((item) => {
      total += formValues[`${!showMax ? "total_" : ""}${item.code}`]
        ? parseInt(formValues[`${!showMax ? "total_" : ""}${item.code}`])
        : 0;
    });

    // setValue("total_" + amountType, total);
    return total;
  };

  const getApplicableAmount = (perticular: Particular, value: number) => {
    let result = 0;
    if (!value) result = 0;
    else if (!perticular.maximum) result = value;
    else result = value > perticular.maximum ? perticular.maximum : value;
    setValue(perticular.code, result);
  };

  return (
    <div className="mb-8 border rounded p-4">
      <div className="font-bold text-xl">{title}</div>
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Amount (BDT)</th>
            {showMax && (
              <>
                <th>Applicable Amount (BDT)</th>
                <th>Max Applicable Amount (BDT)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {particulars.map((item) => (
            <Fragment key={item.title}>
              <tr>
                <td>
                  <div className="w-44">{item.title}</div>{" "}
                </td>
                <td>
                  <Controller
                    control={control}
                    rules={{
                      required: "This field is required.",
                      min: 0,
                    }}
                    defaultValue={0}
                    name={`total_${item.code}`}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CurrencyInput
                        className="text-right form-field"
                        onValueChange={(value: any, name: any, values: any) => {
                          onChange(value);
                          if (showMax) getApplicableAmount(item, value);
                        }}
                      />
                    )}
                  />
                </td>
                {showMax && (
                  <>
                    <td>
                      <CurrencyInput
                        className="text-right form-field"
                        readOnly
                        value={formValues[item.code]}
                        {...register(item.code, {
                          required: "This field is required.",
                          min: 0,
                        })}
                      />
                    </td>
                    <td>
                      {item.maximum && (
                        <InfoBar
                          heading={"Maximum"}
                          message={
                            item.maximum?.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })!
                          }
                        />
                      )}
                    </td>
                  </>
                )}
              </tr>
              <tr>
                {showMax && (
                  <>
                    <td></td>
                    <td></td>
                  </>
                )}
                <td>
                  {errors[item.title] && <span>This field is required</span>}
                </td>
              </tr>
            </Fragment>
          ))}

          <tr>
            <td>Total Income</td>
            {showMax && (
              <>
                <td></td>
                <td></td>
              </>
            )}
            <td>
              <input
                readOnly
                className="text-right form-field"
                value={netIncome().toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* <input type="submit" /> */}
    </div>
  );
};

export default InputTable;
