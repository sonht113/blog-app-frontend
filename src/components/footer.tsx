import { Github, Linkedin, Twitter } from "lucide-react";

import Link from "next/link";

import { ROUTE } from "@/constants/route";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 mt-10 pb-15">
      <div className="grid grid-cols-4 gap-8 pt-8 border-b border-gray-300 pb-10">
        <div className="pl-4">
          <p className="text-xl text-primary mb-5">MyBlog</p>
          <p className="text-gray-400 text-sm leading-5">
            A personal blog about technology, creativity, and modern life.
          </p>
        </div>
        <div className="pl-4">
          <p className="text-md font-medium mb-5">Quick Links</p>
          <ul className="text-gray-400 text-sm">
            <li className="hover:text-primary">
              <Link href={ROUTE.HOME}>Home</Link>
            </li>
            <li className="hover:text-primary my-5">
              <Link href={ROUTE.ABOUT}>About</Link>
            </li>
            <li className="hover:text-primary">
              <Link href={ROUTE.CONTACT}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="pl-4">
          <p className="text-md font-medium mb-5">Categories</p>
          <ul className="text-gray-400 text-sm">
            <li className="hover:text-primary">
              <Link href={ROUTE.HOME}>Technology</Link>
            </li>
            <li className="hover:text-primary my-5">
              <Link href={ROUTE.ABOUT}>Web Design</Link>
            </li>
            <li className="hover:text-primary">
              <Link href={ROUTE.CONTACT}>Productivity</Link>
            </li>
          </ul>
        </div>
        <div className="pl-4">
          <p className="text-md font-medium mb-5">Follow Me</p>
          <div className="flex items-center gap-4">
            <Twitter className="text-primary cursor-pointer" />
            <Linkedin className="text-primary cursor-pointer" />
            <Github className="text-primary cursor-pointer" />
          </div>
        </div>
      </div>
      <p className="text-center text-gray-400 text-sm mt-6">
        © 2025 MyBlog. All rights reserved. Copyright by NuiCoder.
      </p>
    </footer>
  );
};

export default Footer;
