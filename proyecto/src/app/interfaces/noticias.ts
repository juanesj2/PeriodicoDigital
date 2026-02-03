/**
 * Interfaz que representa la estructura de un artículo individual.
 * Basada en el JSON de prueba 'pruebaAPI.json'.
 */
export interface Articulo {
  id: string; // Identificador único del artículo
  title: string; // Título de la noticia
  description: string; // Breve descripción o resumen
  content: string; // Contenido completo o parcial de la noticia
  url: string; // URL original de la noticia
  image: string; // URL de la imagen destacada
  publishedAt: string; // Fecha de publicación en formato ISO
  lang: string; // Idioma de la noticia (ej: "en")
  source: Fuente; // Objeto que representa la fuente de la noticia
}

/**
 * Interfaz para la fuente de la noticia.
 */
export interface Fuente {
  id: string; // ID de la fuente (puede ser hash)
  name: string; // Nombre legible de la fuente (ej: "Android Headlines")
  url: string; // URL principal de la fuente
  country: string; // País de origen de la fuente
}

/**
 * Interfaz para la respuesta principal de la API.
 */
export interface RespuestaNoticias {
  totalArticles: number; // Número total de artículos encontrados
  articles: Articulo[]; // Array de artículos devueltos
}
