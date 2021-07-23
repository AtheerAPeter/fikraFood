import MainLayout from "../../components/MainLayout";
import { motion } from "framer-motion";
import { Button } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const SingleProduct = ({ data }) => {
  console.log(data);
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <MainLayout>
      <div className="single-product">
        <motion.div
          transition={{ duration: 1, times: [0, 0.2, 1] }}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="overlay"
        >
          <div className="container">
            <span className="name-wrapper">
              <h1>{data.name}</h1>{" "}
              <p className="price">
                {numberWithCommas(data.price)} {data.currency}
              </p>
            </span>
            <p>{data.description}</p>
            <div className="button">
              Add To Cart <AiOutlineArrowRight />
            </div>
          </div>
        </motion.div>
        <motion.img
          className="sp-image"
          layoutId={data.id}
          src={data.image}
          alt=""
        />
      </div>
    </MainLayout>
  );
};

export default SingleProduct;

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   return fetch(
//     `https://prisma-shop.herokuapp.com/v1/product/${id}`,
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       return {
//         props: { data: result.data }, // will be passed to the page component as props
//       };
//     })
//     .catch((error) => console.log("error", error));
// }

export const getStaticPaths = async () => {
  const res = await fetch("https://prisma-shop.herokuapp.com/v1/productAll");

  const data = await res.json();

  const paths = data.data.map((ninja) => {
    return {
      params: {
        id: ninja?.id + "",
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (cts) => {
  const id = cts.params.id;
  const res = await fetch("https://prisma-shop.herokuapp.com/v1/product/" + id);
  const data = await res.json();

  return { props: { data: data.data } };
};
