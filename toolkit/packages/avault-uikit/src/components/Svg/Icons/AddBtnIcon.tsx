import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const AddBtnIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect stroke="#E6007A" x=".5" y=".5" width="31" height="31" rx="12" />
        <rect fill="#E6007A" x="8" y="14" width="16" height="4" rx="2" />
      </g>
    </Svg>
  );
};

export default AddBtnIcon;
