import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import { useViewport } from "./hooks/useViewport";
import BurgerMenu from "./BurgerMenu";

const Header: React.FC = () => {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { width } = useViewport();
  const languages = [
    { value: "RU", label: "RU" },
    { value: "EN", label: "EN" },
    { value: "AR", label: "AR" },
    { value: "CH", label: "CH" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (language: { value: string; label: string }) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className="header"
      initial={{ backgroundColor: "transparent" }}
      animate={{
        backgroundColor: !isMobile && isScrolled ? "#fff" : "transparent",
        color: isScrolled ? "#000" : "#fff",
        transition: { duration: 0.5 },
      }}
      style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
    >
      <motion.div
        className="header__container"
        animate={{
          transition: { duration: 0.5 },
          backgroundColor: isScrolled ? "#fff" : "transparent",
        }}
      >
        {!isMobile && (
          <>
            {/* Логотип и навигация на десктопе */}
            <motion.div
              className="header__logo"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isScrolled ? 1 : 0,
                y: isScrolled ? 0 : -20,
                transition: { duration: 0.5 },
                backgroundColor: isScrolled ? "#fff" : "transparent",
              }}
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Logo
            </motion.div>

            <div className="header__navigation">
              <ul
                style={{
                  backgroundColor: isScrolled ? "#fff" : "transparent",
                }}
              >
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      style={{
                        color: isScrolled ? "#000" : "#fff",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              className="header__right"
              animate={{
                transition: { duration: 0.5 },
                backgroundColor: isScrolled ? "#fff" : "transparent",
              }}
            >
              <motion.button
                className="header__button"
                animate={{
                  transition: { duration: 0.5 },
                  color: isScrolled ? "#000" : "#fff",
                  backgroundColor: isScrolled ? "#fff" : "transparent",
                  borderColor: isScrolled ? "#000" : "#fff",
                }}
              >
                {isEnglish ? "BOOK ME" : "ЗАБРОНИРОВАТЬ"}
              </motion.button>
              <motion.div
                className="header__phone"
                animate={{
                  transition: { duration: 0.5 },
                  color: isScrolled ? "#000" : "#fff",
                  backgroundColor: isScrolled ? "#fff" : "transparent",
                }}
              >
                +7 (495) 225-81-81
              </motion.div>
              <motion.button
                onClick={toggleLanguage}
                className="header__language-button"
                animate={{
                  transition: { duration: 0.5 },
                  color: isScrolled ? "#000" : "#fff",
                  backgroundColor: isScrolled ? "#fff" : "transparent",
                }}
              >
                {languageButtonText}
              </motion.button>
            </motion.div>
          </>
        )}

        {isMobile && (
          <>
            {!isMenuOpen && (
              <div className="header__mobile-language-select">
                <div
                  className="language-select"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedLanguage.label}
                </div>
                {isDropdownOpen && (
                  <div className="language-options">
                    {languages.map((language) => (
                      <div
                        key={language.value}
                        className="language-option"
                        onClick={() => handleLanguageChange(language)}
                      >
                        {language.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <BurgerMenu toggleMenu={toggleMenu} isMobileOpen={isMenuOpen} />
          </>
        )}

        {isMobile && isMenuOpen && (
          <div
            className="header__mobile-menu"
            style={{ display: isMenuOpen ? "flex" : "none" }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              style={{
                height: "100%",
                background: "inherit",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              {navigationLinks.map((link, index) => (
                <motion.li key={index} style={{ background: "inherit" }}>
                  <a
                    href="#"
                    style={{
                      background: "inherit",
                      color: "#fff",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}

              <motion.li style={{ background: "inherit" }}>
                <button
                  className="header__button"
                  style={{
                    background: "inherit",
                    marginRight: "0",
                    border: "none",
                    fontSize: "32px",
                  }}
                >
                  {isEnglish ? "BOOK ME" : "ЗАБРОНИРОВАТЬ"}
                </button>
              </motion.li>

              <motion.li style={{ background: "inherit" }}>
                <div
                  className="header__phone"
                  style={{ background: "inherit", marginRight: "0" }}
                >
                  +7 (495) 225-81-81
                </div>
              </motion.li>

              <motion.li style={{ background: "inherit" }}>
                <button
                  onClick={toggleLanguage}
                  className="header__language-button"
                  style={{
                    background: "inherit",
                    marginRight: "0",
                    fontSize: "32px",
                  }}
                >
                  {languageButtonText}
                </button>
              </motion.li>
            </motion.ul>
          </div>
        )}
      </motion.div>
    </motion.header>
  );
};

export default Header;
