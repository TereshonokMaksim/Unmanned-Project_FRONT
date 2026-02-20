import { UsePost } from "../genericPostHook"; 
import { GenericCredentialsOutput, JWTResponse, AuthErrorResponse } from "./creds-out";


export interface LoginCredentials {
    email: string,
    password: string,
} 

export function UseLogin(): GenericCredentialsOutput<LoginCredentials>{
    const [postReq, {error, data, isLoad}] = UsePost<JWTResponse>("users/login", {token: ""})
    async function LogRequest(creds: LoginCredentials): Promise<JWTResponse | AuthErrorResponse>{
        const nData = await postReq(creds)
        if (!nData){
            return {message: "Network error. Try again later."}
        }
        else if ("code" in nData){
            let message="";
            if (nData.code===400){
                // This shouldnt be possible if form verification works, so its only
                // for those, who go for links directly for no reason
                message="You didn't enter all required data!"
            }
            else if (nData.code === 404){
                message = "Wrong email or password!"
            }
            else if (nData.code === 422){
                message = "You entered invalid data!"
            }
            else {
                message = "Network error. Try again later."
            }
            return {message}
        }
        else {
            console.log("ASDJPIASJDPO:", nData)
            return {token: nData.token}
        }
    }
    return [LogRequest, {isLoading: isLoad, error}]
}