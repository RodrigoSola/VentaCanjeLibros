import { Router } from "express";
import {  createBook, deleteBook, getBook, searchBooks, updateBook } from "../controller/bookController.js";



const BookRouter = Router();

BookRouter.post("/create",createBook)
BookRouter.get("/get",  getBook)
BookRouter.put("/update/:id",  updateBook)
BookRouter.delete("/delete/:id", deleteBook)
BookRouter.get("/search",  searchBooks);

export default BookRouter;