import React, { useState } from "react";
import "./App.css";
import { useViewport } from "./hooks/useViewport";
import {motion } from "framer-motion"
import BurgerMenu from "./BurgerMenu";

const Header: React.FC = () => {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useViewport();

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationLinks = isEnglish
    ? ["Menu", "Events", "News", "Gallery", "About Us", "Contacts"]
    : ["Меню", "Мероприятия", "Новости", "Галерея", "О нас", "Контакты"];

  const languageButtonText = isEnglish ? "Русский" : "English";

  const isMobile = width < 992;
  const listVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // задержка для каждого элемента
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  return (
    <header className="header">
      <div className="header__container">
        {!isMobile && (
          <div className="header__navigation">
            <ul>
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isMobile && (
          <BurgerMenu isMobileOpen={isMenuOpen} toggleMenu={toggleMenu} />
        )}

        {!isMobile && <div className="header__right">
          <button className="header__button">
            {isEnglish ? "BOOK ME" : "ЗАБРОНИРОВАТЬ"}
          </button>
          <div className="header__phone">+7 (495) 225-81-81</div>
          <button
            onClick={toggleLanguage}
            className="header__language-button"
          >
            {languageButtonText}
          </button>
        </div>
        }

        {isMobile && isMenuOpen && (
          <div className="header__mobile-menu" style={{ display: isMenuOpen ? "flex" : "none" }}>
            <motion.ul
              initial="hidden"
              animate="visible"
              style={{
                height: '100%',
                background: 'inherit',
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              {navigationLinks.map((link, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  variants={listVariants}
                  style={{ background: "inherit" }}
                >
                  <a href="#" style={{ background: "inherit", color: "#fff", textDecoration: "none", textTransform: "uppercase" }}>
                    {link}
                  </a>
                </motion.li>
              ))}

              <motion.li custom={navigationLinks.length} variants={listVariants} style={{ background: "inherit" }}>
                <button className="header__button" style={{ background: "inherit", marginRight: "0", border: "none", fontSize: "32px" }}>
                  {isEnglish ? "BOOK ME" : "ЗАБРОНИРОВАТЬ"}
                </button>
              </motion.li>

              <motion.li custom={navigationLinks.length + 1} variants={listVariants} style={{ background: "inherit" }}>
                <div className="header__phone" style={{ background: "inherit", marginRight: "0" }}>+7 (495) 225-81-81</div>
              </motion.li>

              <motion.li custom={navigationLinks.length + 2} variants={listVariants} style={{ background: "inherit" }}>
                <button
                  onClick={toggleLanguage}
                  className="header__language-button"
                  style={{ background: "inherit", marginRight: "0", fontSize: "32px" }}
                >
                  {languageButtonText}
                </button>
              </motion.li>
            </motion.ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
