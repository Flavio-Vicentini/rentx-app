import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Description name",
      brand: "Car brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 500,
      license_plate: "AFC-2513",
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with the same license plate", async () => {
    await createCarUseCase.execute({
      name: "Car name 01",
      description: "Description name",
      brand: "Car brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 500,
      license_plate: "1234-ABC",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car name 02",
        description: "Description name",
        brand: "Car brand",
        category_id: "category",
        daily_rate: 100,
        fine_amount: 500,
        license_plate: "1234-ABC",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });
  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description name",
      brand: "Car brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 500,
      license_plate: "12345-ABC",
    });
    expect(car.available).toBe(true);
  });
});
