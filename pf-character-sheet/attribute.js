export class Attribute
{
    constructor(name, score)
    {
        console.log("attribute score:", name, "=", score);

        this.name = name;
        this.score = score;
    }

    get modifier()
    {
        return this.calculateModifier();
    }

    calculateModifier()
    {
        if(this.score === 0)
        {
            return null;
        }

        // divide first to deal with negative modifiers
        return Math.floor(this.score / 2) - 5;
    }
}