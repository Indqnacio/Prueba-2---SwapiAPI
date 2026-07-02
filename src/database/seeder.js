import axios from "axios";
import mongoose from "mongoose";
import Character from "../schemas/character.schema.js";
import Starship from "../schemas/starship.schema.js";
import Planet from "../schemas/planet.schema.js"
import Film from "../schemas/film.schema.js"
import Specie from "../schemas/specie.schema.js"
import Vehicle from "../schemas/vehicle.schema.js"

const BASE_URL = process.env.SWAPI_URL;
const RESOURCES = ['people', 'starships', 'planets', 'films', 'species', 'vehicles'];

const models = {
    people: Character,
    starships: Starship,
    planets: Planet,
    films: Film,
    species: Specie,
    vehicles: Vehicle,
};

const RESOURCE_CONFIG = {
    people: {
        fields: ['name', 'birth_year', 'eye_color', 'gender', 'hair_color', 'height', 'mass', 'skin_color'],
        refs: {
            films: { resource: 'films', many: true },
            homeworld: { resource: 'planets', many: false },
            species: { resource: 'species', many: true },
            starships: { resource: 'starships', many: true },
            vehicles: { resource: 'vehicles', many: true },
        },
    },
    starships: {
        fields: ['name', 'model', 'starship_class', 'length', 'passengers', 'max_atmosphering_speed', 'hyperdrive_rating', 'MGLT', 'cargo_capacity', 'consumables'],
        refs: {},
    },
    species: {
        fields: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'eye_colors', 'hair_colors', 'skin_colors', 'language'],
        refs: { homeworld: { resource: 'planets', many: false } },
    },
    planets: {
        fields: ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain', 'surface_water'],
        refs: {},
    },
    films: {
        fields: ['title', 'director', 'producer'],
        refs: {},
    },
    vehicles: {
        fields: ['name', 'model', 'vehicle_class', 'length', 'passengers', 'max_atmosphering_speed', 'cargo_capacity', 'consumables'],
        refs: {},
    },
};

const extractSwapiId = (url) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1]) : null;
};

const fetchAll = async (resource) => {
    let url = `${BASE_URL}/${resource}/`;
    const results = [];
    while (url) {
        const { data } = await axios.get(url, { timeout: 15000 });
        results.push(...data.results);
        url = data.next;
    }
    return results;
};

const isEmpty = async () => {
    const counts = await Promise.all(RESOURCES.map((r) => models[r].estimatedDocumentCount()));
    return counts.every((c) => c === 0);
};

export const seed = async () => {
    if (!(await isEmpty())) {
        console.log('La BD ya tiene datos. Se omite el seeding.');
        return;
    }

    const rawData = {};
    const idMaps = {};

    for (const resource of RESOURCES) {
        const docs = await fetchAll(resource);
        idMaps[resource] = {};
        rawData[resource] = docs.map((doc) => {
            const swapiId = extractSwapiId(doc.url);
            const mongoId = new mongoose.Types.ObjectId();
            idMaps[resource][swapiId] = mongoId;
            return { ...doc, _mongoId: mongoId, _swapiId: swapiId };
        });
    }

    for (const resource of RESOURCES) {
        const { fields, refs } = RESOURCE_CONFIG[resource];
        const docsToInsert = rawData[resource].map((doc) => {
            const finalDoc = { _id: doc._mongoId };

            fields.forEach((f) => {
                finalDoc[f] = doc[f];
            });

            Object.entries(refs).forEach(([field, { resource: targetResource, many }]) => {
                const value = doc[field];
                if (many) {
                    finalDoc[field] = (value || [])
                        .map((url) => idMaps[targetResource][extractSwapiId(url)])
                        .filter(Boolean);
                } else if (value) {
                    finalDoc[field] = idMaps[targetResource][extractSwapiId(value)] || null;
                }
            });

            return finalDoc;
        });

        if (docsToInsert.length > 0) {
            await models[resource].insertMany(docsToInsert, { ordered: false });
        }
    }

    console.log('Carga completada.');
};