let currentCrop = CROPS[0];
let currentLayer = "KH_DAT";
let currentGroup = "all";
let mainMap, heroMap, suitabilityLayer;

const bounds = [[20.55,106.25],[21.65,108.15]];
const samplePolygons = {
  S1: [[[21.35,106.95],[21.52,107.35],[21.45,107.85],[21.18,107.75],[21.08,107.25]]],
  S2: [[[21.0,106.65],[21.25,107.05],[21.1,107.55],[20.82,107.35],[20.75,106.9]]],
  S3: [[[20.8,107.35],[21.02,107.8],[20.85,108.1],[20.62,107.75]]],
  N: [[[20.68,106.42],[20.92,106.72],[20.72,107.02],[20.52,106.7]]]
};
const colors = {S1:'#059669',S2:'#a3e635',S3:'#f59e0b',N:'#ef4444'};

function initMap(id, interactive=true){
  const map = L.map(id, { zoomControl: interactive, dragging: interactive, scrollWheelZoom: interactive }).setView([21.08,107.35], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors' }).addTo(map);
  return map;
}

function drawSuitability(map){
  if(suitabilityLayer && map === mainMap) mainMap.removeLayer(suitabilityLayer);
  const group = L.layerGroup();
  Object.keys(samplePolygons).forEach(cls => {
    samplePolygons[cls].forEach(poly => {
      L.polygon(poly, {color:colors[cls], fillColor:colors[cls], fillOpacity:.52, weight:2})
      .bindPopup(`<b>${currentCrop.name}</b><br>${LAYER_LABELS[currentLayer]}<br>Mức phù hợp: <b>${cls}</b>`)
      .addTo(group);
    });
  });
  group.addTo(map);
  if(map === mainMap) suitabilityLayer = group;
}

function renderCropGrid(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  const grid = document.getElementById('cropGrid');
  const filtered = CROPS.filter(c => (currentGroup === 'all' || c.group === currentGroup) && `${c.name} ${c.latin} ${c.region}`.toLowerCase().includes(q));
  grid.innerHTML = filtered.map(c => `<button class="crop-card ${c.id===currentCrop.id?'active':''}" data-id="${c.id}"><small>${c.group}</small><h3>${c.name}</h3><em>${c.latin}</em><p>${c.highlight}</p></button>`).join('');
  grid.querySelectorAll('.crop-card').forEach(btn => btn.addEventListener('click', () => selectCrop(btn.dataset.id)));
}

function selectCrop(id){
  currentCrop = CROPS.find(c => c.id === id) || CROPS[0];
  document.getElementById('cropGroup').textContent = currentCrop.group;
  document.getElementById('cropName').textContent = currentCrop.name;
  document.getElementById('cropLatin').textContent = currentCrop.latin;
  document.getElementById('cropHighlight').textContent = currentCrop.highlight;
  document.getElementById('cropRegion').textContent = currentCrop.region;
  document.getElementById('activeLayerText').textContent = LAYER_LABELS[currentLayer];
  renderCropGrid();
  drawSuitability(mainMap);
}

function setLayer(layer){
  currentLayer = layer;
  document.getElementById('activeLayerText').textContent = LAYER_LABELS[layer];
  document.querySelectorAll('.layer').forEach(b => b.classList.toggle('active', b.dataset.layer === layer));
  drawSuitability(mainMap);
}

function setup(){
  mainMap = initMap('mainMap', true);
  heroMap = initMap('heroMap', false);
  drawSuitability(mainMap);
  drawSuitability(heroMap);
  selectCrop('bakich');
  setTimeout(()=>{mainMap.invalidateSize(); heroMap.invalidateSize();}, 300);

  document.getElementById('searchInput').addEventListener('input', renderCropGrid);
  document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    currentGroup = btn.dataset.group;
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
    renderCropGrid();
  }));
  document.querySelectorAll('.layer').forEach(btn => btn.addEventListener('click', () => setLayer(btn.dataset.layer)));
  document.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('adminPanel').classList.toggle('hidden', btn.dataset.mode !== 'admin');
  }));
  document.getElementById('downloadBtn').addEventListener('click', () => alert('Bản chạy mẫu: sau khi bổ sung file PDF/JPG, nút này sẽ tải đúng bản đồ của từng cây.'));
  document.getElementById('metadataBtn').addEventListener('click', () => alert('Metadata mẫu: nguồn dữ liệu, năm, CRS, phương pháp LUSET/GIS, lớp ' + currentLayer + '.'));
}

document.addEventListener('DOMContentLoaded', setup);
