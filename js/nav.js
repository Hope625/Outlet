document.addEventListener('DOMContentLoaded',()=>{
    let status = [200,304];
    //获取二级导航的ul元素
    let categories = document.querySelector('.categories');
    let top = document.querySelector('#top');
    let header = document.querySelector('#header');
    let nav_l = document.querySelector('.nav_l');
    let nav = document.querySelector('#nav');
    let nav_container = document.querySelector('#nav .container');
    //吸顶菜单
    window.onscroll = function(){
        // 获取滚动条滚动过的距离
        let scrollY = window.scrollY;
        let target = top.offsetHeight + header.offsetHeight + nav.offsetHeight;
        console.log(target);
        if(scrollY>=target){
            nav_l.style.position = 'fixed';
            nav_l.style.left = nav_container.offsetLeft;
            nav_l.style.top = 0;
        }else{
            nav_l.style.position = 'relative';
        }
    }
    //创建请求，数据为nav.json文件
    let xhr_categories = new XMLHttpRequest();
    xhr_categories.onload = ()=>{
        if(status.indexOf(xhr_categories.status)>=0)
        {
            //获取数据
            let data = JSON.parse(xhr_categories.responseText);
            console.log(data);
            for(let i=0;i<data.length;i++){

                //创建最外层的li，Bags,Jerseys...Accessories所包含部分
                let categories_li = document.createElement('li');

                //奇偶项的categories_li的背景颜色不同，给予对应的className
                if(i%2===0){
                    categories_li.className = "bigli";
                }
                else{
                    categories_li.className = "nav_even bigli";
                }
                //创建每个li中a标签
                let nav_link = document.createElement('a');
                nav_link.href = data[i].src;
                nav_link.className = "nav_link";

                //data[i].titlt为Bags,Jersey...
                nav_link.innerHTML = `<span class="nav_title">${data[i].title}</span>`;
                categories_li.appendChild(nav_link);
                let nav_content = document.createElement('div');
                nav_content.className = "nav_content clearfix";

                //循环创建Bagsd等里面的Luggage
                for(let j=0;j<data[i].content.length;j++){   
                    let nav_contentp = document.createElement('p');
                    nav_contentp.innerHTML = `<a href="${data[i].content[j].src}"><span>${data[i].content[j].title}</span></a>`;
                    nav_content.appendChild(nav_contentp);
                }
                categories_li.appendChild(nav_content);

                //三级导航
                let nav_items = document.createElement('div');
                nav_items.className = "nav_items clearfix";

                //三级导航的左边
                let nav_litems = document.createElement('div');
                nav_litems.className = "nav_litems fl";
                
                //三级导航的右边
                let nav_ritems = document.createElement('div');
                
                nav_ritems.className = "nav_ritems fr";
                
                //循环生成三级导航的右边部分
                for(let k=0;k<data[i].three.length;k++){

                    //包含输入框的盒子
                    let search = document.createElement('div');
                    search.className = "search";
                    search.innerHTML = `<input type="text" value="New Arrivals" />`;
                    nav_ritems.appendChild(search);

                    let nav_ritemsp = document.createElement('p');
                    nav_ritemsp.className = "finalsale";
                    nav_ritemsp.innerHTML = `<a href="${data[i].three[0].right[0].src}">${data[i].three[0].right[0].title}</a>`;
                    nav_ritems.appendChild(nav_ritemsp);
                    let nav_ritemsbrand = document.createElement('div');

                    //循环生成三级导航右边的热搜项Louis Vuitton等
                    for(let n=0;n<data[i].three[0].right[0].content.length;n++){
                        let nav_brandp = document.createElement('p');
                        nav_brandp.className = "brand";
                        let nav_branda = document.createElement('a');
                        nav_branda.href = data[i].three[0].right[0].content[n].src;
                        nav_branda.innerHTML = data[i].three[0].right[0].content[n].title;
                        nav_brandp.appendChild(nav_branda);
                        nav_ritemsbrand.appendChild(nav_brandp);

                        
                    }
                    nav_ritems.appendChild(nav_ritemsbrand);
                    
                }

                //循环生成三级导航的左边部分
                for(let k=0;k<data[i].three[0].left.length;k++){

                    //左边部分的标题NFL等
                    console.log(data[i].three[0].left[k].title);
                    if(data[i].three[0].left[k].title!=undefined){
                        let nav_litemsh4 = document.createElement('h4');
                        nav_litemsh4.innerText = data[i].three[0].left[k].title;
                        nav_litems.appendChild(nav_litemsh4);
                    }
        
                    let nav_smallest = document.createElement('ul');
                    nav_smallest.className ="nav_smallest clearfix";
                    
                    //循环生成左边部分中的各个小项
                    nav_smallest.innerHTML = data[i].three[0].left[k].content.map(item=>{
                        return `<li><a href="${item.src}">${item.title}</a></li>`
                    }).join('');
                    
                    nav_litems.appendChild(nav_smallest);
                    }
                nav_items.appendChild(nav_litems);
                nav_items.appendChild(nav_ritems);
                categories_li.appendChild(nav_items);
                categories.appendChild(categories_li);
                

            }
                
        }
        let bigli = document.getElementsByClassName('bigli');
        let nav_items = document.getElementsByClassName('nav_items');
        let search = document.querySelectorAll('.search');
        // let nav_ritems = document.querySelector('.nav_items.clearfix');
        //点击输入框时清空输入框中的默认内容，失去焦点时恢复
        for(let i=0;i<search.length;i++){         
            search[i].children[0].onclick = ()=>{ 
                if(search[i].children[0].value==='New Arrivals'){
                    search[i].children[0].value = '';
                }
            }
            
            search[i].children[0].onblur = ()=>{
                search[i].children[0].value = 'New Arrivals';
            }
        }
        //三级导航的动画效果
        for(let i=0;i<bigli.length;i++){
            bigli[i].onmouseover = function(){

                let target = -i * this.offsetHeight;

                // console.log(bigli.offsetHeight);
                
                // console.log();
                nav_items[i].style.height = nav_items[i].offsetHeight + 'px';
                // console.log(nav_items[i].offsetHeight);
                let items_pos = Math.abs(target)+this.offsetHeight/2;
                if(items_pos>nav_items[i].offsetHeight){
                    animate(nav_items[i],{top:-(nav_items[i].offsetHeight-this.offsetHeight)/2});
                }else{
                    animate(nav_items[i],{top:target});
                }
            }
            bigli[i].onmouseout = function(){
                animate(nav_items[i],{top:0});
            }
        }
        //默认一级导航home高亮
        let home = document.querySelector('.home');
        home.classList.add('active');
        let nav_c = document.querySelector('.nav_c');
        let nav_clis = nav_c.children;
        // console.log(nav_clis);
        for(let i=0;i<nav_clis.length;i++){
            
            nav_clis[i].onmouseover = function(){
                for(let i=0;i<nav_clis.length;i++){
                    nav_clis[i].classList.remove('active');
                }
                
                this.classList.add('active'); 
            }
            nav_clis[i].onmouseout = function(){    
                this.classList.remove('active'); 
            }       

        }
        nav_c.onmouseout = function(){
            home.classList.add('active');
        }
    }
    xhr_categories.open('get','../api/data/nav.json');
    xhr_categories.send();


})