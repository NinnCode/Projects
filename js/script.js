// Wait for the document to be fully loaded and ready before running any scripts.
$(document).ready(function () {

    // =================================================================
    //  INITIALIZE BOOTSTRAP COMPONENTS & THIRD-PARTY LIBRARIES
    // =================================================================

    // Initialize Bootstrap's tooltip component
    $('[data-toggle="tooltip"]').tooltip();

    // Initialize Isotope after all images are loaded
    var $projectsContainer = $('.projects-container');
    if ($projectsContainer.length) {
        $projectsContainer.imagesLoaded(function () {
            $projectsContainer.isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'masonry',
                filter: '.js-id-VLSI',
                percentPosition: true,
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    }

    // =================================================================
    //  EVENT LISTENERS
    // =================================================================

    // --- Isotope Filter Button Clicks ---
    $('.project-filters').on('click', 'a', function (e) {
        e.preventDefault();
        var filterValue = $(this).attr('data-filter');
        $projectsContainer.isotope({ filter: filterValue });
        $('.project-filters a').removeClass('active');
        $(this).addClass('active');
    });

    // --- Dark Mode Toggler Click ---
    const darkModeToggler = document.getElementById('dark-mode-toggler');
    if (darkModeToggler) {
        darkModeToggler.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAndSaveTheme();
        });
    }

    // --- Lightbox Image Clicks ---
    const imageModal = document.getElementById("imageModal");
    if (imageModal) {
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");
        const zoomableImages = document.getElementsByClassName("zoomable-image");
        const closeModalSpan = document.getElementsByClassName("close-modal")[0];

        for (let i = 0; i < zoomableImages.length; i++) {
            zoomableImages[i].onclick = function () {
                imageModal.classList.add("visible");
                modalImg.src = this.src;
                if (captionText) {
                    captionText.innerHTML = this.alt;
                }
            }
        }

        function closeModal() {
            imageModal.classList.remove("visible");
        }

        if (closeModalSpan) {
            closeModalSpan.onclick = closeModal;
        }

        imageModal.onclick = function (event) {
            if (event.target == imageModal) {
                closeModal();
            }
        }
    }

    // =================================================================
    //  DARK MODE THEME LOGIC
    // =================================================================
    
    function applyTheme(isDark) {
        const body = document.body;
        const icon = darkModeToggler ? darkModeToggler.querySelector('i') : null;

        if (icon) {
            if (isDark) {
                body.classList.add('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                body.classList.remove('dark-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    function toggleAndSaveTheme() {
        const isNowDark = !document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isNowDark ? 'true' : 'false');
        applyTheme(isNowDark);
    }
    
    // --- Initial Theme Setup on Page Load ---
    // This self-invoking function runs once when the script is loaded
    (function () {
        let initialThemeIsDark;
        const savedTheme = localStorage.getItem('dark-mode');

        if (savedTheme !== null) {
            initialThemeIsDark = (savedTheme === 'true');
        } else {
            initialThemeIsDark = document.body.classList.contains('dark-mode');
        }
        applyTheme(initialThemeIsDark);
    })();

});


// =================================================================
document.addEventListener('DOMContentLoaded', function() {
    const langVI = document.getElementById('lang-vi');
    const langEN = document.getElementById('lang-en');
    const translatableElements = document.querySelectorAll('[data-en]');

    // Hàm chuyển đổi ngôn ngữ
    function switchLanguage(lang) {
        translatableElements.forEach(element => {
            element.innerHTML = element.dataset[lang];
        });

        // Cập nhật trạng thái active cho nút
        if (lang === 'vi') {
            langVI.classList.add('active');
            langEN.classList.remove('active');
        } else {
            langEN.classList.add('active');
            langVI.classList.remove('active');
        }
        // Lưu lựa chọn ngôn ngữ vào localStorage
        localStorage.setItem('portfolioLanguage', lang);
    }

    // Gán sự kiện click cho các nút
    langVI.addEventListener('click', () => switchLanguage('vi'));
    langEN.addEventListener('click', () => switchLanguage('en'));

    // Kiểm tra ngôn ngữ đã lưu hoặc đặt mặc định là Tiếng Việt
    const savedLang = localStorage.getItem('portfolioLanguage') || 'vi';
    switchLanguage(savedLang);
});