/** A class representing a dictionary */
class Dictionary {
  /** Creates empty dictionary */
  constructor() {
    // Initialize the status to "not loaded". Other options are "loaded" and "unavailable".
    this.status = 'not loaded';

    this.dictionary = [];
  }

  /**
   * Loads the dictionary from the server.
   *
   * This method will load in the dictionary from the server, and set the status
   * to "loaded", if successful. Otherwise, it will set the status to
   * "unavailable".
   *
   * @returns {boolean} Returns true if the dictionary is loaded successfully;
   * false otherwise.
   */
  async loadDictionary() {
    const response = await fetch('dictionary.json');
    if (response.ok) {
      this.dictionary = await response.json();
      this.status = 'loaded';
      return true;
    } else {
      this.status = 'unavailable';
      return false;
    }
  }

  /** Returns true if the dictionary is loaded; false otherwise. */
  isLoaded() {
    return this.status === 'loaded';
  }

  /** Returns the words in the dictionary */
  getWords() {
    return this.words;
  }

  /** Returns the status of the dictionary */
  getStatus() {
    return this.status;
  }
}

// The dictionary object
const dictionary = new Dictionary();

export { dictionary };
