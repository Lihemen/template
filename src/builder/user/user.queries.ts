import { usePagination } from "~/hooks";

import { useQuery } from "@tanstack/react-query";

import { user_builder } from "./user.requests";

export const useGetUsers = () => {
  const [{ page, page_size, search }] = usePagination();
  return useQuery({
    queryKey: user_builder.users.get_all.get({ page, page_size, search }),
    queryFn: () =>
      user_builder.use().users.get_all({ page, page_size, search }),
  });
};
