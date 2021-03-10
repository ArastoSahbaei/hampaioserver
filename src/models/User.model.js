import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = Schema({
	username: {
		type: String,
		unique: true,
		allowNull: false,
		required: true,
		lowercase: true,
	},
	email: {
		type: String,
		unique: true,
		allowNull: false,
		require: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true,
		sparse: true
	},
	password: {
		type: String,
		required: true
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	personalDetails: {
		firstName: String,
		lastName: String,
		gender: Boolean,
		country: String,
		adress: String,
		secondaryAdress: String,
		ZIPcode: Number,
		county: String,
		postOrt: String,
		phone: Number,
		secondaryPhone: Number
	},
	billingDetails: {
/* 		firstName
		lastName
		companyname(optional)
		country
		streetadress 
		postcode/zip 
		town / city 
		phone 
		email 
		optional extra notes */
	},
	paymentDetails: {
		method: String,
		number: String
	},
	shoppingCart: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'shoppingcart',
		required: true
	}],
	newsLetterSubscription: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'newslettersubscription',
		required: true
	}],
	favouriteProducts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
	}]

}, { timestamps: true, strict: true })


const UserModel = mongoose.model('user', userSchema)
export default UserModel