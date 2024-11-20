import { create } from "zustand";

type FilterOperator = "in" | "ge" | "le" | "eq";
type FilterValues = string[] | number[] | boolean[];

interface Filter {
  operator: FilterOperator;
  values: FilterValues;
  options: FilterValues;
}

interface FiltersState {
  filters: Record<string, Filter>;
}

const useFiltersStore = create<FiltersState>(() => ({
  filters: {
    status: {
      operator: "in",
      values: ["Online", "Offline"], // ? 這是預設值吧？
      options: ["Online", "Offline", "Rebuild", "Failed", "Missing"],
    },
    parent_id: {
      operator: "in",
      values: ["P-0", "P-1"], // ? 這是預設值吧？
      options: ["P-0", "P-1", "P-2"],
    },
    size: {
      operator: "ge",
      values: [3221225472], // ? 預設值？ 單位變換？
      options: [3221225472],
    },
    activated: {
      operator: "in",
      values: [true], // ? 這是預設值吧？
      options: ['On', 'Off'],
    },
  },
}));

export default useFiltersStore;
