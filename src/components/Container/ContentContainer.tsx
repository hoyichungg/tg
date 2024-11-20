import { theme } from "antd";
import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        background: colorBgContainer,
        minHeight: "50rem",
        padding: 25,
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
