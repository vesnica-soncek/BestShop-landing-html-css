function Calculator(form, summary) {
    this.prices = {
        products: 1,
        orders: 2,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 40,
        terminal: 10
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
        items: {
            products: summary.querySelector('.list__item[data-id="products"]'),
            orders: summary.querySelector('.list__item[data-id="orders"]'),
            package: summary.querySelector('.list__item[data-id="package"]'),
            accounting: summary.querySelector('.list__item[data-id="accounting"]'),
            terminal: summary.querySelector('.list__item[data-id="terminal"]')
        },
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
// vnos:
Calculator.prototype.inputEvent = function(e) {
    var input = e.target;
    var id = input.id; // "products" ali "orders"
    input.value = this.getValidInteger(input.value);
    if (input.value === "") {
        this.hideSummaryItem(id);
        return;
    }
    // pokaži vrstico
    this.showSummaryItem(id);
    // izračun
    var quantity = parseInt(input.value, 10);
    var singlePrice = this.prices[id];
    var total = quantity * singlePrice;
    // posodobi tekst v summary vrstici
    var item = this.summary.items[id];
    var calcEl = item.querySelector(".item__calc");
    var priceEl = item.querySelector(".item__price");
    calcEl.innerText = quantity + " * $" + singlePrice;
    priceEl.innerText = "$" + total;
    this.updateTotal();
};
//spustni meni:
Calculator.prototype.selectEvent = function(e) {
    this.form.package.classList.toggle("open");
    // izbira paketa:
    if (e.target.tagName === "LI") {
        var value = e.target.getAttribute("data-value");
        var text = e.target.innerText;
        // pokaži vrstico
        this.showSummaryItem("package");
        // cena paketa
        var packagePrice = this.prices.package[value];
        // posodobi summary vrstico:
        var item = this.summary.items.package;
        var calcEl = item.querySelector(".item__calc");
        var priceEl = item.querySelector(".item__price");
        calcEl.innerText = text;
        priceEl.innerText = "$" + packagePrice;
        this.form.package.setAttribute("data-value", value);
        this.form.package.querySelector(".select__input").innerText = text;
        // zapiranje menija:
        this.form.package.classList.remove("open");
        console.log("package selected:", value);
        this.updateTotal();
    }
};
Calculator.prototype.closeSelectIfClickedOutside = function(e) {
    // če klik ni bil znotraj #package, zapri dropdown
    if (!this.form.package.contains(e.target)) this.form.package.classList.remove("open");
};
// Checkbox:
Calculator.prototype.checkboxEvent = function(e) {
    var checkbox = e.target;
    var id = checkbox.id; // "accounting" ali "terminal"
    if (checkbox.checked) {
        this.showSummaryItem(id);
        // posodobi ceno v summary vrstici
        var item = this.summary.items[id];
        var priceEl = item.querySelector(".item__price");
        priceEl.innerText = "$" + this.prices[id];
    } else this.hideSummaryItem(id);
    this.updateTotal();
};
//
Calculator.prototype.showSummaryItem = function(id) {
    this.summary.items[id].classList.add("open");
};
Calculator.prototype.hideSummaryItem = function(id) {
    this.summary.items[id].classList.remove("open");
};
// funkcija: updateTotal:
Calculator.prototype.updateTotal = function() {
    var total = 0;
    // products
    if (this.form.products.value !== "") total = total + parseInt(this.form.products.value, 10) * this.prices.products;
    // orders
    if (this.form.orders.value !== "") total = total + parseInt(this.form.orders.value, 10) * this.prices.orders;
    // package
    var selectedPackage = this.form.package.getAttribute("data-value");
    if (selectedPackage !== null && selectedPackage !== "") total = total + this.prices.package[selectedPackage];
    // accounting
    if (this.form.accounting.checked) total = total + this.prices.accounting;
    // terminal
    if (this.form.terminal.checked) total = total + this.prices.terminal;
    // pokaži ali skrij total vrstico
    if (total > 0) {
        this.summary.total.price.innerText = "$" + total;
        this.summary.total.container.classList.add("open");
    } else this.summary.total.container.classList.remove("open");
};
Calculator.prototype.addEvents = function() {
    // VALIDACIJA:
    this.form.products.addEventListener("change", this.inputEvent.bind(this));
    this.form.products.addEventListener("blur", this.inputEvent.bind(this));
    this.form.orders.addEventListener("change", this.inputEvent.bind(this));
    this.form.orders.addEventListener("blur", this.inputEvent.bind(this));
    // za dropdown meni:
    this.form.package.addEventListener("click", this.selectEvent.bind(this));
    document.addEventListener("click", this.closeSelectIfClickedOutside.bind(this));
    // za checkboxe:
    this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this));
    this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
    console.log("Calculator ready");
};
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".calc__form");
    var summary = document.querySelector(".calc__summary");
    new Calculator(form, summary);
});

//# sourceMappingURL=BestShop-landing-html-css.72be8890.js.map
