import Image from "next/image";
import Link from "next/link";

import BlogImage from "@static/images/blog-2.png";

import Button from "./ui/button-custom";

interface Blog {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  slug?: string;
}

type Props = {
  blog?: Blog;
  placement?: "vertical" | "horizontal";
  isShowBtnDetail?: boolean;
};

const BlogCard = ({
  blog,
  placement = "vertical",
  isShowBtnDetail = false,
}: Props) => {
  // Generate slug from blog id and title
  const slug = blog?.slug || `${blog?.id}-${blog?.title?.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div
      className={
        // base styles + group for image hover
        "rounded-lg p-4 bg-white shadow-md transform transition-shadow duration-300 hover:shadow-lg group overflow-hidden " +
        (placement === "horizontal" ? "flex flex-row gap-4 items-start" : "")
      }
    >
      <Image
        src={BlogImage}
        alt="Blog Image"
        {...(placement === "horizontal"
          ? { width: 200, height: 160 }
          : { width: 600, height: 150 })}
        className={
          // animate image on group hover
          "rounded-lg object-cover transition-transform duration-300 ease-out " +
          (placement === "horizontal"
            ? "w-50 h-40 shrink-0 group-hover:scale-105"
            : "w-full h-[150px] group-hover:scale-105")
        }
      />

      <div className={placement === "horizontal" ? "flex-1" : ""}>
        {!isShowBtnDetail && (
          <p className="text-primary uppercase text-sm font-bold mt-2">
            {blog?.category || "Technology"}
          </p>
        )}
        <p className="font-medium leading-5.5 mt-1">
          {blog?.title || "The Future of AI in Creative Workflows"}
        </p>
        <p className="text-gray-400 text-sm leading-5 mt-2">
          {blog?.excerpt || "Discover how artificial intelligence is revolutionizing the way we create, design, and innovate."}
        </p>
        <p className="text-gray-400 text-sm mt-4">{blog?.author || "John Doe"} · {blog?.date || "Oct 26, 2023"}</p>
        {isShowBtnDetail && (
          <div className="mt-4 flex justify-end">
            <Link href={`/blogs/${slug}`}>
              <Button
                variant="default"
                colorScheme="primary"
                size="sm"
                className="text-sm"
              >
                Read More
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
