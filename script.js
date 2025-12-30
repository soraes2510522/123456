function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const tableBody = document.querySelector("#fibTable tbody");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  // 입력 제한
  if (isNaN(n) || n < 2 || n > 20) {
    result.textContent =
      "⚠ 항의 개수는 2 이상 20 이하로 입력해야 합니다.\n" +
      "피보나치 수열은 값이 빠르게 증가하므로 시각화를 위해 제한했습니다.";
    tableBody.innerHTML = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  // ① 반복 알고리즘
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // ② 수열 출력
  result.textContent = fib.join(", ");

  // ③ 표 생성
  tableBody.innerHTML = "";
  for (let i = 1; i < fib.length; i++) {
    const row = document.createElement("tr");

    const cellN = document.createElement("td");
    cellN.textContent = i;

    const cellF = document.createElement("td");
    cellF.textContent = fib[i];

    const cellRatio = document.createElement("td");
    if (i === 1) {
      cellRatio.textContent = "-";
    } else {
      cellRatio.textContent = (fib[i] / fib[i - 1]).toFixed(3);
    }

    row.appendChild(cellN);
    row.appendChild(cellF);
    row.appendChild(cellRatio);
    tableBody.appendChild(row);
  }

  // ④ 그래프 초기화
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

  // x축
  ctx.font = "14px Arial";
  ctx.fillText("항 번호 (n)", canvas.width / 2 - 30, canvas.height - padding + 35);

  // y축
  ctx.save();
  ctx.translate(25, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("피보나치 수 F(n)", 0, 0);
  ctx.restore();

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
