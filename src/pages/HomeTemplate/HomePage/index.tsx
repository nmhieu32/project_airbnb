import { useEffect } from "react";
import CarouselHome from "./Carousel";
import CategorySection from "./CategorySection";
import DefaultLocation from "./Location";
import SearchBarHome from "./SearchBar";
import { useLocationStore } from "@/store/location.store";

export default function HomePage() {
  const {clearSearch} = useLocationStore()
  useEffect(() => {
    clearSearch()
  }, [])
  
  return (
    <>
      <CarouselHome />
      <SearchBarHome/>
      <DefaultLocation/>
      <CategorySection/>
    </>
  );
}