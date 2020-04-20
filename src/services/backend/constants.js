export const API_BASE_URL = 'http://localhost:8080';
// export const API_BASE_URL = 'https://api.encore-fm.com';

// codes of errors received from backend
export const SESSION_NOT_FOUND_ERROR = "SessionNotFoundError";
export const USER_CONFLICT_ERROR = "UserConflictError";
export const INTERNAL_SERVER_ERROR = "InternalServerError";
export const BAD_VOTE_ERROR = "BadVoteError";
export const SESSION_CONFLICT_ERROR = "SessionConflictError";
export const SONG_NOT_FOUND_ERROR = "SongNotFoundError";
export const REQUEST_NOT_AUTHORIZED_ERROR = "RequestNotAuthorizedError";

// status for fetch results
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILURE = 'failure';
export const STATUS_UNAUTHORIZED = 'unauthorized';

// error to dispatch at promise rejection
export const FETCH_ERROR = {
  error: 'FetchError',
  description: 'An unexpected error has occurred while trying to fetch the requested data.'
};
