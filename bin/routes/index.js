var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

const rho_deploy = require('../../lib/rho_deploy.js');
const setter = require("../../lib/setter.js");
const coder = require('../../lib/coder.js');

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

// console.log(parseInt("-50"));

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/main/', async function (req, res, next) {
    var temp = localStorage.getItem("money");
    var tem = JSON.parse(temp);
    var temp1 = localStorage.getItem("username");
    temp1 = temp1.substring(1, temp1.length - 1);


    // console.log("hi " + temp1 + " " + tem);


    res.render('main', 
      { 
      title: 'NodeJS Shopping Cart',
      products: products,
      username: temp1,
      money: tem,
      }
    );

});

router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/main/');
});

router.get('/newitem/:name/:price/:count', function(req, res, next) {

  var temp1 = localStorage.getItem("username");
  //temp1 = parseInt(temp1);
  temp1 = temp1.substring(1, temp1.length - 1);

  var a = {
    "id": req.params.name,
    "seller": temp1,
    "description": req.params.name + " are <span class=\"label label-info\">" + req.params.price + " each</span>",
    "price": req.params.price,
    "count": req.params.count,
    "title": req.params.name,
  }

  console.log('newitem: ' +  req.params.name + " " + req.params.price + " " + req.params.count);

  products.unshift(a);
  
  console.log(products);

});

router.get('/buy/:sellername/:itemid/:price/:itemcountbef', function(req, res, next) {
  var temp = localStorage.getItem("money");
  var money  = JSON.parse(temp);
  var a = JSON.parse(req.params.price);
  
  setter.getter(req.params.sellername).then(
    (ret) => {
      // console.log("getB" + ret);
      var s = parseInt(ret);
      var b = parseInt(ret) + a;
      setter.setter(req.params.sellername, b).then(
        (ret) => {
          // res.end("\"" + "set: " + req.params.id + " " + req.params.value + "\n" + "\"");
          console.log("set: " + req.params.sellername + " " + JSON.parse(s) + " + " + a + " " + b + "\n");
          var str = "" + a + "," + (req.params.itemcountbef - 1);

          setter.setter(req.params.itemid, str).then(
            (ret) => {
              // res.end("\"" + "set: " + req.params.id + " " + req.params.value + "\n" + "\"");
              console.log("set: " + req.params.itemid + " " + str + "\n");
              var c = money - a;

              var temp1 = localStorage.getItem("username");

              temp1 = temp1.substring(1, temp1.length - 1);

              setter.setter(temp1, c).then(
                (ret) => {
                  // res.end("\"" + "set: " + req.params.id + " " + req.params.value + "\n" + "\"");
                  console.log("set: " + temp1 + " " + money + "-" + a + " " + c + "\n");
                  money = money - a;
                  localStorage.setItem("money", JSON.stringify(money));
                  res.redirect('/main/');
                }
              );
            }
          );

        }
      );
    }
  );  
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

router.get('/get/:type/:id', (req, res, next) => {
  setter.getter(req.params.id).then(
    (ret) => {
      // res.end("\"" + "get: " + req.params.id + " " + ret + "\n" + "\"");
      console.log("get: " + req.params.id + " " + ret + "\n");
      
      if (req.params.type == 1) {
        localStorage.setItem("username", JSON.stringify(req.params.id));
        localStorage.setItem("money", JSON.stringify(ret));
  
      } else if (req.params.type == 2) {

      } else if (req.params.type == 3) {

      }
      
      
      return ret;
    }
  );
});

router.get('/set/:id/:value', (req, res, next) => {
  setter.setter(req.params.id, req.params.value).then(
    () => {
      // res.end("\"" + "set: " + req.params.id + " " + req.params.value + "\n" + "\"");
      console.log("set: " + req.params.id + " " + req.params.value + "\n");
    }
  );
});

router.get('/new/:id', (req, res, next) => {
  setter.new_deploy(req.params.id);
  console.log("new_deploy: " + req.params.id + "\n");
});

module.exports = router;
