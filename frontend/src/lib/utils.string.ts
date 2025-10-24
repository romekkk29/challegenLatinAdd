import { ScreenType, ScreenAvailableHours } from "types/screen";
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

export const formatChipValue=(rule:ScreenAvailableHours)=>{
    if(rule.enable){
        let stringComplete= rule.day + ": "
        rule.interval?.forEach(element => {
            stringComplete=stringComplete+ " " + element.from + "/" + element.to
        });
        return stringComplete
    }else{
        return rule.day + ": " + " Apagada "
    }
}