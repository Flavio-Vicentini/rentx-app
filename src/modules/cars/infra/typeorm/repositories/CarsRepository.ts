import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/IcarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async listAllAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carQuery = await this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (name) {
      carQuery.andWhere("car.name =:name", { name });
    }
    if (brand) {
      carQuery.andWhere("car.brand =:brand", { brand });
    }
    if (category_id) {
      carQuery.andWhere("car.category_id =:category_id", { category_id });
    }
    const cars = carQuery.getMany();
    return cars;
  }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }
}

export { CarsRepository };
