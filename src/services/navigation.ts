import { trackPageView } from "@/analytics";
import type { Router as RemixRouter } from "@remix-run/router";

class NavigationService {
    private router: RemixRouter | null = null;

    setRouter(router: RemixRouter) {
        this.router = router;

        this.router.subscribe((state) => {
            trackPageView(state.location.pathname);
        });
    }

    navigate(path: string, options?: { state?: unknown }) {
        if (this.router) {
            this.router.navigate(path, options);
            trackPageView(path);
        }
    }
}

export const navigationService = new NavigationService();
