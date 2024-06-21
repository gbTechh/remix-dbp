type Tobj = { [key: string]: string };

export type TErrorsValidation = {
  [key: string]: string;
};

export class Validator {
  private value: string | number | undefined | null;
  private isValid: boolean;
  private error: Tobj;

  constructor(value: string | number | undefined | null) {
    this.value = value;
    this.isValid = true; // Inicializado como true para el caso de isNotRequired
    this.error = {};
  }

  isString(obj: Tobj) {
    this.isValid = typeof this.value === "string";
    if (!this.isValid) this.error = { ...this.error, ...obj };
    return this;
  }

  isNumber(obj: Tobj) {
    this.isValid = typeof this.value === "number" && !isNaN(this.value);
    if (!this.isValid) this.error = { ...this.error, ...obj };
    return this;
  }

  isRequired(obj: Tobj) {
    if (this.value === "" || this.value === undefined || this.value === null) {
      this.isValid = false;
      this.error = { ...this.error, ...obj };
    }
    return this;
  }

  isNotRequired() {
    if (this.value === "" || this.value === undefined || this.value === null) {
      this.isValid = true;
    }
    return this;
  }

  isMinLength(min: number, obj: Tobj) {
    if (this.isValid) {
      const isMin = `${this.value}`;
      this.isValid = isMin.length >= min;
      if (!this.isValid) this.error = { ...this.error, ...obj };
    }
    return this;
  }

  isFloat(obj: Tobj) {
    const re = /^[0-9]+(?:\.[0-9]+)?$/;
    this.isValid =
      typeof this.value === "number" &&
      !isNaN(this.value) &&
      Number.isFinite(this.value) &&
      re.test(`${this.value}`);
    if (!this.isValid) this.error = { ...this.error, ...obj };
    return this;
  }

  isEmailValid(obj: Tobj) {
    if (this.isValid) {
      const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
      this.isValid = this.isString(obj) && re.test(`${this.value}`);
      if (!this.isValid) this.error = { ...this.error, ...obj };
    }
    return this;
  }

  isNameValid(obj: Tobj) {
    if (this.isValid) {
      const re = /^[A-Za-z0-9ñÑ\s]+$/;
      this.isValid = re.test(`${this.value}`);
      if (!this.isValid) this.error = { ...this.error, ...obj };
    }
    return this;
  }

  isSlugValid(obj: Tobj) {
    if (this.isValid) {
      const re = /^[A-Za-z0-9-ñÑ]+$/;
      this.isValid = this.isString(obj) && re.test(`${this.value}`);
      if (!this.isValid) this.error = { ...this.error, ...obj };
    }
    return this;
  }

  validate() {
    return this.isValid ? {} : this.error;
  }
}

// type Tobj = { [key: string]: string };

// export type Terrors = {
//   [key: string]: string;
// };

// export class Validator {
//   private value: string | number | undefined | null;
//   private isValid: boolean;
//   private error: Tobj;
//   constructor(value: string | number | undefined | null) {
//     this.value = value;
//     this.isValid = false;
//     this.error = {};
//   }

//   isString(obj: Tobj) {
//     this.isValid = typeof this.value === "string";
//     if (!this.isValid) this.error = { ...this.error, ...obj };
//     return this;
//   }

//   isNumber(obj: Tobj) {
//     this.isValid = typeof this.value === "number" && !isNaN(this.value);
//     if (!this.isValid) this.error = { ...this.error, ...obj };
//     return this;
//   }

//   isRequired(obj: Tobj) {
//     if (this.value === "") {
//       this.isValid = false;
//     } else if (this.value === undefined || this.value === null) {
//       this.isValid = false;
//     } else {
//       this.isValid = true;
//     }
//     if (!this.isValid) this.error = { ...this.error, ...obj };
//     return this;
//   }
//   isNotRequired() {
//     if (this.value === "") {
//       this.isValid = true;
//     } else if (this.value === undefined || this.value === null) {
//       this.isValid = true;
//     }
//     return this;
//   }

//   isFloat() {
//     this.isValid =
//       typeof this.value === "number" &&
//       !isNaN(this.value) &&
//       Number.isFinite(this.value) &&
//       this.value % 1 !== 0;
//     return this;
//   }

//   isEmailValid(obj: Tobj) {
//     const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
//     this.isValid = this.isString(obj) && re.test(`${this.value}`);
//     if (!this.isValid) this.error = { ...this.error, ...obj };
//     return this;
//   }

//   isNameValid(obj: Tobj) {
//     const re = /^[A-Za-z0-9ñÑ\s]+$/;
//     this.isValid = this.isString(obj) && re.test(`${this.value}`);
//     if (!this.isValid) this.error = { ...this.error, ...obj };
//     return this;
//   }

//   isSlugValid(obj: Tobj) {
//     const re = /^[A-Za-z0-9-ñÑ]+$/;
//     this.isValid = this.isString(obj) && re.test(`${this.value}`);
//     if (!this.isValid) this.error = { ...this.error, ...obj };
//     return this;
//   }

//   validate() {
//     return this.error;
//   }
// }

// const validateFormErrors = (formData: MyFormDataCategory) => {
//   const errors: Terrors = {}

//   const isNameValid = (str: FormDataEntryValue) => {
//     const re = /^[A-Za-z0-9\s]+$/
//     return typeof str === 'string' && re.test(str)
//   }
//   const isSlugValid = (str: FormDataEntryValue) => {
//     const re = /^[A-Za-z0-9-]+$/
//     return typeof str === 'string' && re.test(str)
//   }

//   if (!formData.name) {
//     errors.name = 'El nombre es requerido'
//   } else {
//     if (!isNameValid(formData.name)) {
//       errors.name = 'Escribe un nombre adecuado'
//     }
//   }
//   if (!formData.slug) {
//     errors.slug = 'El nombre es requerido'
//   } else {
//     if (!isSlugValid(formData.slug)) {
//       errors.slug = 'Escribe un slug adecuado'
//     }
//   }
//   if (formData.parent_id < 0) {
//     errors.parent_id = 'La categoría padre es requerida'
//   } else {
//     if (typeof(formData.parent_id) !== 'number') {
//       errors.parent_id = 'Escoja una catgoría padre correcta'
//     }
//   }
//   if(!formData.id_media){
//     errors.id_media = 'La imagen es requerida'
//   }

//   return errors
// }
