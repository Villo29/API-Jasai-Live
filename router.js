const router = require("express").Router();
const verifyToken = require("./jwt");

//para usuario
const {
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  validLogin,
} = require("./controllers/usuario");


// ruta get principal
router.get("/", async (req, res) => {
  res.send("Let's build a CRUD API!");
});


//rutas para coleccion usuario
router.get("/usuarios", verifyToken,getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:usuarioID", updateUsuario);
router.delete("/usuarios/:usuarioID", deleteUsuario);
router.get("/usuarios/:UsuarioCORREO/:UsuarioCONTRASENA", validLogin);

module.exports = router;
