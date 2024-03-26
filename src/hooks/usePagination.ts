import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export function usePagination(rows: number = 10) {
  return useQueryParams({
    page: withDefault(NumberParam, 1),
    page_size: withDefault(NumberParam, rows),
    search: withDefault(StringParam, ""),
  });
}
