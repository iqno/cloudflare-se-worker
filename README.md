# Cloudflare SE Homework – Worker

This Worker is part of the Cloudflare SE Homework; demonstrating identity-aware routing via Zero Trust and R2 storage.

---

## 🔒 `/secure`

Returns identity and location details for a user authenticated through Cloudflare Access; allowing criteria:
- All @cloudflare.com email addresses
- My personal email address

**Example Output:**

```
user@example.com authenticated at 2025-04-23T14:55:00.000Z from SG
```

---

## 🌐 `/secure/:country`

Returns a PNG flag image stored in R2. For example:

- `/secure/SG` → Returns `SG.png`
- `/secure/AU` → Returns `AU.png`

---

## ✅ Technologies Used

- Cloudflare Workers
- Cloudflare R2
- Wrangler CLI
- Zero Trust Access Header Handling

---

## 🔗 Live Example

Visit: [https://tunnel.alen.sg/secure](https://tunnel.alen.sg/secure)

