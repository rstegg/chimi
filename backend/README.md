## Chimi Backend

To Debug prisma:

```
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});
```

### Routes:

/api/v1/users/login
/api/v1/users/register
/api/v1/mealplans
/api/v1/mealplans/:id

### Folder Structure:

src/config - Config files, like setting up passport auth
src/handlers - Core logic files
src/middleware - Repetitive logic, such as parsing jwt data
src/models - typescript models, might remove later
src/routes - routing files
prisma/ - Database ORM files
types/ - Extra types
