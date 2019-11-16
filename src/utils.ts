import { Md5 } from 'ts-md5'
export function createHash(timestamp: string, privateKey: string, publicKey: string): string {
    const md5 = new Md5();
    return md5.appendStr(timestamp).appendStr(privateKey).appendStr(publicKey).end().toString();
}
export function createTimestamp(): string {
    return Date.now().toString();
}
