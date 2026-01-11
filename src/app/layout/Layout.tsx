import styles from "./layout.module.css"
import { Header } from "../../components"
import { Main } from "../../components"
import { Footer } from "../../components"
import { Outlet } from "react-router-dom"
export function Layout(){
    return (
        <div>
            <Header></Header>
            <Main>
                <Outlet/>
            </Main>
            <Footer></Footer>
        </div>
    )
}