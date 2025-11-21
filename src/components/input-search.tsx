import { Search as SearchIcon } from "lucide-react";

import { Input } from "./ui/input";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const InputSearch = ({ ...props }: Props) => {
  return (
    <div className="relative p-px rounded-2xl bg-linear-to-r from-orange-500 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 dark:shadow-purple-600/30 transition-shadow duration-300 hover:shadow-purple-500/40 dark:hover:shadow-purple-600/50 focus-within:shadow-purple-500/40 dark:focus-within:shadow-purple-600/50">
      <div className="flex items-center w-full px-4 py-1 bg-white/80 dark:bg-gray-900/90 rounded-[15px]">
        <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
        <Input
          {...props}
          placeholder="Search"
          className="w-full py-1 text-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent shadow-none border-0"
        />
      </div>
    </div>
  );
};
export default InputSearch;
