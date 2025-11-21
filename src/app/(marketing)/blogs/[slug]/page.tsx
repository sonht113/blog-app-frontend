import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import CommentForm from "@components/comment-form";
import CommentList from "@components/comment-list";
import RelatedBlogCard from "@components/related-blog-card";
import Button from "@components/ui/button-custom";
import UserInfoCard from "@components/user-info-card";
import Banner from "@static/images/banner_home.png";
import BlogImage from "@static/images/blog-2.png";

// Mock blog data - replace with real data fetching
const MOCK_BLOGS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  category:
    i % 3 === 0 ? "technology" : i % 3 === 1 ? "personal-growth" : "travel",
  excerpt:
    "Discover how artificial intelligence is revolutionizing the way we create, design, and innovate.",
  content: `
    <p>This is the full content of the blog post. In a production environment, this would come from a database or CMS.</p>
    
    <h2>Why This Topic Matters</h2>
    <p>The topic of this blog post is important because it affects our daily lives in numerous ways. Understanding the key concepts can help you make better decisions.</p>
    
    <h2>Key Takeaways</h2>
    <ul>
      <li>First important point about the topic</li>
      <li>Second important insight for readers</li>
      <li>Third valuable lesson to remember</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>In conclusion, this blog post has covered the essential aspects of the topic. We hope you found it informative and engaging.</p>
  `,
  author: "John Doe",
  date: "Oct 26, 2023",
  readTime: "5 min read",
  image: BlogImage,
}));

const MOCK_COMMENTS = [
  {
    id: 1,
    author: "Sarah Johnson",
    content:
      "This is a great post! Really helped me understand the topic better. Looking forward to more content like this.",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    author: "Mike Chen",
    content:
      "I have a question about the third point. Can you elaborate more on that? Would be very helpful.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    author: "Emma Davis",
    content:
      "Excellent explanation! The examples you provided made it very clear. Thanks for sharing!",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 4,
    author: "Alex Rodriguez",
    content:
      "I completely agree with your points. This is definitely something everyone should know about.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: 5,
    author: "Jessica Lee",
    content:
      "Great article! Your writing style makes complex topics easy to understand. Keep up the good work!",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: 6,
    author: "David Park",
    content:
      "This really changed my perspective on this topic. Would love to see more posts like this.",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
  {
    id: 7,
    author: "Lisa Anderson",
    content:
      "Loved reading this! The examples were particularly helpful. Sharing with my team.",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
  },
];

// Generate static params for ISR/SSG
export async function generateStaticParams() {
  return MOCK_BLOGS.map((blog) => ({
    slug: `${blog.id}-${blog.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));
}

// Dynamic metadata generation for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogId = parseInt(slug.split("-")[0]);
  const blog = MOCK_BLOGS.find((b) => b.id === blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogId = parseInt(slug.split("-")[0]);
  const blog = MOCK_BLOGS.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-400 mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <Link href="/blogs">
          <Button variant="default" colorScheme="primary">
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="grid grid-cols-3 gap-6 py-10">
      <div className="col-span-3">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>
        <Image
          src={Banner}
          alt="banner-blog"
          className="w-full max-h-[300px] rounded-xl"
        />
      </div>

      <div className="col-span-2 mt-5">
        {/* Blog Content */}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-400 mb-5 text-sm">
          By <span className="text-primary">{blog.author}</span> · {blog.date} · {blog.readTime}
        </p>
        {/* Excerpt */}
        <p className="text-lg text-gray-700 mb-2 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Excerpt ends here */}
        <div className="prose prose-lg mb-8">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Comments ({MOCK_COMMENTS.length})</h2>
            <CommentForm isSignedIn={false} />
          </div>
          <CommentList comments={MOCK_COMMENTS} />
        </div>
      </div>
      <div className="col-span-1 relative">
        {/* Sidebar - could include related posts, categories, etc. */}
        <div className="sticky top-20">
          <UserInfoCard />
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Related Posts</h2>
            <div className="flex flex-col gap-4">
              <RelatedBlogCard />
              <RelatedBlogCard />
              <RelatedBlogCard />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
