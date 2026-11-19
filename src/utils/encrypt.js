import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

const getEncryptionKey = () => {
    const key = process.env.PASSVAULT_ENCRYPTION_KEY
    
    if(!key){
        throw new Error("Encryption Key Required")
    }

    return Buffer.from(key, "hex")
}

export const encryptPassword = async (password) => {
    const iv = randomBytes(12);

    const cipher = createCipheriv(
        "aes-256-gcm", getEncryptionKey(), iv
    )

    let encrypted = cipher.update(
        password, "utf8", "hex"
    )

    encrypted += cipher.final("hex")

    const authTag = cipher.getAuthTag().toString("hex")

    return `${iv.toString("hex")}:${authTag}:${encrypted}`
}