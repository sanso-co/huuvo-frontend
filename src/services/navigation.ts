class NavigationService {
    private router: any = null;

    setRouter(router: any) {
        this.router = router;
    }

    navigate(path: string, options?: { state?: any }) {
        if (this.router) {
            this.router.navigate(path, options);
        }
    }
}

export const navigationService = new NavigationService();
