var crawl = require("./WebCrawler")

// create a regular expression which matches a list of symbols
function createRegex(symbols){
    // the symbols that deliminate symbols from on another
    // Ex. "html." matches the symbol "html" but "xhtml" doesn't
    p = "\\W"
    exp = "("+p + symbols[0] + p
    for(var i=1; i<symbols.length; i++){
        exp += "|" + p + symbols[i] + p
    }
    exp += ")"
    console.log(exp, new RegExp(exp, ["g"]))
    return new RegExp(exp, ["g"])
}

crawl.parseUrl("http://jade-lang.com/reference/"
    , createRegex(['class','id', 'html'])
    , function(bag){
        console.log('finished')
        console.log(bag, bag.get('class'))
    })
