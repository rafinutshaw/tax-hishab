import { useForm, useFormContext } from "react-hook-form";
import { Particular } from "./sharedTypes";
import { Fragment, useEffect } from "react";

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
  amountType,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      if (item.code == "advanceIncomeTax") {
        total -=
          2 * parseInt(formValues[`${!showMax ? "total_" : ""}${item.code}`]);
      }
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
            <th>Amount</th>
            {showMax && (
              <>
                <th>Applicable Amount</th>
                <th>Max Applicable Amount</th>
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
                  <input
                    className="text-right form-field"
                    defaultValue={0}
                    {...register(`total_${item.code}`, {
                      required: "This field is required.",
                      min: 0,
                      onChange(event) {
                        if (showMax)
                          getApplicableAmount(item, event.target.value);
                        // setValue(item.code, event.target.value);
                      },
                    })}
                  />
                </td>
                {showMax && (
                  <>
                    <td>
                      <input
                        className="text-right form-field"
                        defaultValue={0}
                        readOnly
                        {...register(item.code, {
                          required: "This field is required.",
                          min: 0,
                        })}
                      />
                    </td>
                    <td>
                      <input
                        className="text-right form-field"
                        value={item.maximum}
                        readOnly
                      />
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
                value={netIncome()}
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
