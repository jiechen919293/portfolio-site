class Cart {
    constructor() {
        this.courses = [];
    }

    addCourse(courseId) {
        const courseObj = courses.find(function(course) {
            return course.id === courseId;
        });
        //add course stuff
        // update course date
        this.courses.push(courseObj);
        this.render();
    }

    removeCourse(courseIndex) {
        this.courses.splice(courseIndex, 1)
        this.render()
    }


    subTotal() {
        let subTotal = 0;

        this.courses.forEach(function(course) {
            subTotal = subTotal + course.price;
        });

        return subTotal.toFixed(2);
    }
    total() {
        return (this.subTotal() * 1.13).toFixed(2);
    }
    render() {
        // update cart li html/ subtotal/ total/ course/
        const itemsInCart = document.getElementById('items-in-cart')
        const subTotalEl = document.getElementById('subtotal-amount')
        const totalEl = document.getElementById('itotal-amount')
            //redraw Ul
        cartUl.innerHTML = '';
        for (let i = 0; i < this.length; i++) {
            cartUl.insertAdjacentHTML(
                'beforeend',
                `
               <li data-index="${i}">
                 <img src="images/${this.courses[i].image}" />
                 <div id="cart-title">${this.courses[i].title}</div>
                 <div id="cart-price">$${this.courses[i].price}</div>
                 <div id="delete">
                   <i class="far fa-times-circle"></i>
                 </div>
               </li>
             `
            )
        }
        // update the items in cart
        itemsInCart.textContent = `You have ${this.length} courses in your cart.`;
        // update the subtotal
        subTotalEl.textContent = `$${this.subTotal()}`;
        // update the total
        totalEl.textContent = `$${this.total()}`;
    }

}
const coursesUl = document.querySelector('.courses');
const cartUl = document.getElementById('cart-ul');
const deleteButton = document.querySelector('delete');
const cart = new Cart();
coursesUl.addEventListener('click', function(e) {

    if (e.target.nodeName === 'BUTTON') {
        const courseEl = e.target.closest('li');
        cart.addCourse(courseEl.dataset.courseId);
    }
});
cartUl.addEventListener('click', function(e) {
    if (e.target.nodeName === 'I') {
        const courseEl = e.target.closest('li');
        cart.removeCourse(courseEl.dataset.index);
    }
});
cart.render();