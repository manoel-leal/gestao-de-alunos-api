import request from 'supertest'
import 'dotenv/config'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export function api(){
    return request(BASE_URL)
}

export async function post(endPoint, token, requestBody){
    return await api()
                    .post(endPoint)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', token)
                    .send(requestBody)
}