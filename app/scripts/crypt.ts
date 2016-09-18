/// <reference path="../../bower_components/DefinitelyTyped/cryptojs/cryptojs.d.ts" />

class Crypt{
  password: string;

  constructor(password?: string) {
    if(password){
      this.password = password;
    }
    else {
      var salt = CryptoJS.lib.WordArray.random(128/8);
      var key = CryptoJS.PBKDF2("SXfeMAPHC1FeIhUtrUak", salt, { keySize: 128/32, iterations: 100 });
      this.password = key.toString();
    }
  }

  encrypt(plainText: string):string{
    var encryptedMessage = CryptoJS.AES.encrypt(plainText, this.password);
    return encryptedMessage.toString();
  }

  decrypt(encryptedText: string):string{
    var decryptedMessage = CryptoJS.AES.decrypt(encryptedText, this.password);
    return decryptedMessage.toString(CryptoJS.enc.Utf8);
  }
}
