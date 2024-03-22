const clearButton = document.querySelector('.clearButton');

const clearJobTags = (button) => {
    const allTags = document.querySelector('.tags');

    button.addEventListener('click', () => {
        let tag = allTags.children;
        for (let i = 0; i < tag.length - 1; i++) {
            tag[i].innerHTML = '';
        }
    })
}

clearJobTags(clearButton);