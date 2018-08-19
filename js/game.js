var Game = function() { 
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.index = function(x,y) {
            return x + (y * 10);
        }
        
        var self = this;
        
        this.showFurry = function(){
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry')
        }   
        
        this.hideVisibleFurry = function(){
            this.board[this.index(this.furry.x, this.furry.y)].classList.remove('furry')   
        }

        this.showCoin = function(){
            this.board[this.index(this.coin.x, this.coin.y) ].classList.add('coin'); 
        }

        this.moveFurry= function(){
            this.hideVisibleFurry();
            if(this.furry.direction === 'right'){
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === 'left'){
                this.furry.x = this.furry.x - 1;           
            } else if (this.furry.direction === 'up'){
                this.furry.y = this.furry.y + 1;           
            } else if (this.furry.direction === 'down'){
                this.furry.y = this.furry.y - 1;           
            };

            this.checkCoinCollision();
            let over = this.gameOver();
            if(over != 'X'){
                this.showFurry();
            }
        }
            
        this.turnFurry = function(event){
            switch (event.which) {
                case 37: self.furry.direction = 'left'; //czy this?
                    break;
                case 38: self.furry.direction = 'down';//'right';
                    break;
                case 39: self.furry.direction = 'right'; //'up';
                    break;
                case 40: self.furry.direction = 'up';//'down';
                    break;
            }
        }

        this.checkCoinCollision = function(){
            if(this.coin.x === this.furry.x && this.coin.y === this.furry.y){
                 document.querySelector('div.coin').classList.remove('coin');
                this.score++;
                document.querySelector('#score strong').innerText = this.score;
                this.coin = new Coin();
                this.showCoin();
            }
        }
        
        this.gameOver = function(){
            if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
               clearInterval(this.idSetInterval);
               //this.hideVisibleFurry();
                alert('Game over! Your score: ' + this.score);
                return 'X';
               }
        }
    
        this.startGame = function(){
            var self = this;
            this.idSetInterval = setInterval(function(){
            self.moveFurry();
            }, 250)
        }
}


var Coin = require("./coin.js");
var Furry = require("./furry.js");

module.exports = Game;