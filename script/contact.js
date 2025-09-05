(() => {
    // --- 「その他」が選択されたら入力欄を有効化する処理 ---
    const inquiryTypeGroup = document.querySelector('#inquiry-type-group');
    const otherTextInput = document.querySelector('input[name="entry.1313961624.other_option_response"]');

    if (inquiryTypeGroup && otherTextInput) {
        inquiryTypeGroup.addEventListener('change', (e) => {
            // ラジオボタンのどれかが変更されたら実行
            if (e.target.value === '__other_option__') {
                // 「その他」が選ばれた場合
                otherTextInput.disabled = false;
                otherTextInput.required = true; // 必須にする
                otherTextInput.focus(); // 入力欄にカーソルを合わせる
            } else {
                // 「その他」以外が選ばれた場合
                otherTextInput.disabled = true;
                otherTextInput.required = false; // 必須を解除
                otherTextInput.value = ''; // 入力内容をクリア
            }
        });
    }
    // --- ここまで ---

    const form = document.querySelector('#custom-google-form');
    if (!form) return;

    // (↓ 既存のsubmitイベントの処理はそのまま)
    form.addEventListener('submit', (e) => {
        // ...
    });
})();

(() => {
    const form = document.querySelector('#custom-google-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfjHK0PiTnwnz2AQxUw5F1pQPV1tpq5VtCLo2mQXIUvcsb0bA/formResponse';
        
        const formData = new FormData(form);
        const formResult = document.querySelector('#form-result');
        const submitButton = form.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
        })
        .then(() => {
            form.hidden = true;
            formResult.hidden = false;
        })
        .catch((error) => {
            console.error('Error:', error);
            formResult.innerHTML = '<h3>送信に失敗しました。</h3><p>時間をおいて再度お試しください。</p>';
            formResult.hidden = false;
            submitButton.disabled = false;
            submitButton.textContent = '送信する';
        });
    });
})();
