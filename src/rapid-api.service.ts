export class RapidApiService {
  // User Endpoints
  public static getUserId(userName: string): Promise<{ id: string }> {
    return RapidApiService.fetchFromRapidApi(`user/id_for/${userName}`);
  }

  public static getUserLists(
    userId: string
  ): Promise<{ id: string; count: number; lists: Array<string> }> {
    return RapidApiService.fetchFromRapidApi(`user/${userId}/lists`);
  }

  // List Endpoints
  public static getListInfo(listId: string): Promise<{
    id: string;
    claps: number;
    voters: number;
    count: number;
    author: string;
    description: string;
    created_at: string;
    last_item_inserted_at: string;
    responses_count: number;
    thumbnail: string;
  }> {
    return RapidApiService.fetchFromRapidApi(`list/${listId}`);
  }

  public static getListArticles(
    listId: string
  ): Promise<{ id: string; list_articles: Array<string>; count: number }> {
    return RapidApiService.fetchFromRapidApi(`list/${listId}/articles`);
  }

  // Article Endpoints
  public static getArticleInfo(articleId: string): Promise<{
    id: string;
    title: string;
    subtitle: string;
    author: string;
    publication_id: string;
    published_at: string;
    last_modified_at: string;
    tags: Array<string>;
    topics: Array<string>;
    claps: number;
    voters: number;
    word_count: number;
    responses_count: number;
    reading_time: number;
    url: string;
    unique_slug: string;
    image_url: string;
    lang: string;
    is_series: boolean;
    is_locked: boolean;
    is_shortform: boolean;
    top_highlight: string;
  }> {
    return RapidApiService.fetchFromRapidApi(`article/${articleId}`);
  }

  public static getArticleHtml(
    articleId: string
  ): Promise<{ id: string; html: string }> {
    return RapidApiService.fetchFromRapidApi(
      `article/${articleId}/html?fullpage=true&style_file=https%3A%2F%2Fmediumapi.com%2Fstyles%2Fdark.css`
    );
  }

  // Base
  private static fetchFromRapidApi(
    relUrl: string,
    params?: Record<string, any> | undefined,
    method?: 'GET'
  ): Promise<any> {
    return fetch(`${process.env.RAPIDAPI_BASE_URL ?? ''}/${relUrl}`, {
      method,
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_API_KEY,
      },
    }).then((res) =>
      res.json().then((json) => {
        if (res.ok) {
          return json;
        }
        throw new Error('Unhandled response code');
      })
    );
  }
}
