let fileInput = document.getElementById('fileInput');
    let downloadEncrypted = document.getElementById('downloadEncrypted');
    let downloadDecrypted = document.getElementById('downloadDecrypted');

    function uploadFile() {
      let file = fileInput.files[0];
      let reader = new FileReader();
      reader.onload = function() {
        let plaintext = reader.result;
        encrypt(plaintext);
      }
      reader.readAsText(file);
    }

    function encrypt(plaintext) {
      let key = 5; // number of positions to shift
      let ciphertext = '';
      for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext.charAt(i);
        if (/[a-zA-Z]/.test(char)) {
          let code = plaintext.charCodeAt(i);
          if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + key) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + key) % 26) + 97);
          }
        }
        ciphertext += char;
      }
      downloadEncrypted.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ciphertext));
    }

    function decrypt() {
      let key = 5; // number of positions to shift
      let ciphertext = '';
      let file = fileInput.files[0];
      let reader = new FileReader();
      reader.onload = function() {
        ciphertext = reader.result;
        let plaintext = '';
        for (let i = 0; i < ciphertext.length; i++) {
          let char = ciphertext.charAt(i);
          if (/[a-zA-Z]/.test(char)) {
            let code = ciphertext.charCodeAt(i);
            if (code >= 65 && code <= 90) {
              char = String.fromCharCode(((code - 65 - key + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
              char = String.fromCharCode(((code - 97 - key + 26) % 26) + 97);
            }
          }
          plaintext += char;
        }
        downloadDecrypted.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(plaintext));
      }
      reader.readAsText(file);
    }