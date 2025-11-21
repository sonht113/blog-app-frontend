import React from "react";

type Props = {
  label: React.ReactNode;
  isRequired?: boolean;
};

const LabelField = ({ label, isRequired = false }: Props) => {
  return (
    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1">
      {label} {isRequired && <span className="text-red-500 font-medium">*</span>}
    </p>
  );
};

export default LabelField;
