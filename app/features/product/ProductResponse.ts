import { ICategory, IProductResponse } from "~/interfaces";


export class ProductResponse {
  id: number;
  name: string | null;
  slug: string | null;
  description: string | null;
  shortDescription: string | null;
  price: number | null;
  discountPrice: number | null;
  rating: number | null | null;
  mainImage: string;
  secondaryImages: string[] | [] | null;
  categoryId: number | null;

  constructor({
    id,
    name,
    slug,
    categoryId,
    category,
    description,
    discountPrice,
    mainImage,
    price,
    rating,
    secondaryImages,
    shortDescription,
  }: IProductResponse) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.categoryId = categoryId;
    this.description = description;
    this.discountPrice = discountPrice;
    this.mainImage = mainImage ? `/uploads/products/${mainImage}` : "/images/no-image.jpg";;
    this.price = price;
    this.rating = rating;
    this.secondaryImages = secondaryImages;
    this.shortDescription = shortDescription;
  }
}
