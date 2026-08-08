// Central registry of every app page. Each entry's `id` is stamped onto the
// page's root element as `data-page-id`, so a page can be pointed at
// unambiguously (in conversation, in the rendered HTML, in tests) without
// relying on route paths or matching visible text.
//
// When adding a new page: add an entry here, then set
// data-page-id={PAGES.<key>.id} on that page's root element.
export const PAGES = {
  login: {
    id: "login",
    route: "/login",
    description: "Email/password + Google sign-in",
  },
  signup: {
    id: "signup",
    route: "/signup",
    description: "Email/password + Google account creation",
  },
  onboarding: {
    id: "onboarding",
    route: "/onboarding",
    description: "First-login profile setup: name, school, class",
  },
  dashboard: {
    id: "dashboard",
    route: "/dashboard",
    description: "Post-login placeholder home",
  },
  admin: {
    id: "admin",
    route: "/admin",
    description: "Founder-only: list users, change roles",
  },
  reader: {
    id: "reader",
    route: "/reader",
    description: "Chapter index and reader for subjects",
  },
  profile: {
    id: "profile",
    route: "/profile",
    description: "Profile info + role-code unlock form",
  },
} as const;

export type PageKey = keyof typeof PAGES;
