var mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
    name: String,
    embedSecret: String,
    orgId: Number,
    dashId: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Org", orgSchema);
