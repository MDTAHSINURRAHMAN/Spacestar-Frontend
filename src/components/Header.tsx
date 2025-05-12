import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <header className="max-w-screen-lg mx-auto w-full text-end lg:pr-10">
      <p className="font-violet-sans uppercase text-xs lg:text-sm text-green-700 mb-5 md:mb-0">
        {text}
      </p>
    </header>
  );
};

export default Header;
