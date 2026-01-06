// main.js

function Calculator(form, summary) {
    /* Cene */
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

    /* Form elementi */
    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };

    /* Summary elementi */
    this.summary = {
        list: summary.querySelector("ul"),
        total: {
            container: summary.querySelector("#total-price"),
            price: summary.querySelector(".total__price")
        }
    };

    /* Init */
    this.addEvents();
}

/* Summary: pokaži + posodobi vrstico */
Calculator.prototype.updateSummary = function (id, calcText, totalValue) {
    const item = this.summary.list.querySelector('[data-id="' + id + '"]');
    const calcEl = item.querySelector(".item__calc");
    const priceEl = item.querySelector(".item__price");

    item.classList.add("open");

    if (calcEl) {
        calcEl.innerText = calcText || "";
    }

    priceEl.innerText = "$" + totalValue;
};

/* Summary: skrij vrstico */
Calculator.prototype.hideSummary = function (id) {
    const item = this.summary.list.querySelector('[data-id="' + id + '"]');
    item.classList.remove("open");
};

/* Validacija: pozitivno celo število ali prazno */
Calculator.prototype.getValidInteger = function (value) {
    if (value === "") return "";

    const number = parseInt(value, 10);
    if (isNaN(number) || number < 1) return "";

    return String(number);
};

/* Total */
Calculator.prototype.updateTotal = function () {
    const show = this.summary.list.querySelectorAll(".open").length > 0;

    if (!show) {
        this.summary.total.container.classList.remove("open");
        return;
    }

    const productsSum =
        this.form.products.value === ""
            ? 0
            : parseInt(this.form.products.value, 10) * this.prices.products;

    const ordersSum =
        this.form.orders.value === ""
            ? 0
            : parseInt(this.form.orders.value, 10) * this.prices.orders;

    const selectedPackage = this.form.package.dataset.value || "";
    const packageSum = selectedPackage === "" ? 0 : this.prices.package[selectedPackage];

    const accountingSum = this.form.accounting.checked ? this.prices.accounting : 0;
    const terminalSum = this.form.terminal.checked ? this.prices.terminal : 0;

    const total = productsSum + ordersSum + packageSum + accountingSum + terminalSum;

    this.summary.total.price.innerText = "$" + total;
    this.summary.total.container.classList.add("open");
};

/* Inputi: products/orders */
Calculator.prototype.inputEvent = function (e) {
    const input = e.currentTarget;
    const id = input.id;

    input.value = this.getValidInteger(input.value);

    if (input.value === "") {
        this.hideSummary(id);
        this.updateTotal();
        return;
    }

    const quantity = parseInt(input.value, 10);
    const singlePrice = this.prices[id];
    const sum = quantity * singlePrice;

    this.updateSummary(id, quantity + " * $" + singlePrice, sum);
    this.updateTotal();
};

/* Dropdown: package */
Calculator.prototype.selectEvent = function (e) {
    this.form.package.classList.toggle("open");

    const value = e.target && e.target.dataset ? e.target.dataset.value : "";
    const text = value ? e.target.innerText : "";

    if (value) {
        this.form.package.dataset.value = value;
        this.form.package.querySelector(".select__input").innerText = text;

        this.updateSummary("package", text, this.prices.package[value]);
        this.updateTotal();

        this.form.package.classList.remove("open");
    }
};

/* Checkboxi */
Calculator.prototype.checkboxEvent = function (e) {
    const checkbox = e.currentTarget;
    const id = checkbox.id;

    if (checkbox.checked) {
        this.updateSummary(id, "", this.prices[id]);
    } else {
        this.hideSummary(id);
    }

    this.updateTotal();
};

/* Eventi */
Calculator.prototype.addEvents = function () {
    this.form.products.addEventListener("change", this.inputEvent.bind(this));
    this.form.products.addEventListener("blur", this.inputEvent.bind(this));

    this.form.orders.addEventListener("change", this.inputEvent.bind(this));
    this.form.orders.addEventListener("blur", this.inputEvent.bind(this));

    this.form.package.addEventListener("click", this.selectEvent.bind(this));

    this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this));
    this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
};

/* Start */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".calc__form");
    const summary = document.querySelector(".calc__summary");

    new Calculator(form, summary);
});
