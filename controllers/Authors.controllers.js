const Author = require("../models/Authors.model");
const {createAuthorService} = require("../services/Author.services");   

exports.getAuthors = async (req, res) => {
    try {
        let page = (req.query.page > 0) ? req.query.page : 1 || 1;
        let limit = req.query.limit || 10;
        let skip = (page - 1) * limit;
        let query = {};
        
        if(req.query.name) {
            query.name = {$regex: req.query.name, $options: "i"};
        }
        if(req.query.nationality) {
            query.nationality = {$regex: req.query.nationality, $options: "i"};
        }
        if(req.query.genres) {
            query.genres = {$regex: req.query.genres, $options: "i"};
        }

        const totalAuthors = await Author.countDocuments(query);
        if(totalAuthors < skip) {
            throw new Error("No authors found");
        }
        const authors = await Author.find(query).skip(skip).limit(limit);
        res.status(200).json({success: true, authors, totalAuthors});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findOne({authorId: id});
        if(!author) {
            return res.status(404).json({success: false, message: "Author not found"});
        }
        res.status(200).json({success: true, author});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const { name, email, authorId, biography, genres, nationality, birthDate, publications, contactInfo } = req.body;
        const authorExist = await Author.findOne({authorId: authorId});
        if(authorExist) {
            return res.status(400).json({success: false, message: "Author already exists"});
        }
        const author = await createAuthorService({ 
            name, 
            email, 
            authorId, 
            biography, 
            genres, 
            nationality, 
            birthDate, 
            publications, 
            contactInfo 
        });
        res.status(201).json({success: true, author});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.updateAuthor = async(req, res) => {
    try {
        const {id} = req.params;
        const {biography, genres, nationality, publications, contactInfo} = req.body;
        const authorExist = await Author.findOne({authorId: id});
        if(!authorExist) {
            return res.status(404).json({success: false, message: "Author Doesn't Exist"});
        }
        const updatedAuthor = await Author.findOneAndUpdate(
            { authorId: id },
            { 
                $set: { 
                    biography, 
                    genres, 
                    nationality, 
                    publications, 
                    contactInfo, 
                    updatedAt: Date.now() 
                }
            },
            { new: true }
        );
        res.status(200).json({ success: true, author: updatedAuthor });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const {id} = req.params;
        const authorExist = await Author.findOne({authorId: id});
        if(!authorExist) {
            return res.status(404).json({success: false, message: "Author Doesn't exist"});
        }
        await Author.deleteOne({authorId: id});
        return res.status(200).json({success: true, message: 'Author deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};