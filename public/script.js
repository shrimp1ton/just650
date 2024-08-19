document.addEventListener("DOMContentLoaded", function() {
    const text = "Just 650.";
    const headerElement = document.getElementById("animated-header");
    let index = 0;

    function typeText() {
        if (index < text.length) {
            headerElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 150); // Adjust typing speed here
        }
    }

    typeText();
});
