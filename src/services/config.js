const apiUrl = 'http://localhost:8282/'
export const urlFull = (endpoint) => apiUrl + endpoint
export const configService = {
    apiUrl,
}
export const headers = new Headers({
    'Content-Type': 'application/json',
})

export const optionsDefault = {
    withCredentials: true,
    credentials: 'include',
    headers: new Headers({ 'Content-Type': 'application/json', }),
}