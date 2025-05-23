const express = require("express");
const {Server} = require ("socket.io");
const handlebars = require ("express-handlebars");
const path = require ("path");
const mongoose  = require("mongoose");

const viewsRouter = require("./routes/vistas.router.js");
const cartsRouter = require("./routes/carts.router.js");
const socketManager = require("./utils/socketManager.js");

const app = express();
const server = require ("http").createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewsRouter);
app.use(cartsRouter);
socketManager(io);

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`servidor en http://localhost:${PORT}`);
});

mongoose.connect("mongodb+srv://maximobragamendez:hpCRPpUovjWDd6P6@cluster0.ssaqtik.mongodb.net/productos")
.then(() =>{
    console.log("conectado a Mongo");
}).catch((error)=>{
    console.error("no se pudo conectar", error);
});
