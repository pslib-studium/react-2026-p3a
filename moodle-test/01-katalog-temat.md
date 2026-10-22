# Katalog témat – test TypeScript + React (p3a)

Zdroj: ukázkové projekty `e01-basics`, `e02-state`, `e03-inputs` (Vite + React 19 + TypeScript).
Každé téma = jedna skupina otázek (3–10 otázek). Rozdělení do kategorií proběhne až po odsouhlasení témat.

| ID | Téma | Klíčové pojmy / syntaxe | Výskyt v ukázkách |
| --- | --- | --- | --- |
| T02 | ES moduly – import / export | `export default`, pojmenovaný export (`export function App`), default import pod libovolným jménem (`import Application from './App.tsx'`), alias `import { createRoot as cr }`, type-only import `import { type FC }`, import CSS (`import './App.css'`), relativní cesty | e01 `main.tsx`, `App.tsx`, `Number.tsx` |
| T04 | Základy JSX | `return ( ... )`, jeden kořenový prvek, Fragment `<>…</>`, vkládání výrazů `{}`, párový vs nepárový zápis komponenty (`<App />` vs `<App></App>`), velké písmeno = komponenta, malé = HTML prvek, komentáře v JSX | e01 `App.tsx`, e02 `App.tsx` |
| T05 | JSX atributy a styly | `className`, `htmlFor`, `style={{ ... }}` (objekt, camelCase: `fontWeight`, `backgroundColor`), číselná hodnota `value1={3}`, výraz `{3 + 6}`, řetězec `"..."` vs `{...}`, SVG atributy (`viewBox`, `fontSize`, `points`, `transform`, `aria-hidden`), template literal v atributu | `Number.tsx`, `Triangle.tsx`, `ControlledInput.tsx` |
| T06 | Podmíněné vykreslování | ternární operátor `cond ? "+" : null`, `null` nic nevykreslí, předčasný `return` jiného JSX (`if (!isConstructible) return ...`), podmínka uvnitř `style` | `Number.tsx`, `Triangle.tsx`, `ControlledInput.tsx` |
| T07 | Moderní JS/TS syntaxe (ES6+) | `const` vs `let`, šipková funkce, destrukturalizace objektu i pole (`const [a, setA] = ...`), template literal `` `${x}` ``, objektový literál, operátor `**`, `Math.min/max/sqrt`, `parseInt` | `Triangle.tsx`, `App.tsx` (e02) |
| T09 | Typy funkcí a pokročilejší TS operátory | funkční typ `(value: number) => void`, typování parametrů handleru, volitelná vlastnost `?:`, non-null assertion `!`, optional chaining `?.`, optional call `onChange?.(...)`, indexed access type `React.SVGProps<SVGPolygonElement>["fill"]` | `Inputs.tsx`, `UncontrolledInput.tsx`, `Triangle.tsx`, `main.tsx` |
| T10 | Generika v Reactu | `FC<Props>` / `React.FC<Props>`, `useState<number>(6)`, `useRef<HTMLInputElement>(null)`, kdy lze generikum vynechat (inference) | `Inputs.tsx`, e02 `App.tsx`, `UncontrolledInput.tsx` |
| T11 | Definice funkční komponenty a props | `function X(props)` vs `const X: FC<P> = (...) =>`, destrukturalizace props v parametru, inline typ props vs `type XProps`, návratový typ `ReactNode`, výchozí hodnoty (`a = 0`), povinné vs volitelné props (chyba při chybějícím `label`) | `Number.tsx` (vč. zakomentovaných variant), `Triangle.tsx`, `ControlledInput.tsx` |
| T12 | Kompozice a opakované použití komponent | vícenásobné použití komponenty s jinými props, props jsou jen pro čtení, jednosměrný tok dat (rodič → potomek), dekompozice do `components/` | e01 `App.tsx`, e02 `App.tsx` |
| T13 | Stav – `useState` | `const [value, setValue] = useState(init)`, setter vyvolá nové vykreslení, počáteční hodnota se použije jen při prvním renderu, typování stavu, stav vs obyčejná proměnná | e02 `App.tsx`, `ControlledInput.tsx` |
| T14 | Callback props a sdílený stav (lifting state up) | stav v rodiči, předání hodnot + handlerů (`handleA`, `handleCC`) potomkovi, potomek volá callback, dvě instance `Inputs` sdílí stejný stav, pojmenování `on…` / `handle…` | e02 `App.tsx`, `Inputs.tsx`, e03 `App.tsx` |
| T15 | Události | `onChange`, `onClick`, objekt události `e`, `e.target.value` je vždy `string`, převod `parseInt` (a riziko `NaN`), inline šipková funkce vs předání reference, `onClick={f}` vs `onClick={f()}`, `<button type="button">` | `Inputs.tsx`, `ControlledInput.tsx`, `UncontrolledInput.tsx` |
| T16 | Řízené vs neřízené formulářové prvky | controlled: `value` + `onChange` + stav; uncontrolled: `defaultValue` + `ref`; chyba při současném `value` i `defaultValue`; input s `value` bez `onChange` je read-only | `ControlledInput.tsx`, `UncontrolledInput.tsx`, `Inputs.tsx` |
| T17 | Hooky `useRef` a `useId` + pravidla hooků | `useRef` – `ref.current`, změna nevyvolá render, přístup k DOM prvku; `useId` – unikátní id pro dvojici `label`/`input`; pravidla hooků (jen na nejvyšší úrovni komponenty, ne v podmínce/cyklu, název `use…`) | `UncontrolledInput.tsx`, `ControlledInput.tsx` |
| T18 | Čtení kódu a hledání chyb | nepoužitý import (`useState` v e01 `App.tsx`, `Inputs.tsx`) → chyba lintu/TS, chybějící povinný prop (`label` v e03 `App.tsx`), `value` + `defaultValue` zároveň, co se vypíše/vykreslí pro dané props | průřezově |

## Poznámky k návrhu
- **Schváleno** s vypuštěním T01 (projekt Vite), T03 (vstupní bod) a T08 (základní typy TS). Původní ID ponechána kvůli dohledatelnosti.
- Jazyk otázek: čeština, 5–6 otázek na téma.
- T18 je průřezové téma na porozumění konkrétnímu kódu z ukázek (výstup, chyby) – lze ho vypustit, pokud nechcete „debug“ otázky.
- Mimo rozsah (v ukázkách není): `useEffect`, `children`, seznamy a `key`, `map`, kontext, routování, fetch.

## Předpokládané typy otázek
- **Výběr z více možností** (jedna / více správných) – většina otázek.
- **Přiřazování (matching)** – např. pojem ↔ význam, HTML atribut ↔ JSX atribut.
- **Doplňování chybějících slov (gapselect)** – doplnění kódu z nabídky.
- **Drag and drop do textu (ddwtos)** – sestavení kódu komponenty / hooku.
- **Pravda / nepravda** – jen doplňkově.
