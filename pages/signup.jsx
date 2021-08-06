import { Form, Input, Button, Checkbox, message } from "antd";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import router from "next/router";
import { useState, useEffect } from "react";
import BackBtn from "../components/BackBtn";
import { config } from "../config";

function Signup() {
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
    fetch(`${config.URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);

        if (!result.status) {
          return message.error("Error Occured");
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
      <BackBtn />
      <div className="underlay">
        <motion.img
          variants={{
            visible: { x: 0, y: 0 },
            hidden: { x: "100%", y: "-100%" },
          }}
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeInOut", duration: 2, type: "spring" }}
          className="first-image-signup"
          src="/images/hero.png"
          alt=""
        />
        <motion.img
          variants={{
            visible: { x: 0, y: 0 },
            hidden: { x: "-100%", y: "100%" },
          }}
          initial="hidden"
          animate="visible"
          transition={{
            ease: "easeInOut",
            duration: 2,
            type: "spring",
            delay: 1,
          }}
          className="second-image-signup"
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
        className="form-container"
      >
        <h3 className="form-title">Create a New Account</h3>
        <Form
          className="form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p>Username</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input size="large" placeholder="john doe" />
          </Form.Item>
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p className="signup-link">
          Already have an acoount? <Link href="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  ) : null;
}

export default Signup;
