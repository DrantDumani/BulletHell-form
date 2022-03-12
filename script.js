const nonPasswordInput = Array.from(document.querySelectorAll("input")).filter(
    elem => elem.id !== "password"
)

let passwordInput = document.querySelector("#password")
let confirmPassInput = document.querySelector("#confirm-password")

let lengthExpr = /^.{6,}$/
let numExpr = /\d/
let specialExpr = /[\W_]/

confirmPassInput.addEventListener("input", (e) => {
    let passText = passwordInput.value
    let confirmText = e.target
    if (confirmText.value !== passText) {
        confirmText.setCustomValidity("Passwords must match")
    } else {
        confirmText.setCustomValidity("")
    }
})

passwordInput.addEventListener("focusout", (e) => {
    let text = passwordInput.value
    let lengthTest = lengthExpr.test(text)
    let numTest = numExpr.test(text)
    let specialTest = specialExpr.test(text)

    if (!lengthTest) {
        displayInputErrorText(document.querySelector("#length"))
    }

    if (!numTest) {
        displayInputErrorText(document.querySelector("#number"))
    }

    if (!specialTest) {
        displayInputErrorText(document.querySelector("#special"))
    }
})

passwordInput.addEventListener("input", (e) => {
    let text = passwordInput.value
    let lengthTest = lengthExpr.test(text)
    let numTest = numExpr.test(text)
    let specialTest = specialExpr.test(text)

    if (lengthTest) {
        removeInputErrorText(document.querySelector("#length"))
    }

    if (numTest) {
        removeInputErrorText(document.querySelector("#number"))
    }

    if (specialTest) {
        removeInputErrorText(document.querySelector("#special"))
    }
})

function displayInputErrorText(pElem) {
    if (pElem.classList.contains("hidden")) {
        pElem.classList.toggle("hidden")
    }
}

function removeInputErrorText(pElem) {
    if (!pElem.classList.contains("hidden")) {
        pElem.classList.toggle("hidden")
    }
}

for (let elem of nonPasswordInput) {
    elem.addEventListener("focusout", (e) => {
        let input = e.target
        if (!input.checkValidity()) {
            let invalidText = input.parentNode.querySelector("p")
            displayInputErrorText(invalidText)
        }
    })

    elem.addEventListener("input", (e) => {
        let input = e.target
        if (input.checkValidity()) {
            let invalidText = input.parentNode.querySelector("p")
            removeInputErrorText(invalidText)
        }
    })
}