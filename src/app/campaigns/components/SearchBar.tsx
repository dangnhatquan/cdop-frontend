import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSubmit }: any) {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center px-4 py-3 bg-[#F2F4F5] rounded-2xl shadow-sm">
        <Search className="w-5 h-5 text-gray-500" />

        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="Tìm dự án bạn yêu thích"
          className="flex-1 ml-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
      </div>
    </div>
  );
}
