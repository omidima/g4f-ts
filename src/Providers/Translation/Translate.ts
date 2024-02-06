import axios from 'axios';
import { ITranslationOptions } from '../../interfaces/ITranslationOptions';

class Translate {
    name: string;
    type: string;
    url: string;
    need_slice_text: boolean;
    working: boolean;

    constructor() {
        this.name = "Translate",
        this.type = "Translation";
        this.url = "https://nexra.aryahcr.cc/api/translate/";
        this.need_slice_text = false;        
        this.working = true;
    }

    /**
     * Translate text to a target language.
     * @param {Options} options - Options for translation (optional).
     * @returns {Promise<object>} - Promise that resolves with the translation result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    async fetchData(options:ITranslationOptions): Promise<object> {
        const headers = {
            'Content-Type': 'application/json'
        }
          
        const data = {
            text: options.text,
            source: options.source,
            target: options.target
        };
        
        return axios.post(this.url, data, { headers: headers })
        .then(async response => {
            return this.handleResponse(response.data);       
        }).catch((e) => {
            if (e.message.startsWith("Invalid response.")) throw new Error(e.message);
            throw new Error("Failed to fetch data. Please try again later.");
        });
    }

    handleResponse(data:any) {
        if (!data) throw new Error("Invalid response.");
        return data;
    }
}

export default Translate;