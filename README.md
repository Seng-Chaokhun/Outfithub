# Outfit Hub

This project is brought to you by **I4 GIC C Team 2**.

An E-commerce platform for selling and buying outfits for all genders and ages.

## Team Members

| Name          | ID        | Roles           |
| ------------- | --------- | --------------- |
| Seng Chaokhun | e20220478 | Project Manager |
| Thou Laiheng  | e20220843 | QA Tester       |
| Ang Panha     | e20221707 | Code Reviewer   |
| Kham Veasna   | e20210796 | QA Tester       |
| Cheng Sakda   | e20220190 | Reporter        |

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Seng-Chaokhun/Outfithub.git
cd Outfithub
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm run dev
```

## Contributor Notes

### Conventions

1. Commit Message:

```
<type>(scope): description
```

Types
| Type | Description |
|------|-------------|
| `feat` | new feature |
| `fix` | bug fix |
| `refactor` | code restructure, no behavior change |
| `style` | code formatting. note: use `feat` for css styling |
| `docs` | documentation |
| `test` | adding and modifying tests |
| `chore` | maintenance — deps, configs, tooling, CI |

example:

```
feat(auth): add refresh token handler
fix(api): handle null project IDs
refactor(ui): streamline modal component
```

2. Merge Message:

```
<scope>: <summary>
<optional bullets>
<optional breaking/migration notes>
```

example:

```
projects: implement full board CRUD and permissions
```

```
auth: integrate OAuth2 login and unify session flow
- added access/refresh model
- updated middleware
```

```
core: restructure modules
- moved domain logic to /modules
- removed v1 API
BREAKING: old endpoints removed
```
