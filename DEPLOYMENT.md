# 🚀 Guía de Deployment - Vercel

## ✅ Verificación Completada
- ✅ Build de producción exitoso (`npm run build`)
- ✅ Configuración de Vite lista
- ✅ Dependencias correctas

---

## 📋 Opción 1: Deploy desde la Web (Más Fácil)

### Paso 1: Preparar el Proyecto
1. Asegúrate de que todos los archivos estén guardados
2. Si usas Git, haz commit de los cambios:
   ```bash
   git add .
   git commit -m "Preparar para deployment"
   git push
   ```

### Paso 2: Crear Cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Click en **"Sign Up"**
3. Usa tu cuenta de GitHub/GitLab/Bitbucket (recomendado)

### Paso 3: Importar Proyecto
1. En el dashboard de Vercel, click **"Add New Project"**
2. **Opción A - Desde Git** (recomendado):
   - Conecta tu repositorio
   - Selecciona el proyecto `app_provision_renta`
   - Vercel detecta automáticamente que es Vite
   - Click **"Deploy"**

3. **Opción B - Sin Git**:
   - Click **"Deploy without Git"**
   - Arrastra la carpeta del proyecto
   - Vercel detecta la configuración
   - Click **"Deploy"**

### Paso 4: Configuración (Automática)
Vercel detecta automáticamente:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

✅ **No necesitas cambiar nada**

### Paso 5: Deploy
1. Click **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! Vercel te da una URL: `https://tu-proyecto.vercel.app`

---

## 📋 Opción 2: Deploy desde CLI (Avanzado)

### Instalación
```bash
npm install -g vercel
```

### Deploy
```bash
cd c:\Users\mja02\app_provision_renta
vercel
```

Sigue las instrucciones en pantalla.

---

## 🎨 Personalización (Opcional)

### Dominio Personalizado
1. En Vercel Dashboard → tu proyecto
2. Settings → Domains
3. Agrega tu dominio (ej: `calculadora-renta.com`)
4. Sigue las instrucciones de DNS

### Variables de Entorno
Si necesitas agregar variables:
1. Settings → Environment Variables
2. Agrega las que necesites

---

## 🔄 Actualizaciones Futuras

### Con Git conectado:
```bash
git add .
git commit -m "Actualización"
git push
```
✅ Vercel hace deploy automáticamente

### Sin Git:
1. Haz los cambios
2. En Vercel Dashboard → Deployments
3. Click **"Redeploy"**

---

## 📊 Monitoreo

Vercel te da acceso a:
- 📈 Analytics (visitas, rendimiento)
- 🐛 Error logs
- 🚀 Deploy history
- 📱 Preview de cada deploy

---

## 💡 Tips

1. **Preview Deployments**: Cada branch/PR genera una URL de preview
2. **Rollback**: Puedes volver a cualquier deploy anterior
3. **HTTPS**: Automático, no necesitas configurar nada
4. **CDN Global**: Tu app se sirve desde el servidor más cercano al usuario

---

## 🆘 Troubleshooting

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel Dashboard

### Error: "Page not found" en rutas
- Ya está configurado en `vercel.json` (SPA routing)

### Límites del Plan Gratuito
- 100GB bandwidth/mes
- Builds ilimitados
- 100 deployments/día

**Para esta demo, el plan gratuito es más que suficiente.**
