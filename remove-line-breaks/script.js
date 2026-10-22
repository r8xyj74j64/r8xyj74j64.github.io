// script.js

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const removeBtn = document.getElementById('removeBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

removeBtn.addEventListener('click', () => {
    const text = inputText.value;
    
    if (text.trim() === "") {
        alert("テキストを入力してください。");
        return;
    }

    // 選択されているラジオボタンを確実に取得
    const checkedRadio = document.querySelector('input[name="replaceOption"]:checked');
    const selectedOption = checkedRadio ? checkedRadio.value : 'remove';
    
    // space なら半角スペース1個、それ以外なら空文字
    const replacement = (selectedOption === 'space') ? ' ' : '';

    // \r\n, \n, \r すべての改行パターンに対応
    const resultText = text.replace(/\r?\n|\r/g, replacement);
    
    outputText.value = resultText;
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    copyMessage.classList.add('hidden');
});

copyBtn.addEventListener('click', () => {
    const textToCopy = outputText.value;
    
    if (textToCopy === "") {
        alert("コピーする結果がありません。");
        return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        copyMessage.classList.remove('hidden');
        setTimeout(() => {
            copyMessage.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('コピー失敗:', err);
        alert('コピーに失敗しました。');
    });
});
