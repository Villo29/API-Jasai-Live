// definicion de librerias
const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const https = require('https');
const fs = require('fs');


// variables de entorno
dotenv.config();
// Puerto
const PORT = process.env.PORT || 3000;
const app = express();


//Creando Certificado HTTPS
https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/archive/usuarios.jasailive.xyz/fullchain1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/usuarios.jasailive.xyz/privkey1.pem')
}, app).listen(port, function () {
  console.log('Servidor https corriendo en el puerto 443');
})
app.get('/', function (req, res) {
  res.send('Hola, estas en la pagina inicial');
  console.log('Se recibio una petición get a través de https');
});


// Libreria para mongodb - usa URL que debe existir en .env
// usa la Base de datos llamada mongo y la coleccion llamada todos
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'JasaiLive',
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(cors())

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// uso de router.js
app.use(router);

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});

const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 1005, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
  message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
});

app.get("/usuario", accountLimiter, (req, res) => {
  res.send('IP bloqueada por pendejo')
});