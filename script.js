let modalQt = 1;

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

        //modalQt = 1;

        //closest busca pelo item mais proximo
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //formatando preço
        let p = price(pizzaJson[key].price);

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

        //c('pizzaInfo--qt').innerHTML = modalQt;
        

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);
});
