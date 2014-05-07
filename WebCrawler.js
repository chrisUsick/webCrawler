var jsdom = require("jsdom")
var request = require("request")
var fs = require("fs")

// a Bag data structure
function Bag(){
    this.bag = {}
    // check if item exists in the bag, if it does, increment it
    // else, create it with count = 1
    this.add = function(itemUntrimmed){
        // trimming `itemUntrimmed` prevents dupicates of an item being added
        // Ex. ' class', ' class ' and ' class.' are all recognized as different symbols
        // but should just increment the item 'class'
        item = itemUntrimmed.replace(/\W/g, '')
        if (this.bag[item]) {
            this.bag[item] += 1
        } else {
            this.bag[item] = 1
        }
    }
    this.get = function(item) {
        if (this.bag[item]) {
            return this.bag[item]
        } else {
            return 0
        }
    }
}
exports.Bag = Bag

// parse a url with a given regular expression, incrementing the  count
// of each match in a bag
// returns the bag.
function parseUrl (url, regex, cb) {
    console.log('downloading website... ')
    request(url, function(reqErr, res, body){
        if (reqErr) console.log(reqErr)
        jsdom.env(body, ['./jquery.js'], function (jsdomErr, window) {

            var $ = window['jQuery'];
            bag = new Bag()
            $("body :not(script)").each(function(index, e) {
                //only checks the text of each html element
                //could easily crawl the meta tags in the head tag
                var text = $(e).text()
                console.log(text, text.match(regex))
                matched = text.match(regex)
                if (matched){
                    for(var i = 0; i<matched.length; i++){
                        bag.add(matched[i])
                    }
                } else {
                    // do nothing
                }

                
            })
            cb(bag)
        })
    })
}

exports.parseUrl = parseUrl
