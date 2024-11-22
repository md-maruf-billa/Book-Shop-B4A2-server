import { Request, Response } from 'express';
import { validateProductSchemaByZod } from './product.schema';
import { TProducts } from './product.interface';
import { productServices } from './product.service';

// create products
const createProducts = async (req: Request, res: Response) => {
    try {
        const productInfo: TProducts = req?.body;
        const validateProductInfo =
            validateProductSchemaByZod.parse(productInfo);
        const result =
            await productServices.saveProductDataInDb(validateProductInfo);
        res.status(200).send({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
    } catch (err: any) {
        res.status(400).send({
            message: 'Validation failed',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const query: string = req?.query.searchTerm?.toString() || '';
        const result = await productServices.getAllProductFromDb(query);
        res.status(200).send({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    } catch (err: any) {
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: err,
            stack:
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

const productsController = {
    createProducts,
    getAllProducts,
};

export default productsController;
