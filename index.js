const viewsRouter = require("./routes/vistas.router");
app.use("/", viewsRouter);

const socketManager = require("./utils/socketManager.js");
socketManager(io);
