export const setIsLoggedIn = (user) => {
    return {type: "user/login", payload: user}
}

export const setIsLoggedOut = () => {
    return {type: "user/logout"}
}