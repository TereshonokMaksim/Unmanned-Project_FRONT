import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { AboutPage } from "../pages/about";
import { MainPage } from "../pages/main";
import { NotFoundPage } from "../pages/not-found";


export function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Layout/>}>
                    <Route path = "/about/" element={<AboutPage/>}></Route>
                    <Route path = "/main/" element={<MainPage/>}></Route>
                    <Route path = "/not-found/" element={<NotFoundPage/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}