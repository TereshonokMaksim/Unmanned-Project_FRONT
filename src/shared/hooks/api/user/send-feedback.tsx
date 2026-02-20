import { UsePost } from "../genericPostHook";
import { AuthErrorResponse } from "./creds-out";

interface FeedbackBody {
    name: string
    phone: string
    email: string
    body: string
}

interface FeedbackRes {
    success: boolean, 
    message?: string
}

export type SendFeedbackOutput = [
    (body: FeedbackBody) => Promise<FeedbackRes>,
    {
        isLoading: boolean,
        error: string | null
    }
]

export function UseSendFeedback(): SendFeedbackOutput{
    const [sendFeedback, {isLoad, error, data}] = UsePost<null>("users/feedbacks", null)
        async function feedbackReq(data: FeedbackBody): Promise<FeedbackRes>{
            await sendFeedback(data)
            if (!data){
                return {success: false, message: "Network error. Try again later."}
            }
            else if ("code" in data){
                let message="";
                if (data.code===400){
                    // This shouldnt be possible if form verification works, so its only
                    // for those, who go for links directly for no reason
                    // Yes, i copied that from UseLogin
                    message="You entered invalid data!"
                }
                else {
                    message = "Network error. Try again later."
                }
                return {success: false, message}
            }
            else {
                return {success: true}
            }
        }
    return [feedbackReq, {isLoading: isLoad, error}]
}