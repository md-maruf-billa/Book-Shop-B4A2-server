// save product data in db

import { ProductsModel } from "./product.schema";
import { TProducts } from "./product.interface";

const saveProductDataInDb = async (productInfo: TProducts) => {
    const result = await ProductsModel.create(productInfo);
    return result;
}


// export all product services

export const productServices = {
    saveProductDataInDb
}