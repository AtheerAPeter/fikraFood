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
      {open ? (
        <motion.div
          onClick={() => setOpen(false)}
          className="expanded-card"
          layoutId="expandable-card"
        >
          <motion.h2
            className="expanded-card-h"
            layoutId="expandable-card-h"
          ></motion.h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            aliquam molestiae ratione sint magnam sequi fugiat u llam earum
            distinctio fuga iure, ad odit repudiandae modi est alias ipsum
            aperiam. Culpa?
          </p>
        </motion.div>
      ) : (
        <motion.div
          onClick={() => setOpen(true)}
          className="normal-card"
          layoutId="expandable-card"
        >
          <motion.h1 layoutId="expandable-card-h">hi</motion.h1>
        </motion.div>
      )}
    </>
  );
}
