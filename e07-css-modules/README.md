# Cvičení: Stylování komponent (CSS moduly) a validace (Zod)

V tomto cvičení vytvoříte registrační formulář. Vzhled komponent nadefinujete pomocí **CSS modulů** a uživatelský vstup budete validovat pomocí knihovny **Zod**. Podle validity vstupu se bude měnit styl jednotlivých polí.

## Cíl

* použít CSS modul k nastylování komponenty
* řídit vzhled komponenty atributem `data-*`, nikoli inline stylem
* definovat validační schéma v Zodu a odvodit z něj chyby jednotlivých polí
* rozumět rozdílu mezi tím, co uživatel zadá (řetězec), a tím, co po validaci dostanete (číslo)

## Spuštění

```
npm install
npm run dev
```

## Co již máte hotové

| Soubor | Obsah |
|---|---|
| `src/index.css` | globální CSS proměnné (barvy, mezery) |
| `src/components/TextField.tsx` | komponenta pole formuláře (hotová, neupravujte) |
| `src/components/TextField.module.css` | základní vzhled pole |
| `src/App.module.css` | vzhled stránky, karty a tlačítka |
| `src/App.tsx` | formulář se stavem, **chybí validace** |
| `src/schemas.ts` | prázdné schéma |

Komponenta `TextField` přijímá vlastnost `state` s hodnotou `"idle"`, `"valid"` nebo `"invalid"` a vlastnost `error` s textem chyby. Hodnotu `state` zapisuje do atributu `data-state` na obalovém prvku `.field`.

## Úkoly

### 1. Vzhled pole podle stavu (CSS modul)

V souboru `TextField.module.css` doplňte pravidla, která podle `data-state` změní vzhled pole:

* `valid`: zelené ohraničení a světle zelené pozadí
* `invalid`: červené ohraničení a světle červené pozadí

Použijte proměnné z `index.css` (`--color-valid`, `--color-invalid`). Pro světlé pozadí se hodí funkce `color-mix()`.

Jak si úkol vyzkoušet: ve výchozím stavu se po opuštění pole (`onBlur`) zobrazí stav `valid`. Dočasně si ve funkci `getState` v `App.tsx` změňte návratovou hodnotu na `"invalid"` a ověřte i druhý stav.

### 2. Validační schéma (Zod)

V souboru `schemas.ts` nadefinujte schéma `registrationSchema` s těmito poli:

| Pole | Pravidlo | Chybová hláška |
|---|---|---|
| `name` | po oříznutí mezer alespoň 2 znaky | vlastní |
| `email` | platný e-mail | vlastní |
| `age` | celé číslo od 18 do 120 | vlastní |

Pozor na pole `age`: HTML `<input type="number">` vrací **řetězec** a prázdné pole se při převodu pomocí `Number("")` změní na `0`. Prázdné pole musí vyvolat chybu, nesmí projít jako nula. Pomůže vám `z.preprocess`.

Chybové hlášky pište česky a srozumitelně pro uživatele.

### 3. Propojení se stavem formuláře

V souboru `App.tsx`:

1. Zvalidujte aktuální `values` pomocí `registrationSchema.safeParse(...)`.
2. Pokud validace selže, získejte chyby jednotlivých polí pomocí `z.flattenError(result.error).fieldErrors`.
3. Upravte funkci `getState(field)` tak, aby vracela:
   * `"idle"`, pokud uživatel pole ještě neopustil (`touched`),
   * `"invalid"`, pokud pole opustil a má chybu,
   * `"valid"` jinak.
4. Každému `TextField` předejte první chybu daného pole ve vlastnosti `error`.

Validaci počítejte přímo při vykreslení komponenty. `useEffect` ani další `useState` pro chyby nepotřebujete.

### 4. Tlačítko Registrovat

Přidejte tlačítko, které:

* je neaktivní (`disabled`), dokud je formulář neplatný,
* má při platném formuláři třídu `styles.ready` (použijte `clsx`),
* po odeslání zobrazí zprávu s jménem a věkem. Věk berte z `result.data`.

Najeďte myší na `result.data.age` a zjistěte, jakého je typu. Porovnejte s typem `values.age`.

## Bonusové úkoly

### 5. Hesla

Přidejte pole **Heslo** (alespoň 8 znaků) a **Heslo znovu**. Pomocí `.refine` ověřte, že se hesla shodují, a chybu přiřaďte k poli `confirmPassword` (vlastnost `path`).

### 6. Ukazatel síly hesla

Pod pole s heslem přidejte proužek, jehož šířka odpovídá délce hesla (0 až 12 znaků = 0 až 100 %). Dynamickou hodnotu předejte z Reactu jako **CSS proměnnou** `--strength` a šířku nastavte v CSS modulu pomocí `var(--strength)`. Barvu proužku měňte podle atributu `data-level` (`weak`, `medium`, `strong`).

## Otázky k zamyšlení

1. Proč pro validaci nepotřebujeme `useEffect`?
2. Proč je `age` ve `FormValues` řetězec, ale `result.data.age` je číslo?
3. Proč stav pole řídíme atributem `data-state` a ne inline stylem `style={{ borderColor: ... }}`?
4. Proč tlačítko samo o sobě nestačí jako ochrana a validaci by musel provádět i server?

## Odevzdání

Odevzdejte přes GitHub Classroom (commit a push do repozitáře). Funkční řešení úkolů 1 až 4 je podmínkou, bonusové úkoly jsou nepovinné.
