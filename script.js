const form = document.getElementById("form");
const messageBox = document.getElementById("message-box");

function validateForm() {
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const orderNo = document.getElementById("order-no").value.trim();
    const productCode = document.getElementById("product-code").value.trim();
    const quantity = document.getElementById("quantity").value;

    const complaintsChecked = document.querySelectorAll(
        "#complaints-group input[type='checkbox']:checked"
    );

    const otherComplaint = document.getElementById("other-complaint");

    const complaintDescription = document
        .getElementById("complaint-description")
        .value.trim();

    const selectedSolution = document.querySelector(
        "#solutions-group input[type='radio']:checked"
    );

    const solutionDescription = document
        .getElementById("solution-description")
        .value.trim();

    return {
        "full-name": fullName !== "",

        "email": /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

        "order-no": /^2024\d{6}$/.test(orderNo),

        "product-code":
            /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/.test(productCode),

        "quantity": Number.isInteger(Number(quantity)) && Number(quantity) > 0,

        "complaints-group": complaintsChecked.length > 0,

        "complaint-description":
            !otherComplaint.checked ||
            complaintDescription.length >= 20,

        "solutions-group": selectedSolution !== null,

        "solution-description":
            !document.getElementById("other-solution").checked ||
            solutionDescription.length >= 20
    };
}

function isValid(validationResults) {
    return Object.values(validationResults).every(Boolean);
}

function updateBorders() {
    const results = validateForm();

    document.getElementById("full-name").style.borderColor =
        results["full-name"] ? "green" : "red";

    document.getElementById("email").style.borderColor =
        results["email"] ? "green" : "red";

    document.getElementById("order-no").style.borderColor =
        results["order-no"] ? "green" : "red";

    document.getElementById("product-code").style.borderColor =
        results["product-code"] ? "green" : "red";

    document.getElementById("quantity").style.borderColor =
        results["quantity"] ? "green" : "red";

    document.getElementById("complaints-group").style.borderColor =
        results["complaints-group"] ? "green" : "red";

    document.getElementById("complaint-description").style.borderColor =
        results["complaint-description"] ? "green" : "red";

    document.getElementById("solutions-group").style.borderColor =
        results["solutions-group"] ? "green" : "red";

    document.getElementById("solution-description").style.borderColor =
        results["solution-description"] ? "green" : "red";
}

// Change event on all inputs and textareas
document.querySelectorAll("input, textarea").forEach((element) => {
    element.addEventListener("change", updateBorders);
});

// Submit validation
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const validationResults = validateForm();

    // Highlight all fields on submit
    updateBorders();

    if (isValid(validationResults)) {
        messageBox.textContent = "Form submitted successfully!";
    } else {
        messageBox.textContent = "Please correct the errors in the form.";
    }
});