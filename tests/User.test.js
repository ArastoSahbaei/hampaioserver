import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { response } from 'express'
import { describe, it as test } from 'mocha'
import StatusCode from '../configurations/StatusCode.js'
import application from '../Server.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)
const user = {
	username: randomString,
	password: randomString,
	email: 'arasto.erjiejr@gmail.com'
}

const testingNonExistentRoute = () => {
	describe('API call towards nonexisting route', () => {
		test('Expecting 404 NOT_FOUND', done => {
			Chai.request(application)
				.get(`/${randomString}`)
				.end((request, response) => {
					response.should.have.a.status(StatusCode.NOT_FOUND)
					done()
				})
		})
	})
}

const registerNewUser = () => {
	describe('registerNewUser', () => {
		test('Expecting a user to be created', (done) => {
			Chai.request(application)
				.post('/user/register')
				.send(user)
				.end((error, response) => {
					response.should.have.a.status(StatusCode.CREATED)
					response.body.should.be.a('object')
					done()
				})
		})
	})
}

const getAllUsers = () => {
	describe('Fetching all users(GET)', () => {
		test('Expecting to return all the users', (done) => {
			Chai.request(application)
				.get('/user')
				.end((error, response) => {
					response.should.have.status(StatusCode.OK)
					response.body.should.be.a('array')
					response.body.length.should.be.eq(response.body.length)
					done()
				})
		})
	})
}

describe('RUNNING TESTS', () => {
	testingNonExistentRoute()
	registerNewUser()
	getAllUsers()
})
