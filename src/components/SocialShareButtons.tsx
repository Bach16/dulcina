"use client";

import { usePathname } from "next/navigation";

export default function SocialShareButtons({ title }: { title: string }) {
  const pathname = usePathname();

  const handleShare = () => {
    const url = window.location.origin + pathname;
    if (navigator.share) {
      navigator.share({ title, url });
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
        "_blank"
      );
    }
  };

  const handleFacebookShare = () => {
    const url = window.location.origin + pathname;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <div className="flex gap-2 ml-auto">
      <button
        onClick={handleShare}
        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
        title="Compartir"
      >
        {/* WhatsApp icon */}
      </button>
      <button
        onClick={handleFacebookShare}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        title="Compartir en Facebook"
      >
        {/* Facebook icon */}
      </button>
    </div>
  );
}
