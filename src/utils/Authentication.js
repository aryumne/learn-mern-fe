import { useState, useEffect, useCallback } from "react";

let logoutTimer;
const Authentication = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExp, setTokenExp] = useState(null);

    const login = useCallback((uid, token, expiredToken) => {
        setToken(token);
        setUserId(uid);
        const expired = expiredToken || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExp(expired);
        localStorage.setItem('authData', JSON.stringify({
            userId: uid,
            token: token,
            expired: expired.toISOString()
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExp(null);
        localStorage.removeItem('authData');
    }, []);

    useEffect(() => {
        if (token && tokenExp) {
            const remainingTime = tokenExp.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExp]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('authData'));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expired) > new Date()
        ) {
            login(storedData.userId, storedData.token, new Date(storedData.expired));
        }
    }, [login]);

    const AuthenticationValue = {
        userId,
        token,
        login,
        logout
    }

    return AuthenticationValue;

}

export default Authentication

