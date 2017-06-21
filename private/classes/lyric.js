/**
 * Created by jesus on 21/06/17.
 */

var request = require("request")
var cheerio = require("cheerio")

function Lyric(artista,cancion){
    this.artista = artista.replace(/ /g,"-")
    this.cancion = cancion.replace(/ /g,"-")
    this.url = "https://www.musixmatch.com/es/letras/"+this.artista+"/"+this.cancion
    console.log("url", this.url)
}

/**
 * Obtener el DOM de la URL
 */

Lyric.prototype.getBody = function(cb){
    request(this.url, function (error, response, body) {
        if(error) return cb(error, null)

        cb(null,Lyric.prototype.getLyric(body))
    });
}

/**
 * Obtener la letra a partir del DOM
 * @param body
 */
Lyric.prototype.getLyric = function(body){
    var $ = cheerio.load(body)
    var letra = $(".mxm-lyrics__content").text()
    return letra
}

module.exports = Lyric