
(function () {
    function newOrder() {
        var options = {
            "key": "rzp_test_eqiH93LAtdRgQn", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_N9qQA4cEZzALdS", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
    }
    const user = {
        form: document.querySelector('#js-deliveryInforForm'),
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
            if (!/^[a-zA-Z]+$/.test(data.lastName?.trim())) {
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

            if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(data.address?.trim())) {
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
            if (!/^[A-Za-z]+$/.test(data.city?.trim())) {
                errors.push({
                    name: 'city',
                    message: 'ciyu name should be alphabats*'
                })
            }



            if (data.city == '') {
                errors.push({
                    name: 'city',
                    message: 'please enter your city *'
                })

            }
            if (!/^[A-Za-z]+$/.test(user.state?.trim())) {
                errors.push({
                    name: 'state',
                    message: 'state name should be alphabats *'
                })
            }


            if (data.state == '') {
                errors.push({
                    name: 'state',
                    message: 'please enter your state *'
                })

            }

            if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(data.phone?.trim())) {
                errors.push({
                    name: 'phone',
                    message: 'please enter phone number *'
                })
            }
            if (data.phone == '') {
                errors.push({
                    name: 'phone',
                    message: 'please enter your phone number*'
                })
            }
            if (data.zip?.length < 4 || data.zip?.length > 6) {
                errors.push({
                    name: 'zip',
                    message: 'please enter your zip code between 4 to 6*'
                })
                if (data.zip == '') {
                    errors.push({
                        name: 'zip',
                        message: 'please enter your zip code*'
                    })

                }
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
        inputFormErrorMessage: function () {
            let firstNameErrorMessage = document.querySelector('#firstName')
            let errorMessage = document.querySelector('span')
            errorMessage.setAttribute('class', "text-sm text-red-600")
            firstNameErrorMessage.addEventListener('blur', () => {
                if (firstNameErrorMessage.value == '') {
                    errorMessage.innerText = 'please fill'
                }
                else {
                    errorMessage.innerText = ''
                }
            })
            let lastName = document.querySelector('#lastName')
            let lastNameErrorMessage = document.querySelector('[data-name="lastName"]')
            lastNameErrorMessage.setAttribute('class', "text-sm text-red-600")
            lastName.addEventListener('blur', () => {
                if (lastName.value == '') {
                    lastNameErrorMessage.innerText = 'please fill'
                }
                else {
                    lastNameErrorMessage.innerText = ''
                }
            })
            let address = document.querySelector('#address')
            let addressErrorMessage = document.querySelector('[data-name="address"]')
            addressErrorMessage.setAttribute('class', "text-sm text-red-600")
            address.addEventListener('blur', () => {
                if (address.value == '') {
                    addressErrorMessage.innerText = 'please fill'
                }
                else {
                    addressErrorMessage.innerText = ''
                }
            })
            let city = document.querySelector('#city')
            let cityerrorMessage = document.querySelector('[data-name="city"]')
            cityerrorMessage.setAttribute('class', "text-sm text-red-600")
            city.addEventListener('blur', () => {
                if (city.value == '') {
                    cityerrorMessage.innerText = 'please fill'
                }
                else {
                    cityerrorMessage.innerText = ''
                }
            })
            let state = document.querySelector('#state')
            let stateErrorMessage = document.querySelector('[data-name="state"]')
            stateErrorMessage.setAttribute('class', "text-sm text-red-600")
            state.addEventListener('blur', () => {
                if (state.value == '') {
                    stateErrorMessage.innerText = 'please fill'
                }
                else {
                    stateErrorMessage.innerText = ''
                }
            })
            let zip = document.querySelector('#zip')
            let zipErrorMessage = document.querySelector('[data-name="zip"]')
            zipErrorMessage.setAttribute('class', "text-sm text-red-600")
            zip.addEventListener('blur', () => {
                if (zip.value == '') {
                    zipErrorMessage.innerText = 'please fill'
                }
                else {
                    zipErrorMessage.innerText = ''
                }
            })
            let phone = document.querySelector('#phone')
            let phoneErrorMessage = document.querySelector('[data-name="phone"]')
            phoneErrorMessage.setAttribute('class', "text-sm text-red-600")
            phone.addEventListener('blur', () => {
                if (phone.value == '') {
                    phoneErrorMessage.innerText = 'please fill'
                }
                else {
                    phoneErrorMessage.innerText = ''
                }
            })



        },

        bind: function () {
            this.inputFormErrorMessage()
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
                this.form.reset()
            })
        }
    }
    user.bind()
})()
// this.userDeliveryData.push(data)
// this.updateLocalStorage()
// userDeliveryData: localStorage.getItem('userDeliveryData') ? JSON.parse(localStorage.getItem('userDeliveryData')) : [],

// updateLocalStorage: function () {
//     localStorage.setItem('userDeliveryData', JSON.stringify(this.userDeliveryData))
// },
