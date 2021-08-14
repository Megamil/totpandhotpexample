# Exemplo de TOTP e HOTP com Node JS

Link para o [artigo completo](https://megamil.com.br/?p=93)

## Instalação

```bash
npm install
npm update
```

## Usando
```bash
node app.js
```

```javascript
//Como chamar no postman.

//Gerar Secret
[GET] localhost:3000/otp-secret

//Gerar código de 6 dígitos (Para testes somente, faça no seu front)
[POST] localhost:3000/totp-code
Body: {"secret" : "..."}

//Validar código gerado
[POST] localhost:3000/totp-validate
Body: {"secret" : "...","token": "..."}

//HOTP
//Gerar código de 6 dígitos (Para testes somente, faça no seu front)
[POST] localhost:3000/hotp-code
Body: {"secret" : "...", "counter" : X}

//Validar código gerado
[POST] localhost:3000/hotp-validate
Body: {"secret" : "...","token": "...", "counter" : X}
```

## Fontes
* [Tutorial em vídeo](https://www.youtube.com/watch?v=Yv5tZu5wAU0)
* [Lib Speakeasy](https://www.npmjs.com/package/speakeasy)