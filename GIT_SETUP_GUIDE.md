# 🚀 Guía Completa: Git + GitHub + Vercel

## Paso 1: Instalar Git (5 minutos)

### Descarga Git
1. Ve a: **[git-scm.com/download/win](https://git-scm.com/download/win)**
2. La descarga debería iniciar automáticamente
3. Si no, click en **"Click here to download manually"**

### Instala Git
1. Abre el archivo descargado (`Git-2.xx.x-64-bit.exe`)
2. **Importante**: Durante la instalación:
   - ✅ Acepta todas las opciones por defecto
   - ✅ En "Adjusting your PATH environment": Selecciona **"Git from the command line and also from 3rd-party software"**
   - ✅ En "Choosing the default editor": Puedes dejar Vim o cambiar a Notepad
   - ✅ Click "Next" hasta terminar

3. **Reinicia VS Code** (o tu terminal) después de instalar

### Verifica la instalación
Abre una nueva terminal y ejecuta:
```bash
git --version
```
Deberías ver algo como: `git version 2.43.0`

---

## Paso 2: Configurar Git (2 minutos)

Abre la terminal en tu proyecto y ejecuta estos comandos (reemplaza con tu info):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

**Ejemplo:**
```bash
git config --global user.name "Mateo Jaramillo"
git config --global user.email "mateo@mateojaramillo.com"
```

---

## Paso 3: Crear Cuenta en GitHub (3 minutos)

1. Ve a: **[github.com/signup](https://github.com/signup)**
2. Crea tu cuenta (usa el mismo email que configuraste en Git)
3. Verifica tu email
4. Inicia sesión

---

## Paso 4: Crear Repositorio en GitHub (2 minutos)

1. En GitHub, click el botón **"+"** (arriba derecha) → **"New repository"**
2. Llena los datos:
   - **Repository name**: `app-provision-renta` (o el nombre que quieras)
   - **Description**: "Calculadora de Provisión de Renta 2025"
   - **Public** o **Private** (tu elección)
   - ❌ **NO** marques "Add a README file"
   - ❌ **NO** marques "Add .gitignore"
3. Click **"Create repository"**

**Guarda la URL** que te muestra, algo como:
```
https://github.com/tu-usuario/app-provision-renta.git
```

---

## Paso 5: Subir tu Proyecto a GitHub (5 minutos)

### 5.1 Crear .gitignore
Ya tenemos un archivo `.gitignore` en el proyecto. Verifica que incluya:
```
node_modules
dist
.env
```

### 5.2 Inicializar Git en tu proyecto
Abre la terminal en `c:\Users\mja02\app_provision_renta` y ejecuta:

```bash
git init
```

### 5.3 Agregar todos los archivos
```bash
git add .
```

### 5.4 Hacer el primer commit
```bash
git commit -m "Initial commit - Tax Calculator 2025"
```

### 5.5 Conectar con GitHub
Reemplaza `TU-URL-DE-GITHUB` con la URL que guardaste en el Paso 4:

```bash
git remote add origin TU-URL-DE-GITHUB
```

**Ejemplo:**
```bash
git remote add origin https://github.com/mateojaramillo/app-provision-renta.git
```

### 5.6 Subir el código
```bash
git branch -M main
git push -u origin main
```

**Nota**: Te pedirá autenticación de GitHub. Opciones:
- **Opción A**: Usar GitHub Desktop (más fácil)
- **Opción B**: Crear un Personal Access Token (más técnico)

---

## Paso 6: Conectar Vercel con GitHub (3 minutos)

1. Ve a: **[vercel.com/signup](https://vercel.com/signup)**
2. Click **"Continue with GitHub"**
3. Autoriza a Vercel para acceder a tus repositorios
4. En el dashboard de Vercel:
   - Click **"Add New Project"**
   - Selecciona **"Import Git Repository"**
   - Busca `app-provision-renta`
   - Click **"Import"**

### Configuración (Automática)
Vercel detecta:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`

**No cambies nada**, click **"Deploy"**

---

## Paso 7: ¡Listo! (2 minutos)

1. Espera 1-2 minutos mientras Vercel hace el build
2. Cuando termine, verás: **"Congratulations!"**
3. Te da una URL: `https://app-provision-renta-abc123.vercel.app`
4. **¡Comparte esa URL con quien quieras!**

---

## 🔄 Para Actualizar en el Futuro

Cuando hagas cambios en tu código:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

✅ **Vercel hace deploy automáticamente** - ¡No necesitas hacer nada más!

---

## 🆘 Troubleshooting

### Git no se reconoce después de instalar
- Reinicia VS Code o tu terminal
- Cierra y abre una nueva ventana de PowerShell

### Error al hacer push (autenticación)
**Solución fácil**: Usa GitHub Desktop
1. Descarga: [desktop.github.com](https://desktop.github.com)
2. Instala y conecta con tu cuenta de GitHub
3. "Add Local Repository" → Selecciona `app_provision_renta`
4. Click "Publish repository"

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin TU-URL-DE-GITHUB
```

---

## 💡 Comandos Git Útiles

```bash
# Ver estado de archivos
git status

# Ver historial de cambios
git log --oneline

# Ver qué archivos cambiaron
git diff

# Deshacer cambios no guardados
git checkout -- archivo.js
```

---

## ✅ Checklist Final

- [ ] Git instalado y configurado
- [ ] Cuenta de GitHub creada
- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Vercel conectado a GitHub
- [ ] Deploy exitoso
- [ ] URL pública funcionando

---

**¿En qué paso estás? Te ayudo con lo que necesites.**
