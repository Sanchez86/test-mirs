'use strict';

const getResource = async (url) => {
    const api = 'http://localhost:3000';
    const response = await fetch(api+url);

    if (!response.ok){
        throw new Error('Server Error2');
    }

    return await response.json();
};

const getItems = async () => {
    return await getResource('/menu');
};

document.addEventListener('DOMContentLoaded', () => {

    getItems().then(result => {

        let render = "";

        result.forEach(item => {
            render +=
                `<div class="card card-border">
                    <a href="#" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" class="card__link"></a>
                    <a href="#" class="card__img">
                        <img src="${item.url}" alt="test" />
                    </a>
                    <div class="card__description">
                        <div class="card__category">${item.category}</div>
                        <div class="card__title">
                            ${item.title}
                        </div>
                        <div class="card__bottom">
                            <div class="card__price">${item.price} грн</div>
                            <div class="card__icon"></div>
                        </div>
                    </div>
                    <div class="card__decor">
                        <div class="card__decor__top-bottom"></div>
                        <div class="card__decor__left-right"></div>
                    </div>
                </div>`

        });

        const product = document.querySelector('.product');

        product.innerHTML = render;

    });


    function showCart(){

        if(localStorage.getItem('cart') !== null){
            const productItem = JSON.parse(localStorage.getItem('cart'));

            let render = '';

            productItem.forEach(item => {
                render += `
                    <div class="basket-item">
                        <div class="basket-item__left">
                            <div class="basket-item__title">${item.title}</div>
                            <div class="basket-item__price">${item.price} грн</div>
                        </div>
                        <button class="basket-item__delete" data-id="${item.id}">Удалить</button>
                    </div>
                    `;
            });
            document.querySelector('.wrap-basket-item').innerHTML = render;
        }else{
            document.querySelector('.wrap-basket-item').innerHTML = "";
        }
    }

    showCart();


    //add to cart
    document.querySelector('.product').addEventListener('click', (event) => {
            if(event.target.matches('.card__link')){

                const newElem = event.target.dataset;

                let productItem = [];

                if(localStorage.getItem('cart') !== null){
                    productItem = JSON.parse(localStorage.getItem('cart'));
                }else{
                    productItem = [];
                }

                productItem.push(newElem);
                localStorage.setItem('cart', JSON.stringify(productItem));

                showCart();
            }

        });


    //delete from cart
    document.querySelector('.wrap-basket-item').addEventListener('click', (event) => {
        if(event.target.matches('.basket-item__delete')) {

            const elemForDelete = event.target.dataset.id;

            console.log(event);

            let productItem = [];

            if(localStorage.getItem('cart') !== null){
                productItem = JSON.parse(localStorage.getItem('cart'));
            }

            const newArr = productItem.filter(item => item.id !== elemForDelete);

            console.log('newArr', newArr);

            localStorage.removeItem('cart');

            localStorage.setItem('cart', JSON.stringify(newArr));

            showCart();
        }
    });


    //clear cart
    document.querySelector('.basket__clear').addEventListener('click', () => {
        localStorage.removeItem('cart');
        showCart();
    })


});