import { FaHamburger } from "react-icons/fa";
import { Button } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";

const MainLayout = ({ children, hidden }) => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <>
      {hidden ? null : (
        <nav>
          <div className="container">
            <Link href="/">
              <div className="logo">
                <FaHamburger className="logo-icon" />
                <h1>FikraFood</h1>
              </div>
            </Link>
            <div className="menu">
              <Button className="login-btn">LOGIN</Button>
              <Button className="signup-btn" type="primary">
                SIGN UP
              </Button>
            </div>
          </div>
        </nav>
      )}

      <div
      // variants={variants} // Pass the variant object into Framer Motion
      // initial="hidden" // Set the initial state to variants.hidden
      // animate="enter" // Animated state to variants.enter
      // exit="exit" // Exit state (used later) to variants.exit
      // transition={{ type: "linear" }} // Set the transition to linear
      // className=""
      >
        {children}
      </div>
    </>
  );
};

export default MainLayout;
