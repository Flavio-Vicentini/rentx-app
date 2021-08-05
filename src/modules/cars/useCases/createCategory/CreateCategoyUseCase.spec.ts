import { AppError } from "../../../../errors/AppError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });
  it("Shoudl be able to create a new category", async () => {
    const category = {
      name: "Category name test",
      description: "Category description test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoryRepositoryInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty("id");
  });

  it("Shoudl not be able to create a category that already exists", async () => {
    expect(async () => {
      const category = {
        name: "Category name test",
        description: "Category description test",
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
