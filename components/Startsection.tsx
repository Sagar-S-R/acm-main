"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export function Startsection() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    id: 1,
    thumbnail:
      "/generalImages/coverPic3.jpg",
  },
  {
    id: 2,
    thumbnail:
      "/generalImages/coverPic2.jpg",
  },
  {
    id: 3,
    thumbnail:
      "/generalImages/coverPic1.jpg",
  },

  {
    id: 4,
    thumbnail:
      "/generalImages/coverPic4.jpg",
  },
  {
    id: 5,
    thumbnail:
      "/generalImages/coverPic5.jpg",
  },
  {
    id: 6,
    thumbnail:
      "/generalImages/coverPic6.jpg",
  },
  {
    id: 7,
    thumbnail:
      "/generalImages/coverPic7.jpg",
  },
  {
    id: 8,
    thumbnail:
      "/generalImages/coverPic8.jpg",
  },
  {
    id: 9,
    thumbnail:
      "/generalImages/coverPic9.jpg",
  },
];
