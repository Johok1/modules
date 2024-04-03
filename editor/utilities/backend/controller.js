export default class Controller {
    constructor() {
        this.fetch_url_account = "https://www.zinxswiki.com/account"
    }

    getPageUrlList(pageId) {
        return fetch(this.fetch_url_account + "/getPageImageUrls/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addPageImageUrl(wixId, pageId,url) {
        var imageUrlRequest = {
            url: url,
            blank: ""
        };
        return fetch(this.fetch_url_account + "/addPageImageUrl/" + wixId + "/" + pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            },
            body: imageUrlRequest
        }).catch(error => {
            console.error(error);
        });
    }

    getAccountPageContent(wixId, pageId) {
        return fetch(this.fetch_url_account + "/getAccountPageContent/" + wixId + "/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postAccountPageContent(wixId, pageId, content) {
        return fetch(this.fetch_url_account + "/postAccountPageContent/" + wixId + "/" + pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            },
            body: content
        }).catch(error => {
            console.error(error);
        });
    }

}