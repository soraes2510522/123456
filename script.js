function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  // 입력 검증
  if (isNaN(n)) {
    result.textContent = "항의 개수를 입력하세요.";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  if (n < 2) {
    result.textContent = "2 이상의 수를 입력하세요.";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  // 피보나치 수열 정의
  // F(0)=0, F(1)=1
  // F(n)=F(n-1)+F(n-2)
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // 결과 출력
  result.textContent = fib.join(", ");

  // 그래프 초기화
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

  // x축 라벨
  ctx.font = "14px Arial";
  ctx.fillText("항 번호 (n)", canvas.width / 2 - 30, canvas.height - padding + 35);

  // y축 라벨
  ctx.save();
  ctx.translate(25, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("피보나치 수 F(n)", 0, 0);
  ctx.restore();

  // x축 눈금
  ctx.font = "12px Arial";
  for (let i = 0; i < n; i++) {
    let x = padding + (i / (n - 1)) * graphWidth;
    ctx.fillText(i + 1, x - 4, canvas.height - padding + 20);
  }

  // y축 눈금 자동 조절
  let yTicks = n <= 5 ? 5 : n <= 15 ? 10 : 15;

  for (let i = 0; i <= yTicks; i++) {
    let value = Math.round((maxValue / yTicks) * i);
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (y < padding) y = padding;

    let xPos = 50 - value.toString().length * 3;
    ctx.fillText(value, xPos, y + 4);
  }

  // 그래프 선
  ctx.beginPath();
  ctx.strokeStyle = "#1f4fd8";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  fib.forEach((value, index) => {
    let x = padding + (index / (n - 1)) * graphWidth;
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (y < padding) y = padding;

    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
