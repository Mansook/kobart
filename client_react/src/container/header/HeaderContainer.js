import React, { useEffect, useState } from "react";
import Header from "../../components/views/Header/Header";

const HeaderContainer = () => {
  const [hide, setHide] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    if (scrollPosition >= 100) {
      setHide(true);
    } else {
      setHide(false);
    }
    console.log(hide);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      style={{
        translate: hide ? "0 -30px" : "0",
        transition: "0.8s",
      }}
    >
      <Header />
    </div>
  );
};
export default HeaderContainer;
