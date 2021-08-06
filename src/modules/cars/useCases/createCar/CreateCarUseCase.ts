import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

class CreateCarUseCase {
  constructor(private carsRepository: CarsRepositoryInMemory) {}
  async execute({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );
    if (carAlreadyExists) {
      throw new AppError("Car already exists");
    }
    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });
    return car;
  }
}

export { CreateCarUseCase };
