import { _axios } from "~/lib/_axios";

import { createBuilder } from "@ibnlanre/portal";

import { ENDPOINTS } from "../endpoints";

export const user_builder = createBuilder({
  users: {
    get_all: (params?: Record<string, unknown>) =>
      _axios.get(ENDPOINTS.users.get_all(), { params }),
    update_user: ({ id, ...payload }: Record<string, string>) =>
      _axios.put(id, payload),
  },
});
