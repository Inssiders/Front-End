import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORY_LABELS } from "@/types/posts";

export interface CategorySelectProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySelect({ selectedCategory, onCategoryChange }: CategorySelectProps) {
  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger className="focus:ring-2 focus:ring-purple-500">
        <SelectValue placeholder="카테고리를 선택해주세요" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value} className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
