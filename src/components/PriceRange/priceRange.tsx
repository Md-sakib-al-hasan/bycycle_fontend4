import React, { useEffect, useState } from "react";

const PriceRange = ({ Price }: { Price: React.Dispatch<React.SetStateAction<number>> }) => {
  const [price, setPrice] = useState(50); // State to store the entered price

  // Update parent component when price changes
  useEffect(() => {
    Price(price);
  }, [price, Price]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice(Number(value.replace(/[^0-9]/g, ""))); // Remove non-numeric characters
  };

  return (
    <div className="space-y-6 px-4 shadow-lg border-[1px] pt-5 pb-10 overflow-hidden">
      <h2 className="text-xl">Price</h2>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-400 h-2 rounded-full"
          style={{ width: `${price / 10}%` }} // Use price directly for progress width
        ></div>
        <div
          className="absolute -top-1 w-4 h-4 bg-white rounded-full"
          style={{ left: `calc(${price / 10}% - 0.5rem)` }} // Center the pointer
        ></div>
      </div>

      {/* Price Input */}
      <div className="flex justify-between overflow-hidden">
        <input
          className="w-2/12 border-2 border-gray-200 focus:outline-none text-center"
          type="text"
          disabled
          value="$0"
        />
        <div className="w-3/12 border-2 border-gray-200 flex items-center justify-center">
          <span className=" text-xl">$</span>
          <input
            className="w-full border-none focus:outline-none text-center"
            type="text"
            value={price}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
