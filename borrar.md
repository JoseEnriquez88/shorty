<!-- * Crear multiples archivos en powershel -->

@("deleteFavorite.js", "getFavoriteByUser.js", "postFavorite.js") | % { New-Item -ItemType File -Name $_ }

<!-- * Crear multiples carpetas en poweshell -->

@("Carpeta1", "Carpeta2", "Carpeta3") | % { New-Item -ItemType Directory -Name $_ }

<!-- * Elimina node_modules y el lockfile por si hay conflictos -->

Remove-Item -Recurse -Force node_modules, package-lock.json


.\venv\Scripts\Activate
