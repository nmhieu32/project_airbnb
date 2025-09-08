export interface BaseApiResponse<T> {
    statusCode: number;
    content:    T;
    dateTime:   Date;
}