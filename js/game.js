define(['light'],function(Light){
    var Game = Class.extend({
        init:function(){
            this.light_list = []
            this.row = 3
            this.col = 3
        },
        getGrid:function(){
            return {
                row:this.row,
                col:this.col
            }
        },
        bright:function(light){
            light.toggleBright()
            let sibling = this.getSibling(light)
            for (let index = 0; index < sibling.length; index++) {
                let s = sibling[index];
                s.toggleBright()
            }

            if(this.on_init){
                this.on_init(this.light_list)
            }
        },
        getSibling(light){
            let sibling = []
            let x = 0,y = 0,pos = light.getPosition()
            //up
            x = pos.x -1
            y = pos.y
            if(!this._overstep(x,y)) 
                sibling.push(this.getLight(x,y))
            //down
            x = pos.x + 1
            y = pos.y
            if(!this._overstep(x,y))
                sibling.push(this.getLight(x,y))

            //left
            x = pos.x
            y = pos.y - 1
            if(!this._overstep(x,y))
                sibling.push(this.getLight(x,y))
            //right
            x = pos.x
            y = pos.y + 1
            if(!this._overstep(x,y))
                sibling.push(this.getLight(x,y))

            return sibling
        },
        _overstep(x,y){
            if (x >= this.row || x < 0) {
                return true
            }

            if (y >= this.col || y < 0) {
                return true
            }

            return false
        },
        start:function(){
            this._init()
        },
        getLight:function(x,y){
            for (let index = 0; index < this.light_list.length; index++) {
                let light = this.light_list[index];
                let pos = light.getPosition()
                if(pos.x === x && pos.y === y){
                    return light
                }
            }
        },
        _init:function(){
            for (let i = 0; i < this.row; i++) {
                for(let j = 0;j<this.col;j++){
                    let x = i,y=j
                    let light = new Light(x,y)
                    this.light_list.push(light)
                }
            }

            if(this.on_init){
                this.on_init(this.light_list)
            }
        },
        onInit(callback){
            this.on_init = callback
        },
        reset:function(){
            for (let index = 0; index < this.light_list.length; index++) {
                let light = this.light_list[index];
                light.bright = false
            }

            if(this.on_init) this.on_init()
        }
    })

    return Game
})