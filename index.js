const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2503-ftb-et-web-pt/events';
const body = document.body;
const appDiv = document.querySelector("#app");
const viewPrompt = document.createElement("h2");
const upcomingTitle = document.createElement("h1")
const plannerTitle = document.createElement("h1")

viewPrompt.textContent = "Please select an option above to view more about the selected event.";
upcomingTitle.textContent = "Upcoming Parties"
plannerTitle.textContent = "Pary Planner"
plannerTitle.style.textAlign = "center"
body.prepend(upcomingTitle)
body.prepend(plannerTitle)
body.append(viewPrompt);

const state = {
    parties: [],
    expandedPartyDiv: null
};

async function getParties() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        state.parties = data.data;
    } catch (e) {
        console.error(e);
        viewPrompt.textContent = "Failed to load events.";
    }
}

function displayParty(event) {
    const partyDiv = document.createElement("div");
    partyDiv.className = "partyDiv";
    partyDiv.innerHTML = `
    <h3 style="cursor:pointer">${event.name}</h3>
    `;

    const detailTitle = document.createElement("h4");
    detailTitle.textContent = "Party Details:";
    detailTitle.style.display = "none";

    const id = document.createElement("p");
    id.textContent = `ID: ${event.id}`;
    id.style.display = "none";

    const date = document.createElement("p");
    date.textContent = `Date: ${event.date}`;
    date.style.display = "none";

    const descript = document.createElement("p");
    descript.textContent = `Description: ${event.description}`;
    descript.style.display = "none";

    

    const selected = partyDiv.querySelector("h3")
    selected.addEventListener("click", () => {
        const isHidden = descript.style.display === "none";
        
        if (isHidden && !state.expandedPartyDiv) {
            selected.style.backgroundColor = "lightblue"
            selected.append(detailTitle, id, date, descript);
            viewPrompt.style.display = "none";
            detailTitle.style.display = "block";
            descript.style.display = "block";
            date.style.display = "block";
            id.style.display = "block";
            state.expandedPartyDiv = partyDiv;
        } else if (!isHidden && state.expandedPartyDiv === partyDiv) {
            selected.style.backgroundColor = "transparent"
            viewPrompt.style.display = "block";
            detailTitle.style.display = "none";
            descript.style.display = "none";
            date.style.display = "none";
            id.style.display = "none";
            state.expandedPartyDiv = null;
            state.expandedPartyDiv = null;
        }
    });

    return partyDiv;
}

function renderParties() {
    const partyHolders = state.parties.map(displayParty);
    appDiv.replaceChildren(...partyHolders);
}

async function init() {
    await getParties();
    renderParties();
}

init();
