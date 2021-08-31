import React from "react";
import { attributeIds } from "./Attributes";

export class Attacks extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            //attacks: props.attacks ?? []
            attacks: [
                {
                    attackName: "testing"
                }
            ]
        }
    }

    render()
    {
        return (
            <div>
                <label for="attacks">Attacks:</label>
                <form>
                    <table>
                        <tr>
                            <th>Attack name</th>
                            <th>Attack Att.</th>
                            <th>Attack Bonus</th>
                            <th>Damage Dice</th>
                            <th>+</th>
                            <th>Damage Att.</th>
                            <th>+</th>
                            <th>Damage</th>
                            <th>+</th>
                            <th>Non-crit Damage</th>
                            <th>Critical chance</th>
                            <th>Critical multiplier</th>
                            <th>Damage Types</th>
                            <th>Roll command</th>
                        </tr>
                        {this.state.attacks.map(curAttack => <Attack attack={curAttack} />)}
                    </table>
                </form>
            </div>);
    }
}

class Attack extends React.Component
{
    constructor(props)
    {
        super(props);

        const rollCommand = this.calculateRollCommand(props);

        this.state =
        {
            attackName: props.attackName,                                       // string
            attackAttribute: props.attackAttribute ?? attributeIds[0],          // string
            attackBonus: props.attackBonus,                                     // number
            damageDiceCount: props.damageDice,                                  // number
            damageDiceSize: props.damageDice,                                   // number
            damageAttributeMultiplier: props.damageAttributeMultiplier ?? 1,    // string
            damageAttribute: props.damageAttribute ?? attributeIds[0],          // string
            damageBonus: props.damageBonus,                                     // number
            nonCritDamageBonus: props.nonCritDamageBonus,                       // number
            criticalChance: props.criticalChance ?? 20,                         // number
            criticalMultiplier: props.criticalMultiplier ?? 2,                  // number
            damageTypes: props.damageTypes,                                     // string
            rollCommand: rollCommand
        };
    }

    calculateRollCommand(attack)
    {
        console.log("Calculating roll command for:", attack);

        return `${attack.attackName}: [[d20+${attack.attackAttribute}+${attack.attackBonus}]]
            Damage (${attack.damageTypes}): [[${attack.damageDiceCount}d${attack.damageDiceSize}+(${attack.damageAttributeMultiplier}*${attack.damageAttribute})]]
            TODO crit code`;
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input id="attack-name" name="attack-name" type="text" />
                </td>
                <td>
                    <select id="attack-to-hit-attribute" name="attack-to-hit-attribute">
                        <option value={attributeIds[0]}>{attributeIds[0]}</option>
                        <option value={attributeIds[1]}>{attributeIds[1]}</option>
                        <option value="none">N/A</option>
                    </select>
                </td>
                <td>
                    <input id="attack-to-hit-bonus" name="attack-to-hit-bonus" type="number" min={-99} max={99} />
                </td>
                <td>
                    <input id="attack-damage-dice-count" name="attack-damage-dice-count" type="number" min={0} max={99} />
                    <span>d</span>
                    <select id="attack-damage-dice-size" name="attack-damage-dice-size">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                    </select>
                </td>
                <td>
                    <span>+</span>
                </td>
                <td>
                    <select id="attack-damage-multiplier" name="attack-damage-multiplier">
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                    </select>
                    <span>x</span>
                    <select id="attack-damage-attribute" name="attack-damage-attribute">
                        <option value={attributeIds[0]}>{attributeIds[0]}</option>
                        <option value={attributeIds[1]}>{attributeIds[1]}</option>
                        <option value="none">N/A</option>
                    </select>
                </td>
                <td>
                    <span>+</span>
                </td>
                <td>
                    <input id="attack-damage-bonus" name="attack-damage-bonus" type="number" min={-99} max={99} />
                </td>
                <td>
                    <span>+</span>
                </td>
                <td>
                    <input id="attack-non-crit-damage-bonus" name="attack-non-crit-damage-bonus" type="number" min={-99} max={99} />
                </td>
                <td>
                    <input id="attack-crit-chance" name="attack-crit-chance" type="number" min={0} max={20} value={20} />
                </td>
                <td>
                    <span>x</span>
                    <select id="attack-crit-multiplier" name="attack-crit-multiplier">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </td>
                <td>
                    <input id="attack-damage-types" name="attack-damage-types" type="text" />
                </td>
                <td>
                    <input id="attack-roll-command" name="attack-roll-command" type="text" readOnly />
                </td>
            </tr>);
    }
}