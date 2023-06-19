import CryptoJS from 'crypto-js';

export const decryptAES = (encryptedString, key) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedString, key);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}