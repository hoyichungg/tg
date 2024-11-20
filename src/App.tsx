import { FilterOutlined } from "@ant-design/icons";
import { Layout, Popover } from "antd";

import React, { useState } from "react";

import { ButtonField } from "./components/Button";
import { ContentContainer } from "./components/Container";
import { PopoverContent } from "./components/Content";

const { Content } = Layout;

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "10px 50px" }}>
        <ContentContainer>
          <Popover
            placement="bottomLeft"
            content={
              <PopoverContent handleVisibleChange={handleVisibleChange} />
            }
            trigger="click"
            arrow
            open={visible}
            onOpenChange={handleVisibleChange}
          >
            <ButtonField
              size="large"
              icon={<FilterOutlined style={{ color: "#08c" }} />}
            />
          </Popover>
        </ContentContainer>
      </Content>
    </Layout>
  );
};

export default App;
