import Image from "next/image";

type MenuCardProps = {
  name: string;
  image: string;
  isFavorite?: boolean;
};

export default function MenuCard({ name, image, isFavorite }: MenuCardProps) {
  return (
    <div className="bg-light-gray rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      
      {/* IMAGE */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          {isFavorite && (
            <span className="text-gold text-sm font-bold">★ Must Try</span>
          )}
        </div>
      </div>
    </div>
  );
}
