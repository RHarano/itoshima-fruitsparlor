/**
 * 糸島フルーツパーラー - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // モバイルメニュー
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    let navOverlay = null;

    // オーバーレイを作成
    function createOverlay() {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);

        navOverlay.addEventListener('click', closeMenu);
    }

    function openMenu() {
        menuToggle.classList.add('active');
        nav.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        if (nav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    createOverlay();
    menuToggle.addEventListener('click', toggleMenu);

    // ナビリンクをクリックしたらメニューを閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ========================================
    // ヘッダースクロール
    // ========================================
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // ========================================
    // ヒーロースライダー
    // ========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % heroSlides.length;
        showSlide(next);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // インジケーターのクリック
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    startSlideshow();

    // ========================================
    // 出店実績フィルター
    // ========================================
    const worksTabs = document.querySelectorAll('.works-tab');
    const worksItems = document.querySelectorAll('.works-item');

    function filterWorks(category) {
        worksItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    worksTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            worksTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterWorks(tab.dataset.category);
        });
    });

    // ========================================
    // トップへ戻るボタン
    // ========================================
    const backToTop = document.getElementById('backToTop');

    function handleBackToTopVisibility() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', handleBackToTopVisibility);

    // ========================================
    // スムーズスクロール
    // ========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // フェードインアニメーション
    // ========================================
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .company-content, .business-card, .works-tabs, .works-grid, .contact-form');

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // フォーム送信（プレースホルダー）
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // フォームデータを取得
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // 実際の送信処理はここに実装
            // 例: fetch APIでサーバーに送信

            // 仮の成功メッセージ
            alert('お問い合わせありがとうございます。\n内容を確認の上、担当者よりご連絡いたします。');
            contactForm.reset();
        });
    }

    // ========================================
    // 郵便番号自動入力（オプション機能）
    // ========================================
    const postalInput = document.getElementById('postal');
    const addressInput = document.getElementById('address');

    if (postalInput && addressInput) {
        postalInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');

            // ハイフンを自動挿入
            if (value.length > 3) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7);
            } else {
                e.target.value = value;
            }
        });
    }

    // ========================================
    // パフォーマンス最適化
    // ========================================
    // スクロールイベントのスロットリング
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHeaderScroll();
                handleBackToTopVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }

    // 既存のスクロールイベントを最適化版に置き換え
    window.removeEventListener('scroll', handleHeaderScroll);
    window.removeEventListener('scroll', handleBackToTopVisibility);
    window.addEventListener('scroll', onScroll);
});
