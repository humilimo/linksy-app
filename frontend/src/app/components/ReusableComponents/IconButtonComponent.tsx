// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode; 
  dataCy?: string;
}

const IconButtonComponent: React.FC<ButtonProps> = ({ onClick, icon, dataCy }) => {
  return (
    <button
      className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
      type="button"
      onClick={onClick}
      data-cy={dataCy}
    >
      {icon}
    </button>
  );
};

export default IconButtonComponent;
