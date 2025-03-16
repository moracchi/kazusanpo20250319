document.addEventListener('DOMContentLoaded', function() {
    // 桜の花びらアニメーション
    createSakura();
    
    // タイムラインの表示アニメーション
    animateTimeline();
    
    // スクロール時にタイムラインアイテムを表示
    window.addEventListener('scroll', function() {
        animateTimeline();
    });
    
    // タッチイベントの追加（モバイル向け）
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        item.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
});

// 桜の花びらを生成する関数
function createSakura() {
    const sakuraContainer = document.querySelector('.sakura-container');
    const colors = ['#ffd7e6', '#ffecec', '#ffc9d5'];
    
    // CSSで桜の花びらを作成
    for (let i = 0; i < 30; i++) {
        const sakura = document.createElement('div');
        sakura.classList.add('sakura');
        
        // サイズをランダムに設定
        const size = Math.random() * 15 + 5;
        sakura.style.width = `${size}px`;
        sakura.style.height = `${size}px`;
        
        // 色をランダムに設定
        sakura.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 開始位置をランダムに設定
        sakura.style.left = `${Math.random() * 100}%`;
        sakura.style.top = `-${size}px`;
        
        // アニメーションの設定
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        // アニメーションの適用
        sakura.animate([
            { 
                transform: `rotate(45deg) translateY(-10px)`,
                opacity: 0
            },
            { 
                opacity: 0.8,
                offset: 0.1
            },
            { 
                transform: `rotate(${360 + 45}deg) translateY(${window.innerHeight}px)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity
        });
        
        // 左右の揺れアニメーション
        sakura.animate([
            { transform: `rotate(45deg) translateX(-5px)` },
            { transform: `rotate(45deg) translateX(5px)` }
        ], {
            duration: (duration / 2) * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
        
        sakuraContainer.appendChild(sakura);
    }
}

// タイムラインのアニメーションを実行する関数
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 要素が画面内に入ったらvisibleクラスを追加（遅延を付ける）
        if (rect.top < windowHeight * 0.85) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 150); // 連続して表示されるように遅延を設定
        }
    });
}

// ページロード時に一度実行
window.addEventListener('load', function() {
    // 遅延を付けて各要素を表示
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 500 + index * 200);
    });
});
