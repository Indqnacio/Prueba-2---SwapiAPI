import express from "express"
import morgan from "morgan";
import cors from "cors";
import { connectMongo } from "./database/db.js";
import { FilmRoute } from "./routes/film.route.js";
import { PlanetRoute } from "./routes/planet.route.js";
import { SpecieRoute } from "./routes/specie.route.js";
import { StarshipRoute } from "./routes/starship.route.js";
import { VehicleRoute } from "./routes/vehicle.route.js";
import { CharacterRoute } from "./routes/character.route.js";
import { seed } from "./database/seeder.js";

const app = express();
const PORT = process.env.PORT;
const ACCEPTED_ORIGINS = ["http://localhost:8080", "http://localhost:5173"];

app.use(cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true);
        if (!origin) return callback(null, true);
        return callback(new Error('Error: Source not allowed.'))
    }
}))

app.use(express.json());
app.use(morgan('dev'));
app.disable('x-powered-by');

connectMongo();
seed();

//Rutas
app.use('/films', FilmRoute);
app.use('/planets', PlanetRoute);
app.use('/species', SpecieRoute);
app.use('/starships', StarshipRoute);
app.use('/vehicles', VehicleRoute);
app.use('/people', CharacterRoute);

app.listen(PORT, () => { console.log(`Server running on: http://localhost:${PORT}`) });
