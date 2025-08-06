import { Router } from 'express';
import { generaPet, generaUser } from '../mocks/mocks.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

const router = Router();

router.get('/mockingusers', (req, res) => {
    let { cantidad } = req.query;
    if (cantidad < 0) {
        return res.status(400).json({ error: "Cantidad enviada debe de ser positiva" })
    }

    if (!cantidad) cantidad = 1;

    let usuarios = []

    for (let i = 0; i < cantidad; i++) {
        usuarios.push(generaUser())
    }

    return res.status(200).json({ usuarios });
});

router.post('/generateData', async (req, res) => {
    try {

        let { user, pet } = req.query;

        user = parseInt(user) || 1;
        pet = parseInt(pet) || 1;

        if (user < 0 || pet < 0) {
            return res.status(400).json({ error: "Cantidad enviada debe de ser positiva" });
        }

        //Genero usuarios según el largo recibido por parámetro
        let users = [];
        for (let i = 0; i < user; i++) {
            users.push(await generaUser());
        }

        //Inserto los datos del array en la BD
        const usersInsertados = await userModel.insertMany(users);

        let pets = [];

        //Genero mascotas según el largo recibido por parámetro
        for (let i = 0; i < pet; i++) {
            let generaData = generaPet().pet;

            if (generaData.adopted) {
                const randomUser = usersInsertados[Math.floor(Math.random() * usersInsertados.length)];
                generaData.owner = randomUser._id;
            }

            pets.push(generaData);
        }

        //Inserto los datos del array en la BD
        const petsInsertados = await petModel.insertMany(pets);

        return res.status(201).json({
            message: 'Datos generados exitosamente',
            users: usersInsertados,
            pets: petsInsertados
        });

    } catch (error) {
        console.error("Error generando datos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;