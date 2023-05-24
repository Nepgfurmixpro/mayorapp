import { PostInfo } from "./schemas";

const BASE_URL = "http://10.0.67.96:8080"
const GOOGLE_MAPS_API= "******"

const GetPosts = async (): Promise<PostInfo[]> => {
    let res = await (await fetch(`${BASE_URL}/api/posts`)).json()
    if (res == null) {
        res = [];
    }
    return res;
}

const GetPostById = async (id: string): Promise<PostInfo> => {
    let res = await (await fetch(`${BASE_URL}/api/posts/${id}`)).json()
    return res;
}

const ValidateAuthToken = async (token: string): Promise<{
    message: string,
    ok: boolean
}> => {
    let res = await fetch(`${BASE_URL}/api/auth/validate`, {
        method: "POST",
        body: JSON.stringify({
            auth: token
        })
    })
    return {
        message: (await res.json()).message,
        ok: res.status == 200
    }
}

type Predict = {
    description: string,
    structured_formatting: {
        main_text: string,
        secondary_text: string
    }
}

const PredicteWithMaps = async (input: string) => {
    let res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&radius=50000&key=${GOOGLE_MAPS_API}`)
    console.log(res)
}

export {
    GetPosts,
    GetPostById,
    ValidateAuthToken,
    PredicteWithMaps
}

export type {
    Predict
}