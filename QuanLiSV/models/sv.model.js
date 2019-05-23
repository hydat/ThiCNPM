const mongoose = require('mongoose');

var svSchema = new mongoose.Schema({
    tensv: {
        type: String       
    },
    masv: {
        type: String
    },
    lop: {
        type: String
    }
});

mongoose.model('SV', svSchema);