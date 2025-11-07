

Nguyễn Bá Trung K2154801060676
Các kiểu mã hóa
1. Mã hóa Caesar (Caesar Cipher)
Thuật toán mã hóa
Dịch chuyển mỗi ký tự P → C = (P + k) mod 26

Thuật toán giải mã
C = (C - k) mod 26

Không gian khóa
25 khóa khả dĩ (k = 1…25)

Cách phá mã (không cần khóa)
Thử tất cả khóa (brute-force), phân tích tần suất chữ cái

Ảnh minh họa mã hóa


<img width="818" height="318" alt="image" src="https://github.com/user-attachments/assets/5ee50456-12af-4739-bce2-3f9088dc5007" />

Ảnh minh họa mã hóa



<img width="800" height="311" alt="image" src="https://github.com/user-attachments/assets/ac5bda97-3b04-4bfb-a45c-c202a9727565" />




2. Mã hóa Affine (Affine Cipher)
Thuật toán mã hóa
P → C = (a*P + b) mod 26, a và b là khóa

Thuật toán giải mã
P = a⁻¹ * (C - b) mod 26

Không gian khóa
a có 12 giá trị khả dĩ (cùng nguyên tố với 26), b có 26 giá trị → 312 khóa

Cách phá mã (không cần khóa)
Phân tích tần suất, thử tất cả khóa a,b

Ảnh minh họa mã hóa


<img width="912" height="631" alt="image" src="https://github.com/user-attachments/assets/8d537655-2516-479f-afa0-c460ca59df94" />




3. Mã hóa hoán vị (Transposition Cipher)
Thuật toán mã hóa
Sắp xếp lại vị trí ký tự theo một khóa k

Thuật toán giải mã
Đảo lại vị trí theo khóa k

Không gian khóa
Với n ký tự: n! hoán vị

Cách phá mã (không cần khóa)
Phân tích cấu trúc, tìm các mẫu lặp, đoán cấu trúc cột hoặc hàng

Ảnh minh họa mã hóa

<img width="807" height="312" alt="image" src="https://github.com/user-attachments/assets/715b6f4a-b0bc-4542-b42a-71da5b9c98ad" />


Ảnh minh họa giải mã

<img width="807" height="312" alt="image" src="https://github.com/user-attachments/assets/b69e92b2-cd7c-49e9-a632-a6d4dcb3e27a" />



4. Mã hóa Vigenère (Vigenère Cipher)
Thuật toán mã hóa
P + K (mod 26), K là chuỗi ký tự lặp lại

Thuật toán giải mã
C - K (mod 26)

Không gian khóa
Với khóa dài m: 26^m khả năng

Cách phá mã (không cần khóa)
Phân tích Kasiski, Friedman, thống kê tần suất bậc cao

Ảnh minh họa mã hóad

<img width="826" height="321" alt="image" src="https://github.com/user-attachments/assets/48c96bbd-ca94-4c63-8836-e92094cba45a" />

Ảnh minh họa giải mã

<img width="815" height="322" alt="image" src="https://github.com/user-attachments/assets/f2c76be7-4c98-4d1c-98ce-8fb6346c0039" />



5. Mã hóa Playfair (Playfair Cipher)
Thuật toán mã hóa
Chia bản rõ thành digraph, dùng ma trận 5x5 để thay thế theo quy tắc hàng/cột/rect

Thuật toán giải mã
Áp dụng quy tắc đảo ngược để giải mã

Không gian khóa
25! ma trận khả dĩ (sắp xếp chữ cái trong ma trận 5x5)

Cách phá mã (không cần khóa)
Phân tích tần suất digraph, suy đoán từ thường dùng, mẫu digraph phổ biến

Ảnh minh họa mã hóa
<img width="815" height="322" alt="image" src="https://github.com/user-attachments/assets/5bdfa2e5-7869-44cb-845a-2638fc4afe61" />
Ảnh minh họa giải mã
<img width="816" height="315" alt="image" src="https://github.com/user-attachments/assets/8952b745-73f0-4f58-8695-9e77ce31f860" />



