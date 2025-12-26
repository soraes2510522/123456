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

  // ① 피보나치 수열 계산 (반복 알고리즘)
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // ② 텍스트 결과 출력
  result.textContent = fib.join(", ");

  // ③ 그래프 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 70;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...fib);

  // ④ 축 그리기
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // ⑤ x축 이름
  ctx.font = "14px Arial";
  ctx.fillText("항 번호 (n)", canvas.width / 2 - 30, canvas.height - padding + 35);

  // ⑥ y축 이름
  ctx.save();
  ctx.translate(20, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("피보나치 수 F(n)", 0, 0);
  ctx.restore();

  // ⑦ x축 눈금 (항 번호)
  ctx.font = "12px Arial";
  for (let i = 0; i < n; i++) {
    let x = padding + (i / (n - 1)) * graphWidth;
    ctx.fillText(i + 1, x - 5, canvas.height - padding + 20);
  }

  // ⑧ y축 눈금 자동 조절
  let yTicks;
  if (n <= 5) yTicks = 5;
  else if (n <= 15) yTicks = 10;
  else yTicks = 15;

  for (let i = 0; i <= yTicks; i++) {
    let value = Math.round((maxValue / yTicks) * i);
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (y < padding) y = padding;

    let xPos = 50 - value.toString().length * 3;
    ctx.fillText(value, xPos, y + 3);
  }

  // ⑨ 그래프 선 그리기
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

  // ⑩ 표 업데이트
  table.innerHTML = `
    <tr>
      <th>항 번호 n</th>
      <th>F(n)</th>
      <th>F(n)/F(n-1)</th>
    </tr>
  `;
  for (let i = 0; i < fib.length; i++) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = i + 1;
    cell2.textContent = fib[i];
    cell3.textContent = i === 0 ? "-" : (fib[i] / fib[i - 1]).toFixed(3);
  }
}
