document.addEventListener('DOMContentLoaded',function(){
    let script_common = document.createElement('script');
    script_common.src = '../js/common.js';
    document.body.appendChild(script_common);
    let script_jscommon =document.createElement('script');
    script_jscommon.src = '../js/js_common.js';
    document.body.appendChild(script_jscommon);
    let Shipping = function(address,method){
        this.address = address;
        // this.method = method;
        
        this.init();
    }
    Shipping.prototype = {
        constructor: Shipping, 
        init(){

            let shipping = document.querySelector('.shipping');
            

            //创建标题h2
            let shippingh2 = document.createElement('h2');
            shippingh2.innerHTML = `<span>2</span>SHIPPING`;
            shipping.appendChild(shippingh2);

            //创建标题h4
            let address_h4 = document.createElement('h4');
            address_h4.innerHTML = `Shipping Address<button class="btn_viewAll">View all</button>`;
            shipping.appendChild(address_h4);

            //存放地址的盒子
            let box_address = document.createElement('ul');
            box_address.className = 'box_address clearfix';
            //获取指定用户的地址并渲染到页面
            let userid = 6;
            let status = [200,304];
            let xhr_address = new XMLHttpRequest();
            xhr_address.onload = ()=>{
                if(status.indexOf(xhr_address.status)>=0){
                    let data = JSON.parse(xhr_address.responseText);
                    //只显示前3个地址                
                    if(data.length>3){  
                        box_address.innerHTML = this.findAddress(3,data);
                    }
                    else{
                        box_address.innerHTML = this.findAddress(data.length,data);
                    }
                    //点击view all 按钮显示全部地址
                    let btn_viewAll = document.querySelector('.btn_viewAll');
                    btn_viewAll.onclick = ()=>{
                        box_address.innerHTML = this.findAddress(data.length,data);
                        this.selectAddress();
                    }
                    // 点击地址li框使其选中      
                    this.selectAddress();      
                }
            }
            xhr_address.open('get','../api/get_address.php?userid=6');
            xhr_address.send();
            shipping.appendChild(box_address);
            //创建新建地址按钮
            let btn_newAddress = document.createElement('p');
            btn_newAddress.innerText = 'New Address';
            shipping.appendChild(btn_newAddress);
            //点击新建地址按钮添加地址
            btn_newAddress.onclick = this.addAddress();
            //创建标题h4
            let method_h4 = document.createElement('h4');
            method_h4.innerHTML = `Shipping Method`;
            shipping.appendChild(method_h4);
            //创建存放运输方式的盒子
            let box_method = document.createElement('ul');
            box_method.className = 'box_method clearfix';

            //请求运输方式的数据
            let method_data = [];
            let xhr_method = new XMLHttpRequest();
            xhr_method.onload = ()=>{
                if(status.indexOf(xhr_method.status)>=0){
                    method_data = JSON.parse(xhr_method.responseText);
                    box_method.innerHTML = this.findMethod(method_data);         
                }
                
                shipping.appendChild(box_method);
                //EMS优惠信息
                let free_ems = document.createElement('div');
                free_ems.className = "free_ems";
                free_ems.innerHTML = `<span class="free_close">&times;</span><p>When your actual payment is more than <span>$ 100</span>, the EMS is <span class="free">FREE!</span></p><i></i>`;
                let ems = document.querySelector('.ems');
                ems.appendChild(free_ems);
                let free_close = document.querySelector('.free_close');
                free_close.onclick = function(){
                    free_ems.style.display = 'none';
                }

                let box_insurance = document.createElement('div');
                box_insurance.className = "box_insurance";
                this.selectMethod();

                for(let i=0;i<method_data.length;i++){       
                    let method_lis = box_method.children;
                    let currentMethod = 0;
                    if(method_lis[i].children[0].children[0].checked){
                        currentMethod = i;
                        box_insurance.innerHTML = this.findInsurance(currentMethod,method_data); 
                    }

                }
                shipping.appendChild(box_insurance);
                let box_contact = document.createElement('div');
                box_contact.className = "box_contact";
                box_contact.innerHTML = `<p>Need help? Contact us at<a href="#" class="livechat">Live Chat</a>or<a href="#" class="email">members@tidemalls.com</a></p>`;
                shipping.appendChild(box_contact);
              
            }
            xhr_method.open('get','../api/get_method.php');
            xhr_method.send();

            //payment部分
            let payment = document.querySelector('.payment');
            let paymenth2 = document.createElement('h2');
            paymenth2.innerHTML = `<span>3</span>PAYMENT`;
            payment.appendChild(paymenth2);

            //创建存放折扣码的盒子box_code
            let box_code = document.createElement('div');
            box_code.className = "box_code";
            box_code.innerHTML = `<div class="code_l fl"><label for="code" />Enter Coupon Code<span>:</span><input type="text" id="code" /></label><div class="btn_apply">Apply</div></div><div class="code_r fr"><input type="checkbox">Choose From My Coupons</div>`;

            payment.appendChild(box_code);
            //apply小框
            let btn_apply = document.querySelector('.btn_apply');
            let apply = document.createElement('div');
            apply.className = "apply";
            apply.innerHTML = `<p><span class="apply_close">&times;</span>Click "Apply" to see the top-right savings:<i></i></p>`;
            btn_apply.appendChild(apply);
            let apply_close = document.querySelector('.apply_close');
            apply_close.onclick = function(){
                apply.style.display = 'none';
            }
            let pay_method = document.createElement('div');
            pay_method.className = 'pay_method';
            let pay_methodh4 = document.createElement('h4');
            pay_methodh4.innerText = `Choose Your Prefer Payment Method`;
            pay_method.appendChild(pay_methodh4);
            payment.appendChild(pay_method);
            let pay_methodul = document.createElement('ul');
            
            let xhr_paymethod = new XMLHttpRequest();
            xhr_paymethod.onload = ()=>{
                if(status.indexOf(xhr_paymethod.status)>=0){
                    let data = JSON.parse(xhr_paymethod.responseText);
                    pay_methodul.innerHTML = this.findPayMethod(data);
                    pay_method.appendChild(pay_methodul);
                    this.selectPayMethod();
                    let btn_checkout = document.createElement('p');
                    btn_checkout.className = "checkout";
                    btn_checkout.innerText = "Continue checkout"
                    pay_method.appendChild(btn_checkout);
                }

            }
            xhr_paymethod.open('get','../api/get_paymethod.php');
            xhr_paymethod.send();

            
            
            

        },
        //查找所有地址
        findAddress(len,data){
            let content = '';
            for(let i=0;i<len;i++){
                content +=  `<li class="clearfix">
                <div class="addr_l fl">
                <input type="radio" name="address"></div>
                <div class="addr_r fl">
                <h4>test${i+1}</h4>
                <p>                       
                ${data[i].address}
                <span class="postcode">${data[i].postcode}</span><br />
                <span class="phone">${data[i].phone}</span>
                </p></div>
                </li>`;
            };
            return content;
        },
        //选择地址
        selectAddress(){
            let addr_lis = document.querySelectorAll('.box_address li'); 
            let radios = document.querySelectorAll('.addr_l input');
            for(let i=0;i<addr_lis.length;i++){
                addr_lis[i].onclick = function(){
                    this.children[0].children[0].checked = true;
                }
            }                 
        },
        addAddress(){
            //添加地址功能,由于没有具体效果，暂未实现
        },
        //找到所有的运输方式
        findMethod(data){
            let content = '';
            for(let i=0;i<data.length;i++){        
                content +=  `<li class="${data[i].shiptype==="EMS" ? "ems clearfix":"clearfix"}">
                <div class="method_l fl">
                <input type="radio" name="method" ></div>
                <div class="method_r fl">
                <p>                       
                ${data[i].shiptype}<br />
                <span class="price">${data[i].price == 0.00 ? 'FREE':' $ '+data[i].price}(${data[i].shiptime})</span>
                </p></div>  
                </li>`;
            };
            return content;
        },
        //选择运输方式
        selectMethod(){
            let method_lis = document.querySelectorAll('.box_method li'); 
            let radios = document.querySelectorAll('.method_l input');
            for(let i=0;i<method_lis.length;i++){
                radios[0].checked = true;
                method_lis[i].children[0].children[0].checked= false;

                method_lis[i].onclick = function(){
                    this.children[0].children[0].checked = true;
                }
            } 
        },
        findInsurance(method,data){
            return `<div><input type="checkbox">Add Shipping Insurance to you order($${data[method].freight_price})<a href="#">${data[method].length}</a></div>`;
        },
        //获取所有的支付方式
        findPayMethod(data){
            let content= '';
            for(let i=0;i<data.length;i++){
                content += `<li><input type="radio" name="paymethod">
                ${data[i].pay_imgurl ? "<img src=\""+data[i].pay_imgurl+"\">" : ""}
                ${data[i].pay_method ? data[i].pay_method : ""}
                ${data[i].pay_method==="Pay By My Wallet" ? "<p class=\"balance\">Balance:<span>USD 326</span><a>Recharge \>\></a></p>" : ""}
                ${data[i].pay_description ? "<p>"+data[i].pay_description+"</p>" : ""}
                </li>`;
            }
            return content;
        },
        //选择支付方式
        selectPayMethod(){
            let paymethod_lis = document.querySelectorAll('.pay_method li'); 
            let radios = document.querySelectorAll('.pay_method ul input');
            for(let i=0;i<paymethod_lis.length;i++){
                radios[0].checked = true;
                paymethod_lis[i].children[0].checked= false;
                paymethod_lis[i].onclick = function(){
                    this.children[0].checked = true;
                }
            } 
        },
        updateOrder(address,method){

        }
    };
    
    new Shipping();
})