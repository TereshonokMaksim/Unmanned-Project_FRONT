import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { OrdersLayout } from "./orders-layout";
import { MainPage, NotFoundPage, CatalogPage, AboutPage, ProductPage, ContactsPage } from "../pages";
import { CabinetPage } from "../pages/cabinet";


export function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Layout/>}>
                    <Route path = "/" element={<MainPage/>}></Route>
                    <Route path = "/about/" element={<AboutPage/>}></Route>
                    <Route path = "/catalog/" element={<CatalogPage/>}></Route>
                    <Route path = "/product/:id" element={<ProductPage/>}></Route>
                    <Route path = "/contacts" element={<ContactsPage/>}></Route>
                    <Route path = "/cabinet" element={<CabinetPage/>}></Route>
                </Route>
                <Route path = "/" element = {<OrdersLayout/>}>
                    <Route path = "/*" element={<NotFoundPage/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}