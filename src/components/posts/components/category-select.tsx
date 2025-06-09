import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CategorySelectProps {
  onChange: (value: string) => void;
  value?: string;
  categories: { value: string, label: string }[];
}



const CategorySelect: React.FC<CategorySelectProps> = ({ onChange, value,categories }) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className="w-[180px] h-11 rounded-xl border border-main-200 bg-white shadow-md px-4 text-base font-medium text-main-700 focus:ring-2 focus:ring-main-400 focus:border-main-400 transition-all duration-150"
      >
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent className="rounded-xl shadow-lg border-main-100 bg-white">
        {categories.map((cat) => (
          <SelectItem
            key={cat.value}
            value={cat.value}
            className="rounded-lg px-4 py-2 pl-8 text-main-700 hover:bg-main-100 focus:bg-main-200 transition-colors cursor-pointer text-base"
          >
            {cat.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect; 