Запуск тестов
1) Установить Chromium
2) Назначить переменную среды PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = true для отключения скачивания chromium при установке пакетов
3) Назначить переменную среды PUPPETEER_EXECUTABLE_PATH для указания кастомного пути к установленному chromium  (например C:\Users\имя_пользователя\AppData\Local\Chromium\Application\chrome.exe)
4) Перезагрузить ПК
5) Запустить скрипт "test:e2e" из package.json
