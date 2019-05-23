const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SV = mongoose.model('SV');

router.get('/', (req, res) => {
    res.render("sv/addOrEdit", {
        viewTitle: "Thêm SV"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var sv = new SV();
    sv.masv = req.body.masv;
    sv.tensv = req.body.tensv;
    sv.lop = req.body.lop;
    sv.save((err, doc) => {
        if (!err){
            res.redirect('sv/list');
        }       
        else {
            console.log('Error: ' + err);
        }
    });
}


function updateRecord(req, res) {
    SV.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('sv/list'); }
        else {
            console.log('Error: ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    SV.find((err, docs) => {
        if (!err) {
            res.render("sv/list", {
                list: docs
            });
        }
        else {
            console.log('Error: ' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    SV.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("sv/addOrEdit", {
                viewTitle: "Cập nhật SV",
                sv: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    SV.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/sv/list');
        }
        else { console.log('Error: ' + err); }
    });
});

module.exports = router;