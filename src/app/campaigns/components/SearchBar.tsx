import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-[1280px]">
      <div className="flex items-center px-4 py-3 bg-[#F2F4F5] rounded-2xl">
        <Search className="w-5 h-5 text-gray-500" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tìm kiếm"
          className="flex-1 ml-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
      </div>
    </div>
  );
}
