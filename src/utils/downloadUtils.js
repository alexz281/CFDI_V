import { isPromise } from './utils'

export const getAttachmentFilename = function (response) {
    return /filename="(?<filename>.*)"/.exec(response.headers.get('Content-Disposition'))?.groups?.filename ?? null;
};

export const Attachment = class {
    constructor (blob, filename) {
        this.blob = blob;
        this.filename = filename;
    }
    static fromResponse(response) {
        return new Attachment(response.blob(), getAttachmentFilename(response));
    }
    _saveFromObjectURL(url) {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.filename);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
    }
    save () {
        if (isPromise(this.blob)) {
            this.blob.then(blob => URL.createObjectURL(blob))
            .then(url => {
                this._saveFromObjectURL(url);
            });
        }
        else {
            this._saveFromObjectURL(URL.createObjectURL(this.blob));
        }
    }
};