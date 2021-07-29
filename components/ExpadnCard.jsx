import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import router from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button, Rate } from "antd";
import { LeftOutlined, StarFilled } from "@ant-design/icons";
function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ExpandCard({ product, setIsOpen }) {
  console.log(product);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const imageMotion = {
    rest: {
      scale: 1,
      transition: { duration: 0.5, zIndex: 1000, ease: "easeInOut" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.5, zIndex: 1000, ease: "easeInOut" },
    },
  };
  const containerMotion = {
    rest: {
      scale: 1,
      transition: { duration: 0.5, zIndex: 1000, ease: "easeInOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.5, zIndex: 1000, ease: "easeInOut" },
    },
  };

  return (
    <AnimateSharedLayout>
      {open ? (
        <motion.div className="expanded-card" layoutId="expandable-card">
          <motion.img
            className="expanded-card-image"
            layoutId={product.id}
            src={product.image}
            alt=""
          />
          <motion.h1
            className="expanded-card-price"
            layoutId="expandable-card-price"
          >
            {numberWithCommas(product.price)}
            {product.currency}
          </motion.h1>
          <motion.div className="container">
            <Button
              onClick={() => setOpen(false)}
              className="close-btn"
              icon={<LeftOutlined style={{ fontSize: "1em" }} />}
              type="primary"
            />
            <div className="expanded-card-content">
              <div className="name-price">
                <motion.h1
                  className="expanded-card-h"
                  layoutId="expandable-card-h"
                >
                  {product.name}
                </motion.h1>
              </div>
              <p className="description">{product.description}</p>
              <Button size="large" type="primary" className="button">
                Add To Cart
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={containerMotion}
          onClick={() => setOpen(true)}
          className="normal-card"
          layoutId="expandable-card"
        >
          <motion.img
            variants={imageMotion}
            className="normal-card-image"
            layoutId={product.id}
            src={product.image}
            alt=""
          />
          <motion.div className="normal-card-type">
            <motion.p layoutId="expandable-card-h" className="h1">
              {product.name}
            </motion.p>

            {product.rating && (
              <motion.div className="rating-container">
                <Rate
                  style={{ color: "#fc9803" }}
                  character={(e) => <StarFilled className="single-star" />}
                  className="stars"
                  disabled
                  value={product.rating}
                />
                <p>({product.rating})</p>
              </motion.div>
            )}
            <motion.span className="card-price-wrapper">
              <motion.p className="card-price" layoutId="expandable-card-price">
                {numberWithCommas(product.price)}
              </motion.p>
              <motion.p className={"card-currency"}>
                {product.currency}
              </motion.p>
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimateSharedLayout>
  );
}
export default ExpandCard;
