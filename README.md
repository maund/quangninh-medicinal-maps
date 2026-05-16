# Atlas số tài nguyên khí hậu – đất – cây trồng tỉnh Quảng Ninh

Website tĩnh mẫu cho GitHub Pages/Vercel.

## Cấu trúc
- `index.html`: trang chính
- `assets/styles.css`: giao diện
- `assets/data.js`: danh mục cây trồng
- `assets/app.js`: logic WebGIS mẫu bằng Leaflet
- `maps/`: đặt JPG/PNG bản đồ
- `pdf/`: đặt PDF bản đồ/báo cáo
- `data/`: đặt GeoJSON sau khi chuyển đổi từ MPK/SHP

## Cách chạy
Mở `index.html` trực tiếp hoặc upload toàn bộ thư mục lên GitHub Pages.

## Nâng cấp WebGIS thật
Sau khi chuyển MPK/SHP sang GeoJSON hoặc vector tile, cập nhật `assets/app.js` để load layer tương ứng từng cây/lớp.
