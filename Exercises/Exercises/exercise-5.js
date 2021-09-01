class Refrigerator{
    constructor()
    {
        this.store = [];
    }

    putFood(food)
    {
        this.store.push(food);
    }

    getAndEatFood(foodType)
    {
        let matchingFood = this.store.find(foodElement =>
            {
                if(foodElement.type === foodType)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });
            if(matchingFood == undefined)
            {
                console.log('Sorry no such food in the refrigerator!');
                return;
            }

            console.log(matchingFood);
    }

    getContents()
    {
        console.log('----------');
        this.store.forEach(element => {
            console.log('| ' + element.type + ' ' + element.quantity);
        })
        console.log('----------');
    }
}

class food{
    constructor(type, quantity)
    {
        this.type = type;
        this.quantity = quantity;
    }
}

let r = new Refrigerator();

let apple = new food('apple', 2);

let banana = new food('banana', 3);

r.putFood(apple);
r.putFood(banana);
r.getContents();
r.getAndEatFood('apple');
r.getAndEatFood('apple');
r.getAndEatFood('banana');
r.getAndEatFood('apple');
r.getAndEatFood('bread');
r.getContents();