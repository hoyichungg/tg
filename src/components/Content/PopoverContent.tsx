import React from "react";

import { FilterForm } from "../Form";

interface PopoverContentProps {
  handleVisibleChange: (visible: boolean) => void;
}

const PopoverContent: React.FC<PopoverContentProps> = ({
  handleVisibleChange,
}) => {
  return (
    <div style={{ minWidth: "30rem" }}>
      <FilterForm handleVisibleChange={handleVisibleChange} />
    </div>
  );
};

export default PopoverContent;