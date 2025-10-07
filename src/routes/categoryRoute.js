import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controller/categoryController.js";


export const CategoryRoute = Router();

CategoryRoute.post("/create", createCategory)
CategoryRoute.get("/",getCategories)
CategoryRoute.post("/update/:id", updateCategory)
CategoryRoute.delete("/delete/:id",deleteCategory)