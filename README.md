# 🏊‍♂️ MOSiR Leżajsk - System Rezerwacji Obiektów Sportowych (Frontend)

[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Hackathon](https://img.shields.io/badge/Project-Hackathon-orange.svg)]()

> Frontendowa część aplikacji stworzona w ramach Hackathonu przez zespół **Take-Four Interactive**. Nowoczesny interfejs użytkownika do systemu zarządzania i rezerwacji dla Miejskiego Ośrodka Sportu i Rekreacji w Leżajsku.

## 📖 O projekcie

Aplikacja frontend udostępnia interfejs użytkownika do zarządzania rezerwacjami obiektów sportowych (basen, siłownia, korty tenisowe). Zbudowana na nowoczesnym stacku technologicznym z TypeScript, React i TailwindCSS, komunikuje się z API backendu poprzez REST.

Projekt korzysta z API udostępnianego przez backend. Dokumentacja API znajduje się w README backendu: https://github.com/take-four-interactive/backend/blob/main/README.md

## 🛠 Technologie

* **Język & Framework:** TypeScript, React 18
* **Build Tool:** Vite
* **Stylowanie:** TailwindCSS, shadcn/ui (komponenty Radix)
* **Routing:** react-router-dom
* **Zarządzanie stanem:** @tanstack/react-query
* **Walidacja:** zod, react-hook-form
* **Testy:** Vitest, @playwright/test
* **Linter:** ESLint

## 💻 Uruchomienie lokalne

Aby uruchomić projekt na swoim komputerze, upewnij się, że masz zainstalowany Node.js w wersji 18 lub wyższej.

### Instalacja

W katalogu projektu uruchom:

```cmd
npm install
```

### Konfiguracja

Utwórz plik `.env.local` w katalogu głównym projektu i dodaj adres API:

```text
VITE_API_URL=https://unaverred-armida-clownishly.ngrok-free.dev
```

Gdzie `http://localhost:8000` to adres, pod którym dostępny jest backend (dostosuj do swojego środowiska).

### Uruchomienie

```cmd
npm run dev
```

Domyślnie serwer uruchomi się na http://localhost:5173

## 📜 Dostępne skrypty

* `npm run dev` — uruchamia serwer developerski
* `npm run build` — buduje aplikację do folderu `dist`
* `npm run build:dev` — build z trybem development
* `npm run preview` — podgląd zbudowanej wersji
* `npm run lint` — sprawdza kod za pomocą ESLint

## 📁 Struktura projektu

```
src/
├── components/       # Komponenty UI (w tym shadcn/ui)
├── pages/           # Strony i widoki
├── lib/             # Moduły pomocnicze (api, types, utils)
├── hooks/           # Custom React hooks
├── assets/          # Obrazy i zasoby statyczne
├── App.tsx          # Główny komponent aplikacji
└── main.tsx         # Punkt wejścia
```

## 🔗 Linki

* Backend (dokumentacja API): https://github.com/take-four-interactive/backend/blob/main/README.md
* Vite: https://vitejs.dev/
* TailwindCSS: https://tailwindcss.com/
* shadcn/ui: https://github.com/shadcn/ui
