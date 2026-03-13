# Mage Guild Wars — Specyfikacja Techniczna Projektu

---

## Spis treści

- [1. Wstęp](#1-wstęp)
  - [1.1 Opis projektu](#11-opis-projektu)
  - [1.2 Cel biznesowy](#12-cel-biznesowy)
  - [1.3 Stos technologiczny](#13-stos-technologiczny)
  - [1.4 Charakter aplikacji](#14-charakter-aplikacji)
- [2. Role i uprawnienia użytkowników](#2-role-i-uprawnienia-użytkowników)
  - [2.1 Definicje ról](#21-definicje-ról)
  - [2.2 Macierz uprawnień](#22-macierz-uprawnień)
  - [2.3 Model uprawnień — zasady projektowe](#23-model-uprawnień--zasady-projektowe)
  - [2.4 Uwagi do ról](#24-uwagi-do-ról)
- [TODO](#todo)

---

## 1. Wstęp

### 1.1 Opis projektu

**MageGuildWars** to aplikacja fullstackowa będąca systemem CMS (Content Management System) działającym jako platforma CRUD, przeznaczona do prowadzenia rozgrywki **PBF (Play By Forum)** — tekstowej gry fabularnej osadzonej w świecie mangi i anime **Fairy Tail**.

Aplikacja odzwierciedla działanie typowych silników forów internetowych, rozszerzonych o mechaniki RPG charakterystyczne dla świata Fairy Tail. Świat fabularny jest własną interpretacją tego uniwersum — gracze eksplorują kontynent Fiore, wstępują do gildii magów, rozwijają unikalne zdolności magiczne i uczestniczą w fabularnych wydarzeniach tworzonych przez Mistrzów Gry. Każda akcja, walka i decyzja rozgrywana jest w formie pisanej narracji, gdzie liczy się kreatywność, spójność z lore'em i jakość odgrywania postaci.

Projekt łączy tradycję forów PBF z nowoczesnymi mechanikami CMS — dając administratorom pełną kontrolę nad treścią, a graczom intuicyjne narzędzia do budowania historii.

### 1.2 Cel biznesowy

MageGuildWars ma za zadanie dostarczyć społeczności PBF wyspecjalizowane środowisko, którego nie oferują generyczne platformy forowe. Kluczowe cele to:

- **Retencja graczy** — angażująca przestrzeń fabularna, system progresji postaci i aktywne gildie tworzą powody do regularnych powrotów.
- **Jakość narracji** — dedykowane narzędzia do pisania postów, zarządzania wątkami i śledzenia fabuły podnoszą poziom rozgrywki.
- **Skalowalność społeczności** — panel moderacyjny i administracyjny pozwala ekipie prowadzącej serwer zarządzać rosnącą liczbą graczy bez utraty kontroli nad światem gry.
- **Spójność świata** — centralnie zarządzane dane (gildie, magie, bestiariusz, lokacje) zapewniają jednolity kanon lore'u dla wszystkich uczestników.
- **Dostępność** — responsywny interfejs umożliwia grę zarówno na desktopie, jak i na urządzeniach mobilnych, obniżając próg wejścia dla nowych graczy.

### 1.3 Stos technologiczny

| Warstwa | Technologia | Uwagi |
|---------|-------------|-------|
| Frontend | **Next.js** (React) | SSR/SSG, routing, UI |
| Biblioteka UI | **Mantine** | Komponenty, theming, formularze, powiadomienia |
| Backend | **NestJS** | REST API, logika biznesowa |
| ORM | **TypeORM** | Zamiast Prismy — wymaganie serwera hostingowego |
| Baza danych | **PostgreSQL** | Relacyjna baza danych |
| Język | **TypeScript** | Pełny stack |

> **Uwaga:** Prisma nie jest wspierana przez serwer hostingowy — TypeORM jest wymaganym ORM dla tego projektu.

### 1.4 Charakter aplikacji

- **Typ:** CMS + forum RPG
- **Model danych:** Relacyjny (TypeORM + PostgreSQL)
- **Interakcja:** CRUD — tworzenie, odczytywanie, edytowanie i usuwanie postów, postaci, wątków, gildii i innych encji
- **Użytkownicy:** Gracze, Mistrzowie Gry (GM), Moderatorzy, Administratorzy

---

## 2. Role i uprawnienia użytkowników

### 2.1 Definicje ról

| # | Rola | Opis |
|---|------|------|
| 1 | **Nowy użytkownik** | Nadawana automatycznie po rejestracji. Mocno ograniczona — tylko edycja profilu i założenie Karty Postaci. |
| 2 | **Gracz** | Pełnoprawna rola z dostępem do wszystkich podstawowych funkcji potrzebnych do prowadzenia rozgrywki. |
| 3 | **Mistrz Gry (GM)** | Rozszerzenie roli Gracza o funkcjonalności prowadzenia sesji: tworzenie wydarzeń fabularnych, zarządzanie NPC, kontrola wątków narracyjnych. |
| 4 | **Moderator** | Odpowiada za moderację użytkowników oraz zarządzanie wątkami i lokacjami w systemie. |
| 5 | **Administrator** | Pełna władza nad systemem — dostęp do wszystkich funkcji bez ograniczeń. |
| 6 | **Zbanowany** | Dostęp wyłącznie do podglądu publicznych sekcji. Żadne akcje nie są możliwe. |

---

### 2.2 Macierz uprawnień

> Legenda: ✅ — dozwolone &nbsp;|&nbsp; ❌ — niedozwolone

| Nazwa uprawnienia | Klucz uprawnienia | Nowy użytkownik | Gracz | Mistrz Gry | Moderator | Administrator | Zbanowany |
|-------------------|-------------------|:-:|:-:|:-:|:-:|:-:|:-:|
| **PROFIL** | | | | | | | |
| Podgląd profilu | `profile.view` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edycja danych podstawowych (własnych) | `profile.edit.basic.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edycja powiadomień (własnych) | `profile.edit.notifications.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Zmiana hasła (własnego) | `profile.password.change.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edycja danych podstawowych (cudzych) | `profile.edit.basic.other` | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Edycja powiadomień (cudzych) | `profile.edit.notifications.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Reset hasła (cudzego) | `profile.password.reset.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **KARTA POSTACI** | | | | | | | |
| Podgląd zatwierdzonej karty postaci (cudzej) | `character.view.other` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Podgląd własnej karty postaci (w tym draft) | `character.view.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Podgląd niezatwierdzonej karty postaci (cudzej) | `character.view.other.draft` | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Utworzenie karty postaci | `character.create` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edycja danych podstawowych (własnych) | `character.edit.basic.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edycja historii postaci (własnej) | `character.edit.history.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Zarządzanie magią (własną) | `character.edit.magic.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Zarządzanie zaklęciami (własnymi) | `character.edit.spells.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Zarządzanie umiejętnościami (własnymi) | `character.edit.skills.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Przydział statystyk (własnych) | `character.edit.stats.own` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Zatwierdzenie karty postaci | `character.approve` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Edycja danych podstawowych (cudzych) | `character.edit.basic.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Edycja historii postaci (cudzej) | `character.edit.history.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Zarządzanie magią (cudzą) | `character.edit.magic.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Zarządzanie zaklęciami (cudzymi) | `character.edit.spells.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Zarządzanie umiejętnościami (cudzymi) | `character.edit.skills.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Edycja statystyk (cudzych) | `character.edit.stats.other` | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

---

### 2.3 Model uprawnień — zasady projektowe

System uprawnień oparty jest o **Permission-based RBAC** — hybrydę czystego RBAC z możliwością nadawania wyjątków na poziomie pojedynczego użytkownika.

#### Klucze uprawnień opisują akcję i zakres, nie rolę

Klucz uprawnienia mówi **co** można zrobić i **na czym** — nigdy **kto** to robi. Role to osobna warstwa przypisująca zestawy uprawnień.

```
✅ character.edit.basic.other   → edytujesz cudze dane podstawowe
❌ character.edit.basic.mod     → (anty-wzorzec: rola w nazwie uprawnienia)
```

Konwencja zakresu:
- `.own` — akcja na własnym zasobie
- `.other` — akcja na cudzym zasobie
- `.other.draft` — akcja na cudzym zasobie w stanie roboczym (przed zatwierdzeniem)

#### Wyjątki na poziomie użytkownika

Każdemu użytkownikowi można nadać lub odebrać konkretne uprawnienie niezależnie od jego roli, przez tabelę `user_permissions`:

```
user_permissions
─────────────────────────────────────
user_id        → który użytkownik
permission_id  → które uprawnienie
granted        → true = dodane / false = odebrane
```

Priorytet decyzji:
1. `user_permissions.granted = true` → zawsze tak (override ponad rolę)
2. `user_permissions.granted = false` → zawsze nie (nawet jeśli rola daje dostęp)
3. brak wpisu → sprawdź uprawnienia roli

Przykłady zastosowania: zaufany gracz z dostępem do jednej funkcji GM bez zmiany roli; gracz z odebranym prawem do tworzenia wątków bez banowania.

#### Gildie nie są rolami

Przynależność do gildii to relacja danych (`user.guildId`), nie rola systemowa. Szczegóły w sekcji TODO.

---

### 2.4 Uwagi do ról

- **Nowy użytkownik** staje się **Graczem** po zatwierdzeniu Karty Postaci przez Administratora.
- **Zbanowany** traci wszystkie uprawnienia akcji, zachowując jedynie dostęp do odczytu treści publicznych.
- Macierz będzie rozbudowywana wraz z kolejnymi sekcjami specyfikacji.

---

## TODO

### Gildie jako encja danych (do rozbudowania w osobnej sekcji)

Przynależność gracza do gildii (np. Fairy Tail, Grimoire Heart, Raven Tail) **nie jest rolą systemową** — jest encją danych. Oznacza to:

- Wszystkich członków gildii obowiązują te same uprawnienia systemowe roli `Gracz`.
- Dostęp do treści specyficznych dla gildii (prywatne forum, lista członków, zasoby gildii) kontrolowany jest przez **relację przynależności**: `user.guildId === resource.guildId`.
- Wewnątrz gildii mogą istnieć **rangi** (np. szeregowy mag, zastępca, mistrz gildii), które kontrolują akcje w obrębie gildii (np. `guild.member.kick`, `guild.manage`), ale nie zmieniają globalnej roli systemowej użytkownika.

> Szczegółowy model danych i uprawnienia gildyjne zostaną opisane w osobnej sekcji specyfikacji (Gildie).