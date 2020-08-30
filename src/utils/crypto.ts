import crypto, { HexBase64BinaryEncoding, Utf8AsciiBinaryEncoding } from 'crypto';

import { AppEnvs } from "../config/config";

export default class CryptoUtils {

    public static encrypt(plainValue: string): string {
        const data = {
            algorithm : 'aes256',
            secret : AppEnvs.SECRET,
            type : 'hex',
            encoding: 'utf8'
        };

        const cipher = crypto.createCipher(data.algorithm, data.secret);
        cipher.update(plainValue);
        return cipher.final(data.type as BufferEncoding);
    }

    public static decrypt(key: string): string {
        const data = {
            algorithm : 'aes256',
            secret : AppEnvs.SECRET,
            type : 'hex',
            encoding: 'utf8'
        };

        try{
            const decipher = crypto.createDecipher(data.algorithm, data.secret);
            decipher.update(key, data.type as HexBase64BinaryEncoding, data.encoding as Utf8AsciiBinaryEncoding);
            return decipher.final(data.encoding as BufferEncoding);
        }catch (err){
            console.log(err);
            throw err;
        }
    }
}
