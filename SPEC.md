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
- [3. Model danych](#3-model-danych)
  - [3.1 User](#31-user)
  - [3.2 Character](#32-character)
  - [3.3 Title](#33-title)
  - [3.4 Spell](#34-spell)
  - [3.5 Skill](#35-skill)
  - [3.6 Item](#36-item)
  - [3.7 Requirement](#37-requirement)
  - [3.8 Encje do rozwinięcia](#38-encje-do-rozwinięcia)
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

| Warstwa       | Technologia         | Uwagi                                          |
| ------------- | ------------------- | ---------------------------------------------- |
| Frontend      | **Next.js** (React) | SSR/SSG, routing, UI                           |
| Biblioteka UI | **Mantine**         | Komponenty, theming, formularze, powiadomienia |
| Backend       | **NestJS**          | REST API, logika biznesowa                     |
| ORM           | **Prisma**          | Zarządzanie schematem bazy danych i migracje   |
| Baza danych   | **PostgreSQL**      | Relacyjna baza danych                          |
| Język         | **TypeScript**      | Pełny stack                                    |

### 1.4 Charakter aplikacji

- **Typ:** CMS + forum RPG
- **Model danych:** Relacyjny (TypeORM + PostgreSQL)
- **Interakcja:** CRUD — tworzenie, odczytywanie, edytowanie i usuwanie postów, postaci, wątków, gildii i innych encji
- **Użytkownicy:** Gracze, Mistrzowie Gry (GM), Moderatorzy, Administratorzy

---

## 2. Role i uprawnienia użytkowników

### 2.1 Definicje ról

| #   | Rola                | Opis                                                                                                                                         |
| --- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Nowy użytkownik** | Nadawana automatycznie po rejestracji. Mocno ograniczona — tylko edycja profilu i założenie Karty Postaci.                                   |
| 2   | **Gracz**           | Pełnoprawna rola z dostępem do wszystkich podstawowych funkcji potrzebnych do prowadzenia rozgrywki.                                         |
| 3   | **Mistrz Gry (GM)** | Rozszerzenie roli Gracza o funkcjonalności prowadzenia sesji: tworzenie wydarzeń fabularnych, zarządzanie NPC, kontrola wątków narracyjnych. |
| 4   | **Moderator**       | Odpowiada za moderację użytkowników oraz zarządzanie wątkami i lokacjami w systemie.                                                         |
| 5   | **Administrator**   | Pełna władza nad systemem — dostęp do wszystkich funkcji bez ograniczeń.                                                                     |
| 6   | **Zbanowany**       | Dostęp wyłącznie do podglądu publicznych sekcji. Żadne akcje nie są możliwe.                                                                 |

---

### 2.2 Macierz uprawnień

> Legenda: ✅ — dozwolone &nbsp;|&nbsp; ❌ — niedozwolone

| Nazwa uprawnienia                               | Klucz uprawnienia                  | Nowy użytkownik | Gracz | Mistrz Gry | Moderator | Administrator | Zbanowany |
| ----------------------------------------------- | ---------------------------------- | :-------------: | :---: | :--------: | :-------: | :-----------: | :-------: |
| **PROFIL**                                      |                                    |                 |       |            |           |               |           |
| Podgląd profilu                                 | `profile.view`                     |       ✅        |  ✅   |     ✅     |    ✅     |      ✅       |    ✅     |
| Edycja danych podstawowych (własnych)           | `profile.edit.basic.own`           |       ✅        |  ✅   |     ✅     |    ✅     |      ✅       |    ❌     |
| Edycja powiadomień (własnych)                   | `profile.edit.notifications.own`   |       ✅        |  ✅   |     ✅     |    ✅     |      ✅       |    ❌     |
| Zmiana hasła (własnego)                         | `profile.password.change.own`      |       ✅        |  ✅   |     ✅     |    ✅     |      ✅       |    ❌     |
| Edycja danych podstawowych (cudzych)            | `profile.edit.basic.other`         |       ❌        |  ❌   |     ❌     |    ✅     |      ✅       |    ❌     |
| Edycja powiadomień (cudzych)                    | `profile.edit.notifications.other` |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Reset hasła (cudzego)                           | `profile.password.reset.other`     |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| **KARTA POSTACI**                               |                                    |                 |       |            |           |               |           |
| Podgląd zatwierdzonej karty postaci (cudzej)    | `character.view.other`             |       ✅        |  ✅   |     ✅     |    ✅     |      ✅       |    ✅     |
| Podgląd własnej karty postaci (w tym draft)     | `character.view.own`               |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ✅     |
| Podgląd niezatwierdzonej karty postaci (cudzej) | `character.view.other.draft`       |       ❌        |  ❌   |     ❌     |    ✅     |      ✅       |    ❌     |
| Utworzenie karty postaci                        | `character.create`                 |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Edycja danych podstawowych (własnych)           | `character.edit.basic.own`         |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Edycja historii postaci (własnej)               | `character.edit.history.own`       |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Zarządzanie magią (własną)                      | `character.edit.magic.own`         |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Zarządzanie zaklęciami (własnymi)               | `character.edit.spells.own`        |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Zarządzanie umiejętnościami (własnymi)          | `character.edit.skills.own`        |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Przydział statystyk (własnych)                  | `character.edit.stats.own`         |       ✅        |  ✅   |     ✅     |    ❌     |      ❌       |    ❌     |
| Zatwierdzenie karty postaci                     | `character.approve`                |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Edycja danych podstawowych (cudzych)            | `character.edit.basic.other`       |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Edycja historii postaci (cudzej)                | `character.edit.history.other`     |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Zarządzanie magią (cudzą)                       | `character.edit.magic.other`       |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Zarządzanie zaklęciami (cudzymi)                | `character.edit.spells.other`      |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Zarządzanie umiejętnościami (cudzymi)           | `character.edit.skills.other`      |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |
| Edycja statystyk (cudzych)                      | `character.edit.stats.other`       |       ❌        |  ❌   |     ❌     |    ❌     |      ✅       |    ❌     |

---

### 2.3 Model uprawnień — zasady projektowe

System uprawnień oparty jest o **Permission-based RBAC** — hybrydę czystego RBAC z trzema warstwami rozszerzeń: wyjątkami indywidualnymi, tytułami jako mini-rolami oraz przynależnością do gildii jako relacją danych.

---

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

---

#### Warstwa 1 — Rola systemowa

Fundament systemu. Każdy użytkownik ma dokładnie jedną rolę (spośród 6 zdefiniowanych). Rola przypisuje bazowy zestaw uprawnień.

---

#### Warstwa 2 — Tytuły (permission sets)

Tytuł to **nazwany, kompozytowalny zestaw uprawnień** — działa jak mini-rola, którą można przyznać niezależnie od roli systemowej. Jeden użytkownik może posiadać wiele tytułów jednocześnie. Uprawnienia ze wszystkich tytułów są sumowane.

**Schemat danych:**

```
titles                     title_permissions (M:M)    user_titles (M:M)
──────────────────         ───────────────────────    ──────────────────
id                         title_id (FK)              user_id (FK)
name: 'Mag S-Klasy'        permission_id (FK)         title_id (FK)
description                                           assigned_at
                                                      assigned_by
```

**Przykład zastosowania:**

Tytuł `Mag S-Klasy` odblokowuje uprawnienia:
- `mission.sclass.view` — dostęp do tablicy misji S-klasy
- `mission.sclass.take` — możliwość przyjęcia misji S-klasy

Gracz bez tego tytułu nie widzi tych sekcji mimo tej samej roli systemowej `Gracz`. Tytuł może być przyznany przez Administratora lub automatycznie przez system jako nagroda za osiągnięcia fabularne.

**Różnica względem roli:**

| | Rola systemowa | Tytuł |
|--|---------------|-------|
| Ile na użytkownika | dokładnie 1 | wiele |
| Zakres | systemowy (cały CMS) | wycinki funkcjonalności |
| Nadawany przez | rejestracja / admin | admin / system |
| Przykład | `Gracz`, `Moderator` | `Mag S-Klasy`, `Bohater Fiore` |

---

#### Warstwa 3 — Wyjątki indywidualne (user overrides)

Każdemu użytkownikowi można nadać lub odebrać konkretne uprawnienie niezależnie od roli i tytułów, przez tabelę `user_permissions`:

```
user_permissions
─────────────────────────────────────
user_id        → który użytkownik
permission_id  → które uprawnienie
granted        → true = dodane / false = odebrane
```

Przykłady zastosowania: zaufany gracz z dostępem do jednej funkcji GM bez zmiany roli; gracz z odebranym prawem do tworzenia wątków bez banowania.

---

#### Priorytet decyzji (pełny)

```
1. user_permissions.granted = true   → ✅ zawsze tak  (najwyższy priorytet)
2. user_permissions.granted = false  → ❌ zawsze nie  (blokada nie do ominięcia)
3. brak override → sprawdź rolę systemową
4. brak w roli   → sprawdź sumę uprawnień z tytułów
5. brak wszędzie → ❌ odmowa
```

---

#### Gildie nie są rolami

Przynależność do gildii to relacja danych (`user.guildId`), nie rola systemowa ani tytuł — nie przyznaje uprawnień systemowych, kontroluje jedynie dostęp do treści gildyjnych. Szczegóły w sekcji TODO.

---

### 2.4 Uwagi do ról

- **Nowy użytkownik** staje się **Graczem** po zatwierdzeniu Karty Postaci przez Administratora.
- **Zbanowany** traci wszystkie uprawnienia akcji, zachowując jedynie dostęp do odczytu treści publicznych.
- Macierz będzie rozbudowywana wraz z kolejnymi sekcjami specyfikacji.

---

## 3. Model danych

### 3.1 User

Encja reprezentująca **konto systemowe** — służy wyłącznie do uwierzytelnienia i zarządzania dostępem. Nie zawiera danych fabularnych (avatar, podpis, tytuł — te należą do Postaci).

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `login` | `string` (unikalny) | Nazwa użytkownika — używana do logowania |
| `email` | `string` (unikalny) | Adres email — używany do logowania |
| `password` | `string \| null` | Hash hasła. Nullable dla kont Google |
| `google_id` | `string \| null` | Identyfikator konta Google OAuth |
| `auth_provider` | `enum: local \| google` | Metoda uwierzytelnienia |
| `role_id` | `FK → Role` | Rola systemowa użytkownika |
| `app_notifications` | `boolean` | Powiadomienia w aplikacji |
| `discord_notifications` | `boolean` | Powiadomienia przez Discord |
| `created_at` | `timestamp` | Data założenia konta |
| `updated_at` | `timestamp` | Data ostatniej modyfikacji konta |

**Relacje:**
- `role` → `Role` (N:1)
- `characters` → `Character[]` (1:N) — jeden user może mieć wiele postaci
- `user_permissions` → `UserPermission[]` (1:N) — indywidualne overrides uprawnień

**Uwagi:**
- Użytkownik może logować się przez `login` lub `email`
- Konta Google mają `password = null` i wypełniony `google_id`
- Konta lokalne mają `google_id = null`

---

### 3.2 Character

Encja reprezentująca **grywalną postać** przypisaną do konta użytkownika. Jeden user może posiadać wiele postaci. Zawiera wszystkie dane fabularne i jest głównym bytem rozgrywki PBF.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `user_id` | `FK → User` | Właściciel postaci |
| `guild_id` | `FK → Guild \| null` | Gildia postaci (nullable — postać może być bezgildyjna) |
| `guild_title` | `string \| null` | Ranga postaci w gildii (np. "Zastępca Mistrza"). Dokładnie jedna na postać |
| `status` | `enum: draft \| pending \| approved \| rejected` | Stan karty postaci w procesie zatwierdzania |
| `rejection_reason` | `string \| null` | Powód odrzucenia KP przez GM/Admina |
| `first_name` | `string` | Imię postaci |
| `last_name` | `string` | Nazwisko postaci |
| `birth_date` | `string` | Data urodzenia w dowolnym formacie (elastyczność dla świata fantasy) |
| `avatar` | `string` | URL avatara postaci |
| `signature` | `string` | Sygnatura wyświetlana pod postami tej postaci |
| `backstory` | `text` | Prolog / historia postaci |
| `appearance` | `text` | Opis wyglądu postaci |
| `personality` | `text` | Opis osobowości i charakteru |
| `trivia` | `text` | Dodatkowe fakty i ciekawostki o postaci |
| `origin` | `string` | Miejsce lub kraina pochodzenia |
| `level` | `integer` | Poziom postaci — wartość liczbowa bez górnego limitu, startuje od 1 |
| `magic` | `any[]` | Tymczasowe — docelowo relacja M:M z encją `Magic` |
| `spells` | `any[]` | Tymczasowe — docelowo relacja poprzez `Magic → Spell` |
| `skills` | `any[]` | Tymczasowe — docelowo relacja M:M z encją `Skill` |
| `items` | `any[]` | Tymczasowe — docelowo relacja M:M z encją `Item` |
| `familiars` | `any[]` | Tymczasowe — docelowo relacja M:M z encją `Familiar` |
| `professions` | `any[]` | Tymczasowe — docelowo relacja M:M z encją `Profession` |
| `combat_styles` | `any[]` | Tymczasowe — docelowo relacja M:M z encją `CombatStyle` |
| `created_at` | `timestamp` | Data utworzenia karty |
| `updated_at` | `timestamp` | Data ostatniej modyfikacji |

**Relacje:**
- `user` → `User` (N:1)
- `guild` → `Guild` (N:1, nullable)
- `titles` → `Title[]` (M:M) — postać może mieć wiele tytułów

**Cykl życia karty postaci:**

```
draft → pending → approved
              ↘ rejected → (gracz poprawia) → pending
```

- `draft` — karta w trakcie tworzenia, widoczna tylko dla właściciela
- `pending` — złożona do zatwierdzenia, widoczna dla GM i Admina
- `approved` — zatwierdzona, publicznie widoczna
- `rejected` — odrzucona z powodem, gracz może ją poprawić i ponownie złożyć

---

### 3.3 Title

Encja reprezentująca **tytuł** przyznawany postaci. Tytuł może być czysto kosmetyczny lub zawierać zestaw uprawnień systemowych. Jedna postać może mieć wiele tytułów.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `name` | `string` | Wyświetlana nazwa tytułu (np. "Mag S-Klasy") |
| `description` | `string` | Opis tytułu |
| `is_cosmetic` | `boolean` | Czy tytuł jest wyłącznie kosmetyczny (brak uprawnień) |
| `created_at` | `timestamp` | Data utworzenia |

**Relacje:**
- `permissions` → `Permission[]` (M:M) — uprawnienia nadawane przez tytuł (puste dla kosmetycznych)
- `characters` → `Character[]` (M:M) — postacie posiadające ten tytuł

**Przykłady:**

| Tytuł | Kosmetyczny | Uprawnienia |
|-------|:-----------:|-------------|
| Mag S-Klasy | ❌ | `mission.sclass.view`, `mission.sclass.take` |
| Magnat Krawędzi 2026 | ✅ | brak |
| Bohater Fiore | ❌ | `event.special.view` |

---

### 3.4 Spell

Encja reprezentująca **zaklęcie** przypisane do konkretnej magii. Zaklęcia mogą być predefiniowane przez system (publiczne) lub tworzone przez graczy (prywatne lub publiczne). Zawiera poziomy zaklęcia jako sub-model oraz wymagania do odblokowania.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `magic_id` | `FK → Magic` | Magia, do której należy zaklęcie |
| `created_by` | `FK → Character \| null` | Twórca zaklęcia. Null dla zaklęć systemowych |
| `is_public` | `boolean` | Czy zaklęcie jest dostępne dla wszystkich (true) czy tylko dla twórcy (false) |
| `name` | `string` | Nazwa zaklęcia |
| `description` | `text` | Główny opis działania zaklęcia |
| `images` | `string[]` | Tablica URL-i obrazków przedstawiających zaklęcie |
| `additional_info` | `text \| null` | Dodatkowe informacje i uwagi |
| `created_at` | `timestamp` | Data utworzenia |
| `updated_at` | `timestamp` | Data ostatniej modyfikacji |

**Relacje:**
- `magic` → `Magic` (N:1)
- `created_by` → `Character` (N:1, nullable)
- `levels` → `SpellLevel[]` (1:N) — poziomy zaklęcia
- `requirements` → `Requirement[]` (1:N, gdzie `owner_type = spell`) — wymagania do odblokowania

---

#### 3.4.1 SpellLevel

Sub-model reprezentujący **pojedynczy poziom zaklęcia**. Każde zaklęcie może mieć wiele poziomów — każdy z osobnym opisem i obrazkami.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `spell_id` | `FK → Spell` | Zaklęcie, do którego należy poziom |
| `level_number` | `integer` | Numer poziomu (1, 2, 3...) |
| `description` | `text` | Opis działania zaklęcia na tym poziomie |
| `images` | `string[]` | Tablica URL-i obrazków dla tego poziomu |

---

### 3.5 Skill

Encja reprezentująca **umiejętność** postaci. Podobnie jak zaklęcia, umiejętności mogą być predefiniowane przez system lub tworzone przez graczy. Zawiera poziomy jako sub-model oraz wymagania do odblokowania.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `created_by` | `FK → Character \| null` | Twórca umiejętności. Null dla umiejętności systemowych |
| `is_public` | `boolean` | Czy umiejętność jest dostępna dla wszystkich (true) czy tylko dla twórcy (false) |
| `name` | `string` | Nazwa umiejętności |
| `description` | `text` | Opis umiejętności |
| `images` | `string[]` | Tablica URL-i obrazków |
| `required_level` | `integer \| null` | Minimalny poziom postaci wymagany do odblokowania |
| `additional_info` | `text \| null` | Dodatkowe informacje i uwagi |
| `created_at` | `timestamp` | Data utworzenia |
| `updated_at` | `timestamp` | Data ostatniej modyfikacji |

**Relacje:**
- `created_by` → `Character` (N:1, nullable)
- `levels` → `SkillLevel[]` (1:N) — poziomy umiejętności
- `requirements` → `Requirement[]` (1:N, gdzie `owner_type = skill`) — wymagania do odblokowania
- `characters` → `Character[]` (M:M)

---

#### 3.5.1 SkillLevel

Sub-model reprezentujący **pojedynczy poziom umiejętności**. Analogiczny do `SpellLevel`.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `skill_id` | `FK → Skill` | Umiejętność, do której należy poziom |
| `level_number` | `integer` | Numer poziomu (1, 2, 3...) |
| `description` | `text` | Opis działania umiejętności na tym poziomie |
| `images` | `string[]` | Tablica URL-i obrazków dla tego poziomu |

---

### 3.6 Item

Encja reprezentująca **przedmiot** posiadany przez postać. Może być tworzony przez Admina/GM w panelu zarządzania lub przez gracza. Nie posiada poziomów (w przeciwieństwie do `Spell` i `Skill`).

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `created_by` | `FK → Character \| null` | Twórca przedmiotu. Null dla przedmiotów systemowych |
| `is_public` | `boolean` | Czy przedmiot jest dostępny dla wszystkich (true) czy tylko dla twórcy (false) |
| `name` | `string` | Nazwa przedmiotu |
| `description` | `text` | Opis przedmiotu |
| `images` | `string[]` | Tablica URL-i obrazków przedmiotu |
| `weapon_strength` | `integer \| null` | Siła/ostrość broni w skali 1–10. Null jeśli przedmiot nie jest bronią. Walidacja zakresu po stronie aplikacji (`@Min(1) @Max(10)`) |
| `additional_info` | `text \| null` | Dodatkowe informacje i uwagi |
| `created_at` | `timestamp` | Data utworzenia |
| `updated_at` | `timestamp` | Data ostatniej modyfikacji |

**Relacje:**
- `created_by` → `Character` (N:1, nullable)
- `requirements` → `Requirement[]` (1:N, gdzie `item_id` jest wypełnione) — wymagania do użycia/posiadania
- `characters` → `Character[]` (M:M)

---

### 3.7 Requirement

Wspólna encja wymagań dla `Spell`, `Skill`, `Item` i docelowo `Magic`. Jeden rekord = jedno wymaganie. Właściciel wymagania wskazywany jest przez osobne nullable FK — podejście kompatybilne z Prismą i zapewniające pełne FK constraints po stronie PostgreSQL.

> Dokładnie jedno z pól `spell_id` / `skill_id` / `item_id` / `magic_id` jest wypełnione — pozostałe są `null`.

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `uuid` | Klucz główny |
| `spell_id` | `FK → Spell \| null` | Wymaganie należy do zaklęcia |
| `skill_id` | `FK → Skill \| null` | Wymaganie należy do umiejętności |
| `item_id` | `FK → Item \| null` | Wymaganie należy do przedmiotu |
| `magic_id` | `FK → Magic \| null` | Wymaganie należy do magii |
| `required_level` | `integer \| null` | Minimalny poziom postaci |
| `required_profession_id` | `FK → Profession \| null` | Wymagana profesja |
| `required_combat_style_id` | `FK → CombatStyle \| null` | Wymagany styl walki |
| `required_magic_id` | `FK → Magic \| null` | Wymagana magia |
| `required_spell_id` | `FK → Spell \| null` | Wymagane zaklęcie |
| `required_item_id` | `FK → Item \| null` | Wymagany przedmiot |
| `required_stat_id` | `FK → Stat \| null` | Wymagana statystyka |
| `required_stat_value` | `integer \| null` | Minimalna wartość wymaganej statystyki |

**Przykłady:**

| Właściciel | Wypełnione pole wymagania | Interpretacja |
|------------|--------------------------|---------------|
| `spell_id` | `required_level = 15` | Zaklęcie wymaga poziomu 15 |
| `spell_id` | `required_stat_id + required_stat_value = 80` | Zaklęcie wymaga statystyki X ≥ 80 |
| `skill_id` | `required_profession_id` | Umiejętność wymaga konkretnej profesji |
| `skill_id` | `required_magic_id` | Umiejętność wymaga posiadania konkretnej magii |
| `item_id` | `required_spell_id` | Przedmiot wymaga znajomości konkretnego zaklęcia |

> Jeden rekord `Requirement` opisuje dokładnie jedno wymaganie. Wiele wymagań jednocześnie = wiele rekordów powiązanych z tym samym właścicielem.

---

### 3.8 Encje do rozwinięcia

Poniższe encje zostaną szczegółowo opisane w kolejnych sekcjach specyfikacji. Na tym etapie definiujemy wyłącznie ich istnienie i powiązanie z `Character`.

| Encja | Powiązanie | Sekcja |
|-------|-----------|--------|
| `Guild` | Character N:1 | Sekcja 4 — Gildie |
| `Magic` | Character M:M | Sekcja 5 — System Magii |
| `Spell` | Magic 1:N | Sekcja 3.4 ✅ |
| `Skill` | Character M:M | Sekcja 3.5 ✅ |
| `Item` | Character M:M | Sekcja 3.6 ✅ |
| `Familiar` | Character M:M | Sekcja 8 — Chowańce |
| `Profession` | Character M:M | Sekcja 9 — Profesje |
| `CombatStyle` | Character M:M | Sekcja 10 — Style walki |
| `Role` | User N:1 | Sekcja 2 — Uprawnienia |
| `Permission` | Role/Title M:M | Sekcja 2 — Uprawnienia |

---

## TODO

### Gildie jako encja danych (do rozbudowania w osobnej sekcji)

Przynależność gracza do gildii (np. Fairy Tail, Grimoire Heart, Raven Tail) **nie jest rolą systemową** — jest encją danych. Oznacza to:

- Wszystkich członków gildii obowiązują te same uprawnienia systemowe roli `Gracz`.
- Dostęp do treści specyficznych dla gildii (prywatne forum, lista członków, zasoby gildii) kontrolowany jest przez **relację przynależności**: `user.guildId === resource.guildId`.
- Wewnątrz gildii mogą istnieć **rangi** (np. szeregowy mag, zastępca, mistrz gildii), które kontrolują akcje w obrębie gildii (np. `guild.member.kick`, `guild.manage`), ale nie zmieniają globalnej roli systemowej użytkownika.

> Szczegółowy model danych i uprawnienia gildyjne zostaną opisane w osobnej sekcji specyfikacji (Gildie).

### Obrazki jako `string[]` — do weryfikacji przy projektowaniu bazy

Pola `images: string[]` (na `Spell`, `SpellLevel`, `Skill`, `SkillLevel`) są obecnie przechowywane jako tablice tekstowe (PostgreSQL `text[]`). Do rozważenia przy projektowaniu bazy: czy warto wydzielić osobną tabelę `Image` z relacją, np. dla lepszego zarządzania plikami, metadanymi lub integracją z CDN/storage.
