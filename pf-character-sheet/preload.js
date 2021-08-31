window.addEventListener("DOMContentLoaded", () =>
{
    const setFrameworkVersion = (elementId, versionString) =>
    {
        if(elementId === null || elementId === undefined)
        {
            throw new Error(`Cannot set framework version, elementId is ${elementId === null ? "null" : "undefined"}.`);
        }

        const element = document.getElementById(elementId)

        if(element === null || element === undefined)
        {
            throw new Error(`Cannot set framework version, elementId ${elementId} doesn't identify an element in the DOM.`);
        }

        element.innerText = versionString;
    }

    setFrameworkVersion('node-version', process.versions['node']);
    setFrameworkVersion('chrome-version', process.versions['chrome']);
    setFrameworkVersion('electron-version', process.versions['electron']);
})