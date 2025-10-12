### HƯỚNG DẪN CHẠY

1. Clone project về.
2. Chạy `npm i`
3. Chạy `npm start`

### HƯỚNG DẪN XÂY CẤU TRÚC

## Backend: (PORT: 6789):

- Thêm dữ liệu các thứ vào file database.json
- Thêm endpoint API vào server.js
- Mỗi bảng là 1 file json, nằm trong folder db
- Dùng fs để đọc file database.

## Frontend: (PORT: 5173):

-

- Nếu KHÔNG chạy được port 5173 => vào terminal gõ `netstat -ano | findstr :5173` -> dóng sang cột cuối sẽ nhìn thấy số `x` -> taskkill /PID `x` /F
