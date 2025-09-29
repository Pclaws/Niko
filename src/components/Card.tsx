import Image from "next/image";

interface CardProps {
  title: string;
  description?: string;
  image: string;
  price?: number;
  category?: string;
  badge?: string;
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  price,
  category,
  badge,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-light-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {badge && (
          <div className="absolute top-4 left-4 bg-light-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-dark-900">{badge}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium text-dark-900 flex-1">
            {title}
          </h3>
          {price !== undefined && (
            <span className="text-base font-medium text-dark-900 ml-4">
              ${price}
            </span>
          )}
        </div>

        {description && (
          <p className="text-base text-dark-700 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {category && (
          <span className="inline-block text-sm font-medium text-dark-700 bg-light-200 px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
