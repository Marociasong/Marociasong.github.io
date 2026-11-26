# Security policy

## Scope and ownership

This public GitHub Pages site and its separately hosted API are maintained by
[@Marociasong](https://github.com/Marociasong) as part of the ECO-SYS
ecosystem. The API supports GitHub OAuth sign-in, profile records, session
handling, and an aggregate profile-link click counter. The website is publicly
accessible; a hidden route or client-side check is not access control.

## Account and access

The repository owner approves maintainers, OAuth application access, and
deployment permissions. Any protected account or profile feature must be
authorized by the API on every request and limited to owner-approved GitHub
accounts. Enforce that restriction server-side; never rely on a frontend check
or on a user's public GitHub profile.

Grant repository, OAuth, database, and hosting access using least privilege.
Remove access that is no longer needed.

## Authentication and data

Request only the GitHub OAuth permissions needed by the application. Do not
store GitHub access tokens in the database, browser storage, logs, or source
control. Store OAuth client secrets and database credentials only in the API
host's environment or an ignored local environment file. Do not expose private
profile data through public API responses.

Production authentication traffic must use HTTPS. Configure session cookies
with `HttpOnly` and `Secure`; choose `SameSite` to match the deployment's
cross-site needs. Invalidate sessions on logout or revocation and avoid
logging session tokens.

## Vulnerability reporting

Do not publish details of an unpatched vulnerability in a public issue, pull
request, or discussion. Use this repository's GitHub private vulnerability
reporting when available. Otherwise, contact
[@Marociasong](https://github.com/Marociasong) privately.

Include the affected endpoint or file, impact, and a minimal reproduction.
Remove credentials, private URLs, and personal data from reports.
