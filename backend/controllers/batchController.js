import ApiError from '../error/apiError.js'; 
import Batch from '../models/Batch.js';

export const createBatch = async (req, res, next) => {
    try {
        const batch = await Batch.create({
            userId: req.user._id,
            name: req.body.name,
            type: req.body.type,
            baseIngredient: req.body.baseIngredient,
            targetStyle: req.body.targetStyle,
            volumeLiters: req.body.volumeLiters,
        });

        res.status(201).json({
            batch,
            message: 'successfully'
        });
    } catch (error) {
        console.log(error);
        next(ApiError.internal('creating error'));
    };
};

export const getAllBatches = async (req, res, next) => {
    try {
        const batches = await Batch.find({userId: req.user._id});

        res.json({
            batches,
            message: 'successfully'
        });
    } catch (error) {
        console.log(error);
        next(ApiError.internal('internal error'));
    }
};