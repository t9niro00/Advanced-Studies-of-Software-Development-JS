class Refrigerator{
    constructor()
    {
        this.store = [];
    }

    putFood(food)
    {
        this.store.push(food);
    }

    getAndEatFood(foodName) {
        let searchedFoodIdx = this.store.findIndex(function (food) {
          if(food.type === foodName) {
            return true;
          }
          else {
            return false;
          }
        });
    
        if(searchedFoodIdx == -1) {
          console.log('Sorry, no such food in this refrigerator!');
          return;
        }
    
        this.store[searchedFoodIdx].eatOne();
        if(this.store[searchedFoodIdx].getQty() == 0)
        {
          this.store.splice(searchedFoodIdx, 1);
        }
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

    whatIsThis()
    {
        return this.type;
    }

    eatOne()
    {
        if(this.quantity > 0)
        {
            this.quantity--;
            console.log(this.type + " " + this.quantity + " remaining.");
        }
        else
        {
            console.log('Sorry, no more ' + this.type + " remaining.");
        }
    }

    getQty()
    {
        return this.quantity;
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
r.getContents();