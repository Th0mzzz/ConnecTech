import {Outlet} from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingStar from "../components/FloatingStar";

export function Root() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            <FloatingStar/>
        </>
    );
}
