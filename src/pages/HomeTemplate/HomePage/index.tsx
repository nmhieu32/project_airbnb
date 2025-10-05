import CarouselHome from "./Carousel";
import CategorySection from "./CategorySection";
import DefaultLocation from "./Location";
import SearchBarHome from "./SearchBar";

export default function HomePage() {
  return (
    <>
      <CarouselHome />
      <SearchBarHome/>
      <DefaultLocation/>
      <CategorySection/>
    </>
  );
}
