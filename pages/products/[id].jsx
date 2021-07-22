import MainLayout from "../../components/MainLayout";
import { motion } from "framer-motion";

const SingleProduct = ({ data }) => {
  return (
    <MainLayout>
      <motion.img layoutId={data.id} src={data.image} alt="" />
    </MainLayout>
  );
};

export default SingleProduct;

export async function getServerSideProps(context) {
  const { id } = context.query;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    `https://prisma-shop.herokuapp.com/v1/product/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return {
        props: { data: result.data }, // will be passed to the page component as props
      };
    })
    .catch((error) => console.log("error", error));
}
