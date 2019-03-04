import App from './src/config/server'
import { environment } from './src/config/environment'

const app = new App().getApp()

app.listen(environment.server.port, () => {
    console.log(`Listening on port ${environment.server.port}`)
})
