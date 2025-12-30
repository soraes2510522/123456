function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  // 입력값 제한
  if (isNaN(n) || n < 2 || n > 20) {
    result.textContent =
      "⚠ 항의 개수는 2 이상 20 이하로 입력해야 합니다.\n\n" +
      "피보나치 수열은 항이 증가할수록 값이 매우 빠르게 커지므로\n" +
      "그래프 시각화와 프로그램의 안정적인 실행을 위해\n" +
      "최대 항 개수를 20으로 제한하였습니다.";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  // ① 반복 알고리즘으로 피보나치 수열 계산
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // ② 텍스트 출력
  result.textContent = fib.join(", ");

  // ③ 그래프 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 70;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...fib);

  // ④ 축
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
    ctx.fillText(i + 1, x - 5, canvas.height - padding + 20);
  }

  // y축 눈금
  let yTicks = 10;
  for (let i = 0; i <= yTicks; i++) {
    let value = Math.round((maxValue / yTicks) * i);
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (y < padding) y = padding;
    ctx.fillText(value, 40 - value.toString().length * 3, y + 3);
  }

  // ⑤ 그래프 선
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
}
