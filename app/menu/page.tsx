import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";

const menuData = [
  {
    category: "Cheesecakes",
    items: [
      {
        name: "Classic New York",
        image: "/menu/cheesecakes/20251117_143050.jpg",
      },
      {
        name: "Blueberry",
        image: "/menu/cheesecakes/20251117_143050.jpg",
        fav: true,
      },
      {
        name: "Nutella",
        image: "/menu/cheesecakes/20251117_143050.jpg",
      },
      {
        name: "Basque",
        image: "/menu/cheesecakes/20251117_143050.jpg",
      },
    ],
  },
  {
    category: "Tiramisu",
    items: [
      {
        name: "Tiramisu Box",
        image: "/menu/tiramisu/20250613_204242.jpg",
        fav: true,
      },
    ],
  },
  {
    category: "Tea Cakes",
    items: [
      {
        name: "Rose Pistachio",
        image: "/menu/teacakes/rose-pistachio.jpg",
      },
      {
        name: "Banana Almond",
        image: "/menu/teacakes/banana-almond.jpg",
      },
      {
        name: "Choco Coffee Walnut",
        image: "/menu/teacakes/choco-coffee-walnut.jpg",
      },
    ],
  },
  {
    category: "Cupcakes",
    items: [
      {
        name: "Red Velvet",
        image: "/menu/cupcakes/red-velvet.jpg",
        fav: true,
      },
      {
        name: "Cookies & Cream",
        image: "/menu/cupcakes/cookies-cream.jpg",
      },
      {
        name: "Chocolate",
        image: "/menu/cupcakes/chocolate.jpg",
      },
      {
        name: "Lotus Biscoff",
        image: "/menu/cupcakes/lotus-biscoff.jpg",
      },
    ],
  },
  {
    category: "Brownies",
    items: [
      {
        name: "Fudgy Chocolate",
        image: "/menu/brownies/fudgy.jpg",
        fav: true,
      },
      {
        name: "Hazelnut Chocolate",
        image: "/menu/brownies/hazelnut.jpg",
      },
      {
        name: "Almond Chocolate",
        image: "/menu/brownies/almond.jpg",
      },
      {
        name: "Chocolate Ganache",
        image: "/menu/brownies/ganache.jpg",
      },
    ],
  },
  {
    category: "Must Try",
    items: [
      {
        name: "Cinnamon Rolls",
        image: "/menu/musttry/20250707_145412.jpg",
        fav: true,
      },
      {
        name: "Chocolate Mousse",
        image: "/menu/musttry/20251119_130529(0).jpg",
      },
      {
        name: "Garlic Bread",
        image: "/menu/musttry/20250707_145412.jpg",
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="bg-beige min-h-screen px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 dancing-script">
          Our Menu
        </h1>

        {menuData.map((section) => (
          <section key={section.category} className="mb-14">
            <h2 className="text-4xl font-semibold mb-6 border-b border-dark-gray pb-2 dancing-script">
              {section.category}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 dancing-script">
              {section.items.map((item) => (
                <MenuCard
                  key={item.name}
                  name={item.name}
                  image={item.image}
                  isFavorite={item.fav}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
