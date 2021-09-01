let car = new Object();
car.model = "S60";
car.manufacturer = "Volvo";
car.type = "sedan";

let secondCar = {
    manufacturer: "volvo",
    type: "estate",
    model: "XC70"
};

secondCar.registrationYear = 2000;

console.log(car.manufacturer);
console.log(car.model);
console.log(secondCar['manufacturer']);
console.log(secondCar['registrationYear']);

for (const i in secondCar) {
    console.log(i);   
}