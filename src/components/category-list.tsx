"use client";

import { useQueryParams } from "@/hooks/useQueryParams";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: React.ReactNode;
}

interface CategoryListProps {
  categories: Category[];
  currentCategory?: string;
}

const CategoryList = ({ categories, currentCategory }: CategoryListProps) => {
  const { updateParams } = useQueryParams();

  const handleCategoryClick = (slug: string) => {
    if (slug === "all") {
      // Remove category filter and reset to page 1
      updateParams(undefined, ["category", "page"]);
    } else {
      // Set category and reset to page 1
      updateParams({ category: slug }, ["page"]);
    }
  };

  return (
    <div className="sticky top-20 bg-white p-6 rounded-lg shadow-md">
      <p className="text-lg font-semibold mb-4">Categories</p>
      <div className="flex flex-col gap-3">
        {categories.map((category) => {
          const isActive = currentCategory === category.slug || (!currentCategory && category.slug === "all");
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-left transition-colors ${
                isActive
                  ? "bg-primary text-white font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {category.icon && (
                <span className={isActive ? "text-white" : "text-gray-500"}>
                  {category.icon}
                </span>
              )}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
