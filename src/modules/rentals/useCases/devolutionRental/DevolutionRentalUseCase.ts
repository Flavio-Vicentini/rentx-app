import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/IcarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const minimun_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }
    if (rental.end_date) {
      throw new AppError("The car has already been returned.");
    }
    const car = await this.carsRepository.findById(rental.car_id);
    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimun_daily;
    }
    const delayDays = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );
    let total = 0;

    if (delayDays > 0) {
      const calculate_fine = delayDays * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;
    rental.total = total;
    rental.end_date = this.dateProvider.dateNow();

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailableCar(car.id, true);
    return rental;
  }
}

export { DevolutionRentalUseCase };
