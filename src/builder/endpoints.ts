export const ENDPOINTS = Object.freeze({
  users: {
    get_all: () => "/users",
    single: (id: string) => `/user/${id}` as const,
  },
});
