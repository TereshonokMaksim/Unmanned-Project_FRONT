import styles from "./orders-layout.module.css"
import { Header } from "../../components"
import { Main } from "../../components"
import { OrdersFooter } from "../../components"
import { Outlet } from "react-router-dom"


export function OrdersLayout(){
    return (
        <div className = {styles.ordLayout}>
            <Header/>
            <Main>
                <Outlet/>
            </Main>
            <OrdersFooter/>
        </div>
    )
}