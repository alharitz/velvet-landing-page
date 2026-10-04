// Typed registry of all images on the page
export const imageRegistry = {
  hero: {
    src: "/images/hero.jpg",
    alt: "VELVET minimalist fashion hero",
    aspectRatio: "16/9",
    label: "VELVET / Hero",
  },
  storyMain: {
    src: "/images/story-main.jpg",
    alt: "VELVET craftsmanship detail",
    aspectRatio: "3/4",
    label: "VELVET / Story",
  },
  storyDetail: {
    src: "/images/story-detail.jpg",
    alt: "VELVET fabric weave close-up",
    aspectRatio: "1/1",
    label: "VELVET / Detail",
  },
  collection: {
    "01": { src: "/images/collection-01.jpg", alt: "Essential crew neck", aspectRatio: "3/4", label: "Collection 01" },
    "02": { src: "/images/collection-02.jpg", alt: "Relaxed linen shirt", aspectRatio: "3/4", label: "Collection 02" },
    "03": { src: "/images/collection-03.jpg", alt: "Tailored wool trousers", aspectRatio: "3/4", label: "Collection 03" },
    "04": { src: "/images/collection-04.jpg", alt: "Minimal wool coat", aspectRatio: "3/4", label: "Collection 04" },
    "05": { src: "/images/collection-05.jpg", alt: "Cashmere blend sweater", aspectRatio: "3/4", label: "Collection 05" },
    "06": { src: "/images/collection-06.jpg", alt: "Structured blazer", aspectRatio: "3/4", label: "Collection 06" },
    "07": { src: "/images/collection-07.jpg", alt: "Organic cotton basics", aspectRatio: "3/4", label: "Collection 07" },
    "08": { src: "/images/collection-08.jpg", alt: "Seasonal piece", aspectRatio: "3/4", label: "Collection 08" },
  },
  category: {
    outerwear: { src: "/images/category-outerwear.jpg", alt: "Outerwear collection", aspectRatio: "4/3", label: "Outerwear" },
    knitwear: { src: "/images/category-knitwear.jpg", alt: "Knitwear collection", aspectRatio: "4/3", label: "Knitwear" },
    trousers: { src: "/images/category-trousers.jpg", alt: "Trousers collection", aspectRatio: "4/3", label: "Trousers" },
    accessories: { src: "/images/category-accessories.jpg", alt: "Accessories collection", aspectRatio: "4/3", label: "Accessories" },
  },
  lookbook: {
    "01": { src: "/images/lookbook-01.jpg", alt: "Editorial look 01", aspectRatio: "3/4", label: "Look 01" },
    "02": { src: "/images/lookbook-02.jpg", alt: "Editorial look 02", aspectRatio: "4/5", label: "Look 02" },
    "03": { src: "/images/lookbook-03.jpg", alt: "Editorial look 03", aspectRatio: "3/4", label: "Look 03" },
    "04": { src: "/images/lookbook-04.jpg", alt: "Editorial look 04", aspectRatio: "4/5", label: "Look 04" },
    "05": { src: "/images/lookbook-05.jpg", alt: "Editorial look 05", aspectRatio: "3/4", label: "Look 05" },
    "06": { src: "/images/lookbook-06.jpg", alt: "Editorial look 06", aspectRatio: "4/5", label: "Look 06" },
  },
  journal: {
    "01": { src: "/images/journal-01.jpg", alt: "Journal article 01", aspectRatio: "16/9", label: "Journal 01" },
    "02": { src: "/images/journal-02.jpg", alt: "Journal article 02", aspectRatio: "16/9", label: "Journal 02" },
    "03": { src: "/images/journal-03.jpg", alt: "Journal article 03", aspectRatio: "16/9", label: "Journal 03" },
  },
} as const;
