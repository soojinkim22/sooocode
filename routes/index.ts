/// <reference path="../typings/main.d.ts" />

/*
    use asm
    function hoge(fuga) {
        // 1)パラメータの型指定
        // 2)変数の初期化
        // 3)処理
        // 4)return句
    }
*/
"use strict";

declare function require(x:string):any;

var express:any     = require("express");
var cryptico:any    = require("cryptico");
var _:any           = require("lodash");
var router:any      = express.Router();

var PassPhrase:string           = "The Moon is a Harsh Mistress.";              // The passphrase used to repeatably generate this RSA key.
var MattsRSAkey:any             = cryptico.generateRSAKey(PassPhrase, 1024);    // The length of the RSA key, in bits.
var MattsPublicKeyString:string = cryptico.publicKeyString(MattsRSAkey);


//
var PlainText:string        = "Sooo Code";
var EncryptionResult:any    = cryptico.encrypt(PlainText, MattsPublicKeyString);
var Crypted:string          = EncryptionResult.cipher;

//
var DecryptionResult:any    = cryptico.decrypt(Crypted, MattsRSAkey);
var Decryption:string       = DecryptionResult.plaintext;

router.get("/", (request:any, response:any, next:any) => {
    response.render("index", { title: Decryption, age: add1(22), asmtest: calc_tax_included_price(100, 1.08)});
});





module.exports = router;




function add1(x) {
    "use asm";
    x = x | 0; // x : int
    return (x + 1) | 0;
}
console.log(add1(22));

function add2(x:Uint8Array) {
    "use asm";
    x[0] = x[0] | 0; // x : int
    return (x[0] + 1) | 0;
}

var buffer = new ArrayBuffer(1024 * 8);
var arrays = new Uint8Array(buffer);
arrays[0] = 10;
console.log(add2(arrays));

function calc_tax_included_price(price, tax_rate) {
    "use asm";
    price = price | 0;      // priceはint
    tax_rate = +tax_rate; // tax_rateはdouble

    return +(price * tax_rate); // 略
}

console.log(calc_tax_included_price(100, 1.08));



