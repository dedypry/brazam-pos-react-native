import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCategory, setViewMode } from "@/store/slices/product/product-slice";
import { Grid, List } from "lucide-react-native";
import {
  TouchableOpacity,
  useColorScheme
} from "react-native";
import FilterCategory from "../filter-categories";
import { HStack } from "../ui/hstack";

export default function ChipCategories() {
  const colorScheme = useColorScheme();
  const { viewMode, selectedCategory, categories } = useAppSelector((state) => state.product);
 
  const dispatch = useAppDispatch();

  const isDark = colorScheme === "dark";

  return (
    <HStack className="gap-4">
      <FilterCategory
        data={categories}
        selected={selectedCategory}
        setSelected={(val) => dispatch(setSelectedCategory(val.id))}
      />
      <HStack className="gap-2">
        <TouchableOpacity
          onPress={() => dispatch(setViewMode("grid"))}
          style={{
            padding: 10,
            backgroundColor:
              viewMode === "grid" ? "#4ECDC4" : isDark ? "#1E1E1E" : "#FFFFFF",
            borderRadius: 12,
          }}
        >
          <Grid
            size={20}
            color={
              viewMode === "grid"
                ? "white"
                : isDark
                ? "rgba(255, 255, 255, 0.6)"
                : "#6B7280"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(setViewMode("list"))}
          style={{
            padding: 10,
            backgroundColor:
              viewMode === "list" ? "#4ECDC4" : isDark ? "#1E1E1E" : "#FFFFFF",
            borderRadius: 12,
          }}
        >
          <List
            size={20}
            color={
              viewMode === "list"
                ? "white"
                : isDark
                ? "rgba(255, 255, 255, 0.6)"
                : "#6B7280"
            }
          />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
