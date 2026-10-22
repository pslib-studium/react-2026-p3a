# Otázky – test TypeScript + React (p3a)

## Návrh kategorií

| Kategorie | Společný jmenovatel | Témata | Počet otázek |
| --- | --- | --- | --- |
| K1 Syntaxe JavaScriptu a TypeScriptu | jazyk mimo React – moduly, ES6+, typy funkcí, operátory, generika | T02, T07, T09, T10 | 25 |
| K2 JSX | jak se zapisuje a vykresluje výstup komponenty | T04, T05, T06 | 18 |
| K3 Komponenty a props | definice komponent, skládání, tok dat rodič ↔ potomek | T11, T12, T14 | 17 |
| K4 Stav, hooky a formuláře | `useState`, `useRef`, `useId`, události, řízené/neřízené inputy | T13, T15, T16, T17 | 24 |
| K5 Analýza kódu | průřezové čtení kódu a hledání chyb | T18 | 6 |
| **Celkem** | | **15 témat** | **90** |

V Moodle bude struktura: `Test p3a / K1 …` (5 kategorií bez podkategorií). Téma je uvedeno v názvu otázky.

## Legenda

- **[MC1]** výběr jedné správné odpovědi, **[MCn]** více správných (správné odpovědi se dělí o +100 %, špatné o −100 %; zaškrtnutí všeho = 0 bodů)
- **[MATCH]** přiřazování – tabulka *položka → správná odpověď*, případné distraktory uvedeny pod tabulkou
- **[GAP]** výběr chybějících slov (rozbalovací seznam), **[DD]** přetažení do textu
  - `[[n]]` = mezera, jejíž správnou odpovědí je volba č. *n*; volby za posledním číslem mezery jsou distraktory
- Každá otázka je samostatná – veškerý kód potřebný k odpovědi je uveden přímo v zadání a zadání vždy obsahuje otázku nebo pokyn.

---

# K1 Syntaxe JavaScriptu a TypeScriptu

## T02 ES moduly – import / export

### T02-01 [MC1] Import výchozího exportu
Soubor `Number.tsx` končí řádkem `export default Number;`. Který import v `App.tsx` je správný?
- [x] `import Number from './Number';`
- [ ] `import { Number } from './Number';`
- [ ] `import * from './Number';`
- [ ] `import default Number from './Number';`

### T02-02 [MC1] Jméno při importu
V `main.tsx` je `import Application from './App.tsx'`, přitom `App.tsx` obsahuje `export default App`. Co platí?
- [x] Funguje – u výchozího exportu si jméno volí importující soubor.
- [ ] Chyba – jméno v importu musí odpovídat názvu exportované funkce.
- [ ] Funguje jen díky tomu, že `App.tsx` obsahuje i `export function App`.
- [ ] Chyba – v cestě importu nesmí být uvedena přípona `.tsx`.

### T02-03 [MC1] Alias při importu
Soubor začíná řádkem `import { createRoot as cr } from 'react-dom/client'`. Které volání je v tomto souboru platné?
- [x] `cr(document.getElementById('root')!)`
- [ ] `createRoot(document.getElementById('root')!)`
- [ ] `createRoot.cr(document.getElementById('root')!)`
- [ ] Obě volání `cr(…)` i `createRoot(…)` – alias jen přidává další jméno.

### T02-04 [MCn] Platné importy
Soubor `App.tsx` obsahuje současně `export function App() { … }` i `export default App`. Které importy jsou platné?
- [x] `import App from './App'`
- [x] `import { App } from './App'`
- [x] `import Whatever from './App'`
- [ ] `import { Whatever } from './App'`
- [ ] `import App, from './App'`

### T02-05 [MCn] Co zmizí při překladu do JS
Které části kódu budou po překladu TypeScriptu do JavaScriptu zcela odstraněny?
- [x] `import type { FC } from 'react';`
- [x] `type NumberProps = { value1?: number; value2?: number };`
- [x] typová anotace `: FC<NumberProps>` v deklaraci `const Number: FC<NumberProps> = …`
- [ ] `import './App.css';`
- [ ] `const [a, setA] = useState<number>(6);` (celý řádek)

### T02-06 [GAP] Doplňte importy
Doplňte importy tak, aby odpovídaly komentářům a následnému použití v kódu.
```tsx
import [[1]] from './components/Triangle';  // soubor končí: export default TriangleFromSides
import [[2]] from 'react';                   // potřebujeme hook useState a typ FC
import [[3]] from 'react-dom/client';        // funkci createRoot chceme volat jako cr(…)
import [[4]];                                // jen načíst styly

// … dále v kódu: <Triangle a={a} … />   cr(root).render(…)
```
Volby: 1. `Triangle` 2. `{ useState, type FC }` 3. `{ createRoot as cr }` 4. `'./App.css'` 5. `{ Triangle }` 6. `{ useState, FC as type }` 7. `{ cr as createRoot }` 8. `App.css`

## T07 Moderní JS syntaxe (ES6+)

### T07-01 [MC1] Pořadí při destrukturalizaci pole
Co bude v proměnných po zápisu `const [setA, a] = useState(6);` (jména jsou záměrně prohozena)?
- [x] `setA` bude číslo `6` a `a` bude funkce pro změnu stavu – rozhoduje pořadí, ne jméno.
- [ ] `a` bude `6` a `setA` funkce – React proměnné přiřadí podle jména.
- [ ] TypeScript ohlásí chybu, protože setter musí začínat na `set` a být druhý.
- [ ] Obě proměnné budou `undefined`.

### T07-02 [MC1] Ekvivalentní zápis parametru
Který zápis je ekvivalentní s `const Number = ({ value1, value2 }) => { … }`?
- [x] `const Number = (props) => { const { value1, value2 } = props; … }`
- [ ] `const Number = (value1, value2) => { … }`
- [ ] `const Number = ([value1, value2]) => { … }`
- [ ] `const Number = (props) => { const value1 = props[0]; const value2 = props[1]; … }`

### T07-03 [MC1] Template literal
Jaký řetězec vznikne pro `const A = { x: 95, y: 95 };` z výrazu `` `${A.x},${A.y}` ``?
- [x] `95,95`
- [ ] `${A.x},${A.y}`
- [ ] `A.x,A.y`
- [ ] `190`

### T07-04 [MC1] Tělo šipkové funkce
Co vrátí `f(3)` pro `const f = (x: number) => { x * 2 };`?
- [x] `undefined` – tělo ve složených závorkách bez `return` nic nevrací.
- [ ] `6`
- [ ] `NaN`
- [ ] Vznikne chyba za běhu.

### T07-05 [MC1] `const` a objekt
Je možné provést `A.x = 5;` po deklaraci `const A = { x: 0, y: 0 };`?
- [x] Ano – `const` zakazuje jen přiřazení nové hodnoty do proměnné `A`, ne změnu vlastností objektu.
- [ ] Ne – objekt deklarovaný pomocí `const` je neměnný.
- [ ] Ne – TypeScript ohlásí chybu, protože `x` má typ `0`.
- [ ] Ano, ale jen pokud je objekt deklarován uvnitř funkce.

### T07-06 [MATCH] Výsledky výrazů
Přiřaďte k výrazu jeho výsledek (`x = 2`).
| Výraz | Výsledek |
| --- | --- |
| `` `${x}px` `` | `"2px"` |
| `x ** 3` | `8` |
| `Math.max(1, 5, 3)` | `5` |
| `parseInt("12abc")` | `12` |
| `(() => { const { p } = { p: 7, q: 1 }; return p; })()` | `7` |

Distraktory: *`NaN`*, *`undefined`*, *`6`*

## T09 Typy funkcí a operátory TypeScriptu

### T09-01 [MC1] Funkční typ
Co popisuje vlastnost typu `handleA: (value: number) => void;`?
- [x] `handleA` je funkce s jedním parametrem typu `number`, která nic nevrací.
- [ ] `handleA` je funkce, která vrací `number`.
- [ ] `handleA` je buď `number`, nebo `void`.
- [ ] `handleA` je šipková funkce s výchozí hodnotou parametru `void`.

### T09-02 [MC1] Důsledek `!`
Vstupní soubor aplikace obsahuje `createRoot(document.getElementById('root')!)`. Co se stane, když v `index.html` prvek `id="root"` chybí?
- [x] TypeScript kód přeloží bez chyby, ale za běhu `createRoot` dostane `null` a vyhodí chybu – `!` jen potlačí typovou kontrolu.
- [ ] TypeScript ohlásí chybu při překladu, protože prvek v HTML neexistuje.
- [ ] `!` zajistí, že React prvek `#root` automaticky vytvoří.
- [ ] Aplikace se vykreslí do `<body>`.

### T09-03 [MC1] Optional chaining
Co se stane při vyhodnocení `inputRef.current?.value`, když `inputRef.current` je `null`?
- [x] Výraz vrátí `undefined` a nevznikne chyba.
- [ ] Vznikne `TypeError: Cannot read properties of null`.
- [ ] Výraz vrátí prázdný řetězec `""`.
- [ ] Výraz vrátí `null`.

### T09-04 [MCn] Volitelný callback
Typ props obsahuje `onChange?: (value: string | undefined) => void;`. Která volání projdou typovou kontrolou (strict režim)?
- [x] `onChange?.("abc")`
- [x] `onChange?.(undefined)`
- [ ] `onChange?.(42)`
- [ ] `onChange("abc")`

### T09-05 [GAP] Doplňte operátory
Doplňte znaky tak, aby kód odpovídal komentářům a prošel typovou kontrolou.
```tsx
type Props = {
  label[[1]] string;                                 // povinný
  defaultValue[[2]] string;                          // nepovinný
  onChange?: (value: string | undefined) [[3]] void; // callback nic nevrací
};

const root = document.getElementById('root')[[4]];  // víme jistě, že prvek existuje
onChange[[5]](inputRef.current?.value);             // onChange nemusí být předán
```
Volby: 1. `:` 2. `?:` 3. `=>` 4. `!` 5. `?.` 6. `->` 7. `??` 8. `!:`

### T09-06 [MCn] Hodnoty pro `fillColor`
Komponenta `Triangle` má prop `fillColor: React.SVGProps<SVGPolygonElement>["fill"]`, což je typ atributu `fill` u `<polygon>` (`string | undefined`). Které použití projdou typovou kontrolou?
- [x] `<Triangle … fillColor="orange" />`
- [x] `<Triangle … fillColor={actualColor} />` (kde `actualColor: string`)
- [x] `<Triangle … fillColor="#808080" />`
- [ ] `<Triangle … fillColor={42} />`
- [ ] `<Triangle … fillColor={{ color: "red" }} />`

### T09-07 [MC1] Kontextové typování
Komponenta `ControlledInput` má props typu `{ label: string; onChange: (value: string) => void }`. Rodič ji použije jako `<ControlledInput label="Jméno" onChange={(value) => console.log(value)} />` a u parametru `value` není uveden typ. Jaký typ má `value`?
- [x] `string` – TypeScript ho odvodí z typu prop `onChange: (value: string) => void`.
- [ ] `any` – parametr bez anotace má vždy typ `any`.
- [ ] `unknown`
- [ ] `string | undefined`

## T10 Generika v Reactu

### T10-01 [MC1] Kdy je generikum nutné
Počáteční hodnota stavu je `null`, později se má volat `setName("Eva")`. Která deklarace to (ve strict režimu) umožní?
- [x] `const [name, setName] = useState<string | null>(null);`
- [ ] `const [name, setName] = useState(null);`
- [ ] `const [name, setName] = useState<null>(null);`
- [ ] `const [name, setName] = useState<string>(null);`

### T10-02 [MC1] Odvození typu stavu
Komponenta má prop `defaultValue: string` a obsahuje `const [value, setValue] = useState(defaultValue);` (bez generika). Jaký typ má stav `value`?
- [x] `string` – typ se odvodí z počáteční hodnoty.
- [ ] `any`
- [ ] `unknown`
- [ ] `string | undefined`

### T10-03 [MC1] Generikum u `useRef`
Komponenta obsahuje:
```tsx
const inputRef = useRef<HTMLInputElement>(null);
// …
<input ref={inputRef} />
```
Proč je u `useRef` uvedeno `<HTMLInputElement>`?
- [x] Aby `inputRef.current` měl typ `HTMLInputElement | null` a šlo bezpečně číst např. `.value`.
- [ ] Aby React vytvořil nový `<input>` prvek.
- [ ] Generikum je povinné – bez něj `useRef` nelze zavolat.
- [ ] Aby `inputRef.current` nikdy nebyl `null`.

### T10-04 [MCn] Typování komponenty
Které zápisy správně typují komponentu `Inputs` s props typu `InputsProps`?
- [x] `const Inputs: FC<InputsProps> = ({ a, b }) => { … }`
- [x] `const Inputs: React.FC<InputsProps> = ({ a, b }) => { … }`
- [x] `function Inputs({ a, b }: InputsProps) { … }`
- [ ] `const Inputs = FC<InputsProps>({ a, b }) => { … }`
- [ ] `const Inputs<InputsProps> = ({ a, b }) => { … }`

### T10-05 [MC1] Špatný typ v setteru
Co se stane při `setA("7")`, je-li `const [a, setA] = useState<number>(6);`?
- [x] TypeScript ohlásí chybu – setter přijímá jen `number` (nebo funkci vracející `number`).
- [ ] Řetězec se automaticky převede na číslo `7`.
- [ ] Kód se přeloží, ale za běhu vznikne výjimka.
- [ ] Stav bude `"7"` bez jakékoli chyby.

### T10-06 [GAP] Doplňte typové parametry
Doplňte typové parametry tak, aby odpovídaly komentářům.
```tsx
const [color, setColor] = useState[[1]]("orange");     // stav je text
const inputRef = useRef[[2]](null);                     // ref pro prvek <input>
const Inputs: FC[[3]] = ({ a, b, c }) => { /* … */ };  // props popisuje typ InputsProps
```
Volby: 1. `<string>` 2. `<HTMLInputElement>` 3. `<InputsProps>` 4. `<number>` 5. `<HTMLElement[]>` 6. `(string)`

---

# K2 JSX

## T04 Základy JSX

### T04-01 [MC1] Fragment
```tsx
function App() {
  return (
    <>
      <nav>…</nav>
      <main>…</main>
    </>
  );
}
```
Proč je obsah komponenty `App` obalen do `<> … </>`?
- [x] Komponenta musí vracet jeden kořenový prvek; Fragment seskupí `<nav>` a `<main>`, aniž přidá prvek do DOM.
- [ ] `<>` je zkratka pro `<div>`.
- [ ] Fragment zajistí, že se komponenta vykreslí jen jednou.
- [ ] Je to povinné vždy, i když komponenta vrací jediný prvek.

### T04-02 [MC1] Neplatný návrat
Který `return` v komponentě je neplatný?
- [x] `return <h1>A</h1><p>B</p>;`
- [ ] `return <><h1>A</h1><p>B</p></>;`
- [ ] `return <div><h1>A</h1><p>B</p></div>;`
- [ ] `return (<p>B</p>);`

### T04-03 [MCn] Zápis komponenty bez potomků
Které zápisy správně vykreslí komponentu `Application` bez potomků?
- [x] `<Application></Application>`
- [x] `<Application />`
- [ ] `<Application>`
- [ ] `<application />`
- [ ] `{Application}`

### T04-04 [MC1] Malé písmeno v názvu komponenty
Komponentu přejmenujeme na `number` a použijeme ji jako `<number value1={3} />`. Co se stane?
- [x] JSX ji považuje za HTML prvek `<number>` – komponenta se nezavolá (TypeScript navíc hlásí neznámý prvek).
- [ ] Nic se nezmění, velikost písmen nehraje roli.
- [ ] React název automaticky převede na `Number`.
- [ ] Vykreslí se číslo `3`.

### T04-05 [GAP] Vložení výrazu do JSX
Doplňte znaky tak, aby se v odstavci vypsala hodnota proměnné `value1`.
```tsx
<p className="number">Číslo: [[1]]value1[[2]]</p>
```
Volby: 1. `{` 2. `}` 3. `${` 4. `{{` 5. `}}` 6. `(` 7. `)`

### T04-06 [MC1] Komentáře v JSX
Co uvidí uživatel po vykreslení `<p>Text // poznámka {/* skryté */}</p>`?
- [x] `Text // poznámka`
- [ ] `Text`
- [ ] `Text // poznámka /* skryté */`
- [ ] Nic, kód nelze přeložit.

## T05 JSX atributy a styly

### T05-01 [DD] Převeďte HTML do JSX
Přetáhněte do mezer výrazy tak, aby JSX odpovídalo HTML kódu `<label for="a" class="lbl" style="font-weight: bold; margin-top: 4px">A</label>`.
```tsx
<label [[1]]="a" [[2]]="lbl" style=[[3]]>A</label>
```
Volby: 1. `htmlFor` 2. `className` 3. `{{ fontWeight: "bold", marginTop: 4 }}` 4. `for` 5. `class` 6. `"font-weight: bold; margin-top: 4px"` 7. `{ fontWeight: "bold", marginTop: 4 }` 8. `{{ font-weight: "bold", margin-top: 4 }}`

### T05-02 [MC1] Dvojité složené závorky
Proč jsou ve `style={{ color: 'red', fontWeight: 'bold' }}` dvojité složené závorky?
- [x] Vnější závorky vkládají JS výraz do JSX, vnitřní tvoří objektový literál se styly.
- [ ] Je to speciální syntaxe Reactu pro zápis CSS.
- [ ] Vnitřní závorky escapují vnější.
- [ ] Jde o šablonový řetězec.

### T05-03 [MC1] Typ hodnoty prop
Jaký typ hodnoty dostane `value1` v `<Number value1={3} />` a jaký v `<Number value1="3" />`?
- [x] `number`, resp. `string` (druhý zápis TypeScript pro `value1?: number` odmítne).
- [ ] V obou případech `number`.
- [ ] V obou případech `string`.
- [ ] `string`, resp. `number`.

### T05-04 [MC1] Výraz v prop
Komponenta `Number` je definována takto:
```tsx
const Number: FC<NumberProps> = ({ value1, value2 }) => (
  <p>Číslo: {value1}{value2 ? "+" : null}{value2}</p>
);
```
Co vykreslí `<Number value1={3 + 6} />`?
- [x] `Číslo: 9`
- [ ] `Číslo: 3 + 6`
- [ ] `Číslo: 36`
- [ ] `Číslo: 9+`

### T05-05 [MC1] Template literal v atributu
Jakou hodnotu dostane atribut ``viewBox={`${minX} ${minY} ${maxX-minX} ${maxY-minY}`}`` pro `minX = 0`, `minY = 0`, `maxX = 6`, `maxY = 3.5`?
- [x] `"0 0 6 3.5"`
- [ ] `"${minX} ${minY} ${maxX-minX} ${maxY-minY}"`
- [ ] `"006 3.5"`
- [ ] pole `[0, 0, 6, 3.5]`

### T05-06 [MC1] Číselná hodnota ve `style`
Jakou šířku bude mít prvek `<div style={{ width: size }} />` pro `size = 100`?
- [x] `100px` – React u číselných hodnot rozměrů doplní jednotku `px`.
- [ ] `100%`
- [ ] Žádnou – bez jednotky je hodnota neplatná a ignoruje se.
- [ ] `100em`

## T06 Podmíněné vykreslování

### T06-01 [MC1] `null` v JSX
Co se vykreslí za `{value2 ? "+" : null}`, když `value2` je `undefined`?
- [x] Nic – `null` React nevykreslí.
- [ ] Text `null`.
- [ ] Znak `+`.
- [ ] Vznikne chyba.

### T06-02 [MC1] Výstup komponenty `Number`
Komponenta `Number` je definována takto:
```tsx
const Number: FC<NumberProps> = ({ value1, value2 }) => (
  <p>Číslo: {value1}{value2 ? "+" : null}{value2}</p>
);
```
Co vykreslí `<Number value1={3} value2={4} />`?
- [x] `Číslo: 3+4`
- [ ] `Číslo: 7`
- [ ] `Číslo: 3 + 4`
- [ ] `Číslo: 34`

### T06-03 [MC1] Nula jako podmínka
Co vykreslí `<Number value1={3} value2={0} />`? (JSX: `Číslo: {value1}{value2 ? "+" : null}{value2}`)
- [x] `Číslo: 30`
- [ ] `Číslo: 3+0`
- [ ] `Číslo: 3`
- [ ] `Číslo: 3+`

### T06-04 [MC1] Předčasný `return`
```tsx
const isConstructible = (a: number, b: number, c: number) =>
  a + b > c && a + c > b && b + c > a;

if (!isConstructible(a, b, c)) {
  return <svg>…<polygon fill="red" … /><text>TNC</text></svg>;
}
// výpočet souřadnic
return <svg>…<polygon fill={fillColor} … /></svg>;
```
Co vykreslí komponenta s tímto kódem pro `a = 1`, `b = 2`, `c = 10`?
- [x] SVG s červeným polygonem a textem „TNC“; zbytek funkce se neprovede.
- [ ] Výchozí trojúhelník i vypočítaný trojúhelník.
- [ ] Nic.
- [ ] Vznikne chyba, protože komponenta má dva `return`.

### T06-05 [MCn] Podmíněné zobrazení prvku
Které zápisy uvnitř JSX vykreslí `<b>Ano</b>` jen pokud `ok === true` (jinak nic)? `ok` je typu `boolean`.
- [x] `{ok ? <b>Ano</b> : null}`
- [x] `{ok && <b>Ano</b>}`
- [ ] `{if (ok) <b>Ano</b>}`
- [ ] `{ok ? <b>Ano</b>}`
- [ ] `{ok || <b>Ano</b>}`

### T06-06 [GAP] Podmínka ve stylu
Barva pozadí má být zelená, pokud text obsahuje více než 5 znaků, jinak červená.
```tsx
style={{ backgroundColor: value.length [[1]] 5 [[2]] "lightgreen" [[3]] "lightcoral" }}
```
Volby: 1. `>` 2. `?` 3. `:` 4. `&&` 5. `||` 6. `=>`

---

# K3 Komponenty a props

## T11 Definice funkční komponenty a props

### T11-01 [MCn] Varianty definice komponenty
Je dáno `import { type FC, type ReactNode } from 'react';` a `type NumberProps = { value1?: number; value2?: number };`. Které definice jsou platnou komponentou s props `value1` a `value2`?
- [x] `const Number = ({ value1, value2 }: { value1?: number, value2?: number }) => { … }`
- [x] `function Number({ value1, value2 }: NumberProps): ReactNode { … }`
- [x] `const Number: FC<NumberProps> = ({ value1, value2 }) => { … }`
- [ ] `const Number: FC<NumberProps> = (value1, value2) => { … }`
- [ ] `function Number(value1: number, value2: number) { … }`

### T11-02 [MC1] Nepředaný prop
```tsx
const Number: FC<NumberProps> = ({ value1, value2 }) => {
  console.log(value1, value2);
  return <p>Číslo: {value1}</p>;
};
```
Co se vypíše do konzole při vykreslení `<Number value1={3} />`?
- [x] `3 undefined`
- [ ] `3 0`
- [ ] `3 null`
- [ ] `3`

### T11-03 [MC1] Výchozí hodnota prop
Co znamená `= 0` v parametru `({ a = 0, b = 0, c = 0, fillColor = "#808080" })`?
- [x] Výchozí hodnota, která se použije, pokud prop není předán (je `undefined`).
- [ ] Prop se vždy přepíše na `0`.
- [ ] Porovnání, zda je prop roven `0`.
- [ ] Výchozí hodnota, která se použije i tehdy, když je předán `null` nebo `0`.

### T11-04 [MC1] Volitelné props
Pro `type NumberProps = { value1?: number; value2?: number }` – které použití způsobí chybu TypeScriptu?
- [x] `<Number value1="3" />`
- [ ] `<Number />`
- [ ] `<Number value1={3} />`
- [ ] `<Number value2={1} />`

### T11-05 [DD] Sestavte komponentu
Přetáhněte do mezer tak, aby vznikl typ props s nepovinnou vlastností `value1`, komponenta typovaná pomocí `FC` a její výchozí export.
```tsx
[[1]] NumberProps = {
  value1[[2]] number;
};

const Number: [[3]]<NumberProps> = ([[4]]) => {
  return <p>Číslo: {value1}</p>;
};

[[5]] default Number;
```
Volby: 1. `type` 2. `?:` 3. `FC` 4. `{ value1 }` 5. `export` 6. `interface` 7. `import` 8. `ReactNode` 9. `value1`

### T11-06 [MCn] Návratová hodnota komponenty
Co smí funkční komponenta vrátit, aby se vykreslila bez chyby?
- [x] JSX prvek
- [x] `null`
- [x] řetězec nebo číslo
- [ ] obyčejný objekt, např. `{ text: "Ahoj" }`
- [ ] funkci

## T12 Kompozice a opakované použití komponent

### T12-01 [MC1] Více instancí
Komponenta `Number` vrací `<p>Číslo: {value1}</p>`. Rodič obsahuje:
```tsx
<main>
  <Number value1={3} />
  <Number value1={3 + 6} />
</main>
```
Co platí?
- [x] Vzniknou dvě nezávislé instance s vlastními props; vykreslí se `Číslo: 3` a `Číslo: 9`.
- [ ] Druhé použití přepíše první, vykreslí se jen `Číslo: 9`.
- [ ] Komponentu lze na stránce použít jen jednou.
- [ ] Obě instance sdílí props, vykreslí se dvakrát `Číslo: 9`.

### T12-02 [MC1] Props jen pro čtení
Komponenta `Number` dostane od rodiče prop `value1` a uvnitř provede `value1 = 10;`. Změní se tím hodnota v rodiči?
- [x] Ne – props jsou pro potomka jen pro čtení; data může změnit jen jejich vlastník (rodič), např. přes stav a callback.
- [ ] Ano – props se předávají odkazem.
- [ ] Ano, ale jen při použití `FC`.
- [ ] Ne, ale `Number` se automaticky znovu vykreslí s hodnotou 10.

### T12-03 [MC1] Informace od potomka k rodiči
Komponenta `App` (rodič) drží stav a vykresluje `<Triangle … />` (potomek). `Triangle` má `App` oznámit, že uživatel klikl na trojúhelník. Jak to správně udělat?
- [x] `App` předá `Triangle` funkci v props (např. `onSelect`) a `Triangle` ji při kliknutí zavolá.
- [ ] `Triangle` přiřadí novou hodnotu do svého prop, `App` si ji přečte.
- [ ] `Triangle` zavolá `setA` z `App` přímo, i když jí nebyl předán.
- [ ] Nelze – potomek nemůže rodiči nic sdělit.

### T12-04 [MC1] Počet prvků v DOM
Komponenta `App` vrací `<Inputs … />`, `<div className="triangle"><Triangle … /></div>` a znovu `<Inputs … />`. Každá instance `Inputs` obsahuje 4 prvky `<input>`. Kolik prvků `<input>` bude na stránce?
- [x] 8
- [ ] 4
- [ ] 2
- [ ] 12

### T12-05 [MATCH] Role komponent
```tsx
function App() {
  const [a, setA] = useState<number>(6);
  return (
    <>
      <Inputs a={a} handleA={setA} />
      <Triangle a={a} />
    </>
  );
}
```
Přiřaďte každé komponentě její roli podle uvedeného kódu.
| Komponenta | Role |
| --- | --- |
| `App` | Drží stav a předává ho potomkům přes props |
| `Inputs` | Změnu hodnoty může oznámit voláním předané funkce |
| `Triangle` | Hodnotu jen čte z props, stav změnit nemůže |

Distraktory: *Mění stav přiřazením nové hodnoty do props*, *Načítá data ze serveru*

## T14 Callback props a sdílený stav

### T14-01 [MC1] Stav v potomkovi
```tsx
function App() {
  const [a, setA] = useState<number>(6);
  return (
    <>
      <Inputs a={a} handleA={setA} />
      <Triangle a={a} />
      <Inputs a={a} handleA={setA} />
    </>
  );
}
```
Co by se stalo, kdyby `App` stav neměla a každá instance `Inputs` si držela `a` ve vlastním `useState`?
- [x] Obě instance by měly nezávislé hodnoty a `Triangle` by se o změnách nedozvěděl.
- [ ] Nic – React stav stejně pojmenovaných proměnných automaticky sdílí.
- [ ] TypeScript by ohlásil chybu, `useState` lze volat jen v `App`.
- [ ] Obě instance by sdílely stav, ale `Triangle` ne.

### T14-02 [MC1] Dvě instance `Inputs`
```tsx
function App() {
  const [a, setA] = useState<number>(6);
  return (
    <>
      <Inputs a={a} handleA={setA} />
      <Triangle a={a} />
      <Inputs a={a} handleA={setA} />
    </>
  );
}
```
`Inputs` zobrazuje hodnotu `a` z props a při změně volá `handleA`. Uživatel změní hodnotu v horním `Inputs`. Co se stane?
- [x] Změní se hodnota v obou `Inputs` i trojúhelník – všechny čtou stejný stav z `App`.
- [ ] Změní se jen horní `Inputs`.
- [ ] Změní se horní `Inputs` a trojúhelník, dolní ne.
- [ ] Nic, props nelze měnit.

### T14-03 [MC1] Průběh změny
```tsx
// App
const [a, setA] = useState<number>(6);
const handleAChange = (value: number) => { setA(value); };
// …
<Inputs a={a} handleA={handleAChange} />
<Triangle a={a} />
```
Které pořadí kroků odpovídá zavolání `handleA(7)` uvnitř `Inputs`?
- [x] `Inputs` zavolá `handleA` → v `App` proběhne `setA(7)` → `App` se znovu vykreslí → `Inputs` i `Triangle` dostanou `a = 7`.
- [ ] `Inputs` změní svůj prop `a` na 7 → `App` si změnu přečte → `Triangle` se překreslí.
- [ ] `handleA` přímo překreslí `Triangle`, `App` se nevykresluje.
- [ ] `setA(7)` změní `a` okamžitě, bez nového vykreslení.

### T14-04 [GAP] Propojení rodiče a potomka
Doplňte kód tak, aby změna hodnoty v `<input>` uvnitř `Inputs` změnila stav `b` v `App`.
```tsx
// App.tsx
const [b, setB] = useState<number>(4);
const handleBChange = (value: number) => { [[1]](value); };
<Inputs b={[[2]]} handleB={[[3]]} /* … */ />

// Inputs.tsx
<input type="number" value={b}
  onChange={(e) => [[4]](parseInt(e.target.value))} />
```
Volby: 1. `setB` 2. `b` 3. `handleBChange` 4. `handleB` 5. `handleBChange()` 6. `useState` 7. `setB(value)`

### T14-05 [MC1] Typ callbacku
V `App` je:
```tsx
const [actualColor, setActualColor] = useState<string>("orange");
const [a, setA] = useState<number>(6);
const handleColorChange = (color: string) => { setActualColor(color); };
```
Prop `handleCC` komponenty `Inputs` má typ `(color: string) => void`. Co je správné předat do `<Inputs handleCC={…} />`?
- [x] `handleColorChange`
- [ ] `handleColorChange("red")`
- [ ] `actualColor`
- [ ] `setA`

### T14-06 [MC1] Kdy se volá callback
Komponenta `ControlledInput` obsahuje:
```tsx
<input
  value={value}
  onChange={(e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }}
/>
```
Rodič ji použije jako `<ControlledInput onChange={(value) => console.log(value)} … />`. Kdy se hodnota vypíše do konzole?
- [x] Při každé změně textu v poli – `ControlledInput` volá `onChange(e.target.value)` ve svém handleru.
- [ ] Jen jednou při prvním vykreslení.
- [ ] Až po kliknutí na tlačítko.
- [ ] Nikdy – `onChange` z props se nepoužívá.

---

# K4 Stav, hooky a formuláře

## T13 Stav – `useState`

### T13-01 [MC1] Bez destrukturalizace
Komponenta obsahuje `const state = useState(6);`. Jak přečíst hodnotu a jak ji změnit na 7?
- [x] `state[0]`, `state[1](7)`
- [ ] `state.value`, `state.setValue(7)`
- [ ] `state`, `state = 7`
- [ ] `state()`, `state(7)`

### T13-02 [MC1] Stav vs proměnná
Proč v komponentě nestačí `let a = 6;` a v handleru `a = 7;`?
- [x] Změna obyčejné proměnné nevyvolá nové vykreslení a při dalším vykreslení se `a` opět nastaví na 6.
- [ ] Proměnné deklarované pomocí `let` nejsou v JSX dostupné.
- [ ] TypeScript zakazuje měnit proměnné uvnitř komponenty.
- [ ] Stačí – React změnu proměnné sám zachytí.

### T13-03 [MC1] Počáteční hodnota
Komponenta obsahuje `const [value, setValue] = useState(defaultValue);`, kde `defaultValue` je prop. Rodič později předá jiné `defaultValue`. Co se stane se stavem `value`?
- [x] Nic – počáteční hodnota se použije jen při prvním vykreslení komponenty.
- [ ] Stav se automaticky nastaví na nové `defaultValue`.
- [ ] Komponenta vyhodí chybu.
- [ ] Stav se vynuluje na `""`.

### T13-04 [MC1] Změna stavu
Jak správně změnit stav `a` z `const [a, setA] = useState(6);`?
- [x] `setA(7)`
- [ ] `a = 7`
- [ ] `useState(7)`
- [ ] `setA = 7`

### T13-05 [MCn] Vlastnosti setteru
Co platí o funkci `setA`?
- [x] Naplánuje nové vykreslení komponenty.
- [x] Nová hodnota je v `a` k dispozici až při dalším vykreslení.
- [ ] Okamžitě změní proměnnou `a` v právě běžící funkci.
- [ ] Lze ji volat jen přímo v JSX.
- [ ] Vrací novou hodnotu stavu.

### T13-06 [DD] Sestavte čítač
Přetáhněte do mezer tak, aby vznikla komponenta s číselným stavem `count`, který se kliknutím zvyšuje.
```tsx
import { [[1]] } from "react";

function Counter() {
  const [count, [[2]]] = useState<[[3]]>(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```
Volby: 1. `useState` 2. `setCount` 3. `number` 4. `useRef` 5. `string` 6. `count` 7. `setState`

## T15 Události

### T15-01 [MC1] Typ `e.target.value`
Jaký typ má `e.target.value` u `<input type="number">`?
- [x] `string` – pro výpočty je nutné ho převést, např. pomocí `parseInt`.
- [ ] `number`
- [ ] `number | undefined`
- [ ] `any`

### T15-02 [MC1] Prázdné pole
Co vrátí `parseInt(e.target.value)`, když uživatel pole vymaže?
- [x] `NaN`
- [ ] `0`
- [ ] `""`
- [ ] `undefined`

### T15-03 [MC1] Reference vs volání
Jaký je rozdíl mezi `onClick={handleClick}` a `onClick={handleClick()}`?
- [x] První předá funkci, kterou React zavolá při kliknutí; druhý ji zavolá hned při vykreslení a předá její výsledek.
- [ ] Žádný, oba zápisy jsou ekvivalentní.
- [ ] První se zavolá při vykreslení, druhý při kliknutí.
- [ ] Druhý zápis předá funkci i s objektem události.

### T15-04 [MCn] Správný handler
Které zápisy správně zavolají `handleA: (value: number) => void` s číselnou hodnotou při změně pole?
- [x] `onChange={(e) => handleA(parseInt(e.target.value))}`
- [x] `onChange={(e) => handleA(e.target.valueAsNumber)}`
- [ ] `onChange={handleA(parseInt(e.target.value))}`
- [ ] `onChange={(e) => handleA(e.target.value)}`
- [ ] `onchange={(e) => handleA(parseInt(e.target.value))}`

### T15-05 [MC1] `type="button"`
Tlačítko je zapsáno jako `<button type="button" onClick={…}>Click me</button>`. K čemu slouží `type="button"`?
- [x] Uvnitř formuláře by výchozí typ `submit` formulář odeslal (a obnovil stránku).
- [ ] Bez něj by nefungoval `onClick`.
- [ ] Je to povinný atribut každého `<button>` v JSX.
- [ ] Aby se tlačítko vykreslilo jako odkaz.

### T15-06 [MATCH] Hodnoty z události
Uživatel napsal do `<input type="number">` hodnotu `12`. Přiřaďte výraz v handleru `onChange={(e) => …}` k jeho výsledku.
| Výraz | Výsledek |
| --- | --- |
| `e.target.value` | `"12"` |
| `parseInt(e.target.value)` | `12` |
| `e.target.value + 1` | `"121"` |
| `parseInt(e.target.value) + 1` | `13` |
| `e.target.value.length` | `2` |

Distraktory: *`NaN`*, *`3`*

## T16 Řízené vs neřízené formulářové prvky

### T16-01 [MC1] Úprava hodnoty v řízeném inputu
Pole má `value={name}` a `onChange={(e) => setName(e.target.value.toUpperCase())}`. Uživatel píše `ahoj`. Co uvidí v poli?
- [x] `AHOJ` – v poli je vždy hodnota stavu, která se ukládá velkými písmeny.
- [ ] `ahoj` – pole zobrazuje to, co uživatel napsal.
- [ ] `ahoj`, velká písmena se projeví až po opuštění pole.
- [ ] Pole zůstane prázdné.

### T16-02 [MC1] Neřízený input po úpravě
```tsx
const inputRef = useRef<HTMLInputElement>(null);
// …
<input defaultValue={defaultValue} ref={inputRef} />
```
Komponenta dostala prop `defaultValue="Hello"`. Uživatel přepíše text v poli na `Ahoj`. Jaké hodnoty mají prop `defaultValue` a `inputRef.current?.value`?
- [x] `defaultValue` je stále `"Hello"`, `inputRef.current?.value` je `"Ahoj"`.
- [ ] Oba jsou `"Ahoj"`.
- [ ] Oba jsou `"Hello"`.
- [ ] `defaultValue` je `"Ahoj"`, `inputRef.current?.value` je `"Hello"`.

### T16-03 [MATCH] Řízený nebo neřízený?
Určete, zda popsaný formulářový prvek je řízený, nebo neřízený.
| Vlastnost | Typ |
| --- | --- |
| `value={value}` + `onChange` se setterem | řízený |
| `defaultValue="Hello"` + `ref={inputRef}` | neřízený |
| Hodnota se čte až po kliknutí přes `inputRef.current.value` | neřízený |
| Barva pozadí se mění okamžitě podle délky textu | řízený |

Distraktor: *nelze určit*

### T16-04 [MC1] `value` bez `onChange`
Co se stane s `<input value={a} />` bez `onChange`?
- [x] Pole bude jen pro čtení – uživatel hodnotu nezmění a React vypíše varování.
- [ ] Pole bude fungovat jako neřízené.
- [ ] Hodnota `a` se bude měnit podle psaní.
- [ ] Pole se nevykreslí.

### T16-05 [MC1] `value` i `defaultValue`
```tsx
const [value, setValue] = useState(defaultValue);
// …
<input value={value} defaultValue={defaultValue} onChange={(e) => setValue(e.target.value)} />
```
Input má současně nastaveno `value` i `defaultValue`. Co platí?
- [x] Je to chyba – input má být buď řízený, nebo neřízený; React vypíše varování a `defaultValue` nemá vliv.
- [ ] Je to doporučený postup – `defaultValue` se použije při prvním vykreslení, `value` potom.
- [ ] `defaultValue` přepíše `value`.
- [ ] TypeScript tuto kombinaci nedovolí přeložit.

### T16-06 [MC1] Barva pozadí
```tsx
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  style={{ backgroundColor: value.length > 5 ? "lightgreen" : "lightcoral" }}
/>
```
Kdy bude mít pole pozadí `lightgreen`?
- [x] Když text obsahuje 6 a více znaků.
- [ ] Když text obsahuje 5 a více znaků.
- [ ] Jen když text obsahuje přesně 5 znaků.
- [ ] Nikdy – styl se nastaví jen při prvním vykreslení.

## T17 Hooky `useRef`, `useId` a pravidla hooků

### T17-01 [MC1] Obsah `ref.current`
Co obsahuje `inputRef.current` po vykreslení `<input ref={inputRef} />`?
- [x] Odkaz na DOM prvek `<input>` (`HTMLInputElement`).
- [ ] Aktuální text v poli.
- [ ] Kopii props komponenty.
- [ ] Vždy `null`.

### T17-02 [MC1] `useRef` a vykreslení
Vyvolá změna `inputRef.current` nové vykreslení komponenty?
- [x] Ne – ref uchovává hodnotu mezi vykresleními, ale jeho změna vykreslení nevyvolá.
- [ ] Ano, stejně jako setter `useState`.
- [ ] Ano, ale jen v `StrictMode`.
- [ ] `inputRef.current` nelze měnit.

### T17-03 [MC1] `useId` ve více instancích
Komponenta obsahuje `const id = useId();` a na stránce je použita dvakrát. Co platí o hodnotách `id`?
- [x] Každá instance má jiné id a mezi vykresleními se nemění.
- [ ] Obě instance mají stejné id, protože jde o stejnou komponentu.
- [ ] Id se mění při každém vykreslení.
- [ ] Id je prázdné, dokud ho nenastavíme setterem.

### T17-04 [MC1] Pevné id
Komponenta s `<label htmlFor="input1">` a `<input id="input1" />` (pevné id místo `useId`) je na stránce dvakrát. Uživatel klikne na popisek druhé instance. Co se stane?
- [x] Fokus dostane input první instance – na stránce jsou dva prvky se stejným id.
- [ ] Fokus dostane input druhé instance.
- [ ] TypeScript kód s pevným id nepřeloží.
- [ ] React id automaticky přejmenuje na unikátní.

### T17-05 [MCn] Pravidla hooků
Která použití porušují pravidla hooků?
- [x] `if (show) { const [v, setV] = useState(0); }`
- [x] `for (let i = 0; i < 3; i++) { useRef(null); }`
- [x] volání `useState` uvnitř handleru `onClick`
- [ ] `const id = useId();` na začátku těla komponenty
- [ ] `const [a, setA] = useState(6);` na začátku těla komponenty

### T17-06 [MC1] Počítadlo v `useRef`
```tsx
const Clicker = () => {
  const clicks = useRef(0);
  return <button onClick={() => { clicks.current++; }}>{clicks.current}</button>;
};
```
Co bude na tlačítku po třech kliknutích?
- [x] `0` – hodnota v refu se zvýší na 3, ale komponenta se znovu nevykreslí.
- [ ] `3`
- [ ] `1`
- [ ] Vznikne chyba – `clicks.current` nelze měnit.

---

# K5 Analýza kódu

## T18 Čtení kódu a hledání chyb

### T18-01 [MC1] Chybějící povinný prop
```tsx
type ControlledInputProps = {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
};
const ControlledInput: FC<ControlledInputProps> = (/* … */) => { /* … */ };
```
Komponenta je použita jako `<ControlledInput defaultValue="Hello" onChange={(v) => console.log(v)} />`. Co se stane?
- [x] TypeScript ohlásí chybu – chybí povinná vlastnost `label`.
- [ ] `label` bude automaticky prázdný řetězec a vše je v pořádku.
- [ ] Aplikace spadne při vykreslení.
- [ ] Nic, props jsou vždy volitelné.

### T18-02 [MC1] Nepoužitý import
Soubor `App.tsx` obsahuje `import { useState } from 'react'`, ale `useState` se nikde nepoužije. Projekt má v `tsconfig.app.json` `"noUnusedLocals": true`. Co se stane?
- [x] `npm run build` (`tsc -b`) skončí chybou kvůli nepoužité proměnné.
- [ ] Nic, nepoužité importy TypeScript ignoruje.
- [ ] Aplikace spadne při spuštění v prohlížeči.
- [ ] `useState` se automaticky zavolá.

### T18-03 [MC1] Kliknutí v `UncontrolledInput`
```tsx
type Props = { defaultValue?: string; onChange?: (value: string | undefined) => void };

const UncontrolledInput: FC<Props> = ({ defaultValue, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input defaultValue={defaultValue} ref={inputRef} />
      <button type="button" onClick={() => {
        alert(inputRef.current?.value);
        onChange?.(inputRef.current?.value);
      }}>Click me</button>
    </>
  );
};
```
Komponenta je použita jako `<UncontrolledInput defaultValue="Hello" />` (bez `onChange`). Uživatel přepíše text na „Ahoj“ a klikne na „Click me“. Co se stane?
- [x] `alert` zobrazí „Ahoj“; `onChange?.(…)` se díky `?.` nezavolá a nevznikne chyba.
- [ ] `alert` zobrazí „Hello“ – výchozí hodnotu.
- [ ] Vznikne chyba `onChange is not a function`.
- [ ] Nic, neřízený input nelze číst.

### T18-04 [MC1] Najděte chybu
```tsx
function Greeting(props: { name: string }) {
  return <p class="greeting">Ahoj {props.name}</p>;
}
```
Co je v kódu špatně?
- [x] V JSX se místo `class` píše `className`.
- [ ] Props nelze typovat inline.
- [ ] `{props.name}` musí být v uvozovkách.
- [ ] Komponenta musí být šipková funkce.

### T18-05 [MC1] Nekonečné vykreslování
```tsx
const Counter = () => {
  const [n, setN] = useState(0);
  return <button onClick={setN(n + 1)}>{n}</button>;
};
```
Co je špatně?
- [x] `setN` se volá už při vykreslení → nové vykreslení → znovu volání… (nekonečná smyčka). Správně `onClick={() => setN(n + 1)}`.
- [ ] `useState(0)` musí mít generikum `<number>`.
- [ ] `{n}` nelze vypsat do tlačítka.
- [ ] Nic, kód funguje správně.

### T18-06 [MC1] Chybný `style`
```tsx
const Box = ({ size }: { size: number }) => {
  return <div style="width: {size}px">Box</div>;
};
```
Co je špatně?
- [x] `style` musí být objekt, např. `style={{ width: size }}`.
- [ ] Jednotka `px` se v Reactu nesmí používat.
- [ ] `size` musí být typu `string`.
- [ ] Chybí `className`.
