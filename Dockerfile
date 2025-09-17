# Usar imagen oficial de Node.js
FROM node:18-alpine

# Información del mantenedor
LABEL maintainer="your-email@example.com"
LABEL description="Health Endpoint Service"

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S healthcheck -u 1001

# Copiar código fuente
COPY src/ ./src/

# Cambiar ownership a usuario nodejs
RUN chown -R healthcheck:nodejs /app
USER healthcheck

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Comando por defecto
CMD ["npm", "start"]