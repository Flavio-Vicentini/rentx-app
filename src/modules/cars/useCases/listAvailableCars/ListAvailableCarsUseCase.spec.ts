import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      brand: "Car",
      category_id: "category",
      daily_rate: 150,
      fine_amount: 30,
      license_plate: "JKT-1234",
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description2",
      brand: "Brand Car Test",
      category_id: "category",
      daily_rate: 150,
      fine_amount: 30,
      license_plate: "JKT-1235",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description3",
      brand: "Brand Car Test",
      category_id: "category",
      daily_rate: 150,
      fine_amount: 30,
      license_plate: "JKT-1236",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand Car Test",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description4",
      brand: "Brand",
      category_id: "category test",
      daily_rate: 150,
      fine_amount: 30,
      license_plate: "JKT-1237",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category test",
    });
    expect(cars).toEqual([car]);
  });
});
