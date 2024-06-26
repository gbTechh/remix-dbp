import { IProduct, IProductCreate, IProductFormOrUpdate, TError } from "~/interfaces";
import { Mapped } from "../common/MappedClass";
import { ProductResponse } from "./ProductResponse";

import { validateFormErrors } from "./validation";
import { ProductRepository } from "./productRepository";
import { CategoryRepository } from "../category";

export class ProductServices extends Mapped<ProductResponse, IProduct> {
  
  private product: ProductRepository;
  private category?: CategoryRepository;

  constructor(product: ProductRepository, category?: CategoryRepository) {
    super(ProductResponse);
    this.product = product;
    this.category = category;
  }

  async getProducts() {
    const products = await this.product.getAllProducts();
    return products.map((product) => {
      return this.mapped(product);
    });
  }
  async getProductById(id: number) {
    const product = await this.product.getProductById(id);   

    if (product === null) {
      return null;
    }

    return this.mapped(product);
  }
  async getProductBySlug(slug: string) {
    const product = await this.product.getProductBySlug(slug);   

    if (product === null) {
      return null;
    }

    return this.mapped(product);
  }
  async getProductsByCategory(idOrSlug: number | string) {

    let category, products: IProduct[] = [];
    if(typeof idOrSlug === 'string'){
      category = await this.category?.getCategoryBySlug(idOrSlug);   
    }else{
      category = await this.category?.getCategoryById(idOrSlug);   
    } 
    products = await this.product.getAllProducts();
    products = products?.filter(p => p.categoryId === category?.id)

    if (products === null || products?.length === 0) {
      return [];
    }

    return products.map((product) => {
      return this.mapped(product);
    });

  }

  async createProduct(data: IProductFormOrUpdate) {
    try {
      const errors = validateFormErrors<IProductFormOrUpdate>(data);
      if (Object.keys(errors).length > 0) {
        const errorObj: TError<IProductFormOrUpdate> = {
          message: "Verifica los errores",
          hasError: true,
          body: errors,
          state: "idle",
        };
        return { error: errorObj, data: null };
      }

      const secondaryImagesJson = data.secondaryImages || ['']
      const dataFormatted: IProductCreate = {
        name: data.name!,
        slug: data.slug!,
        description: data.description!,
        categoryId: data.categoryId!,
        discountPrice: data.discountPrice!,
        mainImage: data.mainImage!,
        price: data.price!,
        rating: data.rating!,
        secondaryImages: JSON.stringify(secondaryImagesJson),
        shortDescription: data.shortDescription!,
      };

      const { error, product } = await this.product.createProduct(
        dataFormatted
      );

      if (error?.hasError) {
        return { error: error, data: null };
      } else if (product !== null) {
        const productMapped = this.mapped(product);
        return { error: null, data: productMapped };
      } else {
        const errorObj: TError<IProductFormOrUpdate> = {
          message: "Verifica los errores",
          hasError: true,
          body: errors,
          state: "idle",
        };
        return { error: errorObj, data: null };
      }
    } catch (error) {
      return {
        error: error as TError<IProductFormOrUpdate>,
        data: null,
      };
    }
  }

  async updateCategory(data: IProductFormOrUpdate, id: number) {
    try {
      const errors = validateFormErrors<IProductFormOrUpdate>(data);

      if (Object.keys(errors).length > 0) {
        const errorObj: TError<IProductFormOrUpdate> = {
          message: "Verifica los errores",
          hasError: true,
          body: errors,
          state: "idle",
        };
        return { error: errorObj, data: null };
      }

      const dataFormatted: IProductFormOrUpdate = {
        name: data.name!,
        slug: data.slug!,
        description: data.description!,
        categoryId: data.categoryId!,
        discountPrice: data.discountPrice!,
        mainImage: data.mainImage!,
        price: data.price!,
        rating: data.rating!,
        secondaryImages: data.secondaryImages!,
        shortDescription: data.shortDescription!,
      };

      const existProduct = await this.product.getProductById(id);
      if (existProduct) {
        const categoryUpdated = await this.product.updateProductByIdOrSlug(
          id,
          {
            id,
          },
          dataFormatted
        );
        if (categoryUpdated.error === null) {
          return { error: null, data: categoryUpdated.product };
        } else {
          return { error: categoryUpdated.error, data: null };
        }
      } else {
        return {
          error: {
            hasError: true,
            message: "No existe la categoría",
          },
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        error: error as TError<IProductFormOrUpdate>,
        data: null,
      };
    }  
  }
}