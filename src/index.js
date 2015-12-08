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

    injecte() {}
}

class EsaTogglePreviewPatch extends EsaPatch {

    constructor() {
        super();

        this.toggleButton = document.createElement('div');
        this.icon = document.createElement('i');
        this.isPreviewHide = true;
    }

    setIconStyle(color) {
        this.icon.setAttribute('style', `color: ${color}; cursor: pointer;`);
    }

    buildElement() {
        this.toggleButton.setAttribute('style', 'margin-left: auto; width: 10px;');
        this.setIconStyle('#666');

        this.toggleButton.appendChild(this.icon);
    }

    insertElement() {
        this.formContainer.insertBefore(
            this.toggleButton,
            this.formContainer.firstChild
         );
    }

    addEventListener() {
        this.icon.addEventListener('mouseover', () => this.setIconStyle('#458ac5'));
        this.icon.addEventListener('mouseout', () => this.setIconStyle('#666'));
        this.toggleButton.addEventListener('click', () => this.togglePreviewContainer());
    }

    togglePreviewHideStatus() {
        this.isPreviewHide = !this.isPreviewHide
    }

    togglePreviewContainer() {
        this.togglePreviewHideStatus();

        if (this.isPreviewHide === true) {
            this.previewContainer.setAttribute('style', 'display: none;');
    		this.formContainer.setAttribute('style', 'width: 100%;');
    		this.icon.setAttribute('class', 'fa fa-chevron-left');
        } else {
            this.previewContainer.removeAttribute('style');
    		this.formContainer.removeAttribute('style');
    		this.icon.setAttribute('class', 'fa fa-chevron-right');
        }
    }

    injecte() {
        super.injecte();

        this.buildElement();
        this.insertElement();
        this.addEventListener();
        this.togglePreviewContainer();
    }
}

class EsaSwapPreviewPatch extends EsaPatch {

    constructor() {
        super();

        this.formMeta = new EsaContainerMeta(this.formContainer);
        this.previewMeta = new EsaContainerMeta(this.previewContainer);
    }

    get templateElement() {
        let template = '<input type="checkbox" name="swap_preview" id="swap_preview" value="1">';
        template += '<label for="swap_preview">Swap</label>';

        return template;
    }

    insertElement() {
        this.previewHeader.insertAdjacentHTML('afterbegin', this.templateElement);
    }

    addEventListener() {
        document.getElementById('swap_preview').addEventListener('click', () => {
            EsaContainerMeta.swap(this.formMeta, this.previewMeta);
        });
    }

    injecte() {
        super.injecte();

        this.insertElement();
        this.addEventListener();
    }
}

class EsaContainerMeta {

    constructor(element) {
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

// - execute injecte

const patchModules = [new EsaTogglePreviewPatch(), new EsaSwapPreviewPatch()];
patchModules.forEach(m => m.injecte());
