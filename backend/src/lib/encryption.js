import fs from "fs";
import crypto from "crypto";

//TODO: Add public and privateKey Encryption & Decryption for security
function decrypt(encryptedData) {
    try {
        const decrypted = Buffer.from(encryptedData, "base64").toString("utf-8");
        return JSON.parse(decrypted);
    } catch (error) {
        console.error(error);
        return null;
    }
}


export { decrypt }