import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import db from './db/db.ts'
import { router } from './routes/routes.ts'

const app = new Application()

const PORT = 8001

app.addEventListener('listen', () => {
  console.log(`App is running on http://localhost:${PORT}`)
  console.log('\u001b[1;33mAPI Routes:\u001b[0m')

  for (const r of router) {
    console.log(r.path)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

// ? drop?
await db.sync({ drop: true })

// TODO if Loactions are empty:
// await db.transaction(async () => {
//   await Location.create({ id: crypto.randomUUID(), name: 'Living Room', floor: 1 })
//   await Location.create({ id: crypto.randomUUID(), name: 'Kitchen', floor: 1 })
// })

console.log('Database Connected!!')

await app.listen({ port: PORT })
