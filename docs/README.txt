HƯỚNG DẪN CẬP NHẬT WEBSITE GITHUB PAGES

1. Cấu trúc chính
- index.html: Trang chủ và bản đồ chính
- assets/css/style.css: Giao diện
- assets/js/map.js: Cấu hình bản đồ
- data/geojson: Nơi đặt các lớp bản đồ GeoJSON
- data/images: Nơi đặt ảnh bản đồ PNG/JPG
- docs: Nơi đặt báo cáo PDF, thuyết minh, tài liệu tải về

2. Cách thay dữ liệu bản đồ
- Chuyển shapefile sang GeoJSON bằng QGIS.
- Đặt file vào thư mục data/geojson.
- Mở assets/js/map.js và sửa đường dẫn trong phần demoLayers.

Ví dụ:
geojson: "data/geojson/ba-kich.geojson"

3. Cách đưa lên GitHub Pages
- Tạo tài khoản GitHub nếu chưa có.
- Tạo repository mới, ví dụ: quangninh-medicinal-maps.
- Upload toàn bộ các file trong thư mục này.
- Vào Settings > Pages.
- Source: Deploy from a branch.
- Branch: main / root.
- Save.
- Sau vài phút, GitHub sẽ tạo đường link website miễn phí.

4. Lưu ý
- Không nên upload dữ liệu quá lớn.
- Nếu bản đồ nặng, nên tách theo từng cây hoặc chuyển sang dạng tile.
- Nên kiểm tra kỹ bản quyền, nguồn dữ liệu và thông tin trích dẫn trước khi công bố.
