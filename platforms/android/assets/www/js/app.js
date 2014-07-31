(function() {
    var app = angular.module('convertNumber', ['pascalprecht.translate','ionic']).config(function($translateProvider) {
        $translateProvider.translations('en', {
            LANGUAGE: "Language",
            TITLE: "Roman numbers converter",
            DEVELOPED :"Developed by ",
            ROMAN_NUMBER: "Roman number : ",
            ARABIC_NUMBER: "Arabic number : "
        }).translations('it', {
            LANGUAGE: "Lingua",
            TITLE: "Convertitore Numeri Romani",
            DEVELOPED :"App sviluppata da ",
            ROMAN_NUMBER: "Numero romano : ",
            ARABIC_NUMBER: "Numero arabo : "
        });
        ;
        $translateProvider.preferredLanguage('en');
        //$translateProvider.determinePreferredLanguage();

    })
    app.controller('TranslateController', function($translate, $scope) {

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    });

    app.controller("ContentController",  function ContentController($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    });


    app.controller("convertController",function(){
        this.roman_number;
        this.arabic_number;
        this.convertRoman = function(){
            if (!isNaN(this.roman_number)){
                alert("Insert a valid number");
            }
            else{
                this.arabic_number = deromanize(this.roman_number);
            }


        };
        this.convertArabic = function(arabic){
            if (isNaN(this.arabic_number)){
                alert("Insert a valid number");
            }
            else {
                this.roman_number = romanize(this.arabic_number);
            }
        };
        this.reset = function (){
            this.roman_number = "";
            this.arabic_number = "";
        };

    });

    function romanize (num) {
        if (!+num)
            return false;
        var	digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    function deromanize (str) {
        var	str = str.toUpperCase(),
            validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
            token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
            key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
            num = 0, m;
        if (!(str && validator.test(str)))
            return false;
        while (m = token.exec(str))
            num += key[m[0]];
        return num;
    }

})();
