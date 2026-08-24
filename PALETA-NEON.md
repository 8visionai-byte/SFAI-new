# PALETA NEONOWA — JEDYNE DOPUSZCZALNE KOLORY UI

Decyzja Pawła 2026-08-21 (grafika „NEON WEB PALETTE"):
**„Używamy tylko palety neonowych kolorów i tylko z tych neonowych kolorów
korzystamy."**

Każdy kolor akcentu w UI (ramka karty, kafelek ikony, liczba, chip, tag,
poświata) MUSI pochodzić z tej tabeli. Blade odcienie pośrednie są zakazane:
jeśli kolor wygląda słabo, bierzemy mocniejszy z tej samej rodziny, nie
rozjaśniamy ani nie przygaszamy własnym hexem.

## Tabela

| Rodzina | Nazwa | HEX | RGB |
|---|---|---|---|
| RED | Laser Red | `#FF0033` | 255, 0, 51 |
| RED | Electric Red | `#FF3131` | 255, 49, 49 |
| RED | Crimson Glow | `#FF1744` | 255, 23, 68 |
| RED | Neon Cherry | `#FF2B58` | 255, 43, 88 |
| ORANGE | Neon Orange | `#FF6A00` | 255, 106, 0 |
| ORANGE | Electric Orange | `#FF8C00` | 255, 140, 0 |
| ORANGE | Neon Coral | `#FF5E4D` | 255, 94, 77 |
| ORANGE | Peach Glow | `#FFA64D` | 255, 166, 77 |
| YELLOW | Neon Yellow | `#FFFF00` | 255, 255, 0 |
| YELLOW | Laser Lemon | `#F4FF4D` | 244, 255, 77 |
| YELLOW | Bright Gold | `#FFD600` | 255, 214, 0 |
| YELLOW | Neon Amber | `#FFC400` | 255, 196, 0 |
| GREEN | Neon Green | `#39FF14` | 57, 255, 20 |
| GREEN | Lime Neon | `#99FF00` | 153, 255, 0 |
| GREEN | Mint Neon | `#00FFAA` | 0, 255, 170 |
| GREEN | Toxic Green | `#66FF33` | 102, 255, 51 |
| BLUE | Electric Blue | `#0066FF` | 0, 102, 255 |
| BLUE | Neon Blue | `#0099FF` | 0, 153, 255 |
| BLUE | Cobalt Neon | `#3366FF` | 51, 102, 255 |
| BLUE | Ice Blue | `#66F5FF` | 102, 245, 255 |
| PINK | Hot Pink | `#FF0080` | 255, 0, 128 |
| PINK | Neon Rose | `#FF3399` | 255, 51, 153 |
| PINK | Bubble Pink | `#FF66B2` | 255, 102, 178 |
| PINK | Fuchsia Flash | `#FF2DFF` | 255, 45, 255 |
| PURPLE | Neon Purple | `#B300FF` | 179, 0, 255 |
| PURPLE | Electric Violet | `#9933FF` | 153, 51, 255 |
| PURPLE | Lavender Neon | `#CC66FF` | 204, 102, 255 |
| PURPLE | Ultra Purple | `#7D00FF` | 125, 0, 255 |

Dodatkowo w użyciu od wcześniejszych rund (zostają, mieszczą się w charakterze):
`#00F0FF` (cyjan marki, hero i nawigacja), `#E438FF` (fiolet voicebotów).

## Zasady użycia

1. **Kolor widoczny W SPOCZYNKU.** Ramka karty niesie kolor od razu, nie
   dopiero po najechaniu. Hover ma go PODBIĆ, nie włączyć.
2. **Żadnych dwóch takich samych kolorów obok siebie** ani bezpośrednio
   nad sobą w siatce. Sprawdzać na każdej szerokości, bo liczba kolumn
   zmienia sąsiedztwo (skrypt: `scratchpad/sasiedztwo.mjs`).
3. **Odcień jaśniejszy z tej samej rodziny** jako `--card-c-l` (tekst, ramka
   hoveru). Nigdy dowolny hex spoza tabeli.
4. **Kontrast AA obowiązuje.** Każdy kolor tekstu na korpusie karty
   rgb(12,13,28) musi dawać min. 4,5:1 (tekst normalny) albo 3:1 (duży).
   Wyliczać, nie zgadywać.
5. **Błysk przy najechaniu I przy zjeżdżaniu**, ta sama szybkość w obie
   strony (dziś 0,34 s), pas w kolorze karty, nie w bieli.
6. Poświaty gasną w Windows High Contrast i przy `prefers-reduced-motion`.

## Gdzie to żyje w kodzie

- `lib/inf-kategorie.ts` — rejestry `INF_KATEGORIA` (usługi), `INF_PRODUKT`
  (produkty), `KLOCEK_TON` (klocki). To jedyne miejsca, gdzie hex wolno wpisać.
- `app/globals.css` — `.inf-card-neon` (spoczynek + błysk), sekcja „INFINITY v24".
- Komponenty NIE wpisują hexów. Biorą je z rejestru przez `--card-c`.
