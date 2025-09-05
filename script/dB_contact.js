(() => {
    const form = document.querySelector('#custom-google-form');
    if (!form) return; // フォームがページになければ何もしない

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // デフォルトの送信をキャンセル

        // ▼ STEP1で控えた「POST先URL」をここに貼り付け ▼
        const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc2VMNS0bFz8nyasCLrCG_RykLHdWovnM5cPhVf-YqU6V21tg/formResponse';
        
        const formData = new FormData(form);
        const formResult = document.querySelector('#form-result');
        const submitButton = form.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            body: formData,
            mode: 'no-cors', // CORSエラーを回避するためのおまじない
        })
        .then(() => {
            // 成功した場合
            form.hidden = true;
            formResult.hidden = false;
        })
        .catch((error) => {
            // 失敗した場合
            console.error('Error:', error);
            formResult.innerHTML = '<h3>送信に失敗しました。</h3><p>時間をおいて再度お試しください。</p>';
            formResult.hidden = false;
            submitButton.disabled = false;
            submitButton.textContent = '送信する';
        });
    });
})();
