import Image from "next/image";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const COLORS = [
  "bg-orange-100 text-orange-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
  "bg-pink-100 text-pink-700",
  "bg-yellow-100 text-yellow-800",
];

const SIZES = {
  sm: { className: "size-7 text-[11px]", px: 28 },
  md: { className: "size-9 text-xs", px: 36 },
  lg: { className: "size-20 text-2xl", px: 80 },
};

// Photo avatar, falling back to initials; the colour is derived from the name so it stays stable
const Avatar: React.FC<AvatarProps> = ({ name, src, size = "md", className = "" }) => {
  const { className: sizeClass, px } = SIZES[size];

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={px}
        height={px}
        unoptimized
        className={`shrink-0 rounded-full object-cover ${sizeClass} ${className}`}
      />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass} ${COLORS[hash % COLORS.length]} ${className}`}
    >
      {initials}
    </span>
  );
};

export default Avatar;
