import { redisStore } from '../config/redis.js'; // Ajuste o caminho conforme necessário

// Verifica se está em produção
const isProduction = process.env.NODE_ENV === 'production';

const sessionOptions = {
  store: redisStore,
  secret: process.env.SECRET_COOKIE || 'fallbackSecret', // Use uma secret forte em produção
  resave: false, // Evita regravar sessões não modificadas [citation:1][citation:3]
  saveUninitialized: false, // Não salva sessões vazias [citation:1][citation:3]
  rolling: true, // Renova o cookie a cada resposta [citation:1]
  name: process.env.SESSION_NAME || 'myapp.sid', // Nome do cookie [citation:1]
  cookie: {
    secure: isProduction, // Cookie seguro apenas em HTTPS (ajuste para produção) [citation:1]
    httpOnly: true, // Cookie não acessível via JavaScript [citation:1][citation:7]
    sameSite: isProduction ? 'lax' : 'strict', // Controla envio cross-site [citation:1]
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 24 * 60 * 60 * 1000, // 24h [citation:7]
    // domain: process.env.COOKIE_DOMAIN // Opcional: para subdomínios [citation:1]
  },
  // genid: (req) => { // Opcional: gera ID customizado [citation:1]
  //     return generateCustomId(); // Implemente sua geração de ID
  // },
};

// Se estiver atrás de um proxy (ex.: Nginx, Heroku), configure trust proxy
// Isso é necessário para cookies secure em ambientes com proxy [citation:1]
if (isProduction) {
  sessionOptions.proxy = true; // Confia no header X-Forwarded-Proto
}

export default sessionOptions;