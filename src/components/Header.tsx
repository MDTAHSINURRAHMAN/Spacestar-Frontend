import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <header className="max-w-screen-lg mx-auto w-full text-end">
      <p className="font-violet-sans uppercase text-xs md:text-sm text-primary mb-5 md:mb-0">
        {text}
      </p>
    </header>
  );
};

export default Header;
