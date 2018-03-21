import {combineReducers} from 'redux';
import BlogArchiveReducer from './BlogArchiveReducer';
import ActiveBlogPostReducer from './ActiveBlogPostReducer';
import BlogNextPageTokenReducer from './BlogNextPageTokenReducer';

const KokoLibReducers = combineReducers({
	blogArchive: BlogArchiveReducer,
	activeBlogPost: ActiveBlogPostReducer,
	blogNextPageToken: BlogNextPageTokenReducer
});

export default KokoLibReducers;