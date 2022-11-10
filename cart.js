$(document).ready(function(){
    $('.btn').click(function(){
        const imgs = $(this).closest('.product-image-wrapper').find('.productinfo img').attr("src");
        const prices = $(this).closest('.product-image-wrapper').find('.productinfo h2').text()
        const names = $(this).closest('.product-image-wrapper').find('.productinfo p').text();
        const ID = $(this).closest('.product-image-wrapper').find('.productinfo').attr("id");
        var listProducts = {};
        var productcon = {
            id : ID,
            img : imgs,
            price :prices,
            name : names,
            qty : 1
        };
        console.log(productcon)
        var yy=1
        var xx = localStorage.getItem("list-product")   
        if(xx) {
            listProducts= JSON.parse(xx)
            Object.keys(listProducts).map((key, value) =>{
                if(ID == key){
                    listProducts[key]['qty'] += 1
                    yy=2;
                }
            })
        }

       if(yy==1){
        listProducts[ID] = productcon;
       }
       localStorage.setItem("list-product", JSON.stringify(listProducts));
    // slsp
       var tongCart = 0 ;
        Object.keys(listProducts).map((key, value) =>{
            tongCart += listProducts[key]['qty']
            $('.clearfix').find('.cartItem a').text("cart: " + tongCart)             
            localStorage.setItem("slsp",tongCart);
            
       })


    });

    var tongCart =localStorage.getItem("slsp")
    if(tongCart >= 1){
        $('.clearfix').find('.cartItem a').text("cart: " + tongCart)
    }
});