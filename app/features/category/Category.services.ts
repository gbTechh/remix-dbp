import { ICategory, ICategoryCreate, ICategoryFormOrUpdate, TError } from "~/interfaces";
import { Mapped } from "../common/MappedClass";
import { CategoryResponse } from "./CategoryResponse";
import { CategoryRepository } from "./categoryRepository";
import { validateFormErrors } from "./validation";

export class CategoryServices extends Mapped<CategoryResponse, ICategory> {
  
  private category: CategoryRepository;

  constructor(category: CategoryRepository) {
    super(CategoryResponse);
    this.category = category;
  }

  async getCategories() {
    const categories = await this.category.getAllCategories();
    return categories.map((category) => {
      return this.mapped(category);
    });
  }
  async getCategoryById(id: number) {
    const category = await this.category.getCategoryById(id);   

    if (category === null) {
      return null;
    }

    return this.mapped(category);
  }

  async createCategory(data: ICategoryFormOrUpdate) {
    try {
      const errors = validateFormErrors<ICategoryFormOrUpdate>(data);
      if (Object.keys(errors).length > 0) {
        const errorObj: TError<ICategoryFormOrUpdate> = {
          message: "Verifica los errores",
          hasError: true,
          body: errors,
          state: "idle",
        };
        return { error: errorObj, data: null };
      }

      const dataFormatted: ICategoryCreate = {
        name: data.name!,
        image: data?.image,
        slug: data.slug!,
      };

      const { error, category } = await this.category.createCategory(
        dataFormatted
      );

      if (error?.hasError) {
        return { error: error, data: null };
      } else if (category !== null) {
        const categoryMapped = this.mapped(category);
        return { error: null, data: categoryMapped };
      } else {
        const errorObj: TError<ICategoryFormOrUpdate> = {
          message: "Verifica los errores",
          hasError: true,
          body: errors,
          state: "idle",
        };
        return { error: errorObj, data: null };
      }
    } catch (error) {
      return {
        error: error as TError<ICategoryFormOrUpdate>,
        data: null,
      };
    }
  }

  async updateCategory(data: ICategoryFormOrUpdate, id: number) {
    try {
      const errors = validateFormErrors<ICategoryFormOrUpdate>(data);

      if (Object.keys(errors).length > 0) {
        const errorObj: TError<ICategoryFormOrUpdate> = {
          message: "Verifica los errores",
          hasError: true,
          body: errors,
          state: "idle",
        };
        return { error: errorObj, data: null };
      }

      const dataFormatted: ICategoryFormOrUpdate = {
        name: data.name!,
        slug: data.slug!,
        image: data?.image,
      };

      const existCategory = await this.category.getCategoryById(id);
      if (existCategory) {
        const categoryUpdated = await this.category.updateCategoryByIdOrSlug(
          id,
          {
            id,
          },
          dataFormatted
        );
        if (categoryUpdated.error === null) {
          return { error: null, data: categoryUpdated.category };
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
        error: error as TError<ICategoryFormOrUpdate>,
        data: null,
      };
    }  
  }

  async deleteCategory(categoryId: number): Promise<boolean>{
    try {
      const existCategory = await this.category.getCategoryById(categoryId);
      if (existCategory) {
        await this.category.deleteCategory(categoryId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}