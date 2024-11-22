
export function generateSecureRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    
    const randomValues = window.crypto.getRandomValues(new Uint32Array(20));
    
    for (let i = 0; i < 20; i++) {
        randomCode += characters[randomValues[i] % characters.length];
    }

    return randomCode;
}


export function changeDateFormat(placedAt:string) {
    const date = new Date(placedAt)
    const day = date.getDate()
    const month = date.toLocaleString(undefined,{month:"long"})
    const year = date.getFullYear()

    return `${month} ${day},${year}`

}


export function calculateDicount(price:number,discount:number) {
    return price * (1-(discount/100))
}