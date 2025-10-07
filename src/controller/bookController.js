import Books from "../model/bookModel.js"
import Category from "../model/categoryModel.js"



export const createBook = async (req, res) => {
    try {
        const { name, category: categoryName } = req.body;
        console.log("Datos recibidos:", req.body);
        
        // Verificar si el libro ya existe
        const bookExist = await Books.findOne({ name: name.toLowerCase() });
        if (bookExist) {
            return res.status(400).json({ msg: 'Book already exist' });
        }
        
        // ⭐ BUSCAR LA CATEGORÍA POR NOMBRE
        const category = await Category.findOne({ name: categoryName.toLowerCase() });
        if (!category) {
            return res.status(400).json({ 
                msg: `Category '${categoryName}' not found. Available categories: ${await Category.find().then(cats => cats.map(c => c.name).join(', '))}` 
            });
        }
        
        console.log("Categoría encontrada:", category);
        
        // ⭐ CREAR EL LIBRO CON EL ID DE LA CATEGORÍA
        const bookData = {
            name: req.body.name,
            author: req.body.author,
            stock: req.body.stock,
            price: req.body.price,
            category: category._id  // ← USAR EL _id, NO EL NOMBRE
        };
        
        console.log("Datos del libro a crear:", bookData);
        
        const book = new Books(bookData);
        const newBook = await book.save();
        
        // Poblar la categoría para devolverla completa
        await newBook.populate('category');
        
        console.log("Libro creado exitosamente:", newBook);
        
        return res.status(201).json(newBook);
    } catch (error) {
        console.error("Error completo:", error);
        return res.status(500).json({ 
            message: "Book creation failed", 
            error: error.message 
        });
    }
}

export const getBook = async (req, res) => {
    try {
        const books = await Books.find().populate('category')
        if(books.length === 0){
            return res.status(404).json({msg: 'No books found'})
        }
        return res.json(books)  
       
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message : "Book fetching failed", error})
        
    }
}

export const updateBook = async (req,res) => {
    try {
        const _id = req.params.id
        const books = await Books.findOne({ _id })
        
        if(!books){
            return res.status(404).json({msg: 'Books not found'})
        }
        
        const updatedData = req.body
        const updatedBooks = await Books.findByIdAndUpdate(_id,updatedData, { new: true } )
        return res.json(updatedBooks)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message : "Books update failed", error})
       
    }
}

export const deleteBook = async (req, res ) => {
    try {
        const _id = req.params.id
        const book = await Books.findOne({ _id })
        if(!book){
            return res.status(404).json({msg: 'Book not found'})
        }
        const deletedBook = await Books.findByIdAndDelete(_id)
        return res.json(deletedBook)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message : "Book deletion failed", error})
        
    }
}



// Buscar productos por nombre 
export const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim().length < 2) {
            return res.status(400).json({ msg: 'Search query must be at least 2 characters long' });
        }

        const searchTerm = query.toLowerCase();
        
        const books = await Books.find({
            $or: [
                { name: { $regex: `.*${searchTerm}.*`, $options: 'i' } }
                
            ]
        }).populate('category');
        
        return res.json(books);
        
    } catch (error) {
        console.error("Book search error:", error);
        return res.status(500).json({ message: "Book search failed", error: error.message });
    }
};