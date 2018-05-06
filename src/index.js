/*
Guide:
https://hackernoon.com/building-a-react-component-library-part-2-46fd4f77bb5c

Standards:
https://github.com/eventbrite/javascript/tree/master/react
*/

//react assets
import NewsLetterSignupForm from './components/NewsLetterSignupForm';
import TwitterTimeline from './components/TwitterTimeline';
import MainFooter from './components/MainFooter';
import ScrollToTopRoute from './components/ScrollToTopRoute';
import Spacer from './components/Spacer';
import PrimaryNavBar from './components/PrimaryNavBar';
import ImageHeaderBanner from './components/ImageHeaderBanner';
import ContactForm from './components/ContactForm';
import DataContainer from './components/DataContainer';
import EnhancedTextField from './components/EnhancedTextField';
import EventListView from './components/EventListView';
import EventFullView from './components/EventFullView';
import PlainIconButton from './components/PlainIconButton';
import GalleryCollection from './components/GalleryCollection';
import StandardStyles from './components/StandardStyles';
import ResourceLink from './components/ResourceLink';
import BlogArchive from './components/BlogArchive';
import BlogPost from './components/BlogPost';
import BlogThumb from './components/BlogThumb';
import UrlThumb from './components/UrlThumb';
import UrlResourceList from './components/UrlResourceList';
import ShadowScreen from './components/ShadowScreen';
import GradientScreen from './components/GradientScreen';
import BackgroundPoster from './components/BackgroundPoster';
import FacebookLiveStream from './components/FacebookLiveStream';
import PdfViewer from './components/PdfViewer';
import AlbumView from './components/AlbumView';
import Countdown from './components/Countdown';

import SocialMediaButton from './elements/SocialMediaButton';
import Search from './components/Search';

//containers
import BlogArchiveContainer from './containers/BlogArchiveContainer';
import BlogPostContainer from './containers/BlogPostContainer';

//reducers
//We export reducers individually and as a package to give the developer options
//we can also import all the reducers at once with KokoLibReducers
//however if this is done, we must use flat-combine-reducers package to combine
//site reducers with our library reducers,
//otherwise the state will be nested and not accessible by our containers
import KokoLibReducers from './reducers';
import BlogArchiveReducer from './reducers/BlogArchiveReducer';
import ActiveBlogPostReducer from './reducers/ActiveBlogPostReducer';
import BlogNextPageTokenReducer from './reducers/BlogNextPageTokenReducer';


import Utils from './Utils';


module.exports = {
  NewsLetterSignupForm,
  TwitterTimeline,
  MainFooter,
  ScrollToTopRoute,
  Spacer,
  PrimaryNavBar,
  ImageHeaderBanner,
  ContactForm,
  DataContainer,
  EnhancedTextField,
  DataContainer,
  EventListView,
  EventFullView,
  PlainIconButton,
  GalleryCollection,
  AlbumView,
  StandardStyles,
  ResourceLink,
  BlogArchive,
  BlogPost,
  BlogThumb,
  UrlThumb,
  UrlResourceList,
  ShadowScreen,
  GradientScreen,
  BackgroundPoster,
  FacebookLiveStream,
  PdfViewer,
  Countdown,

  //containers
  BlogArchiveContainer,
  BlogPostContainer,

  //reducers
  BlogArchiveReducer,
  ActiveBlogPostReducer,
  BlogNextPageTokenReducer,
  KokoLibReducers,

  SocialMediaButton,
  Search,

  Utils
}
