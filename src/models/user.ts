import { model, Schema, Document } from 'mongoose'
import { genSalt, hash, compare } from 'bcrypt'

const SALT_WORK_FACTOR = 10

interface IUser extends Document {
  email: string
  name: string
  password: string
  comparePasswords(password: string): boolean
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String, // virtual?
    required: true,
  },
  email: String, // unique please
  password: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', async (next) => {
  const user = this as IUser
  if (!user.isModified('password')) return next()
  try {
    const salt = await genSalt(SALT_WORK_FACTOR)
    user.password = await hash(user.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods.comparePasswords = async (password: string) => {
  return compare(password, (this as IUser).password)
}

const User = model<IUser>('User', UserSchema)
export default User
