
export function generateSecureRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    
    const randomValues = window.crypto.getRandomValues(new Uint32Array(20));
    
    for (let i = 0; i < 20; i++) {
        randomCode += characters[randomValues[i] % characters.length];
    }

    return randomCode;
}