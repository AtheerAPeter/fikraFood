import MainLayout from "../../components/MainLayout";
import { config } from "../../config";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
import ExpandCard from "../../components/ExpadnCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Products() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (page = 1) => {
    const res = await fetch(
      `https://prisma-shop.herokuapp.com/v1/productAll?p=${page}&s=10`
    );

    const data = await res.json();
    if (data) {
      setData(data.data.products);
      setCount(data.data.count);
    }
  };

  return (
    <MainLayout
      hidden={isOpen}
      filled
      paginationCount={count}
      onChangePagination={(page) => {
        setData(null);
        getData(page);
      }}
    >
      <div className="container">
        {!!data ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3, 1000: 5 }}
          >
            <Masonry gutter={10} className="masonry">
              {data.map((product, index) => {
                return (
                  <ExpandCard
                    setIsOpen={setIsOpen}
                    key={index}
                    product={product}
                  />
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3, 1000: 5 }}
          >
            <Masonry gutter={10} className="masonry">
              {[...Array(20).keys()]
                .map((i) => i)
                .map((product, index) => {
                  return <SkeletonCard />;
                })}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </MainLayout>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch("https://prisma-shop.herokuapp.com/v1/productAll");

//   const data = await res.json();

//   return { props: { data: data.data } };
// };
