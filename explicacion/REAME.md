📊 Funcionamiento del Código
📄 index.html
Estructura base de la aplicación.

Contiene el <canvas> para el gráfico y los selectores de criptomonedas.

🎨 styles.css
Diseño responsive con Flexbox/Grid.

Animaciones para cambios de precio (ej: subida/bajada).

📜 script.js
fetchCryptoData(): Obtiene datos de la API.

updateChart(): Actualiza el gráfico con nuevos datos.

Event listeners: Para selección de criptomonedas y rango de tiempo.

Configuración personalizada de Chart.js (colores, leyendas, ejes).

🛡️ service-worker.js
Hace que la app funcione offline (PWA).

Almacena en caché los archivos estáticos.

🐳 Dockerfile
Configura Nginx para servir la app estática.

dockerfile
Copy
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80

🤝 Contribuciones
¡Se aceptan PRs! Abre un issue para proponer mejoras.

📜 Licencia
MIT © [Tu Nomre]

🌐 Accede a la app: http://127.0.0.1:5500/index.html

¿Preguntas? ¡Abre un issue o contáctame en antoruno1@email.com!