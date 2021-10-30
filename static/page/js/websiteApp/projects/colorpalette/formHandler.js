const form = document.getElementById("form");
const forms = document.querySelectorAll('.needs-validation');
const actionUrl = "https://www.joshbedwell.com/projects/colorpalette/";
const imagePlaceHolder = document.getElementById("imagePlaceHolder");
const imageDestination = document.getElementById("imageDestination");

Array.prototype.slice.call(forms)
    .forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!form.checkValidity()) {
                form.classList.add("was-validated");
            }
            else {
                imagePlaceHolder.classList.add("p-5");
                imagePlaceHolder.innerHTML = "Generating image...<br>This will take a moment for larger images";
                document.getElementById("imageDestination").innerHTML = "";
                let xhr = new XMLHttpRequest();
                xhr.open("POST", actionUrl, true);
                xhr.onload = (xhrEvent) => {
                    if (xhr.status === 200) {
                        imagePlaceHolder.innerHTML = "";
                        imagePlaceHolder.classList.remove("p-5");
                        let image = document.createElement("img");
                        image.src = "data:image/png;base64," + xhr.responseText;
                        image.classList.add("mb-4");
                        image.classList.add("img-fluid");
                        image.style.maxHeight = "80vh";
                        imageDestination.appendChild(image);
                    }
                    else {
                        imagePlaceHolder.innerHTML = `<strong style="color: red;">Error ${xhr.status} occurred generating image</strong>`;
                    }
                }
                let formData = new FormData(document.forms.namedItem("imageForm"));
                if (!document.getElementById("whiten").checked) {
                    formData.append("whiten", "off");
                }
                if (!document.getElementById("showText").checked) {
                    formData.append("show_text", "off");
                }
                if (!document.getElementById("full").checked) {
                    formData.append("full_set", "off");
                }
                xhr.send(formData);
                event.preventDefault();
            }
        }, false);
    });