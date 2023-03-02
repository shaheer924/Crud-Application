const {ObjectId, Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    age: {
        type: Number,
        required: [true, 'age is required']
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    confirm_password: {
        type: String,
        required: [true, 'confirm password is required'],
        validate: function(value){
            return value === this.password
        },
        select: false
    },
    role_id: {
        type: String,
        required: [true, 'role_id is required'],
        default: 'child'
    },
    is_disable: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (){
    this.password = await bcrypt.hash(this.password, 10)
    this.confirm_password = undefined
})

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = model('users', userSchema)

module.exports = User