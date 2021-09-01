/*function newCar(brand, registration)
{
    this.brand = brand;
    this.registration = registration; 
    this.speed = 0;
    this.increaseSpeed = function()
    {
        this.speed += 5;        
    }
    this.displaySpeed = function()
    {
        console.log(this.registration + ", speed: "  + this.speed);
    }
}

let BMW = new newCar("BMW", "ABC-123");

BMW.displaySpeed();
BMW.increaseSpeed();
BMW.displaySpeed();
*/

class newCar {
    constructor(brand, registration) {
    this.brand = brand;
    this.registration = registration; 
    this.speed = 0;
    }

    displaySpeed() {
        console.log(this.speed);
    }

    increaseSpeed() {
        this.speed += 5;
    }
}

let BMW = new newCar("BMW", "ABC-123");

BMW.displaySpeed();
BMW.increaseSpeed();
BMW.displaySpeed();