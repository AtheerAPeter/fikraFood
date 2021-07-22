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

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://prisma-shop.herokuapp.com/v1/product/${params.id}`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch(`https://prisma-shop.herokuapp.com/v1/productAll`, {
    method: "GET",
    redirect: "follow",
  });

  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}
