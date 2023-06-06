const express = require('express')
const app = express()
const port = 3000
const algorithm = 'aes-256-cbc';
const crypto = require("crypto")
const ADMIN_SECRET = "H@rkirat";
const cors = require("cors");
app.use(cors())
const  secret = Buffer.from("SECRET");
let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Output iv and encrypted data, both in hex
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text) {
  const [iv, encryptedText] = text.split(':');

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  
  let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

app.get('/secret', (req, res) => {
	const email = req.query.email;
	const encryptedEmail = encrypt(email);
	res.json({message: "@check " + encryptedEmail});
})

app.get("/decode", (req, res) => {
	if (ADMIN_SECRET !== req.query.secret) {
            return res.status(403).json({});
	}
	const encryptedEmail = req.query.email;
	const decryptedEmail = decrypt(encryptedEmail);
	res.json({email: decryptedEmail});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


