import { AnimateSharedLayout, motion } from "framer-motion";
export default function SkeletonCard({ product }) {
  const heights = [250, 300, 350, 400];
  return (
    <>
      <div
        className="normal-card"
        layoutId="expandable-card"
        style={{ height: heights[Math.floor(Math.random() * heights.length)] }}
      >
        <div
          className="normal-card-image"
          style={{ backgroundColor: "#eee", height: "50%" }}
        />
        <div
          className="normal-card-type"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            layoutId="expandable-card-h"
            className="h1"
            style={{
              backgroundColor: "#eee",
              width: "80%",
              height: "30px",
              borderRadius: "10px",
              margin: "20px auto",
            }}
          ></p>
          <span
            className="card-price-wrapper"
            style={{
              backgroundColor: "#eee",
              width: "90%",
              height: "50px",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          ></span>
        </div>
      </div>
    </>
  );
}
