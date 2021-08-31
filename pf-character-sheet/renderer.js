import { Attribute } from "./attribute.js";

render();

function render()
{
    setUpAttributeEvents();
    setUpAttackEvents();
}

function setUpAttributeEvents()
{
    const attributes = ["str", "dex", "con", "int", "wis", "cha"];

    attributes.forEach(curAttributeName =>
        {
            const scoreElement = document.getElementById(`att-${curAttributeName}`);
            calculateAttributeModifier(scoreElement);

            scoreElement.addEventListener("change", event => calculateAttributeModifier(event.target))
        })
}

function attributeModifierUpdated(modifierElement)
{
    console.log(`${attributeModifierUpdated}(${modifierElement})`);

    const attackRows = document.getElementById("attacks-table").rows;
    
    // skip table header
    for(let attackRowIndex = 1; attackRowIndex < attackRows.length; attackRowIndex++)
    {
        const curAttackRow = attackRows[attackRowIndex];

        const toHitAttributeElement = document.getElementById(`${curAttackRow.id}-to-hit-attribute`);
        if(modifierElement.id.includes(toHitAttributeElement.value.toLowerCase()))
        {
            calculateAttackRollCommand(curAttackRow);
        }
    }
}

function calculateAttributeModifier(scoreElement)
{
    const attribute = new Attribute(scoreElement.name, +(scoreElement.value));

    const modifierElement = document.getElementById(`${scoreElement.name}-mod`);
    modifierElement.value = attribute.modifier;

    attributeModifierUpdated(modifierElement);
}

function setUpAttackEvents()
{
    const attackRows = document.getElementById("attacks-table").rows;

    // skip table header
    for(let attackRowIndex = 1; attackRowIndex < attackRows.length; attackRowIndex++)
    {
        const curAttackRow = attackRows[attackRowIndex];

        const attackNameElement = document.getElementById(`${curAttackRow.id}-name`);
        attackNameElement.addEventListener("change", () => calculateAttackRollCommand(curAttackRow));

        const toHitAttributeElement = document.getElementById(`${curAttackRow.id}-to-hit-attribute`);
        toHitAttributeElement.addEventListener("change", () => calculateAttackRollCommand(curAttackRow));
    }
}

function calculateAttackRollCommand(attackRow)
{
    console.log(attackRow);
    const attackName = document.getElementById(`${attackRow.id}-name`).value;
    
    // str/dex mod
    const attackAttribute = document.getElementById(`${attackRow.id}-to-hit-attribute`).value;
    const attackAttributeModElement = document.getElementById(`${attackAttribute.toLowerCase()}-mod`);
    if(!attackAttributeModElement.value)
    {
        attackAttributeModElement.value = 0;
    }

    // attack bonus
    const attackBonusElement = document.getElementById(`${attackRow.id}-to-hit-bonus`);
    if(!attackBonusElement.value)
    {
        attackBonusElement.value = 0;
    }

    // damage dice
    const damageDiceSizeElement = document.getElementById(`${attackRow.id}-damage-dice-size`);
    const damageDiceCountElement = document.getElementById(`${attackRow.id}-damage-dice-count`);
    if(!damageDiceCountElement.value)
    {
        damageDiceCountElement.value = 0;
    }

    // damage from attribute
    const damageMultiplierElement = document.getElementById(`${attackRow.id}-damage-multiplier`);
    const damageAttribute = document.getElementById(`${attackRow.id}-damage-attribute`).value;
    const damageAttributeModElement = document.getElementById(`${damageAttribute.toLowerCase()}-mod`);
    if(!damageAttributeModElement.value)
    {
        damageAttributeModElement.value = 0;
    }
    const damageFromAttribute = Math.floor(damageMultiplierElement.value * damageAttributeModElement.value);

    const rollCommandElement = document.getElementById(`${attackRow.id}-roll-command`);

    rollCommandElement.value =
        `${attackName}: [[d20+${attackAttributeModElement.value}+${attackBonusElement.value}]]
        Damage: [[${damageDiceCountElement.value}d${damageDiceSizeElement.value}+${damageFromAttribute}]]
        `;
}