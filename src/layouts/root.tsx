import {Outlet} from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function Root() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}
