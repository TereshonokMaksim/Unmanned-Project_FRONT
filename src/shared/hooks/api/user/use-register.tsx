import { UsePost } from "../genericPostHook"; 
import { GenericCredentialsOutput, JWTResponse, AuthErrorResponse } from "./creds-out";


export interface RegisterCredentials {
    name: string,
    email: string,
    password: string,
}

export function UseReg(): GenericCredentialsOutput<RegisterCredentials>{
    const [postReq, {error, data: dat, isLoad}] = UsePost<JWTResponse>("users/reg", {token: ""})
    async function RegRequest(creds: RegisterCredentials): Promise<JWTResponse | AuthErrorResponse>{
        const data = await postReq(creds)
        if (!data){
            return {message: "Network error. Try again later."}
        }
        else if ("code" in data){
            let message="";
            if (data.code===400){
                // This shouldnt be possible if form verification works, so its only
                // for those, who go for links directly for no reason
                message="You didn't enter all required data!"
            }
            else if (data.code === 404){
                message = "Wrong email or password!"
            }
            else if (data.code === 422){
                message = "You entered invalid data!"
            }
            else {
                message = "Network error. Try again later."
            }
            return {message}
        }
        else {
            console.log("REALLY", data)
            return {token: data.token}
        }
    }
    return [RegRequest, {isLoading: isLoad, error}]
}