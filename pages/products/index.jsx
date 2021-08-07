import MainLayout from "../../components/MainLayout";
import { config } from "../../config";
import { useState, useEffect, useRef } from "react";
import Card from "../../components/Card";
import SkeletonCard from "../../components/SkeletonCard";
import ExpandCard from "../../components/ExpadnCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { message, Input, Button, Spin } from "antd";
import { BsChevronDoubleDown } from "react-icons/bs";
const { Search } = Input;
import { useDebounce } from "use-debounce";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchQuery] = useDebounce(query, 1000);

  const getData = async (page = 1, q = "") => {
    if (hasMore || !!q.length) {
      setLoading(true);
      setPage(page);
      const res = await fetch(
        `${config.URL}/productAll?p=${page}&s=10${!!q.length ? "&q=" + q : ""}`
      );

      const data = await res.json();

      if (data) {
        setLoading(false);
        if (!!q?.length) {
          return setData(data.data.products);
        }
        setData((e) => [...e, ...data.data.products]);

        if (data.data.products?.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom) {
      console.log("bottom");
      loadNextPage();
    }
  };

  const loadNextPage = () => {
    if (hasMore) getData(page + 1);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      setData([]);
      getData(1, searchQuery);
    } else {
      setData([]);
      getData(1);
    }
  }, [searchQuery]);

  return (
    <div className="scroll-conteol" onScroll={handleScroll}>
      <MainLayout hidden={isOpen} filled>
        <div className="container">
          <div className="search-wrapper">
            <Search
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              size="large"
              placeholder="search dishes"
              enterButton
            />
          </div>
          {!!data.length ? (
            <>
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
              {hasMore && !!!searchQuery ? (
                loading ? (
                  <div className="spin" onClick={loadNextPage}>
                    <Spin />
                  </div>
                ) : (
                  <div className="arrowDown" onClick={loadNextPage}>
                    <p>More</p>
                    <BsChevronDoubleDown />
                  </div>
                )
              ) : !!searchQuery ? null : (
                <div className="arrowDown nomore" onClick={loadNextPage}>
                  <p>No more dishes to show</p>
                </div>
              )}
            </>
          ) : (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3, 1000: 5 }}
            >
              <Masonry gutter={10} className="masonry paddingTop">
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
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch("https://prisma-shop.herokuapp.com/v1/productAll");

//   const data = await res.json();

//   return { props: { data: data.data } };
// };
