// export default function appSrc(express, bodyParser, createReadStream, crypto, http, mongodb, Zombie) {
//   const app = express();

//   app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
//     next();
//   });

//   app.use('/login/', (req, res) => res.send('itmo182954'));

//   app.use('/code/', (req, res) => {
//     let readStream = createReadStream(import.meta.url.substring(7));
//     readStream.on('open', function () {
//       readStream.pipe(res);
//     });
//   });

//   app.use('/sha1/:input/', (req, res) => {
//     res.send(crypto.createHash('sha1').update(req.params.input, "binary").digest("hex"))
//   });

//   app.use('/req/', (req, res) => {
//     if(req.method === "GET") {
//       http.get(req.query.addr,  (result) => {

//         let rawData = '';
//         result.on('data', (chunk) => { rawData += chunk; });
//         result.on('end', () => {
//             res.send(rawData);
//         });
//       })
//     }

//     if(req.method === "POST") {
//       http.get(req.body.addr, (result) => {
//         let rawData = '';
//         result.on('data', (chunk) => { rawData += chunk; });
//         result.on('end', () => {
//           res.send(rawData);
//         });
//       });
//     }
//   });

//   app.post('/insert/', async(req, res) => {
//     const conn = await mongodb.MongoClient.connect(req.body.URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true
//     });
//     const db = conn.db('mongodemo');
//     let result = await db.users.insert({password: req.body.password, login: req.body.login});
//     db.close();
//     res.status(201).json(result);
//   });

//   app.use('/test/', async(req, res) => {
//     const page = new Zombie();
//     await page.visit(req.query.URL);
//     await page.pressButton('#bt');
//     const result = await page.document.querySelector('#inp').value;
//     res.send(result)
//   });

//   app.all('*', (req, res) => res.send('itmo182954'));
//   return app;
// }
export default function appSrc(express, bodyParser, createReadStream, crypto, http, mongo) {
const app = express();
const CORS = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE»',
'Content-Type': 'text/plain; charset=utf-8'
};
const login = "itmo182954";
app
.use(bodyParser.urlencoded({ extended: true }))
.all('/insert/', (req, res) => {
res.set(CORS);
if (!!req.body.URL && !!req.body.login && !!req.body.password) {
const {MongoClient} = mongo;
const client = new MongoClient(req.body.URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
try {
await client.connect();
const result = await client.db().collection('users').insertOne({
login: req.body.login.toString(),
password: req.body.password.toString()
})
await client.close();
res.send(result);
} catch (err) {
res.send(`Something went wrong: ${err}`);
} finally {
await client.close();
res.send();
}
}
run().catch();
} else {
res.send(login);
}
})
