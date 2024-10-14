import { motion } from "framer-motion";

const BurgerMenu = ({ isMobileOpen, toggleMenu }: {isMobileOpen: boolean, toggleMenu: () => void}) => {
  return (
    <button onClick={toggleMenu} className="header__burger-button" style={{ border: "none", background: "none" }}>
      <motion.span
        className="header__burger-bar"
        animate={isMobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: "block",
          width: "30px",
          height: "4px",
          background: "#fff",
          marginBottom: "5px",
          borderRadius: "2px",
        }}
      />
      <motion.span
        className="header__burger-bar"
        animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: isMobileOpen ? 0.3 : 0.4 }}
        style={{
          display: "block",
          width: "30px",
          height: "4px",
          background: "#fff",
          marginBottom: "5px",
          borderRadius: "2px",
        }}
      />
      <motion.span
        className="header__burger-bar"
        animate={isMobileOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: "block",
          width: "30px",
          height: "4px",
          background: "#fff",
          borderRadius: "2px",
        }}
      />
    </button>
  );
};

export default BurgerMenu;