const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8100',
}));
app.use(express.json());

let recipes = [
    {
        "nombre": "Tortillas de Maíz",
        "ingredientes": [
            "2 tazas de harina de maíz nixtamalizado",
            "1/2 cucharadita de sal",
            "1 1/2 tazas de agua tibia"
        ],
        "preparacion": [
            "En un bol, mezcla la harina de maíz y la sal.",
            "Agrega el agua tibia poco a poco hasta formar una masa suave.",
            "Divide la masa en bolas y aplánalas en círculos delgados.",
            "Cocina las tortillas en un comal caliente durante 1-2 minutos por cada lado."
        ],
        "duracion": "30 minutos",
        "imagen": "https://example.com/tortillas_de_maiz.jpg"
    },
    {
        "nombre": "Galletas de Avena",
        "ingredientes": [
            "2 tazas de avena sin gluten",
            "1/2 taza de mantequilla derretida",
            "1/2 taza de azúcar moreno",
            "1 huevo",
            "1 cucharadita de extracto de vainilla",
            "1/2 taza de chispas de chocolate"
        ],
        "preparacion": [
            "Precalienta el horno a 180°C (350°F).",
            "Mezcla la avena, la mantequilla, el azúcar, el huevo y la vainilla en un bol.",
            "Agrega las chispas de chocolate y mezcla bien.",
            "Forma bolitas y colócalas en una bandeja para hornear.",
            "Hornea durante 10-12 minutos."
        ],
        "duracion": "25 minutos",
        "imagen": "https://example.com/galletas_de_avena.jpg"
    },
    {
        "nombre": "Pasta de Arroz",
        "ingredientes": [
            "250 g de pasta de arroz",
            "2 cucharadas de aceite de oliva",
            "1 diente de ajo picado",
            "1/2 taza de tomates cherry",
            "Sal y pimienta al gusto"
        ],
        "preparacion": [
            "Cocina la pasta según las instrucciones del paquete.",
            "En una sartén, calienta el aceite y añade el ajo.",
            "Agrega los tomates cherry y cocina hasta que estén tiernos.",
            "Mezcla la pasta cocida con los tomates y el ajo.",
            "Sazona con sal y pimienta al gusto."
        ],
        "duracion": "20 minutos",
        "imagen": "https://example.com/pasta_de_arroz.jpg"
    },
    {
        "nombre": "Pan de Plátano",
        "ingredientes": [
            "3 plátanos maduros",
            "2 huevos",
            "1/2 taza de miel",
            "1/4 taza de aceite de coco",
            "1 taza de harina de almendra",
            "1 cucharadita de bicarbonato de sodio",
            "1 cucharadita de canela"
        ],
        "preparacion": [
            "Precalienta el horno a 175°C (350°F).",
            "En un bol, aplasta los plátanos y mezcla con los huevos, miel y aceite.",
            "Agrega la harina de almendra, bicarbonato y canela.",
            "Vierte la mezcla en un molde para pan engrasado.",
            "Hornea durante 50-60 minutos."
        ],
        "duracion": "1 hora y 10 minutos",
        "imagen": "https://example.com/pan_de_platano.jpg"
    },
    {
        "nombre": "Ensalada de Quinoa",
        "ingredientes": [
            "1 taza de quinoa",
            "2 tazas de agua",
            "1 pepino picado",
            "1 pimiento rojo picado",
            "1/4 de taza de perejil picado",
            "Jugo de 1 limón",
            "2 cucharadas de aceite de oliva"
        ],
        "preparacion": [
            "Cocina la quinoa en agua según las instrucciones del paquete.",
            "Deja enfriar la quinoa cocida.",
            "En un bol grande, mezcla la quinoa, pepino, pimiento y perejil.",
            "Añade el jugo de limón y el aceite de oliva, y mezcla bien."
        ],
        "duracion": "30 minutos",
        "imagen": "https://example.com/ensalada_de_quinoa.jpg"
    },
    {
        "nombre": "Sopa de Calabaza",
        "ingredientes": [
            "1 kg de calabaza pelada y picada",
            "1 cebolla picada",
            "2 dientes de ajo picados",
            "4 tazas de caldo de verduras",
            "Sal y pimienta al gusto",
            "1 cucharada de aceite de oliva"
        ],
        "preparacion": [
            "En una olla grande, calienta el aceite y sofríe la cebolla y el ajo.",
            "Agrega la calabaza y el caldo, y lleva a ebullición.",
            "Reduce el fuego y cocina a fuego lento hasta que la calabaza esté tierna.",
            "Usa una licuadora para hacer puré la sopa hasta que esté suave.",
            "Sazona con sal y pimienta al gusto."
        ],
        "duracion": "40 minutos",
        "imagen": "https://example.com/sopa_de_calabaza.jpg"
    },
    {
        "nombre": "Brownies de Chocolate",
        "ingredientes": [
            "1 taza de mantequilla de almendra",
            "1/2 taza de miel",
            "2 huevos",
            "1/2 taza de cacao en polvo",
            "1/4 cucharadita de sal",
            "1 cucharadita de extracto de vainilla"
        ],
        "preparacion": [
            "Precalienta el horno a 175°C (350°F).",
            "En un bol, mezcla todos los ingredientes hasta obtener una masa homogénea.",
            "Vierte la mezcla en un molde engrasado.",
            "Hornea durante 25-30 minutos."
        ],
        "duracion": "35 minutos",
        "imagen": "https://example.com/brownies_de_chocolate.jpg"
    },
    {
        "nombre": "Pudín de Chía",
        "ingredientes": [
            "1/4 taza de semillas de chía",
            "1 taza de leche de almendras",
            "1 cucharadita de miel",
            "Frutas frescas para decorar"
        ],
        "preparacion": [
            "Mezcla las semillas de chía, leche de almendras y miel en un bol.",
            "Deja reposar en el refrigerador durante al menos 2 horas o toda la noche.",
            "Sirve con frutas frescas por encima."
        ],
        "duracion": "10 minutos (más tiempo de refrigeración)",
        "imagen": "https://example.com/pudin_de_chia.jpg"
    },
    {
        "nombre": "Tarta de Frutas",
        "ingredientes": [
            "1 taza de harina de almendra",
            "1/4 taza de aceite de coco",
            "2 cucharadas de miel",
            "2 tazas de frutas frescas",
            "1 cucharada de jugo de limón"
        ],
        "preparacion": [
            "Precalienta el horno a 180°C (350°F).",
            "Mezcla la harina de almendra, aceite de coco y miel hasta formar una masa.",
            "Presiona la masa en un molde para tarta y hornea durante 10-15 minutos.",
            "Deja enfriar y coloca las frutas frescas encima.",
            "Rocía con jugo de limón antes de servir."
        ],
        "duracion": "30 minutos",
        "imagen": "https://example.com/tarta_de_frutas.jpg"
    },
    {
        "nombre": "Smoothie Verde",
        "ingredientes": [
            "1 plátano",
            "1 taza de espinacas",
            "1 taza de leche de almendras",
            "1 cucharada de mantequilla de almendra"
        ],
        "preparacion": [
            "Coloca todos los ingredientes en una licuadora.",
            "Licúa hasta obtener una mezcla suave.",
            "Sirve inmediatamente."
        ],
        "duracion": "5 minutos",
        "imagen": "https://example.com/smoothie_verde.jpg"
    }
];

app.get('/api/recetas', (req, res) => {
    res.json(recipes);
});

module.exports = app;
