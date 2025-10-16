import { AuthContext } from "@contexts/authContext";
import { useContext } from "react";

export const useAuth = () => {
    return useContext(AuthContext);
};