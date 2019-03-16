export const environment = {
    server: {port: process.env.PORT || 3000},
    security:{
        salt_rounds: process.env.SALT_ROUNDS || 10,
        apikey: process.env.API_KEY || 'ada0f352',
        secret: process.env.JWT_KEY || 'moovie-api'
    },
    db: {url: process.env.DB_URL || 'mongodb://localhost/o-commerce'}
}