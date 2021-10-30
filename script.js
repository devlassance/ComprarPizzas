let cart = [];
let modalQt = 1;
let modalKey = 0;

//Transformando metodo em função para facilitar o uso
const c = (el)=> document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);

//recebendo preço e trocando ponto por virgula
const price = (p) => {
    p = p.toFixed(2).toString().replace(".", ",");
    return p;
}

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //formatando preço,
    let p = price(item.price);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${p}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        modalQt = 1;
       

        //closest busca pelo item mais proximo
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //formatando preço
        let p = price(pizzaJson[key].price);

        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${p}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size, indexSize)=>{
            
            if(indexSize == 2){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML  = pizzaJson[key].sizes[indexSize];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;
        

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);
});

//Eventos do Modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
//fechando modal usando dois botões
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})
//pizzaInfo--qtmenos
//pizzaInfo--qtmais
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){    
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }   
});
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, indexSize)=>{
            
    size.addEventListener('click', ()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    }); 
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[modalKey].id+'@'+size;

    //percorrendo array até encontrar o item com identifier igual
    let key = cart.findIndex((item)=>{
        return item.identifier == identifier;
    });

    if(key > -1){   
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }
    
    closeModal();
});