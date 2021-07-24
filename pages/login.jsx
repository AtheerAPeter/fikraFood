import { Form, Input, Button, Checkbox, message } from "antd";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import router from "next/router";
import { useState, useEffect } from "react";
function login() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    getAndSet();
  }, []);

  const getAndSet = async () => {
    const user = await Cookies.get("client");
    const token = await Cookies.get("token");

    if (!(user && token)) return setIsLoggedIn(false);
    router.push("/");
  };
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    fetch("https://prisma-shop.herokuapp.com/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (!result.status) {
          return message.error("Invalid Credentials");
        }

        Cookies.set("token", result.data.token);
        Cookies.set("client", result.data.user);
        router.push("/");
      })
      .catch((error) => console.log("error", error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return !isLoggedIn ? (
    <div className="login">
      <div className="underlay">
        <motion.img
          variants={{
            visible: { x: 0, y: 0 },
            hidden: { x: "-100%", y: "-100%" },
          }}
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeInOut", duration: 2, type: "spring" }}
          className="first-image"
          src="/images/hero.png"
          alt=""
        />
        <motion.img
          variants={{
            visible: { x: 0, y: 0 },
            hidden: { x: "100%", y: "100%" },
          }}
          initial="hidden"
          animate="visible"
          transition={{
            ease: "easeInOut",
            duration: 2,
            type: "spring",
            delay: 1,
          }}
          className="second-image"
          src="/images/hero3.png"
          alt=""
        />
      </div>
      <motion.div
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
      >
        <Form
          className="form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p>Email</p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your E-Mail!",
              },
            ]}
          >
            <Input size="large" placeholder="john@example.com" />
          </Form.Item>
          <p>Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              disabled={loading}
              style={{ width: "100%" }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  ) : null;
}

export default login;
