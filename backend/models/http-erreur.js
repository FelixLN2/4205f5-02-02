class HttpErreur extends Error {
    constructor(message, codeErreur){
        super(message);
        this.code = codeErreur;

    }
}

module.exports = HttpErreur;