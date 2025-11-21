import {
  ComputerIcon,
  HeartPulse,
  PlaneTakeoff,
  ScrollText,
} from "lucide-react";

import BlogCard from "@components/blog-card";
import CategoryList from "@components/category-list";
import PaginationCustom from "@components/pagination-custom";

// Mock blog data - replace with real data fetching
const MOCK_BLOGS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  category:
    i % 3 === 0 ? "technology" : i % 3 === 1 ? "personal-growth" : "travel",
  excerpt:
    "Discover how artificial intelligence is revolutionizing the way we create, design, and innovate.",
  author: "John Doe",
  date: "Oct 26, 2023",
}));

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "All Blogs",
    slug: "all",
    icon: <ScrollText className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Technology",
    slug: "technology",
    icon: <ComputerIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "Personal Growth",
    slug: "personal-growth",
    icon: <HeartPulse className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "Travel",
    slug: "travel",
    icon: <PlaneTakeoff className="w-5 h-5" />,
  },
];

// SEO-friendly: Use searchParams for server-side rendering
interface BlogsPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
  // Parse page and category from URL (e.g., /blogs?page=2&category=technology)
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const currentCategory = params.category || "all";
  const itemsPerPage = 6;

  // Filter blogs by category
  const filteredBlogs =
    currentCategory === "all"
      ? MOCK_BLOGS
      : MOCK_BLOGS.filter((blog) => blog.category === currentCategory);

  // Server-side pagination calculation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // In production, fetch data here:
  // const blogs = await fetchBlogs({ page: currentPage, limit: itemsPerPage, category: currentCategory });

  const TitlePage =
    currentCategory === "all"
      ? "All Blogs"
      : `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`;

  return (
    <div className="grid grid-cols-3 gap-15 pt-10">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold mb-3">{TitlePage}</h1>
        <p className="text-sm text-gray-400">
          Explore thoughts on technology, personal growth, and more.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {paginatedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} isShowBtnDetail placement="horizontal" />
          ))}
        </div>
        <div className="mt-5">
          <PaginationCustom
            data={filteredBlogs}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            useUrlParams
          />
        </div>
      </div>
      <div className="relative col-span-1">
        <CategoryList
          categories={MOCK_CATEGORIES}
          currentCategory={currentCategory}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
