function createReg() {
    fetch('/registry')
    document.location.replace("/registry")
}


document.getElementById("create-registry")
.addEventListener("click", createReg)


