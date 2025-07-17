// Mock data para la galería de arte
const mockObras = [
  {
    id: 1,
    titulo: "Naturaleza Muerta Clásica",
    descripcion: "Una hermosa composición floral que captura la esencia de la vida en un momento eterno. Técnica al óleo sobre lienzo.",
    categoria: "pintura",
    imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxhcnR3b3JrfGVufDB8fHx8MTc1MjU5NDk0N3ww&ixlib=rb-4.1.0&q=85",
    autor: "Ana García",
    fechaCreacion: "2024-01-15"
  },
  {
    id: 2,
    titulo: "Paisaje Boscoso",
    descripcion: "Un paisaje sereno que invita a la contemplación. Inspirado en los grandes maestros del paisajismo clásico.",
    categoria: "pintura",
    imagen: "https://images.unsplash.com/photo-1581592487771-132f53bd2b48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxhcnR3b3JrfGVufDB8fHx8MTc1MjU5NDk0N3ww&ixlib=rb-4.1.0&q=85",
    autor: "Carlos Mendoza",
    fechaCreacion: "2024-02-10"
  },
  {
    id: 3,
    titulo: "Florero con Flores",
    descripcion: "Una delicada composición floral que celebra la belleza efímera de las flores. Colores vibrantes y técnica refinada.",
    categoria: "pintura",
    imagen: "https://i.pinimg.com/736x/09/20/2d/09202d2a65ca42d458d9949362cc965c.jpg",
    autor: "María López",
    fechaCreacion: "2024-01-28"
  },
  {
    id: 4,
    titulo: "Techo Barroco",
    descripción: "Impresionante obra de arte barroco que decora un techo histórico. Técnica al fresco con detalles dorados.",
    categoria: "pintura",
    imagen: "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwYWludGluZ3N8ZW58MHx8fHwxNzUyNTA0MzE3fDA&ixlib=rb-4.1.0&q=85",
    autor: "Escuela Italiana",
    fechaCreacion: "2024-03-05"
  },
  {
    id: 5,
    titulo: "El Cañonazo",
    descripcion: "Escena marítima dramática que captura la potencia del mar y la navegación histórica. Técnica al óleo con gran detalle.",
    categoria: "pintura",
    imagen: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxwYWludGluZ3N8ZW58MHx8fHwxNzUyNTA0MzE3fDA&ixlib=rb-4.1.0&q=85",
    autor: "Roberto Silva",
    fechaCreacion: "2024-02-20"
  },
  {
    id: 6,
    titulo: "Retrato Moderno",
    descripcion: "Exploración contemporánea del retrato clásico con técnicas mixtas y elementos digitales.",
    categoria: "digital",
    imagen: "https://i.pinimg.com/1200x/42/a0/d6/42a0d6e9f4154aea037d04bddd638aa5.jpg",
    autor: "Ana García",
    fechaCreacion: "2024-03-12"
  },
  {
    id: 7,
    titulo: "Escultura Abstracta",
    descripcion: "Forma abstracta que juega con la luz y el espacio. Bronce patinado sobre base de mármol.",
    categoria: "escultura",
    imagen: "https://i.pinimg.com/736x/c5/b3/eb/c5b3ebffea2151f492d14e06018d64c4.jpg",
    autor: "Diego Herrera",
    fechaCreacion: "2024-01-08"
  },
  {
    id: 8,
    titulo: "Fotografía Urbana",
    descripcion: "Captura de la vida urbana contemporánea con enfoque en la arquitectura y el movimiento humano.",
    categoria: "fotografia",
    imagen: "https://i.pinimg.com/736x/c7/96/e1/c796e171322df24e711fffdcfc4eed14.jpg",
    autor: "Laura Martín",
    fechaCreacion: "2024-02-25"
  },
  {
    id: 9,
    titulo: "Boceto Expresivo",
    descripcion: "Dibujo a carboncillo que explora la expresión humana a través de trazos libres y espontáneos.",
    categoria: "dibujo",
    imagen: "https://i.pinimg.com/1200x/ec/6d/05/ec6d05539f257a871b289c9d94a466e8.jpg",
    autor: "José Ramírez",
    fechaCreacion: "2024-03-01"
  }
];

// Obras destacadas para el carrusel
const obrasDestacadas = [
  {
    id: 1,
    titulo: "Naturaleza Muerta Clásica",
    descripcion: "Una hermosa composición floral que captura la esencia de la vida en un momento eterno.",
    imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxhcnR3b3JrfGVufDB8fHx8MTc1MjU5NDk0N3ww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    titulo: "Paisaje Boscoso",
    descripcion: "Un paisaje sereno que invita a la contemplación y la reflexión.",
    imagen: "https://images.unsplash.com/photo-1581592487771-132f53bd2b48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxhcnR3b3JrfGVufDB8fHx8MTc1MjU5NDk0N3ww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    titulo: "Florero con Flores",
    descripcion: "Una delicada composición floral que celebra la belleza efímera de las flores.",
    imagen: "https://i.pinimg.com/736x/09/20/2d/09202d2a65ca42d458d9949362cc965c.jpg"
  },
  {
    id: 4,
    titulo: "Techo Barroco",
    descripcion: "Impresionante obra de arte barroco que decora un techo histórico.",
    imagen: "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxwYWludGluZ3N8ZW58MHx8fHwxNzUyNTA0MzE3fDA&ixlib=rb-4.1.0&q=85"
  }
];

// Función para obtener obras por categoría
function obtenerObrasPorCategoria(categoria) {
  if (categoria === 'todos') {
    return mockObras;
  }
  return mockObras.filter(obra => obra.categoria === categoria);
}

// Función para obtener obras del perfil actual
function obtenerObrasDelPerfil() {
  return mockObras.filter(obra => obra.autor === 'Ana García');
}

// Función para agregar una nueva obra
function agregarObra(nuevaObra) {
  const id = mockObras.length + 1;
  const obra = {
    id: id,
    ...nuevaObra,
    autor: 'Ana García',
    fechaCreacion: new Date().toISOString().split('T')[0]
  };
  mockObras.push(obra);
  return obra;
}