// Bản đồ nền
const map = L.map("map").setView([21.15, 107.30], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Dữ liệu minh họa. Thầy có thể thay bằng GeoJSON thật trong thư mục data/geojson.
const demoLayers = {
  bakich: {
    name: "Ba kích",
    color: "#1a9850",
    geojson: "data/geojson/ba-kich-demo.geojson"
  },
  trahoavang: {
    name: "Trà hoa vàng",
    color: "#91cf60",
    geojson: "data/geojson/tra-hoa-vang-demo.geojson"
  },
  samngoclinh: {
    name: "Sâm Ngọc Linh di thực",
    color: "#fee08b",
    geojson: "data/geojson/sam-ngoc-linh-demo.geojson"
  },
  tonghop: {
    name: "Tổng hợp khí hậu - đất",
    color: "#2b83ba",
    geojson: "data/geojson/tong-hop-demo.geojson"
  }
};

let currentLayer = null;

function styleFeature(feature, color) {
  return {
    color: "#333333",
    weight: 1,
    fillColor: feature.properties.color || color,
    fillOpacity: 0.55
  };
}

function popupContent(feature, layerName) {
  const p = feature.properties || {};
  return `
    <strong>${layerName}</strong><br>
    Khu vực: ${p.name || "Chưa cập nhật"}<br>
    Mức độ phù hợp: ${p.suitability || "Chưa cập nhật"}<br>
    Ghi chú: ${p.note || "Cập nhật sau"}
  `;
}

async function loadLayer(layerKey) {
  const config = demoLayers[layerKey];

  if (currentLayer) {
    map.removeLayer(currentLayer);
  }

  try {
    const response = await fetch(config.geojson);
    const data = await response.json();

    currentLayer = L.geoJSON(data, {
      style: feature => styleFeature(feature, config.color),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(popupContent(feature, config.name));
      }
    }).addTo(map);

    map.fitBounds(currentLayer.getBounds(), { padding: [20, 20] });
  } catch (error) {
    console.error("Không tải được dữ liệu:", error);
    alert("Chưa có dữ liệu GeoJSON cho lớp bản đồ này. Vui lòng kiểm tra thư mục data/geojson.");
  }
}

document.querySelectorAll('input[name="mapLayer"]').forEach(input => {
  input.addEventListener("change", event => {
    loadLayer(event.target.value);
  });
});

loadLayer("bakich");
