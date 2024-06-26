import { ICategoryResponse } from "~/interfaces";


export class CategoryResponse {
  
  id: number;
  name: string;
  slug: string;
  image: string;

  constructor({
    id,
    name,  
    slug,  
    image,
  }: ICategoryResponse) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.image = image ? `/uploads/${image}` : '';
  }
}
