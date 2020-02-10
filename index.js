/** Create new ID generator in add methods */

// Material Controller

const MaterialCtrl = (function() {
  // Private properties & methods.

  // Material Constructor

  const Material = function(
    id,
    type,
    material,
    supplier,
    quantity,
    price,
    cost
  ) {
    this.id = id;
    this.type = type;
    this.material = material;
    this.supplier = supplier;
    this.quantity = quantity;
    this.price = price;
    this.cost = cost;
  };

  // Data Structure / State
  const data = {
    materials: [
      {
        id: 2,
        type: "each",
        material: "screws",
        supplier: "Bobs hardware",
        quantity: 450,
        price: 1,
        cost: 450
      },
      {
        id: 3,
        type: "sqm",
        material: "tiles",
        supplier: "Bobs hardware",
        quantity: 100,
        price: 32,
        cost: 3200
      },
      {
        id: 4,
        type: "lm",
        material: "cladding",
        supplier: "Bobs hardware",
        quantity: 250,
        price: 8,
        cost: 2000
      },
      {
        id: 5,
        type: "cover",
        material: "plasterboard 900x2500",
        supplier: "Bobs hardware",
        quantity: 40,
        price: 30,
        cost: 1200
      },
      {
        id: 6,
        type: "spaced",
        material: "timber posts",
        supplier: "Bobs hardware",
        quantity: 10,
        price: 87,
        cost: 870
      }
    ],
    currentItem: null,
    totalCost: 0
  };

  return {
    // Public properties & methods
    getData: function() {
      return data.materials;
    },

    deleteMaterial: function(id) {
      data.materials.forEach(function(material, index) {
        if (id == material.id) {
          data.materials.splice(index, index + 1);
        }
      });
    },

    getMaterialById: function(id) {
      let found;

      data.materials.forEach(function(material) {
        if (id === material.id) {
          found = material;
        }
      });

      return found;
    },

    setCurrentItem: function(selectedItem) {
      data.currentItem = selectedItem;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    addMaterialEach: function(supplier, material, price, quantity) {
      let ID;
      // Create ID
      if (data.materials.length > 0) {
        ID = data.materials[data.materials.length - 1].id + 1;
      } else {
        ID = 1;
      }

      // Convert values to numbers
      quantity = parseInt(quantity);
      price = parseInt(price);

      // Calculate cost
      const cost = quantity * price;

      // Set Cost type
      const type = "each";

      // Create new Material
      newMaterial = new Material(
        ID,
        type,
        supplier,
        material,
        quantity,
        price,
        cost
      );

      // Add to materials Array
      data.materials.push(newMaterial);

      return newMaterial;
    },
    addMaterialSqm: function(supplier, material, price, areaX, areaY) {
      let ID;
      // Create ID
      if (data.materials.length > 0) {
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
      const type = "sqm";

      // Create new Material
      newMaterial = new Material(
        ID,
        type,
        supplier,
        material,
        quantity,
        price,
        cost
      );

      // Add to materials Array
      data.materials.push(newMaterial);

      return newMaterial;
    },
    addMaterialLm: function(supplier, material, price, totalLength) {
      let ID;
      // Create ID
      if (data.materials.length > 0) {
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
      const type = "lm";

      // Create new Material
      newMaterial = new Material(
        ID,
        type,
        supplier,
        material,
        quantity,
        price,
        cost
      );

      // Add to materials Array
      data.materials.push(newMaterial);

      return newMaterial;
    },
    addMaterialCover: function(
      supplier,
      material,
      price,
      areaX,
      areaY,
      matX,
      matY
    ) {
      let ID;
      // Create ID
      if (data.materials.length > 0) {
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
      const type = "cover";

      // Create new Material
      newMaterial = new Material(
        ID,
        type,
        supplier,
        material,
        quantity,
        price,
        cost
      );

      // Add to materials Array
      data.materials.push(newMaterial);

      return newMaterial;
    },
    addMaterialSpaced: function(
      supplier,
      material,
      price,
      totalLength,
      spacing
    ) {
      let ID;
      // Create ID
      if (data.materials.length > 0) {
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
      const type = "spaced";

      // Create new Material
      newMaterial = new Material(
        ID,
        type,
        supplier,
        material,
        quantity,
        price,
        cost
      );

      // Add to materials Array
      data.materials.push(newMaterial);

      return newMaterial;
    }
  };
})();

/*********************************************************************************************************************************************************
 *********************************************************************************************************************************************************
 *********************************************************************************************************************************************************/

const UICtrl = (function() {
  const UIselectors = {
    materialTable: document.querySelector("#table-area"),
    alertBox: document.querySelector("#alert-box"),
    // Form Selection tabs
    formSelectors: document.querySelector("#form-options"),
    formEdit: document.querySelector("#form-edit"),
    // Id values for each form
    eachFormSelect: "selector-each",
    sqmFormSelect: "selector-sqm",
    lmFormSelect: "selector-lm",
    coverFormSelect: "selector-cover",
    spacedFormSelect: "selector-spaced",
    // Form IDs
    formEachID: "form-each",
    formSqmID: "form-sqm",
    formLmID: "form-lm",
    formCoverID: "form-cover",
    formSpacedID: "form-spaced",
    // Form Selectors
    formEach: document.querySelector("#form-each"),
    formSqm: document.querySelector("#form-sqm"),
    formLm: document.querySelector("#form-lm"),
    formCover: document.querySelector("#form-cover"),
    formSpaced: document.querySelector("#form-spaced"),
    // Form Buttons
    buttonContainer: document.querySelector("#form-buttons"),
    submitButtons: document.querySelector("#submit-buttons"),
    editButtons: document.querySelector("#edit-buttons"),
    submitBtn: document.querySelector("#form-submit"),
    resetBtn: document.querySelector("#form-reset"),
    updateBtn: document.querySelector("#form-update"),
    cancelBtn: document.querySelector("#form-cancel"),
    // Form inputs
    allFormInputs: document.querySelectorAll(".form-input"),
    materialInput: document.querySelector("#material-input"),
    supplierInput: document.querySelector("#supplier-input"),
    priceInput: document.querySelector("#price-input"),
    eachQuantity: document.querySelector("#each-quantity-input"),
    sqmAreaX: document.querySelector("#sqm-x-input"),
    sqmAreaY: document.querySelector("#sqm-y-input"),
    lmLength: document.querySelector("#lm-length-input"),
    coverAreaX: document.querySelector("#cover-x-input"),
    coverAreaY: document.querySelector("#cover-y-input"),
    coverMatX: document.querySelector("#cover-matX-input"),
    coverMatY: document.querySelector("#cover-matY-input"),
    spacedLength: document.querySelector("#spaced-length-input"),
    spacedSpacing: document.querySelector("#spaced-spacing-input")
  };

  const forms = [
    UIselectors.formSqm,
    UIselectors.formEach,
    UIselectors.formLm,
    UIselectors.formCover,
    UIselectors.formSpaced
  ];

  return {
    getDOMSelectors: function() {
      return UIselectors;
    },

    showForm: function(type) {
      const selectedForm = document.getElementById(`form-${type}`);
      const selector = document.getElementById(`selector-${type}`);
      const selectors = Array.from(UIselectors.formSelectors.children);

      // Check if the selected form is not already shown
      if (!selectedForm.classList.contains("form-show")) {
        // Remove selected class from form selector.
        selectors.forEach(function(s) {
          if (s.classList.contains("selected-form")) {
            s.classList.remove("selected-form");
          }
        });

        // Add selected class to form selector
        selector.classList.add("selected-form");

        // Hide form currently visible
        forms.forEach(function(form) {
          if (form.classList.contains("form-show")) {
            form.classList.remove("form-show");
          }
        });

        // Show the selected form
        selectedForm.classList.add("form-show");
      }
    },

    // Show edit state on the form

    showEditState: function() {
      // Hide normal form state
      UIselectors.formSelectors.style.display = "none";
      UIselectors.submitButtons.style.display = "none";
      // Show form Edit state
      UIselectors.formEdit.style.display = "block";
      UIselectors.editButtons.style.display = "block";
    },

    // Hide Edit state on the form

    hideEditState: function() {
      // Hide form Edit state
      UIselectors.formEdit.style.display = "none";
      UIselectors.editButtons.style.display = "none";
      // Show normal form state
      UIselectors.formSelectors.style.display = "flex";
      UIselectors.submitButtons.style.display = "block";
    },

    // Return form inputs
    getFormValues: function(selectedForm) {
      const inputs = {
        material: UIselectors.materialInput.value,
        supplier: UIselectors.supplierInput.value,
        price: UIselectors.priceInput.value
      };
      switch (selectedForm) {
        case "each":
          inputs.quantity = UIselectors.eachQuantity.value;
          break;
        case "sqm":
          inputs.areaX = UIselectors.sqmAreaX.value;
          inputs.areaY = UIselectors.sqmAreaY.value;
          break;
        case "lm":
          inputs.totalLength = UIselectors.lmLength.value;
          break;
        case "cover":
          inputs.areaX = UIselectors.coverAreaX.value;
          inputs.areaY = UIselectors.coverAreaY.value;
          inputs.matX = UIselectors.coverMatX.value;
          inputs.matY = UIselectors.coverMatY.value;
          break;
        case "spaced":
          inputs.totalLength = UIselectors.spacedLength.value;
          inputs.spacing = UIselectors.spacedSpacing.value;
      }

      return inputs;
    },

    clearFormFields: function() {
      UIselectors.allFormInputs.forEach(function(input) {
        input.value = "";
      });
    },

    addItemToForm: function(item) {
      console.log(item);
    },

    populateList: function(materials) {
      materials.forEach(function(item) {
        UICtrl.addListItem(item);
      });
    },

    // Add Material to list
    addListItem: function(item) {
      // Create new table row
      const row = document.createElement("tr");

      // Add ID to row

      row.id = item.id;

      // Add data to row
      row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.material}</td>
                <td>${item.supplier}</td>
                <td>${item.quantity} ${
        item.type === "lm" ? item.type : item.type === "sqm" ? "m2" : ""
      }</td>
                <td>$ ${item.price} /${
        item.type === "spaced" || item.type === "cover"
          ? "each"
          : item.type === "sqm"
          ? "m2"
          : item.type
      }</td>
                <td>$ ${item.cost}</td>
                <td>
                    <input type="checkbox" name="itemSelect">
                </td>
                <td>
                    <i class="fas fa-edit"></i>
                </td>
                <td>
                    <i class="fas fa-trash"></i>
                </td>
            `;

      // Insert Element
      UIselectors.materialTable.insertAdjacentElement("afterbegin", row);
    },

    removeListItem: function(id) {
      // Make an array from the children <tr> elements in the table and match the id then remove
      let listMaterials = Array.from(UIselectors.materialTable.children);
      // Loop through and match id to item in list
      listMaterials.forEach(function(material) {
        if (material.id == id) {
          material.remove();
        }
      });
    },

    setAlert: function(msg, type) {
      const alert = UIselectors.alertBox;

      alert.innerHTML = msg;
      alert.classList.add(type);

      setTimeout(function() {
        alert.innerHTML = "";
        alert.classList.remove(type);
      }, 3000);
    }
  };
})();

/*********************************************************************************************************************************************************
 *********************************************************************************************************************************************************
 *********************************************************************************************************************************************************/

const App = (function(MaterialCtrl, UICtrl) {
  // Assign Material list to variable
  let materials = MaterialCtrl.getData();

  const UIselectors = UICtrl.getDOMSelectors();

  let selectedForm = "each";

  const loadEventListeners = function() {
    // Form selection Event
    UIselectors.formSelectors.addEventListener("click", selectForm);

    // Submit new Material
    UIselectors.buttonContainer.addEventListener("click", handleButtonEvent);

    // Edit and Delete functionality for material table
    UIselectors.materialTable.addEventListener("click", handleTableEvent);
  };

  // Event delegation for form buttons

  const handleButtonEvent = function(e) {
    switch (e.target.id) {
      case UIselectors.submitBtn.id:
        submitForm(e);
        break;
      case UIselectors.resetBtn.id:
        UICtrl.clearFormFields();
        break;
      case UIselectors.cancelBtn.id:
        UICtrl.clearFormFields();
        UICtrl.hideEditState();
    }
  };

  const handleTableEvent = function(e) {
    const targetID = parseInt(e.target.parentElement.parentElement.id);
    const selectedItem = MaterialCtrl.getMaterialById(targetID);

    if (e.target.classList.contains("fa-edit")) {
      MaterialCtrl.setCurrentItem(selectedItem);
      const itemToEdit = MaterialCtrl.getCurrentItem();
      UICtrl.showForm(selectedItem.type);
      UICtrl.showEditState();
    } else if (e.target.classList.contains("fa-trash")) {
      MaterialCtrl.deleteMaterial(targetID);
      UICtrl.removeListItem(targetID);
    }
  };

  // Form selection Logic when the user clicks on the form tab selectors.
  const selectForm = function(e) {
    switch (e.target.id) {
      case UIselectors.eachFormSelect:
        UICtrl.showForm("each");
        break;
      case UIselectors.sqmFormSelect:
        UICtrl.showForm("sqm");
        break;
      case UIselectors.lmFormSelect:
        UICtrl.showForm("lm");
        break;
      case UIselectors.coverFormSelect:
        UICtrl.showForm("cover");
        break;
      case UIselectors.spacedFormSelect:
        UICtrl.showForm("spaced");
        break;
    }
  };

  const submitForm = function(e) {
    e.preventDefault();

    const inputs = UICtrl.getFormValues(selectedForm);

    if (Object.values(inputs).includes("")) {
      UICtrl.setAlert("Please fill in all fields correctly", "alert-danger");
    } else {
      switch (selectedForm) {
        case "each":
          const eachMaterial = MaterialCtrl.addMaterialEach(
            inputs.supplier,
            inputs.material,
            inputs.price,
            inputs.quantity
          );
          UICtrl.addListItem(eachMaterial);
          UICtrl.clearFormFields(selectedForm);
          break;
        case "sqm":
          const sqmMaterial = MaterialCtrl.addMaterialSqm(
            inputs.supplier,
            inputs.material,
            inputs.price,
            inputs.areaX,
            inputs.areaY
          );
          UICtrl.addListItem(sqmMaterial);
          break;
        case "lm":
          const lmMaterial = MaterialCtrl.addMaterialLm(
            inputs.supplier,
            inputs.material,
            inputs.price,
            inputs.totalLength
          );
          UICtrl.addListItem(lmMaterial);
          break;
        case "cover":
          const coverMaterial = MaterialCtrl.addMaterialCover(
            inputs.supplier,
            inputs.material,
            inputs.price,
            inputs.areaX,
            inputs.areaY,
            inputs.matX,
            inputs.matY
          );
          UICtrl.addListItem(coverMaterial);
          break;
        case "spaced":
          const spacedMaterial = MaterialCtrl.addMaterialSpaced(
            inputs.supplier,
            inputs.material,
            inputs.price,
            inputs.totalLength,
            inputs.spacing
          );
          UICtrl.addListItem(spacedMaterial);
          break;
      }

      UICtrl.setAlert("Material added", "alert-success");
    }
  };

  return {
    init: function() {
      // Fill table with stored data
      UICtrl.populateList(MaterialCtrl.getData());

      // Load DOM event listeners
      loadEventListeners();

      console.log("app initialised...");
    }
  };
})(MaterialCtrl, UICtrl);

App.init();
