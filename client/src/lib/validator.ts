/**
 * Vérifie si le nom est valide
 * Le nom doit contenir uniquement des lettres, des espaces et des apostrophes
 * @param {string} name - Le nom à vérifier
 * @returns {boolean} - true si le nom est valide, false sinon
 */
export const validateName = (name: string): boolean => {
  const nomRegex = /^[a-zA-Z -]+$/;
  return nomRegex.test(name);
};

/**
 * Valide un email.
 * @param {string} email - L'email à valider.
 * @returns {boolean} - Renvoie `true` si l'email est valide, sinon `false`.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone.
 * @param {string} phone - Le numéro de téléphone à valider.
 * @returns {boolean} - Renvoie `true` si le numéro de téléphone est valide, sinon `false`.
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Valide un nom de ville.
 * @param {string} city - Le nom de la ville à valider.
 * @returns {boolean} - Renvoie `true` si le nom de la ville est valide, sinon `false`.
 */
export const validateCity = (city: string): boolean => {
  const cityRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/;
  return cityRegex.test(city);
};

/**
 * Valide un code postal.
 * @param {string} postalCode - Le code postal à valider.
 * @returns {boolean} - Renvoie `true` si le code postal est valide, sinon `false`.
 */
export const validatePostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^\d{5}(-\d{4})?$/;
  return postalCodeRegex.test(postalCode);
};

/**
 * Valide une adresse.
 * @param {string} address - L'adresse à valider.
 * @returns {boolean} - Renvoie `true` si l'adresse est valide, sinon `false`.
 */
export const validateAddress = (address: string): boolean => {
  const addressRegex = /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s,'.-]+$/;
  return addressRegex.test(address);
};
