import { FilterOutlined } from "@ant-design/icons";
import { Layout, Popover } from "antd";

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "10px 50px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <ContentContainer>
                  <Popover
                    placement="bottomLeft"
                    content={
                      <PopoverContent
                        handleVisibleChange={handleVisibleChange}
                      />
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
              }
            />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
