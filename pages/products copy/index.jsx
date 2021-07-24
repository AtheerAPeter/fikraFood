import MainLayout from "../../components/MainLayout";
import { config } from "../../config";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
import ExpandCard from "../../components/ExpadnCard";
export default function Products({ data }) {
  // const [data, setData] = useState();
  const [expandedIndex, setExpandedIndex] = useState(null);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   fetch(`${config.URL}/productAll`, {
  //     method: "GET",
  //     redirect: "follow",
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.status) setData(result.data);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  useEffect(() => {
    console.log(expandedIndex);
  }, [expandedIndex]);

  return (
    <MainLayout>
      <div className="container">
        {!!data ? (
          <div className="products">
            {data.map((product, index) => {
              return <Card product={product} />;
            })}
          </div>
        ) : (
          <div className="products">
            {[...Array(20).keys()]
              .map((i) => i)
              .map((product, index) => {
                return <SkeletonCard product={product} />;
              })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://prisma-shop.herokuapp.com/v1/productAll");

  const data = await res.json();

  return { props: { data: data.data } };
};
