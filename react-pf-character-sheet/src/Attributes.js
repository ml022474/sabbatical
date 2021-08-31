import React from "react";

export const attributeIds = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export class Attributes extends React.Component
{
    render()
    {
        return (
            <div>
                <label for="attributes">Attributes:</label>
                <form>
                    {attributeIds.map(curAttributeId => <Attribute id={curAttributeId} />)}
                </form>
            </div>);
    }
}

class Attribute extends React.Component
{
    constructor(props)
    {
        super(props);

        this.id = props.id;

        const modifier = this.calculateModifier(props.score);

        this.state =
        {
            score: props.score,
            modifier: modifier
        }
    }

    calculateModifier = (newScore) =>
    {
        // divide first to deal with negative modifiers
        return Math.floor(newScore / 2) - 5;
    }

    onUpdateScore = (event) =>
    {
        const newScore = event.target.value;
        const newModifier = this.calculateModifier(newScore);

        this.setState(
            {
                score: newScore,
                modifier: newModifier
            });
    }

    render()
    {
        const lowerCaseAttributeId = this.props.id.toLowerCase();

        return (
            <div>
                <label for={lowerCaseAttributeId}>{this.props.id}</label>
                <input id={lowerCaseAttributeId + "-score"} type="number" min={0} max={99} required value={this.state.score} onChange={this.onUpdateScore} placeholder={0}/>
                <input id={lowerCaseAttributeId + "-modifier"} type="number" readOnly value={this.state.modifier}/>
            </div>);
    }
}