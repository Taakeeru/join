function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = fetch(file);
        if (resp.ok) {
            element.innerHTML = resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}