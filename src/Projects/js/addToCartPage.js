(function () {
    const addTocart = {
                
        cart: JSON.parse(localStorage.getItem('cartProduct')) || [],

        updateToLocalStorage: function () {
            localStorage.setItem('cartProduct', JSON.stringify(this.cart))
        },
        setProductDetails: async function () {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get('id');
                if (!id) throw 'No product ID provided';
                let response = await fetch(`https://dummyjson.com/products/${id}`)
                if (response.ok) {
                    let result = await response.json()
                    const exists = this.cart.some(item => item.id === result.id);
                    if (!exists) {
                        this.cart.push(result);
                        this.updateToLocalStorage();
                        location.reload()
                    }
                }
                if (!response.ok) {
                    throw new Error('something wrong')
                }
            } catch (error) {
                console.log(error)
            }
        },

        render: function (data) {
            let ul = document.querySelector('#data-container')
            
            data.map((item) => {
                let li = document.createElement('li')
                li.setAttribute('class', " border grid grid-cols-1 grid-rows-3 gap-y-6 md:grid-cols-3 md:gap-6 w-full md:h-72 p-4")
                li.innerHTML = `
               <div class=" w-full h-60  overflow-hidden">
                   <img src="${item.thumbnail}"
                       alt="logo" class=" w-full h-full object-contain">
               </div>
               <div class=" flex flex-col  w-52  h-60 ">
                   <div class="space-y-4">
                   <p class="text-xl  font-bold">Title : ${item.title}</p>
                   <p class="w-52 h-16 text-sm font-semibold text-gray-600">${item.description}</p>
                   </div>
                   <div class="mt-16 space-y-4">
                   <p class=" text-lg font-bold">Price : ${item.price}</p>
                   <p class=" text-blue-700 font-bold ">Quantity : ${item.stock}</p>
                   </div>
               </div>
               <div class="md:border   md:w-full h-10 p-1 flex items-center  md:justify-center md:gap-x-6">
                   <button type="button" id="${item.id}"
                       class="text-xl font-semibold  border p-1 bg-white text-gray-400">+</button>
                   <input type="number" readonly value="1" class=" w-10   text-xl" id="${item.id}">
                   <button type="button" id="${item.id}"
                       class="text-xl font-semibold border py-1 px-4 bg-white text-gray-400">-</button>
               </div>
           </li>
               `
                ul.append(li)
            })

        },
        check: function () {
            const cart = JSON.parse(localStorage.getItem('cartProduct')) || [];

            let subtotal = 0;
            cart.forEach(item => {
                const price = item.price || 0;
                subtotal += item.price
            })

            const shipping = 5;
            const total = subtotal + shipping;
            document.getElementById('subtotal').innerText = `Subtotal :${subtotal}`
            document.getElementById('shipping').innerText = `shipping : ${shipping}`;
            document.getElementById('total').innerText = `Total :  ${total}`;

        },
        bind: function () {
            this.setProductDetails()
            this.updateToLocalStorage()
            let data = this.cart
            this.render(data)
            this.check()
            let checkOutButton = document.getElementById('checkout-btn')
            checkOutButton.addEventListener('click',()=>{
                window.location.href =`deliveryInfo.html`
            })
           
        }

    }
    addTocart.bind()


})()

//  <button type="button" class="border p-2"  data-increase >
//     +
// </button>
// <input type="text" value="1" readonly class=" text-center w-10 border" >
// <button type="button" class="border p-2">
//     -
// </button>
//         </div>
//     </div>