"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RapidApiService = void 0;
class RapidApiService {
    // User Endpoints
    static getUserId(userName) {
        return RapidApiService.fetchFromRapidApi(`user/id_for/${userName}`);
    }
    static getUserLists(userId) {
        return RapidApiService.fetchFromRapidApi(`user/${userId}/lists`);
    }
    // List Endpoints
    static getListInfo(listId) {
        return RapidApiService.fetchFromRapidApi(`list/${listId}`);
    }
    static getListArticles(listId) {
        return RapidApiService.fetchFromRapidApi(`list/${listId}/articles`);
    }
    // Article Endpoints
    static getArticleInfo(articleId) {
        return RapidApiService.fetchFromRapidApi(`article/${articleId}`);
    }
    static getArticleHtml(articleId) {
        return RapidApiService.fetchFromRapidApi(`article/${articleId}/html?fullpage=true&style_file=https%3A%2F%2Fmediumapi.com%2Fstyles%2Fdark.css`);
    }
    // Base
    static fetchFromRapidApi(relUrl, params, method) {
        var _a;
        return fetch(`${(_a = process.env.RAPIDAPI_BASE_URL) !== null && _a !== void 0 ? _a : ''}/${relUrl}`, {
            method,
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_API_KEY,
            },
        }).then((res) => res.json().then((json) => {
            if (res.ok) {
                return json;
            }
            throw new Error('Unhandled response code');
        }));
    }
}
exports.RapidApiService = RapidApiService;
//# sourceMappingURL=rapid-api.service.js.map