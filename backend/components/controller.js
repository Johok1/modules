export default class Controller {
    constructor() {
        this.fetch_url_account = "https://www.zinxswiki.com/account"
        this.fetch_url_page = "https://www.zinxswiki.com/page"
        this.fetch_url_image = "https://www.zinxswiki.com/image"
    }

    getPageUrlList(pageId) {
        return fetch(this.fetch_url_image+ "/getPageImageUrls/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addPageImageUrl(wixId, pageId,url, filename) {
        const imageUrlRequest = {
            "file": url,
            "filename": filename
        };
        console.log(imageUrlRequest)
        return fetch(this.fetch_url_image + "/addPageImageUrl/" + wixId + "/" + pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(imageUrlRequest)
        }).catch(error => {
            console.error(error);
        });
    }

    getAccountPageContent(wixId, pageId) {
        return fetch(this.fetch_url_page + "/getAccountPageContent/" + wixId + "/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postAccountPageContent(wixId, pageId, content) {
        return fetch(this.fetch_url_page + "/postAccountPageContent/" + wixId + "/" + pageId, {
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