// Sistema de navegação entre slides
const slides = [
    'slide_capa.html',
    'slide_problema.html',
    'slide_solucao.html',
    'slide_ml_intro.html',
    'slide_beneficios.html',
    'slide_dados_exogenos.html',
    'slide_modelos_nao_lineares.html',
    'slide_redes_neurais.html',
    'slide_casos_sucesso.html',
    'slide_outras_aplicacoes.html',
    'slide_proximos_passos.html',
    'slide_contato.html'
];

function getCurrentSlideIndex() {
    const currentFile = window.location.pathname.split('/').pop();
    return slides.indexOf(currentFile);
}

function navigateToSlide(direction) {
    const currentIndex = getCurrentSlideIndex();
    let nextIndex;
    
    if (direction === 'next') {
        nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            // Volta para a página principal
            window.location.href = '../index.html';
            return;
        }
    } else if (direction === 'prev') {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            // Volta para a página principal
            window.location.href = '../index.html';
            return;
        }
    }
    
    window.location.href = slides[nextIndex];
}

function goHome() {
    window.location.href = '../index.html';
}

// Adiciona navegação por teclado
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ': // Espaço
            navigateToSlide('next');
            break;
        case 'ArrowLeft':
            navigateToSlide('prev');
            break;
        case 'Home':
            goHome();
            break;
        case 'Escape':
            goHome();
            break;
    }
});

// Adiciona os botões de navegação quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    addNavigationButtons();
});

function addNavigationButtons() {
    const currentIndex = getCurrentSlideIndex();
    
    // Cria container de navegação
    const navContainer = document.createElement('div');
    navContainer.className = 'slide-navigation';
    navContainer.innerHTML = `
        <div class="nav-buttons">
            <button onclick="goHome()" class="nav-btn home-btn" title="Página Principal (Esc)">🏠</button>
            <button onclick="navigateToSlide('prev')" class="nav-btn prev-btn" title="Slide Anterior (←)">‹</button>
            <span class="slide-counter">${currentIndex + 1} / ${slides.length}</span>
            <button onclick="navigateToSlide('next')" class="nav-btn next-btn" title="Próximo Slide (→)">›</button>
        </div>
        <div class="nav-help">
            Use as setas do teclado ou clique nos botões para navegar
        </div>
    `;
    
    // Adiciona estilos
    const style = document.createElement('style');
    style.textContent = `
        .slide-navigation {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            padding: 15px 20px;
            border-radius: 25px;
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        .nav-buttons {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 5px;
        }
        
        .nav-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            min-width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .nav-btn:hover {
            background: #45a049;
            transform: scale(1.1);
        }
        
        .home-btn {
            background: #2196F3;
        }
        
        .home-btn:hover {
            background: #1976D2;
        }
        
        .prev-btn {
            background: #FF9800;
        }
        
        .prev-btn:hover {
            background: #F57C00;
        }
        
        .next-btn {
            background: #FF5722;
        }
        
        .next-btn:hover {
            background: #D84315;
        }
        
        .slide-counter {
            color: white;
            font-weight: bold;
            font-size: 14px;
            min-width: 60px;
            text-align: center;
        }
        
        .nav-help {
            color: #ccc;
            font-size: 12px;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .slide-navigation {
                bottom: 10px;
                padding: 10px 15px;
            }
            
            .nav-btn {
                padding: 8px 12px;
                min-width: 35px;
                height: 35px;
                font-size: 14px;
            }
            
            .nav-help {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(navContainer);
}

