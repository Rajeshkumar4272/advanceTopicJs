
(function () {
    function newOrder(){
        var options = {
            "key": "rzp_test_LgUYWQdDKiWaSt", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_N9S8w2kQhJS6gN", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        // document.getElementById('rzp-button1').onclick = function (e) {
        //     e.preventDefault();
        // }
    }
    const user = {
        form: document.querySelector('#js-deliveryInforForm'),
        userDeliveryData: localStorage.getItem('userDeliveryData') ? JSON.parse(localStorage.getItem('userDeliveryData')) : [],

        updateLocalStorage: function () {
            localStorage.setItem('userDeliveryData', JSON.stringify(this.userDeliveryData))
        },

        validate: function (data) {

            let errors = []
            if (!/^[a-zA-Z]+$/.test(data.firstName)) {
                errors.push({
                    name: 'firstName',
                    message: 'please enter characters only *'
                })

            }

            if (data.firstName == '') {
                errors.push({
                    name: 'firstName',
                    message: 'please enter your FirstName *'
                })

            }
            if (!/^[a-zA-Z]+$/.test(data.lastName)) {
                errors.push({
                    name: 'lastName',
                    message: 'please enter characters only *'
                })

            }

            if (data.lastName == '') {
                errors.push({
                    name: 'lastName',
                    message: 'please enter your lastName *'
                })

            }

            if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(data.address)) {
                errors.push({
                    name: 'address',
                    message: 'please enter your address *'
                })

            }

            if (data.address == '') {
                errors.push({
                    name: 'address',
                    message: 'please enter your address *'
                })

            }

            if (data.city == '') {
                errors.push({
                    name: 'city',
                    message: 'please enter your city *'
                })

            }
            if (data.state == '') {
                errors.push({
                    name: 'state',
                    message: 'please enter your state *'
                })

            }
            if (data.zip == '') {
                errors.push({
                    name: 'zip',
                    message: 'please enter your zip code*'
                })

            }
            if (data.phone == '') {
                errors.push({
                    name: 'phone',
                    message: 'please enter your phone number*'
                })

            }
            if (errors.length > 0) {
                return errors
            }
            return {
                success: true
            }
        },
        setErrors: function (errors) {
            errors.map((error) => {
                let element = document.querySelector(`[data-name="${error.name}"]`)
                element.innerText = error.message
            })
        },
        resetError() {
            const resetErrorField = ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'phone']
            resetErrorField.forEach(errorlist => {
                let element = document.querySelector(`[data-name ="${errorlist}"]`)
                element.innerText = ''
            })
        },
        bind: function () {
            this.form.addEventListener('submit', async (e) => {
                e.preventDefault()
                let formData = new FormData(this.form)
                formId = new Date().getTime()
                let data = Object.fromEntries(formData)
                data['id'] = formId

                let errors = this.validate(data)
                if (!errors.success) {
                    this.setErrors(errors)
                    return
                }
                this.resetError()
                newOrder()
                this.userDeliveryData.push(data)
                this.updateLocalStorage()


            })


        }
    }
    user.bind()

    
})()