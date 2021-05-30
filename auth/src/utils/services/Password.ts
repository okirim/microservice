import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const crypt = promisify(scrypt);

export class Password {

    public static async hash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await crypt(password, salt, 64)) as Buffer;
        return `${buffer.toString('hex')}.${salt}`;
    }

    public static async compare(password: string, inputPassword: string): Promise<boolean> {

        const [hashedPassword, salt] = password.split('.');
        const inputPasswordHashed = await Password.hashToCompare(inputPassword, salt);
        return inputPasswordHashed === hashedPassword;
    }

    protected static async hashToCompare(password: string, salt: string): Promise<string> {
        const buffer = (await crypt(password, salt, 64)) as Buffer;
        return buffer.toString('hex');
    }
}