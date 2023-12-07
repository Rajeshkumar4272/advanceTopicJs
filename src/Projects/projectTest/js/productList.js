(function () {
    const product = {
        search: document.getElementById('search'),
        updateLocalStorage: function (productList) {
            localStorage.setItem('productList', JSON.stringify(productList))
        },
        render: function (data) {
            const ul = document.getElementById('productListUl')
            ul.innerHTML = ''
            data.map((item) => {
            
                let li = document.createElement('li');
                li.setAttribute('class', ' relative mt-5 p-1  max-w-md bg-white border-gray-200 rounded-lg overflow-hidden shadow');
                li.innerHTML = `
                <p class="py-2"><img src='${item.thumbnail}' class="w-full h-72 object-contain rounded-lg"></img> </p>
                    <p class="py-2" >${item.title} </p>
                    `
                let addTOCartButton = document.createElement('button')
                addTOCartButton.setAttribute('class', 'w-full p-3 bg-blue-500 text-white')
                addTOCartButton.innerText = 'Add to Cart'
                addTOCartButton.addEventListener('click', () => {
                    window.location.href = `addToCartPage.html?id=${item.id}`;
                })
                li.appendChild(addTOCartButton)
                ul.append(li)
            })


        },


        fetchDummydata: async function () {
            try {
                let response = await fetch('https://dummyjson.com/products')
                if (response.ok) {
                    let responseData = await response.json()
                    let productList = responseData.products
                    this.render(productList)

                }
                if (!response.ok) {
                    throw new Error(`http error ! status ${response.status}`)
                }
            } catch (error) {
                console.log(error);
            }

        },
        handleSearchInputChange: async function (data) {
            try {
                let response = await fetch(`https://dummyjson.com/products/search?q=${data}`)
                if (response.ok) {
                    let result = await response.json()
                    let data = result.products
                    this.render(data)
                }
                if (!response.ok) {
                    throw new Error(`http error ! status ${response.status}`)
                }
            } catch (error) {
                console.log(error)
            }

        },

        debouce: function (callback, delay) {
            let debouceTimer = null;
            return (e) => {
                clearTimeout(debouceTimer);
                debouceTimer = setTimeout(() => {
                    this.handleSearchInputChange((e.target.value?.trim()))
                }, delay);
            }

        },
        bind: function () {
            this.search.addEventListener('input', this.debouce(this.searchField, 1000))
            this.fetchDummydata()
        }
    }
    product.bind()


})()