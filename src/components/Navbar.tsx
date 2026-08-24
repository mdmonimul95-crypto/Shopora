"use client";

import React, { useState } from "react";


import HeaderTopBar from "./header/HeaderTopBar";
import HeaderNavigation from "./header/HeaderNavigation";
import HeaderMain from "./header/HeaderMain";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleCategoryToggle = () => {
    setCategoryOpen((prev) => !prev);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
    setCategoryOpen(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setCategoryOpen(false);
  };

  const handleMobileCategoryClose = () => {
    setCategoryOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_8px_rgba(15,118,110,0.06)]">

      {/* Top Utility Bar */}
      <HeaderTopBar />

      {/* Main Header */}
      <HeaderMain
        onMenuOpen={handleMobileMenuOpen}
        categoryOpen={categoryOpen}
        onCategoryToggle={handleCategoryToggle}
      />

      {/* Navigation */}
      <HeaderNavigation
        categoryOpen={categoryOpen}
        mobileMenuOpen={mobileMenuOpen}
        onCategoryToggle={handleCategoryToggle}
        onMobileMenuClose={handleMobileMenuClose}
        onMobileCategoryClose={handleMobileCategoryClose}
      />

    </header>
  );
};

export default Navbar;