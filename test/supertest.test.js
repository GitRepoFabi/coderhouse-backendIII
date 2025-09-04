import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import config from "../src/config/config.js";
import mongoose, { isValidObjectId } from "mongoose"

const requester=supertest(`http://localhost:${config.PORT}`)

await mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})

describe("Pruebas router pets", function(){
    this.timeout(10_000) // 2.000 ms

    after(async()=>{
        await mongoose.connection.collection("pets").deleteMany({specie:"test"})
    })

    it("Si consulto todas las mascotas al endpoint /api/pets metodo GET, me debería devolver un array de mascotas", async() => {
        let {body} = await requester.get("/api/pets").send()
        expect(Array(body.payload))
    })    

    it("Si envío los datos correctos de una mascota al /api/pets metodo POST, da de alta la mascota en DB", async()=>{
        let petMock={
            name: "Rocky", 
            specie: "test", 
            birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status, body}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(200)
        expect(body.payload).to.has.property("_id")
        expect(isValidObjectId(body.payload._id)).to.be.true
    })

    it("Si envío los datos de la mascota sin el campo name al /api/pets metodo POST, me debería dar un error", async()=>{
        let petMock={
            //name: "Rocky", 
            specie: "test", 
            birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(400)
    })    

    it("Si envío los datos de la mascota sin el campo specie al /api/pets metodo POST, me debería dar un error", async()=>{
        let petMock={
            name: "Rocky", 
            //specie: "test", 
            birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(400)
    })        
    
    it("Si envío los datos de la mascota sin el campo birthDate al /api/pets metodo POST, me debería dar un error", async()=>{
        let petMock={
            name: "Rocky", 
            specie: "test", 
            //birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(400)
    })        
    
})

describe("Pruebas router users", function(){
    this.timeout(10_000) // 2.000 ms

    it("Si consulto todos los usuarios al endpoint /api/users metodo GET, me debería devolver un array de usuarios", async() => {
        let {body} = await requester.get("/api/users").send()
        expect(Array(body.payload))
    })        

    it("Si quiero generar 1 usuario y 1 mascota, al apuntar al endpoint /api/mocks/generateData metodo POST sin pasarle cantidad, da de alta 1 usuario y 1 mascota en DB", async() => {

        let {status, body}=await requester.post(`/api/mocks/generateData`).send()
        expect(status).to.be.eq(201)
        expect(Array(body))
        expect(body.message).to.be.eq("Datos generados exitosamente")
    })

    it("Si quiero generar N usuarios y N mascotas, al apuntar al endpoint /api/mocks/generateData metodo POST pasándole la cantidad deseada, da de alta los N usuarios y las N mascotas en DB", async() => {

        let usuarios=3
        let mascotas=3

        let {status, body}=await requester.post(`/api/mocks/generateData/?user=${usuarios}&pets=${mascotas}`).send()
        expect(status).to.be.eq(201)
        expect(Array(body))
        expect(body.message).to.be.eq("Datos generados exitosamente")
    })    
    
    it("Si al apuntar al endpoint /api/mocks/generateData metodo POST le paso una cantidad negativa en el parámetro para generar un usuario, debe de dar error", async() => {
        let user = -1
        let {status}=await requester.post(`/api/mocks/generateData/?user=${user}`).send()
        expect(status).to.be.eq(400)
    })    

    it("Si al apuntar al endpoint /api/mocks/generateData metodo POST le paso una cantidad negativa en el parámetro para generar una mascota, debe de dar error", async() => {
        let pet = -1
        let {status}=await requester.post(`/api/mocks/generateData/?pet=${pet}`).send()
        expect(status).to.be.eq(400)
    })
})