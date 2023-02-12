import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import { router } from './routes/routes.ts'

const app = new Application()

const PORT = 8000

app.addEventListener('listen', () => {
  console.log(`App is running on http://localhost:${PORT}`)
  console.log('\u001b[1;33mAPI Routes:\u001b[0m')

  for (const r of router) {
    console.log(r.path)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
