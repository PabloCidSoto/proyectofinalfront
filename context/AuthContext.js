import { createContext } from "react";

const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
    setReloadUSer: () => null
})

export default AuthContext;