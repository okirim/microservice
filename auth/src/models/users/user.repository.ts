import { model } from 'mongoose';
import { Password } from '../../utils/services/Password';
import { UserAttributes, userSchema, UserDocument, UserModel } from './user.model';

//get user by email
userSchema.statics.findUserByEmail = function (email: string) {
    return model('User').findOne({ email }).lean();
}
//save middleware
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.hash(this.get('password'))
        this.set('password', hashedPassword);
    }
    done()
})
//create new user
userSchema.statics.store = async function (props: UserAttributes) {

    return model('User').create(props);
}
//make user
userSchema.statics.parseToDocument = function (props: UserAttributes) {
    return new User(props)
}

// 3. Create a Model.
export const User = model<UserDocument, UserModel>('User', userSchema);


