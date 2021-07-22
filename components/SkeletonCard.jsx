import { AnimateSharedLayout, motion } from "framer-motion";
export default function SkeletonCard({ product }) {
  return (
    <AnimateSharedLayout>
      <motion.div
        key={product.id}
        className={"product"}
        onClick={() => setOpen(true)}
        layout
      >
        <div className="skeleton-image"></div>
        <div className="card-type"></div>
      </motion.div>
    </AnimateSharedLayout>
  );
}
