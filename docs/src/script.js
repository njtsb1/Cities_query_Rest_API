const cities = {
  "Barra do Turvo": { lat: -24.7564, lon: -48.5047 },
  "Cajati": { lat: -24.7356, lon: -48.1219 },
  "Cananéia": { lat: -25.0150, lon: -47.9270 },
  "Eldorado": { lat: -24.5200, lon: -48.1100 },
  "Iguape": { lat: -24.7080, lon: -47.5560 },
  "Ilha Comprida": { lat: -24.7400, lon: -47.5300 },
  "Itariri": { lat: -24.2890, lon: -47.1740 },
  "Jacupiranga": { lat: -24.6930, lon: -48.0020 },
  "Juquiá": { lat: -24.3208, lon: -47.6347 },
  "Miracatu": { lat: -24.2877, lon: -47.4604 },
  "Pariquera-Açu": { lat: -24.7100, lon: -47.8800 },
  "Pedro de Toledo": { lat: -24.2750, lon: -47.2330 },
  "Registro": { lat: -24.4800, lon: -47.8400 },
  "Sete Barras": { lat: -24.3880, lon: -47.9260 }
};

/* ====== Translations ====== */
const i18n = {
  en: {
    title: "Distance Calculator",
    calcTitle: "Distance Calculator",
    from: "From",
    to: "To",
    calculate: "Calculate",
    swap: "Swap",
    notesSummary: "Notes",
    notesText: "Distances are calculated using the Haversine formula between city coordinates. Values are approximate and is intended for demonstration purposes only - it is not suitable for navigation or precise routing.",
    citiesIncluded: "Cities included",
    resultText: (a, b, km) => `${a} → ${b}: ${km} km`,
    themeDark: "Dark mode",
    themeLight: "Light mode"
  },
  pt: {
    title: "Calculadora de Distância",
    calcTitle: "Calculadora de Distância",
    from: "De",
    to: "Para",
    calculate: "Calcular",
    swap: "Trocar",
    notesSummary: "Observações",
    notesText: "Distâncias calculadas pela fórmula de Haversine entre coordenadas. Valores aproximados e destina-se apenas a fins de demonstração - não servem para navegação ou roteamento preciso",
    citiesIncluded: "Cidades incluídas",
    resultText: (a, b, km) => `${a} → ${b}: ${km} km`,
    themeDark: "Modo escuro",
    themeLight: "Modo claro"
  },
  es: {
    title: "Calculadora de Distancia",
    calcTitle: "Calculadora de Distancia",
    from: "Desde",
    to: "Hasta",
    calculate: "Calcular",
    swap: "Intercambiar",
    notesSummary: "Notas",
    notesText: "Distancias calculadas con la fórmula de Haversine entre coordenadas. Valores aproximados y está destinado únicamente a fines de demostración; no es adecuado para la navegación ni para el trazado de rutas precisas.",
    citiesIncluded: "Ciudades incluidas",
    resultText: (a, b, km) => `${a} → ${b}: ${km} km`,
    themeDark: "Modo oscuro",
    themeLight: "Modo claro"
  }
};

/* ====== DOM Elements ====== */
const cityA = document.getElementById('cityA');
const cityB = document.getElementById('cityB');
const calcBtn = document.getElementById('calcBtn');
const swapBtn = document.getElementById('swapBtn');
const resultEl = document.getElementById('result');
const cityListEl = document.getElementById('cityList');
const langSelect = document.getElementById('lang');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

/* ====== Initialization ====== */
let currentLang = 'en';
let isDark = true; // default dark

function populateCitySelects() {
  const names = Object.keys(cities).sort((a,b)=>a.localeCompare(b));
  cityA.innerHTML = '';
  cityB.innerHTML = '';
  names.forEach((name, idx) => {
    const optA = document.createElement('option');
    optA.value = name;
    optA.textContent = name;
    cityA.appendChild(optA);

    const optB = document.createElement('option');
    optB.value = name;
    optB.textContent = name;
    cityB.appendChild(optB);
  });
  // default selection
  cityA.selectedIndex = 0;
  cityB.selectedIndex = 1;
}

function populateCityList() {
  cityListEl.innerHTML = '';
  Object.keys(cities).sort((a,b)=>a.localeCompare(b)).forEach(name=>{
    const li = document.createElement('li');
    li.textContent = name;
    cityListEl.appendChild(li);
  });
}

/* ====== Haversine formula ====== */
function toRad(deg){ return deg * Math.PI / 180; }

function haversine(a, b){
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat/2);
  const sinDLon = Math.sin(dLon/2);
  const aa = sinDLat*sinDLat + Math.cos(lat1)*Math.cos(lat2)*sinDLon*sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
  return R * c;
}

/* ====== UI actions ====== */
function calculateDistance(e){
  e && e.preventDefault();
  const aName = cityA.value;
  const bName = cityB.value;
  if(!aName || !bName){ return; }
  if(aName === bName){
    resultEl.textContent = i18n[currentLang].resultText(aName, bName, "0.00");
    return;
  }
  const a = cities[aName];
  const b = cities[bName];
  const km = haversine(a,b);
  resultEl.textContent = i18n[currentLang].resultText(aName, bName, km.toFixed(2));
}

function swapCities(){
  const aIdx = cityA.selectedIndex;
  const bIdx = cityB.selectedIndex;
  cityA.selectedIndex = bIdx;
  cityB.selectedIndex = aIdx;
  calculateDistance();
}

/* ====== Theme toggle ====== */
function updateTheme(){
  document.body.classList.toggle('theme-dark', isDark);
  if(isDark){
    document.documentElement.classList.remove('light');
    themeIcon.innerHTML = `<svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
    themeLabel.textContent = i18n[currentLang].themeDark;
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    document.documentElement.classList.add('light');
    themeIcon.innerHTML = `<svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.03-2.03l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM20 11v2h3v-2h-3zM4.22 19.78l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>`;
    themeLabel.textContent = i18n[currentLang].themeLight;
    themeToggle.setAttribute('aria-pressed','false');
  }
}

/* ====== Language switch ====== */
function applyLanguage(){
  const t = i18n[currentLang];
  document.title = t.title;
  document.getElementById('calcTitle').textContent = t.calcTitle;
  document.querySelector('label[for="cityA"]').textContent = t.from;
  document.querySelector('label[for="cityB"]').textContent = t.to;
  calcBtn.textContent = t.calculate;
  swapBtn.textContent = t.swap;
  document.querySelector('.notes summary').textContent = t.notesSummary;
  document.querySelector('.notes p').textContent = t.notesText;
  document.getElementById('legendTitle').textContent = t.citiesIncluded;
  // theme label
  themeLabel.textContent = isDark ? t.themeDark : t.themeLight;
  // update result text if present
  if(resultEl.textContent){
    // try to parse existing selection
    calculateDistance();
  }
}

/* ====== Event listeners ====== */
document.addEventListener('DOMContentLoaded', () => {
  populateCitySelects();
  populateCityList();
  applyLanguage();
  updateTheme();
});

document.getElementById('distanceForm').addEventListener('submit', calculateDistance);
swapBtn.addEventListener('click', swapCities);

langSelect.addEventListener('change', (e)=>{
  currentLang = e.target.value;
  applyLanguage();
});

themeToggle.addEventListener('click', ()=>{
  isDark = !isDark;
  updateTheme();
});

/* Keyboard accessibility: Enter on swap when focused */
swapBtn.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    swapCities();
  }
});
