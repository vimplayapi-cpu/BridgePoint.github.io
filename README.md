# BridgePoint

Responsive static ICT consulting website for bridgepoints.io, with Home, Services, Enterprise, About, Contact, Privacy Notice, Website Terms, and a 404 page. Uses the supplied BridgePoint logo, local assets, and no runtime dependencies.

## Preview

Run `python -m http.server 8000` from this directory and open http://localhost:8000.

## GitHub Pages

In repository Settings → Pages, select **Deploy from a branch**, **main**, and **/ (root)**. The included CNAME sets the custom domain to `bridgepoints.io`. Configure DNS with your domain provider and enable **Enforce HTTPS** once GitHub verifies the domain and issues a certificate. Domain ownership and DNS are managed separately from this repository.

## Contact behaviour

The form validates fields and prepares a mailto draft; the visitor must send the email. A visible copyable draft is provided if no email app is configured. The site has no contact backend, cookies, analytics, or form-data storage.

## Business content

Owner-supplied details: BridgePoint; Street Bulair 22, Pomorie, 8200, Bulgaria; bridgepoint@gmail.com. Owner confirmed ICT consulting as the business focus. The service descriptions are an initial owner-reviewable scope, not claims about past delivery. No registration number, VAT ID, founding date, client endorsements, accreditations, or banking approval is asserted. Add verified legal entity and registration details when available.

The reference was Beyondix’s public ICT consulting page structure and subject areas; BridgePoint uses original copy and artwork, not Beyondix client or company claims.

## Logo and HTTPS update

Transparent BridgePoint logo edited with the built-in image tool. Prompt: remove the black background and negative space; preserve the gold monogram and stacked composition; use charcoal lettering for contrast on the light website. Asset: assets/bridgepoint-logo-transparent.webp.

Website URLs follow the owner-selected www.bridgepoints.io custom domain. Local assets avoid HTTP mixed content. A restrictive static-site Content Security Policy and referrer policy are set in every HTML page. HTTPS requires GitHub Pages certificate issuance and Enforce HTTPS in the repository Pages settings; HTML cannot issue a TLS certificate or enforce a server redirect. Do not substitute a client redirect for a valid certificate.
