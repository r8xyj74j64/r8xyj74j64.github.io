const startButton = document.getElementById('startButton');
let result = document.getElementById('result');
let isFirstClick = true;
let startTime;
let endTime;

let container = document.querySelector('.container');
let countDisplay = document.createElement('p'); // ← これ1個だけ
container.appendChild(countDisplay);
countDisplay.classList.add('count-display');

let countInterval; // カウントアップ用

startButton.addEventListener('click', function() {

    if (isFirstClick) {
        startButton.textContent = 'ストップ';
        result.textContent = 'ボタンを押してから再度押すまでの時間を10秒に近付けてください！';

        // カウントアップ開始
        let count = 0;
        countDisplay.textContent = count.toFixed(2) + ' 秒';
        countDisplay.style.fontSize = "24px";

        countInterval = setInterval(() => {
            count += 0.01;
            countDisplay.textContent = count.toFixed(2) + ' 秒';
        }, 10);
        
// ★ 3秒でフェードアウト開始（カウントは続く）
setTimeout(() => {
    countDisplay.classList.add('fade-out');
}, 3000);

// ★ 4秒で完全に消す（カウントも止める）
setTimeout(() => {
    clearInterval(countInterval);
    countDisplay.textContent = "";
    countDisplay.classList.remove('fade-out'); // 次のゲームのために戻す
}, 4000);



        startTime = Date.now();
        isFirstClick = false;

    } else {
        endTime = Date.now();
        const diff = (endTime - startTime) / 1000;
        const gap = Math.abs(10 - diff); // 10秒との差

        if (gap <= 0.1) {
            result.textContent = `✨すごい！ジャスト10秒！✨（実測: ${diff.toFixed(2)}秒）`;
        } else {
            result.textContent = `結果は${diff.toFixed(2)}秒で、10秒との差は${gap.toFixed(2)}秒でした！`;
        }

        // ★ どちらの場合もボタンを戻す
        startButton.textContent = 'スタート';
        isFirstClick = true;
    }

});
