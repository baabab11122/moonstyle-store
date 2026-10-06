# MOONSTYLE — Premium Streetwear Store

Dit is een mobile-first, premium static e-commerce prototype voor MOONSTYLE.

## Bestanden
- index.html — complete storefront
- styles.css — responsive design system
- script.js — filters, cart, local demo account, newsletter popup, search, size guide
- assets/moonstyle-cream.webp — aangeleverde productfoto
- assets/moonstyle-black.webp — aangeleverde productfoto

## Shopify
De frontend is voorbereid op een Shopify-koppeling. De huidige checkoutknop geeft een placeholder-melding.
Voor een echte Shopify checkout kun je `checkoutBtn` in `script.js` koppelen aan:
- Shopify Storefront API Cart
- Shopify Cart API / cart permalink
- of een eigen backend die de Shopify checkout URL teruggeeft.

## Demo-account
De accountknop opent een lokale profiel-demo waarin een naam en e-mailadres op dit apparaat worden opgeslagen.
Dit is geen beveiligde login en de gegevens worden niet met andere apparaten gesynchroniseerd. Voor echte klantaccounts is een account-backend of een Shopify-koppeling nodig.

## Live zetten
Upload de bestanden naar je hosting of Vercel/Netlify. Voor productie:
1. Vervang de voorbeeldmaten door de echte maattabel.
2. Voeg echte productprijzen/SKU's toe.
3. Koppel Shopify checkout.
4. Vervang Instagram/TikTok placeholders door de echte accounts.
5. Voeg echte privacy-, retour- en algemene voorwaarden toe.

De productfoto's in `assets/` zijn de door jou aangeleverde afbeeldingen.


## Added products
- Moon Zip — Grey
- Moon Zip — Brown
- Moon Zip — Cream
- Moon Zip — Beige
- Moon - pants Grey
- Moon - pants Brown
- Moon - pants Cream
- Moon - pants beige

## Matching outfits
- Grey, Brown, Cream, Beige, and Black complete sets use their dedicated outfit photos.
- Each matching outfit is listed as a separate product and priced at €50.

The four supplied product images are stored in `assets/moon-zip-*.jpg`.
