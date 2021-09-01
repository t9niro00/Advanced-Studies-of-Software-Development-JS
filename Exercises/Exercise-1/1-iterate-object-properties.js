let vehicle = new Object();
let person = new Object();


vehicle =
{
    type: "truck",
    tireCount: "6",
    capacity: "5 tons"
};

for (const i in vehicle)
{
    console.log(`${i}: ${vehicle[i]}`);
}

person = 
{
    name: "Roope",
    sex: "male",
    birthday: "29th",
    profession: "student"
};

for (const i in person)
{
    console.log(i + ": " + person[i]);
}