import { NavLink } from "react-router-dom";

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      name: "Toàn bộ nhà",
      image: "/images/toan-bo-nha.jpg",
    },
    {
      id: 2,
      name: "Chỗ ở độc đáo",
      image: "/images/cho-o-doc-dao.webp",
    },
    {
      id: 3,
      name: "Trang trại và thiên nhiên",
      image: "/images/trang-trai.jfif",
    },
    {
      id: 4,
      name: "Cho phép mang theo thú cưng",
      image: "/images/thu-cung.avif",
    },
  ];
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Ở bất cứ đâu
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((item) => (
            <NavLink to="bb" key={item.id} className="cursor-pointer">
              <div className="w-full h-60 rounded-xl overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
