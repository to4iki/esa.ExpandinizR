'use strict';

const Dom = {
    form: document.getElementById('form'),
    preview: document.getElementById('preview'),
    previewHeader: document.getElementsByClassName('diff-preview')[0]
};

const ClassName = {
    isLeft: "is-left",
    isRight: "is-right"
};

const DomFunctions = {
    isLeft: (e) => e.classList.contains(ClassName.isLeft),
    isRight: (e) => e.classList.contains(ClassName.isRight),
    removeLeft: (e) => e.classList.remove(ClassName.isLeft),
    removeRight: (e) => e.classList.remove(ClassName.isRight),
    addLeft: (e) => e.classList.add(ClassName.isLeft),
    addRight: (e) => e.classList.add(ClassName.isRight),
    swap: (e1, e2) => {
        let exec = (e1, e2) => {
            DomFunctions.removeLeft(e1);
            DomFunctions.removeRight(e2);
            DomFunctions.addLeft(e2);
            DomFunctions.addRight(e1)
        }

        DomFunctions.isLeft(e1) === true ? exec(e1, e2) : exec(e2, e1);
    }
};

class Injector {

    constructor() {
    }

    swapPreview() {
        let template = '<input type="checkbox" name="swap_preview" id="swap_preview" value="1">';
        template += '<label for="swap_preview">Swap</label>';

        Dom.previewHeader.insertAdjacentHTML('afterbegin', template);
        document.getElementById('swap_preview').addEventListener('click', () => {
            DomFunctions.swap(Dom.form, Dom.preview);
        });
    }

    togglePreview() {
        // TODO: Implement
    }
}

let injector = new Injector();
injector.swapPreview();
