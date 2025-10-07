import bodyParser from "body-parser"
import express from "express"
import { PORT } from "./src/config.js"
import cors from "cors"
import { connectDB } from "./src/db/db.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import BookRouter from "./src/routes/booksRoute.js"
import { CategoryRoute } from "./src/routes/categoryRoute.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: [ "GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))


app.use("/api/books", BookRouter)
console.log("Exportando rutas desde BookRouter");
console.log(BookRouter);
app.use("/api/categories", CategoryRoute)
console.log("Exportando rutas desde CategoryRoute");
console.log(CategoryRoute);
 app.listen(PORT, () => {
            console.log(`\n🚀 ===== SERVIDOR INICIADO EXITOSAMENTE ===== 🚀`);
            console.log(`📡 Puerto: ${PORT}`);
 })
console.log("Conectando a MongoDB...");
connectDB()