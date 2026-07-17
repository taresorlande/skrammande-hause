function selectFile() {
    document.getElementById("file").click();
}

function hideMessage() {
    document.getElementById("upload-message").style.display = "none";
    // document.getElementById("upload-button").style.display = "none";
}

function showFileName() {
    const file = document.getElementById("file").files[0];
    const preview = document.getElementById("preview");

    if (file) {
        hideMessage();
        document.getElementById("file-name").textContent = file.name;
        document.getElementById("upload-image").disabled = false;

        preview.src = URL.createObjectURL(file);
        preview.hidden = false;
    }
}

function dragOver(event) {
    event.preventDefault();

    document.getElementById("dropzone").classList.add("drag");
}

function dragLeave() {
    document.getElementById("dropzone").classList.remove("drag");
}

function dropFile(event) {
    event.preventDefault();

    dragLeave();

    const input = document.getElementById("file");

    input.files = event.dataTransfer.files;

    showFileName();
}

async function uploadImage() {
    const input = document.getElementById("file");
    const button = document.querySelector(".upload-image");

    if (input.files.length === 0) {
        return;
    }

    const formData = new FormData();
    formData.append("image", input.files[0]);

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        alert(data.message);
    }
    catch (error) {
        alert("Erro ao enviar imagem.");
        button.disabled = false;

        console.error(error);
    }
}
