import { AppRoutes } from "./AppRoutes"
import { UserContextProvider } from "../context"


export function App() {
    return (
        <UserContextProvider>
            <AppRoutes/>
        </UserContextProvider>
    )
}

