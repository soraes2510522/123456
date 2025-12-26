function calculate() {
  let n = document.getElementById("n").value || 20;
  n = parseInt(n);

  // 피보나치 수열 계산
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // 결과 출력
  let result = "피보나치 수열 (" + n + "항):\n";
  result += fib.join(", ");
  document.getElementById("result").textContent = result;

  drawGraph(fib);
}

function drawGraph(fib) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 그래프 그리기
  const margin = 50;
  const width = canvas.width - margin * 2;
  const height = canvas.height - margin * 2;

  const max = Math.max(...fib);

  // 선 그래프
  ctx.beginPath();
  for (let i = 0; i < fib.length; i++) {
    const x = margin + (i / (fib.length - 1)) * width;
    const y = canvas.height - margin - (fib[i] / max) * height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();

  // F(n)/F(n-1) 비율 표시
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  for (let i = 1; i < fib.length; i++) {
    const x = margin + (i / (fib.length - 1)) * width;
    const y = canvas.height - margin - (fib[i] / max) * height;
    const ratio = (fib[i] / fib[i - 1]).toFixed(3);
    ctx.fillText(ratio, x + 2, y - 2);
  }

  // 황금비 사각형 예시
  const startX = canvas.width - 180;
  const startY = 50;
  const side = 100;

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  // 작은 정사각형
  ctx.strokeRect(startX, startY, side, side);
  // 황금비 사각형
  ctx.strokeRect(startX - side * 1.618, startY, side * 1.618, side);

  // 비율 텍스트
  ctx.fillStyle = "black";
  ctx.fillText("가로: 1.618", startX - 50, startY + 15);
  ctx.fillText("세로: 1", startX + 5, startY + side / 2);
}

// 페이지 로드 시 자동 실행
window.onload = calculate;
