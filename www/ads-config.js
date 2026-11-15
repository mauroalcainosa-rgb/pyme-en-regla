// Configuración de anuncios. Mientras testing sea true se muestran anuncios de PRUEBA de Google (obligatorio durante el desarrollo).
// Al publicar: reemplaza los ID por los de tu cuenta AdMob y cambia testing a false (ver GUIA.md, paso 4).
window.ADS_CONFIG = {
  testing: true,
  banner: "ca-app-pub-3940256099942544/9214589741",        // ID de bloque de anuncios: Banner adaptativo
  interstitial: "ca-app-pub-3940256099942544/1033173712",  // ID de bloque de anuncios: Intersticial
  intervaloMin: 4,  // minutos mínimos entre dos anuncios de pantalla completa
  graciaMin: 2      // minutos sin anuncios de pantalla completa al abrir la app
};
