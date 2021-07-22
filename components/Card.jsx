import { AnimateSharedLayout, motion } from "framer-motion";
import router from "next/router";
import { useState } from "react";
export default function Card({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        key={product.id}
        onClick={() => router.push(`/products/${product.id}`)}
        className={"product"}
        // layoutId={`expandable-card-${product.id}`}
      >
        <motion.img layoutId={product.id} src={product.image} alt="" />
        <div className="card-type">
          <p className="card-name">{product.name}</p>
        </div>
      </motion.div>
    </>
  );
}
