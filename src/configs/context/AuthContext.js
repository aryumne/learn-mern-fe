import { createContext } from "react";

export const AuthCtx = createContext(null);
export const AuthCtxProvider = ({ children, valueCtx }) => {
    return (
        <AuthCtx.Provider value={valueCtx}>
            {children}
        </AuthCtx.Provider>
    )
}


