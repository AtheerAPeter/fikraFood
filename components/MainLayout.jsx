import { FaHamburger } from "react-icons/fa";
import { Button, Avatar, Popover, button } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Pagination } from "antd";

const MainLayout = ({
  children,
  hidden,
  filled,
  paginationCount,
  onChangePagination,
}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    getAndSet();
  }, []);

  const getAndSet = async () => {
    const user = await Cookies.get("client");
    if (user) setUser(JSON.parse(user));
  };

  const logout = async () => {
    await Cookies.remove("token");
    await Cookies.remove("client");
    setUser(null);
  };

  const content = (
    <div>
      <Button danger type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
  return (
    <>
      {hidden ? null : (
        <nav style={{ backgroundColor: filled ? "#fff" : "transparent" }}>
          <div className="container">
            <Link href="/">
              <div className="logo">
                <FaHamburger className="logo-icon" />
                <h1>FikraFood</h1>
              </div>
            </Link>
            {user ? (
              <Popover trigger="click" content={content}>
                <div className="user">
                  <h2>{user.name}</h2>

                  <Avatar
                    style={{
                      backgroundColor: "orange",
                      verticalAlign: "middle",
                    }}
                    size="large"
                    gap="4"
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>
                </div>
              </Popover>
            ) : (
              <div className="menu">
                <Link href="/login">
                  <Button className="login-btn">LOGIN</Button>
                </Link>
                <Button className="signup-btn" type="primary">
                  SIGN UP
                </Button>
              </div>
            )}
          </div>
        </nav>
      )}

      <div>{children}</div>
      {paginationCount && (
        <div className="pagination-wrapper">
          <Pagination
            pageSize={10}
            defaultCurrent={1}
            total={paginationCount}
            onChange={onChangePagination}
          />
        </div>
      )}
    </>
  );
};

export default MainLayout;
