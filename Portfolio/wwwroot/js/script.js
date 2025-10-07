const words = ["Desenvolvedor Web", "Desenvolvedor de SoftWares", "Criador de Jogos"];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 400; 
const textElement = document.getElementById('text');

function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
        textElement.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;
        if (letterIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(() => {
                typingSpeed = 200; 
            }, 200);
        }
    } else {
        textElement.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
        if (letterIndex === 0) {
            isDeleting = false;
            wordIndex++;
            if (wordIndex === words.length) {
                wordIndex = 0;
            }
            typingSpeed = 200;
        }
    }

    setTimeout(type, typingSpeed);
}

type();
