// =============================================
// ヘッダーが読み込まれた後に実行される関数群
// =============================================
function initializePageFunctions() {

    // === スクロールでヘッダーを隠す処理 ===
    (() => {
        const header = document.querySelector('.header');
        if (!header) return;
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 100) {
                header.classList.remove('hidden');
                return;
            }
            if (currentScrollY > lastScrollY) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;
        });
    })();

    // === ナビゲーションの現在地を自動でハイライト ===
    (() => {
        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
        const navLinks = document.querySelectorAll('.header-nav a');
        navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/index\.html$/, '/');
            // Homeリンク
            if (linkPath === '/' && currentPath === '/') {
                link.classList.add('active');
                return;
            }
            // サブページ（/services など）は、拡張子なし・あり両対応
            if (
                (linkPath !== '/' && (currentPath === linkPath || currentPath === linkPath + '.html')) ||
                (linkPath !== '/' && currentPath.startsWith(linkPath + '/')) // ディレクトリ配下もOK
            ) {
                link.classList.add('active');
            }
        });
    })();

    // === ハンバーガーメニューの開閉処理 ===
    (() => {
        const hamburgerButton = document.querySelector('.hamburger-button');
        const navMenu = document.querySelector('.header-nav');
        const body = document.querySelector('body');
        if (hamburgerButton && navMenu) {
            hamburgerButton.addEventListener('click', () => {
                hamburgerButton.classList.toggle('is-open');
                navMenu.classList.toggle('is-open');
                body.classList.toggle('no-scroll');
            });
            navMenu.addEventListener('click', (e) => {
                if (e.target === navMenu) {
                    hamburgerButton.classList.remove('is-open');
                    navMenu.classList.remove('is-open');
                    body.classList.remove('no-scroll');
                }
            });
        }
    })();
}


// =============================================
// ページ読み込み時に常に（ヘッダー読み込み前でも）実行される関数群
// =============================================

// === スクロールで要素を表示するアニメーション ===
(() => {
    const animatedItems = document.querySelectorAll('.timeline-item, .team-card');
    if (animatedItems.length === 0) return;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });
    animatedItems.forEach(item => {
        observer.observe(item);
    });
})();
