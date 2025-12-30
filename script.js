function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const tableBody = document.querySelector("#fibTable tbody");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  if (isNaN(n) || n < 2 || n > 20) {
    result.textContent = "2 이상 20 이하의 정수를 입력하세요.";
    return;
  }

  // 피보나치 수열 계산 (반복문 알고리즘)
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // 결과 출력
  result.textContent = fib.join(", ");

  // 표 초기화
  tableBody.innerHTML = "";
  fib.forEach((value, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td><td>${value}</td>`;
    tableBody.appendChild(row);
  });

  // 그래프 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 70;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...fib);

  // 축 그리기
  ctx.strokeStyle = "#1f2a44";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // 그래프 선
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.beginPath();

  fib.forEach((value, index) => {
    let x = padding + (index / (n - 1)) * graphWidth;
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
