define([],function(){
    var Light = Class.extend({
        init:function(x,y){
            this.x = x
            this.y = y
            this.bright = false
        },
        toggleBright(){
            this.bright = !this.bright
        },
        getPosition(){
            return {
                x:this.x,
                y:this.y
            }
        }
    })

    return Light
})