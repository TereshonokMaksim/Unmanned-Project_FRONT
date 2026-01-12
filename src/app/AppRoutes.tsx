import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { OrdersLayout } from "./orders-layout";
import { AboutPage } from "../pages/about";
import { MainPage } from "../pages/main";
import { NotFoundPage } from "../pages/not-found";


export function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Layout/>}>
                    <Route path = "/" element={<MainPage/>}></Route>
                    <Route path = "/about/" element={<AboutPage/>}></Route>
                </Route>
                <Route path = "/" element = {<OrdersLayout/>}>
                    <Route path = "/*" element={<NotFoundPage/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}