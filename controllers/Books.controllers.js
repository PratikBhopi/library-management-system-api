const Book = require("../models/Books.model");
const {createBookService} = require("../services/Book.services");   

exports.getBooks = async (req, res) => {
    
    try {
        let page=req.query.page || 1;
        let limit=req.query.limit || 10;
        let skip=(page-1)*limit;
        let query={};
        if(req.query.title){
            query.title={$regex:req.query.title,$options:"i"};
        }
        if(req.query.author){
            query.author={$regex:req.query.author,$options:"i"};
        }
        if(req.query.category){
            query.category={$regex:req.query.category,$options:"i"};
        }
        const totalBooks = await Book.countDocuments(query);
        if(totalBooks<skip){
            throw new Error("No books found");
        }
        const books = await Book.find(query).skip(skip).limit(limit);
        res.status(200).json({success:true,books,totalBooks});

    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const {id}=req.params;
        const book=await Book.findOne({bookId:id});
        if(!book){
            return res.status(404).json({success:false,message:"Book not found"});
        }
        res.status(200).json({success:true,book});
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, category, description, price, stock ,bookId} = req.body;
        const bookExist=await Book.findOne({bookId:bookId});
        if(bookExist){
            return res.status(400).json({success:false,message:"Book already exists"});
        }
        const book = await createBookService({ title, author, category, description, price, stock ,bookId});
        res.status(201).json({success:true,book});
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
};

exports.updateBook= async(req,res)=>{
    try{
        const{id}=req.params;
        const{category,price,stock,description}=req.body;
        const bookExist=await Book.findOne({bookId:id});
        if(bookExist){
            return res.status(400).json({success:false,message:"Book already exists"});
        }
        const updatedBook = await Book.findOneAndUpdate(
            { bookId: bookId }, 
            { 
                $set: { category, stock, price, description, updatedAt: Date.now() }
            }, 
            { new: true } 
        );
        res.status(200).json({ success: true, book: updatedBook });
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
}


exports.deleteBook= async (req,res)=>{
    try{
        const {id}=req.params
        const bookExist=await Book.findOne({bookId:id});
        if(bookExist){
            return res.status(400).json({success:false,message:"Book already exists"});
        }
        await Book.deleteOne({bookId:bookId});
        return res.status(200).json({success:true,message:'Book deleted'})
    }catch (error){
        res.status(500).json({success:false,message:err.message})
    }
}








