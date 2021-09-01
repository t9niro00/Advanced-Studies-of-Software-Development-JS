class food{
    constructor(type, quantity)
    {
        this.type = type;
        this.quantity = quantity;
    }

    whatIsThis()
    {
        console.log(this.type);
    }

    eatOne()
    {
        this.quantity -= 1;

        if(this.quantity > 0)
        {
            console.log(this.quantity + " of bananas remaining!")
        }
        else
        {
            console.log("ALL OUT OF BANANA!")
        }
    }
}

let banana = new food('banana', 4);

banana.whatIsThis();
banana.eatOne();
banana.eatOne();
banana.eatOne();
banana.eatOne();