document.getElementById("calcBtn").addEventListener("click", calculate);

function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const table = document.getElementById("ratioTable");
  const spiralCanvas = document.getElementById("goldenSpiral");
  const sCtx = spiralCanvas.getContext("2d");

  if (n < 2) {
    result.textContent = "2 이상의 수를 입력하세요.";
    return;
  }

  // -------------------
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

  // 축 그리기
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

  // ---- 황금 나선 ----
  sCtx.clearRect(0,0,spiralCanvas.width,spiralCanvas.height);
  const centerX = spiralCanvas.width / 2;
  const centerY = spiralCanvas.height / 2;
  let x = centerX;
  let y = centerY;
  let direction = 0; // 0: 오른쪽, 1: 아래, 2: 왼쪽, 3: 위
  const scale = 5; // 크기 조절

  sCtx.beginPath();
  sCtx.moveTo(x, y);
  sCtx.strokeStyle = "#FF4500";
  sCtx.lineWidth = 2;

  for (let i = 1; i < n; i++) {
    const size = fib[i] * scale;
    switch(direction) {
      case 0: // 오른쪽 아래
        sCtx.arc(x + size, y, size, Math.PI, 1.5*Math.PI);
        x += size;
        y -= size;
        break;
      case 1: // 아래 왼쪽
        sCtx.arc(x, y + size, size, 1.5*Math.PI, 0);
        x += size;
        y += size;
        break;
      case 2: // 왼쪽 위
        sCtx.arc(x - size, y, size, 0, 0.5*Math.PI);
        x -= size;
        y += size;
        break;
      case 3: // 위 오른쪽
        sCtx.arc(x, y - size, size, 0.5*Math.PI, Math.PI);
        x -= size;
        y -= size;
        break;
    }
    direction = (direction + 1) % 4;
  }
  sCtx.stroke();
}
