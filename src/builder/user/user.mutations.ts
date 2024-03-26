import { useMutation } from "@tanstack/react-query";

import { user_builder } from "./user.requests";

export function useUpdateUser() {
  return useMutation({
    mutationFn: user_builder.use().users.update_user,
  });
}
