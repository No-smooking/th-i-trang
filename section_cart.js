$(document).ready(function(){
    var listProducts = JSON.parse(localStorage.getItem("list-product"));
    var html = '';
    var tongCart = JSON.parse(localStorage.getItem("slsp"))
    if(tongCart >= 1){
        $('.clearfix').find('.cartItem a').text("cart: " + tongCart)
    }
    var tong = 0;
    console.log(listProducts)
    Object.keys(listProducts).map((key, value) => {
        
        var p = listProducts[key]['price'].replace('$','');
        var total = p *  listProducts[key]['qty'];
        tong += total;
        html += "<tr class='cart_section-product' id='"+ key +"'>" + 
                    "<td class='cart_product'>" + 
                         "<a href=''>"+"<img src= '" + listProducts[key]['img'] +"' alt=''>" + "</a>" +
                    "</td>" +
                    "<td class='cart_description'>" + 
                        "<h4>" + "<a href=''>" + listProducts[key]['name'] + "</a>" + "</h4>" +
                        "<p>"+"Web ID:" + listProducts[key]['id'] +"</p>" + 
                    "</td>" +
                    "<td class='cart_price'>" + listProducts[key]['price'] + "</td>" +
                    "<td class='cart_quantity'>" + 
                        "<div class='cart_quantity_button'>" + 
                            "<a class='cart_quantity_up'  >" + "+" + "</a>" + 
                            "<input class='cart_quantity_input' type='text' name='quantity' value ='"+ listProducts[key]['qty'] +"' autocomplete='off' size='2'>" + 
                            "<a class='cart_quantity_down'>"+ "-" + "</a>" +
                        "</div>" +
                    "</td>" +
                    "<td class='cart_total'>"+"<p class='cart_total_price'>"+ "$" + total +"</p>"+"</td>" +
                    "<td>"+ "<button class='cart-delete'>"+"xóa"+"</button>" +"</td>" +
                    "</tr>"; 
        })
        $("table tbody").append(html);
            
     
        $('#do_action').find('.totals span').text("$"+ tong);

            $('.cart_quantity_up').click(function(){
                    var qty = $(this).closest('.cart_quantity_button').find('input').val();
                    qty = JSON.parse(qty) + 1;
                    $(this).closest('.cart_quantity_button').find('input').val(qty);
                    var x = $(this).closest('.cart_section-product').find('.cart_price').text().replace('$','')
                    var total = qty * x ;
                    tong += JSON.parse(x);
                    // console.log(tong)
                    $(this).closest('.cart_section-product').find('.cart_total .cart_total_price').text('$'+total);
                    $('#do_action').find('.totals span').text("$"+ tong);
                    var trID = $(this).closest('.cart_section-product').attr('id');
                    Object.keys(listProducts).map((key , value) =>{
                        if(trID == key){
                            listProducts[key]['qty'] += 1
                            localStorage.setItem("list-product",JSON.stringify(listProducts))

                        }
                    })

                    // tongCart 
                    tongCart += 1
                    $('.clearfix').find('.cartItem a').text("cart: " + tongCart)
                    localStorage.setItem("slsp", tongCart)
            });

            $('.cart_quantity_down').click(function(){
                var qty = $(this).closest('.cart_quantity_button').find('input').val();
                var x = $(this).closest('.cart_section-product').find('.cart_price').text().replace('$','')
                tong -= JSON.parse(x);
                // slsp
                tongCart -= 1;
                $('.clearfix').find('.cartItem a').text("cart: " + tongCart)
                localStorage.setItem("slsp", tongCart)
                $('#do_action').find('.totals span').text("$"+ tong);
                if(qty > 1){
                    var qty = JSON.parse(qty) - 1;
                    $(this).closest('.cart_quantity_button').find('input').val(qty);
                    var total = qty * x;
                    $(this).closest('.cart_section-product').find('.cart_total .cart_total_price').text("$"+total);
                    var trID = $(this).closest('.cart_section-product').attr('id');
                    Object.keys(listProducts).map((key , value) =>{
                        if(trID == key){
                            listProducts[key]['qty'] -= 1
                            localStorage.setItem("list-product",JSON.stringify(listProducts))
                        }
                    })
                }else{
                    var tr = $(this).closest('tr')
                    tr.remove();
                    var trID = $(this).closest('.cart_section-product').attr('id');
                    Object.keys(listProducts).map((key , value) =>{
                        if(trID == key){
                            delete listProducts[key]
                            localStorage.setItem("list-product",JSON.stringify(listProducts))
                        }
                    })
                }
            })  
            
            $('.cart-delete').click(function(){
                // slsp
                var slQty = $(this).closest('.cart_section-product').find('.cart_quantity_input').val()
                tongCart -= slQty;
                $('.clearfix').find('.cartItem a').text("cart: " + tongCart)
                localStorage.setItem("slsp", tongCart)
                
                var cartTotal = $(this).closest('tr').find('p.cart_total_price').text().replace('$','')
                tong -= cartTotal;
                $('#do_action').find('.totals span').text("$"+ tong);
                var trs = $(this).closest('tr')
                    trs.remove();
                var trID = $(this).closest('.cart_section-product').attr('id');
                Object.keys(listProducts).map((key , value) =>{
                    if(trID == key){
                        delete listProducts[key]
                        localStorage.setItem("list-product",JSON.stringify(listProducts))
                    }
                })
            });

});