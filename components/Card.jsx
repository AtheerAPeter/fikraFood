import { AnimateSharedLayout, motion } from "framer-motion";
import moment from "moment";
import router from "next/router";
import { useState } from "react";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default function Card({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        key={product.id}
        onClick={() => router.push(`/products/${product.id}`)}
        className={"product"}
      >
        <motion.img layoutId={product.id} src={product.image} alt="" />
        <div className="card-type">
          <p className="card-name">{product.name}</p>
          <span className="card-price-wrapper">
            <p className="card-price">{numberWithCommas(product.price)}</p>
            <p className={"card-currency"}>{product.currency}</p>
          </span>
        </div>
      </motion.div>
    </>
  );
}
