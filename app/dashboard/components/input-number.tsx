import { useEffect } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    getInputValue?: (value: string) => void;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minNumber?: number; // حداقل مقدار
    maxNumber?: number; // حداکثر مقدار
  }
  
  const InputNumber: React.FC<Props> = ({ getInputValue, value = "0", onChange, minNumber = 0, maxNumber = 10, ...props }) => {
    const checkInputValueOnlyNumber = (value: string) => {
      return /^[0-9]*$/.test(value);
    };
  
    useEffect(() => {
        getInputValue&& getInputValue(value || "0");
    }, [value]);
  
    return (
      <div className="w-full rounded-md border overflow-hidden border-zinc-400 h-[2.2rem] flex items-center justify-center">
        <input
          {...props}
          type="text"
          className="w-[90%] px-2 appearance-none outline-none h-full"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
          value={value}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (checkInputValueOnlyNumber(inputValue)) {
              const numericValue = parseInt(inputValue || "0");
              if (numericValue >= minNumber && numericValue <= maxNumber) {
                onChange(e);
              }
            }
          }}
        />
  
        <div className="w-[10%] h-full divide-y divide-zinc-400 border-l border-zinc-400">
          <button
            type="button"
            className="flex items-center justify-center bg-zinc-50 h-1/2 w-full hover:bg-zinc-200 "
            onClick={() => {
              const numericValue = parseInt(value || "0");
              if (numericValue < maxNumber) {
                onChange({
                  target: { value: (numericValue + 1).toString() },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-[13px]"
              width={13}
              height={13}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
  
          <button
            type="button"
            className="flex items-center justify-center bg-zinc-50 h-1/2 w-full hover:bg-zinc-200 "
            onClick={() => {
              const numericValue = parseInt(value || "0");
              if (numericValue > minNumber) {
                onChange({
                  target: { value: (numericValue - 1).toString() },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-[13px]"
              width={13}
              height={13}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default InputNumber;
  