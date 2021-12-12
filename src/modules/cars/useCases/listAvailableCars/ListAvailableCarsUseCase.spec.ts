import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "car_brand",
      category_id: "category_id",
      daily_rate: 110.0,
      description: "Car description",
      fine_amount: 40.0,
      license_plate: "DEF-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("sould be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "car_brand_test",
      category_id: "category_id",
      daily_rate: 110.0,
      description: "Car description",
      fine_amount: 40.0,
      license_plate: "DEF-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("sould be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "car_brand_test",
      category_id: "category_id",
      daily_rate: 110.0,
      description: "Car description",
      fine_amount: 40.0,
      license_plate: "DEF-1235",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });

    expect(cars).toEqual([car]);
  });

  it("sould be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      brand: "car_brand_test",
      category_id: "12345",
      daily_rate: 110.0,
      description: "Car description",
      fine_amount: 40.0,
      license_plate: "DEF-1236",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
