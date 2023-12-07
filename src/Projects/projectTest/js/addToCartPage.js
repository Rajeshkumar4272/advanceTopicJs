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

            let newDiv = document.querySelector('#data-container')

            data.map((item) => {

                let li = document.createElement("li")
                li.setAttribute('class', ' border w-full ')
                li.innerHTML = `
                <div class="p-2 w-52 overflow-hidden" >
                        <img src="${item.thumbnail}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <p>title : ${item.title}</p>
                        <p>description : ${item.description}</p>
                        <p>id : ${item.id}</p>
                    </div>
                    <div>
                        <p>price :$ ${item.price}</p>
                        <p>QTY : ${item.stock}</p>
                        <div id="buttonContainer" class="flex w-8 ">
                        <button type="button" class="border p-2" id=${item.id} data-increase >
                    +
                </button>
                <input type="text" value="1" readonly class=" text-center w-10 border" >
                <button type="button" class="border p-2">
                    -
                </button>
                        </div>
                    </div>
               `
                newDiv.append(li)
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
            document.getElementById('total').innerText =`Total :  ${total}`;
        },
        bind: function () {
            this.setProductDetails()
            this.updateToLocalStorage()
            let data = this.cart
            this.render(data)
            this.check()
        }

    }
    addTocart.bind()


})()