📈 Crypto Tracker Pro
Docker | GitHub Actions | MIT License

Crypto Tracker Pro es una aplicación web minimalista que muestra precios de criptomonedas en tiempo real con gráficos interactivos, usando la API de CoinGecko y empaquetada con Docker para fácil despliegue.

🚀 Características

📊 Gráficos en tiempo real con Chart.js

💰 Soporte para múltiples criptomonedas (BTC, ETH, etc.)

🔔 Notificaciones de cambios de precio cada 24 horas

🛰️ Funciona offline como PWA (Service Worker)

🐳 Despliegue sencillo con Docker + Nginx

🖼️ Vista previa
(Puedes agregar aquí un GIF o captura de pantalla)

� Tecnologías usadas
JavaScript Vanilla (ES6+)

Chart.js para visualización de datos

CoinGecko API

Docker + Nginx

HTML5 + CSS3 (Flexbox/Grid)

📦 Instalación con Docker
bash
Copy
# Clona el repositorio
git clone https://github.com/L0rDB0t/cryptotracker-pro.git
cd cryptotracker-pro

# Construye la imagen Docker
docker build -t crypto-tracker .

# Ejecuta el contenedor
docker run -d -p 80:80 crypto-tracker
✨ Listo! Accede en: http://localhost

📊 Funcionamiento del código
index.html: Estructura base con <canvas> para gráficos.

styles.css: Diseño responsive y animaciones CSS.

script.js:

fetchCryptoData(): Conexión con CoinGecko API.

updateChart(): Renderizado dinámico con Chart.js.

service-worker.js: Cache para modo offline (PWA).

Dockerfile: Configuración optimizada con Nginx.

dockerfile
Copy
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
🤝 Contribuciones
¡PRs son bienvenidos! Reporta bugs o mejoras en Issues.

📜 Licencia
MIT © L0rDB0t

🌐 Demo: [http://localhost](http://127.0.0.1:5500/index.html) | 📧 Contacto: antoruno1@email.com
