const boxes = document.querySelectorAll('.box');
const cols = document.querySelectorAll('.col');

boxes.forEach(box => {
    box.addEventListener('dragstart', () => {
        box.classList.add('dragging');
    });

    box.addEventListener('dragend', () => {
        box.classList.remove('dragging');
    });
});

cols.forEach(col => {
    col.addEventListener('dragover', event => {
        event.preventDefault();
        const afterElement = getDragAfterElement(col, event.clientY);
        console.log(afterElement);
        const box = document.querySelector('.dragging');
        if (afterElement == null) {
            col.appendChild(box);
        }
        else {
            col.insertBefore(box, afterElement);
        }
    });
});

function getDragAfterElement(col, y) {
    const draggableElement = [...col.querySelectorAll('.box:not(.dragging')];

    return draggableElement.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};