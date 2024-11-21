import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

import styles from "./layout.module.scss";
import { Footer } from "./components/Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
