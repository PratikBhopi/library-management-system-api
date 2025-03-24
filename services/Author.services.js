const Author = require("../models/Authors.model");

exports.createAuthorService = async (data) => {
    try {
        if(!data.name || !data.email || !data.authorId){
            throw new Error("All fields are required");
        }
        const authorExist = await Author.findOne({authorId: data.authorId});
        if(authorExist){
            throw new Error("Author already exists");
        }
        const author = await Author.create(data);
        return author;
    } catch (error) {
        console.error('Error in createAuthorService:', error);
        throw new Error(error.message);
    }
}; 