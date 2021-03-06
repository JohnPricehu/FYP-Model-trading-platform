import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passport from "passport-oauth2";
import colors from "colors";
import path from "path";
import session from "express-session"
// import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import goodsRoutes from "./routes/goodsRoutes.js";
import orderRoutes from './routes/orderRoute.js'
import cartRoutes from './routes/cartRoutes.js'
import favouriteRoutes from './routes/favouriteRoutes.js'
import wantedRoutes from './routes/wantedRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

// // Passport config
// require('./config/passport')(passport)

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data


// // Sessions
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({mongoUrl: process.env.MONGO_DB,}),
//   })
// )

// // Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

app.use("/api/goods", goodsRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/favourite', favouriteRoutes)
app.use('/api/wanted', wantedRoutes)
app.use('/api/history', historyRoutes)

// app.get("/", (req, res) =>
// res.sendFile(path.join(__dirname, "frontend/index.js"))
// );
// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
    

