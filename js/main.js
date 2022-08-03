define(['jquery','game','svg'],function($,Game,svg){
    log.info('app started.')

    let game = new Game()
    let grid = game.getGrid()
    $(function(){
        game.onInit(createMap)
        game.start()

        $('#btnReset').click(function(){
            game.reset()
        })
    })

    function lightClicked(e){
        let $el = $(e.currentTarget),
            x = $el.data('row'),y = $el.data('col')

        let light = game.getLight(x,y)
        game.bright(light)
    }

    function createMap() {
        let itemWidthHeight = 500 / grid.row
        let $el = $('#app')
        $el.html('')

        for (let row = 0; row < grid.row; row++) {
            for(let col = 0;col < grid.col;col++){
                let light = game.getLight(row,col)
                // log.info(`current light:x:${row},y:${col}`)
                // log.info(light)
                // log.info(light.bright)

                let $item = $('<div>')
                .addClass('item')
                .click(lightClicked)
                .text(`${row},${col}`)
                .data('row',row)
                .data('col',col)
                .width(itemWidthHeight)
                .height(itemWidthHeight)

                if(light.bright){
                    $item.html(svg.bright)
                }else{
                    $item.html(svg.notBright)
                }

                $el.append($item)
            }
        }
    }
})