import { trackPageView } from "@/analytics";

class NavigationService {
    private router: any = null;

    setRouter(router: any) {
        this.router = router;

        this.router.subscribe(({ location }: { location: Location }) => {
            trackPageView(location.pathname);
        });
    }

    navigate(path: string, options?: { state?: any }) {
        if (this.router) {
            this.router.navigate(path, options);
            trackPageView(path);
        }
    }
}

export const navigationService = new NavigationService();
