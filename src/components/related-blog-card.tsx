import Image from "next/image";

import BlogImage from "@static/images/blog-3.png";

const RelatedBlogCard = () => {
  return (
    <div className="flex">
      <Image
        src={BlogImage}
        alt="blog-image"
        width={80}
        height={80}
        className="rounded-lg"
      />
      <div>
        <p className="font-medium ml-4">
          The Future of AI in Creative Workflows
        </p>
        <p className="text-gray-400 text-sm ml-4 mt-2">
          John Doe · Oct 26, 2023
        </p>
      </div>
    </div>
  );
};

export default RelatedBlogCard;
