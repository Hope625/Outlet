document.addEventListener('DOMContentLoaded',()=>{
    let status = [200,304];
    let myaccount = document.querySelector('.myaccount');
    let cart = document.querySelector('.cart');
    let xhr_myaccount = new XMLHttpRequest();
    let cart_t = document.querySelector('.cart_t');
    let cart_ul = document.querySelector('.cart_ul');
    let hotsearch = document.querySelector('.hotsearch');
    xhr_myaccount.onload = ()=>{
        if(status.indexOf(xhr_myaccount.status)>=0){
            let data = JSON.parse(xhr_myaccount.responseText);
            //循环生成My Account中的li
            for(let i=0;i<data[0].myaccount.length;i++){
                let myaccountli = document.createElement('li');
                myaccountli.innerHTML += `<a href="${data[0].myaccount[i].src}"><span>${data[0].myaccount[i].text}</span></a>`;
                myaccount.appendChild(myaccountli);
            }
            //循环生成购物车中的内容
            for(let i=0;i<data[0].cart.length;i++){
                let cart_li = document.createElement('li');
                cart_li.innerHTML = `<a><img src="${data[0].cart[i].imgurl}">${data[0].cart[i].text}</a><p><span class="cart_price">${data[0].cart[i].cart_price}</span>&times;<span class="cart_count">${data[0].cart[i].cart_count}</span></p>`;
                cart_ul.appendChild(cart_li);
            }
            //循环生成hotsearch中的内容
            for(let i=0;i<data[0].hotsearch.length;i++){
                hotsearch.innerHTML = data[0].hotsearch.mpa(function(items){
                    return `<a href="items.src">${items.text}</a>`
                }) .join('');
            }
        }
    }
    xhr_myaccount.open('get','../api/data/top.json',true);
    xhr_myaccount.send();
    

})