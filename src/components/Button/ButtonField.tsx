import { Button } from "antd";
import { forwardRef, ReactNode } from "react";

interface ButtonFieldProps {
  size?: "small" | "middle" | "large";
  icon?: ReactNode;
  type?: "link" | "text" | "default" | "primary" | "dashed";
  htmlType?: "button" | "submit" | "reset";
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonField = forwardRef<HTMLButtonElement, ButtonFieldProps>(
  ({ size, icon, type, children, ...props }, ref) => {
    return (
      <Button ref={ref} icon={icon} size={size} type={type} {...props}>
        {children}
      </Button>
    );
  },
);

export default ButtonField;
