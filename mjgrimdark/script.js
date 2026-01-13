const quotes = [
  "Il n’y a pas de paix parmi les étoiles.",
  "La foi est une arme plus tranchante que n’importe quelle lame.",
  "La corruption commence toujours par un compromis.",
  "L’ignorance est une bénédiction.",
  "La survie exige le sacrifice.",
];

let campaignState = {
  factions: [],
  intrigue: null,
  pnjs: [],
  evolutionStage: 0,
};

// =====================
// TABLES ALEATOIRES
// =====================

// Missions
const missionObjectives = [
  "Éliminer une menace hérétique",
  "Récupérer un artefact interdit",
  "Protéger une cible impériale",
  "Enquêter sur une disparition inquiétante",
  "Empêcher un rituel blasphématoire",
];

const missionLocations = [
  "dans une cité-ruche en décomposition",
  "au cœur d’un complexe industriel abandonné",
  "sur une planète-frontière hostile",
  "dans un sanctuaire impérial profané",
  "à bord d’un vaisseau dérivant dans le vide",
];

const missionComplications = [
  "mais le temps presse",
  "mais un traître est parmi les alliés",
  "mais les autorités locales mentent",
  "mais une entité inconnue observe",
  "mais la corruption se propage rapidement",
];

// PNJ
const pnjRoles = [
  "Inquisiteur",
  "Officier impérial",
  "Prêtre fanatique",
  "Mercenaire endurci",
  "Noble déchu",
];

const pnjTraits = [
  "paranoïaque",
  "fanatiquement loyal",
  "brisée psychologiquement",
  "froid et calculateur",
  "instable et imprévisible",
];

const pnjSecrets = [
  "cache une hérésie indicible",
  "travaille secrètement pour un culte",
  "est possédé par une entité obscure",
  "a causé la mort de milliers d’innocents",
  "prépare une trahison imminente",
];

// =====================
// FACTIONS & MENACES
// =====================

const factionNames = [
  "Les Cendres du Trône",
  "L’Œil du Dogme",
  "La Chair Éveillée",
  "Les Porteurs du Sceau",
  "La Confrérie du Silence",
];

const factionTypes = [
  "culte hérétique",
  "ordre fanatique",
  "secte techno-dépravée",
  "cellule rebelle infiltrée",
  "organisation impériale corrompue",
];

const factionGoals = [
  "renverser l’autorité locale",
  "éveiller une entité interdite",
  "contrôler un artefact ancien",
  "purger la population jugée impure",
  "provoquer une guerre civile",
];

const factionMethods = [
  "infiltration lente",
  "terrorisme rituel",
  "manipulation religieuse",
  "assassinats ciblés",
  "sacrifices de masse",
];

const factionThreats = [
  "une insurrection imminente",
  "une contamination incontrôlable",
  "une trahison interne",
  "un rituel proche de l’achèvement",
  "une intervention impériale brutale",
];

// =====================
// INTRIGUES
// =====================

const intrigueStakes = [
  "le contrôle d’un monde-clé",
  "la survie d’un secteur entier",
  "la révélation d’une hérésie ancienne",
  "l’effondrement de l’autorité impériale",
  "l’éveil d’une horreur indicible",
];

const intrigueConsequences = [
  "une purge impériale massive est déclenchée",
  "la corruption devient irréversible",
  "une guerre ouverte éclate",
  "les PJ sont déclarés hérétiques",
  "le système tombe dans le chaos total",
];

// =====================
// CULTES & HORREURS
// =====================

const horrorEntities = [
  "une entité affamée hors du réel",
  "un ancien esprit-machine corrompu",
  "un ange déchu de la foi impériale",
  "une conscience collective mutante",
  "une présence qui murmure dans le Warp",
];

const horrorSigns = [
  "des visions partagées",
  "des mutations spontanées",
  "des miracles sanglants",
  "des voix entendues en rêve",
  "des symboles gravés dans la chair",
];

const horrorWorship = [
  "sacrifices humains",
  "rites de purification extrêmes",
  "automutilation rituelle",
  "consommation de reliques",
  "prières continues jusqu’à la mort",
];

// =====================
// EVOLUTION DES MENACES
// =====================

const evolutionStages = [
  "La menace est ignorée et gagne en influence.",
  "Des incidents isolés deviennent fréquents.",
  "La population commence à paniquer.",
  "Les autorités réagissent violemment.",
  "La situation échappe totalement à tout contrôle.",
];

// =====================
// SAUVEGARDE LOCALE
// =====================

function saveData() {
  localStorage.setItem("pj", document.getElementById("pj-display").innerHTML);
  localStorage.setItem("journal", JSON.stringify(journalEntries));
}

function loadData() {
  const savedPJ = localStorage.getItem("pj");
  const savedJournal = localStorage.getItem("journal");

  if (savedPJ) {
    document.getElementById("pj-display").innerHTML = savedPJ;
  }

  if (savedJournal) {
    journalEntries = JSON.parse(savedJournal);
    renderJournal();
  }
}

// =====================
// OUTILS
// =====================

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// =====================
// GENERATEURS
// =====================

function generateMission() {
  const objective = randomFrom(missionObjectives);
  const location = randomFrom(missionLocations);
  const complication = randomFrom(missionComplications);

  const text = `${objective} ${location}, ${complication}.`;

  document.getElementById(
    "mission"
  ).innerHTML = `<div class="result-block">${text}</div>`;
  flashPanel("missions");
}

function generatePNJ() {
  if (campaignState.factions.length < 2) {
    alert("Génère d’abord les deux factions.");
    return;
  }

  const role = randomFrom(pnjRoles);
  const trait = randomFrom(pnjTraits);
  const secret = randomFrom(pnjSecrets);

  const faction = randomFrom(campaignState.factions);

  const pnj = {
    role,
    trait,
    secret,
    affiliation: faction.name,
    side: faction.side,
  };

  campaignState.pnjs.push(pnj);
  saveCampaign();

  document.getElementById("pnj").innerHTML = `
    <div class="result-block">
      <p><strong>Rôle :</strong> ${pnj.role}</p>
      <p><strong>Trait :</strong> ${pnj.trait}</p>
      <p><strong>Secret :</strong> ${pnj.secret}</p>
      <p><strong>Affiliation :</strong> ${pnj.affiliation}</p>
    </div>
  `;
  renderPNJs();
  flashPanel("pnj");
}

// =====================
// DES
// =====================

function rollDice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  document.getElementById("dice").textContent = `Résultat : ${result}`;
}

// =====================
// FICHE PJ
// =====================

function createPJ() {
  const name = document.getElementById("pj-name").value;
  const role = document.getElementById("pj-role").value;
  const gear = document.getElementById("pj-gear").value;
  const state = document.getElementById("pj-state").value;
  const notes = document.getElementById("pj-notes").value;

  const display = `
    <h3>${name}</h3>
    <p><strong>Rôle :</strong> ${role}</p>
    <p><strong>Équipement :</strong><br>${gear}</p>
    <p><strong>État :</strong><br>${state}</p>
    <p><strong>Notes :</strong><br>${notes}</p>
    <hr>
  `;

  document.getElementById("pj-display").innerHTML = display;
  saveData();
}

// =====================
// JOURNAL DE CAMPAGNE
// =====================

let journalEntries = [];

function addLog() {
  const title = document.getElementById("log-title").value;
  const content = document.getElementById("log-content").value;
  const date = new Date().toLocaleDateString();

  if (!title || !content) return;

  const entry = {
    title,
    content,
    date,
  };

  journalEntries.unshift(entry);
  renderJournal();
  saveData();

  document.getElementById("log-title").value = "";
  document.getElementById("log-content").value = "";
  flashPanel("journal");
}

function renderJournal() {
  const container = document.getElementById("log-display");
  container.innerHTML = "";

  journalEntries.forEach((entry) => {
    const block = `
  <div class="result-block">
    <h3>${entry.title}</h3>
    <small>${entry.date}</small>
    <p>${entry.content}</p>
  </div>
`;

    container.innerHTML += block;
  });
  flashPanel("journal");
}

// =====================
// CHARGEMENT AU DEMARRAGE
// =====================

// =====================
// SAUVEGARDE CAMPAGNE
// =====================

function saveCampaign() {
  localStorage.setItem("campaignState", JSON.stringify(campaignState));
}

function loadCampaign() {
  const saved = localStorage.getItem("campaignState");

  if (saved) {
    campaignState = JSON.parse(saved);
  }
}

// =====================
// NAVIGATION
// =====================

function showPanel(id) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none";
  });

  document.getElementById(id).style.display = "block";
}

// Affiche le premier onglet au démarrage
showPanel("missions");
function displayQuote() {
  const quote = randomFrom(quotes);
  document.getElementById("quote").textContent = `"${quote}"`;
}

function flashPanel(id) {
  const panel = document.getElementById(id);
  panel.style.boxShadow = "0 0 15px rgba(160,0,0,0.6)";
  setTimeout(() => {
    panel.style.boxShadow = "none";
  }, 400);
}

function generateFaction() {
  if (campaignState.factions.length >= 2) {
    alert("Deux factions suffisent pour cette campagne.");
    return;
  }

  const faction = {
    name: randomFrom(factionNames),
    type: randomFrom(factionTypes),
    goal: randomFrom(factionGoals),
    method: randomFrom(factionMethods),
    threat: randomFrom(factionThreats),
  };

  faction.side =
    campaignState.factions.length === 0 ? "Protagoniste" : "Antagoniste";

  campaignState.factions.push(faction);
  saveCampaign();

  renderFactions(); // ← OBLIGATOIRE
  renderOverview();
  flashPanel("factions");
  showPanel("factions"); // ← OBLIGATOIRE
}

function renderFactions() {
  const container = document.getElementById("faction");
  if (!container) return;

  container.innerHTML = "";

  campaignState.factions.forEach((faction, index) => {
    container.innerHTML += `
      <div class="result-block ${
        faction.side === "Protagoniste" ? "protagonist" : "antagonist"
      }">
        <h3>Faction ${index + 1} — ${faction.name}</h3>
        <p><strong>Rôle :</strong> ${faction.side}</p>
        <p><strong>Nature :</strong> ${faction.type}</p>
        <p><strong>Objectif :</strong> ${faction.goal}</p>
        <p><strong>Méthodes :</strong> ${faction.method}</p>
        <p><strong>Menace :</strong> ${faction.threat}</p>
      </div>
    `;
  });
}

function generateIntrigue() {
  if (campaignState.intrigue !== null) {
    alert("Une intrigue est déjà active pour cette campagne.");
    return;
  }

  const intrigue = {
    factionA: randomFrom(campaignState.factions),
    factionB: randomFrom(campaignState.factions),
    stake: randomFrom(intrigueStakes),
    consequence: randomFrom(intrigueConsequences),
  };

  campaignState.intrigue = intrigue;
  saveCampaign();

  document.getElementById("intrigue").innerHTML = `
    <div class="result-block">
      <p><strong>Enjeu :</strong> ${intrigue.stake}</p>
      <p><strong>Conséquence :</strong> ${intrigue.consequence}</p>
    </div>
  `;

  showPanel("intrigues");
}

function generateHorror() {
  const entity = randomFrom(horrorEntities);
  const sign = randomFrom(horrorSigns);
  const worship = randomFrom(horrorWorship);

  const text = `
    <div class="result-block">
      <p><strong>Horreur vénérée :</strong> ${entity}</p>
      <p><strong>Signes :</strong> ${sign}</p>
      <p><strong>Pratiques :</strong> ${worship}</p>
    </div>
  `;

  document.getElementById("horror").innerHTML = text;
  flashPanel("horreurs");
}

let evolutionIndex = 0;

function generateEvolution() {
  if (evolutionIndex >= evolutionStages.length) {
    evolutionIndex = 0;
  }

  const text = `
    <div class="result-block">
      <p>${evolutionStages[evolutionIndex]}</p>
    </div>
  `;

  document.getElementById("evolution-result").innerHTML = text;
  evolutionIndex++;
  flashPanel("evolution");
}

window.onload = function () {
  loadCampaign();
  loadData();
  displayQuote();
  renderFactions();
  renderPNJs();
  renderOverview();
};

function renderOverview() {
  const container = document.getElementById("overview-content");
  if (!container) return;

  container.innerHTML = "";

  // --- Intrigue ---
  if (!campaignState.intrigue) {
    container.innerHTML += `
      <div class="result-block ${
        faction.side === "Protagoniste" ? "protagonist" : "antagonist"
      }">
        <p><em>Aucune intrigue active.</em></p>
      </div>
    `;
    return;
  }

  const intrigue = campaignState.intrigue;

  container.innerHTML += `
    <div class="result-block">
      <h3>Intrigue centrale</h3>
      <p><strong>Enjeu :</strong> ${intrigue.stake}</p>
      <p><strong>Conséquence en cas d’échec :</strong> ${intrigue.consequence}</p>
    </div>
  `;

  // --- Factions ---
  campaignState.factions.forEach((faction) => {
    const pnjs = campaignState.pnjs.filter(
      (p) => p.affiliation === faction.name
    );

    container.innerHTML += `
      <div class="result-block ${
        faction.side === "Protagoniste" ? "protagonist" : "antagonist"
      }">
        <h3>${faction.side} — ${faction.name}</h3>
        <p><strong>Nature :</strong> ${faction.type}</p>
        <p><strong>Objectif :</strong> ${faction.goal}</p>
        <p><strong>Méthodes :</strong> ${faction.method}</p>
        <p><strong>Menace :</strong> ${faction.threat}</p>

        <p><strong>PNJ :</strong></p>
        ${
          pnjs.length > 0
            ? pnjs.map((p) => `<p>- ${p.role} (${p.trait})</p>`).join("")
            : "<p><em>Aucun PNJ connu</em></p>"
        }
      </div>
    `;
  });

  // --- Évolution ---
  if (campaignState.evolutionStage !== undefined) {
    container.innerHTML += `
      <div class="result-block">
        <h3>État de la menace</h3>
        <p>Stade actuel : ${campaignState.evolutionStage}</p>
      </div>
    `;
  }
}

function showPanel(id) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none";
  });

  document.getElementById(id).style.display = "block";

  if (id === "overview") {
    renderOverview();
  }
}

function resetCampaign() {
  if (!confirm("Réinitialiser toute la campagne ?")) return;

  campaignState = {
    intrigue: null,
    factions: [],
    pnjs: [],
    evolutionStage: 0,
  };

  localStorage.removeItem("campaignState");

  // Nettoyage visuel
  document.getElementById("faction").innerHTML = "";
  document.getElementById("intrigue").innerHTML = "";
  document.getElementById("pnj").innerHTML = "";
  document.getElementById("overview-content").innerHTML = "";
  document.getElementById("evolution-result").innerHTML = "";

  alert("Nouvelle campagne créée. Tu peux recommencer proprement.");
}

function renderPNJs() {
  const container = document.getElementById("pnj-list");
  if (!container) return;

  container.innerHTML = "";

  campaignState.pnjs.forEach((pnj, index) => {
    container.innerHTML += `
      <div class="result-block">
        <h3>PNJ ${index + 1}</h3>
        <p><strong>Rôle :</strong> ${pnj.role}</p>
        <p><strong>Trait :</strong> ${pnj.trait}</p>
        <p><strong>Secret :</strong> ${pnj.secret}</p>
        <p><strong>Affiliation :</strong> ${pnj.affiliation}</p>
        <p><strong>Camp :</strong> ${pnj.side}</p>
      </div>
    `;
  });
}
