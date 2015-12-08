'use strict';

class EsaPatch {

    get formContainer() {
        return document.getElementById('form');
    }

    get previewContainer() {
        return document.getElementById('preview');
    }

    get previewHeader() {
        return document.getElementsByClassName('diff-preview')[0]
    }
}

class EsaSwapPreviewPatch extends EsaPatch {

    constructor() {
        super();

        this.formMeta = new EsaContainerMeta(this.formContainer);
        this.previewMeta = new EsaContainerMeta(this.previewContainer);
    }

    get swapPreviewElement() {
        let template = '<input type="checkbox" name="swap_preview" id="swap_preview" value="1">';
        template += '<label for="swap_preview">Swap</label>';

        return template;
    }

    insertSwapPreviewElement() {
        this.previewHeader.insertAdjacentHTML(
            'afterbegin',
             this.swapPreviewElement
        );
    }

    addSwapPreviewListener() {
        document.getElementById('swap_preview').addEventListener('click', () => {
            EsaContainerMeta.swap(this.formMeta, this.previewMeta);
        });
    }

    injecte() {
        this.insertSwapPreviewElement();
        this.addSwapPreviewListener();
    }
}

class EsaContainerMeta extends EsaPatch {

    constructor(element) {
        super();

        this.element = element;
    }

    get classSelectors() {
        return this.element.classList;
    }

    get isLeft() {
        return this.classSelectors.contains("is-left");
    }

    get isRight() {
        return this.classSelectors.contains("is-right");
    }

    removeLeft() {
        this.classSelectors.remove("is-left");
    }

    removeRight() {
        this.classSelectors.remove("is-right");
    }

    addLeft() {
        this.classSelectors.add("is-left");
    }

    addRight() {
        this.classSelectors.add("is-right");
    }

    static swap(s1, s2) {
        const execute = (s1, s2) => {
            s1.removeLeft();
            s2.removeRight();
            s2.addLeft();
            s1.addRight();
        }

        s1.isLeft === true ? execute(s1, s2) : execute(s2, s1);
    }
}

const swapPatch = new EsaSwapPreviewPatch();
swapPatch.injecte();
