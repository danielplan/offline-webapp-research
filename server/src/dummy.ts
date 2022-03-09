export const randomString = (length: number) => {
    return Math.random().toString(16).substr(2, length);

}

export const randomNumber = () => {
    return Math.round(Math.random() * 10000) / 100;
}