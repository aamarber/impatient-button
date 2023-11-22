class ImpatientButton extends HTMLElement {
    constructor(){
        super();
        
        this.shadow = this.attachShadow({mode: 'closed'});

        this.shadow.appendChild(this.createButton('CLICK ME!'));

        this.impatientSemaphor = true;
    }

    /** 
     * This method creates the inner button element that will really handle the click
    */
    createButton(text){
        let button = document.createElement('button');

        button.innerHTML = text;

        return button;
    }

    /**
     * On the connected callback we'll set up the click listener for the inner button
     */
    connectedCallback() {
        // Get the button element in the shadow DOM
        const button = this.shadowRoot.querySelector('button');

        // Override the click method with the custom method
        //We'll bind this to the handler so we keep the current context
        button.addEventListener('click', this.impatientWait.bind(this));
    }

    /**
     * This method is the one handling the blocking and opening the semaphor of calls to avoid the impatient clicks
     * @param {*} event 
     * @returns 
     */
    impatientWait(event){
        if(!this.impatientSemaphor){
            console.log('Blocked');
            return;
        }

        this.blockSemaphor();

        let callback = this.executeclick(event);
        
        callback.then(() =>{
            this.openSemaphor();
        });
    }

    blockSemaphor(){
        this.impatientSemaphor = false;
    }

    openSemaphor(){
        this.impatientSemaphor = true;
    }

    /**
     * Executes the click function defined
     * @param {*} event 
     * @returns 
     */
    executeclick(event){
        //We look for the attribute click for the function to execute on click
        const clickAttributeValue = this.getAttribute('click');

        if(!clickAttributeValue){
            console.error('No click callback defined for impatient button');
        }

        // Create a function object from a string to call it
        const clickFunction = new Function(clickAttributeValue);

        //Execute the function and get the result
        let clickFunctionResult = clickFunction(event);

        //If it's a promise, then return it
        if(clickFunctionResult.then){
            return clickFunctionResult;
        }
        else{
            //If not, create a promise so it can be waited
            return new Promise(() => clickFunction.call(event));
        }
    }
}

customElements.define('impatient-button', ImpatientButton)