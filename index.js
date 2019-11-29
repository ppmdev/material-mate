/** Create new ID generator in add methods */

// Material Controller

const MaterialCtrl = (function(){

    // Private properties & methods.

    // Material Constructor
    
    const Material = function(id, type, material, supplier, quantity, price, cost){
        this.id = id;
        this.type = type;
        this.material = material;
        this.supplier = supplier;
        this.quantity = quantity;
        this.price = price;
        this.cost = cost;
    }

    // Data Structure / State
    const data = { 
        materials: [
            {
                id: 49382,
                type: 'each',
                material: 'Timber 90 x 45',
                supplier: 'Bobs Building supplies',
                quantity: 50,
                price: 5,
                cost: 250
            }
        ],
        selectedItem: null,
        totalCost: 0
    }

    return {
        // Public properties & methods
        getData: function(){
            return data.materials;
        },

        addNewMaterial: function(selectedForm){

            
        },

        addMaterialEach: function(supplier, material, price, quantity){

            let ID;
            // Create ID
            if(data.materials.length > 0){
                ID = data.materials[data.materials.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Convert values to numbers
            quantity = parseInt(quantity);
            price = parseInt(price);

            // Calculate cost
            const cost = quantity * price;

            // Set Cost type
            const type = 'each';

            // Create new Material
            newMaterial = new Material(ID, type, supplier, material, quantity, price, cost);

            // Add to materials Array
            data.materials.push(newMaterial);

            return newMaterial;
        },
        addMaterialSqm: function(supplier, material, price, areaX, areaY){

            let ID;
            // Create ID
            if(data.materials.length > 0){
                ID = data.materials[data.materials.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Convert values to numbers
            areaX = parseInt(areaX);
            areaY = parseInt(areaY);
            price = parseInt(price);

            // Calculate area
            const area = areaX * areaY;

            // Calculate total Sqm
            const quantity = Math.ceil(area);

            // Calculate cost
            const cost = area * price;

            // Set type
            const type = 'sqm';

            // Create new Material
            newMaterial = new Material(ID, type, supplier, material, quantity, price, cost);

            // Add to materials Array
            data.materials.push(newMaterial);

            return newMaterial;
        },
        addMaterialLm: function(supplier, material, price, totalLength){

            let ID;
            // Create ID
            if(data.materials.length > 0){
                ID = data.materials[data.materials.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Convert values to numbers
            quantity = parseInt(totalLength);
            price = parseInt(price);

            // Calculate cost
            const cost = price * quantity;

            // Set type
            const type = 'lm';

            // Create new Material
            newMaterial = new Material(ID, type, supplier, material, quantity, price, cost);

            // Add to materials Array
            data.materials.push(newMaterial);

            return newMaterial;
        },
        addMaterialCover: function(supplier, material, price, areaX, areaY, matX, matY){

            let ID;
            // Create ID
            if(data.materials.length > 0){
                ID = data.materials[data.materials.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Convert values to numbers
            price = parseInt(price);

            // Calculate area
            const area = areaX * areaY;

            // Calculate material coverage
            const coverage = matX * matY;

            // Calculate quantity
            const quantity = Math.ceil(area / coverage);
            
            // Calculate cost
            const cost = quantity * price;

            // Set type
            const type = 'cover';

            // Create new Material
            newMaterial = new Material(ID, type, supplier, material, quantity, price, cost);

            // Add to materials Array
            data.materials.push(newMaterial);

            return newMaterial;
        },
        addMaterialSpaced: function(supplier, material, price, totalLength, spacing){

            let ID;
            // Create ID
            if(data.materials.length > 0){
                ID = data.materials[data.materials.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Convert values to numbers
            price = parseInt(price);
            totalLength = parseInt(totalLength);
            spacing = parseInt(spacing);

            // Calculate quantity
            const quantity = Math.ceil(totalLength / spacing);

            // Calculate cost
            const cost = quantity * price;

            // Set type
            const type = 'spaced';

            // Create new Material
            newMaterial = new Material(ID, type, supplier, material, quantity, price, cost);

            // Add to materials Array
            data.materials.push(newMaterial);

            return newMaterial;
        }
    }
})();

/*********************************************************************************************************************************************************
 *********************************************************************************************************************************************************
 *********************************************************************************************************************************************************/

const UICtrl = (function(){

    const UIselectors = {
        formSelect: '.form-select',
        eachFormSelect: 'each-form-select',
        sqmFormSelect: 'sqm-form-select',
        lmFormSelect: 'lm-form-select',
        coverFormSelect: 'cover-form-select',
        spacedFormSelect: 'spaced-form-select',
        formEach: 'form-each',
        formSqm: 'form-sqm',
        formLm: 'form-lm',
        formCover: 'form-cover',
        formSpaced: 'form-spaced',
        formSubmit: '#form-submit',
        materialInput: 'material-input',
        supplierInput: 'supplier-input',
        priceInput: 'price-input',
        eachQuantity: 'each-quantity-input',
        sqmAreaX: 'sqm-x-input',
        sqmAreaY: 'sqm-y-input',
        lmLength: 'lm-length-input',
        coverAreaX: 'cover-x-input',
        coverAreaY: 'cover-y-input',
        coverMatX: 'cover-matX-input',
        coverMatY: 'cover-matY-input',
        spacedLength: 'spaced-length-input',
        spacedSpacing: 'spaced-spacing-input'
    }

    const forms = [
        document.getElementById(UIselectors.formEach),
        document.getElementById(UIselectors.formSqm),
        document.getElementById(UIselectors.formLm),
        document.getElementById(UIselectors.formCover),
        document.getElementById(UIselectors.formSpaced)
    ];

    return {

        getDOMSelectors: function(){
            return UIselectors;
        },

        showForm: function(id, selector){

            const selectedForm = document.getElementById(id);

            // Convert HTML collection to Array
            const selectors = Array.from(selector.parentElement.children);
            
            // Check if the selected form is not already shown
            if(!selectedForm.classList.contains('form-show')){

                // Remove selected class from form selector.
                selectors.forEach(function(s){
                    if(s.classList.contains('selected-form')){
                        s.classList.remove('selected-form');
                    }
                });

                // Add selected class to form selector
                selector.classList.add('selected-form');

                // Hide form currently visible
                forms.forEach(function(form){

                    if(form.classList.contains('form-show')){
                        form.classList.remove('form-show');
                    }
                });
                
                // Show the selected form
                selectedForm.classList.add('form-show');
            }
        },

        getFormValues: function(type){
            const inputs = {
                material: document.getElementById(UIselectors.materialInput).value,
                supplier: document.getElementById(UIselectors.supplierInput).value,
                price: document.getElementById(UIselectors.priceInput).value
            }
            switch(type){
                case 'each':
                    inputs.quantity = document.getElementById(UIselectors.eachQuantity).value
                    break;
                case 'sqm':
                    inputs.areaX = document.getElementById(UIselectors.sqmAreaX).value;
                    inputs.areaY = document.getElementById(UIselectors.sqmAreaY).value;
                    break;
                case 'lm':
                    inputs.totalLength = document.getElementById(UIselectors.lmLength).value;
                    break;
                case 'cover':
                    inputs.areaX = document.getElementById(UIselectors.coverAreaX).value;
                    inputs.areaY = document.getElementById(UIselectors.coverAreaY).value;
                    inputs.matX = document.getElementById(UIselectors.coverMatX).value;
                    inputs.matY = document.getElementById(UIselectors.coverMatY).value;
                    break;
                case 'spaced':
                    inputs.totalLength = document.getElementById(UIselectors.spacedLength).value;
                    inputs.spacing = document.getElementById(UIselectors.spacedSpacing).value;
            }
            return inputs;
        }
    }
})();

/*********************************************************************************************************************************************************
 *********************************************************************************************************************************************************
 *********************************************************************************************************************************************************/

const App = (function(MaterialCtrl, UICtrl){

    let selectedForm = 'each';

    const loadEventListeners = function() {

        const UIselectors = UICtrl.getDOMSelectors();

        // Form selection Event
        document.querySelector(UIselectors.formSelect).addEventListener('click', selectForm)

        // Submit new Material
        document.querySelector(UIselectors.formSubmit).addEventListener('click', submitForm);

    }

    // Form selection Logic
    const selectForm = function(e){

        const UIselectors = UICtrl.getDOMSelectors();
        
        switch(e.target.id){
            case UIselectors.eachFormSelect:
                UICtrl.showForm(UIselectors.formEach, e.target);
                selectedForm = 'each';
                break;
            case UIselectors.sqmFormSelect:
                UICtrl.showForm(UIselectors.formSqm, e.target);
                selectedForm = 'sqm';
                break;
            case UIselectors.lmFormSelect:
                UICtrl.showForm(UIselectors.formLm, e.target);
                selectedForm = 'lm'
                break;
            case UIselectors.coverFormSelect:
                UICtrl.showForm(UIselectors.formCover, e.target);
                selectedForm = 'cover';
                break;
            case UIselectors.spacedFormSelect:
                UICtrl.showForm(UIselectors.formSpaced, e.target);
                selectedForm = 'spaced';
                break;
        }
    }

    const submitForm = function(e){

        const inputs = UICtrl.getFormValues(selectedForm);
        
        switch(selectedForm){
            case 'each':
                MaterialCtrl.addMaterialEach(inputs.supplier, inputs.material, inputs.price, inputs.quantity);
                break;
            case 'sqm':
                MaterialCtrl.addMaterialSqm(inputs.supplier, inputs.material, inputs.price, inputs.areaX, inputs.areaY);
                break;
        }

    }

    return {
        init: function(){

            // Get material data
            const materials = MaterialCtrl.getData();

            // Show selected form

            console.log('app initialised...');
            loadEventListeners();
        }
    }

})(MaterialCtrl, UICtrl);

App.init();