import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import router from "next/router";

const BackBtn = () => {
  const goBack = () => router.back();
  return (
    <Button
      onClick={goBack}
      className="back-btn"
      icon={<LeftOutlined style={{ fontSize: "1em" }} />}
      type="primary"
    />
  );
};

export default BackBtn;
