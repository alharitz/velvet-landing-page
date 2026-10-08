"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronDown, Filter, LayoutGrid } from "lucide-react";
import { getAllProducts, formatIDR, getCategoriesWithCounts, getUniqueMaterials, getUniqueStatuses } from "@/lib/products";
import { Product } from "@/lib/products";

type PriceRange = "under-1m" | "1m-2m" | "over-2m";
type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

interface FilterState {
  category: string[];
  material: string[];
  price: PriceRange | "";
  status: string[];
  sort: SortOption;
}

const DEFAULT_FILTERS: FilterState = {
  category: [],
  material: [],
  price: "",
  status: [],
  sort: "featured",
};

const PRICE_RANGES: { value: PriceRange; label: string; min: number; max: number | null }[] = [
  { value: "under-1m", label: "Under Rp 1.000.000", min: 0, max: 1000000 },
  { value: "1m-2m", label: "Rp 1.000.000 - Rp 2.000.000", min: 1000000, max: 2000000 },
  { value: "over-2m", label: "Over Rp 2.000.000", min: 2000000, max: null },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

function parseFilters(searchParams: URLSearchParams): FilterState {
  const category = searchParams.get("category")?.split(",").filter(Boolean) || [];
  const material = searchParams.get("material")?.split(",").filter(Boolean) || [];
  const price = (searchParams.get("price") as PriceRange) || "";
  const status = searchParams.get("status")?.split(",").filter(Boolean) || [];
  const sort = (searchParams.get("sort") as SortOption) || "featured";

  return {
    category: category.map((c) => c.toLowerCase()),
    material: material.map((m) => m.toLowerCase()),
    price: price.toLowerCase() as PriceRange,
    status: status.map((s) => s.toLowerCase()),
    sort: sort.toLowerCase() as SortOption,
  };
}

function buildSearchParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.category.length > 0) {
    params.set("category", filters.category.join(","));
  }
  if (filters.material.length > 0) {
    params.set("material", filters.material.join(","));
  }
  if (filters.price) {
    params.set("price", filters.price);
  }
  if (filters.status.length > 0) {
    params.set("status", filters.status.join(","));
  }
  if (filters.sort !== "featured") {
    params.set("sort", filters.sort);
  }

  return params;
}

function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.category.length > 0) {
      const catMatch = filters.category.some((c) => product.category.toLowerCase() === c);
      if (!catMatch) return false;
    }
    if (filters.material.length > 0) {
      const matMatch = filters.material.some((m) => product.material.toLowerCase() === m);
      if (!matMatch) return false;
    }
    if (filters.price) {
      const range = PRICE_RANGES.find((r) => r.value === filters.price);
      if (range) {
        if (product.price < range.min) return false;
        if (range.max !== null && product.price > range.max) return false;
      }
    }
    if (filters.status.length > 0) {
      const statusMatch = filters.status.some((s) => product.status.toLowerCase() === s);
      if (!statusMatch) return false;
    }
    return true;
  });
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
    default:
      return sorted;
  }
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col group"
    >
      <a
        href={productUrl(product.slug)}
        className="relative mb-6 overflow-hidden bg-gray-100 block aspect-[4_5]"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.images[0] || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.status !== "available" && (
          <span
            className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-sm"
            style={{
              backgroundColor: product.status === "sold-out" ? "var(--ink)" : "var(--muted)",
              color: "var(--background)",
            }}
          >
            {product.status === "sold-out" ? "Sold Out" : "Pre-order"}
          </span>
        )}
      </a>

      <h4 className="text-lg font-600 mb-2">{product.name}</h4>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-4">
        {product.material}
      </p>
      <p className="font-semibold">{formatIDR(product.price)}</p>
    </motion.article>
  );
}

function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  products,
  activeFilterCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  products: Product[];
  activeFilterCount: number;
}) {
  const focusedElementRef = useRef<HTMLElement | null>(null);
  const categories = getCategoriesWithCounts();
  const materials = getUniqueMaterials(products);
  const statuses = getUniqueStatuses(products);
  const showStatusFilter = statuses.length > 1;

  useEffect(() => {
    if (isOpen) {
      focusedElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
        setTimeout(() => focusedElementRef.current?.focus(), 0);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 id="filter-drawer-title" className="text-xl font-600">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Close filters"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            <FilterSection
              title="Category"
              options={categories.map((c) => ({
                value: c.name.toLowerCase(),
                label: c.name,
                count: c.count,
              }))}
              selected={filters.category}
              onChange={(values) => onFilterChange({ ...filters, category: values })}
            />

            <FilterSection
              title="Material"
              options={materials.map((m) => ({
                value: m.toLowerCase(),
                label: m,
                count: products.filter((p) => p.material.toLowerCase() === m.toLowerCase()).length,
              }))}
              selected={filters.material}
              onChange={(values) => onFilterChange({ ...filters, material: values })}
            />

            <FilterSection
              title="Price"
              options={PRICE_RANGES.map((r) => ({
                value: r.value,
                label: r.label,
                count: products.filter((p) => {
                  if (p.price < r.min) return false;
                  if (r.max !== null && p.price > r.max) return false;
                  return true;
                }).length,
              }))}
              selected={filters.price ? [filters.price] : []}
              singleSelect
              onChange={(values) =>
                onFilterChange({ ...filters, price: values[0] as PriceRange || "" })
              }
            />

            {showStatusFilter && (
              <FilterSection
                title="Status"
                options={statuses.map((s) => ({
                  value: s.toLowerCase(),
                  label: s.charAt(0).toUpperCase() + s.slice(1),
                  count: products.filter((p) => p.status.toLowerCase() === s.toLowerCase()).length,
                }))}
                selected={filters.status}
                onChange={(values) => onFilterChange({ ...filters, status: values })}
              />
            )}
          </div>

          {activeFilterCount > 0 && (
            <div className="p-4 border-t">
              <button
                onClick={() => onFilterChange(DEFAULT_FILTERS)}
                className="w-full py-3 rounded-sm font-semibold text-sm transition-colors"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--ink)",
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

interface FilterSectionProps {
  title: string;
  options: { value: string; label: string; count: number }[];
  selected: string[];
  onChange: (values: string[]) => void;
  singleSelect?: boolean;
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
  singleSelect = false,
}: FilterSectionProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left font-semibold"
        aria-expanded={expanded}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden"
          >
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type={singleSelect ? "radio" : "checkbox"}
                  name={`filter-${title.toLowerCase()}`}
                  value={option.value}
                  checked={selected.includes(option.value)}
                  onChange={(e) => {
                    if (singleSelect) {
                      onChange(e.target.checked ? [option.value] : []);
                    } else {
                      onChange(
                        e.target.checked
                          ? [...selected, option.value]
                          : selected.filter((v) => v !== option.value)
                      );
                    }
                  }}
                  className="w-4 h-4 accent-[var(--ink)]"
                  id={`filter-${title.toLowerCase()}-${option.value}`}
                />
                <span className="flex-1">{option.label}</span>
                <span
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {option.count}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSidebar({
  filters,
  onFilterChange,
  products,
  activeFilterCount,
}: {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  products: Product[];
  activeFilterCount: number;
}) {
  const categories = getCategoriesWithCounts();
  const materials = getUniqueMaterials(products);
  const statuses = getUniqueStatuses(products);
  const showStatusFilter = statuses.length > 1;

  return (
    <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-8">
        <FilterSection
          title="Category"
          options={categories.map((c) => ({
            value: c.name.toLowerCase(),
            label: c.name,
            count: c.count,
          }))}
          selected={filters.category}
          onChange={(values) => onFilterChange({ ...filters, category: values })}
        />

        <FilterSection
          title="Material"
          options={materials.map((m) => ({
            value: m.toLowerCase(),
            label: m,
            count: products.filter((p) => p.material.toLowerCase() === m.toLowerCase()).length,
          }))}
          selected={filters.material}
          onChange={(values) => onFilterChange({ ...filters, material: values })}
        />

        <FilterSection
          title="Price"
          options={PRICE_RANGES.map((r) => ({
            value: r.value,
            label: r.label,
            count: products.filter((p) => {
              if (p.price < r.min) return false;
              if (r.max !== null && p.price > r.max) return false;
              return true;
            }).length,
          }))}
          selected={filters.price ? [filters.price] : []}
          singleSelect
          onChange={(values) =>
            onFilterChange({ ...filters, price: values[0] as PriceRange || "" })
          }
        />

        {showStatusFilter && (
          <FilterSection
            title="Status"
            options={statuses.map((s) => ({
              value: s.toLowerCase(),
              label: s.charAt(0).toUpperCase() + s.slice(1),
              count: products.filter((p) => p.status.toLowerCase() === s.toLowerCase()).length,
            }))}
            selected={filters.status}
            onChange={(values) => onFilterChange({ ...filters, status: values })}
          />
        )}

        {activeFilterCount > 0 && (
          <div className="pt-4 border-t">
            <button
              onClick={() => onFilterChange(DEFAULT_FILTERS)}
              className="w-full py-3 rounded-sm font-semibold text-sm transition-colors"
              style={{
                backgroundColor: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 md:py-24"
    >
      <LayoutGrid className="mx-auto mb-6 text-6xl" style={{ color: "var(--muted)" }} />
      <h3 className="text-2xl font-600 mb-3">No products found</h3>
      <p className="mb-6 max-w-sm mx-auto" style={{ color: "var(--muted)" }}>
        Try adjusting your filters or clear them all to see the full collection.
      </p>
      <button
        onClick={onClearFilters}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-semibold transition-all"
        style={{
          backgroundColor: "var(--ink)",
          color: "var(--background)",
        }}
      >
        Clear all filters
      </button>
    </motion.div>
  );
}

function ProductsHeader({
  filters,
  onSortChange,
  filteredCount,
  totalCount,
  activeFilterCount,
  onOpenDrawer,
}: {
  filters: FilterState;
  onSortChange: (sort: SortOption) => void;
  filteredCount: number;
  totalCount: number;
  activeFilterCount: number;
  onOpenDrawer: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Showing <span className="font-semibold">{filteredCount}</span> of{" "}
          <span className="font-semibold">{totalCount}</span> products
        </p>
        {filteredCount !== totalCount && (
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            (filtered from {totalCount} total)
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenDrawer}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-sm font-semibold text-sm transition-colors"
          style={{
            backgroundColor: "var(--ink)",
            color: "var(--background)",
          }}
        >
          <Filter size={18} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span
              className="w-5 h-5 flex items-center justify-center text-xs rounded-full font-semibold"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--ink)",
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex-1 sm:w-[200px]">
          <label htmlFor="sort-select" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2.5 rounded-sm font-medium text-sm appearance-none bg-white border"
            style={{
              borderColor: "var(--muted)",
              color: "var(--ink)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231a1a1a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "40px",
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

import Breadcrumbs from "@/components/Breadcrumbs";
import { productUrl, homeUrl } from "@/lib/routes";

export function ProductsClient({ pieceCount }: { pieceCount: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const allProducts = getAllProducts();
  const initialFilters = parseFilters(searchParams);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProducts = useMemo(
    () => sortProducts(filterProducts(allProducts, filters), filters.sort),
    [allProducts, filters]
  );

  const activeFilterCount = useMemo(
    () =>
      filters.category.length +
      filters.material.length +
      (filters.price ? 1 : 0) +
      filters.status.length,
    [filters]
  );

  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      const params = buildSearchParams(newFilters);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      updateFilters({ ...filters, sort });
    },
    [filters, updateFilters]
  );

  const handleOpenDrawer = useCallback(() => setDrawerOpen(true), []);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
      <Breadcrumbs items={[{ label: "Home", href: homeUrl }, { label: "Collection" }]} />
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <p className="text-base mb-2" style={{ color: "var(--muted)" }}>
          {pieceCount} pieces
        </p>
        <h1 className="text-4xl md:text-5xl font-600 mt-2">
          Collection
        </h1>
      </motion.div>

      <div className="flex gap-8 lg:gap-12">
        <FilterSidebar
          filters={filters}
          onFilterChange={updateFilters}
          products={allProducts}
          activeFilterCount={activeFilterCount}
        />

        <FilterDrawer
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
          filters={filters}
          onFilterChange={updateFilters}
          products={allProducts}
          activeFilterCount={activeFilterCount}
        />

        <div className="flex-1">
          <ProductsHeader
            filters={filters}
            onSortChange={handleSortChange}
            filteredCount={filteredProducts.length}
            totalCount={allProducts.length}
            activeFilterCount={activeFilterCount}
            onOpenDrawer={handleOpenDrawer}
          />

          
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={() => updateFilters(DEFAULT_FILTERS)} />
            ) : (
              <motion.div
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}