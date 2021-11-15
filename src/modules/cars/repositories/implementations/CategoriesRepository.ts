import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRespository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRespository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRespository {
    if (!CategoriesRespository.INSTANCE) {
      CategoriesRespository.INSTANCE = new CategoriesRespository();
    }
    return CategoriesRespository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

export { CategoriesRespository };
