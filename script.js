document.getElementById("calcBtn").addEventListener("click", calculate);

function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const table = document.getElementById("ratioTable");
  const goldenCanvas = document.getElementById("goldenChart");
  const gCtx = goldenCanvas.getContext("2d");

  if (n < 2) {
    result.textContent = "2 이상의 수를 입력하세요.";
    return;
  }

  // 피보나치 수열 계산
  let fib = [0, 1];
  for (let i = 2; i < n; i++) fib[i] = fib[i - 1] + fib[i - 2];

  result.textContent = fib.join(", ");

  // ---- 피보나치 그래프 ----
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const padding = 70;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...fib);

  // 축
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

  // ---- 황금비 수렴 그래프 ----
  gCtx.clearRect(0, 0, goldenCanvas.width, goldenCanvas.height);
  const gPadding = 50;
  const gWidth = goldenCanvas.width - gPadding * 2;
  const gHeight = goldenCanvas.height - gPadding * 2;

  // 축
  gCtx.beginPath();
  gCtx.moveTo(gPadding, gPadding);
  gCtx.lineTo(gPadding, goldenCanvas.height - gPadding);
  gCtx.lineTo(goldenCanvas.width - gPadding, goldenCanvas.height - gPadding);
  gCtx.stroke();

  gCtx.save();
  gCtx.translate(20, goldenCanvas.height / 2);
  gCtx.rotate(-Math.PI / 2);
  gCtx.fillText("F(n)/F(n-1)", 0, 0);
  gCtx.restore();

  gCtx.font = "14px Arial";
  gCtx.fillText("항 번호 (n)", goldenCanvas.width / 2 - 30, goldenCanvas.height - gPadding + 35);

  const ratios = fib.slice(1).map((v,i) => v / fib[i]);
  const maxRatio = Math.max(...ratios);

  // y축
  gCtx.font = "12px Arial";
  for (let i = 0; i <= 10; i++) {
    let value = 1 + i * (maxRatio - 1)/10;
    let y = goldenCanvas.height - gPadding - ((value - 1) / (maxRatio - 1)) * gHeight;
    gCtx.fillText(value.toFixed(3), gPadding - 40, y + 3);
  }

  // 그래프
  gCtx.beginPath();
  gCtx.strokeStyle = "red";
  gCtx.lineWidth = 3;
  ratios.forEach((ratio, index) => {
    let x = gPadding + (index / (n - 2)) * gWidth;
    let y = goldenCanvas.height - gPadding - ((ratio - 1) / (maxRatio - 1)) * gHeight;
    if (index === 0) gCtx.moveTo(x, y);
    else gCtx.lineTo(x, y);
  });
  gCtx.stroke();

  // 황금비 선
  gCtx.beginPath();
  gCtx.strokeStyle = "green";
  gCtx.setLineDash([5, 5]);
  let yGolden = goldenCanvas.height - gPadding - ((1.618 - 1)/(maxRatio - 1)) * gHeight;
  gCtx.moveTo(gPadding, yGolden);
  gCtx.lineTo(goldenCanvas.width - gPadding, yGolden);
  gCtx.stroke();
  gCtx.setLineDash([]);
  gCtx.fillText("황금비 ≈ 1.618", goldenCanvas.width - gPadding - 80, yGolden - 5);
}
