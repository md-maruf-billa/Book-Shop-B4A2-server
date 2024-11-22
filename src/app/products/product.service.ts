// save product data in db

import { ProductsModel } from './product.schema';
import { TProducts } from './product.interface';

// store product info into data base
const saveProductDataInDb = async (productInfo: TProducts) => {
    const result = await ProductsModel.create(productInfo);
    return result;
};

// get all products from database
const getAllProductFromDb = async (searchTerm: string) => {
    // if have query param
    const query = searchTerm
        ? {
              $or: [
                  { title: { $regex: searchTerm, $options: 'i' } },
                  { author: { $regex: searchTerm, $options: 'i' } },
                  { category: { $regex: searchTerm, $options: 'i' } },
              ],
          }
        : {};
    const result = await ProductsModel.find(query);
    return result;
};

// export all product services

export const productServices = {
    saveProductDataInDb,
    getAllProductFromDb,
};
