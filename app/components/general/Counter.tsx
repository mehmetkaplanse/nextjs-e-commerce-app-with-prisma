import React from "react";

interface CounterProps {
  cardProduct: any;
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

const Counter: React.FC<CounterProps> = ({
  cardProduct,
  increaseFunc,
  decreaseFunc,
}) => {
  const buttonStyle = "w-8 h-8 border flex items-center justify-center text-lg rounded-md select-none cursor-pointer";

  return (
    <div className="flex gap-3 items-center">
      <div
        onClick={decreaseFunc}
        className={buttonStyle}
      >
        -
      </div>
      <div className="text-lg md:text-2xl">{cardProduct?.quantity}</div>
      <div
        onClick={increaseFunc}
        className={buttonStyle}
      >
        +
      </div>
    </div>
  );
};

export default Counter;
