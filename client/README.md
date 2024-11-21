## Changes
### Structure
- Export routes from Appp.tsx to Routes.tsx
- Redirect `/` to `/login`
- Do not export type, they will be used automatically

### Features
- Add eslint + prettier

### API
- Create API client
- Use interceptor to add token to request headers

## Comments
- Function with a lot of parameters (ex: `editClient`) are better with one paramater that is an object
- Don't mix language. In `Edit` there is french and english for methods parameters. Be consistent
- JSDoc is not necessary for every function. Use it for complex functions or public functions
- Be consistent with the way you type Props