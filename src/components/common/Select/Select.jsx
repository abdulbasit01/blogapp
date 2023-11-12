import React from "react";
import { useId } from "react";

const Select = ({ options = [], className = "", label, ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none border duration-200 border-gray-200 w-full ${className}`}
        ref={ref}
        id={id}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
