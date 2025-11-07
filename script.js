
// Utility: chuẩn hóa chữ cái (chỉ giữ A-Z)
function cleanText(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

// ========== Caesar ==========
function caesarEncrypt(text, shift) {
  return text.replace(/[A-Z]/g, c =>
    String.fromCharCode((c.charCodeAt(0) - 65 + shift) % 26 + 65)
  );
}
function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, (26 - shift) % 26);
}

// ========== Affine ==========
function affineEncrypt(text, a, b) {
  return text.replace(/[A-Z]/g, c =>
    String.fromCharCode((a * (c.charCodeAt(0) - 65) + b) % 26 + 65)
  );
}
function affineDecrypt(text, a, b) {
  function modInverse(a, m) {
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
    return 1;
  }
  let a_inv = modInverse(a, 26);
  return text.replace(/[A-Z]/g, c =>
    String.fromCharCode((a_inv * ((c.charCodeAt(0) - 65) - b + 26)) % 26 + 65)
  );
}

// ========== Hoán vị (Transposition - cột) ==========
function transpositionEncrypt(text, key) {
  let cols = parseInt(key);
  let rows = Math.ceil(text.length / cols);
  let arr = Array.from({ length: cols }, () => "");
  for (let i = 0; i < text.length; i++) {
    arr[i % cols] += text[i];
  }
  return arr.join("");
}
function transpositionDecrypt(text, key) {
  let cols = parseInt(key);
  let rows = Math.ceil(text.length / cols);
  let shortCols = (cols * rows) - text.length;
  let arr = Array(cols).fill("");
  let idx = 0;
  for (let c = 0; c < cols; c++) {
    let len = rows - (c >= cols - shortCols ? 1 : 0);
    arr[c] = text.slice(idx, idx + len);
    idx += len;
  }
  let result = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (arr[c][r]) result += arr[c][r];
    }
  }
  return result;
}

// ========== Vigenère ==========
function vigenereEncrypt(text, key) {
  key = cleanText(key);
  let res = "";
  for (let i = 0; i < text.length; i++) {
    let shift = key.charCodeAt(i % key.length) - 65;
    res += String.fromCharCode((text.charCodeAt(i) - 65 + shift) % 26 + 65);
  }
  return res;
}
function vigenereDecrypt(text, key) {
  key = cleanText(key);
  let res = "";
  for (let i = 0; i < text.length; i++) {
    let shift = key.charCodeAt(i % key.length) - 65;
    res += String.fromCharCode((text.charCodeAt(i) - 65 - shift + 26) % 26 + 65);
  }
  return res;
}

// ========== Playfair ==========
function generateMatrix(key) {
  key = cleanText(key).replace(/J/g, "I");
  let matrix = "";
  for (let c of key + "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
    if (!matrix.includes(c)) matrix += c;
  }
  return matrix.match(/.{1,5}/g).map(row => row.split(""));
}

function playfairEncrypt(text, key) {
  let matrix = generateMatrix(key);
  let pairs = [];
  text = cleanText(text).replace(/J/g, "I");
  for (let i = 0; i < text.length; i += 2) {
    let a = text[i], b = text[i + 1] || "X";
    if (a === b) { b = "X"; i--; }
    pairs.push([a, b]);
  }

  let res = "";
  for (let [a, b] of pairs) {
    let [ra, ca] = find(matrix, a);
    let [rb, cb] = find(matrix, b);
    if (ra === rb) {
      res += matrix[ra][(ca + 1) % 5] + matrix[rb][(cb + 1) % 5];
    } else if (ca === cb) {
      res += matrix[(ra + 1) % 5][ca] + matrix[(rb + 1) % 5][cb];
    } else {
      res += matrix[ra][cb] + matrix[rb][ca];
    }
  }
  return res;
}

function playfairDecrypt(text, key) {
  let matrix = generateMatrix(key);
  let pairs = [];
  for (let i = 0; i < text.length; i += 2) {
    pairs.push([text[i], text[i + 1]]);
  }

  let res = "";
  for (let [a, b] of pairs) {
    let [ra, ca] = find(matrix, a);
    let [rb, cb] = find(matrix, b);
    if (ra === rb) {
      res += matrix[ra][(ca + 4) % 5] + matrix[rb][(cb + 4) % 5];
    } else if (ca === cb) {
      res += matrix[(ra + 4) % 5][ca] + matrix[(rb + 4) % 5][cb];
    } else {
      res += matrix[ra][cb] + matrix[rb][ca];
    }
  }
  return res;
}

function find(matrix, c) {
  for (let r = 0; r < 5; r++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[r][col] === c) return [r, col];
    }
  }
}

// ========== Điều khiển ==========
function encrypt() {
  let text = cleanText(document.getElementById("text").value);
  let method = document.getElementById("method").value;
  let key = document.getElementById("key").value;
  let result = "";

  switch (method) {
    case "caesar":
      result = caesarEncrypt(text, parseInt(key) || 3);
      break;
    case "affine":
      let [a, b] = key.split(",").map(Number);
      result = affineEncrypt(text, a || 5, b || 8);
      break;
    case "transposition":
      result = transpositionEncrypt(text, parseInt(key) || 5);
      break;
    case "vigenere":
      result = vigenereEncrypt(text, key || "KEY");
      break;
    case "playfair":
      result = playfairEncrypt(text, key || "KEYWORD");
      break;
  }
  document.getElementById("result").innerText = "Mã hóa: " + result;
}

function decrypt() {
  let text = cleanText(document.getElementById("text").value);
  let method = document.getElementById("method").value;
  let key = document.getElementById("key").value;
  let result = "";

  switch (method) {
    case "caesar":
      result = caesarDecrypt(text, parseInt(key) || 3);
      break;
    case "affine":
      let [a, b] = key.split(",").map(Number);
      result = affineDecrypt(text, a || 5, b || 8);
      break;
    case "transposition":
      result = transpositionDecrypt(text, parseInt(key) || 5);
      break;
    case "vigenere":
      result = vigenereDecrypt(text, key || "KEY");
      break;
    case "playfair":
      result = playfairDecrypt(text, key || "KEYWORD");
      break;
  }
  document.getElementById("result").innerText = "Giải mã: " + result;
}

