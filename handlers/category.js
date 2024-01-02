const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');


exports.allCategory = async (req, res) => {
    const categorylist =await Category.find(); {
        res.send(categorylist);
    }
    if(!categorylist) {
        res.status(500).json({
            success: false
        })
    }
};

exports.getCategoryById = async (req, res) => {
    const category =await Category.findById(req.params.id); 
    if(category) {
        res.status(200).send(category);
    }
    else {
        res.status(404).json({
            success: false,
            message: 'The category is not found',
        })
    }
};

exports.searchCategory = async (req, res) => {
    const category =await Category.find({name: req.params.name}); 
    if(category) {
        res.status(200).send(category);
    }
    else {
        res.status(404).json({
            success: false,
            message: 'The category is not found',
        })
    }
};

exports.updateCategory = async (req, res) => {
    const category =await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {new: true}
    )
    if(category) {
        res.status(200).send(category);
    }
    else {
        res.status(404).json({
            success: false,
            message: 'The category is not found',
        })
    }
};

exports.addNewCategory = async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    category = await category.save();
    if(!category) {
        return res.status(404).send('The category cannot be created');
    }
    else {
        res.send(category);
    }
};

exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category) {
            return res.status(200).json({
                success: true,
                message: 'The category is deleted',
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'The category is not found',
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            error: err,
        })
    })
}


