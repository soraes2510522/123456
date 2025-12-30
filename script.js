function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const tableBody = document.querySelector("#fibTable tbody");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  if (isNaN(n) || n < 2 || n > 20) {
    result.textContent = "항의 개수는 2 이상 20 이하로 입력하세요.";
    return;
  }

  // 피보나치 수열 계산 (반복 알고리즘)
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // 텍스트 출력
  result.textContent = fib.join(", ");

  // 표 초기화
  tableBody.innerHTML = "";

  for (let i = 1; i < fib.length; i++) {
    const ratio = fib[i - 1] !== 0 ? (fib[i] / fib[i - 1]).toFixed(5) : "-";
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i}</td>
      <td>${fib[i]}</td>
      <td>${ratio}</td>
    `;
    tableBody.appendChild(row);
  }

  // 그래프 초기화
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

  // 축 이름
  ctx.font = "14px Arial";
  ctx.fillText("항 번호 (n)", canvas.width / 2 - 30, canvas.height - 20);

  ctx.save();
  ctx.translate(20, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("피보나치 수 F(n)", 0, 0);
  ctx.restore();

  // x축 눈금
  ctx.font = "12px Arial";
  for (let i = 0; i < n; i++) {
    let x = padding + (i / (n - 1)) * graphWidth;
    ctx.fillText(i + 1, x - 4, canvas.height - padding + 20);
  }

  // y축 눈금
  const yTicks = 10;
  for (let i = 0; i <= yTicks; i++) {
    let value = Math.round((maxValue / yTicks) * i);
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    ctx.fillText(value, 30, y + 3);
  }

  // 그래프 선
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;

  fib.forEach((value, index) => {
    let x = padding + (index / (n - 1)) * graphWidth;
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
