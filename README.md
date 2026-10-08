# MOONSTYLE — Premium Streetwear Store

Dit is een mobile-first, premium static e-commerce prototype voor MOONSTYLE.

## Bestanden
- index.html — complete storefront
- styles.css — responsive design system
- script.js — filters, cart, newsletter popup, search, size guide
- assets/moonstyle-cream.webp — aangeleverde productfoto
- assets/moonstyle-black.webp — aangeleverde productfoto

## Shopify
De productkaarten laten eerst de klant een maat kiezen. `script.js` koppelt de
gekozen kleur- en maatcombinatie aan een Shopify-variant en stuurt de volledige
winkelwagen naar de Shopify-checkout via een Shopify-cart permalink.

De Shopify-catalogus bevat drie producten (hoodie, broek en complete set), elk
met vijf kleuren en de maten XS–2XL. Voorraadtracking staat uit. De variant-ID's
en winkel-URL in `script.js` zijn specifiek voor de MOONSTYLE Shopify-winkel.
Pas ze aan als je producten, varianten of Shopify-winkel veranderen.

Voor live bestellingen moet in Shopify ook de checkout, verzendtarieven,
belastingen en betaalprovider correct zijn ingesteld. Test een bestelling eerst
met Shopify's testmodus voordat je de website breed publiceert.

## Klantaccounts
De links "Inloggen via e-mail" en "Registreren via e-mail" openen Shopify's beveiligde
klantaccountpagina op `b51isi-cm.myshopify.com`. Bij de nieuwe Shopify-
klantaccounts kunnen bestaande klanten inloggen en nieuwe klanten hun account
aanmaken vanuit dezelfde pagina. Shopify verzorgt de authenticatie; er worden
geen wachtwoorden of profielgegevens op deze statische website opgeslagen.
Shopify gebruikt e-mailverificatiecodes of de beschikbare Shopify-loginopties.
De links op de website benoemen de e-mailroute; de afzonderlijke Shop-optie op
Shopify's inlogpagina blijft beschikbaar zolang Shop Pay is ingeschakeld.

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
