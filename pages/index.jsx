import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/MainLayout";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { config } from "../config";
import { Button } from "antd";
import { ImSpoonKnife } from "react-icons/im";
import Router from "next/router";

export default function Home() {
  const [data, setData] = useState();

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  useEffect(() => {
    // getData();
  }, []);

  const getData = async () => {
    fetch(`${config.URL}/productAll`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status) setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const goToProducts = () => {
    Router.push("/products");
  };

  return (
    <MainLayout>
      <div className="container" animate={{ scale: 1 }}>
        <div className="home">
          <div className="left">
            <div className="types">
              <h1 className="hero-type">Welcome to</h1>{" "}
              <div className="color">
                <h1 className="hero-type-main-color">FikraFood</h1>
                <h1>!</h1>
              </div>
              <p className="hero-type-p">
                Start ordering meals weekly for only $5.99/week per dish!
              </p>
            </div>
            <Button
              onClick={goToProducts}
              size={"large"}
              className="cta"
              type="primary"
            >
              Browse Meals
              <ImSpoonKnife className="cta-icon" />
            </Button>
          </div>

          <div className="right">
            <img src={"/images/blob.svg"} className="blob" />
            <img src={"/images/hero.png"} className="hero-image" />
            {/* <Carousel
              showThumbs={false}
              showIndicators={false}
              autoplay={true}
              interval={2000}
              showStatus={false}
              infiniteLoop
              dots={true}
              effect="fade"
              afterChange={onChange}
            >
              {data &&
                data.map((item) => {
                  return (
                    <div className="slider">
                      <img className="carusel-image" src={item.image} />
                    </div>
                  );
                })}
            </Carousel> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
