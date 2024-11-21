import { Request, Response } from "express";
import { validateProductSchemaByZod } from "./product.schema";
import { TProducts } from "./product.interface";
import { productServices } from "./product.service";

// create products
const createProducts = async (req: Request, res: Response) => {
    try {
        const productInfo: TProducts = req?.body;
        const validateProductInfo = validateProductSchemaByZod.parse(productInfo)
        const result = await productServices.saveProductDataInDb(validateProductInfo)
        res.status(200).send({
            message: "Book created successfully",
            success: true,
            data: result
        })
    } catch (err: any) {
        res.status(400).send({
            message: "Validation failed",
            success: false,
            error: err,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        })
    }


}


const productsController = {
    createProducts
}

export default productsController;