import { ScreenType } from "types/screen";
import { User } from "types/user";

export const formatScreenType = (type: ScreenType)=> {
    const formatedType = type === "indoor" ? "Indoor" : "Outdoor"
    return formatedType
}

export const getFirstname = (name: User['name'])=>{
    const split = name.split(" ")
    const firstname = split[0]

    return firstname
}