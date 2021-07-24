import MainLayout from "../../components/MainLayout";
import { config } from "../../config";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
import ExpandCard from "../../components/ExpadnCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Products({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout hidden={isOpen} filled>
      <div className="container">
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
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://prisma-shop.herokuapp.com/v1/productAll");

  const data = await res.json();

  return { props: { data: data.data } };
};
