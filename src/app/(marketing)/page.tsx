
import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth";

import BlogCard from "@components/blog-card";
import Button from "@/components/ui/button-custom";
import { ROUTE } from "@constants/route";
import Banner from "@static/images/banner_home.png";


export default async function Home() {
  // Get session on server side
  const session = await getServerSession();
  const isAuthenticated = !!session?.user;

  return (
    <div className="pt-8">
      <div className="flex items-center gap-12 leading-8">
        <div className="flex-1 text-left">
          <h1 className="text-6xl font-extrabold">
            Exploring Ideas in Tech & Design
          </h1>
          <p className="text-md text-gray-400 leading-5.5 mt-3 mb-5">
            A personal blog about the intersection of technology, creativity,
            and modern life.
          </p>
          <div className="flex gap-3">
            <Button variant="default" colorScheme="primary">
              Explore Articles
            </Button>
            <Button variant="outline">Subscribe</Button>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <Image
              src={Banner}
              alt="Banner"
              height={300}
              className="w-full h-[300px] rounded-2xl"
            />
          </div>
        </div>
      </div>
      <section className="mt-20">
        <h1 className="text-lg font-bold text-black mb-10">Featured Posts</h1>
        <div className="grid grid-cols-4 gap-4">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </section>
      <section className="mt-20">
        <h1 className="text-lg font-bold text-black mb-10">
          Latest Articles
        </h1>
        <div className="grid grid-cols-2 gap-2">
          <BlogCard placement="horizontal" />
          <BlogCard placement="horizontal" />
          <BlogCard placement="horizontal" />
          <BlogCard placement="horizontal" />
        </div>
      </section>
    </div>
  );
}
