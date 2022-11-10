import {AccountDoc} from '../../models/account';
import {Session} from '../../handlers/auth/encodeSession';
import {UploadedFile} from 'express-fileupload';

declare global {
    namespace Express {
        interface Request {
            account?: AccountDoc;
            session?: Session;
            files?: {
                [key: string]: UploadedFile;
            };
            redisEmailIP?: string;
        }
    }
}