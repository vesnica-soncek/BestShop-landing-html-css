function Calculator(form, summary) {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };
    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };
    this.summary = {
        list: summary.querySelector("ul"),
        total: {
            container: summary.querySelector("#total-price"),
            price: summary.querySelector(".total__price")
        }
    };
    this.addEvents();
}
// navodilo: input type="number"
Calculator.prototype.getValidInteger = function(value) {
    if (value === "") return "";
    // pretvori v celo število
    var number = parseInt(value, 10);
    // če ni številka ali je manjše od 1, ni OK
    if (isNaN(number) || number < 1) return "";
    return String(number);
};
Calculator.prototype.inputEvent = function(e) {
    var input = e.target;
    var cleanedValue = this.getValidInteger(input.value);
    // če ni OK, se izbriše
    input.value = cleanedValue;
    console.log("input checked:", input.id, input.value);
};
//spustni meni:
Calculator.prototype.selectEvent = function(e) {
    this.form.package.classList.toggle("open");
    // izbira paketa:
    if (e.target.tagName === "LI") {
        var value = e.target.getAttribute("data-value");
        var text = e.target.innerText;
        this.form.package.setAttribute("data-value", value);
        this.form.package.querySelector(".select__input").innerText = text;
        // zapiranje menija:
        this.form.package.classList.remove("open");
        console.log("package selected:", value);
    }
};
Calculator.prototype.closeSelectIfClickedOutside = function(e) {
    // če klik ni bil znotraj #package, zapri dropdown
    if (!this.form.package.contains(e.target)) this.form.package.classList.remove("open");
};
Calculator.prototype.addEvents = function() {
    // VALIDACIJA:
    this.form.products.addEventListener("change", this.inputEvent.bind(this));
    this.form.products.addEventListener("blur", this.inputEvent.bind(this));
    this.form.orders.addEventListener("change", this.inputEvent.bind(this));
    this.form.orders.addEventListener("blur", this.inputEvent.bind(this));
    this.form.package.addEventListener("click", this.selectEvent.bind(this));
    document.addEventListener("click", this.closeSelectIfClickedOutside.bind(this));
    console.log("Calculator ready");
};
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".calc__form");
    var summary = document.querySelector(".calc__summary");
    new Calculator(form, summary);
});

//# sourceMappingURL=BestShop-landing-html-css.72be8890.js.map
