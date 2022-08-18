const User = require('../models/users');

User.find({},function (e,response) {
    /*for (let res of response) {
        if (res.name === "user1" && res.password === "user1user1") {
            console.log(res);
            break;
        }
    }*/
    return response;
});
