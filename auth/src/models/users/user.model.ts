import { Schema, model, Model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface UserAttributes {
    email: string;
    password: string
}
export interface UserModel extends Model<UserDocument> {
    store(props: UserAttributes): UserDocument,
    findUserByEmail(email: string): UserDocument,
    parseToDocument(props: UserAttributes): UserDocument,
}

export interface UserDocument extends Document {
    email: string,
    password: string,
}
// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<UserAttributes>({
    email: { type: String, required: true },
    password: { type: String, required: true },
});



