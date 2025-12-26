// ---- 피보나치 계산 버튼 ----
document.getElementById("calcBtn").addEventListener("click", calculate);

function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const table = document.getElementById("ratioTable");

  if (n < 2) {
    result.textContent = "2 이상의 수를 입력하세요.";
    return;
  }

  // ---- 피보나치 수열 계산 ----
  let fib = [0, 1];
  for (let i = 2; i < n; i++) fib[i] = fib[i - 1] + fib[i - 2];
  result.textContent = fib.join(", ");

  // ---- 피보나치 그래프 ----
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const padding = 70;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...fib);

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  ctx.font = "14px Arial";
  ctx.fillText("항 번호 (n)", canvas.width / 2 - 30, canvas.height - padding + 35);
  ctx.save();
  ctx.translate(20, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("피보나치 수 F(n)", 0, 0);
  ctx.restore();

  ctx.font = "12px Arial";
  for (let i = 0; i < n; i++) {
    let x = padding + (i / (n - 1)) * graphWidth;
    ctx.fillText(i + 1, x - 5, canvas.height - padding + 20);
  }

  let yTicks = n <= 5 ? 5 : n <= 15 ? 10 : 15;
  for (let i = 0; i <= yTicks; i++) {
    let value = Math.round((maxValue / yTicks) * i);
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (y < padding) y = padding;
    ctx.fillText(value, 50 - value.toString().length * 3, y + 3);
  }

  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  fib.forEach((value, index) => {
    let x = padding + (index / (n - 1)) * graphWidth;
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (y < padding) y = padding;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // ---- 표 ----
  table.innerHTML = `
    <tr>
      <th>항 번호 n</th>
      <th>F(n)</th>
      <th>F(n)/F(n-1)</th>
    </tr>
  `;
  for (let i = 0; i < fib.length; i++) {
    const row = table.insertRow();
    row.insertCell(0).textContent = i + 1;
    row.insertCell(1).textContent = fib[i];
    row.insertCell(2).textContent = i === 0 ? "-" : (fib[i] / fib[i - 1]).toFixed(3);
  }
}

// ---- 황금 사각형 (항 입력과 무관, 가로·세로 비율 표시) ----
window.onload = function() {
  const canvas = document.getElementById("goldenSpiral"); 
  const ctx = canvas.getContext("2d");

  const width = 400;                 // 사각형 폭
  const phi = 1.618;                 // 황금비
  const height = width / phi;        // 황금비에 따른 높이
  const startX = (canvas.width - width) / 2;
  const startY = (canvas.height - height) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 사각형 그리기
  ctx.strokeStyle = "#FF4500";
  ctx.lineWidth = 3;
  ctx.strokeRect(startX, startY, width, height);

  // 자세한 비율 텍스트 표시
  ctx.font = "18px Arial";
  ctx.fillStyle = "#0000FF";
  ctx.fillText(`황금비 φ ≈ 1.618`, startX + 10, startY - 60);
  ctx.fillText(`φ = (1 + √5) / 2`, startX + 10, startY - 40);
  ctx.fillText(`가로:세로 = 1 : 1.618`, startX + 10, startY - 20);

  // 가로변에 비율 표시
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FF0000";
  ctx.fillText("가로 1", startX + width / 2 - 20, startY + height + 20);

  // 세로변에 비율 표시 (회전)
  ctx.save();
  ctx.translate(startX - 20, startY + height / 2 + 10);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("세로 1.618", 0, 0);
  ctx.restore();
};
