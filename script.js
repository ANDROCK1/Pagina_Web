// Variables globales
let currentSlide = 0;
let isTransitioning = false;
let obrasFiltradas = mockObras;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrusel();
    inicializarGaleria();
    inicializarFormulario();
    inicializarModal();
    inicializarNavegacion();
    cargarObrasDelPerfil();
    
    // Animaciones de entrada
    animarElementos();
});

// Inicializar carrusel
function inicializarCarrusel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Crear elementos del carrusel
    obrasDestacadas.forEach((obra, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${obra.imagen}" alt="${obra.titulo}">
            <div class="carousel-caption">
                <h3>${obra.titulo}</h3>
                <p>${obra.descripcion}</p>
            </div>
        `;
        track.appendChild(item);
    });
    
    // Event listeners para botones
    prevBtn.addEventListener('click', () => cambiarSlide(-1));
    nextBtn.addEventListener('click', () => cambiarSlide(1));
    
}

// Cambiar slide del carrusel
function cambiarSlide(direction) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const track = document.getElementById('carouselTrack');
    const totalSlides = obrasDestacadas.length;
    
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Inicializar galería
function inicializarGaleria() {
    const filtros = document.querySelectorAll('.filtro-btn');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', (e) => {
            // Remover clase activa de todos los filtros
            filtros.forEach(f => f.classList.remove('active'));
            // Agregar clase activa al filtro clickeado
            e.target.classList.add('active');
            
            // Filtrar obras
            const categoria = e.target.dataset.categoria;
            filtrarObras(categoria);
        });
    });
    
    // Cargar todas las obras inicialmente
    mostrarObras(mockObras);
}

// Filtrar obras por categoría
function filtrarObras(categoria) {
    const grid = document.getElementById('galeriaGrid');
    grid.classList.add('loading');
    
    setTimeout(() => {
        obrasFiltradas = obtenerObrasPorCategoria(categoria);
        mostrarObras(obrasFiltradas);
        grid.classList.remove('loading');
    }, 300);
}

// Mostrar obras en la galería
function mostrarObras(obras) {
    const grid = document.getElementById('galeriaGrid');
    grid.innerHTML = '';
    
    obras.forEach((obra, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item fade-in';
        item.style.animationDelay = `${index * 0.1}s`;
        item.innerHTML = `
            <img src="${obra.imagen}" alt="${obra.titulo}">
            <div class="galeria-item-info">
                <h3>${obra.titulo}</h3>
                <p>${obra.descripcion}</p>
                <span class="categoria-tag">${obra.categoria}</span>
            </div>
        `;
        
        // Agregar evento click para abrir modal
        item.addEventListener('click', () => abrirModal(obra));
        
        grid.appendChild(item);
    });
}

// Inicializar formulario
function inicializarFormulario() {
    const form = document.getElementById('formSubir');
    const imagenInput = document.getElementById('imagen');
    const preview = document.getElementById('imagePreview');
    
    // Vista previa de imagen
    imagenInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const titulo = formData.get('titulo');
        const descripcion = formData.get('descripcion');
        const categoria = formData.get('categoria');
        const imagen = formData.get('imagen');
        
        if (imagen && imagen.size > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const nuevaObra = {
                    titulo: titulo,
                    descripcion: descripcion,
                    categoria: categoria,
                    imagen: e.target.result
                };
                
                // Agregar obra a los datos mock
                const obraCreada = agregarObra(nuevaObra);
                
                // Actualizar galería
                mostrarObras(mockObras);
                cargarObrasDelPerfil();
                
                // Mostrar notificación
                mostrarNotificacion('Obra subida exitosamente', 'success');
                
                // Limpiar formulario
                form.reset();
                preview.innerHTML = '';
            };
            reader.readAsDataURL(imagen);
        }
    });
}

// Inicializar modal
function inicializarModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
}

// Abrir modal
function abrirModal(obra) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    
    modalImage.src = obra.imagen;
    modalTitle.textContent = obra.titulo;
    modalDescription.textContent = obra.descripcion;
    modalCategory.textContent = obra.categoria;
    modalCategory.className = 'categoria-tag';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Inicializar navegación suave
function inicializarNavegacion() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Ajustar por header fixed
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cargar obras del perfil
function cargarObrasDelPerfil() {
    const obrasDelPerfil = obtenerObrasDelPerfil();
    const container = document.getElementById('perfilObras');
    
    container.innerHTML = '';
    
    obrasDelPerfil.forEach((obra, index) => {
        const item = document.createElement('div');
        item.className = 'obra fade-in';
        item.style.animationDelay = `${index * 0.1}s`;
        item.innerHTML = `<img src="${obra.imagen}" alt="${obra.titulo}">`;
        
        // Agregar evento click para abrir modal
        item.addEventListener('click', () => abrirModal(obra));
        
        container.appendChild(item);
    });
}

// Animaciones de entrada
function animarElementos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    // Observar elementos que deben animarse
    const elementos = document.querySelectorAll('.section h2, .perfil-info, .form-subir');
    elementos.forEach(elemento => {
        observer.observe(elemento);
    });
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.textContent = mensaje;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para hacer scroll hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón scroll to top
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        if (!document.getElementById('scrollTopBtn')) {
            const btn = document.createElement('button');
            btn.id = 'scrollTopBtn';
            btn.innerHTML = '↑';
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            btn.addEventListener('click', scrollToTop);
            document.body.appendChild(btn);
        }
    } else {
        const btn = document.getElementById('scrollTopBtn');
        if (btn) {
            btn.remove();
        }
    }
});

// Prevenir envío de formulario si hay errores
function validarFormulario() {
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').files[0];
    
    if (!titulo || !descripcion || !categoria || !imagen) {
        mostrarNotificacion('Por favor, completa todos los campos', 'error');
        return false;
    }
    
    // Validar tipo de archivo
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!tiposPermitidos.includes(imagen.type)) {
        mostrarNotificacion('Por favor, selecciona una imagen válida (JPEG, PNG, GIF, WebP)', 'error');
        return false;
    }
    
    // Validar tamaño de archivo (máximo 5MB)
    if (imagen.size > 5 * 1024 * 1024) {
        mostrarNotificacion('La imagen no puede ser mayor a 5MB', 'error');
        return false;
    }
    
    return true;
}