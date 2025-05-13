import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <header className="w-full md:w-4/6 mx-auto px-4 md:px-0 text-end">
      <p className="font-violet-sans uppercase text-xs lg:text-sm text-green-700 mb-5">
        {text}
      </p>
    </header>
  );
};

export default Header;
