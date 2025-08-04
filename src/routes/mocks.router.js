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

        // 1. Generar y guardar usuarios
        let users = [];
        for (let i = 0; i < user; i++) {
            users.push(await generaUser());
        }

        const usersInserted = await userModel.insertMany(users);

        // 2. Generar mascotas y asignar owner si está adoptada
        let petsToInsert = [];

        for (let i = 0; i < pet; i++) {
            let petData = generaPet().pet;

            if (petData.adopted) {
                // Seleccionamos un usuario aleatorio de los insertados
                const randomUser = usersInserted[Math.floor(Math.random() * usersInserted.length)];
                petData.owner = randomUser._id;
            }

            petsToInsert.push(petData);
        }

        // 3. Insertamos todas las mascotas
        const petsInserted = await petModel.insertMany(petsToInsert);

        // 4. Relacionamos mascotas adoptadas con sus respectivos usuarios
        const updates = petsInserted
            .filter(p => p.owner)
            .map(pet => (
                userModel.updateOne(
                    { _id: pet.owner },
                    { $push: { pets: { _id: pet._id } } }
                )
            ));

        await Promise.all(updates);

        return res.status(201).json({
            message: 'Datos generados exitosamente',
            users: usersInserted,
            pets: petsInserted
        });

    } catch (error) {
        console.error("Error generando datos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;