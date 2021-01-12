const fs = require('fs');
var list = []

fs.readdirSync('icons').forEach(file => {
    list.push("files/icons/" + file)
});

console.log(list)