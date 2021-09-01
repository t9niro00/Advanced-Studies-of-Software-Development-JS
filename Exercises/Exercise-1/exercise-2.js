function Animal(type, speed, isCute)
{
    this.type = type;
    this.speed = speed;
    this.isCute = isCute;
    this.makeSound = function() {
        if(this.type === 'Cat')
        {
            console.log("meoww");
        }
        else
        {
            console.log("rawwwwr")
        }
    }
}

let fruit =
{
    delicious: true,
    peelable: false,
}
let alligator = new Animal('Alligator', 2, false);

let cat = new Animal('Cat', 5, true);

console.log(alligator.type);
console.log(cat.type);
alligator.makeSound();
cat.makeSound();

for(const i in fruit){
    console.log(i + ": " + fruit[i]);
}

////////////////////////////////////////////////////////

function Car(type, model, year)
{
    this.type = type;
    this.model = model;
    this.year = year;
}

let Mercedes = new Car('Mercedes', "E220d", 2001);
let Audi = new Car("Audi", "A1", 2002);

for (const i in Mercedes) {
    console.log(i + ": " + Mercedes[i]);
}

for (const i in Audi) {
    console.log(i + ": " + Audi[i]);
}

//////////////////////////////////////////////////////


