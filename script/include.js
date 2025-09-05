document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.querySelector('.header');
    const footerElement = document.querySelector('.footer');

    // ヘッダーを読み込んで挿入
    if (headerElement) {
        fetch('/parts/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;
                // ヘッダーのHTMLが挿入された後に、関連するJS関数を呼び出す
                initializePageFunctions();
            })
            .catch(error => console.error('Error fetching header:', error));
    }

    // フッターを読み込んで挿入
    if (footerElement) {
        fetch('/parts/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(error => console.error('Error fetching footer:', error));
    }
});
